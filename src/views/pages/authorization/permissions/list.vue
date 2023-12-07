<template>
    <div class="card">
        <h3>Permissions</h3>
        <div class="flex justify-content-between gap-3">
            <button @click="openAddpermissionDialog()" class="p-button p-component p-button-outlined mb-2">Add
                Permission</button>
        </div>
        <DataTable :value="permissions" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem">
            <Column field="name" header="Name" style="width: 25%"></Column>
            <Column header="Actions" style="width: 25%">
                <template #body="{ data }">
                    <div class="action-buttons">
                        <Button icon="pi pi-pencil" class="p-button-warning p-button-rounded"
                            @click="editPermission(data)"></Button>
                        <Button icon="pi pi-trash" class="p-button-danger p-button-rounded"
                            @click="deletePermission(data)"></Button>
                    </div>
                </template>
            </Column>
        </DataTable>

        <Dialog :header="dialogHeader" v-model:visible="display" :breakpoints="{ '960px': '75vw' }"
            :style="{ width: '30vw' }" :modal="true">

            <div class="card p-fluid">
                <label for="name">Permission Name:</label>
                <InputText v-model="name" id="name" />
            </div>

            <template #footer>
                <div class="footer-container">
                    <Button label="SavePermission" @click="savePermission()" icon="pi pi-check" class="p-button-outlined" />
                    <Button label="Cancel" @click="close" icon="pi pi-times" class="p-button-outlined" />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axiosIns from '../../../../service/axios'

const permissions = ref([]);
const display = ref(false);
const permissionId = ref(null);

const deletePermission = async (permission) => {
    try {
        const permissionId = permission.id;

        await axiosIns.delete(`/permissions/${permissionId}`);

        console.log('permission deleted successfully:', permission);

        permissions.value = permissions.value.filter(r => r.id !== permissionId);
    } catch (error) {
        console.error('Error deleting permission:', error.message);
    }
};

const dialogHeader = computed(() => {
    return isNew.value ? 'Add permission' : 'Update permission';
}); const isNew = ref(true);
const name = ref('');

const openAddpermissionDialog = () => {
    isNew.value = true;
    name.value = '';
    display.value = true;
};

const editPermission = (permission) => {
    isNew.value = false;
    name.value = permission.name
    permissionId.value = permission.id
    display.value = true;
};

const savePermission = async () => {
    try {
        if (isNew.value) {
            await axiosIns.post('permissions', { name: name.value });
        } else {
            await axiosIns.put(`/permissions/${permissionId.value}`, { name: name.value });
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
    fetchpermission();
    close();
};

const fetchpermission = async () => {
    try {
        const data = await axiosIns.get('permissions');
        permissions.value = data.data.data
    } catch (error) {
        console.error('Error:', error.message);
    }
    close();
};

const close = () => {
    display.value = false;
};


onMounted(() => {
    fetchpermission();
});


</script>
<style scoped>
.action-buttons {
    display: flex;
    gap: 8px;
}
</style>