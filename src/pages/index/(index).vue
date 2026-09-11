<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { useCryptoStore } from '@/stores/cryptoStore'
import BasicCard from '@/components/common/card/BasicCard.vue'
import BasicInput from '@/components/common/input/BasicInput.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicErrorBanner from '@/components/common/error/BasicErrorBanner.vue'
import {Http} from "@/services/http/Http";

const input = ref('')
const encryptedResult = ref('')
const decryptedResult = ref('')
const errorMessage = ref('')

const http = new Http()
onMounted(async () => {
  const vault = await http.post('/api/user/password/get-all', {})
  console.log(vault)
})

const cryptoStore = useCryptoStore()

const secure = async () => {
  if (!input.value) return

  encryptedResult.value = await cryptoStore.encrypt(input.value)
}

const encure = async () => {
  const textToDecrypt = encryptedResult.value || input.value
  if (!textToDecrypt) return

  decryptedResult.value = await cryptoStore.decrypt(textToDecrypt)
}
</script>

<template>
  <div class="dashboard">
    <basic-card>
      <basic-button
        label="Neues Password"
        to="/create/password"
      />
    </basic-card>

    <basic-card variant="default" max-width="100%">
      <div class="row items-center q-gutter-sm q-mb-lg">
        <basic-icon-box size="sm" variant="soft">
          <basic-icon name="enhanced_encryption" size="18px" color="primary" />
        </basic-icon-box>
        <div>
          <div class="card-title">Krypto Web-Worker</div>
          <div class="card-subtitle">Verschlüsseln & Entschlüsseln testen</div>
        </div>
      </div>

      <div class="column q-gutter-md">
        <basic-input
          v-model="input"
          icon="text_fields"
          label="Klartext oder Chiffretext"
        />

        <basic-error-banner :message="errorMessage" />

        <div class="row q-gutter-sm">
          <div class="col">
            <basic-button
              label="Verschlüsseln"
              icon="lock"
              type="button"
              :disable="!cryptoStore.isVaultOpen || !input"
              @click="secure"
            />
          </div>
          <div class="col">
            <basic-button
              label="Entschlüsseln"
              icon="lock_open"
              type="button"
              variant="secondary"
              :disable="!cryptoStore.isVaultOpen || (!encryptedResult && !input)"
              @click="encure"
            />
          </div>
        </div>

        <transition name="slide-fade">
          <div v-if="encryptedResult" class="crypto-result">
            <div class="result-label-text">
              <basic-icon name="lock" size="12px" color="secondary" />
              Verschlüsselt (Base64)
            </div>
            <div class="mono text-accent">{{ encryptedResult }}</div>
          </div>
        </transition>

        <transition name="slide-fade">
          <div v-if="decryptedResult" class="crypto-result">
            <div class="result-label-text">
              <basic-icon name="lock_open" size="12px" color="positive" />
              Entschlüsselt
            </div>
            <div class="mono text-positive">{{ decryptedResult }}</div>
          </div>
        </transition>
      </div>
    </basic-card>
  </div>
</template>
