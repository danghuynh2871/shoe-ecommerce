import { reactive } from 'vue';

const state = reactive({
  user: JSON.parse(localStorage.getItem('user'))
});

export const authStore = {
  get user() {
    return state.user;
  },
  
  setUser(newUser) {
    state.user = newUser;
    localStorage.setItem('user', JSON.stringify(newUser));
  },
  
  clearUser() {
    state.user = null;
    localStorage.removeItem('user');
  }
};