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
      class="text-dark"
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

    <div
      v-if="current"
      style="
        position: absolute;
        height: 26px;
        width: 1px;
        top: -3px;
        background-color: rgba(0, 0, 255, 0.4);
      "
      :style="{
        left:
          (((current < 100 ? current * 2 : current / 2) - start) /
            (end - start)) *
            100 +
          '%',
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
    hsl(0, 100%, 35%) 0%,
    hsl(60, 100%, 35%) 25%,
    hsl(120, 100%, 35%) 50%,
    hsl(60, 100%, 35%) 75%,
    hsl(0, 100%, 35%)
  );
}
</style>
