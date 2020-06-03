<template>
  <div class="logo">
    <router-link :to="{name:'slideshow'}">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.png?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '顽皮斯',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
