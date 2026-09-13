<script setup lang="ts">
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'

withDefaults(defineProps<{
  label?: string
  caption?: string
  icon?: string
  iconColor?: 'primary' | 'secondary' | 'accent' | 'muted' | 'positive' | 'negative' | 'warning' | 'white'
  clickable?: boolean
  active?: boolean
  border?: boolean
}>(), {
  iconColor: 'muted',
  clickable: false,
  active: false,
})

defineEmits<{
  click: []
}>()
</script>

<template>
  <q-item
    :clickable="clickable"
    :class="['basic-list-item', { 'basic-list-item--active': active, 'basic-list-item--border': border }]"
    v-ripple="clickable ? { color: 'rgba(99,102,241,0.15)' } : false"
    @click="$emit('click')"
  >
    <q-item-section v-if="icon" avatar class="basic-list-item__icon-section">
      <basic-icon-box size="xs" variant="soft">
        <basic-icon :name="icon" size="16px" :color="active ? 'secondary' : iconColor" />
      </basic-icon-box>
    </q-item-section>

    <q-item-section>
      <q-item-label class="list-item-title">{{ label }}</q-item-label>
      <q-item-label v-if="caption" caption class="list-item-caption">{{ caption }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <slot name="right" />
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
.basic-list-item {
  border-radius: 12px;
  min-height: 56px;
  padding: 8px 12px;
  margin-bottom: 4px;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &--border {
    border: 1px solid #2b2e42!important;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &--active {
    background: rgba($primary, 0.1) !important;
    border-color: rgba($primary, 0.2);

    :deep(.icon-box--soft) {
      background: rgba($primary, 0.2);
      border-color: rgba($primary, 0.35);
    }
  }

  &.q-item--clickable:hover {
    background: rgba($primary, 0.06) !important;
    border-color: rgba($primary, 0.12);

    :deep(.icon-box--soft) {
      background: rgba($primary, 0.12);
    }
  }

  &__icon-section {
    min-width: 44px;
  }
}
</style>
