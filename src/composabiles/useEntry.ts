import {Http} from "@/services/http/Http";
import {VaultField} from "@/types/VaultField";
import {useVaultStore} from "@/stores/vaultStore";
import {storeToRefs} from "pinia";
import {useCryptoStore} from "@/stores/cryptoStore";
import {VaultRequest} from "@/types/Request/VaultRequest";
import {useNotificationAdapter} from "@/composabiles/adapter/notification/useNotificationAdapter";

export const useEntry = () => {
  const http = new Http()
  const { success } = useNotificationAdapter()

  const cryptoStore = useCryptoStore()

  const encrypt = async (value: string | null) => {
    if (value)
      return await cryptoStore.encrypt(value)

    return undefined
  }

  const vaultStore = useVaultStore()
  const { vault, activeField, activeFieldId } = storeToRefs(vaultStore)

  const updateEntry = async (entry: VaultField) => {
    await http.post("api/user/password/update", {
      Id: entry.id,
      EncryptedName: await encrypt(entry.name),
      EncryptedEmail: await encrypt(entry.account),
      EncryptedPassword: await encrypt(entry.password),
      EncryptedWebsite: await encrypt(entry.website),
      EncryptedNote: await encrypt(entry.note),
    }).then(() => {
      const target = vault.value.find(field => field.id === entry.id)
      if (target) {
        Object.assign(target, entry)
      }
    })
  }

  const deleteEntry = async () => {
    if (activeFieldId.value)
      await http.post("api/user/password/delete", { id: activeFieldId.value }).then(result => {
        if (result.success && activeField.value) {
          vaultStore.deleteSingleField(activeField.value.id)
          activeFieldId.value = null
        }
      })
  }

  const createEntry = async (entry: VaultField) => {
    await http.post<VaultRequest>('/api/user/password/create', {
      encryptedName: await cryptoStore.encrypt(entry.name),
      encryptedEmail: await cryptoStore.encrypt(entry.account),
      encryptedPassword: await cryptoStore.encrypt(entry.password),
      encryptedWebsite: await cryptoStore.encrypt(entry.website),
      encryptedNote: await cryptoStore.encrypt(entry.note),
    }).then((result) => {
      if (result.success) {
        vaultStore.addSingleField(entry)
        success("Passwort erfolgreich gespeichert.")

        return
      }
    })
  }

  return {
    updateEntry,
    deleteEntry,
    createEntry
  }
};
