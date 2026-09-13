<script setup lang="ts">
import BasicCard from '@/components/common/card/BasicCard.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import PasswordList from "@/components/dashboard/PasswordList.vue"
</script>

<template>
  <div class="dashboard">
    <basic-card>
      <basic-button
        label="Neues Password"
        to="/create/password"
      />
    </basic-card>

    <password-list />
  </div>
</template>
