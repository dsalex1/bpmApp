<template>
  <div style="position: relative; height: 20px">
    <div
      style="position: absolute"
      :style="{
        height: 20 + 'px',
        width: (variance / (end - start)) * 4 * 100 + '%',
        top: 0,
        left: ((average - 2 * variance - start) / (end - start)) * 100 + '%',
      }"
      class="grad rounded-pill"
    ></div>
    <div
      v-for="bpm in [/*average,*/ average - variance, average + variance]"
      style="
        position: absolute;
        transform: translateX(-50%);
        top: 3px;
        font-size: 10px;
        font-weight: bold;
      "
      :style="{ left: ((bpm - start) / (end - start)) * 100 + '%' }"
    >
      {{ bpm }}
    </div>
    <div
      v-if="current"
      style="
        position: absolute;
        height: 26px;
        width: 1px;
        top: -3px;
        background-color: blue;
      "
      :style="{
        left: ((current - start) / (end - start)) * 100 + '%',
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{
  start: number;
  end: number;
  average: number;
  variance: number;
  current: number | null;
}>();

const { start, end, average, variance, current } = toRefs(props);
</script>

<style scoped>
.grad {
  background: linear-gradient(
    to right,
    red 0%,
    yellow 25%,
    rgb(0, 200, 0) 50%,
    yellow 75%,
    red 100%
  );
}
</style>
