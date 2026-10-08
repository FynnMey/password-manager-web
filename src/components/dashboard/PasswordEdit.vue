<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { VaultField } from '@/types/VaultField'
import BasicInput from '@/components/common/input/BasicInput.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import { usePassword } from '@/composabiles/usePassword'

const props = withDefaults(
  defineProps<{
    field?: VaultField | null
    loading?: boolean
  }>(),
  {
    field: null,
    loading: false,
  }
)

const emit = defineEmits<{
  save: [data: VaultField]
  cancel: []
}>()

const { generatePassword } = usePassword()

const form = reactive<VaultField>({
  id: '',
  name: '',
  account: '',
  password: '',
  website: '',
  note: '',
  createdAt: '',
  editedAt: '',
})

watch(
  () => props.field,
  (newVal) => {
    if (newVal) {
      form.id = newVal.id || ''
      form.name = newVal.name || ''
      form.account = newVal.account || ''
      form.password = newVal.password || ''
      form.website = newVal.website || ''
      form.note = newVal.note || ''
      form.createdAt = newVal.createdAt || ''
      form.editedAt = newVal.editedAt || ''
    }
  },
  { immediate: true, deep: true }
)

const randomPassword = () => {
  form.password = generatePassword()
}

const onSave = () => {
  emit('save', { ...form })
}

const onCancel = () => {
  emit('cancel')
}
</script>

<template>
  <q-form @submit.prevent="onSave" class="q-gutter-y-sm q-mt-xs">
    <basic-input
      v-model="form.name"
      label="Name / Bezeichnung"
      icon="label_outline"
      :disable="loading"
    />

    <basic-input
      v-model="form.account"
      label="E-Mail / Benutzername"
      icon="alternate_email"
      :disable="loading"
    />

    <basic-input
      v-model="form.password"
      label="Passwort"
      icon="lock_outline"
      type="password"
      :disable="loading"
    />

    <div class="row justify-end q-mt-xs">
      <basic-button
        label="Passwort generieren"
        icon="auto_awesome"
        variant="secondary"
        size="sm"
        :full-width="false"
        type="button"
        :disable="loading"
        @click="randomPassword"
      />
    </div>

    <basic-input
      v-model="form.website"
      label="Website"
      icon="language"
      :disable="loading"
    />

    <basic-input
      v-model="form.note"
      label="Notiz"
      icon="notes"
      type="textarea"
      :disable="loading"
    />

    <slot name="actions">
      <div class="row q-col-gutter-sm q-pt-md">
        <div class="col-12 col-sm-6">
          <basic-button
            variant="ghost"
            label="Abbrechen"
            icon="close"
            size="md"
            full-width
            type="button"
            :disable="loading"
            @click="onCancel"
          />
        </div>
        <div class="col-12 col-sm-6">
          <basic-button
            variant="primary"
            label="Speichern"
            icon="save"
            size="md"
            full-width
            type="submit"
            :loading="loading"
          />
        </div>
      </div>
    </slot>
  </q-form>
</template>
