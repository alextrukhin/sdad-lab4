<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDBStore } from '@/stores/db'

const dbStore = useDBStore()
dbStore.initDB()
</script>

<template>
  <RouterView />
</template>
