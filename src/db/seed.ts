import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Create connection with env loaded
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

// Helper functions for generating random data
function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date): string {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

function randomEmail(firstName: string, lastName: string, domain: string): string {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`.replace(/\s/g, '');
}

// Data pools for realistic generation
const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
    'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
    'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa',
    'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon'
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
    'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell'
];

const companyData = [
    { name: 'TechCorp Industries', industry: 'Technology', location: 'San Francisco, CA' },
    { name: 'Global Finance Partners', industry: 'Finance', location: 'New York, NY' },
    { name: 'HealthFirst Medical', industry: 'Healthcare', location: 'Boston, MA' },
    { name: 'EcoSolutions Inc', industry: 'Environmental', location: 'Seattle, WA' },
    { name: 'Retail Dynamics', industry: 'Retail', location: 'Chicago, IL' },
];

const departmentNames = [
    'Engineering', 'Product', 'Design', 'Marketing', 'Sales',
    'Human Resources', 'Finance', 'Operations', 'Customer Success', 'Legal'
];

const skillsData = [
    { name: 'JavaScript', category: 'Programming' },
    { name: 'TypeScript', category: 'Programming' },
    { name: 'Python', category: 'Programming' },
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'Machine Learning', category: 'AI/ML' },
    { name: 'Data Analysis', category: 'Analytics' },
    { name: 'Project Management', category: 'Management' },
    { name: 'Agile/Scrum', category: 'Methodology' },
    { name: 'UI/UX Design', category: 'Design' },
    { name: 'Figma', category: 'Design' },
    { name: 'Communication', category: 'Soft Skills' },
    { name: 'Leadership', category: 'Soft Skills' },
    { name: 'Problem Solving', category: 'Soft Skills' },
    { name: 'Java', category: 'Programming' },
    { name: 'Go', category: 'Programming' },
];

const jobTitles = [
    'Software Engineer', 'Senior Software Engineer', 'Staff Engineer', 'Principal Engineer',
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer',
    'Data Scientist', 'Data Analyst', 'Product Manager', 'Senior Product Manager',
    'UX Designer', 'UI Designer', 'Product Designer', 'Design Lead',
    'Marketing Manager', 'Content Strategist', 'Growth Analyst', 'Brand Manager',
    'Sales Representative', 'Account Executive', 'Sales Manager', 'Business Development Rep',
    'HR Coordinator', 'HR Manager', 'Talent Acquisition Specialist', 'People Operations',
    'Financial Analyst', 'Accountant', 'Controller', 'Finance Manager',
    'Customer Success Manager', 'Support Engineer', 'Technical Writer', 'QA Engineer'
];

const trainingProgramNames = [
    'Leadership Fundamentals', 'Advanced Python Programming', 'Cloud Architecture Basics',
    'Effective Communication', 'Agile Project Management', 'Data-Driven Decision Making',
    'Customer Service Excellence', 'Security Best Practices', 'Design Thinking Workshop',
    'Financial Modeling 101', 'Diversity & Inclusion Training', 'Public Speaking Skills',
    'React & Modern Frontend', 'Machine Learning Foundations', 'Team Collaboration Tools'
];

async function seed() {
    console.log('🌱 Starting database seed...\n');

    // --- DELETE ALL DATA (in reverse dependency order) ---
    console.log('🗑️  Clearing existing data...');

    await db.delete(schema.testResult);
    await db.delete(schema.testAssessment);
    await db.delete(schema.interview);
    await db.delete(schema.trainingEnrollment);
    await db.delete(schema.performanceReview);
    await db.delete(schema.promotionRecord);
    await db.delete(schema.employeeContract);
    await db.delete(schema.offer);
    await db.delete(schema.application);
    await db.delete(schema.candidateSkill);
    await db.delete(schema.candidate);
    await db.delete(schema.jobSkill);
    await db.delete(schema.jobPosting);
    await db.delete(schema.employee);
    await db.delete(schema.trainingProgram);
    await db.delete(schema.interviewer);
    await db.delete(schema.recruiter);
    await db.delete(schema.skill);
    await db.delete(schema.department);
    await db.delete(schema.company);

    console.log('✅ All data cleared.\n');

    // --- CREATE COMPANIES ---
    console.log('🏢 Creating companies...');
    const createdCompanies = await db.insert(schema.company).values(
        companyData.map(c => ({
            name: c.name,
            industry: c.industry,
            location: c.location,
            website: `https://www.${c.name.toLowerCase().replace(/\s/g, '')}.com`,
            description: `${c.name} is a leading company in the ${c.industry} sector.`
        }))
    ).returning();
    console.log(`   Created ${createdCompanies.length} companies`);

    // --- CREATE DEPARTMENTS ---
    console.log('🏬 Creating departments...');
    const createdDepartments: typeof schema.department.$inferSelect[] = [];
    for (const company of createdCompanies) {
        const numDepts = randomInt(4, 7);
        const selectedDepts = departmentNames.slice(0, numDepts);
        for (const deptName of selectedDepts) {
            const [dept] = await db.insert(schema.department).values({
                companyId: company.id,
                name: deptName,
                floorLocation: `Floor ${randomInt(1, 10)}`
            }).returning();
            createdDepartments.push(dept);
        }
    }
    console.log(`   Created ${createdDepartments.length} departments`);

    // --- CREATE SKILLS ---
    console.log('🛠️  Creating skills...');
    const createdSkills = await db.insert(schema.skill).values(
        skillsData.map(s => ({ skillName: s.name, category: s.category }))
    ).returning();
    console.log(`   Created ${createdSkills.length} skills`);

    // --- CREATE EMPLOYEES (30-50 per company for faster seeding) ---
    console.log('👥 Creating employees...');
    const createdEmployees: typeof schema.employee.$inferSelect[] = [];
    for (const company of createdCompanies) {
        const companyDepts = createdDepartments.filter(d => d.companyId === company.id);
        const numEmployees = randomInt(30, 50);

        for (let i = 0; i < numEmployees; i++) {
            const firstName = randomItem(firstNames);
            const lastName = randomItem(lastNames);
            const dept = randomItem(companyDepts);

            const [emp] = await db.insert(schema.employee).values({
                companyId: company.id,
                departmentId: dept.id,
                firstName,
                lastName,
                email: randomEmail(firstName, lastName + randomInt(1, 999), company.name.split(' ')[0].toLowerCase() + '.com'),
                phone: `+1-${randomInt(200, 999)}-${randomInt(100, 999)}-${randomInt(1000, 9999)}`,
                hireDate: randomDate(new Date('2018-01-01'), new Date('2024-12-01')),
                jobTitle: randomItem(jobTitles),
                salary: String(randomInt(50000, 200000))
            }).returning();
            createdEmployees.push(emp);
        }
    }
    console.log(`   Created ${createdEmployees.length} employees`);

    // --- CREATE INTERVIEWERS (from employees) ---
    console.log('🎤 Creating interviewers...');
    const interviewerEmployees = createdEmployees.filter(() => Math.random() < 0.2);
    const createdInterviewers = await db.insert(schema.interviewer).values(
        interviewerEmployees.map(e => ({
            companyId: e.companyId,
            departmentId: e.departmentId,
            firstName: e.firstName,
            lastName: e.lastName,
            email: e.email,
            phone: e.phone,
            jobTitle: e.jobTitle
        }))
    ).returning();
    console.log(`   Created ${createdInterviewers.length} interviewers`);

    // --- CREATE RECRUITERS ---
    console.log('📋 Creating recruiters...');
    const createdRecruiters: typeof schema.recruiter.$inferSelect[] = [];
    for (const company of createdCompanies) {
        const numRecruiters = randomInt(2, 4);
        for (let i = 0; i < numRecruiters; i++) {
            const firstName = randomItem(firstNames);
            const lastName = randomItem(lastNames);
            const [rec] = await db.insert(schema.recruiter).values({
                companyId: company.id,
                firstName,
                lastName,
                email: randomEmail(firstName, lastName + randomInt(1, 999), 'recruiting.com'),
                phone: `+1-${randomInt(200, 999)}-${randomInt(100, 999)}-${randomInt(1000, 9999)}`,
                position: randomItem(['Talent Acquisition', 'Senior Recruiter', 'HR Recruiter', 'Technical Recruiter'])
            }).returning();
            createdRecruiters.push(rec);
        }
    }
    console.log(`   Created ${createdRecruiters.length} recruiters`);

    // --- CREATE JOB POSTINGS ---
    console.log('💼 Creating job postings...');
    const createdJobs: typeof schema.jobPosting.$inferSelect[] = [];
    for (const dept of createdDepartments) {
        const numJobs = randomInt(1, 3);
        for (let i = 0; i < numJobs; i++) {
            const minSalary = randomInt(50000, 120000);
            const maxSalary = minSalary + randomInt(20000, 80000);
            const employmentTypes: ('FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN')[] = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'];
            const [job] = await db.insert(schema.jobPosting).values({
                departmentId: dept.id,
                jobTitle: randomItem(jobTitles),
                description: `We are looking for a talented professional to join our ${dept.name} team. This role offers exciting challenges and growth opportunities.`,
                employmentType: randomItem(employmentTypes),
                salaryRangeMinimum: String(minSalary),
                salaryRangeMaximum: String(maxSalary),
                postedDate: randomDate(new Date('2024-06-01'), new Date('2024-12-15')),
                closingDate: randomDate(new Date('2025-01-01'), new Date('2025-03-31')),
                status: randomItem(['OPEN', 'OPEN', 'OPEN', 'CLOSED'])
            }).returning();
            createdJobs.push(job);
        }
    }
    console.log(`   Created ${createdJobs.length} job postings`);

    // --- CREATE JOB SKILLS ---
    console.log('🔗 Linking job skills...');
    let jobSkillCount = 0;
    for (const job of createdJobs) {
        const numSkills = randomInt(2, 5);
        const shuffled = [...createdSkills].sort(() => Math.random() - 0.5);
        const selectedSkills = shuffled.slice(0, numSkills);
        for (const skill of selectedSkills) {
            await db.insert(schema.jobSkill).values({
                jobId: job.id,
                skillId: skill.id,
                requiredLevel: randomInt(1, 5)
            });
            jobSkillCount++;
        }
    }
    console.log(`   Created ${jobSkillCount} job-skill links`);

    // --- CREATE CANDIDATES ---
    console.log('📝 Creating candidates...');
    const createdCandidates: typeof schema.candidate.$inferSelect[] = [];
    for (let i = 0; i < 100; i++) {
        const firstName = randomItem(firstNames);
        const lastName = randomItem(lastNames);
        const [cand] = await db.insert(schema.candidate).values({
            firstName,
            lastName,
            email: randomEmail(firstName, lastName + randomInt(1, 9999), randomItem(['gmail.com', 'yahoo.com', 'outlook.com', 'proton.me'])),
            phoneNumber: `+1-${randomInt(200, 999)}-${randomInt(100, 999)}-${randomInt(1000, 9999)}`,
            resumeUrl: `https://resumes.example.com/${firstName.toLowerCase()}-${lastName.toLowerCase()}.pdf`,
            yearsExperience: randomInt(0, 15),
            educationLevel: randomItem(['High School', 'Associate', 'Bachelor', 'Master', 'PhD'])
        }).returning();
        createdCandidates.push(cand);
    }
    console.log(`   Created ${createdCandidates.length} candidates`);

    // --- CREATE CANDIDATE SKILLS ---
    console.log('🎯 Assigning candidate skills...');
    let candidateSkillCount = 0;
    for (const cand of createdCandidates) {
        const numSkills = randomInt(3, 6);
        const shuffled = [...createdSkills].sort(() => Math.random() - 0.5);
        const selectedSkills = shuffled.slice(0, numSkills);
        for (const skill of selectedSkills) {
            await db.insert(schema.candidateSkill).values({
                candidateId: cand.id,
                skillId: skill.id,
                proficiencyLevel: randomInt(1, 5),
                yearsExperience: randomInt(0, 10)
            });
            candidateSkillCount++;
        }
    }
    console.log(`   Created ${candidateSkillCount} candidate-skill links`);

    // --- CREATE APPLICATIONS ---
    console.log('📨 Creating applications...');
    const createdApplications: typeof schema.application.$inferSelect[] = [];
    const applicationStatuses: ('APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED')[] =
        ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED'];

    for (const cand of createdCandidates) {
        const numApps = randomInt(1, 3);
        const shuffledJobs = [...createdJobs].sort(() => Math.random() - 0.5);
        const appliedJobs = shuffledJobs.slice(0, numApps);
        for (const job of appliedJobs) {
            const [app] = await db.insert(schema.application).values({
                candidateId: cand.id,
                jobId: job.id,
                applicationDate: randomDate(new Date('2024-06-01'), new Date('2024-12-20')),
                status: randomItem(applicationStatuses),
                coverLetterUrl: Math.random() > 0.3 ? `https://letters.example.com/${cand.firstName.toLowerCase()}-cover.pdf` : null
            }).returning();
            createdApplications.push(app);
        }
    }
    console.log(`   Created ${createdApplications.length} applications`);

    // --- CREATE INTERVIEWS ---
    console.log('📅 Creating interviews...');
    const interviewableApps = createdApplications.filter(a =>
        ['INTERVIEW', 'OFFER', 'HIRED'].includes(a.status)
    );
    let interviewCount = 0;
    const interviewTypes: ('PHONE' | 'VIDEO' | 'ONSITE')[] = ['PHONE', 'VIDEO', 'ONSITE'];
    for (const app of interviewableApps) {
        const numInterviews = randomInt(1, 2);
        for (let i = 0; i < numInterviews; i++) {
            await db.insert(schema.interview).values({
                applicationId: app.id,
                interviewerId: randomItem(createdInterviewers).id,
                interviewDate: new Date(randomDate(new Date('2024-07-01'), new Date('2024-12-20'))),
                interviewType: randomItem(interviewTypes),
                feedback: randomItem([
                    'Strong technical skills, good cultural fit.',
                    'Excellent communication, needs more experience.',
                    'Great problem-solving abilities.',
                    'Solid background, recommended for next round.',
                    null
                ]),
                score: randomInt(1, 10)
            });
            interviewCount++;
        }
    }
    console.log(`   Created ${interviewCount} interviews`);

    // --- CREATE OFFERS ---
    console.log('💰 Creating offers...');
    const offerableApps = createdApplications.filter(a =>
        ['OFFER', 'HIRED'].includes(a.status)
    );
    const createdOffers: typeof schema.offer.$inferSelect[] = [];
    const offerStatuses: ('PENDING' | 'ACCEPTED' | 'REJECTED')[] = ['PENDING', 'ACCEPTED', 'ACCEPTED', 'REJECTED'];
    for (const app of offerableApps) {
        const [offer] = await db.insert(schema.offer).values({
            applicationId: app.id,
            offerDate: randomDate(new Date('2024-08-01'), new Date('2024-12-25')),
            salary: String(randomInt(60000, 180000)),
            positionTitle: randomItem(jobTitles),
            status: randomItem(offerStatuses)
        }).returning();
        createdOffers.push(offer);
    }
    console.log(`   Created ${createdOffers.length} offers`);

    // --- CREATE TRAINING PROGRAMS ---
    console.log('📚 Creating training programs...');
    const createdPrograms: typeof schema.trainingProgram.$inferSelect[] = [];
    const difficultyLevels: ('BEGINNER' | 'INTERMEDIATE' | 'ADVANCED')[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
    for (const dept of createdDepartments.slice(0, 15)) {
        const [prog] = await db.insert(schema.trainingProgram).values({
            departmentId: dept.id,
            programName: randomItem(trainingProgramNames),
            description: 'A comprehensive program designed to enhance skills and knowledge in this domain.',
            difficultyLevel: randomItem(difficultyLevels),
            durationHours: randomInt(4, 40)
        }).returning();
        createdPrograms.push(prog);
    }
    for (let i = 0; i < 5; i++) {
        const [prog] = await db.insert(schema.trainingProgram).values({
            departmentId: null,
            programName: randomItem(trainingProgramNames) + ' (Company-wide)',
            description: 'A company-wide training initiative for all employees.',
            difficultyLevel: randomItem(difficultyLevels),
            durationHours: randomInt(2, 16)
        }).returning();
        createdPrograms.push(prog);
    }
    console.log(`   Created ${createdPrograms.length} training programs`);

    // --- CREATE TRAINING ENROLLMENTS ---
    console.log('✏️  Creating training enrollments...');
    let enrollmentCount = 0;
    const trainingStatuses: ('ENROLLED' | 'IN_PROGRESS' | 'COMPLETED')[] = ['ENROLLED', 'IN_PROGRESS', 'COMPLETED'];
    for (const emp of createdEmployees.slice(0, 100)) {
        const numEnroll = randomInt(1, 2);
        const shuffledProgs = [...createdPrograms].sort(() => Math.random() - 0.5);
        const selectedProgs = shuffledProgs.slice(0, numEnroll);
        for (const prog of selectedProgs) {
            const status = randomItem(trainingStatuses);
            await db.insert(schema.trainingEnrollment).values({
                employeeId: emp.id,
                trainingId: prog.id,
                enrollmentDate: randomDate(new Date('2024-01-01'), new Date('2024-11-01')),
                completionDate: status === 'COMPLETED' ? randomDate(new Date('2024-03-01'), new Date('2024-12-20')) : null,
                status
            });
            enrollmentCount++;
        }
    }
    console.log(`   Created ${enrollmentCount} training enrollments`);

    // --- CREATE PERFORMANCE REVIEWS ---
    console.log('⭐ Creating performance reviews...');
    let reviewCount = 0;
    for (const emp of createdEmployees.slice(0, 100)) {
        const numReviews = randomInt(1, 2);
        const potentialReviewers = createdEmployees.filter(e =>
            e.companyId === emp.companyId && e.id !== emp.id
        );
        if (potentialReviewers.length === 0) continue;

        for (let i = 0; i < numReviews; i++) {
            await db.insert(schema.performanceReview).values({
                employeeId: emp.id,
                reviewerId: randomItem(potentialReviewers).id,
                reviewDate: randomDate(new Date('2023-01-01'), new Date('2024-12-01')),
                rating: randomInt(1, 5),
                comments: randomItem([
                    'Excellent performance this quarter. Keep up the great work!',
                    'Solid contributor to the team. Shows initiative.',
                    'Good progress on goals. Recommend focusing on communication skills.',
                    'Consistently meets expectations. Ready for more responsibility.',
                    'Outstanding leadership qualities. Potential for promotion.',
                    null
                ])
            });
            reviewCount++;
        }
    }
    console.log(`   Created ${reviewCount} performance reviews`);

    // --- CREATE EMPLOYEE CONTRACTS ---
    console.log('📄 Creating employee contracts...');
    let contractCount = 0;
    const contractTypes: ('FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN')[] = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'];
    for (const emp of createdEmployees) {
        await db.insert(schema.employeeContract).values({
            employeeId: emp.id,
            startDate: emp.hireDate,
            endDate: Math.random() > 0.8 ? randomDate(new Date('2025-01-01'), new Date('2026-12-31')) : null,
            contractType: randomItem(contractTypes),
            baseSalary: emp.salary,
            signedDate: emp.hireDate
        });
        contractCount++;
    }
    console.log(`   Created ${contractCount} employee contracts`);

    // --- SUMMARY ---
    console.log('\n✨ Seeding complete! Summary:');
    console.log(`   • ${createdCompanies.length} companies`);
    console.log(`   • ${createdDepartments.length} departments`);
    console.log(`   • ${createdSkills.length} skills`);
    console.log(`   • ${createdEmployees.length} employees`);
    console.log(`   • ${createdJobs.length} job postings`);
    console.log(`   • ${createdCandidates.length} candidates`);
    console.log(`   • ${createdApplications.length} applications`);
    console.log(`   • ${createdPrograms.length} training programs`);
    console.log(`   • ${reviewCount} performance reviews`);
}

seed()
    .then(() => {
        console.log('\n🎉 Done!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    })
    .finally(() => {
        client.end();
    });
