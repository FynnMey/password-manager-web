<script setup lang="ts">
import BasicCard from "@/components/common/card/BasicCard.vue"
import BasicInput from "@/components/common/input/BasicInput.vue"
import {ref} from "vue";
import BasicButton from "@/components/common/button/BasicButton.vue";
import {usePassword} from "@/composabiles/usePassword";
import {Http} from "@/services/http/Http";
import {useCryptoStore} from "@/stores/cryptoStore";
import {useNotificationAdapter} from "@/composabiles/adapter/notification/useNotificationAdapter";
import {useVaultStore} from "@/stores/vaultStore";
import {VaultRequest} from "@/types/Request/VaultRequest";

const name = ref('')
const accountMail = ref('')
const accountPassword = ref('')
const website = ref('')
const note = ref('')

const reandomPassword = () => {
  const { generatePassword } = usePassword()
  accountPassword.value = generatePassword()
}

const http = new Http()
const cryptoStore = useCryptoStore()
const vaultStore = useVaultStore()

const save = async () => {
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
  })
}
</script>

<template>
  <div class="flex flex-center">
    <basic-card>
      <basic-input v-model="name" label="Name" />
      <basic-input v-model="accountMail" label="Email" />
      <basic-input v-model="accountPassword" label="password" />
      <basic-button label="Sicher passwort generieren" @click="reandomPassword" />

      <basic-input v-model="website" label="webseite" />
      <basic-input v-model="note" label="note" type="textarea" />
      <basic-button label="speichern" class="q-mt-md" @click="save" :disable="!accountMail || !accountPassword" />
    </basic-card>
  </div>
</template>

<style scoped lang="scss">

</style>
