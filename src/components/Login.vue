<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          src="//tw.systex.com/wp-content/uploads/sites/2/%E7%94%A8%E9%9B%B2_1920x1080.jpg"
          class="profile-img-card" alt="Login ICON"/>
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Username</label>
          <Field id="username" name="username" type="text" class="form-control"/>
          <ErrorMessage name="username" class="error-feedback"/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field id="password" name="password" type="password" class="form-control"/>
          <ErrorMessage name="password" class="error-feedback"/>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { computed, defineComponent, ref } from "vue";
import store from "@/store";
import router from "@/router";
import { LoginUser } from "@/services/model";

export default defineComponent({
  name: 'Login',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    const loading = ref(false);
    const message = ref('');
    const loggedIn = computed(() => {
      return store.state.auth.status.loggedIn
    });

    if (loggedIn.value) {
      router.push('/profile');
    }

    return {
      schema,
      loading,
      message,
      loggedIn,
    }
  },
  methods: {
    handleLogin(user: LoginUser) {
      this.loading = true;

      store.dispatch("auth/login", user).then(
          () => {
            router.push("/profile");
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();
          }
      );
    },
  }
})
</script>

<style scoped>
</style>
