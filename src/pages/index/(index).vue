<script setup lang="ts">
import BasicCard from '@/components/common/card/BasicCard.vue'
import BasicButton from '@/components/common/button/BasicButton.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicBadge from '@/components/common/badge/BasicBadge.vue'
import PasswordList from '@/components/dashboard/PasswordList.vue'
</script>

<template>
  <div class="dashboard">
    <div class="page-header row items-center justify-between">
      <div>
        <div class="page-title">Dashboard</div>
        <div class="page-subtitle q-mt-xs">Verwalte deine gespeicherten Passwörter</div>
      </div>
      <basic-badge label="Verschlüsselt" icon="shield" color="positive" dot />
    </div>

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-4">
        <basic-card variant="flat" padding="q-pa-md" max-width="100%">
          <div class="q-mb-md">
            <div class="section-label q-mb-sm">Aktionen</div>
            <basic-button
              label="Neues Passwort"
              icon="add"
              to="/create/password"
              size="md"
            />
          </div>

          <div class="dashboard-info q-pa-md">
            <div class="row items-center q-gutter-sm q-mb-xs">
              <basic-icon-box size="xs" variant="soft">
                <basic-icon name="info_outline" size="14px" color="secondary" />
              </basic-icon-box>
              <span class="card-title">Tipp</span>
            </div>
            <div class="card-subtitle">
              Verwende für jede Seite ein einzigartiges, zufällig generiertes Passwort.
            </div>
          </div>

        </basic-card>
      </div>

      <div class="col-12 col-md-8">
        <password-list />
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-info {
  background: rgba($primary, 0.04);
  border: 1px solid rgba($primary, 0.12);
  border-radius: 12px;
}
</style>
