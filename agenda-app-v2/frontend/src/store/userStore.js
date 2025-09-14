import { defineStore } from 'pinia';
import api from '../services/api';

export const useUserStore = defineStore('user', {
  state: () => ({ user: null }),
  actions: {
    async login(credentials){
      const res = await api.post('/auth/login', credentials);
      this.user = res.data.user;
    },
    async register(payload){
      const res = await api.post('/auth/register', payload);
      this.user = res.data.user;
    },
    async logout(){
      await api.post('/auth/logout');
      this.user = null;
    }
  }
});
