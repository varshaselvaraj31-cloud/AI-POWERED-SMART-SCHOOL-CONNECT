import mongoose from 'mongoose';
import env from '../config/env.js';
import { User } from '../models/index.js';

/**
 * Seed the Master Admin (School Owner) account into MongoDB Atlas.
 */
export const seedAdmin = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB Atlas...');
    await mongoose.connect(env.MONGO_URI);
    console.log('[Seed] Connected to Atlas database:', mongoose.connection.name);

    const adminId = 'ADMIN2026';
    const adminEmail = 'admin@smartschool.edu';
    const adminPassword = 'Admin@2026';

    const existingAdmin = await User.findOne({
      $or: [{ idNumber: adminId }, { email: adminEmail }],
    });

    if (existingAdmin) {
      console.log(`[Seed] Master Admin account already exists: ID: ${existingAdmin.idNumber}, Email: ${existingAdmin.email}`);
      console.log(`[Seed] Password remains active.`);
    } else {
      const admin = await User.create({
        name: 'School Principal (Master Admin)',
        idNumber: adminId,
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        phone: '+1 555-0100',
        isActive: true,
      });
      console.log(`[Seed] ✅ Master Admin Owner account created successfully!`);
      console.log(`[Seed] ID Number: ${admin.idNumber}`);
      console.log(`[Seed] Email: ${admin.email}`);
      console.log(`[Seed] Role: ${admin.role}`);
    }

    await mongoose.disconnect();
    console.log('[Seed] Disconnected from DB.');
    return true;
  } catch (error) {
    console.error('[Seed Error]:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    return false;
  }
};

// Auto-run if executed directly
if (process.argv[1]?.endsWith('seedAdmin.js')) {
  seedAdmin().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

export default seedAdmin;
