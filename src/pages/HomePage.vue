<template>
  <main>
    <h1>Home Page</h1>
    <ul>
      <li v-for="item in dbStore.jobPositions" :key="item.id">
        <RouterLink :to="`/position/${item.id}`"
          >{{ item.title }} - {{ item.location }} - ${{ item.salary }}</RouterLink
        >
      </li>
    </ul>
  </main>
</template>
<script setup lang="ts">
import { useDBStore } from '@/stores/db'

const dbStore = useDBStore()
</script>
<style>
main {
  padding: 20px;
}
</style>
