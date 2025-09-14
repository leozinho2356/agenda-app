<template>
  <div>
    <h2>Painel</h2>
    <button @click="logout">Sair</button>
    <AppointmentForm @created="load" />
    <h3>Meus agendamentos</h3>
    <ul>
      <li v-for="appt in appointments" :key="appt._id">
        {{ new Date(appt.date).toLocaleString() }} — {{ appt.title }} — {{ appt.address.city }}
        <button @click="viewWeather(appt.address.cep, appt.date)">Ver previsão</button>
      </li>
    </ul>

    <div v-if="weather" style="margin-top:16px">
      <h4>Previsão (dados brutos):</h4>
      <pre>{{ JSON.stringify(weather,null,2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import AppointmentForm from './AppointmentForm.vue';
import { useUserStore } from '../store/userStore';
import { useToast } from 'vue-toastification';

const appointments = ref([]);
const weather = ref(null);
const userStore = useUserStore();
const toast = useToast();

async function load(){
  try{
    const res = await api.get('/appointments/me');
    appointments.value = res.data;
  }catch(e){
    toast.error('Erro carregando agendamentos');
  }
}
onMounted(load);

async function viewWeather(cep, date){
  try{
    const res = await api.get(`/weather/${cep}/${encodeURIComponent(date)}`);
    weather.value = res.data;
    toast.success('Previsão carregada');
  }catch(e){
    toast.error(e.response?.data?.message || 'Erro ao buscar previsão');
  }
}

async function logout(){
  await userStore.logout();
  window.location.href = '/login';
}
</script>
