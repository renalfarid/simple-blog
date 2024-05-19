<script setup>
  import DefaultView from './View.vue'
  import TopMenu from '../../components/ui/TopMenu.vue'
  import Announcement from '../../components/ui/Announcement.vue'
  import FilterPost from '../../components/ui/FilterPost.vue'
</script>
<template>
  <Announcement />
  <TopMenu />
  <FilterPost />
  <DefaultView /> 
</template>