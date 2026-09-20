import {VaultField} from "@/types/VaultField";
import {DecryptedEntry} from "@/types/DecryptedEntry";

export type VaultStore = {
  vault: VaultField[]
  activeField: DecryptedEntry | null
}
