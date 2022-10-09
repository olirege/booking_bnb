<template @click="$emit('close-login-menu',false)">
    <div class='login-tab-wrapper'>
        <div class="tabs" v-if ='user && user.isAnonymous'>
            <h4 class="tab" @click="$emit('close-login-menu',false); openLoginModal();">{{text.signup}}</h4>
            <h4 class="tab" @click="$emit('close-login-menu',false); openLoginModal();" >{{text.login}}</h4>
        </div>
        <div class="tabs" v-else>
            <h4 class="tab" @click="$emit('close-login-menu',false);">{{text.profile}}</h4>
            <h4 class="tab" @click="$emit('close-login-menu',false); logout();">{{text.logout}}</h4>
        </div>
    </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default ({
    emits: ["close-login-menu"],
    setup() {
        const store = useStore()
        const user = computed(() => { return store.getters.getUser })
        function openLoginModal() {
            store.commit('changeLoginModalState', true)
        }
        function logout() {
            store.dispatch('logOut')
        }

        const text = {
            signup: 'Sign up',
            login: 'Log in',
            profile: 'Profile',
            logout: 'Log out'
        }
        return {
            text,
            openLoginModal,
            user,
            logout,
        }
    },        
})
</script>
<style scoped>
.login-tab-wrapper{
    display: flex;
    position:fixed;
    top:75px;
    right: 4rem;
    flex-direction: column;
    justify-content: flex-start;
    width: 15rem;
    height: 10rem;
    align-items: center;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    box-shadow: 5px 10px 5px 2px rgba(0,0,0,0.1);
    border-radius: 10px;
    z-index:200;
    padding: 1rem 0;
}
.tabs{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 50%;
    gap:5px;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
}
.tabs > .tab{
    font-size: 1rem;
    font-weight: 400;
    text-align: left;
    color: var(--color-text);
    padding: 0 1rem 0 1rem;
    width:100%;
    height:2rem;
}
.tab:hover{
    background-color: var(--color-border);
    cursor: pointer;
}
</style>
