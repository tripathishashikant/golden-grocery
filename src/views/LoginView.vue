<template>
  <div class="login">
    <div class="login__wrapper">
      <h2 class="login__title">Login</h2>
      <div class="login__errorWrapper">
        <p v-if="isInvalidUser" class="login__error">
          {{ invalidUserErrorMessage }}
        </p>
        <p v-if="isfetchUserError" class="login__error">
          {{ serviceErrorMessage }}
        </p>
      </div>
      <div class="login__formWrapper">
        <form class="login__form">
          <label
            class="login__label login__label--name"
            title="Enter username here"
            for="loginUserName"
          >
            <input
              id="loginUserName"
              class="login__input login__input--name"
              type="text"
              placeholder="Enter username"
              v-model="loginData.username"
            />
          </label>
          <label
            class="login__label login__label--password"
            title="Enter password here"
            for="loginPassword"
          >
            <input
              id="loginPassword"
              class="login__input login__input--password"
              type="password"
              placeholder="Enter password"
              v-model="loginData.password"
            />
          </label>
          <div class="login__btnWrapper">
            <button class="login__btn" @click.prevent="onSubmit">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const invalidUserErrorMessage = ref("Invalid User!");
const serviceErrorMessage = ref(
  "Service Unavailable. Please try again after sometime!"
);

const loginData = {
  username: null,
  password: null,
};

const isInvalidUser = computed(() => store.getters["loginStore/isInvalidUser"]);
const isfetchUserError = computed(
  () => store.getters["loginStore/isfetchUserError"]
);

watch(
  () => store.getters["loginStore/redirectTo"],
  (newValue) => {
    router.push(newValue);
  }
);

const onSubmit = () => {
  store.dispatch("loginStore/login", loginData);
};
</script>

<style scoped>
.login {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  margin: 2rem 0;
}
.login__wrapper {
  width: 100%;
  max-width: 50%;
  padding: 1rem 1.5rem;
  box-shadow: 0px 1px 3px -1px rgba(0, 0, 0, 0.74);
  background-color: #ece3d5;
}
.login__title {
  text-align: center;
}
.login__formWrapper {
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.login__form {
  display: block;
  width: 70%;
  margin: 0 auto;
}
.login__label {
  display: block;
  padding: 1rem 0;
}
.login__input {
  width: 100%;
}
.login__btnWrapper {
  padding-bottom: 2rem;
  text-align: center;
}
.login__btn {
  display: inline-block;
}
.login__error {
  margin-top: 1rem;
  padding: 1rem;

  color: red;
  border: maroon;
  background-color: #d39576;
}
</style>
