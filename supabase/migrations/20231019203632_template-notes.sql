create table "public"."template_note" (
    "created_at" timestamp with time zone not null default now(),
    "content" jsonb,
    "id" uuid not null default gen_random_uuid(),
    "title" text,
    "template_id" uuid not null,
    "template_folder_id" uuid,
    "template_category_id" uuid
);


alter table "public"."template_note" enable row level security;

create table "public"."template_note_folder" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "name" text not null,
    "template_id" uuid not null
);


alter table "public"."template_note_folder" enable row level security;

CREATE UNIQUE INDEX template_note_folder_pkey ON public.template_note_folder USING btree (id);

CREATE UNIQUE INDEX template_note_pkey ON public.template_note USING btree (id);

alter table "public"."template_note" add constraint "template_note_pkey" PRIMARY KEY using index "template_note_pkey";

alter table "public"."template_note_folder" add constraint "template_note_folder_pkey" PRIMARY KEY using index "template_note_folder_pkey";

alter table "public"."template_note" add constraint "template_note_template_category_id_fkey" FOREIGN KEY (template_category_id) REFERENCES template_category(id) ON DELETE SET NULL not valid;

alter table "public"."template_note" validate constraint "template_note_template_category_id_fkey";

alter table "public"."template_note" add constraint "template_note_template_folder_id_fkey" FOREIGN KEY (template_folder_id) REFERENCES template_note_folder(id) ON DELETE SET NULL not valid;

alter table "public"."template_note" validate constraint "template_note_template_folder_id_fkey";

alter table "public"."template_note" add constraint "template_note_template_id_fkey" FOREIGN KEY (template_id) REFERENCES template(id) ON DELETE CASCADE not valid;

alter table "public"."template_note" validate constraint "template_note_template_id_fkey";

alter table "public"."template_note_folder" add constraint "template_note_folder_template_id_fkey" FOREIGN KEY (template_id) REFERENCES template(id) ON DELETE CASCADE not valid;

alter table "public"."template_note_folder" validate constraint "template_note_folder_template_id_fkey";

create policy "Enable all access to admin users"
on "public"."template_note"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb));


create policy "Enable read access to autheticated users"
on "public"."template_note"
as permissive
for select
to authenticated
using (true);


create policy "Enable all access to admin users"
on "public"."template_note_folder"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb));


create policy "Enable read access to authenticated users"
on "public"."template_note_folder"
as permissive
for select
to authenticated
using (true);



