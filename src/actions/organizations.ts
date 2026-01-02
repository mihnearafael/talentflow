'use server'

import { db } from '@/db'
import { companies, departments, employees } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// --- Companies ---
export async function getCompanies() {
    return await db.select().from(companies).orderBy(companies.name);
}

export async function getCompanyById(companyId: string) {
    const [company] = await db.select()
        .from(companies)
        .where(eq(companies.id, companyId));

    return company;
}

export async function createCompany(data: {
    name: string;
    industry?: string;
    location?: string;
    website?: string;
    description?: string;
}) {
    const [company] = await db.insert(companies).values(data).returning();
    revalidatePath('/settings');
    revalidatePath('/dashboard');
    return company;
}

export async function updateCompany(companyId: string, data: Partial<typeof companies.$inferInsert>) {
    await db.update(companies)
        .set(data)
        .where(eq(companies.id, companyId));

    revalidatePath('/settings');
}

// --- Departments ---
export async function getDepartments() {
    return await db.select({
        id: departments.id,
        name: departments.name,
        floorLocation: departments.floorLocation,
        companyId: departments.companyId,
        company: companies.name,
        managerId: departments.managerId,
    })
        .from(departments)
        .leftJoin(companies, eq(departments.companyId, companies.id))
        .orderBy(departments.name);
}

export async function getDepartmentsByCompany(companyId: string) {
    return await db.select()
        .from(departments)
        .where(eq(departments.companyId, companyId))
        .orderBy(departments.name);
}

export async function getDepartmentById(departmentId: string) {
    const [department] = await db.select({
        id: departments.id,
        name: departments.name,
        floorLocation: departments.floorLocation,
        companyId: departments.companyId,
        company: companies.name,
        managerId: departments.managerId,
    })
        .from(departments)
        .leftJoin(companies, eq(departments.companyId, companies.id))
        .where(eq(departments.id, departmentId));

    return department;
}

export async function createDepartment(data: {
    companyId: string;
    name: string;
    managerId?: string;
    floorLocation?: string;
}) {
    const [department] = await db.insert(departments).values(data).returning();
    revalidatePath('/settings');
    revalidatePath('/dashboard');
    return department;
}

export async function updateDepartment(departmentId: string, data: Partial<typeof departments.$inferInsert>) {
    await db.update(departments)
        .set(data)
        .where(eq(departments.id, departmentId));

    revalidatePath('/settings');
}

// --- Dashboard Stats ---
export async function getDashboardStats() {
    const allCompanies = await db.select().from(companies);
    const allDepartments = await db.select().from(departments);
    const allEmployees = await db.select().from(employees);

    return {
        companiesCount: allCompanies.length,
        departmentsCount: allDepartments.length,
        employeesCount: allEmployees.length,
    };
}
