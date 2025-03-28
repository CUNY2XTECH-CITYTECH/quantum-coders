import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { middleware, errorHandler} from "supertokens-node/framework/express";
import dotenv from "dotenv";

import { verifySession } from "supertokens-node/recipe/session/framework/express";

// Import Drizzle ORM connection and schema
import { db } from "./src/drizzle/db.js"; // ensure your db file is correctly referenced
import * as schema from "./src/drizzle/schema.js";

// Import user metadata
import UserMetadata from "supertokens-node/recipe/usermetadata";
import userRoutes from "./routes/userRoutes.js"; // ✅ adjust path/extension as needed

/*
// Check for API key
if (!process.env.SUPERTOKENS_API_KEY) {
  console.warn("⚠️ Warning: SUPER TOKENS API KEY is missing. Make sure to set it in your .env file!");
}
  */
//GET IMAGE FROM THE BUCKET Tigris -----------------------------------
//import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
//---------------------------------------------------------------------

dotenv.config();

//GET IMAGE FROM THE BUCKET Tigris -----------------------------------

const s3Client = new S3Client({
  region: "auto",//alway auto
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});
/*
const s3Client = new S3Client({
  region: "auto",//alway auto
  endpoint: "https://fly.storage.tigris.dev",
  s3ForcePathStyle: false,
});
*/
//add the .env
const getFilesFromStorage = async () => {
  const data = await s3Client.send(new ListObjectsV2Command({
    Bucket: process.env.BUCKET_NAME,
  }));

  return data.Contents.map(file => ({
    Key: file.Key,
    Url: `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.BUCKET_NAME}/${file.Key}`,
    LastModified: file.LastModified,
  }));
};

//---------------------------------------------------------------------
// Initialize SuperTokens
supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "https://try.supertokens.io",
    apiKey: process.env.SUPERTOKENS_API_KEY,
  },
  appInfo: {
    appName: "Quantum Coders",
    apiDomain: "http://localhost:3001",
    websiteDomain: "http://localhost:5173",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init({
      signUpFeature: {
        formFields: [
          { id: "email", label: "Email", placeholder: "Enter your email" },
          { id: "password", label: "Password", placeholder: "Enter your password" },
          { id: "username", label: "Username", placeholder: "Enter your username" },
          { id: "fullName", label: "Full Name", placeholder: "Enter your full name" },
        ],
      },
      override: {
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            signUpPOST: async function (input) {
              if (originalImplementation.signUpPOST === undefined) {
                throw Error("Should never come here");
              }

              // First, call the original implementation of signUpPOST
              let response = await originalImplementation.signUpPOST(input);

              if (response.status === "OK") {
                let { id, email } = response.user;
                let formFields = input.formFields || [];

                console.log("🔍 Received formFields:", formFields);
                console.log("🆔 User ID:", id);
                console.log("📧 User Email:", email);

                // Extract additional user metadata
                let usernameField = formFields.find(field => field.id === "username");
                let fullNameField = formFields.find(field => field.id === "fullName");
                let passwordField = formFields.find(field => field.id === "password");

                let username = usernameField ? usernameField.value : null;
                let fullName = fullNameField ? fullNameField.value : null;
                let password = passwordField ? passwordField.value : null;

                console.log("👤 Username:", username);
                console.log("📝 Full Name:", fullName);
                console.log("🔑 Password (hashed by SuperTokens):", password);

                // ✅ Store additional user metadata
                await UserMetadata.updateUserMetadata(id, { username, fullName, email });

                console.log("✅ Metadata stored successfully:", { id, email, username, fullName });
              }

              return response;
            },
          };
        },
      },
    }),
    ThirdParty.init(),
    Session.init(),
    UserMetadata.init(),
  ],
});

const app = express();
app.use(express.json({ limit: '50mb' })); // ✅ Parses incoming JSON requests
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(middleware()); // SuperTokens middleware

app.use("/api", userRoutes);


// Health check endpoint end-point [Rudgino's code]
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

//log in user end-point[Asmar's code]
app.post("/auth/signup", async (req, res) => {
  try {
    let { email, password } = req.body;

    let response = await EmailPassword.signUp(email, password);

    if (response.status === "OK") {
      return res.json({
        status: "success",
        message: "Account created successfully!",
        user: response.user
      });
    } else if (response.status === "EMAIL_ALREADY_EXISTS_ERROR") {
      return res.status(400).json({
        status: "error",
        message: "Email is already registered. Try logging in."
      });
    }
  } catch (error) {
    console.error("Sign-Up Error:", error);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later."
    });
  }
});


// Fetch user info [Yuzhen's code]
app.get("/user/userinfo", verifySession(), async (req, res) => {
  try {
    const userId = req.session.getUserId();
    const { metadata } = await UserMetadata.getUserMetadata(userId);

    console.log("✅ User Metadata Retrieved:", metadata); // Debugging log

    res.json({
      userId: userId,
      fullName: metadata.fullName || "Unknown User",
      username: metadata.username || "unknown",
      email: metadata.email || "No email found",  // ✅ Now fetching email
    });

  } catch (error) {
    console.error("🚨 Error retrieving user metadata:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Edit profile
app.post("/api/edit_profile", verifySession(), async (req, res) => {
  
  const userId = req.session.getUserId();
  const { fullName, username, description, pfp } = req.body;

  if (!fullName || !username) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    await UserMetadata.updateUserMetadata(userId, { fullName, username, description, pfp });
    console.log(`✅ Metadata updated for user ${userId}`);
    res.json({ success: true });
  } catch (error) {
    console.error("🚨 Failed to update metadata:", error);
    res.status(500).json({ success: false, message: "Failed to update metadata" });
  }
});
//--------------------------------------------------------------

// ✅ Fetch files from Tigris bucket with signed URLs
app.get("/api/files", verifySession(), async (req, res) => {
  const command = new ListObjectsV2Command({ Bucket: process.env.BUCKET_NAME });
  let isTruncated = true;
  let contents = [];

  while (isTruncated) {
    const { Contents, IsTruncated, NextContinuationToken } = await s3Client.send(command);
    contents = contents.concat(Contents || []);
    isTruncated = IsTruncated;
    command.input.ContinuationToken = NextContinuationToken;
  }

  const files = await Promise.all(contents.map(async (content) => {
    const url = await getSignedUrl(s3Client, new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: content.Key
    }), { expiresIn: 3600 });
    return {
      Key: content.Key,
      LastModified: content.LastModified,
      Url: url
    };
  }));

  res.json(files);
});
//---------------------------------------------------------------------  


// ✅ Profile Image Upload Route - Tigris AWS S3
app.post("/api/upload_files", verifySession(), async (req, res) => {
  const { data, name } = req.body;
  const base64Data = data.split(",")[1];
  const buf = Buffer.from(base64Data, 'base64');

  //need convertion for jpng files
  const upload = new Upload({
    params: {
      Bucket: process.env.BUCKET_NAME,
      Key:`${req.session.getUserId()}.png`,//maintain the key id
      Body: buf,
      ContentType: "image/png",
    },
    client: s3Client,
    queueSize: 1,
  });
  upload.on("httpUploadProgress", (progress) => console.log(progress));
  await upload.done();
  return res.json({ message: "File uploaded successfully" });
});
//CHANGE THE BUCKET TIME DELIEVE, how long take the time to catchthe image
//---------------------------------------------------------------------
app.post("/api/delete_file", verifySession(), async (req, res) => {
  const { name } = req.body;
  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: name
  });
  await s3Client.send(command);
  res.json({ message: "File deleted successfully" });
});
//---------------------------------------------------------------------

//profile
// ✅ Get user profile including profile image
app.get("/api/user_profile", verifySession(), async (req, res) => {
  try {
    const userId = req.session.getUserId();
    const { metadata } = await UserMetadata.getUserMetadata(userId);
    const imageKey = `${userId}.png`;
    console.log("🔍 User ID:", userId);

    // Try to generate signed URL for the image
    let imageUrl;
    try {
      imageUrl = `https://${process.env.BUCKET_NAME}.fly.storage.tigris.dev/${imageKey}`
    } catch (err) {
      console.warn(`⚠️ No profile image found for ${userId}:`, err.message);
    }

    res.json({
      userId,
      fullName: metadata.fullName || "Unknown",
      username: metadata.username || "unknown",
      description: metadata.description || "No description",
      email: metadata.email || "No email",
      imageUrl, 
    });
  } catch (error) {
    console.error("🚨 Failed to fetch user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Fetch users from Drizzle ORM [Rudgino's code]
app.get("/users", async (req, res) => {
  try {
    const users = await db.select().from(schema.users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// SuperTokens error handling
app.use(errorHandler());
//check of the server is alive
app.get("/ping", (req, res) => res.send("pong"));



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}/auth`));
