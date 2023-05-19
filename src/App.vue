<template>
  <!-- bootstrap table-->
  <div class="h2 my-4 d-flex justify-content-center">
    BPM: {{ Math.round(tappedBpm || 0) || "/" }}
  </div>
  <table class="table table-striped table-hover">
    <tbody>
      <tr v-for="dance in sortedDanceData">
        <td :width="isWaltzTime ? '150px' : '100px'" class="py-0 pe-0">
          {{ dance.name }}
        </td>
        <td class="p-0" style="vertical-align: middle">
          <bpmRange
            :start="lowerLimit"
            :end="upperLimit"
            :average="dance.bpms[0]"
            :variance="dance.bpms[1]"
            :current="tappedBpm"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <div style="position: fixed; bottom: 0; width: 100%">
    <span class="form-check-inline form-switch ps-2 mb-2">
      <label for="flexSwitchCheckDefault">4/4</label>
      <input
        class="form-check-input mx-2"
        style="height: 20px; width: 40px"
        type="checkbox"
        v-model="isWaltzTime"
      />
      <label for="flexSwitchCheckDefault">3/4</label>
    </span>
    <div
      class="btn btn-secondary w-100 d-flex justify-content-center align-items-center"
      @click="
        lastTime = null;
        times = [];
      "
    >
      Reset
    </div>
    <div
      class="btn btn-primary w-100 d-flex justify-content-center align-items-center"
      style="height: 100px"
      @click="bpmTap"
    >
      Tap BPM
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import bpmRange from "./components/bpmRange.vue";
import { danceData } from "./data";

const isWaltzTime = ref(false);

const sortedDanceData = computed(() =>
  danceData
    .filter((s) => (isWaltzTime.value ? s.time == "3/4" : s.time == "4/4"))
    .sort((a, b) =>
      tappedBpm.value
        ? Math.abs(tappedBpm.value - a.bpms[0]) / a.bpms[1] -
          Math.abs(tappedBpm.value - b.bpms[0]) / b.bpms[1]
        : a.bpms[0] - b.bpms[0]
    )
);

const upperLimit = computed(
  () =>
    Math.max(...sortedDanceData.value.map((s) => s.bpms[0] + s.bpms[1] * 2)) + 5
);
const lowerLimit = computed(
  () =>
    Math.min(...sortedDanceData.value.map((s) => s.bpms[0] - s.bpms[1] * 2)) - 5
);

const TIMEOUT = 2000;

const times = ref<number[]>([]);
let lastTime: number | null = null;
let lastDifference: number | null = null;

function bpmTap() {
  var time = Date.now();
  if (lastTime) {
    lastDifference = time - lastTime;
    times.value.push(lastDifference);
  } else {
    times.value = [];
  }
  lastTime = time;
  beginTimeout();
}

const tappedBpm = computed(() => {
  if (times.value.length > 2) {
    const average = times.value.reduce((a, b) => a + b) / times.value.length;
    return (1 / (average / 1000)) * 60;
  }
  return null;
});

let timer: NodeJS.Timeout | undefined;
function beginTimeout() {
  clearTimeout(timer);
  timer = setTimeout(function () {
    lastTime = null;
  }, TIMEOUT);
}
</script>

<style scoped></style>
