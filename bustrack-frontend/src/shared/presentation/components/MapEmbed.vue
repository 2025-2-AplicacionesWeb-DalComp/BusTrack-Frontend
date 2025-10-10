<script setup lang="js">
defineProps({
  q: { type: String, required: true },
  height: { type: [String, Number], default: 360 }
})
</script>

<template>
  <div class="map-wrap">
    <iframe
        :src="`https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=16&ie=UTF8&iwloc=&output=embed`"
        :height="height"
        width="100%"
        style="border:0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </div>
</template>

<style scoped>
.map-wrap {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,.12);
}
</style>
