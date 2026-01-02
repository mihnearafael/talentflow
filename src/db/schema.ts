import { pgTable, text, timestamp, uuid, integer, pgEnum, date, decimal, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// --- Enums ---
export const employmentTypeEnum = pgEnum('employment_type', ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN']);
export const applicationStatusEnum = pgEnum('application_status', ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED']);
export const offerStatusEnum = pgEnum('offer_status', ['PENDING', 'ACCEPTED', 'REJECTED']);
export const trainingStatusEnum = pgEnum('training_status', ['ENROLLED', 'IN_PROGRESS', 'COMPLETED']);
export const difficultyLevelEnum = pgEnum('difficulty_level', ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
export const interviewTypeEnum = pgEnum('interview_type', ['PHONE', 'VIDEO', 'ONSITE']);

// --- Organizational ---
export const companies = pgTable('companies', {
    id: uuid('company_id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    industry: text('industry'),
    location: text('location'),
    website: text('website'),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const departments = pgTable('departments', {
    id: uuid('department_id').primaryKey().defaultRandom(),
    companyId: uuid('company_id').references(() => companies.id).notNull(),
    name: text('name').notNull(),
    managerId: uuid('manager_id'), // Self-reference to employee handled in relations safely or treated as raw uuid for now
    floorLocation: text('floor_location'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- Recruitment ---
export const skills = pgTable('skills', {
    id: uuid('skill_id').primaryKey().defaultRandom(),
    skillName: text('skill_name').notNull(),
    category: text('category'),
});

export const jobPostings = pgTable('job_postings', {
    id: uuid('job_id').primaryKey().defaultRandom(),
    departmentId: uuid('department_id').references(() => departments.id).notNull(),
    jobTitle: text('job_title').notNull(),
    description: text('description').notNull(),
    employmentType: employmentTypeEnum('employment_type').notNull(),
    salaryRangeMin: decimal('salary_range_min'),
    salaryRangeMax: decimal('salary_range_max'),
    postedDate: date('posted_date').defaultNow().notNull(),
    closingDate: date('closing_date'),
    status: text('status').default('OPEN'), // OPEN, CLOSED
});

export const jobSkills = pgTable('job_skills', {
    id: uuid('job_skill_id').primaryKey().defaultRandom(),
    jobId: uuid('job_id').references(() => jobPostings.id).notNull(),
    skillId: uuid('skill_id').references(() => skills.id).notNull(),
    requiredLevel: integer('required_level'), // 1-5 scale
});

export const candidates = pgTable('candidates', {
    id: uuid('candidate_id').primaryKey().defaultRandom(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email_address').notNull().unique(),
    phoneNumber: text('phone_number'),
    resumeUrl: text('resume_url'),
    yearsExperience: integer('years_experience'),
    educationLevel: text('education_level'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const candidateSkills = pgTable('candidate_skills', {
    id: uuid('candidate_skill_id').primaryKey().defaultRandom(),
    candidateId: uuid('candidate_id').references(() => candidates.id).notNull(),
    skillId: uuid('skill_id').references(() => skills.id).notNull(),
    proficiencyLevel: integer('proficiency_level'),
    yearsExperience: integer('years_experience'),
});

export const applications = pgTable('applications', {
    id: uuid('application_id').primaryKey().defaultRandom(),
    candidateId: uuid('candidate_id').references(() => candidates.id).notNull(),
    jobId: uuid('job_id').references(() => jobPostings.id).notNull(),
    applicationDate: date('application_date').defaultNow().notNull(),
    status: applicationStatusEnum('status').default('APPLIED').notNull(),
    coverLetterUrl: text('cover_letter_url'),
});

export const offers = pgTable('offers', {
    id: uuid('offer_id').primaryKey().defaultRandom(),
    applicationId: uuid('application_id').references(() => applications.id).notNull(),
    offerDate: date('offer_date').defaultNow().notNull(),
    salary: decimal('salary').notNull(),
    positionTitle: text('position_title').notNull(),
    status: offerStatusEnum('status').default('PENDING').notNull(),
});

// --- Evaluation ---
// In a real system, interviewers and recruiters are just Employees with roles.
// But following ERD strictly, let's create specific tables or link them to Employee if possible.
// The ERD shows Interviewer and Recruiter tables separate or subtypes. 
// For strict ERD compliance based on the request "follow exact logic", I will create separate tables 
// but it's best practice to link them to `employees`.
// Looking at ERD, Interviewer has `company_id` and `department_id`.
export const interviewers = pgTable('interviewers', {
    id: uuid('interviewer_id').primaryKey().defaultRandom(),
    companyId: uuid('company_id').references(() => companies.id),
    departmentId: uuid('department_id').references(() => departments.id),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email_address').notNull(),
    phone: text('phone_number'),
    jobTitle: text('job_title'),
});

export const recruiters = pgTable('recruiters', {
    id: uuid('recruiter_id').primaryKey().defaultRandom(),
    companyId: uuid('company_id').references(() => companies.id),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email_address').notNull(),
    phone: text('phone_number'),
    position: text('position'),
});

export const interviews = pgTable('interviews', {
    id: uuid('interview_id').primaryKey().defaultRandom(),
    applicationId: uuid('application_id').references(() => applications.id).notNull(),
    interviewerId: uuid('interviewer_id').references(() => interviewers.id).notNull(),
    interviewDate: timestamp('interview_date').notNull(),
    interviewType: interviewTypeEnum('interview_type').notNull(),
    feedback: text('feedback'),
    score: integer('score'), // 1-10
});

export const testAssessments = pgTable('test_assessments', {
    id: uuid('test_id').primaryKey().defaultRandom(),
    applicationId: uuid('application_id').references(() => applications.id).notNull(),
    testType: text('test_type').notNull(), // Coding, Personality, etc.
    assignedDate: date('assigned_date').defaultNow(),
    durationMinutes: integer('duration_minutes'),
});

export const testResults = pgTable('test_results', {
    id: uuid('result_id').primaryKey().defaultRandom(),
    testId: uuid('test_id').references(() => testAssessments.id).notNull(),
    score: integer('score'),
    passed: boolean('passed'),
    feedback: text('feedback'),
    submissionDate: date('submission_date'),
});

// --- Employee Management ---
export const employees = pgTable('employees', {
    id: uuid('employee_id').primaryKey().defaultRandom(),
    companyId: uuid('company_id').references(() => companies.id).notNull(),
    departmentId: uuid('department_id').references(() => departments.id).notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email_address').notNull().unique(),
    phone: text('phone_number'),
    hireDate: date('hire_date').notNull(),
    jobTitle: text('job_title').notNull(),
    salary: decimal('salary').notNull(),
    // Manager ID self reference
    managerId: uuid('manager_id'),
});

export const employeeContracts = pgTable('employee_contracts', {
    id: uuid('contract_id').primaryKey().defaultRandom(),
    employeeId: uuid('employee_id').references(() => employees.id).notNull(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date'),
    contractType: employmentTypeEnum('contract_type').notNull(),
    baseSalary: decimal('base_salary').notNull(),
    signedDate: date('signed_date'),
});

export const promotionRecords = pgTable('promotion_records', {
    id: uuid('promotion_id').primaryKey().defaultRandom(),
    employeeId: uuid('employee_id').references(() => employees.id).notNull(),
    oldTitle: text('old_title'),
    newTitle: text('new_title').notNull(),
    oldSalary: decimal('old_salary'),
    newSalary: decimal('new_salary').notNull(),
    promotionDate: date('promotion_date').defaultNow().notNull(),
});

export const performanceReviews = pgTable('performance_reviews', {
    id: uuid('review_id').primaryKey().defaultRandom(),
    employeeId: uuid('employee_id').references(() => employees.id).notNull(),
    reviewerId: uuid('reviewer_id').references(() => employees.id).notNull(), // Assuming reviewer is an employee
    reviewDate: date('review_date').defaultNow().notNull(),
    rating: integer('rating'), // 1-5
    comments: text('comments'),
});

// --- Training ---
export const trainingPrograms = pgTable('training_programs', {
    id: uuid('training_id').primaryKey().defaultRandom(),
    departmentId: uuid('department_id').references(() => departments.id),
    programName: text('program_name').notNull(),
    description: text('description'),
    difficultyLevel: difficultyLevelEnum('difficulty_level'),
    durationHours: integer('duration_hours'),
});

export const trainingEnrollments = pgTable('training_enrollments', {
    id: uuid('enrollment_id').primaryKey().defaultRandom(),
    employeeId: uuid('employee_id').references(() => employees.id).notNull(),
    trainingId: uuid('training_id').references(() => trainingPrograms.id).notNull(),
    enrollmentDate: date('enrollment_date').defaultNow().notNull(),
    completionDate: date('completion_date'),
    status: trainingStatusEnum('status').default('ENROLLED').notNull(),
});
