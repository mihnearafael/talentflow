'use server'

import { db } from '@/db'
import { jobPostings, skills, jobSkills, departments, companies } from '@/db/schema'
import { eq, desc, and, ilike, or } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// --- READ ---
export async function getJobs(search?: string) {
    let queryBuilder = db.select({
        id: jobPostings.id,
        title: jobPostings.jobTitle,
        description: jobPostings.description,
        department: departments.name,
        departmentId: jobPostings.departmentId,
        company: companies.name,
        location: companies.location,
        type: jobPostings.employmentType,
        salaryMin: jobPostings.salaryRangeMinimum,
        salaryMax: jobPostings.salaryRangeMaximum,
        posted: jobPostings.postedDate,
        closing: jobPostings.closingDate,
        status: jobPostings.status,
    })
        .from(jobPostings)
        .leftJoin(departments, eq(jobPostings.departmentId, departments.id))
        .leftJoin(companies, eq(departments.companyId, companies.id))
        .$dynamic();

    const conditions = [eq(jobPostings.status, 'OPEN')];

    if (search) {
        const pattern = `%${search}%`;
        conditions.push(
            or(
                ilike(jobPostings.jobTitle, pattern),
            )!
        );
    }

    return await queryBuilder.where(and(...conditions)).orderBy(desc(jobPostings.postedDate));
}

export async function getJobById(jobId: string) {
    const [job] = await db.select({
        id: jobPostings.id,
        title: jobPostings.jobTitle,
        description: jobPostings.description,
        department: departments.name,
        departmentId: jobPostings.departmentId,
        company: companies.name,
        companyId: companies.id,
        location: companies.location,
        type: jobPostings.employmentType,
        salaryMin: jobPostings.salaryRangeMinimum,
        salaryMax: jobPostings.salaryRangeMaximum,
        posted: jobPostings.postedDate,
        closing: jobPostings.closingDate,
        status: jobPostings.status,
    })
        .from(jobPostings)
        .leftJoin(departments, eq(jobPostings.departmentId, departments.id))
        .leftJoin(companies, eq(departments.companyId, companies.id))
        .where(eq(jobPostings.id, jobId));

    return job;
}

export async function getJobSkills(jobId: string) {
    return await db.select({
        skillId: skills.id,
        skillName: skills.skillName,
        category: skills.category,
        requiredLevel: jobSkills.requiredLevel,
    })
        .from(jobSkills)
        .leftJoin(skills, eq(jobSkills.skillId, skills.id))
        .where(eq(jobSkills.jobId, jobId));
}

// --- WRITE ---
export async function createJob(data: {
    departmentId: string;
    jobTitle: string;
    description: string;
    employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
    salaryRangeMinimum?: string;
    salaryRangeMaximum?: string;
    closingDate?: string;
}) {
    const [newJob] = await db.insert(jobPostings).values({
        departmentId: data.departmentId,
        jobTitle: data.jobTitle,
        description: data.description,
        employmentType: data.employmentType,
        salaryRangeMinimum: data.salaryRangeMinimum,
        salaryRangeMaximum: data.salaryRangeMaximum,
        closingDate: data.closingDate,
    }).returning();

    revalidatePath('/jobs');
    revalidatePath('/dashboard');
    return newJob;
}

export async function updateJob(jobId: string, data: Partial<typeof jobPostings.$inferInsert>) {
    await db.update(jobPostings)
        .set(data)
        .where(eq(jobPostings.id, jobId));

    revalidatePath('/jobs');
    revalidatePath(`/jobs/${jobId}`);
}

export async function closeJob(jobId: string) {
    await db.update(jobPostings)
        .set({ status: 'CLOSED' })
        .where(eq(jobPostings.id, jobId));

    revalidatePath('/jobs');
    revalidatePath('/dashboard');
}

export async function addSkillToJob(jobId: string, skillId: string, requiredLevel: number) {
    await db.insert(jobSkills).values({
        jobId,
        skillId,
        requiredLevel,
    });
    revalidatePath(`/jobs/${jobId}`);
}

// --- Skills Catalog ---
export async function getSkills() {
    return await db.select().from(skills);
}

export async function createSkill(data: { skillName: string; category?: string }) {
    const [skill] = await db.insert(skills).values(data).returning();
    return skill;
}
