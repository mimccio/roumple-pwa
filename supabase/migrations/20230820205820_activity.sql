alter table "public"."routine_action" drop constraint "routine_action_routine_id_fkey";

alter table "public"."routine_action" drop constraint "routine_action_user_id_fkey";

alter table "public"."routine_action" drop constraint "routine_status_pkey";

drop index if exists "public"."routine_status_pkey";

alter table "public"."routine" add column "occurrence" smallint not null default '1'::smallint;

alter table "public"."routine_action" add column "done_occurrence" smallint not null default '0'::smallint;

alter table "public"."routine_action" add column "schedule_type" text not null;

alter table "public"."routine_action" alter column "id" drop identity;

alter table "public"."routine_action" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."routine_action" alter column "routine_id" set not null;

CREATE UNIQUE INDEX routine_action_pkey ON public.routine_action USING btree (id);

alter table "public"."routine_action" add constraint "routine_action_pkey" PRIMARY KEY using index "routine_action_pkey";

alter table "public"."routine_action" add constraint "routine_action_routine_id_fkey" FOREIGN KEY (routine_id) REFERENCES routine(id) not valid;

alter table "public"."routine_action" validate constraint "routine_action_routine_id_fkey";

alter table "public"."routine_action" add constraint "routine_action_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."routine_action" validate constraint "routine_action_user_id_fkey";


