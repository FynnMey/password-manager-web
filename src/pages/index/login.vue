<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import BasicCard from "@/components/common/card/BasicCard.vue";
import BasicInput from "@/components/common/input/BasicInput.vue";
import BasicButton from "@/components/common/button/BasicButton.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const user = useUserStore()

const { email } = storeToRefs(user)

const password = ref('')

const isLoading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) return
  isLoading.value = true
  errorMessage.value = ''

  const isLogin = await user.login(email.value, password.value)

  if (isLogin) {
    router.push('/')

    return
  }

  isLoading.value = false
}
</script>

<template>
  <div class="flex flex-center full-height q-pa-md">
    <basic-card>
      <div class="text-h5 text-weight-bold text-center q-mb-lg">Anmelden</div>

      <q-form @submit.prevent="handleLogin" class="q-gutter-md">
        <basic-input
          v-model="email"
          v-model:disable="isLoading"
          icon="email"
          type="email"
          outlined
          label="E-Mail"
        />

        <basic-input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          icon="lock"
          label="Passwort"
          :disable="isLoading"
        />

        <div>
          <basic-button
            :disable="!email || !password"
          />
        </div>
      </q-form>
    </basic-card>
  </div>
</template>

<style scoped lang="scss">
</style>
