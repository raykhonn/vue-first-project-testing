<script setup lang="ts">
import Single from "./components/singleUpload.vue";
import Multiple from "./components/multipleUpload.vue";
const maxSize = 1024 * 1024 * 10;
const maxElement = 10;
</script>

<template>
  <Single :maxSize="maxSize" />
  <Multiple
    :maxSize="maxSize"
    :maxElementCount="maxElement"
    :isMultiple="true"
  />
</template>

<style scoped></style>
