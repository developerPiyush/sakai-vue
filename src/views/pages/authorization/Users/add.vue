<script setup>
import { ref, onMounted } from 'vue';
import axiosIns from '../../../../service/axios';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
const router = useRouter()

const user = ref({
    name: '',
    email: '',
    password: '',
    role_id: null,
});
const roles = ref([]);
const submitted = ref(false);
const toast = useToast();

const validateForm = () => {
    return user.value.name && user.value.email && user.value.role_id;
};


const saveUser = async () => {
    submitted.value = true;
    if (validateForm()) {
        try {

            await axiosIns.post('/users', user.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 6000 });
            router.push("/users/list")
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }
};


onMounted(async () => {
    try {
        const response = await axiosIns('/role-list');
        const data = response.data.data;
        roles.value = data;
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
});
</script>

<template>
    <Toast />
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Add User</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="name">User Name</label>
                        <InputText id="name" type="text" name="name" v-model="user.name" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !user.name }" />
                        <small class="p-invalid" v-if="submitted && !user.name">User Name is required.</small>
                    </div>

                    <div class="field col-12 md:col-6">
                        <label for="email">Email</label>
                        <InputText id="email" type="text" name="email" v-model="user.email"
                            :class="{ 'p-invalid': submitted && !user.email }" />
                        <small class="p-invalid" v-if="submitted && !user.email">Email is required.</small>
                    </div>

                    <div class="field col-12 md:col-6">
                        <label for="password">Password</label>
                        <InputText id="password" type="password" name="password" v-model="user.password"
                            :class="{ 'p-invalid': submitted && !user.password }" />
                    </div>

                    <div class="field col-12 md:col-6">
                        <label for="role">Role</label>
                        <Dropdown id="dropdown" :options="roles" v-model="user.role_id" optionLabel="name"
                            :class="{ 'p-invalid': submitted && !user.role_id }" />
                        <small class="p-invalid" v-if="submitted && !user.role_id">Role is required.</small>
                    </div>

                    <div class="field col-12 md:col-2">
                        <Button label="Reset" class="p-button-secondary mr-2 mb-2" />
                    </div>

                    <div class="field col-12 md:col-2">
                        <Button label="Submit" class="mr-2 mb-2" @click="saveUser()" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
