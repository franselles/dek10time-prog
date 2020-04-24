import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    time: {
      _id: null,
      employee_id: null,
      date: null,
      name: null,
      dni: null,
      work_shift: null,
      start_time: null,
      end_time: null,
      hours: null,
      max: null,
    },
    times: [],
  },
  mutations: {
    setTimes(state, payload) {
      state.times = payload;
    },
    setTime(state, payload) {
      state.time._id = payload._id;
      state.time.employee_id = payload.employee_id;
      state.time.date = payload.date;
      state.time.name = payload.name;
      state.time.dni = payload.dni;
      state.time.work_shift = payload.work_shift;
      state.time.start_time = payload.start_time;
      state.time.end_time = payload.end_time;
      state.time.hours = payload.hours;
      state.time.max = payload.max;
    },
    resetTime(state) {
      state._id = null;
      state.employee_id = null;
      state.date = null;
      state.name = null;
      state.dni = null;
      state.work_shift = null;
      state.start_time = null;
      state.end_time = null;
      state.hours = null;
      state.max = null;
    },
  },
  actions: {
    async getTimes({ commit }, payload) {
      let id = payload.id;
      let date_1 = payload.date_1;
      let date_2 = payload.date_2;
      if (date_1 === '' || date_2 === '') return;

      try {
        const { data } = await Vue.axios(
          {
            method: 'get',
            url: `worktime/times/${id}/${date_1}/${date_2}`,
          },
          {
            withCredentials: true,
          }
        );
        commit('setTimes', data);
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los datos ha finalizado');
      }
    },
    async postTime(context, payload) {
      try {
        await Vue.axios(
          {
            method: 'post',
            url: 'worktime/time',
            data: payload,
          },
          {
            withCredentials: true,
          }
        );
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los datos ha finalizado');
      }
    },
    async putTime(context, payload) {
      try {
        await Vue.axios(
          {
            method: 'put',
            url: `worktime/time/${payload._id}`,
            data: payload,
          },
          {
            withCredentials: true,
          }
        );
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los datos ha finalizado');
      }
    },
    async deleteTime(context, payload) {
      try {
        await Vue.axios(
          {
            method: 'delete',
            url: `worktime/time/${payload._id}`,
          },
          {
            withCredentials: true,
          }
        );
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los datos ha finalizado');
      }
    },
  },
  getters: {},
};
