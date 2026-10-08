import {VaultField} from "@/types/VaultField";

export type VaultStore = {
  vault: VaultField[]
  activeFieldId: string | null
  searchField: string
}
