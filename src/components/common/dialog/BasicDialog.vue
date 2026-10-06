<script setup lang="ts">
import BasicCard from '@/components/common/card/BasicCard.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicIconButton from '@/components/common/button/BasicIconButton.vue'

const model = defineModel<boolean>({ default: false })

withDefaults(defineProps<{
  maxWidth?: string
  persistent?: boolean
  seamless?: boolean
  fullWidth?: boolean
  padding?: string
  title?: string
  subtitle?: string
  icon?: string
  showClose?: boolean
}>(), {
  maxWidth: '520px',
  persistent: false,
  seamless: false,
  fullWidth: true,
  padding: 'q-pa-lg',
  showClose: true,
})

defineEmits<{
  hide: []
  show: []
}>()
</script>

<template>
  <q-dialog
    v-model="model"
    :persistent="persistent"
    :seamless="seamless"
    backdrop-filter="blur(8px) brightness(50%)"
    transition-show="scale"
    transition-hide="scale"
    @hide="$emit('hide')"
    @show="$emit('show')"
  >
    <basic-card
      :max-width="maxWidth"
      :full-width="fullWidth"
      :padding="padding"
      class="relative-position overflow-hidden"
    >
      <div v-if="title || $slots.header || showClose" class="row items-center justify-between q-mb-md">
        <div class="col">
          <slot name="header">
            <div class="row items-center q-gutter-sm">
              <div v-if="icon" class="q-mr-xs">
                <basic-icon :name="icon" size="22px" color="primary" />
              </div>
              <div>
                <div v-if="title" class="card-title card-title--lg">{{ title }}</div>
                <div v-if="subtitle" class="card-subtitle q-mt-xs">{{ subtitle }}</div>
              </div>
            </div>
          </slot>
        </div>

        <basic-icon-button
          v-if="showClose"
          icon="close"
          class="q-ml-sm"
          v-close-popup
        />
      </div>

      <div>
        <slot />
      </div>

      <div v-if="$slots.actions" class="q-mt-lg">
        <slot name="actions" />
      </div>
    </basic-card>
  </q-dialog>
</template>
