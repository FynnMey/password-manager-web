import {defineBoot} from "#q-app";

export default defineBoot(({ app }) => {
  app.config.globalProperties.$q.dark.set(true)
})
