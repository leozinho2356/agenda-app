<template>
  <form @submit.prevent="submit">
    <input v-model="title" placeholder="Título" />
    <input v-model="date" type="datetime-local" />
    <input v-model="cep" placeholder="CEP" />
    <input v-model="number" placeholder="Número" />
    <input v-model="complement" placeholder="Complemento" />
    <textarea v-model="notes" placeholder="Observações"></textarea>
    <button :disabled="loading">{{ loading ? 'Criando...' : 'Criar' }}</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useToast } from 'vue-toastification';

const title = ref('');
const date = ref('');
const cep = ref('');
const number = ref('');
const complement = ref('');
const notes = ref('');
const loading = ref(false);
const toast = useToast();

async function submit(){
  try{
    loading.value = true;
    await api.post('/appointments', { title: title.value, date: date.value, cep: cep.value, number: number.value, complement: complement.value, notes: notes.value });
    toast.success('Agendamento criado');
    window.dispatchEvent(new CustomEvent('appt-created'));
  }catch(e){
    toast.error(e.response?.data?.message || 'Erro');
  }finally{ loading.value = false; }
}
</script>
