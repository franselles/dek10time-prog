<template>
  <section class="hero is-warning is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form class="box" @submit.prevent="login">
              <div class="field has-text-centered">
                <img src="@/assets/clock_256.png" width="256" height="256" />
              </div>
              <div class="field">
                <label for="" class="label">PIN</label>
                <div class="control has-icons-left">
                  <input
                    v-model="pin"
                    type="password"
                    placeholder="****"
                    class="input"
                    maxlength="4"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <button class="button is-success">
                  Login
                </button>
              </div>
              <a href="#" class="float-right">1.0.0</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      pin: null
    };
  },
  mounted() {},
  methods: {
    ...mapMutations('loginStore', ['setUsuario']),
    login() {
      let usuario = this.usuarios.find(data => data.password === this.pin);
      if (usuario) {
        this.setUsuario(usuario);
        this.$router.push({ name: 'Dashboard' });
      }
    }
  },
  computed: {
    ...mapState('loginStore', ['usuarios'])
  }
};
</script>
