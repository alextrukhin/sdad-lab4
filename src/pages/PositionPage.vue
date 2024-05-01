<template>
  <main v-if="position">
    <RouterLink to="/">Go back</RouterLink>
    <h1>{{ position.title }}</h1>
    <div class="data-row">
      <h4>status</h4>
      <h3>{{ position.status }}</h3>
    </div>
    <div class="data-row">
      <h4>location</h4>
      <h3>{{ position.location }}</h3>
    </div>
    <div class="data-row">
      <h4>salary</h4>
      <h3>${{ position.salary }}</h3>
    </div>
    <div class="data-row">
      <h4>description</h4>
      <h3>{{ position.description }}</h3>
    </div>
    <div class="data-row">
      <h4>openings</h4>
      <h3>{{ position.openings }} ({{ applications.length }} applications)</h3>
    </div>
    <div class="data-row">
      <h4>posted</h4>
      <h3>{{ position.posted }}</h3>
    </div>
    <div class="data-row">
      <h4>deadline</h4>
      <h3>{{ position.deadline }}</h3>
    </div>
    <div class="data-row">
      <h4>employment</h4>
      <h3>{{ position.employment }}</h3>
    </div>
    <br />
    <h2>Apply:</h2>
    <form @submit.prevent="submit">
      <input
        v-model="formState.applicantName"
        type="text"
        name="applicantName"
        placeholder="Applicant Name"
      />
      <input
        v-model="formState.applicantEmail"
        type="email"
        name="applicantEmail"
        placeholder="Applicant Email"
      />
      <input
        v-model="formState.applicantPhoneNumber"
        type="tel"
        name="applicantPhoneNumber"
        placeholder="Applicant Phone Number"
      />
      <input v-model="formState.resume" type="text" name="resume" placeholder="Resume link" />
      <textarea
        v-model="formState.coverLetter"
        name="coverLetter"
        placeholder="Cover Letter"
      ></textarea>
      <button type="submit">Submit Application</button>
    </form>
    <br />
    <details>
      <summary>
        <h2>Applications (for admins):</h2>
      </summary>
      <ul>
        <li v-for="application in applications" :key="application.id">
          <h3>{{ application.applicantName }}</h3>
          <p>{{ application.applicationDate }}</p>
          <p>{{ application.status }}</p>
          <p>{{ application.interviewDate }}</p>
          <p>{{ application.feedback }}</p>
          <p>{{ application.notes }}</p>
        </li>
      </ul>
    </details>
  </main>
  <main v-else>
    <RouterLink to="/">Go back</RouterLink>
    <h1>Position not found</h1>
  </main>
</template>
<script setup lang="ts">
import { useDBStore } from '@/stores/db'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'

const dbStore = useDBStore()
const route = useRoute()

const position = computed(() => {
  return (
    dbStore.jobPositions.find((item) => item.id === parseInt(route.params.id.toString())) ?? null
  )
})
const applications = computed(() => {
  return dbStore.jobApplications.filter((item) => item.jobPositionId === position.value?.id)
})

const formState = reactive({
  applicantName: '',
  applicantEmail: '',
  applicantPhoneNumber: '',
  resume: '',
  coverLetter: '',
  applicationDate: new Date(),
  status: '',
  interviewDate: null,
  feedback: '',
  notes: '',
  jobPositionId: position.value?.id ?? 0
})

const submit = () => {
  let biggestId = 0
  dbStore.jobApplications
    .filter((e) => e.jobPositionId === position.value!.id)
    .forEach((application) => {
      if (application.id > biggestId) {
        biggestId = application.id
      }
    })
  dbStore.insertApplication({
    ...formState,
    id: biggestId + 1,
    jobPositionId: position.value!.id
  })
}
</script>
<style scoped>
.data-row {
  margin-top: 24px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
