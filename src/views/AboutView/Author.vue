<script setup lang="ts">
const props = defineProps({
  name: {type: String, required: true},
  highlightedIndices: {type: Array<number>, required: true},
  description: {type: String, required: true},
})

type Segment = {
  text: string
  highlighted: boolean
}

function splitByHighlight(word: string, highlightedIndexes: number[]): Segment[] {
  if (!word) return []
  if (!highlightedIndexes.length) return [{text: word, highlighted: false}]

  // Сортировка индексов и убираем дубли
  const sorted = [...new Set(highlightedIndexes)].sort((a, b) => a - b)

  const segments: Segment[] = []
  let currentText = ''
  let currentHighlight = sorted.includes(0)

  for (let i = 0; i < word.length; i++) {
    const isHighlighted = sorted.includes(i)

    if (isHighlighted !== currentHighlight && currentText) {
      segments.push({text: currentText, highlighted: currentHighlight})
      currentText = ''
    }

    currentText += word[i]
    currentHighlight = isHighlighted
  }

  if (currentText) {
    segments.push({text: currentText, highlighted: currentHighlight})
  }

  return segments
}

const letters = splitByHighlight(props.name, props.highlightedIndices)

const selected = defineModel({default: false})
</script>

<template>
  <div class="flex-center flex-col gap-4 border p-5 rounded-xl hover:bg-secondary/20"
       @mouseenter="selected = true"
       @mouseleave="selected = false">
    <h1 class="text-5xl font-bold">
      <span v-for="l in letters" :key="l.text"
            class="transition-colors"
            :class="{'text-primary':selected && l.highlighted, 'text-secondary': selected && !l.highlighted}">
        {{ l.text }}
      </span>
    </h1>
    <p class="text-2xl font-thin">{{ description }}</p>
  </div>
</template>