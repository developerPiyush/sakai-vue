<template>
    <div class="card">
        <h3>Roles</h3>
        <DataTable :value="roles" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem">
            <Column field="name" header="Name" style="width: 25%"></Column>
            <Column field="date" header="Date" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const roles = ref([
    {
        id: 1000,
        name: 'Admin',       
        date: '2015-09-13',
    },
    {
        id: 1000,
        name: 'User',       
        date: '2015-09-13',
    },
    {
        id: 1000,
        name: 'Agent',       
        date: '2015-09-13',
    },
]);
</script>
