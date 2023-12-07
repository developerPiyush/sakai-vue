<template>
    <div class="card">
        <h3>Users</h3>
        <div class="flex justify-content-between gap-3">
            <router-link to="/users/add" class="p-button p-component p-button-outlined mb-2">Add User</router-link>
        </div>
        <DataTable :value="users" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="name" header="Name" style="width: 25%"></Column>
            <Column field="rolename" header="Role" style="width: 25%"></Column>
            <Column header="Actions" style="width: 25%">
                <template #body="{ data }">
                    <div class="action-buttons">
                        <router-link :to="'/users/edit/' + data.id">
                            <Button icon="pi pi-pencil" class="p-button-warning p-button-rounded"></Button>
                        </router-link>

                        <Button icon="pi pi-trash" class="p-button-danger p-button-rounded"
                            @click="deleteUser(data.id)"></Button>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosIns from '../../../../service/axios';

const users = ref([]);

const deleteUser = async (id) => {
    try {
        await axiosIns.delete(`/users/${id}`);
        users.value = users.value.filter((u) => u.id !== id);

        console.log('User deleted successfully');
       
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};


onMounted(async () => {
    try {
        const response = await axiosIns.get('/users');
        users.value = response.data.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});
</script>
<style scoped>
.action-buttons {
    display: flex;
    gap: 8px;
}
</style>