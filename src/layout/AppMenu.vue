<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
{
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Customers', icon: 'pi pi-fw pi-users', to: '/customers' },
        ]
    },
    {
        label: 'Authorization',
        items: [
            {
                label: 'Roles',
                icon: 'pi pi-fw pi-pencil',
                to: '/roles/list'
            },
            {
                label: 'Permission',
                icon: 'pi pi-fw pi-pencil',
                to: '/permissions/list'
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                to: '/Users/list'
            },
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
     
    </ul>
</template>

<style lang="scss" scoped></style>
