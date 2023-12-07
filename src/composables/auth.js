import { ref, reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { ABILITY_TOKEN } from '@casl/vue';

import store from '../store';
import axiosIns from '../service/axios';

let user = reactive({
    name: '',
    email: ''
});

export default function useAuth() {
    const processing = ref(false);
    const router = useRouter();
    const ability = inject(ABILITY_TOKEN)

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

         
            // Save the accessToken and abilities in localStorage
            localStorage.setItem('accessToken', JSON.stringify(accessToken));

         
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
        getAbilities()

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

    const getAbilities = async() => {
        await axiosIns.get('/abilities')
            .then(response => {
                const permissions = response.data
                const { can, rules } = new AbilityBuilder(createMongoAbility)

                can(permissions)

                ability.update(rules)
            })
    }

    return {
        loginForm,
        submitLogin,
        user,
        getUser,
        logout,
        getAbilities
    };
}
