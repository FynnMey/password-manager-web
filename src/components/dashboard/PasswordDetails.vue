<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { copyToClipboard } from 'quasar'
import { useVaultStore } from '@/stores/vaultStore'
import { useNotificationAdapter } from '@/composabiles/adapter/notification/useNotificationAdapter'

import BasicDialog from '@/components/common/dialog/BasicDialog.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import IconUrl from '@/components/dashboard/IconUrl.vue'
import LabelAndTextCard from "@/components/common/card/LabelAndTextCard.vue"

const vaultStore = useVaultStore()
const { activeField } = storeToRefs(vaultStore)
const notify = useNotificationAdapter()

const showPassword = ref(false)

const model = computed({
  get: () => !!activeField.value,
  set: (value) => {
    if (!value) {
      activeField.value = null
    }
  },
})

watch(model, (isOpen) => {
  if (!isOpen) {
    showPassword.value = false
  }
})

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

const formatDate = (dateStr?: string) => {
  if (!dateStr) return null
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return null
    return d.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return null
  }
}
</script>

<template>
  <basic-dialog
    v-model="model"
    max-width="540px"
    padding="q-pa-lg"
  >
    <template v-if="activeField" #header>
      <div class="row items-center q-gutter-md no-wrap col">

        <icon-url v-if="activeField.website" :url="activeField.website" height="25px" width="25px" no-full-width />
        <basic-icon-box v-else size="md" variant="soft">

          <basic-icon name="vpn_key" size="22px" color="white" />
        </basic-icon-box>

        <div class="col-auto overflow-hidden">
          <div class="row items-center q-gutter-xs no-wrap">
            <div class="card-title card-title--lg ellipsis">
              {{ activeField.name || 'Passwort-Details' }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-if="activeField" class="q-gutter-y-sm q-mt-xs">
      <label-and-text-card label="E-Mail / Benutzername" :text="activeField.account || ''" />
      <label-and-text-card label="Passwort" :text="activeField.password || ''" is-password />
      <label-and-text-card label="Website" :text="activeField.website || ''" is-external-link />
      <label-and-text-card label="Notiz" :text="activeField.note || ''" is-text />

      <div
        v-if="formatDate(activeField.createdAt) || formatDate(activeField.editedAt)"
        class="row items-center justify-between q-pt-sm text-caption text-grey-5"
      >
        <span v-if="formatDate(activeField.createdAt)">
          Erstellt: {{ formatDate(activeField.createdAt) }}
        </span>
        <span v-if="formatDate(activeField.editedAt)">
          Geändert: {{ formatDate(activeField.editedAt) }}
        </span>
      </div>
    </div>

    <template #actions>
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-sm-6">
          <basic-button
            variant="ghost"
            label="Schließen"
            size="md"
            full-width
            @click="model = false"
          />
        </div>
        <div class="col-12 col-sm-6">
          <basic-button
            variant="primary"
            label="Passwort kopieren"
            icon="content_copy"
            size="md"
            full-width
            :disable="!activeField?.password"
            @click="activeField && copyText(activeField.password, 'Passwort')"
          />
        </div>
      </div>
    </template>
  </basic-dialog>
</template>
