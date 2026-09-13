import { defineBoot } from '#q-app'
import {useUserStore} from "@/stores/userStore"
import {useVaultStore} from "@/stores/vaultStore"
import {watch} from "vue"

export default defineBoot(async ({}) => {
  const userStore = useUserStore()
  const vaultStore = useVaultStore()

  if (userStore.isAuthenticated) {
    await vaultStore.getAllVaults()
    return
  }

  const watchGetAllData = watch(() => userStore.isAuthenticated, async () => {
    if (userStore.isAuthenticated) {
      await vaultStore.getAllVaults()
      watchGetAllData.stop()
    }
  })
})
