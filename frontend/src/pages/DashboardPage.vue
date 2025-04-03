<template>
  <div class="dashboard">
    <h1>Welcome to the Dashboard 🎉</h1>
    <p>You are logged in!</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "DashboardPage",
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 40px;
  text-align: center;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #e53935;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #c62828;
}
</style>
