<template>
  <div class="login-container">
    <!-- Card-like login box -->
    <div class="login-card">
      <h1 class="title">Welcome Back</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="e.g. user@example.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="********"
            required
          />
        </div>

        <button :disabled="loading" class="btn-login">
          {{ loading ? "Logging In..." : "Login" }}
        </button>
      </form>
      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.loading = true;
        this.errorMessage = "";

        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed. Check credentials.");
        }

        localStorage.setItem("token", data.token);
        this.$router.push("/dashboard");
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Scoped CSS for the login component */

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* full screen */
  background: #f5f7fa;
}

.login-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px 30px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.2s ease-in-out;
}

.login-card:hover {
  box-shadow: 0 11px 24px rgba(0, 0, 0, 0.15);
}

.title {
  margin-bottom: 24px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 16px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px 14px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.2s ease;
  outline: none;
}

input:focus {
  border-color: #4285f4; /* highlight on focus */
}

.btn-login {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  background-color: #4285f4;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-login:hover {
  background-color: #2f6cd6;
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  margin-top: 16px;
  color: #d93025;
  font-weight: 500;
}
</style>
