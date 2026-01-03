import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Create connection with env loaded
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function clear() {
    console.log('🗑️  Clearing all data from database...\n');

    // Delete in reverse dependency order
    await db.delete(schema.testResult);
    console.log('   ✓ test_result');

    await db.delete(schema.testAssessment);
    console.log('   ✓ test_assessment');

    await db.delete(schema.interview);
    console.log('   ✓ interview');

    await db.delete(schema.trainingEnrollment);
    console.log('   ✓ training_enrollment');

    await db.delete(schema.performanceReview);
    console.log('   ✓ performance_review');

    await db.delete(schema.promotionRecord);
    console.log('   ✓ promotion_record');

    await db.delete(schema.employeeContract);
    console.log('   ✓ employee_contract');

    await db.delete(schema.offer);
    console.log('   ✓ offer');

    await db.delete(schema.application);
    console.log('   ✓ application');

    await db.delete(schema.candidateSkill);
    console.log('   ✓ candidate_skill');

    await db.delete(schema.candidate);
    console.log('   ✓ candidate');

    await db.delete(schema.jobSkill);
    console.log('   ✓ job_skill');

    await db.delete(schema.jobPosting);
    console.log('   ✓ job_posting');

    await db.delete(schema.employee);
    console.log('   ✓ employee');

    await db.delete(schema.trainingProgram);
    console.log('   ✓ training_program');

    await db.delete(schema.interviewer);
    console.log('   ✓ interviewer');

    await db.delete(schema.recruiter);
    console.log('   ✓ recruiter');

    await db.delete(schema.skill);
    console.log('   ✓ skill');

    await db.delete(schema.department);
    console.log('   ✓ department');

    await db.delete(schema.company);
    console.log('   ✓ company');

    console.log('\n✨ All tables cleared!');
}

clear()
    .then(() => {
        console.log('\n🎉 Done!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Clear failed:', err);
        process.exit(1);
    })
    .finally(() => {
        client.end();
    });
