<template>
  <section class="hero is-info is-fullheight">
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
                  LOGIN
                </button>
              </div>
              <a href="#" class="float-right">1.0.10</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      pin: null,
    };
  },
  mounted() {},
  methods: {
    ...mapMutations('loginStore', ['setUsuario']),
    ...mapActions('loginStore', ['postUserToken']),
    login() {
      this.postUserToken(this.pin)
        .then((response) => {
          if (response) {
            this.setUsuario(response.data.message[0]);
            this.$router.push({ name: 'Dashboard' });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState('loginStore', ['usuarios']),
  },
};
</script>
