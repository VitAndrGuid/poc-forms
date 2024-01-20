<script lang="ts" setup>
console.log("hello world");
</script>

<template>
  <div class="p-12 bg-slate-800 min-h-full">
    <FormKit
      type="text"
      name="name"
      id="name"
      label="Name"
      help="Your full name"
      placeholder="Jon Doe"
    />

    <FormKit
      type="range"
      name="strength"
      id="strength"
      label="Strength"
      value="5"
      min="1"
      max="10"
      step="1"
      help="How many strength points should this character have?"
    />
  </div>
</template>
