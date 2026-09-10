import {NavigationLinkProps} from "@/types/navigation/NavigationLinkProps";

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
