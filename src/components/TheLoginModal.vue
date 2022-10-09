<template>
    <div class="modal-background" @click="closeLoginModal"></div>
    <div class="login-modal-wrapper">
            <div class="title-wrapper">
                <div class="close-modal-btn" @click="closeLoginModal">
                    <BIconX></BIconX>
                </div>
                <h2 class="title">{{text.title}}</h2>
            </div>
        <div class='login-modal-heading-wrapper'>
            <h1 class="login-modal-heading"> {{ text.heading}} </h1>
        </div>
        <div class="login-form">
                <div class="login-modal-input-wrapper">
                    <div class="login-modal-input">
                        <label for="email">{{text.email}}</label>
                        <input type="email" id="email" name="email" v-model="email">
                    </div>
                    <div class="form-seperator"></div>
                    <div class="login-modal-input">
                        <label for="password">{{text.password}}</label>
                        <input type="password" id="password" name="password" v-model="password">
                    </div>
            </div>
        </div>
        <h4 class="errorMessage">{{errorMessage.replace('Firebase:','')}}</h4>
        <div class="login-modal-btn-wrapper">
            <div class="login-modal-btn" @click="login">{{text.login}}</div>
        </div>
        <div class="login-seperator-wrapper">
            <div class="login-seperator"></div>
            <p>{{text.or}}</p>
            <div class="login-seperator"></div>
        </div>
        <div class='socialmedia-login-wrapper'>
            <div class='socialmedia-login-btn' @click="loginWithGoogle">
                <BIconGoogle></BIconGoogle>
                <p>{{text.google}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { BIconGoogle, BIconX } from 'bootstrap-icons-vue'
import { useStore } from 'vuex'
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";

export default({
    emits:['close-login-modal'],
    components: {
        BIconGoogle,
        BIconX
        
    },
    setup() {
        const email = ref('')
        const password = ref('')
        const errorMessage = ref('')
        const store = useStore()
        function closeLoginModal(){
            store.commit('changeLoginModalState',false)
        }
        const text = {
            title: 'Log in or sign up',
            heading: 'Welcome to Fartbnb',
            email: 'Email',
            password: 'Password',
            login: 'Log in',
            or: 'or',
            google: 'Log in with Google'
        }
        async function login(){
            const auth = getAuth(); 
            signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                store.commit('setUser', userCredential.user);
                closeLoginModal()
            })
            .catch((error) => {
                const errorCode = error.code;
                errorMessage.value = error.message;
            });
        }
        async function loginWithGoogle(){
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                store.commit('setUser', user);
                closeLoginModal()
            }).catch((error) => {
                const errorCode = error.code;
                errorMessage.value = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
        }   
        return {
            text,
            email,
            password,
            closeLoginModal,
            login,
            loginWithGoogle,
            errorMessage
        }
    },
})
</script>
<style scoped>
.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 190;
}
.login-modal-wrapper {
    position: fixed;
    display:flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 32rem;
    height: 35rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    box-shadow: 5px 10px 5px 2px rgba(0,0,0,0.1);
    border-radius: 10px;
    z-index: 200;
    padding: 0 1rem;
}
.title-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 4rem;
    border-bottom: 1px solid var(--color-border);
}
.title{
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-text);
    width:100%;
    text-align:center;
    font-weight:bold;
}
.close-modal-btn {
    width: 1.5rem;
    height: 1.5rem;
    padding: 2px;
    border-radius: 50%;
}
.close-modal-btn:hover{
    background-color: var(--color-border);
}
.close-modal-btn > svg {
    width: 1.2rem;
    height: 1.2rem;
    color: var(--color-text);
}
.login-modal-heading-wrapper {
    display: flex;
    flex-direction: column;
    height: 5rem;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
}
.login-modal-heading {
    font-size: 1.6rem;
    font-weight: bold;
    color: var(--color-text);
}
.login-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    border: 1.2px solid var(--color-border-darker);
    border-radius: 10px;
}
.login-modal-input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.login-modal-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    padding: 0 1rem;
    height: 3.8rem;
}
.login-modal-input label {
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--vt-c-black-mute);
}
.form-seperator{
    width: 100%;
    height: 1px;
    background-color: var(--color-border-darker);
}
.login-modal-input input {
    width: 100%;
    height: 2rem;
    border: none;
    color: var(--color-text);
}
.login-modal-input input:focus-visible{
    outline: none;
}
.errorMessage{
    color: red;
    font-size: 0.8rem;
    font-weight: 400;
    margin: 0.5rem 0;
    padding-left: 0.5rem;
    height:1.5rem;
}
.login-modal-btn-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor:pointer;
}
.login-modal-btn {
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100%;
    height: 3rem;
    border: none;
    border-radius: 0.5rem;
    color: var(--vt-c-white);
    font-weight: bold;
    background-color: var(--vt-c-firebrick);
}
.login-seperator-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    width: 100%;
    height: 5rem;
}
.login-seperator-wrapper > p {
    font-size: 0.8rem;
    font-weight: 400;
    color: var(--color-text);
}
.login-seperator {
    width: 13rem;
    height: 1px;
    background-color: var(--color-border);
}
.socialmedia-login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.socialmedia-login-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 3rem;
    border: 1px solid var(--vt-c-black);
    border-radius: 0.5rem;
    padding: 0 1rem;
    cursor:pointer;
}
.socialmedia-login-btn > p {
    font-size: 1rem;
    font-weight: 400;
    width:calc(100% - 1.1rem);
    color: var(--color-text);
    text-align:center;
}
.socialmedia-login-btn > svg {
    width: 1.1rem;
    height: 1.5rem;
    text-align: left;
}

@media(max-width:550px){
    .login-modal-wrapper{
        width:100%;
    }
}
</style>

