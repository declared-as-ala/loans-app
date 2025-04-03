<template>
  <div id="app">
    <!-- The main container for our single-page app -->
    <LoginPage />
  </div>
</template>

<script>
import LoginPage from "./pages/LoginPage.vue";

export default {
  name: "App",
  components: {
    LoginPage,
  },
};
</script>

<style>
/* Global Styles */
body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background: #f5f7fa;
  color: #333;
}
</style>
