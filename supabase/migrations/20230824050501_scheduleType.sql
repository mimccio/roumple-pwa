alter table "public"."routine" drop column "type";

alter table "public"."routine" add column "schedule_type" text not null default 'DAILY'::text;





