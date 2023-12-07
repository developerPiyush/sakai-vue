import { ref, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import { AbilityBuilder, Ability } from '@casl/ability';
import { defineAbility } from '@casl/ability';
import { provideAbility } from '@casl/vue';

import store from '../store';
import axiosIns from '../service/axios';

let user = reactive({
    name: '',
    email: ''
});

export default function useAuth() {
    const processing = ref(false);
    const router = useRouter();

    const loginForm = reactive({
        email: '',
        password: '',
        remember: false
    });

    const submitLogin = async () => {
        try {
            const response = await axiosIns.post('/login', loginForm);

            // Extract the accessToken from the response
            const accessToken = response.data.accessToken;
            const permissions = response.data.userAbilities;

            // Define abilities based on the permissions
            const { can, rules } = new AbilityBuilder(defineAbility);
            permissions.forEach((permission) => {
                can(permission, 'all'); 
            });
    
            const ability = new Ability(rules);

            console.log('All Abilities:', rules);

            // Save the accessToken and abilities in localStorage
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            localStorage.setItem('abilities', JSON.stringify(rules));

            console.log(ability);
            // Provide the ability to the Vue app
            provideAbility(ability);

            // Dispatch actions, perform additional tasks as needed
            await store.dispatch('auth/getUser');
            await loginUser();

            await router.push('/');
        } catch (error) {
            // Handle error
            console.error('Login failed:', error);
        }
    };

    const loginUser = () => {
        user = store.state.auth.user;
    };

    const getUser = async () => {
        if (store.getters['auth/authenticated']) {
            await store.dispatch('auth/getUser');
            await loginUser();
        }
    };

    const logout = async () => {
        if (processing.value) return;

        processing.value = true;

        axiosIns
            .post('/logout')
            .then((response) => {
                user.name = '';
                user.email = '';
                store.dispatch('auth/logout');
                router.replace('/login');
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    return {
        loginForm,
        submitLogin,
        user,
        getUser,
        logout
    };
}
