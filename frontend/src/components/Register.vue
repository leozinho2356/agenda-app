<template>
  <div>
    <h2>Cadastro</h2>
    <form @submit.prevent="onSubmit">
      <input v-model="name" placeholder="Nome" />
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Senha" />
      <button :disabled="loading">{{ loading ? 'Cadastrando...' : 'Cadastrar' }}</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import { useToast } from 'vue-toastification';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);
const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

async function onSubmit(){
  try{
    loading.value = true;
    await userStore.register({ name: name.value, email: email.value, password: password.value });
    toast.success('Conta criada!');
    router.push('/');
  }catch(e){
    error.value = e.response?.data?.message || 'Erro';
    toast.error(error.value);
  }finally{ loading.value = false; }
}
</script>
