create table "public"."note" (
    "created_at" timestamp with time zone not null default now(),
    "content" jsonb,
    "category_id" uuid,
    "user_id" uuid not null,
    "folder_id" uuid,
    "id" uuid not null,
    "title" text
);


alter table "public"."note" enable row level security;

create table "public"."note_folder" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text not null,
    "user_id" uuid not null
);


alter table "public"."note_folder" enable row level security;

CREATE UNIQUE INDEX folder_pkey ON public.note_folder USING btree (id);

CREATE UNIQUE INDEX note_pkey ON public.note USING btree (id);

alter table "public"."note" add constraint "note_pkey" PRIMARY KEY using index "note_pkey";

alter table "public"."note_folder" add constraint "folder_pkey" PRIMARY KEY using index "folder_pkey";

alter table "public"."note" add constraint "note_category_id_fkey" FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL not valid;

alter table "public"."note" validate constraint "note_category_id_fkey";

alter table "public"."note" add constraint "note_folder_id_fkey" FOREIGN KEY (folder_id) REFERENCES note_folder(id) ON DELETE CASCADE not valid;

alter table "public"."note" validate constraint "note_folder_id_fkey";

alter table "public"."note" add constraint "note_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."note" validate constraint "note_user_id_fkey";

alter table "public"."note_folder" add constraint "note_folder_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."note_folder" validate constraint "note_folder_user_id_fkey";

create policy "Enable CRUD for users based on user_id"
on "public"."note"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable CRUD for users based on user_id"
on "public"."note_folder"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



