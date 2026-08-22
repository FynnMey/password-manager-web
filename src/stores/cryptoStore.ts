import { defineStore } from 'pinia'
import { markRaw } from 'vue'

const pendingRequests = new Map<string, { resolve: (value: any) => void; reject: (reason?: any) => void }>()

let nextReqId = 0
function generateId() {
  return `req_${++nextReqId}`
}

function isValid32ByteBase64(str: string | null | undefined): boolean {
  if (!str || typeof str !== 'string') return false
  try {
    const decoded = atob(str)
    return decoded.length === 32
  } catch {
    return false
  }
}

export const useCryptoStore = defineStore('cryptoStore', {
  state: () => ({
    vaultSalt: '',
    vaultWorker: null as Worker | null,
    isReady: false
  }),

  persist: {
    pick: ['vaultSalt']
  },

  actions: {
    setupWorker(worker: Worker) {
      this.vaultWorker = markRaw(worker)

      this.vaultWorker.onmessage = (event) => {
        const { id, success, result, error } = event.data

        const pending = pendingRequests.get(id)
        if (pending) {
          pendingRequests.delete(id) // Aus der Warteschlange entfernen

          if (success) {
            pending.resolve(result)
          } else {
            pending.reject(new Error(error))
          }
        }
      }
    },

    // 2. Interne Hilfsmethode, um Nachrichten an den Worker zu senden
    _sendMessage<T>(action: string, payload?: any): Promise<T> {
      if (!this.vaultWorker) {
        return Promise.reject(new Error('Krypto-Worker ist noch nicht initialisiert'))
      }

      const id = generateId()
      return new Promise((resolve, reject) => {
        pendingRequests.set(id, { resolve, reject })
        this.vaultWorker!.postMessage({ action, id, payload })
      })
    },

    initWorker(): Promise<void> {
      return this._sendMessage<void>('init')
    },

    async openVault(password: string): Promise<string> {
      const saltToSend = isValid32ByteBase64(this.vaultSalt) ? this.vaultSalt : ''
      const newSalt = await this._sendMessage<string>('open', { password, salt: saltToSend })
      this.vaultSalt = newSalt
      return newSalt
    },

    decrypt(data: string): Promise<string> {
      return this._sendMessage<string>('decrypt', data)
    },

    encrypt(data: string): Promise<string> {
      return this._sendMessage<string>('encrypt', data)
    },

    closeVault(): Promise<void> {
      return this._sendMessage<void>('close')
    },

    async resetVault(): Promise<void> {
      this.vaultSalt = ''
      await this.closeVault().catch(() => {})
    }
  }
})
