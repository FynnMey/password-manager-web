<script setup lang="ts">
import BasicCard from "@/components/common/card/BasicCard.vue"
import BasicInput from "@/components/common/input/BasicInput.vue"
import {ref} from "vue"
import BasicButton from "@/components/common/button/BasicButton.vue"
import {useCryptoStore} from "@/stores/cryptoStore"
import {useUserStore} from "@/stores/userStore"
import {storeToRefs} from "pinia"
import {useNotificationAdapter} from "@/composabiles/adapter/notification/useNotificationAdapter"
import {useRouter} from "vue-router"

const masterPassword = ref('')

const cryptoStore = useCryptoStore()
const userStore = useUserStore()

const { isUnlocked } = storeToRefs(cryptoStore)
const { canaryValue } = storeToRefs(userStore)

const router = useRouter()

const openVault = async () => {
  await cryptoStore.openVault(masterPassword.value)

  const notify = useNotificationAdapter()

  try {
    await cryptoStore.decrypt(canaryValue.value)
    isUnlocked.value = true

    notify.success('Erfolgreich entsperrt')

    router.push('/')
  }
  catch (error) {

    notify.error('Master Password ist falsch')
  }
}
</script>

<template>
  <div class="flex flex-center">
    <basic-card>
      <basic-input
        v-model="masterPassword"
        label="Master Password"
        icon="password"
        type="password"
        @keydown.enter="openVault"
      />

      <basic-button
        label="Entsperren"
        icon="lock_open"
        class="q-mt-md"
        :disable="!masterPassword"
        @click="openVault"
      />
    </basic-card>
  </div>
</template>

<style scoped lang="scss">
</style>
