<template>
  <section class="section">
    <div>
      <div class="noprint">
        <div class="buttons">
          <button class="button is-warning" @click="refreshData">
            <span class="icon">
              <i class="fas fa-sync"></i>
            </span>
            <span>ACTUALIZA</span>
          </button>
          <button
            class="button is-info"
            @click="newTime"
            v-if="filtroWorktime !== 'all'"
          >
            <span class="icon">
              <i class="fas fa-business-time"></i>
            </span>
            <span>NUEVO REGISTRO HORARIO</span>
          </button>
        </div>
        <div class="columns">
          <div class="column is-one-quarter">
            <div class="field">
              <label class="label">DIA INICIAL</label>
              <div class="control">
                <input
                  class="input"
                  type="date"
                  v-model="date_1"
                  @change="refreshData"
                />
              </div>
            </div>
          </div>
          <div class="column is-one-quarter">
            <div class="field">
              <label class="label">DIA FINAL</label>
              <div class="control">
                <input
                  class="input"
                  type="date"
                  v-model="date_2"
                  @change="refreshData"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>NOMBRE</th>
              <th>DIA</th>
              <th>TURNO</th>
              <th>INICIO</th>
              <th>FIN</th>
              <th>MINUTOS</th>
              <th>HORAS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(time, index) in times" :key="time._id">
              <th>{{ index + 1 }}</th>
              <td>{{ time.name }}</td>
              <td>{{ _day(time.date) }}</td>
              <td>{{ time.work_shift }}</td>
              <td>{{ _start(time.start_time) }}</td>
              <td>{{ _end(time.end_time) }}</td>
              <td>{{ time.hours }}</td>
              <td>{{ _hours(time.hours) }}</td>
              <td class="noprint">
                <button
                  class="button is-small is-link is-light"
                  @click="editTime(time)"
                >
                  EDITAR
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'Worktime',
  data() {
    return {
      date_1: new Date().toISOString().split('T')[0],
      date_2: new Date().toISOString().split('T')[0],
    };
  },
  mounted() {
    this.getTimes({
      id: this.filtroWorktime,
      date_1: this.date_1,
      date_2: this.date_2,
    });
  },
  methods: {
    ...mapActions('worktimeStore', ['getTimes']),
    ...mapMutations('worktimeStore', ['setTime']),
    refreshData() {
      this.getTimes({
        id: this.filtroWorktime,
        date_1: this.date_1,
        date_2: this.date_2,
      });
    },
    _day(date) {
      return dayjs(date).format('DD-MM-YYYY');
    },
    _start(hour) {
      return dayjs(hour).format('HH:mm');
    },
    _end(hour) {
      return dayjs(hour).format('HH:mm');
    },
    _hours(hour) {
      const hours = Math.floor(hour / 60);
      const minutes = hours % 60;
      return hours + ':' + minutes;
    },
    editTime(data) {
      this.setTime(data);
      this.$router.push({ name: 'Detail' });
    },
    newTime() {
      this.setTime({
        _id: null,
        employee_id: this.employee._id,
        date: new Date().toISOString().split('T')[0],
        name: this.employee.name,
        dni: this.employee.dni,
        work_shift: null,
        start_time: new Date().toISOString().split('T')[0] + ' 10:00',
        end_time: new Date().toISOString().split('T')[0] + ' 18:00',
        hours: null,
        max: null,
      });
      this.$router.push({ name: 'Detail' });
    },
  },
  computed: {
    ...mapState('worktimeStore', ['times']),
    ...mapState('employeesStore', ['employee', 'filtroWorktime']),
  },
};
</script>
