import { pgTable, text, timestamp, uuid, integer, pgEnum, date, decimal, boolean } from 'drizzle-orm/pg-core';

// --- Enums ---
export const employmentTypeEnum = pgEnum('employment_type', ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN']);
export const applicationStatusEnum = pgEnum('application_status', ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED']);
export const offerStatusEnum = pgEnum('offer_status', ['PENDING', 'ACCEPTED', 'REJECTED']);
export const trainingStatusEnum = pgEnum('training_status', ['ENROLLED', 'IN_PROGRESS', 'COMPLETED']);
export const difficultyLevelEnum = pgEnum('difficulty_level', ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
export const interviewTypeEnum = pgEnum('interview_type', ['PHONE', 'VIDEO', 'ONSITE']);

// --- Organizational ---
export const company = pgTable('company', {
    id: uuid('company_id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    industry: text('industry'),
    location: text('location'),
    website: text('website'),
    description: text('description'),
});

export const department = pgTable('department', {
    id: uuid('department_id').primaryKey().defaultRandom(),
    companyId: uuid('company_id').references(() => company.id).notNull(),
    name: text('name').notNull(),
    managerId: uuid('manager_id'),
    floorLocation: text('floor_location'),
});

// --- Recruitment ---
export const skill = pgTable('skill', {
    id: uuid('skill_id').primaryKey().defaultRandom(),
    skillName: text('skill_name').notNull(),
    category: text('category'),
});

export const jobPosting = pgTable('job_posting', {
    id: uuid('job_id').primaryKey().defaultRandom(),
    departmentId: uuid('department_id').references(() => department.id).notNull(),
    jobTitle: text('job_title').notNull(),
    description: text('description').notNull(),
    employmentType: employmentTypeEnum('employment_type').notNull(),
    salaryRangeMinimum: decimal('salary_range_minimum'),
    salaryRangeMaximum: decimal('salary_range_maximum'),
    postedDate: date('posted_date').defaultNow().notNull(),
    closingDate: date('closing_date'),
    status: text('status').default('OPEN'),
});

export const jobSkill = pgTable('job_skill', {
    id: uuid('job_skill_id').primaryKey().defaultRandom(),
    jobId: uuid('job_id').references(() => jobPosting.id).notNull(),
    skillId: uuid('skill_id').references(() => skill.id).notNull(),
    requiredLevel: integer('required_level'),
});

export const candidate = pgTable('candidate', {
    id: uuid('candidate_id').primaryKey().defaultRandom(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email_address').notNull().unique(),
    phoneNumber: text('phone_number'),
    resumeUrl: text('resume_url'),
    yearsExperience: integer('years_experience'),
    educationLevel: text('education_level'),
});

export const candidateSkill = pgTable('candidate_skill', {
    id: uuid('candidate_skill_id').primaryKey().defaultRandom(),
    candidateId: uuid('candidate_id').references(() => candidate.id).notNull(),
    skillId: uuid('skill_id').references(() => skill.id).notNull(),
    proficiencyLevel: integer('proficiency_level'),
    yearsExperience: integer('years_experience'),
});

export const application = pgTable('application', {
    id: uuid('application_id').primaryKey().defaultRandom(),
    candidateId: uuid('candidate_id').references(() => candidate.id).notNull(),
    jobId: uuid('job_id').references(() => jobPosting.id).notNull(),
    applicationDate: date('application_date').defaultNow().notNull(),
    status: applicationStatusEnum('status').default('APPLIED').notNull(),
    coverLetterUrl: text('cover_letter_url'),
});

export const offer = pgTable('offer', {
    id: uuid('offer_id').primaryKey().defaultRandom(),
    applicationId: uuid('application_id').references(() => application.id).notNull(),
    offerDate: date('offer_date').defaultNow().notNull(),
    salary: decimal('salary').notNull(),
    positionTitle: text('position_title').notNull(),
    status: offerStatusEnum('status').default('PENDING').notNull(),
});

// --- Evaluation ---
export const interviewer = pgTable('interviewer', {
    id: uuid('interviewer_id').primaryKey().defaultRandom(),
    companyId: uuid('company_id').references(() => company.id),
    departmentId: uuid('department_id').references(() => department.id),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email_address').notNull(),
    phone: text('phone_number'),
    jobTitle: text('job_title'),
});

export const recruiter = pgTable('recruiter', {
    id: uuid('recruiter_id').primaryKey().defaultRandom(),
    companyId: uuid('company_id').references(() => company.id),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email_address').notNull(),
    phone: text('phone_number'),
    position: text('position'),
});

export const interview = pgTable('interview', {
    id: uuid('interview_id').primaryKey().defaultRandom(),
    applicationId: uuid('application_id').references(() => application.id).notNull(),
    interviewerId: uuid('interviewer_id').references(() => interviewer.id).notNull(),
    interviewDate: timestamp('interview_date').notNull(),
    interviewType: interviewTypeEnum('interview_type').notNull(),
    feedback: text('feedback'),
    score: integer('score'),
});

export const testAssessment = pgTable('test_assessment', {
    id: uuid('test_id').primaryKey().defaultRandom(),
    applicationId: uuid('application_id').references(() => application.id).notNull(),
    testType: text('test_type').notNull(),
    assignedDate: date('assigned_date').defaultNow(),
    durationMinutes: integer('duration_minutes'),
});

export const testResult = pgTable('test_result', {
    id: uuid('result_id').primaryKey().defaultRandom(),
    testId: uuid('test_id').references(() => testAssessment.id).notNull(),
    score: integer('score'),
    passed: boolean('passed'),
    feedback: text('feedback'),
    submissionDate: date('submission_date'),
});

// --- Employee Management ---
export const employee = pgTable('employee', {
    id: uuid('employee_id').primaryKey().defaultRandom(),
    companyId: uuid('company_id').references(() => company.id).notNull(),
    departmentId: uuid('department_id').references(() => department.id).notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email_address').notNull().unique(),
    phone: text('phone_number'),
    hireDate: date('hire_date').notNull(),
    jobTitle: text('job_title').notNull(),
    salary: decimal('salary').notNull(),
});

export const employeeContract = pgTable('employee_contract', {
    id: uuid('contract_id').primaryKey().defaultRandom(),
    employeeId: uuid('employee_id').references(() => employee.id).notNull(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date'),
    contractType: employmentTypeEnum('contract_type').notNull(),
    baseSalary: decimal('base_salary').notNull(),
    signedDate: date('signed_date'),
});

export const promotionRecord = pgTable('promotion_record', {
    id: uuid('promotion_id').primaryKey().defaultRandom(),
    employeeId: uuid('employee_id').references(() => employee.id).notNull(),
    oldTitle: text('old_title'),
    newTitle: text('new_title').notNull(),
    oldSalary: decimal('old_salary'),
    newSalary: decimal('new_salary').notNull(),
    promotionDate: date('promotion_date').defaultNow().notNull(),
});

export const performanceReview = pgTable('performance_review', {
    id: uuid('review_id').primaryKey().defaultRandom(),
    employeeId: uuid('employee_id').references(() => employee.id).notNull(),
    reviewerId: uuid('reviewer_id').references(() => employee.id).notNull(),
    reviewDate: date('review_date').defaultNow().notNull(),
    rating: integer('rating'),
    comments: text('comments'),
});

// --- Training ---
export const trainingProgram = pgTable('training_program', {
    id: uuid('training_id').primaryKey().defaultRandom(),
    departmentId: uuid('department_id').references(() => department.id),
    programName: text('program_name').notNull(),
    description: text('description'),
    difficultyLevel: difficultyLevelEnum('difficulty_level'),
    durationHours: integer('duration_hours'),
});

export const trainingEnrollment = pgTable('training_enrollment', {
    id: uuid('enrollment_id').primaryKey().defaultRandom(),
    employeeId: uuid('employee_id').references(() => employee.id).notNull(),
    trainingId: uuid('training_id').references(() => trainingProgram.id).notNull(),
    enrollmentDate: date('enrollment_date').defaultNow().notNull(),
    completionDate: date('completion_date'),
    status: trainingStatusEnum('status').default('ENROLLED').notNull(),
});

// --- Legacy Exports (for backwards compatibility during migration) ---
// These aliases allow gradual migration of imports
export const companies = company;
export const departments = department;
export const skills = skill;
export const jobPostings = jobPosting;
export const jobSkills = jobSkill;
export const candidates = candidate;
export const candidateSkills = candidateSkill;
export const applications = application;
export const offers = offer;
export const interviewers = interviewer;
export const recruiters = recruiter;
export const interviews = interview;
export const testAssessments = testAssessment;
export const testResults = testResult;
export const employees = employee;
export const employeeContracts = employeeContract;
export const promotionRecords = promotionRecord;
export const performanceReviews = performanceReview;
export const trainingPrograms = trainingProgram;
export const trainingEnrollments = trainingEnrollment;
