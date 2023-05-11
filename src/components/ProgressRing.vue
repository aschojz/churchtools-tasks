<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    percent: number;
}>();
const radius = 10;
const strokeWidth = 2;
const circumference = radius * 2 * Math.PI;

const strokeDasharray = computed(() => `${circumference} ${circumference}`);
const strokeDashoffset = computed(() => {
    const offset = circumference - (props.percent / 100) * circumference;
    return offset;
});
const width = computed(() => 22);
</script>
<template>
    <div class="relative">
        <svg class="progress-ring" :width="width" :height="width">
            <circle
                :style="`stroke-dasharray: ${strokeDasharray}; stroke-dashoffset: ${strokeDashoffset}`"
                class="progress-ring__circle"
                :stroke-width="strokeWidth"
                fill="transparent"
                :r="radius"
                :cx="radius + strokeWidth / 2"
                :cy="radius + strokeWidth / 2"
            />
        </svg>
        <span class="absolute">{{ percent }}%</span>
    </div>
</template>
<style scoped>
.progress-ring {
    flex-shrink: 0;
}

.progress-ring__circle {
    fill: var(--gray-200);
    stroke: var(--green-500);
    transition: 0.35s stroke-dashoffset;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
}
span {
    color: black;
    font-size: 8px;
    top: 0;
    width: 22px;
    text-align: center;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
