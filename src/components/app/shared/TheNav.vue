<template>
  <nav class="navigation">
    <div class="navigation__logo logo">
      <router-link to="/" class="logo__link"> {{ logoTitle }} </router-link>
    </div>
    <div class="navigation__links">
      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="navigation__link navigation__link--login"
      >
        {{ loginLinkTitle }}
      </router-link>
      <div
        v-if="isAuthenticated && user.role === 'admin'"
        class="navigation__link navigation__link--active"
      >
        Stock
      </div>
      <div
        v-if="isAuthenticated"
        class="navigation__link navigation__link--user"
      >
        <span>{{ user.username }}</span>
        <div class="navigation__dropdown">
          <ul>
            <li @click="logout">
              {{ logoutLinkTitle }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const logoTitle = ref("Golden Grocery");
const loginLinkTitle = ref("Login");
const logoutLinkTitle = ref("Logout");

const isAuthenticated = computed(
  () => store.getters["loginStore/isAuthenticated"]
);
const user = computed(() => store.getters["loginStore/getUser"]);

const logout = () => {
  store.dispatch("loginStore/logout");
  router.push("/login");
};
</script>

<style scoped>
.navigation {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  padding: 0 0 0 1.5rem;
}
.navigation__link {
  display: inline-block;
  padding: 1rem 1.5rem;
  font-size: 1.6rem;
  color: white;
  text-decoration: none;
}
.navigation__link:hover,
.navigation__link--active {
  background-color: #6600cc;
}
.navigation__link--user {
  position: relative;
}
.navigation__link--user:hover .navigation__dropdown {
  display: block;
}

.navigation__dropdown {
  display: none;
  position: absolute;
  top: 100%;
  right: 0.5rem;
  background-color: white;
}
.navigation__dropdown ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.navigation__dropdown li {
  padding: 1rem;
  color: black;
  cursor: pointer;
  box-shadow: 0 0 3px 0 black;
}

.navigation__logo {
  flex: 0 1 20rem;
}

.logo__link {
  font-size: 1.6rem;
  color: white;
  text-decoration: none;
}
</style>
