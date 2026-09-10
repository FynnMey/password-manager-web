import {defineBoot} from "#q-app";
import {watch} from "vue";
import {useCryptoStore} from "@/stores/cryptoStore";

export default defineBoot(({ router }) => {
  const cryptoStore = useCryptoStore()

  const allowedUrls = [
    '/open/vault',
    '/login',
    '/logout'
  ]

  router.beforeEach((to) => {
    const isVaultOpen = cryptoStore.isVaultOpen

    if (!isVaultOpen && !allowedUrls.includes(to.path))
      return { path: '/open/vault' }
  })

  watch(() => cryptoStore.isVaultOpen, async () => {
    if (!cryptoStore.isVaultOpen)
      await router.push('/open/vault')
  })
})
