create table "public"."routine" (
    "id2" bigint not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" text,
    "user_id" uuid not null,
    "id" uuid
);


alter table "public"."routine" enable row level security;

CREATE UNIQUE INDEX routine_pkey ON public.routine USING btree (id2);

alter table "public"."routine" add constraint "routine_pkey" PRIMARY KEY using index "routine_pkey";

alter table "public"."routine" add constraint "routine_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."routine" validate constraint "routine_user_id_fkey";

create policy "Enable crud for users based on user_id"
on "public"."routine"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



