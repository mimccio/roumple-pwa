create table "public"."routine_checklist_item" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "user_id" uuid not null,
    "routine_id" uuid not null
);


alter table "public"."routine_checklist_item" enable row level security;

alter table "public"."routine" alter column "description" set data type jsonb using "description"::jsonb;

alter table "public"."routine_action" add column "checked_list" text[] not null default '{}'::text[];

CREATE UNIQUE INDEX routine_checklist_item_pkey ON public.routine_checklist_item USING btree (id);

alter table "public"."routine_checklist_item" add constraint "routine_checklist_item_pkey" PRIMARY KEY using index "routine_checklist_item_pkey";

alter table "public"."routine_checklist_item" add constraint "routine_checklist_item_routine_id_fkey" FOREIGN KEY (routine_id) REFERENCES routine(id) ON DELETE CASCADE not valid;

alter table "public"."routine_checklist_item" validate constraint "routine_checklist_item_routine_id_fkey";

alter table "public"."routine_checklist_item" add constraint "routine_checklist_item_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."routine_checklist_item" validate constraint "routine_checklist_item_user_id_fkey";

create policy "Enable CRUD for users based on user_id"
on "public"."routine_checklist_item"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



