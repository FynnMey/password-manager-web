import { defineBoot } from '#q-app'
import { useUserStore } from '@/stores/userStore'

export default defineBoot(({ router }) => {
  router.beforeEach((to) => {
    const user = useUserStore()
    const isLoggedIn = Boolean(user.id)

    if (!isLoggedIn && to.path !== '/login') {
      return { path: '/login' }
    }
  })
})
