import {NavigationLinkProps} from "@/types/navigation/NavigationLinkProps"
import {useUserStore} from "@/stores/userStore";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const { isAdmin } = storeToRefs(userStore)

export const useNavigationItems: NavigationLinkProps[] = [
  {
    label: "Dashboard",
    icon: "dashboard",
    link: "/#"
  },
  {
    label: "Masterpassword",
    caption: "Neues Masterpassword",
    icon: "school",
    link: "/#/create/masterPassword"
  },
  ...(isAdmin.value ? [
    {
      label: "Code erstellen",
      caption: "Premium code",
      icon: "diamond",
      link: "/#/premium/create"
    },
  ] : []),
  {
    label: "Login",
    icon: "login",
    link: "/#/login"
  },
  {
    label: "Logout",
    icon: "logout",
    link: "/#/logout"
  },
];
