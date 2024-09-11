<template>
  <FilterContainer>
    <span>{{ filter.name }}</span>
    <template #filter>
      <div class="relative">
        <input type="text" class="hidden">
        <input
          :id="id"
          class="block w-full form-control form-control-sm form-input form-input-bordered text-sm px-1"
          :class="{ 'text-white': (value == null) }"
          type="text"
          :dusk="`${filter.name}-daterange-filter`"
          name="daterangefilter"
          autocomplete="off"
          :value="value"
          :placeholder="placeholder"
          @keydown="handleInput($event)"
          @paste.prevent
        />
        <div 
          v-if="value"
          class="absolute top-0 right-0 mt-1 mr-1">
          <button class="bg-transparent"
            @click="clearFilter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </template>
  </FilterContainer>
</template>

<script>
import debounce from 'lodash/debounce'
import moment from 'moment-timezone';

export default {
  emits: ['change'],

  props: {
    resourceName: {
      type: String,
      required: true,
    },
    filterKey: {
      type: String,
      required: true,
    },
    lens: String,
  },

  data: () => ({
    id: null,
    value: null,
    startDate: null,
    endDate: null,
    currentStartDate: null,
    currentEndDate: null,
    debouncedHandleChange: null,
  }),

  created() {
    this.parseDates()

    this.debouncedHandleChange = debounce(() => this.handleChange(), 500)

    this.setCurrentFilterValue()
  },

  mounted() {
    this.id = 'dateRangeCalendar_' + this.generateId()
    
    Nova.$on('filter-reset', this.setCurrentFilterValue)
    
    setTimeout(() => {
      this.initDateRange()
    }, 1);
  },

  beforeUnmount() {
    Nova.$off('filter-reset', this.setCurrentFilterValue)
  },

  watch: {
    value() {
      this.debouncedHandleChange()
    },
  },

  methods: {
    setCurrentFilterValue() {
      if (this.filter.currentValue) {
        this.value = this.filter.currentValue
      } else {
        this.value = null
      }
    },
    handleChange() {
      this.$store.commit(`${this.resourceName}/updateFilterState`, {
        filterClass: this.filterKey,
        value: (
          (this.currentStartDate && this.currentEndDate) ? 
          (this.currentStartDate.format('YYYY-MM-DD') + ' to ' + this.currentEndDate.format('YYYY-MM-DD')) :
          null
        ),
      })

      this.$emit('change')

      this.currentStartDate = null
      this.currentEndDate = null
    },
    handleInput(e) {
        return e.preventDefault();
    },
    initDateRange: function() {
      const ref = this
      const idSelector = ('#' + this.id)
      const minDate = ref.filter.minDate
      const maxDate = ref.filter.maxDate

      $(idSelector).daterangepicker({
        "startDate": ref.startDate,
			  "endDate": ref.endDate,
        "minDate": (minDate ? moment(minDate).tz('America/New_York') : null),
        "maxDate": (maxDate ? moment(maxDate).tz('America/New_York') : null),
        "ranges": ref.parseRanges(),
      }, function(start, end, label) {
        if (start && end) {
          ref.currentStartDate = start
          ref.currentEndDate = end
        }
      })
      .on('apply.daterangepicker', function(ev, picker) {
        if (ref.currentStartDate && ref.currentEndDate) {
          ref.value = ref.currentStartDate.format('MM/DD/YYYY') + ' to ' + ref.currentEndDate.format('MM/DD/YYYY')
        }
      })
    },
    clearFilter: function () {
      this.value = null
    },
    generateId: function () {
      return Math.random().toString(36).substring(2) +
        (new Date()).getTime().toString(36);
    },
    parseDates: function() {
      const dateRange = this.filter.currentValue
      let startDate = moment().tz('America/New_York')
      let endDate = moment().tz('America/New_York')

      if (dateRange) {
        const parsedDateRange = dateRange.split(' to ')
        if (parsedDateRange.length == 2) {
          try {
            startDate = moment(parsedDateRange[0], "YYYY-MM-DD").tz('America/New_York')
            endDate = moment(parsedDateRange[1], "YYYY-MM-DD").tz('America/New_York')
          } catch(e){}
        }
      }
      this.startDate = startDate.format('MM/DD/YYYY')
      this.endDate = endDate.format('MM/DD/YYYY')

      this.currentStartDate = startDate
      this.currentEndDate = endDate
    },
    parseRanges: function() {
      const ranges = this.filter.options;
      let parsedRanges = {};

      for(let i=0; i<ranges.length; i++) {
        parsedRanges[ranges[i]['label']] = [moment(ranges[i][0]).tz('America/New_York'), moment(ranges[i][1]).tz('America/New_York')]
      }

      return parsedRanges;
    }
  },

  computed: {
    filter() {
      return this.$store.getters[`${this.resourceName}/getFilter`](
        this.filterKey
      )
    },
  },
}
</script>
