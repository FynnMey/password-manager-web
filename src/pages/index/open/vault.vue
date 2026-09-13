<script setup lang="ts">
import BasicCard from '@/components/common/card/BasicCard.vue'
import BasicInput from '@/components/common/input/BasicInput.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicDivider from '@/components/common/divider/BasicDivider.vue'
import { ref } from 'vue'
import { useCryptoStore } from '@/stores/cryptoStore'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { useNotificationAdapter } from '@/composabiles/adapter/notification/useNotificationAdapter'
import { useRouter } from 'vue-router'

const masterPassword = ref('')
const isLoading = ref(false)

const cryptoStore = useCryptoStore()
const userStore = useUserStore()

const { isUnlocked } = storeToRefs(cryptoStore)
const { canaryValue } = storeToRefs(userStore)

const router = useRouter()

const openVault = async () => {
  if (!masterPassword.value) return
  isLoading.value = true

  await cryptoStore.openVault(masterPassword.value)

  const notify = useNotificationAdapter()

  try {
    await cryptoStore.decrypt(canaryValue.value)
    isUnlocked.value = true
    notify.success('Erfolgreich entsperrt')
    router.push('/')
  } catch {
    notify.error('Master-Passwort ist falsch')
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-center full-height">
    <basic-card>
      <!-- Header -->
      <div class="text-center q-mb-xl">
        <basic-icon-box size="lg" variant="gradient" class="q-mx-auto q-mb-lg">
          <basic-icon name="lock" size="28px" color="white" />
        </basic-icon-box>
        <div class="page-title gradient-text">Vault entsperren</div>
        <div class="card-subtitle q-mt-xs">
          Gib dein Master-Passwort ein, um fortzufahren
        </div>
      </div>

      <!-- Form -->
      <q-form @submit.prevent="openVault" class="row q-col-gutter-md">
        <basic-input
          v-model="masterPassword"
          label="Master-Passwort"
          icon="password"
          type="password"
          class="col-12"
          :disable="isLoading"
          @keydown.enter="openVault"
        />

        <div class="col-12">
          <basic-button
            label="Entsperren"
            icon="lock_open"
            type="submit"
            :loading="isLoading"
            :disable="!masterPassword"
          />
        </div>
      </q-form>

      <!-- Security footer -->
      <div class="q-mt-xl">
        <basic-divider label="Sicherheit" />
        <div class="row items-center justify-center q-mt-md q-gutter-xs">
          <basic-icon name="shield" size="14px" color="positive" />
          <span class="vault-security-label">End-to-End verschlüsselt</span>
        </div>
      </div>
    </basic-card>
  </div>
</template>

<style scoped lang="scss">
.vault-security-label {
  color: $text-muted;
  font-size: 12px;
}
</style>
