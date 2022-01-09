<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
    </header>
    <div class="text-left">
      <p>
        <strong>Token:</strong>
        {{ currentUser.accessToken.substring(0, 20) }} ...
        {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
      </p>
      <p>
        <strong>Id:</strong>
        {{ currentUser.id }}
      </p>
      <p>
        <strong>Email:</strong>
        {{ currentUser.email }}
      </p>
      <strong>Authorities:</strong>
      <ul>
        <li v-for="role in currentUser.authorities" :key="role">{{ role }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import store from "@/store";
import router from "@/router";
import { LoginUser } from "@/services/model";

export default defineComponent({
  name: 'Profile',
  setup() {
    const currentUser = computed((): LoginUser => store.state.auth.user);

    onMounted(() => {
      if (!currentUser.value) {
        router.push('login');
      }
    })

    return {
      currentUser
    }
  }
})
</script>

<style scoped>
</style>
