<script setup lang="ts">
import { useVaultStore } from "@/stores/vaultStore";
import { storeToRefs } from "pinia";
import BasicCard from "@/components/common/card/BasicCard.vue";
import { useCryptoStore } from "@/stores/cryptoStore";
import { ref, watchEffect } from "vue"; // 'computed' entfernt, 'ref' und 'watchEffect' hinzugefügt

const vaultStore = useVaultStore()
const { vault } = storeToRefs(vaultStore)

const crypto = useCryptoStore()

const decrypt = async (value: string) => {
  const shdv = await crypto.decrypt(value)
  console.log(shdv)
  return shdv
}

const decryptedVault = ref<string[]>([])

watchEffect(async () => {
  const promises = vault.value.map(item => decrypt(item.name))
  decryptedVault.value = await Promise.all(promises)
})
</script>
<template>
  <basic-card>
    <q-list>
      <q-item v-for="(item, index) in decryptedVault" :key="`${index}-iusvdg`" class="full-width">
        {{ item }}
      </q-item>
    </q-list>
  </basic-card>
</template>

<style scoped lang="scss">

</style>
