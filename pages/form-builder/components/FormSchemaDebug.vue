<script lang="ts" setup>
defineProps({
  data: { type: Object },
  schema: { type: Object },
});
</script>

<template>
  <div class="p-6 mb-6 border-solid border-2 border-slate-500">
    <h3 class="mb-3 text-lg">Dados</h3>
    <pre>{{ data }}</pre>
  </div>

  <div class="p-6 border-solid border-2 border-slate-500">
    <h3 class="my-3 text-lg">Estrutura</h3>
    <pre>{{ schema }}</pre>
  </div>
</template>
