import {VaultField} from "@/types/VaultField";

export type CreatePasswordFields = (CreatePasswordSeperator | CreatePasswordField | CreatePasswordButton)[];

type CreatePasswordSeperator = { type: 'seperator', value: string }

type CreatePasswordButton = { type: 'button', value: string, icon?: string, click?: () => void }

type CreatePasswordField = {
  type: 'text' | 'password' | 'email' | 'url' | 'textarea'
  label: string
  name: {
    [K in keyof VaultField]: VaultField[K] extends string ? K : never
  }[keyof VaultField]
  icon: string
  required?: boolean
};
