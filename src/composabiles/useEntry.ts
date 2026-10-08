import {Http} from "@/services/http/Http";
import {VaultField} from "@/types/VaultField";
import {useVaultStore} from "@/stores/vaultStore";
import {storeToRefs} from "pinia";
import {useCryptoStore} from "@/stores/cryptoStore";

export const useEntry = () => {
  const http = new Http()

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

  return {
    updateEntry,
    deleteEntry
  }
};
