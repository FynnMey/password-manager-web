<script setup lang="ts">
import BasicCard from "@/components/common/card/BasicCard.vue"
import BasicInput from "@/components/common/input/BasicInput.vue"
import {ref} from "vue";
import BasicButton from "@/components/common/button/BasicButton.vue";

const masterPassword = ref('')

const saveMasterPassword = () => {

}
</script>

<template>
  <basic-card>
    <div class="text-h5 text-weight-bold q-mb-lg">Master-Passwort erstellen</div>
    <basic-input v-model="masterPassword" label="Master-Passwort" />

    <basic-button class="q-mt-md" label="Speichern" @click="saveMasterPassword" />
  </basic-card>
</template>

<style scoped lang="scss">

</style>
