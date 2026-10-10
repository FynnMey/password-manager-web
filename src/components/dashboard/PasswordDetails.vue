<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useVaultStore } from '@/stores/vaultStore'
import BasicDialog from '@/components/common/dialog/BasicDialog.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import IconUrl from '@/components/dashboard/IconUrl.vue'
import LabelAndTextCard from "@/components/common/card/LabelAndTextCard.vue"
import PasswordEdit from '@/components/dashboard/PasswordEdit.vue'
import {useDate} from "@/composabiles/useDate"
import {VaultField} from "@/types/VaultField"
import {useEntry} from "@/composabiles/useEntry"

const vaultStore = useVaultStore()
const { activeFieldId, activeField } = storeToRefs(vaultStore)

const { deleteEntry, updateEntry } = useEntry()
const { formatDate } = useDate()

const showPassword = ref(false)
const isEditing = ref(false)

const model = computed({
  get: () => !!activeField.value,
  set: (value) => {
    if (!value) {
      activeFieldId.value = null
    }
  },
})

watch(model, (isOpen) => {
  if (!isOpen) {
    showPassword.value = false
    isEditing.value = false
  }
})

watch(activeField, () => {
  isEditing.value = false
})

const saveEntry = async (updatedData: VaultField) => {
  await updateEntry(updatedData)
  isEditing.value = false
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

        <icon-url :url="activeField.website" height="25px" width="25px" no-full-width />

        <div class="col-auto overflow-hidden">
          <div class="row items-center q-gutter-xs no-wrap">
            <div class="card-title card-title--lg ellipsis">
              {{ isEditing ? 'Passwort bearbeiten' : (activeField.name || 'Passwort-Details') }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <div v-if="activeField">
      <password-edit
        v-if="isEditing"
        :field="activeField"
        @cancel="isEditing = false"
        @save="saveEntry"
      />

      <div v-else class="q-gutter-y-sm q-mt-xs">
        <label-and-text-card label="E-Mail / Benutzername" :text="activeField.account || ''" />
        <label-and-text-card label="Passwort" :text="activeField.password || ''" is-password />
        <label-and-text-card label="Website" :text="activeField.website || ''" is-external-link />
        <label-and-text-card label="Notiz" :text="activeField.note || ''" is-text />

        <div
          v-if="formatDate(activeField.createdAt) || formatDate(activeField.editedAt)"
          class="row items-center justify-between q-pt-sm text-caption text-muted"
        >
          <span v-if="formatDate(activeField.createdAt)">
            Erstellt: {{ formatDate(activeField.createdAt) }}
          </span>
          <span v-if="formatDate(activeField.editedAt)">
            Geändert: {{ formatDate(activeField.editedAt) }}
          </span>
        </div>
      </div>
    </div>

    <template v-if="!isEditing" #actions>
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-sm-6">
          <basic-button
            variant="danger"
            icon="delete"
            size="md"
            full-width
            @click="deleteEntry"
          />
        </div>
        <div class="col-12 col-sm-6">
          <basic-button
            variant="secondary"
            label="bearbeiten"
            icon="edit"
            size="md"
            full-width
            @click="isEditing = true"
          />
        </div>
      </div>
    </template>
  </basic-dialog>
</template>
