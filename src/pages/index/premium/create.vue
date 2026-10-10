<script setup lang="ts">
import { computed, ref } from 'vue'
import BasicCard from '@/components/common/card/BasicCard.vue'
import BasicForm from '@/components/common/form/BasicForm.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import BasicInput from '@/components/common/input/BasicInput.vue'
import BasicChip from '@/components/common/chip/BasicChip.vue'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicDivider from '@/components/common/divider/BasicDivider.vue'
import PremiumSuccessCard from '@/components/premium/PremiumSuccessCard.vue'
import { Http } from '@/services/http/Http'
import { useNotificationAdapter } from '@/composabiles/adapter/notification/useNotificationAdapter'
import type { PremiumCreateRequest } from '@/types/Request/PremiumCreateRequest'
import CheckboxCard from "@/components/common/checkbox/CheckboxCard.vue";

interface PremiumCreatePayload {
  durationInDays?: number
  isLifetime?: boolean
}

const http = new Http()
const notify = useNotificationAdapter()

const currentCode = ref('')
const createdCodeDetails = ref<PremiumCreateRequest | null>(null)
const isLifetime = ref(false)
const durationInDays = ref<number | string>(30)
const isLoading = ref(false)

const presetOptions = [
  { label: '1 Monat', days: 30 },
  { label: '3 Monate', days: 90 },
  { label: '6 Monate', days: 180 },
  { label: '1 Jahr', days: 365 },
]

const canSubmit = computed(() => {
  if (isLifetime.value) return true
  const days = Number(durationInDays.value)
  return !isNaN(days) && days > 0
})

const handleCreatePremiumCode = async () => {
  isLoading.value = true

  const payload: PremiumCreatePayload = isLifetime.value
    ? { isLifetime: true }
    : { durationInDays: Number(durationInDays.value) }

  try {
    const res = await http.post<PremiumCreateRequest>('api/premium/create', payload)

    if (res.success && res.data) {
      createdCodeDetails.value = res.data
      currentCode.value = res.data.code
    } else {
      notify.error('Fehler beim Erstellen des Premium-Codes')
    }
  } catch (err: unknown) {
    notify.error('Unerwarteter Fehler beim Erstellen des Codes')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-center">
    <basic-card max-width="540px" class="flex">
      <div class="q-mb-md">
        <div class="row items-center justify-between q-mb-md">
          <basic-icon-box size="md" variant="gradient">
            <basic-icon name="workspace_premium" size="24px" color="white" />
          </basic-icon-box>
        </div>

        <div class="card-title card-title--lg">Premium-Code erstellen</div>
        <div class="card-subtitle q-mt-xs">
          Generiere zeitbasierte oder lebenslange Aktivierungscodes für Benutzer.
        </div>
      </div>

      <basic-divider label="Gültigkeit" class="q-mb-md" />

      <basic-form class="q-gutter-y-md" @submit="handleCreatePremiumCode">
        <checkbox-card
          v-model="isLifetime"
          label="Lifetime-Gültigkeit (Lebenslang)"
          caption="Gewährt unbegrenzten Premium-Zugriff ohne Ablaufdatum."
          icon="all_inclusive"
          :disable="isLoading"
        />

        <div :class="{ 'disabled-section': isLifetime }" class="q-gutter-y-xs">
          <basic-input
            v-model="durationInDays"
            type="number"
            label="Gültigkeitsdauer (in Tagen)"
            icon="event"
            :disable="isLifetime || isLoading"
            :hint="isLifetime ? 'Nicht erforderlich bei Lifetime-Codes' : 'Anzahl der Tage ab Einlösung des Codes'"
          />

          <div v-if="!isLifetime" class="row items-center q-gutter-xs q-pt-xs">
            <span class="text-caption text-muted q-mr-xs">Schnellauswahl:</span>
            <basic-chip
              v-for="preset in presetOptions"
              :key="preset.days"
              :label="preset.label"
              :active="Number(durationInDays) === preset.days"
              :disable="isLoading"
              @click="durationInDays = preset.days"
            />
          </div>
        </div>

        <div class="q-pt-sm">
          <basic-button
            label="Premium-Code generieren"
            icon="bolt"
            type="submit"
            :loading="isLoading"
            :disable="!canSubmit"
            full-width
          />
        </div>
      </basic-form>

      <premium-success-card
        v-if="currentCode"
        :code="currentCode"
        :details="createdCodeDetails"
        :is-lifetime="isLifetime"
      />
    </basic-card>
  </div>
</template>

<style scoped lang="scss">
.disabled-section {
  opacity: 0.55;
  transition: opacity 0.2s ease;
}
</style>
