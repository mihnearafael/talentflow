'use server'

import { db } from '@/db'
import { candidates, applications, jobPostings } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// --- Candidate Management ---
export async function createCandidate(data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    resumeUrl?: string;
    yearsExperience?: number;
    educationLevel?: string;
}) {
    // Check if candidate already exists
    const [existing] = await db.select().from(candidates).where(eq(candidates.email, data.email));
    if (existing) return existing;

    const [candidate] = await db.insert(candidates).values(data).returning();
    return candidate;
}

export async function getCandidateByEmail(email: string) {
    const [candidate] = await db.select().from(candidates).where(eq(candidates.email, email));
    return candidate;
}

// --- Application Management ---
export async function applyForJob(jobId: string, candidateData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    resumeUrl?: string;
    coverLetterUrl?: string;
}) {
    // 1. Create or Find Candidate
    const candidate = await createCandidate({
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        email: candidateData.email,
        phoneNumber: candidateData.phoneNumber,
        resumeUrl: candidateData.resumeUrl,
    });

    // 2. Check for existing application
    const [existingApplication] = await db.select()
        .from(applications)
        .where(and(
            eq(applications.jobId, jobId),
            eq(applications.candidateId, candidate.id)
        ));

    if (existingApplication) {
        throw new Error('You have already applied for this position.');
    }

    // 3. Create Application
    const [application] = await db.insert(applications).values({
        jobId,
        candidateId: candidate.id,
        status: 'APPLIED',
        coverLetterUrl: candidateData.coverLetterUrl,
    }).returning();

    revalidatePath(`/jobs/${jobId}`);
    return application;
}

export async function getApplicationById(applicationId: string) {
    const [application] = await db.select()
        .from(applications)
        .leftJoin(candidates, eq(applications.candidateId, candidates.id))
        .leftJoin(jobPostings, eq(applications.jobId, jobPostings.id))
        .where(eq(applications.id, applicationId));

    return application;
}

export async function getApplicationsForJob(jobId: string) {
    return await db.select({
        application: applications,
        candidate: candidates,
    })
        .from(applications)
        .leftJoin(candidates, eq(applications.candidateId, candidates.id))
        .where(eq(applications.jobId, jobId))
        .orderBy(desc(applications.applicationDate));
}

export async function getAllApplications() {
    return await db.select({
        application: applications,
        candidate: candidates,
        job: jobPostings,
    })
        .from(applications)
        .leftJoin(candidates, eq(applications.candidateId, candidates.id))
        .leftJoin(jobPostings, eq(applications.jobId, jobPostings.id))
        .orderBy(desc(applications.applicationDate));
}

export async function updateApplicationStatus(
    applicationId: string,
    status: 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED'
) {
    await db.update(applications)
        .set({ status })
        .where(eq(applications.id, applicationId));

    revalidatePath('/applications');
    revalidatePath('/dashboard');
}
