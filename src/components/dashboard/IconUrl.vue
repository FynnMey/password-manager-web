<script setup lang="ts">
import {Http} from "@/services/http/Http";
import {ref} from "vue";
import BasicIconBox from "@/components/common/icon/BasicIconBox.vue";
import BasicIcon from "@/components/common/icon/BasicIcon.vue";

const props = defineProps<{
  url: string
  height?: string
  width?: string
  noFullWidth?: boolean
}>()

const image = ref<null | string>(null)

const http = new Http()
http.post<string>('api/icon', {
  url: props.url,
}).then(res => {
  image.value = res.data
}).catch(() => {
  image.value = null
}
)
</script>

<template>
  <div v-if="image" :class="[noFullWidth ? '' : 'full-width', 'full-height q-pa-sm']">
    <q-img :src="image" fit="cover" class="q-pa-sm" :height="height" :width="width" />
  </div>

  <basic-icon-box v-else size="xs" variant="soft">
    <basic-icon name="public" size="16px" />
  </basic-icon-box>
</template>

<style scoped lang="scss">

</style>
