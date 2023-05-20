<template>
  <!-- bootstrap table-->
  <div class="h2 my-4 d-flex justify-content-center">
    BPM:&nbsp;<span v-if="!tappedBpm">/</span>
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
      class="btn-group w-100"
      role="group"
      aria-label="Basic radio toggle button group"
      v-if="!isWaltzTime"
    >
      <input
        type="radio"
        class="btn-check"
        value="All"
        v-model="tag"
        id="tagAll"
      />
      <label class="btn btn-outline-secondary" for="tagAll">All</label>
      <input
        type="radio"
        class="btn-check"
        value="Latin"
        v-model="tag"
        id="tagLatin"
      />
      <label class="btn btn-outline-secondary" for="tagLatin">Latin</label>
      <input
        type="radio"
        class="btn-check"
        value="Standard"
        v-model="tag"
        id="tagStandard"
      />
      <label class="btn btn-outline-secondary" for="tagStandard"
        >Standard</label
      >
      <input
        type="radio"
        class="btn-check"
        value="EDM"
        v-model="tag"
        id="tagEDM"
      />
      <label class="btn btn-outline-secondary" for="tagEDM">EDM</label>
    </div>
    <div class="mb-2 d-flex justify-content-center">
      <div
        class="m-0 p-0 form-check-inline form-switch d-flex align-items-center"
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
      <div class="m-3 p-0 form-check-inlined d-flex align-items-center">
        <input
          class="form-check-input mx-2"
          style="height: 30px; width: 30px"
          type="checkbox"
          v-model="shouldSort"
        />
        <label for="flexSwitchCheckDefault">Sort</label>
      </div>
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
      style="height: 150px"
      @click="bpmTap"
      @touchstart="navigator.vibrate(1)"
    >
      Tap BPM
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import bpmRange from "./components/bpmRange.vue";
import { danceData } from "./data";

const navigator = window.navigator;

const isWaltzTime = ref(false);
watch(isWaltzTime, () => {
  if (isWaltzTime.value) {
    tag.value = "All";
  }
});
const shouldSort = ref(false);
const tag = ref<"All" | "Latin" | "Standard" | "EDM">("All");

const sortedDanceData = computed(() =>
  danceData
    .filter((s) => (isWaltzTime.value ? s.time == "3/4" : s.time == "4/4"))
    .filter((s) => (tag.value == "All" ? true : s.tags.includes(tag.value)))
    .sort((a, b) => {
      if (!tappedBpm.value || !shouldSort.value) return a.bpms[0] - b.bpms[0];
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

<style scoped>
.btn-primary {
  --bs-btn-bg: #0c3a80;
  --bs-btn-border-color: #094aac;
  --bs-btn-hover-bg: #073f92;
  --bs-btn-hover-border-color: #073f92;
  --bs-btn-active-bg: #073f92;
  --bs-btn-active-border-color: #083c8b;
  --bs-btn-disabled-bg: #133b77;
  --bs-btn-disabled-border-color: #094aac;
}
.btn-secondary {
  --bs-btn-bg: #4c5358;
  --bs-btn-border-color: #4c5358;
  --bs-btn-hover-bg: #43484d;
  --bs-btn-hover-border-color: #383d41;
  --bs-btn-active-bg: #383d41;
  --bs-btn-active-border-color: #35393d;
  --bs-btn-disabled-bg: #4c5358;
  --bs-btn-disabled-border-color: #4c5358;
}
</style>
