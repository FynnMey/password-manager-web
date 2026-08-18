import { defineBoot } from '#q-app'
import { useCryptoStore } from '@/stores/cryptoStore'

export default defineBoot(({ store }) => {
  const coreStore = useCryptoStore(store)

  void initializeCore(coreStore)
})

async function initializeCore(coreStore: ReturnType<typeof useCryptoStore>) {
  try {
    const dotnetUrl = `${window.location.origin}/wasm/dotnet.js`
    const { dotnet } = await import(/* @vite-ignore */ dotnetUrl)

    const { getAssemblyExports, getConfig } = await dotnet.create()
    const config = getConfig()
    const exports = await getAssemblyExports(config.mainAssemblyName)

    console.log("coreStore.vaultSalt: ", coreStore.vaultSalt)

    coreStore.vaultSalt = exports.VaultInterop.OpenVault(
      'uzsdfvduzsvgds',
      coreStore.vaultSalt
    )

    const encrypted = exports.VaultInterop.EncryptData("test")
    const encrypted2 = exports.VaultInterop.EncryptData("test2")

    console.log(encrypted)
    console.log(encrypted2)
    console.log(exports.VaultInterop.DecryptData(encrypted))

    console.log('Vault geöffnet')
  } catch (error) {
    console.error('Fehler beim WASM-Laden:', error)
  }
}
