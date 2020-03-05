<template>
  <div>
    <div class="noprint">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="">
            <img src="@/assets/clock_48.png" width="28" height="28" />
          </a>

          <a
            role="button"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            class="navbar-burger burger"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <router-link to="/employees" class="navbar-item"
              >EMPLEADOS</router-link
            >

            <a @click="goWorktime" class="navbar-item">HOY</a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                MAS
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  OPCION 1
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-light" @click="logout">
                  SALIR
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'Dashboard',
  data() {
    return {};
  },
  mounted() {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  },
  methods: {
    ...mapMutations('loginStore', ['resetUsuario']),
    ...mapMutations('employeesStore', ['resetEmployee', 'setFiltroWorktime']),
    goWorktime() {
      this.resetEmployee();
      this.setFiltroWorktime('all');
      const path = '/worktime';
      if (this.$route.path !== path) this.$router.push(path);
      // this.$router.push({ name: 'Worktime' });
    },
    logout() {
      this.resetUsuario();
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style>
@media print {
  .noprint {
    display: none;
  }
}
</style>
