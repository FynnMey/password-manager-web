import { defineBoot } from '#q-app'
import {useUserStore} from "@/stores/userStore"
import {useVaultStore} from "@/stores/vaultStore"
import {watch} from "vue"
import {useCryptoStore} from "@/stores/cryptoStore";

export default defineBoot(async ({}) => {
  const userStore = useUserStore()
  const vaultStore = useVaultStore()
  const cryptoStore = useCryptoStore()

  const watchGetAllData = watch(() => [userStore.isAuthenticated, cryptoStore.isVaultOpen], async () => {
    if (userStore.isAuthenticated && cryptoStore.isVaultOpen) {
      await vaultStore.getAllVaults()
      watchGetAllData.stop()
    }
  })
})
