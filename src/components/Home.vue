<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Todo items: {{ content }}</h3>
    </header>
  </div>
</template>

<script lang="ts">
import UserService from "../services/user.service";
import { defineComponent, onMounted, reactive } from "vue";

export default defineComponent({
  name: 'Home',
  setup() {
    let content = reactive({});

    onMounted(() => {
      UserService.getPublicContent().then(
          (response) => {
            content = response.data;
          },
          (error) => {
            content = (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();
          }
      )
    })

    return { content }
  }
})
</script>

<style scoped>

</style>
