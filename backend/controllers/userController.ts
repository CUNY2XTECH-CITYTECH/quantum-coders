import { Request, Response } from 'express';
import { database } from '../src/drizzle/db';
import { usersTable } from '../models/User';
import { eq } from 'drizzle-orm';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

// Multer middleware to handle file uploads
export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME!,
    acl: 'public-read', // Allows public access
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `profiles/${Date.now()}_${file.originalname}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ✅ Upload Profile Image & Update DB
export const uploadProfileImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = req.file as Express.MulterS3.File;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = file.location; // S3 URL

  try {
    await database.update(usersTable)
      .set({ profileImageUrl: imageUrl })
      .where(eq(usersTable.id, Number(id)));

    res.json({ message: 'Profile image uploaded successfully', imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload profile image' });
  }
};
