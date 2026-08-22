globalThis.dotnetSidecar = true;

let wasmExports = null;

async function handleInit() {
  const origin = self.location.origin;
  const dotnetUrl = `${origin}/wasm/dotnet.js`;

  console.log('1. Lade dotnet.js...');
  const { dotnet } = await import(/* @vite-ignore */ dotnetUrl);

  const { getAssemblyExports, getConfig } = await dotnet
    .withConfigSrc(`${origin}/wasm/dotnet.boot.js`)
    .create();

  const config = getConfig();

  wasmExports = await getAssemblyExports(config.mainAssemblyName);
}

self.addEventListener('message', async (event) => {
  const { action, payload, id } = event.data;

  try {
    if (action === 'init') {
      await handleInit();
      self.postMessage({ id, success: true });
    } else if (action === 'open') {
      if (!wasmExports) throw new Error('WASM ist noch nicht initialisiert');
      const salt = wasmExports.VaultInterop.OpenVault(payload.password, payload.salt ?? '');
      self.postMessage({ id, success: true, result: salt });
    } else if (action === 'encrypt') {
      if (!wasmExports) throw new Error('WASM ist noch nicht initialisiert');
      const encrypted = wasmExports.VaultInterop.EncryptData(payload);
      self.postMessage({ id, success: true, result: encrypted });
    } else if (action === 'decrypt') {
      if (!wasmExports) throw new Error('WASM ist noch nicht initialisiert');
      const decrypted = wasmExports.VaultInterop.DecryptData(payload);
      self.postMessage({ id, success: true, result: decrypted });
    } else if (action === 'close') {
      if (!wasmExports) throw new Error('WASM ist noch nicht initialisiert');
      wasmExports.VaultInterop.CloseVault();
      self.postMessage({ id, success: true });
    } else {
      throw new Error(`Unbekannte Action: ${action}`);
    }
  } catch (error) {
    console.error(`Worker Fehler bei Action ${action}:`, error);
    self.postMessage({ id, success: false, error: error?.message || error?.toString() || 'Unknown error' });
  }
});
