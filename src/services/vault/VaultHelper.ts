export interface EncryptedPayload {
  ciphertext: string
  iv: string
  salt?: string | undefined
}

export function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!)
  }
  return btoa(binary)
}

export function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export function bufferToHex(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function hexToBuffer(hex: string): Uint8Array {
  const match = hex.match(/.{1,2}/g) || []
  return new Uint8Array(match.map((byte) => parseInt(byte, 16)))
}

export function generateSalt(byteLength = 16): string {
  const array = new Uint8Array(byteLength)
  globalThis.crypto.getRandomValues(array)
  return bufferToHex(array)
}

export function generateIv(byteLength = 12): Uint8Array {
  const iv = new Uint8Array(byteLength)
  globalThis.crypto.getRandomValues(iv)
  return iv
}

export async function deriveKey(
  password: string,
  saltHex: string,
  iterations = 100_000
): Promise<CryptoKey> {
  const enc = new TextEncoder()
  const passwordKey = await globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )

  const saltBuffer = hexToBuffer(saltHex)

  return globalThis.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer as unknown as BufferSource,
      iterations,
      hash: 'SHA-256'
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

export async function encryptTextWithKey(
  text: string,
  key: CryptoKey
): Promise<{ ciphertext: string; iv: string }> {
  const enc = new TextEncoder()
  const iv = generateIv(12)
  const encodedText = enc.encode(text)

  const cipherBuffer = await globalThis.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv as unknown as BufferSource
    },
    key,
    encodedText
  )

  return {
    ciphertext: bufferToBase64(cipherBuffer),
    iv: bufferToBase64(iv)
  }
}

export async function decryptTextWithKey(
  ciphertextBase64: string,
  ivBase64: string,
  key: CryptoKey
): Promise<string> {
  const cipherBuffer = base64ToBuffer(ciphertextBase64)
  const ivBuffer = base64ToBuffer(ivBase64)

  const decryptedBuffer = await globalThis.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: ivBuffer as unknown as BufferSource
    },
    key,
    cipherBuffer as unknown as BufferSource
  )

  const dec = new TextDecoder()
  return dec.decode(decryptedBuffer)
}
