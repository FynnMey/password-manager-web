<script setup lang="ts">
import BasicCard from "@/components/common/card/BasicCard.vue"
import BasicInput from "@/components/common/input/BasicInput.vue"
import {ref} from "vue";
import BasicButton from "@/components/common/button/BasicButton.vue";
import {usePassword} from "@/composabiles/usePassword";
import {Http} from "@/services/http/Http";

const name = ref('')
const accountMail = ref('')
const accountPassword = ref('')

const reandomPassword = () => {
  const { generatePassword } = usePassword()
  accountPassword.value = generatePassword()
}

const http = new Http()
const save = async () => {
  const result = await http.post('/api/user/password/create', {
    name: name.value,
    email: accountMail.value,
    password: accountPassword.value,
  })

  console.log(result)
}
</script>

<template>
  <div class="flex flex-center">
    <basic-card>
      <basic-input v-model="name" label="Name" />
      <basic-input v-model="accountMail" label="Email" />
      <basic-input v-model="accountPassword" label="password" />
      <basic-button label="Sicher passwort generieren" @click="reandomPassword" />

      <basic-button label="speichern" class="q-mt-md" @click="save" :disable="!accountMail || !accountPassword" />
    </basic-card>
  </div>
</template>

<style scoped lang="scss">

</style>
