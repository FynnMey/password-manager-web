import { Notify, Platform } from "quasar";

export const useNotificationAdapter = () => {
  const notify = Notify
  const isMobile = Platform.is.mobile

  const error = (message: string) => {
    notify.create({
      message,
      position: isMobile ? 'top' : 'bottom',
      type: 'negative',
      icon: 'warning',
    })
  }

  const warning = (message: string) => {
    notify.create({
      message,
      position: isMobile ? 'top' : 'bottom',
      type: 'warning',
      icon: 'warning',
    })
  }

  return {
    error,
    warning
  }
}
