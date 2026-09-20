<script setup lang="ts">
import BasicIconButton from "@/components/common/button/BasicIconButton.vue"
import {copyToClipboard} from "quasar";
import {useNotificationAdapter} from "@/composabiles/adapter/notification/useNotificationAdapter";
import {ref} from "vue";
import BasicIcon from "@/components/common/icon/BasicIcon.vue";

const props = defineProps<{
  label: string
  text: string
  tooltip?: string
  isPassword?: boolean
  isExternalLink?: boolean
  isText?: boolean
}>()

const showPassword = ref(!props.isPassword)

const notify = useNotificationAdapter()

const copyText = async (text: string, label: string) => {
  if (!text) return
  try {
    await copyToClipboard(text)
    notify.success(`${label} kopiert`)
  } catch {
    try {
      await navigator.clipboard.writeText(text)
      notify.success(`${label} kopiert`)
    } catch {
      notify.error(`${label} konnte nicht kopiert werden`)
    }
  }
}
</script>

<template>
  <q-card flat bordered class="row items-center justify-between q-pa-md bg-dark rounded-borders">
    <div class="col overflow-hidden q-pr-sm">
      <div class="section-label q-mb-xs">{{ label }}</div>

      <span v-if="isPassword && !showPassword" class="text-grey-6 text-weight-bold non-selectable" style="letter-spacing: 2px;">
        ••••••••••••••••
      </span>

      <a
        v-else-if="isExternalLink"
        :href="text"
        target="_blank"
        rel="noopener noreferrer"
        class="text-secondary text-weight-medium row items-center q-gutter-xs ellipsis inline"
        style="text-decoration: none;"
      >
        <span class="ellipsis">{{ text }}</span>
        <basic-icon name="open_in_new" size="13px" color="secondary" />
      </a>

      <div v-else :class="[isText ? '' : 'ellipsis', 'text-body text-weight-medium']">
        {{ text }}
      </div>

    </div>

    <div class="row items-center q-gutter-xs">
      <basic-icon-button
        v-if="isPassword"
        :icon="showPassword ? 'visibility_off' : 'visibility'"
        :tooltip="showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'"
        @click="showPassword = !showPassword"
      />
      <basic-icon-button
        icon="content_copy"
        :tooltip="tooltip ? tooltip : 'Kopieren'"
        @click="copyText(text, label)"
      />
    </div>
  </q-card>
</template>

<style scoped lang="scss">
</style>
