<script setup lang="ts">
import BasicCard from '@/components/common/card/BasicCard.vue'
import BasicInput from '@/components/common/input/BasicInput.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import { ref } from 'vue'
import {Http} from "@/services/http/Http"
import {useCryptoStore} from "@/stores/cryptoStore"
import {storeToRefs} from "pinia"
import {useUserStore} from "@/stores/userStore"

const masterPassword = ref('')
const confirmPassword = ref('')

const vaultStore = useCryptoStore()
const userStore = useUserStore()

const { salt } = storeToRefs(userStore)

const saveMasterPassword = async () => {
  await vaultStore.openVault(masterPassword.value)
  console.log(await vaultStore.encrypt('geheim'))

  const http = new Http()
  http.post('/api/user/register', {
    "canaryValue": await vaultStore.encrypt('geheim'),
    "salt": salt.value
  })
}

const tips = [
  'Mindestens 12 Zeichen',
  'Groß- und Kleinbuchstaben',
  'Zahlen und Sonderzeichen',
  'Keine persönlichen Infos',
]
</script>

<template>
  <div class="master-page flex flex-center full-height">
    <div class="master-page__blob" />

    <basic-card max-width="460px">

      <div class="q-mb-md">
        <basic-icon-box size="md" variant="gradient" class="q-mb-md">
          <basic-icon name="key" size="22px" color="white" />
        </basic-icon-box>
        <div class="card-title card-title--lg">Master-Passwort erstellen</div>
        <div class="card-subtitle q-mt-sm">
          Dein Master-Passwort verschlüsselt alle deine gespeicherten Passwörter.
          Wähle es sorgfältig — es kann nicht zurückgesetzt werden.
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <basic-input
          v-model="masterPassword"
          type="password"
          icon="lock_outline"
          label="Master-Passwort"
        />

        <basic-input
          v-model="confirmPassword"
          type="password"
          icon="lock"
          label="Master-Passwort bestätigen"
        />

        <div class="col-12">
          <div class="master-tips q-pa-md full-width">
            <div class="master-tips__title q-mb-sm">
              <basic-icon name="lightbulb_outline" size="14px" color="secondary" />
              Tipps für ein starkes Passwort
            </div>
            <div class="column q-gutter-xs">
              <div
                v-for="tip in tips"
                :key="tip"
                class="row items-center q-gutter-xs master-tips__item"
              >
                <basic-icon name="check_circle" size="12px" color="primary" />
                <span>{{ tip }}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <basic-button
            label="Master-Passwort speichern"
            icon="save"
            type="button"
            :disable="!masterPassword || masterPassword !== confirmPassword"
            @click="saveMasterPassword"
          />
        </div>
      </div>
    </basic-card>
  </div>
</template>

<style scoped lang="scss">
.master-step-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, $primary, $border);
  max-width: 40px;
}

.master-strength-label {
  font-size: 12px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.master-strength-score {
  font-size: 11px;
  color: $text-muted;
}

.master-strength-track {
  height: 4px;
  border-radius: 2px;
  background: $border;
  overflow: hidden;
}

.master-strength-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.4s ease, background 0.3s ease;
}

.master-tips {
  background: rgba($primary, 0.06);
  border: 1px solid rgba($primary, 0.15);
  border-radius: 12px;

  &__title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: $secondary;
  }

  &__item {
    font-size: 12px;
    color: $text-muted;
  }
}
</style>
