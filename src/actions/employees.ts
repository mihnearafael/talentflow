'use server'

import { db } from '@/db'
import { employees, employeeContracts, promotionRecords, performanceReviews, departments, companies } from '@/db/schema'
import { eq, desc, or, ilike } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// --- READ ---
export async function getEmployees(query?: string) {
    let queryBuilder = db.select({
        id: employees.id,
        firstName: employees.firstName,
        lastName: employees.lastName,
        email: employees.email,
        phone: employees.phone,
        jobTitle: employees.jobTitle,
        salary: employees.salary,
        hireDate: employees.hireDate,
        departmentId: employees.departmentId,
        department: departments.name,
        companyId: employees.companyId,
        company: companies.name,
    })
        .from(employees)
        .leftJoin(departments, eq(employees.departmentId, departments.id))
        .leftJoin(companies, eq(employees.companyId, companies.id))
        .$dynamic();

    if (query) {
        const pattern = `%${query}%`;
        queryBuilder = queryBuilder.where(
            or(
                ilike(employees.firstName, pattern),
                ilike(employees.lastName, pattern),
                ilike(employees.email, pattern),
                ilike(employees.jobTitle, pattern)
            )
        );
    }

    return await queryBuilder.orderBy(employees.lastName);
}

export async function getEmployeeById(employeeId: string) {
    const [employee] = await db.select({
        id: employees.id,
        firstName: employees.firstName,
        lastName: employees.lastName,
        email: employees.email,
        phone: employees.phone,
        jobTitle: employees.jobTitle,
        salary: employees.salary,
        hireDate: employees.hireDate,
        departmentId: employees.departmentId,
        department: departments.name,
        companyId: employees.companyId,
        company: companies.name,
    })
        .from(employees)
        .leftJoin(departments, eq(employees.departmentId, departments.id))
        .leftJoin(companies, eq(employees.companyId, companies.id))
        .where(eq(employees.id, employeeId));

    return employee;
}

export async function getEmployeeCount() {
    const result = await db.select().from(employees);
    return result.length;
}

// --- WRITE ---
export async function createEmployee(data: {
    companyId: string;
    departmentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    hireDate: string;
    jobTitle: string;
    salary: string;
    managerId?: string;
}) {
    const [employee] = await db.insert(employees).values(data).returning();
    revalidatePath('/employees');
    revalidatePath('/dashboard');
    return employee;
}

export async function updateEmployee(employeeId: string, data: Partial<typeof employees.$inferInsert>) {
    await db.update(employees)
        .set(data)
        .where(eq(employees.id, employeeId));

    revalidatePath('/employees');
    revalidatePath(`/employees/${employeeId}`);
}

// --- Promotions ---
export async function getPromotionHistory(employeeId: string) {
    return await db.select()
        .from(promotionRecords)
        .where(eq(promotionRecords.employeeId, employeeId))
        .orderBy(desc(promotionRecords.promotionDate));
}

export async function promoteEmployee(employeeId: string, data: {
    oldTitle: string;
    newTitle: string;
    oldSalary: string;
    newSalary: string;
}) {
    // 1. Record Promotion history
    await db.insert(promotionRecords).values({
        employeeId,
        oldTitle: data.oldTitle,
        newTitle: data.newTitle,
        oldSalary: data.oldSalary,
        newSalary: data.newSalary,
    });

    // 2. Update Employee record
    await db.update(employees)
        .set({ jobTitle: data.newTitle, salary: data.newSalary })
        .where(eq(employees.id, employeeId));

    revalidatePath('/employees');
    revalidatePath(`/employees/${employeeId}`);
}

// --- Performance Reviews ---
export async function getReviewsForEmployee(employeeId: string) {
    return await db.select({
        review: performanceReviews,
        reviewer: {
            firstName: employees.firstName,
            lastName: employees.lastName,
        }
    })
        .from(performanceReviews)
        .leftJoin(employees, eq(performanceReviews.reviewerId, employees.id))
        .where(eq(performanceReviews.employeeId, employeeId))
        .orderBy(desc(performanceReviews.reviewDate));
}

export async function addPerformanceReview(employeeId: string, data: {
    reviewerId: string;
    rating: number;
    comments?: string;
}) {
    await db.insert(performanceReviews).values({
        employeeId,
        reviewerId: data.reviewerId,
        rating: data.rating,
        comments: data.comments,
    });
    revalidatePath(`/employees/${employeeId}`);
    revalidatePath('/reviews');
}
