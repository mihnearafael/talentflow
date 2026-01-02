'use server'

import { db } from '@/db'
import { testAssessments, testResults, applications } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// --- Test Assignment ---
export async function assignTest(data: {
    applicationId: string;
    testType: string;
    durationMinutes?: number;
}) {
    const [test] = await db.insert(testAssessments).values({
        applicationId: data.applicationId,
        testType: data.testType,
        durationMinutes: data.durationMinutes,
    }).returning();

    revalidatePath('/assessments');
    return test;
}

export async function getTestsForApplication(applicationId: string) {
    return await db.select({
        test: testAssessments,
        result: testResults,
    })
        .from(testAssessments)
        .leftJoin(testResults, eq(testAssessments.id, testResults.testId))
        .where(eq(testAssessments.applicationId, applicationId))
        .orderBy(desc(testAssessments.assignedDate));
}

export async function getAllAssessments() {
    return await db.select()
        .from(testAssessments)
        .leftJoin(applications, eq(testAssessments.applicationId, applications.id))
        .orderBy(desc(testAssessments.assignedDate));
}

// --- Test Results ---
export async function submitTestResult(data: {
    testId: string;
    score: number;
    passed: boolean;
    feedback?: string;
}) {
    const [result] = await db.insert(testResults).values({
        testId: data.testId,
        score: data.score,
        passed: data.passed,
        feedback: data.feedback,
        submissionDate: new Date().toISOString().split('T')[0],
    }).returning();

    revalidatePath('/assessments');
    return result;
}

export async function getTestResultById(resultId: string) {
    const [result] = await db.select()
        .from(testResults)
        .leftJoin(testAssessments, eq(testResults.testId, testAssessments.id))
        .where(eq(testResults.id, resultId));

    return result;
}
