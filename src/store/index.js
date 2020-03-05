import Vue from 'vue';
import Vuex from 'vuex';

import loginStore from '@/store/login.store.js';
import employeesStore from '@/store/employees.store.js';
import worktimeStore from '@/store/worktime.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    loginStore,
    employeesStore,
    worktimeStore
  }
});
