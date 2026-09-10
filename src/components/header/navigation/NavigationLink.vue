<script setup lang="ts">
import { NavigationLinkProps } from '@/types/navigation/NavigationLinkProps'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'

const props = withDefaults(defineProps<NavigationLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
})

const route = useRoute()
const isActive = computed(() => props.link !== '#' && route.path === props.link)
</script>

<template>
  <q-item
    clickable
    tag="a"
    :href="link"
    :class="['nav-link', { 'nav-link--active': isActive }]"
    v-ripple="{ color: 'rgba(99,102,241,0.2)' }"
  >
    <q-item-section v-if="icon" avatar class="nav-link__icon-section">
      <basic-icon-box size="xs" variant="nav">
        <basic-icon :name="icon" size="18px" :color="isActive ? 'secondary' : 'muted'" />
      </basic-icon-box>
    </q-item-section>

    <q-item-section>
      <q-item-label class="nav-link__label">{{ label }}</q-item-label>
      <q-item-label v-if="caption" caption class="nav-link__caption">{{ caption }}</q-item-label>
    </q-item-section>

    <q-item-section v-if="isActive" side>
      <div class="nav-link__active-dot" />
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
.nav-link {
  border-radius: 12px;
  min-height: 44px;
  padding: 0 12px;
  margin-bottom: 2px;
  transition: all 0.2s ease;
  color: $text-muted;
  border-left: 3px solid transparent;

  &:hover {
    background: rgba($primary, 0.08) !important;
    color: $text-primary;

    :deep(.icon-box) {
      background: rgba($primary, 0.12);
    }

    :deep(.icon-color--muted) {
      color: $secondary;
    }
  }

  &--active {
    background: rgba($primary, 0.12) !important;
    border-left-color: $primary;
    color: $secondary;

    :deep(.icon-box) {
      background: rgba($primary, 0.15);
    }
  }

  &__icon-section {
    min-width: 36px;
  }

  &__label {
    font-size: 14px;
    font-weight: 500;
    color: inherit;
    transition: color 0.2s ease;
  }

  &__caption {
    font-size: 11px;
    color: $text-muted;
  }

  &__active-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $primary;
    box-shadow: 0 0 8px rgba($primary, 0.6);
  }
}
</style>
