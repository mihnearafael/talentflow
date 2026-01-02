'use server'

import { db } from '@/db'
import { interviews, interviewers, applications, candidates } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// --- Interviewer Management ---
export async function getInterviewers() {
    return await db.select().from(interviewers);
}

export async function createInterviewer(data: {
    companyId?: string;
    departmentId?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    jobTitle?: string;
}) {
    const [interviewer] = await db.insert(interviewers).values(data).returning();
    return interviewer;
}

// --- Interview Management ---
export async function scheduleInterview(data: {
    applicationId: string;
    interviewerId: string;
    interviewDate: Date;
    interviewType: 'PHONE' | 'VIDEO' | 'ONSITE';
}) {
    const [interview] = await db.insert(interviews).values({
        applicationId: data.applicationId,
        interviewerId: data.interviewerId,
        interviewDate: data.interviewDate,
        interviewType: data.interviewType,
    }).returning();

    // Update application status
    await db.update(applications)
        .set({ status: 'INTERVIEW' })
        .where(eq(applications.id, data.applicationId));

    revalidatePath('/applications');
    revalidatePath('/interviews');
    return interview;
}

export async function getInterviewsForApplication(applicationId: string) {
    return await db.select({
        interview: interviews,
        interviewer: interviewers,
    })
        .from(interviews)
        .leftJoin(interviewers, eq(interviews.interviewerId, interviewers.id))
        .where(eq(interviews.applicationId, applicationId))
        .orderBy(desc(interviews.interviewDate));
}

export async function getAllInterviews() {
    return await db.select({
        interview: interviews,
        interviewer: interviewers,
        application: applications,
        candidate: candidates,
    })
        .from(interviews)
        .leftJoin(interviewers, eq(interviews.interviewerId, interviewers.id))
        .leftJoin(applications, eq(interviews.applicationId, applications.id))
        .leftJoin(candidates, eq(applications.candidateId, candidates.id))
        .orderBy(desc(interviews.interviewDate));
}

export async function submitInterviewFeedback(
    interviewId: string,
    feedback: string,
    score: number
) {
    await db.update(interviews)
        .set({ feedback, score })
        .where(eq(interviews.id, interviewId));

    revalidatePath('/interviews');
}
