alter table "public"."routine" add column "occurrence" smallint not null default '1'::smallint;

alter table "public"."routine_action" add column "done_occurrence" smallint not null default '0'::smallint;

alter table "public"."routine_action" add column "schedule_type" text not null;

alter table "public"."routine_action" alter column "routine_id" set not null;



