'use server'

import { db } from '@/db'
import { performanceReviews, employees } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// --- READ ---
export async function getAllReviews() {
    return await db.select({
        review: performanceReviews,
        employee: {
            id: employees.id,
            firstName: employees.firstName,
            lastName: employees.lastName,
            jobTitle: employees.jobTitle,
        },
    })
        .from(performanceReviews)
        .leftJoin(employees, eq(performanceReviews.employeeId, employees.id))
        .orderBy(desc(performanceReviews.reviewDate));
}

export async function getReviewById(reviewId: string) {
    const [review] = await db.select({
        review: performanceReviews,
        employee: {
            id: employees.id,
            firstName: employees.firstName,
            lastName: employees.lastName,
        },
    })
        .from(performanceReviews)
        .leftJoin(employees, eq(performanceReviews.employeeId, employees.id))
        .where(eq(performanceReviews.id, reviewId));

    return review;
}

export async function getReviewsForEmployee(employeeId: string) {
    return await db.select()
        .from(performanceReviews)
        .where(eq(performanceReviews.employeeId, employeeId))
        .orderBy(desc(performanceReviews.reviewDate));
}

// --- WRITE ---
export async function createReview(data: {
    employeeId: string;
    reviewerId: string;
    rating: number;
    comments?: string;
}) {
    const [review] = await db.insert(performanceReviews).values(data).returning();
    revalidatePath('/reviews');
    revalidatePath(`/employees/${data.employeeId}`);
    return review;
}

export async function updateReview(reviewId: string, data: {
    rating?: number;
    comments?: string;
}) {
    await db.update(performanceReviews)
        .set(data)
        .where(eq(performanceReviews.id, reviewId));

    revalidatePath('/reviews');
}

export async function deleteReview(reviewId: string) {
    await db.delete(performanceReviews)
        .where(eq(performanceReviews.id, reviewId));

    revalidatePath('/reviews');
}
