alter table "public"."routine" alter column "monthly_recurrence" set default '{0,1,2,3,4,5,6,7,8,9,10,11}'::smallint[];

alter table "public"."routine_action" drop column "done";

alter table "public"."routine_action" add column "status" text not null default 'TODO'::text;


