create table "public"."task" (
    "id" uuid not null,
    "created_at" date not null default now(),
    "name" text not null,
    "description" jsonb,
    "category_id" uuid,
    "user_id" uuid not null,
    "priority" smallint not null default '0'::smallint,
    "status" text not null default 'TODO'::text,
    "schedule_type" text,
    "date" date,
    "period" smallint not null default '0'::smallint,
    "checked_item_ids" uuid[] not null default '{}'::uuid[]
);


alter table "public"."task" enable row level security;

create table "public"."task_checklist_item" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "task_id" uuid not null,
    "user_id" uuid not null,
    "name" text not null
);


alter table "public"."task_checklist_item" enable row level security;

create table "public"."task_note" (
    "id" text not null,
    "task_id" uuid not null,
    "note_id" uuid not null,
    "user_id" uuid not null
);


alter table "public"."task_note" enable row level security;

CREATE UNIQUE INDEX task_checklist_item_pkey ON public.task_checklist_item USING btree (id);

CREATE UNIQUE INDEX task_note_pkey ON public.task_note USING btree (id);

CREATE UNIQUE INDEX task_pkey ON public.task USING btree (id);

alter table "public"."task" add constraint "task_pkey" PRIMARY KEY using index "task_pkey";

alter table "public"."task_checklist_item" add constraint "task_checklist_item_pkey" PRIMARY KEY using index "task_checklist_item_pkey";

alter table "public"."task_note" add constraint "task_note_pkey" PRIMARY KEY using index "task_note_pkey";

alter table "public"."task" add constraint "task_category_id_fkey" FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL not valid;

alter table "public"."task" validate constraint "task_category_id_fkey";

alter table "public"."task" add constraint "task_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."task" validate constraint "task_user_id_fkey";

alter table "public"."task_checklist_item" add constraint "task_checklist_item_task_id_fkey" FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE not valid;

alter table "public"."task_checklist_item" validate constraint "task_checklist_item_task_id_fkey";

alter table "public"."task_checklist_item" add constraint "task_checklist_item_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."task_checklist_item" validate constraint "task_checklist_item_user_id_fkey";

alter table "public"."task_note" add constraint "task_note_note_id_fkey" FOREIGN KEY (note_id) REFERENCES note(id) ON DELETE CASCADE not valid;

alter table "public"."task_note" validate constraint "task_note_note_id_fkey";

alter table "public"."task_note" add constraint "task_note_task_id_fkey" FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE not valid;

alter table "public"."task_note" validate constraint "task_note_task_id_fkey";

alter table "public"."task_note" add constraint "task_note_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."task_note" validate constraint "task_note_user_id_fkey";

create policy "Enable CRUD for users based on user_id"
on "public"."task"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable CRUD for users based on user_id"
on "public"."task_checklist_item"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable CRUD for users based on user_id"
on "public"."task_note"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



