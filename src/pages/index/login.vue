<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import BasicCard from '@/components/common/card/BasicCard.vue'
import BasicInput from '@/components/common/input/BasicInput.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import BasicDivider from '@/components/common/divider/BasicDivider.vue'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicErrorBanner from '@/components/common/error/BasicErrorBanner.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = useUserStore()
const { email } = storeToRefs(user)

const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) return
  isLoading.value = true
  errorMessage.value = ''

  const isLogin = await user.login(email.value, password.value)

  if (isLogin) {
    if (!user.canaryValue || !user.salt) {
      router.push('/create/masterPassword')
      return
    }
    router.push('/')
    return
  }

  errorMessage.value = 'Ungültige E-Mail oder Passwort'
  isLoading.value = false
}
</script>

<template>
  <div class="flex flex-center full-height">
    <basic-card>
      <div class="text-center q-mb-xl">
        <basic-icon-box size="lg" variant="gradient" class="q-mx-auto q-mb-lg">
          <basic-icon name="lock" size="28px" color="white" />
        </basic-icon-box>
        <div class="page-title gradient-text">Willkommen zurück</div>
        <div class="card-subtitle q-mt-xs">Melde dich bei VaultGuard an</div>
      </div>

      <basic-error-banner :message="errorMessage" class="q-mb-md" />

      <q-form @submit.prevent="handleLogin" class="row q-col-gutter-md">
        <basic-input
          v-model="email"
          v-model:disable="isLoading"
          icon="alternate_email"
          type="email"
          class="col-12"
          label="E-Mail Adresse"
        />

        <basic-input
          v-model="password"
          type="password"
          icon="lock_outline"
          label="Passwort"
          class="col-12"
          :disable="isLoading"
        />

        <div class="col-12">
          <basic-button
            label="Anmelden"
            icon="login"
            type="submit"
            :loading="isLoading"
            :disable="!email || !password"
          />
        </div>
      </q-form>

      <div class="q-mt-xl">
        <basic-divider label="Sicherheit" />
        <div class="row items-center justify-center q-mt-md q-gutter-xs">
          <basic-icon name="shield" size="14px" color="positive" />
          <span class="security-label">End-to-End verschlüsselt</span>
        </div>
      </div>
    </basic-card>
  </div>
</template>

<style scoped lang="scss">
.security-label {
  color: $text-muted;
  font-size: 12px;
}
</style>
