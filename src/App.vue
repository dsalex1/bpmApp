<template>
  <!-- bootstrap table-->
  <div class="h2 my-4 d-flex justify-content-center">
    BPM: <span v-if="!tappedBpm">/</span>
    <span v-else
      >{{ Math.round(tappedBpm)
      }}{{
        tappedBpm < 100
          ? "/" + Math.round(tappedBpm * 2)
          : "/" + Math.round(tappedBpm / 2)
      }}</span
    >
  </div>
  <table class="table table-striped table-hover">
    <tbody>
      <tr v-for="dance in sortedDanceData">
        <td :width="isWaltzTime ? '150px' : '100px'" class="py-0 pe-0">
          {{ dance.name }}
        </td>
        <td class="p-0 overflow-hidden" style="vertical-align: middle">
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
    <div
      class="form-check-inline form-switch ps-2 mb-2 d-flex align-items-center justify-content-center"
    >
      <label for="flexSwitchCheckDefault">4/4</label>
      <input
        class="form-check-input mx-2"
        style="height: 30px; width: 60px"
        type="checkbox"
        v-model="isWaltzTime"
      />
      <label for="flexSwitchCheckDefault">3/4</label>
    </div>
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
    .sort((a, b) => {
      if (!tappedBpm.value) return a.bpms[0] - b.bpms[0];
      function getCloserValue(a: number) {
        if (!tappedBpm.value) return 0;
        const cmp1 =
          tappedBpm.value < 100 ? tappedBpm.value * 2 : tappedBpm.value / 2;
        const cmp2 = tappedBpm.value;
        return Math.abs(a - cmp1) < Math.abs(a - cmp2) ? cmp1 : cmp2;
      }
      return (
        Math.abs(getCloserValue(a.bpms[0]) - a.bpms[0]) / a.bpms[1] -
        Math.abs(getCloserValue(b.bpms[0]) - b.bpms[0]) / b.bpms[1]
      );
    })
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
