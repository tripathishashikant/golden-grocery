<template>
  <div v-if="show" class="modal">
    <div class="modal__wrapper">
      <div class="modal__header">
        <slot name="header">
          <h2 class="modal__title">ModalHeader</h2>
        </slot>
        <button class="modal__close" @click.prevent="closeModal">X</button>
      </div>
      <div class="modal__body">
        <slot name="body">
          <p>Modal Content goes here</p>
        </slot>
      </div>
      <div class="modal__footer">
        <slot name="footer">
          <button @click="closeModal">X</button>
        </slot>
      </div>
    </div>
    <div class="modal__backdraw" @click.prevent="closeModal"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const show = computed(() => store.state.modalStore.open);

const closeModal = () => {
  store.dispatch("modalStore/closeModal");
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.6);
  z-index: 8;
}

.modal__backdraw {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 8;
}

.modal__wrapper {
  width: 100%;
  max-width: 70rem;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0 none;
  border-radius: 1rem;
  background: ivory;
  z-index: 9;
}

.modal__close {
  position: absolute;
  top: -1rem;
  right: -1rem;
  width: 2.4rem;
  height: 2.4rem;
  border: 0 none;
  box-shadow: 0 0 3px 0 black;
  border-radius: 1.2rem;
  background: blueviolet;
  color: white;
  cursor: pointer;
}
</style>
