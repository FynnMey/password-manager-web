<script setup lang="ts">
import { ref } from 'vue'
import { useCryptoStore } from '@/stores/cryptoStore'

const input = ref('')
const masterPassword = ref('')
const encryptedResult = ref('')
const decryptedResult = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const cryptoStore = useCryptoStore()

const unlockVault = async () => {
  if (!masterPassword.value) return
  isLoading.value = true
  errorMessage.value = ''
  try {
    await cryptoStore.openVault(masterPassword.value)
    masterPassword.value = ''
  } catch (err: any) {
    console.error('Fehler beim Öffnen des Vaults:', err)
    errorMessage.value = err?.message || 'Fehler beim Öffnen des Vaults'
  } finally {
    isLoading.value = false
  }
}

const lockVault = async () => {
  isLoading.value = true
  try {
    await cryptoStore.closeVault()
    encryptedResult.value = ''
    decryptedResult.value = ''
  } catch (err: any) {
    console.error('Fehler beim Schließen des Vaults:', err)
  } finally {
    isLoading.value = false
  }
}

const secure = async () => {
  if (!input.value) return
  isLoading.value = true
  errorMessage.value = ''
  try {
    encryptedResult.value = await cryptoStore.encrypt(input.value)
    console.log('verschlüsselt:', encryptedResult.value)
  } catch (err: any) {
    console.error('Fehler beim Verschlüsseln:', err)
    errorMessage.value = err?.message || 'Fehler beim Verschlüsseln'
  } finally {
    isLoading.value = false
  }
}

const encure = async () => {
  const textToDecrypt = encryptedResult.value || input.value
  if (!textToDecrypt) return
  isLoading.value = true
  errorMessage.value = ''
  try {
    decryptedResult.value = await cryptoStore.decrypt(textToDecrypt)
    console.log('entschlüsselt:', decryptedResult.value)
  } catch (err: any) {
    console.error('Fehler beim Entschlüsseln:', err)
    errorMessage.value = err?.message || 'Fehler beim Entschlüsseln'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <q-page class="flex flex-center q-pa-md">
    <div v-if="!cryptoStore.isReady" class="text-center">
      <q-spinner color="primary" size="3em" />
      <p class="q-mt-sm text-grey-8">WASM-Worker wird initialisiert...</p>
    </div>

    <div v-else class="column q-gutter-md" style="max-width: 600px; width: 100%;">
      <!-- Vault Status & Unlock -->
      <q-card flat bordered class="q-pa-md">
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h6">Vault Status</div>
          <q-badge :color="cryptoStore.isVaultOpen ? 'positive' : 'grey-7'">
            {{ cryptoStore.isVaultOpen ? 'Entsperrt' : 'Gesperrt' }}
          </q-badge>
        </div>

        <div v-if="!cryptoStore.isVaultOpen" class="column q-gutter-sm">
          <q-input
            v-model="masterPassword"
            type="password"
            label="Master-Passwort zum Entsperren"
            outlined
            dense
            @keyup.enter="unlockVault"
          />
          <q-btn
            color="primary"
            label="Vault Öffnen"
            no-caps
            :loading="isLoading"
            :disable="!masterPassword"
            @click="unlockVault"
          />
        </div>

        <div v-else class="row items-center justify-between">
          <span class="text-caption text-grey-8">Salt vorhanden: {{ !!cryptoStore.vaultSalt }}</span>
          <q-btn
            color="negative"
            outline
            label="Vault Sperren"
            no-caps
            :loading="isLoading"
            @click="lockVault"
          />
        </div>
      </q-card>

      <!-- Encrypt / Decrypt Test -->
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
            :disable="!cryptoStore.isVaultOpen"
            @click="secure"
          />
          <q-btn
            color="secondary"
            label="Entschlüsseln"
            no-caps
            :loading="isLoading"
            :disable="!cryptoStore.isVaultOpen"
            @click="encure"
          />
        </div>

        <div v-if="errorMessage" class="text-negative text-caption q-mb-sm">
          {{ errorMessage }}
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
