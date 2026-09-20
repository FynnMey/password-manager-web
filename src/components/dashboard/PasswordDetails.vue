<script setup lang="ts">
import BasicCard from "@/components/common/card/BasicCard.vue"
import {useVaultStore} from "@/stores/vaultStore";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";

const vaultStore = useVaultStore()
const { activeField } = storeToRefs(vaultStore)

const model = computed({
  get: () => !!activeField.value,
  set: (value) => {
    if (!value) {
      activeField.value = null;
    }
  }
})
</script>
<template>
<q-dialog v-model="model" v-if="activeField">
  <basic-card>
    {{ activeField.name }}
  </basic-card>
</q-dialog>
</template>

<style scoped lang="scss">

</style>
