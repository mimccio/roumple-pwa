alter table "public"."task_note" alter column "id" set data type uuid using "id"::uuid;

CREATE UNIQUE INDEX routine_note_pkey ON public.routine_note USING btree (id);

alter table "public"."routine_note" add constraint "routine_note_pkey" PRIMARY KEY using index "routine_note_pkey";


