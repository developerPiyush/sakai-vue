<script setup>
import axios from '@axios'
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()
const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
const checked = ref(false);
const submitted = ref(false);

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const login = () => {
    submitted.value = true;
    if (email.value && email.value.trim() && password.value) {
        axios.post('/auth/login', {
            email: email.value,
            password: password.value,
        }).then(r => {
            const { accessToken, userData, userAbilities } = r.data

            // localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
            // ability.update(userAbilities)
            localStorage.setItem('userData', JSON.stringify(userData))
            localStorage.setItem('accessToken', JSON.stringify(accessToken))

            // Redirect to `to` query if exist or redirect to index route
            router.replace(route.query.to ? String(route.query.to) : '/')
        }).catch(e => {
            const { errors: formErrors } = e.response.data

            errors.value = formErrors
            console.error(e.response.data)
        })
    }
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <!-- <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" /> -->
                        <div class="text-900 text-3xl font-medium mb-3">Welcome!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <div class="field col-12 md:col-12 md:w-30rem">
                            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email1" type="text" placeholder="Email address" class="w-full" :class="{ 'p-invalid': submitted && !email }" style="padding: 1rem" v-model="email" />
                            <small class="p-invalid" v-if="submitted && !email">Email is required.</small>
                        </div>

                        <div class="field col-12 md:col-12">
                            <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password" v-model="password" placeholder="Password" :toggleMask="true" class="w-full" :class="{ 'p-invalid': submitted && !password }" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                            <small class="p-invalid" v-if="submitted && !password">Password is required.</small>
                        </div>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="login"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
