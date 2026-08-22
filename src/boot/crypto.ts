import { defineBoot } from '#q-app'
import { useCryptoStore } from '@/stores/cryptoStore'

export default defineBoot(({ store }) => {
  const coreStore = useCryptoStore(store)

  initializeCore(coreStore).catch(console.error)
})

async function initializeCore(coreStore: ReturnType<typeof useCryptoStore>) {
  try {
    const worker = new Worker(new URL('../workers/vault-worker.js', import.meta.url), { type: 'module' });

    worker.onerror = (errorEvent) => {
      console.error('🚨 Fataler Worker-Fehler:', errorEvent.message, 'in Zeile', errorEvent.lineno);
    };

    coreStore.setupWorker(worker);

    await coreStore.initWorker();

    await coreStore.openVault('uzsdfvduzsvgds');

    coreStore.isReady = true;

  } catch (error) {
    console.error('Fehler beim Worker-Start:', error)
  }
}
