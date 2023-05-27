create table "public"."category" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text not null,
    "color" text not null,
    "user_id" uuid not null
);


alter table "public"."category" enable row level security;

alter table "public"."routine" add column "category_id" uuid;

CREATE UNIQUE INDEX category_pkey ON public.category USING btree (id);

alter table "public"."category" add constraint "category_pkey" PRIMARY KEY using index "category_pkey";

alter table "public"."category" add constraint "category_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."category" validate constraint "category_user_id_fkey";

alter table "public"."routine" add constraint "routine_category_id_fkey" FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL not valid;

alter table "public"."routine" validate constraint "routine_category_id_fkey";

create policy "Enable CRUD for users based on user_id"
on "public"."category"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



