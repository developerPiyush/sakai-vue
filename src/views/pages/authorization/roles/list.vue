<template>
    <div class="card">
        <h3>Roles</h3>
        <div class="flex justify-content-between gap-3">
            <button @click="openAddRoleDialog" class="p-button p-component p-button-outlined mb-2">Add Role</button>
        </div>
        <DataTable :value="roles" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="name" header="Name" style="width: 25%"></Column>
            <Column header="Actions" style="width: 25%">
                <template #body="{ data }">
                    <div class="action-buttons">
                        <Button icon="pi pi-pencil" class="p-button-warning p-button-rounded"
                            @click="openUpdateRoleDialog(data)"></Button>
                        <Button icon="pi pi-trash" class="p-button-danger p-button-rounded"
                            @click="deleteRole(data)"></Button>
                    </div>
                </template>
            </Column>
        </DataTable>

        <Dialog :header="dialogHeader" v-model:visible="display" :breakpoints="{ '960px': '75vw' }"
            :style="{ width: '30vw' }" :modal="true">

            <div class="card p-fluid">
                <label for="name">Role Name:</label>
                <InputText v-model="name" id="name" />
            </div>

            <DualListBox leftLabel="Available Permissions" rightLabel="Current Permissions" :leftData="availablePermissions"
                :rightData="currentPermissions" v-on:onChangeList="onChangeList"></DualListBox>

            <template #footer>
                <div class="footer-container">
                    <Button label="Save" @click="saveRole" icon="pi pi-check" class="p-button-outlined" />
                    <Button label="Cancel" @click="close" icon="pi pi-times" class="p-button-outlined" />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axiosIns from '../../../../service/axios'
import DualListBox from './DualListBox.vue'

const roles = ref([]);
const display = ref(false);
const roleId = ref(null);
const availablePermissions = ref([]);
const currentPermissions = ref([]);

const deleteRole = async (role) => {
    try {
        const roleId = role.id;

        await axiosIns.delete(`/roles/${roleId}`);

        console.log('Role deleted successfully:', role);

        roles.value = roles.value.filter(r => r.id !== roleId);
    } catch (error) {
        console.error('Error deleting role:', error.message);
    }
};

const dialogHeader = computed(() => {
    return isNew.value ? 'Add Role' : 'Update Role';
}); const isNew = ref(true);
const name = ref('');

const openAddRoleDialog = () => {
    isNew.value = true;
    name.value = '';
    display.value = true;
};

const openUpdateRoleDialog = async (role) => {
    isNew.value = false;
    name.value = role.name
    roleId.value = role.id
    display.value = true;

    const response = await axiosIns.get('/permissions');
    const allPermission = response.data.data;

    const rolePermissionResponse = await axiosIns.get('/role-permissions/' + roleId.value);
    const rolePermissionList = rolePermissionResponse.data.data;

    const diffPermission = getDifference(allPermission, rolePermissionList);

    availablePermissions.value = diffPermission;
    currentPermissions.value = rolePermissionList;
};

const saveRole = async () => {
    try {
        if (isNew.value) {
            await axiosIns.post('roles', { name: name.value });
        } else {
            await axiosIns.put(`/roles/${roleId.value}`, { name: name.value });

            let permissions = currentPermissions.value.map(a => a.id);
            updateRolePermissions(permissions)
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
    fetchRole();
    close();
};

const fetchRole = async () => {
    try {
        const data = await axiosIns.get('roles');
        roles.value = data.data.data
    } catch (error) {
        console.error('Error:', error.message);
    }
    close();
};

const updateRolePermissions = async (permissions) => {

    try {
        await axiosIns.put('/role-permissions', { permissions: JSON.stringify(permissions), role_id: roleId.value })
    } catch (error) {
        console.error('Error:', error.message);
    }

}



const close = () => {
    display.value = false;
};

onMounted(async () => {
    await fetchRole();
});

function getDifference(array1, array2) {
    return array1.filter(object1 => {
        return !array2.some(object2 => {
            return object1.id === object2.id;
        });
    });
}
</script>
<style scoped>
.action-buttons {
    display: flex;
    gap: 8px;
}
</style>