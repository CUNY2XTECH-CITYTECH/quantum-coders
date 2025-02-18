CREATE TABLE "users" (
	"userID" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(300) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
