<script setup lang="ts">
import BasicCard from '@/components/common/card/BasicCard.vue'
import BasicInput from '@/components/common/input/BasicInput.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicDivider from '@/components/common/divider/BasicDivider.vue'
import { ref } from 'vue'
import { usePassword } from '@/composabiles/usePassword'
import { Http } from '@/services/http/Http'
import { useCryptoStore } from '@/stores/cryptoStore'
import { useNotificationAdapter } from '@/composabiles/adapter/notification/useNotificationAdapter'
import { useVaultStore } from '@/stores/vaultStore'
import { VaultRequest } from '@/types/Request/VaultRequest'

const name = ref('')
const accountMail = ref('')
const accountPassword = ref('')
const website = ref('')
const note = ref('')
const isLoading = ref(false)

const randomPassword = () => {
  const { generatePassword } = usePassword()
  accountPassword.value = generatePassword()
}

const http = new Http()
const cryptoStore = useCryptoStore()
const vaultStore = useVaultStore()

const save = async () => {
  isLoading.value = true
  const notify = useNotificationAdapter()

  await http.post<VaultRequest>('/api/user/password/create', {
    name: await cryptoStore.encrypt(name.value),
    email: await cryptoStore.encrypt(accountMail.value),
    password: await cryptoStore.encrypt(accountPassword.value),
    website: await cryptoStore.encrypt(website.value),
    note: await cryptoStore.encrypt(note.value),
  }).then((result) => {
    vaultStore.addSingleVault(result)
    notify.success('Passwort erfolgreich gespeichert')
  }).catch(() => {
    notify.error('Passwort konnte nicht gespeichert werden')
  }).finally(() => {
    isLoading.value = false
  })
}

const canSave = () => accountMail.value.length > 0 && accountPassword.value.length > 0
</script>

<template>
  <div class="flex flex-center">
    <basic-card max-width="520px">

      <div class="q-mb-lg">
        <basic-icon-box size="md" variant="gradient" class="q-mb-md">
          <basic-icon name="add_circle_outline" size="22px" color="white" />
        </basic-icon-box>
        <div class="card-title card-title--lg">Neues Passwort</div>
        <div class="card-subtitle q-mt-xs">
          Speichere Zugangsdaten sicher in deinem Vault.
        </div>
      </div>

      <q-form @submit.prevent="save" class="row q-col-gutter-md">

        <div class="col-12">
          <div class="section-label q-mb-sm">Allgemein</div>
        </div>

        <basic-input
          v-model="name"
          label="Name / Bezeichnung"
          icon="label_outline"
          class="col-12"
          :disable="isLoading"
        />

        <div class="col-12">
          <basic-divider label="Login-Daten" />
        </div>

        <basic-input
          v-model="accountMail"
          label="E-Mail / Benutzername"
          icon="alternate_email"
          class="col-12"
          :disable="isLoading"
        />

        <basic-input
          v-model="accountPassword"
          label="Passwort"
          icon="lock_outline"
          type="password"
          class="col-12"
          :disable="isLoading"
        />

        <div class="col-12">
          <basic-button
            label="Sicheres Passwort generieren"
            icon="auto_awesome"
            variant="secondary"
            size="sm"
            :full-width="false"
            type="button"
            @click="randomPassword"
          />
        </div>

        <div class="col-12">
          <basic-divider label="Weitere Infos" />
        </div>

        <basic-input
          v-model="website"
          label="Webseite (optional)"
          icon="language"
          class="col-12"
          :disable="isLoading"
        />

        <basic-input
          v-model="note"
          label="Notiz (optional)"
          icon="notes"
          type="textarea"
          class="col-12"
          :disable="isLoading"
        />

        <div class="col-12">
          <basic-button
            label="Passwort speichern"
            icon="save"
            type="submit"
            :loading="isLoading"
            :disable="!canSave()"
          />
        </div>

      </q-form>
    </basic-card>
  </div>
</template>

<style scoped lang="scss">
</style>
