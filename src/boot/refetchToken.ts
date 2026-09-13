import { defineBoot } from '#q-app'
import {Http} from "@/services/http/Http";

export default defineBoot(async ({}) => {
  const http = new Http()

  await http.post('api/auth/refresh', {})
    .then(res => {})
    .catch((err) => {
      console.log('err: ', err)
    })
})
