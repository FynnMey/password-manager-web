<script setup lang="ts">
import BasicCard from '@/components/common/card/BasicCard.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicBadge from '@/components/common/badge/BasicBadge.vue'
import PasswordList from '@/components/dashboard/PasswordList.vue'
import PasswordDetails from "@/components/dashboard/PasswordDetails.vue"
import BasicInput from "@/components/common/input/BasicInput.vue";
import ActionBar from "@/components/dashboard/ActionBar.vue";
</script>

<template>
  <div class="dashboard">
    <div class="page-header row items-center justify-between">
      <div>
        <div class="page-title">Dashboard</div>
        <div class="page-subtitle q-mt-xs">Verwalte deine gespeicherten Passwörter</div>
      </div>
    </div>

    <div class="row q-col-gutter-lg">
      <action-bar />

      <div class="col-12 col-md-8">
        <password-list />
      </div>
      <password-details />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
