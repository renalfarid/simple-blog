import { defineStore } from 'pinia'
import useApiRequest from '../composable/useApiRequest'

const {state, fetchFilterPosts} = useApiRequest()

export const useFilterStore = defineStore('filterStore', {
    state: () => ({ 
        filterData: [], 
    }),
    actions: {
      storeFilterData(data) {
        this.filterData = data
      },
      async getFilterData(queryString) {
        await fetchFilterPosts(queryString)
        this.filterData = state.data.results
        //console.log("store filter: ", this.filterData)
      }
    },
  })