<script setup lang="ts">
import BasicCard from "@/components/common/card/BasicCard.vue"
import BasicIconBox from "@/components/common/icon/BasicIconBox.vue"
import BasicIcon from "@/components/common/icon/BasicIcon.vue"
import {useUserStore} from "@/stores/userStore"
import {useRouter} from "vue-router"
import {useCryptoStore} from "@/stores/cryptoStore";

const user = useUserStore()
const cryptoStore = useCryptoStore()

const router = useRouter()

cryptoStore.closeVault()
user.logout()

router.push('/login')
</script>

<template>
  <div class="flex flex-center full-height">
    <basic-card>
      <div class="text-center">
        <basic-icon-box size="lg" variant="gradient" class="q-mx-auto q-mb-lg">
          <basic-icon name="lock" size="28px" color="white" />
        </basic-icon-box>
        <div class="page-title gradient-text">Abmelden...</div>
        <div class="card-subtitle q-mt-xs">Du wirst abgemeldet</div>
      </div>
    </basic-card>
  </div>
</template>

<style scoped lang="scss">

</style>
