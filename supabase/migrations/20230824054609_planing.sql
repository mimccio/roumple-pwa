create table "public"."category" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text not null,
    "color" text not null,
    "user_id" uuid not null
);


alter table "public"."category" enable row level security;

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

create table "public"."routine" (
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" jsonb,
    "user_id" uuid not null,
    "id" uuid not null,
    "priority" smallint not null default '0'::smallint,
    "period" smallint not null default '0'::smallint,
    "daily_recurrence" smallint[] not null default '{0,1,2,3,4,5,6}'::smallint[],
    "weekly_recurrence" smallint[] not null default '{0,1}'::smallint[],
    "monthly_recurrence" smallint[] not null default '{0,1,2,3,4,5,6,7,8,9,10,11}'::smallint[],
    "archived" boolean not null default false,
    "category_id" uuid,
    "occurrence" smallint not null default '1'::smallint,
    "schedule_type" text not null default 'DAILY'::text
);


alter table "public"."routine" enable row level security;

create table "public"."routine_action" (
    "id" uuid not null,
    "routine_id" uuid not null,
    "date" date not null,
    "user_id" uuid not null,
    "status" text not null default 'TODO'::text,
    "checked_list" text[] not null default '{}'::text[],
    "done_occurrence" smallint not null default '0'::smallint,
    "schedule_type" text not null
);


alter table "public"."routine_action" enable row level security;

create table "public"."routine_checklist_item" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "user_id" uuid not null,
    "routine_id" uuid not null
);


alter table "public"."routine_checklist_item" enable row level security;

create table "public"."routine_note" (
    "routine_id" uuid not null,
    "note_id" uuid not null,
    "id" uuid not null,
    "user_id" uuid not null
);


alter table "public"."routine_note" enable row level security;

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
    "id" uuid not null,
    "task_id" uuid not null,
    "note_id" uuid not null,
    "user_id" uuid not null
);


alter table "public"."task_note" enable row level security;

CREATE UNIQUE INDEX category_pkey ON public.category USING btree (id);

CREATE UNIQUE INDEX folder_pkey ON public.note_folder USING btree (id);

CREATE UNIQUE INDEX note_pkey ON public.note USING btree (id);

CREATE UNIQUE INDEX routine_checklist_item_pkey ON public.routine_checklist_item USING btree (id);

CREATE UNIQUE INDEX routine_note_pkey ON public.routine_note USING btree (id);

CREATE UNIQUE INDEX routine_pkey ON public.routine USING btree (id);

CREATE UNIQUE INDEX routine_status_pkey ON public.routine_action USING btree (id);

CREATE UNIQUE INDEX task_checklist_item_pkey ON public.task_checklist_item USING btree (id);

CREATE UNIQUE INDEX task_note_pkey ON public.task_note USING btree (id);

CREATE UNIQUE INDEX task_pkey ON public.task USING btree (id);

alter table "public"."category" add constraint "category_pkey" PRIMARY KEY using index "category_pkey";

alter table "public"."note" add constraint "note_pkey" PRIMARY KEY using index "note_pkey";

alter table "public"."note_folder" add constraint "folder_pkey" PRIMARY KEY using index "folder_pkey";

alter table "public"."routine" add constraint "routine_pkey" PRIMARY KEY using index "routine_pkey";

alter table "public"."routine_action" add constraint "routine_status_pkey" PRIMARY KEY using index "routine_status_pkey";

alter table "public"."routine_checklist_item" add constraint "routine_checklist_item_pkey" PRIMARY KEY using index "routine_checklist_item_pkey";

alter table "public"."routine_note" add constraint "routine_note_pkey" PRIMARY KEY using index "routine_note_pkey";

alter table "public"."task" add constraint "task_pkey" PRIMARY KEY using index "task_pkey";

alter table "public"."task_checklist_item" add constraint "task_checklist_item_pkey" PRIMARY KEY using index "task_checklist_item_pkey";

alter table "public"."task_note" add constraint "task_note_pkey" PRIMARY KEY using index "task_note_pkey";

alter table "public"."category" add constraint "category_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."category" validate constraint "category_user_id_fkey";

alter table "public"."note" add constraint "note_category_id_fkey" FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL not valid;

alter table "public"."note" validate constraint "note_category_id_fkey";

alter table "public"."note" add constraint "note_folder_id_fkey" FOREIGN KEY (folder_id) REFERENCES note_folder(id) ON DELETE CASCADE not valid;

alter table "public"."note" validate constraint "note_folder_id_fkey";

alter table "public"."note" add constraint "note_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."note" validate constraint "note_user_id_fkey";

alter table "public"."note_folder" add constraint "note_folder_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."note_folder" validate constraint "note_folder_user_id_fkey";

alter table "public"."routine" add constraint "routine_category_id_fkey" FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL not valid;

alter table "public"."routine" validate constraint "routine_category_id_fkey";

alter table "public"."routine" add constraint "routine_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."routine" validate constraint "routine_user_id_fkey";

alter table "public"."routine_action" add constraint "routine_action_routine_id_fkey" FOREIGN KEY (routine_id) REFERENCES routine(id) ON DELETE CASCADE not valid;

alter table "public"."routine_action" validate constraint "routine_action_routine_id_fkey";

alter table "public"."routine_action" add constraint "routine_action_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."routine_action" validate constraint "routine_action_user_id_fkey";

alter table "public"."routine_checklist_item" add constraint "routine_checklist_item_routine_id_fkey" FOREIGN KEY (routine_id) REFERENCES routine(id) ON DELETE CASCADE not valid;

alter table "public"."routine_checklist_item" validate constraint "routine_checklist_item_routine_id_fkey";

alter table "public"."routine_checklist_item" add constraint "routine_checklist_item_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."routine_checklist_item" validate constraint "routine_checklist_item_user_id_fkey";

alter table "public"."routine_note" add constraint "routine_note_note_id_fkey" FOREIGN KEY (note_id) REFERENCES note(id) ON DELETE CASCADE not valid;

alter table "public"."routine_note" validate constraint "routine_note_note_id_fkey";

alter table "public"."routine_note" add constraint "routine_note_routine_id_fkey" FOREIGN KEY (routine_id) REFERENCES routine(id) ON DELETE CASCADE not valid;

alter table "public"."routine_note" validate constraint "routine_note_routine_id_fkey";

alter table "public"."routine_note" add constraint "routine_note_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."routine_note" validate constraint "routine_note_user_id_fkey";

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
on "public"."category"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


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


create policy "Enable CRUD for users based on user_id"
on "public"."routine_checklist_item"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Enable CRUD for users based on user_id"
on "public"."routine_note"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


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



