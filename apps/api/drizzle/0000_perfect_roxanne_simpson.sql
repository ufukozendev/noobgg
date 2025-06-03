CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."region_type" AS ENUM('north_america', 'south_america', 'europe', 'asia', 'oceania', 'middle_east', 'africa', 'russia_cis', 'unknown');--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_profiles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"user_keycloak_id" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"birth_date" timestamp with time zone,
	"user_name" varchar(50) NOT NULL,
	"first_name" varchar(60),
	"last_name" varchar(60),
	"profile_image_url" varchar(255),
	"banner_image_url" varchar(255),
	"bio" text,
	"gender" "gender" DEFAULT 'unknown' NOT NULL,
	"region_type" "region_type" DEFAULT 'unknown' NOT NULL,
	"last_online" timestamp with time zone DEFAULT now() NOT NULL,
	"row_version" text NOT NULL,
	CONSTRAINT "user_profiles_user_keycloak_id_unique" UNIQUE("user_keycloak_id"),
	CONSTRAINT "user_profiles_user_name_unique" UNIQUE("user_name")
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "games_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(150) NOT NULL,
	"description" text,
	"logo" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "distributors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "distributors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"website" varchar(255),
	"logo" varchar(255)
);
