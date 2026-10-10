<script setup lang="ts">
import { copyToClipboard } from 'quasar'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import { useNotificationAdapter } from '@/composabiles/adapter/notification/useNotificationAdapter'
import type { PremiumCreateRequest } from '@/types/Request/PremiumCreateRequest'

const props = defineProps<{
  code: string
  details?: PremiumCreateRequest | null
  isLifetime?: boolean
}>()

const successText = 'Code in Zwischenablage kopiert'

const notify = useNotificationAdapter()

const copyCode = async () => {
  if (!props.code) return

  try {
    await copyToClipboard(props.code)
    notify.success(successText)
  } catch {
    try {
      await navigator.clipboard.writeText(props.code)
      notify.success(successText)
    } catch {
      notify.error('Kopieren fehlgeschlagen')
    }
  }
}
</script>

<template>
  <div class="premium-success-card full-width q-mt-lg">
    <div class="row items-center justify-between q-mb-sm">
      <span class="result-label-text">
        <basic-icon name="vpn_key" size="14px" color="primary" />
        Generierter Premium-Code
      </span>
    </div>

    <div class="code-box row items-center justify-between q-pa-md no-wrap">
      <div class="mono code-text ellipsis q-pr-sm">
        {{ code }}
      </div>
      <basic-button
        icon="content_copy"
        variant="secondary"
        size="sm"
        :full-width="false"
        type="button"
        @click="copyCode"
      />
    </div>

    <div class="row items-center justify-between q-mt-sm text-caption text-muted">
      <span v-if="details?.durationInDays">
        Gültigkeit: {{ details.durationInDays }} Tage
      </span>
      <span v-else-if="isLifetime || details?.durationInDays === null">
        Gültigkeit: Lebenslang (Lifetime)
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.premium-success-card {
  border-radius: 16px;
  background: rgba($primary, 0.06);
  border: 1px solid rgba($primary, 0.3);
  padding: 16px;
  box-shadow: 0 0 20px rgba($primary, 0.08);
}

.code-box {
  background: rgba(15, 17, 23, 0.9);
  border-radius: 12px;
}

.code-text {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: $text-primary;
}
</style>
