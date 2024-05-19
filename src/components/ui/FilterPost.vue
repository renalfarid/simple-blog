<script setup>
import { ref, reactive, onMounted} from 'vue'
import useApiRequest from '../../composable/useApiRequest'
import { useFilterStore } from '../../stores/filterStore'

const { state, fetchFilterParams, fetchFilterPosts } = useApiRequest()

const filterStore = useFilterStore()

const statusOptions = ref([])
const authorOptions = ref([])
const publishedDateOptions = ref([])

const selectedFilters = reactive({
  statuses: [],
  authors: [],
  dates: [],
})

const fetchFilterData = async (param, targetArray) => {
  await fetchFilterParams(param)
  targetArray.value = state.data.results
}

const applyFilters = async () => {
  // Construct the filter query parameters from the selected filters
  const query = new URLSearchParams()

  if (selectedFilters.statuses.length) {
    query.append('status', selectedFilters.statuses.join(','))
  }
  if (selectedFilters.authors.length) {
    query.append('author_id', selectedFilters.authors.join(','))
  }
  if (selectedFilters.dates.length) {
    query.append('published_date', selectedFilters.dates.join(','))
  }

  console.log("query :", query.toString())

  // Fetch filtered data based on selected filters
  await fetchFilterPosts(query.toString())
  filterStore.storeFilterData(state.data.results)
  //console.log("data after filter", filterStore.filterData) 
}

onMounted(async () => {
  await fetchFilterData('status', statusOptions)
  await fetchFilterData('author_id', authorOptions)
  await fetchFilterData('published_date', publishedDateOptions)
})

</script>

<template>
    <div class="m-10 flex gap-8">
      <!-- Status Filter -->
      <div class="relative">
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span class="text-sm font-medium">Status</span>
            <span class="transition group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </summary>
          <div class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
            <div class="w-96 rounded border border-gray-200 bg-white">
              <ul class="space-y-1 border-t border-gray-200 p-4">
                <li v-for="status in statusOptions" :key="status.status">
                  <label :for="`filter-status-${status.status}`" class="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      :id="`filter-status-${status.status}`"
                      class="size-5 rounded border-gray-300"
                      v-model="selectedFilters.statuses"
                      :value="status.status"
                    />
                    <span class="text-sm font-medium text-gray-700"> {{ status.status }} </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </details>
      </div>
  
      <!-- Author Filter -->
      <div class="relative">
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span class="text-sm font-medium">Author</span>
            <span class="transition group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </summary>
          <div class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
            <div class="w-96 rounded border border-gray-200 bg-white">
              <ul class="space-y-1 border-t border-gray-200 p-4">
                <li v-for="author in authorOptions" :key="author.author_name">
                  <label :for="`filter-author-${author.author_name}`" class="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      :id="`filter-author-${author.author_name}`"
                      class="size-5 rounded border-gray-300"
                      v-model="selectedFilters.authors"
                      :value="author.author_id"
                    />
                    <span class="text-sm font-medium text-gray-700"> {{ author.author_name }} </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </details>
      </div>
  
      <!-- Published Date Filter -->
      <div class="relative">
        <details class="group [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span class="text-sm font-medium">Published Date</span>
            <span class="transition group-open:-rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </summary>
          <div class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
            <div class="w-96 rounded border border-gray-200 bg-white">
              <ul class="space-y-1 border-t border-gray-200 p-4">
                <li v-for="date in publishedDateOptions" :key="date.published_date">
                  <label :for="`filter-date-${date.published_date}`" class="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      :id="`filter-date-${date.published_date}`"
                      class="size-5 rounded border-gray-300"
                      v-model="selectedFilters.dates"
                      :value="date.published_date"
                    />
                    <span class="text-sm font-medium text-gray-700"> {{ date.published_date }} </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </details>
      </div>
  
      <!-- Apply Filters Button -->
      <button @click="applyFilters" class="ml-4 py-2 px-4 bg-blue-500 text-white rounded">Apply Filters</button>
    </div>
  </template>
    