'use server'

import { db } from '@/db'
import { employeeContracts, employees } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

// --- READ ---
export async function getContractsForEmployee(employeeId: string) {
    return await db.select()
        .from(employeeContracts)
        .where(eq(employeeContracts.employeeId, employeeId))
        .orderBy(desc(employeeContracts.startDate));
}

export async function getActiveContract(employeeId: string) {
    const contracts = await db.select()
        .from(employeeContracts)
        .where(eq(employeeContracts.employeeId, employeeId))
        .orderBy(desc(employeeContracts.startDate));

    // Return the most recent contract (assumed active if no end date or end date in future)
    return contracts[0] || null;
}

// --- WRITE ---
export async function createContract(data: {
    employeeId: string;
    startDate: string;
    endDate?: string;
    contractType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
    baseSalary: string;
    signedDate?: string;
}) {
    const [contract] = await db.insert(employeeContracts).values(data).returning();
    revalidatePath(`/employees/${data.employeeId}`);
    return contract;
}

export async function updateContract(contractId: string, data: Partial<typeof employeeContracts.$inferInsert>) {
    await db.update(employeeContracts)
        .set(data)
        .where(eq(employeeContracts.id, contractId));

    revalidatePath('/employees');
}

export async function terminateContract(contractId: string, endDate: string) {
    await db.update(employeeContracts)
        .set({ endDate })
        .where(eq(employeeContracts.id, contractId));

    revalidatePath('/employees');
}
