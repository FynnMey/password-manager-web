<script setup lang="ts">
import BasicCard from '@/components/common/card/BasicCard.vue'
import BasicInput from '@/components/common/input/BasicInput.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicDivider from '@/components/common/divider/BasicDivider.vue'
import {reactive, ref} from 'vue'
import { usePassword } from '@/composabiles/usePassword'
import {VaultField} from "@/types/VaultField";
import {useEntry} from "@/composabiles/useEntry";
import {CreatePasswordFields} from "@/types/CreatePasswordFields";
import {useRouter} from "vue-router";

const { generatePassword } = usePassword()

const { createEntry } = useEntry()

const form = reactive<VaultField>({
  id: '',
  name: '',
  account: '',
  password: '',
  website: '',
  note: '',
  createdAt: '',
  editedAt: '',
})

const fields = ref<CreatePasswordFields>([
  {
    name: 'name',
    label: 'Name / Bezeichnung',
    icon: 'label_outline',
    type: 'text'
  },
  {
    value: 'Login-Daten',
    type: 'seperator',
  },
  {
    name: 'account',
    label: 'E-Mail / Benutzername',
    icon: 'alternate_email',
    type: 'text'
  },
  {
    name: 'password',
    label: 'Passwort',
    icon: 'password',
    type: 'password',
  },
  {
    type: 'button',
    value: 'Sicheres Passwort generieren',
    icon: 'auto_awesome',
    click: () => randomPassword(),
  },
  {
    value: 'Weitere Infos',
    type: 'seperator',
  },
  {
    name: 'website',
    label: 'Webseite (optional)',
    icon: 'language',
    type: 'text',
  },
  {
    name: 'note',
    label: 'Notiz (optional)',
    icon: 'note',
    type: 'textarea',
  },
])

const isLoading = ref(false)

const randomPassword = () => {
  form.password = generatePassword()
}

const router = useRouter()
const save = async () => {
  isLoading.value = true
  await createEntry(form)
  isLoading.value = false

  router.push('/')
}

const canSave = () => form.account.length > 0 && form.password.length > 0
</script>

<template>
  <div class="flex flex-center">
    <basic-card max-width="520px">

      <div class="q-mb-lg">
        <basic-icon-box size="md" variant="gradient" class="q-mb-md">
          <basic-icon name="add_circle_outline" size="22px" color="white" />
        </basic-icon-box>
        <div class="card-title card-title--lg">Neues Passwort</div>
        <div class="card-subtitle q-mt-xs">
          Speichere Zugangsdaten sicher in deinem Vault.
        </div>
      </div>

      <q-form @submit.prevent="save" class="row q-col-gutter-md">
        <div v-for="element in fields" class="col-12">
          <basic-divider v-if="element.type === 'seperator'" :label="element.value" />

          <div class="col-12" v-else-if="element.type === 'button'">
            <basic-button
              :label="element.value"
              :icon="element.icon ?? ''"
              variant="secondary"
              size="sm"
              :full-width="false"
              type="button"
              @click="element.click"
            />
          </div>

          <basic-input
            v-else
            v-model="form[element.name]"
            :label="element.label"
            :icon="element.icon"
            class="col-12"
            :type="element.type"
            :disable="isLoading"
          />
        </div>

        <div class="col-12">
          <basic-button
            label="Passwort speichern"
            icon="save"
            type="submit"
            :loading="isLoading"
            :disable="!canSave()"
            />
        </div>

      </q-form>
    </basic-card>
  </div>
</template>
