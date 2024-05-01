import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { JOB_POSITION, DEPARTMENT, JOB_APPLICATION } from '@/types'

export const useDBStore = defineStore('db', () => {
  const departments = ref<DEPARTMENT[]>([
    {
      id: 1,
      title: 'Engineering',
      description: 'The Engineering Department'
    }
  ])
  const jobPositions = ref<JOB_POSITION[]>([
    {
      id: 1,
      title: 'Software Engineer',
      description: 'The Software Engineer Position',
      openings: 5,
      posted: new Date(),
      deadline: new Date(),
      status: 'Open',
      location: 'Remote',
      departmentId: 1,
      salary: 100000,
      employment: 'Full Time'
    }
  ])
  const jobApplications = ref<JOB_APPLICATION[]>([])

  function initDB() {
    const departmentsLS = localStorage.getItem('departments')
    const jobPositionsLS = localStorage.getItem('jobPositions')
    const jobApplicationsLS = localStorage.getItem('jobApplications')

    if (departmentsLS) {
      departments.value = JSON.parse(departmentsLS)
    }
    if (jobPositionsLS) {
      jobPositions.value = JSON.parse(jobPositionsLS)
    }
    if (jobApplicationsLS) {
      jobApplications.value = JSON.parse(jobApplicationsLS)
    }
  }

  watch(departments, () => {
    localStorage.setItem('departments', JSON.stringify(departments.value))
  })
  watch(jobPositions, () => {
    localStorage.setItem('jobPositions', JSON.stringify(jobPositions.value))
  })

  function insertApplication(application: JOB_APPLICATION) {
    jobApplications.value.push(application)
    localStorage.setItem('jobApplications', JSON.stringify(jobApplications.value))
  }

  return { departments, jobPositions, jobApplications, initDB, insertApplication }
})
