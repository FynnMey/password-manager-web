import { defineBoot } from '#q-app'
import {Http} from "@/services/http/Http";
import {useUserStore} from "@/stores/userStore";
import {LoginRequest} from "@/types/Request/LoginRequest";

export default defineBoot(async ({ router }) => {
  const user = useUserStore()
  if (user.id) {
    const refreshed = await user.refreshToken()
    console.log("refreshed: ", refreshed)
    if (!refreshed) {
      await router.push('/login')
    }
  }
})
