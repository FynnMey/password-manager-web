<script setup lang="ts">
import { ref } from 'vue'
import { useCryptoStore } from '@/stores/cryptoStore'

const input = ref('')
const encryptedResult = ref('')
const decryptedResult = ref('')
const isLoading = ref(false)

const cryptoStore = useCryptoStore()

const secure = async () => {
  if (!input.value) return
  isLoading.value = true
  try {
    encryptedResult.value = await cryptoStore.encrypt(input.value)
    console.log('verschlüsselt:', encryptedResult.value)
  } catch (err) {
    console.error('Fehler beim Verschlüsseln:', err)
  } finally {
    isLoading.value = false
  }
}

const encure = async () => {
  const textToDecrypt = encryptedResult.value || input.value
  if (!textToDecrypt) return
  isLoading.value = true
  try {
    decryptedResult.value = await cryptoStore.decrypt(textToDecrypt)
    console.log('entschlüsselt:', decryptedResult.value)
  } catch (err) {
    console.error('Fehler beim Entschlüsseln:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <q-page class="flex flex-center q-pa-md">
    <div v-if="!cryptoStore.isReady" class="text-center">
      <q-spinner color="primary" size="3em" />
      <p class="q-mt-sm text-grey-8">Vault wird im Worker initialisiert...</p>
    </div>

    <div v-else class="column q-gutter-md" style="max-width: 600px; width: 100%;">
      <q-card flat bordered class="q-pa-md">
        <div class="text-h6 q-mb-md">Krypto Web-Worker Test</div>

        <q-input
          v-model="input"
          label="Klartext oder Chiffretext eingeben"
          outlined
          dense
          class="q-mb-md"
        />

        <div class="row q-gutter-sm q-mb-md">
          <q-btn
            color="primary"
            label="Verschlüsseln"
            no-caps
            :loading="isLoading"
            @click="secure"
          />
          <q-btn
            color="secondary"
            label="Entschlüsseln"
            no-caps
            :loading="isLoading"
            @click="encure"
          />
        </div>

        <div v-if="encryptedResult" class="q-mb-sm">
          <div class="text-caption text-weight-bold text-grey-8">Verschlüsselt (Base64):</div>
          <div class="q-pa-sm bg-grey-2 rounded-borders text-break" style="word-break: break-all; font-family: monospace;">
            {{ encryptedResult }}
          </div>
        </div>

        <div v-if="decryptedResult" class="q-mb-sm">
          <div class="text-caption text-weight-bold text-grey-8">Entschlüsselt:</div>
          <div class="q-pa-sm bg-green-1 text-green-10 rounded-borders text-break" style="word-break: break-all; font-family: monospace;">
            {{ decryptedResult }}
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

