<template>
  <section class="section">
    <div class="columns">
      <div class="column is-two-thirds">
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">FECHA</label>
            <div class="control has-icons-left">
              <input class="input" type="date" v-model="localTime.date" />
              <span class="icon is-small is-left">
                <i class="fas fa-calendar-day"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">NOMBRE</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="NOMBRE"
                v-model="localTime.name"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">DNI / NIE</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="DNI / NIE"
                v-model="localTime.dni"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-id-card"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">TURNO</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="number"
                placeholder="TURNO"
                v-model="localTime.work_shift"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user-clock"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">INICIO</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="FECHA HORA"
                v-model="localTime.start_time"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-clock"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">FIN</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="FECHA HORA"
                v-model="localTime.end_time"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-clock"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">MINUTOS TRABAJADOS</label>
            <button
              type="button"
              class="button is-small is-link is-light"
              @click="calculate"
            >
              CALCULAR
            </button>
            <div class="control has-icons-left">
              <input
                class="input"
                type="number"
                placeholder="MINUTOS TRABAJADOS"
                v-model="localTime.hours"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-history"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">MAX. MINUTOS EN EL TURNO / JORNADA</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="number"
                placeholder="MAX"
                v-model="localTime.max"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-sort-numeric-up-alt"></i>
              </span>
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button type="submit" class="button is-success">ACEPTAR</button>
            </div>
            <div class="control">
              <button
                type="button"
                class="button is-link is-light"
                @click="onCancel"
              >
                CANCELAR
              </button>
            </div>
            <div class="control">
              <button
                type="button"
                class="button is-danger is-light"
                @click="onDelete"
              >
                BORRAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'Detail',
  data() {
    return {
      localTime: {
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
    };
  },
  mounted() {
    this.localTime = this.time;
  },
  methods: {
    ...mapActions('worktimeStore', ['postTime', 'putTime', 'deleteTime']),
    onCancel() {
      this.$router.go(-1);
    },
    onSubmit() {
      if (this.localTime._id === null) {
        this.postTime(this.localTime).then(() => {
          this.$router.go(-1);
        });
      } else {
        this.putTime(this.localTime).then(() => {
          this.$router.go(-1);
        });
      }
    },
    calculate() {
      let s_t = dayjs(this.localTime.start_time);
      let e_t = dayjs(this.localTime.end_time);

      this.localTime.hours = e_t.diff(s_t, 'minutes');
    },
    onDelete() {
      this.deleteTime(this.localTime).then(() => {
        this.$router.go(-1);
      });
    },
  },
  computed: {
    ...mapState('worktimeStore', ['time']),
  },
};
</script>
