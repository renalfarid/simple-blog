<script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    show: Boolean,
    comment: Object
  })
  const emits = defineEmits(['close', 'save'])
  
  const updatedContent = ref('')
  
  watch(() => props.comment, (newComment) => {
    updatedContent.value = newComment?.content || ''
  })
  
  const closeModal = () => {
    emits('close')
  }
  
  const saveComment = () => {
    emits('save', { ...props.comment, content: updatedContent.value })
  }
</script>
  
<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-6">
        <h2 class="text-xl mb-4">Edit Comment</h2>
        <textarea v-model="updatedContent" class="w-full p-2 border rounded" rows="5"></textarea>
        <div class="mt-4 flex justify-end">
          <button @click="closeModal" class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">Cancel</button>
          <button @click="saveComment" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  
  