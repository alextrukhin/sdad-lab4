export type JOB_POSITION = {
  id: number
  title: string
  description: string
  openings: number
  posted: Date
  deadline: Date
  status: string
  location: string
  departmentId: number
  salary: number
  employment: string
}

export type DEPARTMENT = {
  id: number
  title: string
  description: string
}

export type JOB_APPLICATION = {
  id: number
  applicantName: string
  applicantEmail: string
  applicantPhoneNumber: string
  resume: string
  coverLetter: string
  applicationDate: Date
  status: string
  interviewDate: Date | null
  feedback: string
  notes: string
  jobPositionId: number
}

export type INTERVIEW = {
  interviewerId: number
  interviewDate: Date
  interviewTime: string
  location: string
  notes: string
  interviewerFeedback: string
  applicationId: number
}

export type APPLICANT_FEEDBACK = {
  interviewerId: number
  feedbackDate: Date
  feedbackNotes: string
  overallRating: number
  applicationId: number
}

export type HIRING_DECISION = {
  decisionDate: Date
  decision: string
  notes: string
  status: string
  applicationId: number
  makerId: number
}
