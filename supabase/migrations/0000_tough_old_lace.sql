CREATE TYPE "public"."application_status" AS ENUM('APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."difficulty_level" AS ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED');--> statement-breakpoint
CREATE TYPE "public"."employment_type" AS ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN');--> statement-breakpoint
CREATE TYPE "public"."interview_type" AS ENUM('PHONE', 'VIDEO', 'ONSITE');--> statement-breakpoint
CREATE TYPE "public"."offer_status" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."training_status" AS ENUM('ENROLLED', 'IN_PROGRESS', 'COMPLETED');--> statement-breakpoint
CREATE TABLE "applications" (
	"application_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_id" uuid NOT NULL,
	"job_id" uuid NOT NULL,
	"application_date" date DEFAULT now() NOT NULL,
	"status" "application_status" DEFAULT 'APPLIED' NOT NULL,
	"cover_letter_url" text
);
--> statement-breakpoint
CREATE TABLE "candidate_skills" (
	"candidate_skill_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL,
	"proficiency_level" integer,
	"years_experience" integer
);
--> statement-breakpoint
CREATE TABLE "candidates" (
	"candidate_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email_address" text NOT NULL,
	"phone_number" text,
	"resume_url" text,
	"years_experience" integer,
	"education_level" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "candidates_email_address_unique" UNIQUE("email_address")
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"company_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"industry" text,
	"location" text,
	"website" text,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "departments" (
	"department_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"name" text NOT NULL,
	"manager_id" uuid,
	"floor_location" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employee_contracts" (
	"contract_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"contract_type" "employment_type" NOT NULL,
	"base_salary" numeric NOT NULL,
	"signed_date" date
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"employee_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"department_id" uuid NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email_address" text NOT NULL,
	"phone_number" text,
	"hire_date" date NOT NULL,
	"job_title" text NOT NULL,
	"salary" numeric NOT NULL,
	"manager_id" uuid,
	CONSTRAINT "employees_email_address_unique" UNIQUE("email_address")
);
--> statement-breakpoint
CREATE TABLE "interviewers" (
	"interviewer_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid,
	"department_id" uuid,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email_address" text NOT NULL,
	"phone_number" text,
	"job_title" text
);
--> statement-breakpoint
CREATE TABLE "interviews" (
	"interview_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"interviewer_id" uuid NOT NULL,
	"interview_date" timestamp NOT NULL,
	"interview_type" "interview_type" NOT NULL,
	"feedback" text,
	"score" integer
);
--> statement-breakpoint
CREATE TABLE "job_postings" (
	"job_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"department_id" uuid NOT NULL,
	"job_title" text NOT NULL,
	"description" text NOT NULL,
	"employment_type" "employment_type" NOT NULL,
	"salary_range_min" numeric,
	"salary_range_max" numeric,
	"posted_date" date DEFAULT now() NOT NULL,
	"closing_date" date,
	"status" text DEFAULT 'OPEN'
);
--> statement-breakpoint
CREATE TABLE "job_skills" (
	"job_skill_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL,
	"required_level" integer
);
--> statement-breakpoint
CREATE TABLE "offers" (
	"offer_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"offer_date" date DEFAULT now() NOT NULL,
	"salary" numeric NOT NULL,
	"position_title" text NOT NULL,
	"status" "offer_status" DEFAULT 'PENDING' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "performance_reviews" (
	"review_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"reviewer_id" uuid NOT NULL,
	"review_date" date DEFAULT now() NOT NULL,
	"rating" integer,
	"comments" text
);
--> statement-breakpoint
CREATE TABLE "promotion_records" (
	"promotion_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"old_title" text,
	"new_title" text NOT NULL,
	"old_salary" numeric,
	"new_salary" numeric NOT NULL,
	"promotion_date" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recruiters" (
	"recruiter_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email_address" text NOT NULL,
	"phone_number" text,
	"position" text
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"skill_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"skill_name" text NOT NULL,
	"category" text
);
--> statement-breakpoint
CREATE TABLE "test_assessments" (
	"test_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"test_type" text NOT NULL,
	"assigned_date" date DEFAULT now(),
	"duration_minutes" integer
);
--> statement-breakpoint
CREATE TABLE "test_results" (
	"result_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"test_id" uuid NOT NULL,
	"score" integer,
	"passed" boolean,
	"feedback" text,
	"submission_date" date
);
--> statement-breakpoint
CREATE TABLE "training_enrollments" (
	"enrollment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"training_id" uuid NOT NULL,
	"enrollment_date" date DEFAULT now() NOT NULL,
	"completion_date" date,
	"status" "training_status" DEFAULT 'ENROLLED' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "training_programs" (
	"training_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"department_id" uuid,
	"program_name" text NOT NULL,
	"description" text,
	"difficulty_level" "difficulty_level",
	"duration_hours" integer
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_candidate_id_candidates_candidate_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("candidate_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_job_postings_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job_postings"("job_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_skills" ADD CONSTRAINT "candidate_skills_candidate_id_candidates_candidate_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("candidate_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_skills" ADD CONSTRAINT "candidate_skills_skill_id_skills_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("skill_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_company_id_companies_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("company_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_contracts" ADD CONSTRAINT "employee_contracts_employee_id_employees_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("employee_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_company_id_companies_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("company_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_departments_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("department_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interviewers" ADD CONSTRAINT "interviewers_company_id_companies_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("company_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interviewers" ADD CONSTRAINT "interviewers_department_id_departments_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("department_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_application_id_applications_application_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("application_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_interviewer_id_interviewers_interviewer_id_fk" FOREIGN KEY ("interviewer_id") REFERENCES "public"."interviewers"("interviewer_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_department_id_departments_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("department_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_job_id_job_postings_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job_postings"("job_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_skill_id_skills_skill_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("skill_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_application_id_applications_application_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("application_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "performance_reviews" ADD CONSTRAINT "performance_reviews_employee_id_employees_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("employee_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "performance_reviews" ADD CONSTRAINT "performance_reviews_reviewer_id_employees_employee_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."employees"("employee_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promotion_records" ADD CONSTRAINT "promotion_records_employee_id_employees_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("employee_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recruiters" ADD CONSTRAINT "recruiters_company_id_companies_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("company_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_assessments" ADD CONSTRAINT "test_assessments_application_id_applications_application_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("application_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_results" ADD CONSTRAINT "test_results_test_id_test_assessments_test_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."test_assessments"("test_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_enrollments" ADD CONSTRAINT "training_enrollments_employee_id_employees_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("employee_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_enrollments" ADD CONSTRAINT "training_enrollments_training_id_training_programs_training_id_fk" FOREIGN KEY ("training_id") REFERENCES "public"."training_programs"("training_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_programs" ADD CONSTRAINT "training_programs_department_id_departments_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("department_id") ON DELETE no action ON UPDATE no action;