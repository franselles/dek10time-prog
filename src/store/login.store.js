// import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    login: {
      user: '',
      password: '',
      level: 0,
      isLogged: false,
    },
    usuarios: [
      {
        user: 'Fran',
        password: '8086',
        level: 1,
        isLogged: true,
      },
      {
        user: 'Miguel Angel',
        password: '29022037',
        level: 0,
        isLogged: true,
      },
      {
        user: 'Mecanico',
        password: '0000',
        level: 0,
        isLogged: true,
      },
    ],
  },
  mutations: {
    setUsuario(state, payload) {
      state.login.user = payload.user;
      state.login.password = payload.password;
      state.login.level = payload.level;
      state.login.isLogged = payload.isLogged;
    },
    resetUsuario(state) {
      state.login.user = null;
      state.login.password = null;
      state.login.level = null;
      state.login.isLogged = false;
    },
  },
  actions: {},
  getters: {},
};
