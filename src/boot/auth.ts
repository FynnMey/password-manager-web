import { defineBoot } from '#q-app'
import { useUserStore } from '@/stores/userStore'
import {watch} from "vue";

export default defineBoot(({ router }) => {
  const user = useUserStore()

  router.beforeEach((to) => {
    const isLoggedIn = Boolean(user.id)

    if (!isLoggedIn && to.path !== '/login') {
      return { path: '/login' }
    }
  })

  watch(() => user.isAuthenticated, () => {
    if (!user.isAuthenticated) {
      router.push('/login')
    }
  })
})
