import {defineBoot} from "#q-app";
import {useCryptoStore} from "@/stores/cryptoStore";

export default defineBoot(({ app }) => {
  app.config.globalProperties.$q.dark.set(true)
})
