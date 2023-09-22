<template>
  <nav class="navigation">
    <div class="navigation__logo logo">
      <router-link to="/" class="logo__link"> Golden Grocery </router-link>
    </div>
    <div class="navigation__links">
      <router-link to="/about" class="navigation__link navigation__link--login">
        Login
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNav",
  data() {
    return {
      title: "Navigation",
    };
  },
};
</script>

<style scoped>
.navigation {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  padding: 1rem 1.5rem;
}
.navigation__link {
  font-size: 1.6rem;
  color: white;
  text-decoration: none;
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
