create table "public"."routine" (
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" text,
    "user_id" uuid not null,
    "id" uuid not null,
    "priority" smallint not null default '0'::smallint,
    "period" smallint not null default '0'::smallint,
    "type" text not null default 'DAILY'::text,
    "daily_recurrence" smallint[] not null default '{0,1,2,3,4,5,6}'::smallint[],
    "weekly_recurrence" smallint[] not null default '{0,1}'::smallint[],
    "monthly_recurrence" smallint[] not null default '{1,2,3,4,5,6,7,8,9,10,11,12}'::smallint[],
    "archived" boolean not null default false
);


alter table "public"."routine" enable row level security;

create table "public"."routine_action" (
    "id" uuid not null,
    "routine_id" uuid,
    "date" date not null,
    "user_id" uuid not null,
    "done" boolean not null default false
);


alter table "public"."routine_action" enable row level security;

CREATE UNIQUE INDEX routine_pkey ON public.routine USING btree (id);

CREATE UNIQUE INDEX routine_status_pkey ON public.routine_action USING btree (id);

alter table "public"."routine" add constraint "routine_pkey" PRIMARY KEY using index "routine_pkey";

alter table "public"."routine_action" add constraint "routine_status_pkey" PRIMARY KEY using index "routine_status_pkey";

alter table "public"."routine" add constraint "routine_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."routine" validate constraint "routine_user_id_fkey";

alter table "public"."routine_action" add constraint "routine_action_routine_id_fkey" FOREIGN KEY (routine_id) REFERENCES routine(id) ON DELETE CASCADE not valid;

alter table "public"."routine_action" validate constraint "routine_action_routine_id_fkey";

alter table "public"."routine_action" add constraint "routine_action_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."routine_action" validate constraint "routine_action_user_id_fkey";

create policy "Enable crud for users based on user_id"
on "public"."routine"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable crud for users based on user_id"
on "public"."routine_action"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



