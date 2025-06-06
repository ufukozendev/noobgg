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
	"logo" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "distributors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "distributors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"website" varchar(255),
	"logo" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "game_platforms" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "game_platforms_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"game_id" bigint NOT NULL,
	"platform_id" bigint NOT NULL,
	CONSTRAINT "unique_game_platform" UNIQUE("game_id","platform_id")
);
--> statement-breakpoint
CREATE TABLE "game_ranks" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "game_ranks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"name" varchar(100) NOT NULL,
	"image" varchar(255) NOT NULL,
	"order" integer NOT NULL,
	"game_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_modes" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "game_modes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"name" varchar(150) NOT NULL,
	"description" text,
	"order" integer NOT NULL,
	"game_id" bigint NOT NULL,
	"min_team_size" integer NOT NULL,
	"max_team_size" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platforms" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "platforms_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "game_platforms" ADD CONSTRAINT "fk_game_platforms_game_id" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_platforms" ADD CONSTRAINT "fk_game_platforms_platform_id" FOREIGN KEY ("platform_id") REFERENCES "public"."platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_ranks" ADD CONSTRAINT "fk_game_ranks_game_id" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_modes" ADD CONSTRAINT "fk_game_modes_game_id" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "games_name_idx" ON "games" USING btree ("name");--> statement-breakpoint
CREATE INDEX "distributors_name_idx" ON "distributors" USING btree ("name");--> statement-breakpoint
CREATE INDEX "game_platforms_game_id_idx" ON "game_platforms" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "game_platforms_platform_id_idx" ON "game_platforms" USING btree ("platform_id");--> statement-breakpoint
CREATE INDEX "game_ranks_game_id_idx" ON "game_ranks" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "game_ranks_name_idx" ON "game_ranks" USING btree ("name");--> statement-breakpoint
CREATE INDEX "game_modes_game_id_idx" ON "game_modes" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "game_modes_name_idx" ON "game_modes" USING btree ("name");--> statement-breakpoint
CREATE INDEX "platforms_name_idx" ON "platforms" USING btree ("name");