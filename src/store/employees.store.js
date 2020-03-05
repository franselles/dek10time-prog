import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    employees: [],
    employee: {
      _id: null,
      dni: null,
      password: null,
      name: null,
      active: null,
      schedule: []
    },
    schedule: {
      work_shift: null,
      interval: null,
      start_time: null,
      end_time: null,
      random_start: null,
      random_end: null,
      max: null,
      active: null
    },
    filtroWorktime: 'all'
  },
  mutations: {
    setFiltroWorktime(state, payload) {
      state.filtroWorktime = payload;
    },
    setEmployees(state, payload) {
      state.employees = payload;
    },
    setEmployee(state, payload) {
      state.employee._id = payload._id;
      state.employee.dni = payload.dni;
      state.employee.password = payload.password;
      state.employee.name = payload.name;
      state.employee.active = payload.active;
      state.employee.schedule = payload.schedule;
    },
    resetEmployee(state) {
      state.employee._id = null;
      state.employee.dni = null;
      state.employee.password = null;
      state.employee.name = null;
      state.employee.active = null;
      state.employee.schedule = [];
    }
  },
  actions: {
    async getEmployees({ commit }) {
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: 'worktime/employees'
        });
        commit('setEmployees', data);
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los datos ha finalizado');
      }
    },
    async postEmployee(context, payload) {
      try {
        await Vue.axios({
          method: 'post',
          url: 'worktime/employee',
          data: payload
        });
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los datos ha finalizado');
      }
    },
    async putEmployee(context, payload) {
      try {
        await Vue.axios({
          method: 'put',
          url: `worktime/employee/${payload._id}`,
          data: payload
        });
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los datos ha finalizado');
      }
    }
  },
  getters: {}
};
