<template>
  <section class="section">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label">NOMBRE</label>
        <div class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="NOMBRE"
            v-model="localEmployee.name"
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
            v-model="localEmployee.dni"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-id-card"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">PASSWORD</label>
        <div class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="PASSWORD"
            v-model="localEmployee.password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input
              type="checkbox"
              :checked="localEmployee.active"
              v-model="localEmployee.active"
            />
            EMPLEADO ACTIVO TRABAJANDO
          </label>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button type="button" class="button is-link" @click="addNewLine">
            AÑADE HORARIO
          </button>
        </div>
      </div>
      <div class="field">
        <label class="label">REGISTRO DE TURNOS DIARIOS</label>
        <div class="control">
          <table>
            <thead>
              <tr>
                <th>
                  TURNO
                </th>
                <th>
                  INTERVALO
                </th>
                <th>
                  INICIO
                </th>
                <th>
                  FINAL
                </th>
                <th>
                  VAR.INICIO
                </th>
                <th>
                  VAR.FINAL
                </th>
                <th>
                  MAXIMO
                </th>
                <th>
                  ACTIVO
                </th>
                <th>
                  BORRAR
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sche, index) in localEmployee.schedule" :key="index">
                <th>
                  <input
                    class="input"
                    type="number"
                    placeholder="TURNO"
                    v-model="sche.work_shift"
                  />
                </th>
                <th>
                  <input
                    class="input"
                    type="number"
                    placeholder="INTERVALO"
                    v-model="sche.interval"
                  />
                </th>
                <th>
                  <input
                    class="input"
                    type="time"
                    placeholder="INICIO"
                    v-model="sche.start_time"
                  />
                </th>
                <th>
                  <input
                    class="input"
                    type="time"
                    placeholder="FINAL"
                    v-model="sche.end_time"
                  />
                </th>
                <th>
                  <input
                    class="input"
                    type="number"
                    placeholder="VAR. INICIO"
                    v-model="sche.random_start"
                  />
                </th>
                <th>
                  <input
                    class="input"
                    type="number"
                    placeholder="VAR. FIN"
                    v-model="sche.random_end"
                  />
                </th>
                <th>
                  <input
                    class="input"
                    type="number"
                    placeholder="MAXIMO "
                    v-model="sche.max"
                  />
                </th>
                <th>
                  <div class="field has-text-centered">
                    <input
                      type="checkbox"
                      :checked="sche.active"
                      v-model="sche.active"
                    />
                  </div>
                </th>
                <th>
                  <button
                    type="button"
                    class="button is-link is-light"
                    @click="deleteSche(index)"
                  >
                    BORRAR
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-success">
            ACEPTAR
          </button>
        </div>
        <div class="control">
          <button
            type="button"
            class="button is-link is-light"
            @click="onCancel"
          >
            CANCEL
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Employee',
  data() {
    return {
      localEmployee: {
        _id: null,
        dni: null,
        password: null,
        name: null,
        active: null,
        schedule: [],
      },
    };
  },
  mounted() {
    this.localEmployee = this.employee;
  },
  methods: {
    ...mapActions('employeesStore', ['postEmployee', 'putEmployee']),
    newLine() {
      return {
        work_shift: 1,
        interval: 0,
        start_time: '10:00',
        end_time: '18:00',
        random_start: 10,
        random_end: 10,
        max: 500,
        active: true,
      };
    },
    addNewLine() {
      let s = {
        work_shift: null,
        interval: 0,
        start_time: null,
        end_time: null,
        random_start: null,
        random_end: null,
        max: null,
        active: null,
      };
      s = new this.newLine();
      this.localEmployee.schedule.push(s);
    },
    onSubmit() {
      if (this.localEmployee._id === null) {
        this.postEmployee(this.localEmployee).then(() => {
          this.$router.go(-1);
        });
      } else {
        this.putEmployee(this.localEmployee).then(() => {
          this.$router.go(-1);
        });
      }
    },
    onCancel() {
      this.$router.go(-1);
    },
    deleteSche(index) {
      this.localEmployee.schedule.splice(index, 1);
    },
    change(val) {
      console.log(val);
      // this.text = val ? 'Right' : 'Wrong';
    },
  },
  computed: {
    ...mapState('employeesStore', ['employee']),
  },
};
</script>
