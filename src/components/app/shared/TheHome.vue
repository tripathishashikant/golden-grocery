<template>
  <div class="home">
    <h1 class="home__title">{{ title }}</h1>
    <h2 class="home__subTitle">{{ subTitle }}</h2>
  </div>
</template>

<script>
export default {
  name: "TheHome",
  data() {
    return {
      title: "Golden Grocery",
      subTitle: "Anything you want",
    };
  },
};
</script>

<style>
.home {
  padding: 1rem 0;
  text-align: center;
}
.home__title {
  font-size: 3.6rem;
  font-weight: normal;
  line-height: 1;
  color: purple;
  letter-spacing: 0.2rem;
  text-shadow: -0.1rem -0.1rem 0 black, 0.1rem -0.1rem 0 black,
    -0.1rem 0.1rem 0 black, 0.1rem 0.1rem 0 black;
}
.home__subTitle {
  margin-top: 5rem;

  font-size: 3.4rem;
  line-height: 1;
  color: white;
  letter-spacing: 0.3rem;
  text-shadow: -0.1rem -0.1rem 0 black, 0.1rem -0.1rem 0 black,
    -0.1rem 0.1rem 0 black, 0.1rem 0.1rem 0 black;
}
</style>
