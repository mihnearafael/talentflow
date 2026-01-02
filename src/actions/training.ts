'use server'

import { db } from '@/db'
import { trainingPrograms, trainingEnrollments, employees, departments } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// --- Training Programs ---
export async function getTrainingPrograms() {
    return await db.select({
        id: trainingPrograms.id,
        programName: trainingPrograms.programName,
        description: trainingPrograms.description,
        difficultyLevel: trainingPrograms.difficultyLevel,
        durationHours: trainingPrograms.durationHours,
        department: departments.name,
        departmentId: trainingPrograms.departmentId,
    })
        .from(trainingPrograms)
        .leftJoin(departments, eq(trainingPrograms.departmentId, departments.id));
}

export async function getTrainingProgramById(trainingId: string) {
    const [program] = await db.select({
        id: trainingPrograms.id,
        programName: trainingPrograms.programName,
        description: trainingPrograms.description,
        difficultyLevel: trainingPrograms.difficultyLevel,
        durationHours: trainingPrograms.durationHours,
        department: departments.name,
    })
        .from(trainingPrograms)
        .leftJoin(departments, eq(trainingPrograms.departmentId, departments.id))
        .where(eq(trainingPrograms.id, trainingId));

    return program;
}

export async function createTrainingProgram(data: {
    departmentId?: string;
    programName: string;
    description?: string;
    difficultyLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    durationHours?: number;
}) {
    const [program] = await db.insert(trainingPrograms).values(data).returning();
    revalidatePath('/training');
    return program;
}

// --- Enrollments ---
export async function getEnrollmentsForProgram(trainingId: string) {
    return await db.select({
        enrollment: trainingEnrollments,
        employee: {
            id: employees.id,
            firstName: employees.firstName,
            lastName: employees.lastName,
            email: employees.email,
        }
    })
        .from(trainingEnrollments)
        .leftJoin(employees, eq(trainingEnrollments.employeeId, employees.id))
        .where(eq(trainingEnrollments.trainingId, trainingId))
        .orderBy(desc(trainingEnrollments.enrollmentDate));
}

export async function getEnrollmentsForEmployee(employeeId: string) {
    return await db.select({
        enrollment: trainingEnrollments,
        program: trainingPrograms,
    })
        .from(trainingEnrollments)
        .leftJoin(trainingPrograms, eq(trainingEnrollments.trainingId, trainingPrograms.id))
        .where(eq(trainingEnrollments.employeeId, employeeId))
        .orderBy(desc(trainingEnrollments.enrollmentDate));
}

export async function getAllEnrollments() {
    return await db.select({
        enrollment: trainingEnrollments,
        employee: {
            id: employees.id,
            firstName: employees.firstName,
            lastName: employees.lastName,
        },
        program: trainingPrograms,
    })
        .from(trainingEnrollments)
        .leftJoin(employees, eq(trainingEnrollments.employeeId, employees.id))
        .leftJoin(trainingPrograms, eq(trainingEnrollments.trainingId, trainingPrograms.id))
        .orderBy(desc(trainingEnrollments.enrollmentDate));
}

export async function enrollEmployee(employeeId: string, trainingId: string) {
    // Check if already enrolled
    const [existing] = await db.select()
        .from(trainingEnrollments)
        .where(and(
            eq(trainingEnrollments.employeeId, employeeId),
            eq(trainingEnrollments.trainingId, trainingId)
        ));

    if (existing) {
        throw new Error('Employee is already enrolled in this program.');
    }

    const [enrollment] = await db.insert(trainingEnrollments).values({
        employeeId,
        trainingId,
        status: 'ENROLLED',
    }).returning();

    revalidatePath('/training');
    return enrollment;
}

export async function updateEnrollmentStatus(
    enrollmentId: string,
    status: 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED'
) {
    const updates: any = { status };
    if (status === 'COMPLETED') {
        updates.completionDate = new Date().toISOString().split('T')[0];
    }

    await db.update(trainingEnrollments)
        .set(updates)
        .where(eq(trainingEnrollments.id, enrollmentId));

    revalidatePath('/training');
}

export async function completeTraining(enrollmentId: string) {
    await updateEnrollmentStatus(enrollmentId, 'COMPLETED');
}
