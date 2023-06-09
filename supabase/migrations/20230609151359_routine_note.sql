create table "public"."routine_note" (
    "routine_id" uuid not null,
    "note_id" uuid not null,
    "id" uuid not null,
    "user_id" uuid not null
);


alter table "public"."routine_note" enable row level security;

alter table "public"."routine_note" add constraint "routine_note_note_id_fkey" FOREIGN KEY (note_id) REFERENCES note(id) ON DELETE CASCADE not valid;

alter table "public"."routine_note" validate constraint "routine_note_note_id_fkey";

alter table "public"."routine_note" add constraint "routine_note_routine_id_fkey" FOREIGN KEY (routine_id) REFERENCES routine(id) ON DELETE CASCADE not valid;

alter table "public"."routine_note" validate constraint "routine_note_routine_id_fkey";

alter table "public"."routine_note" add constraint "routine_note_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."routine_note" validate constraint "routine_note_user_id_fkey";

create policy "Enable CRUD for users based on user_id"
on "public"."routine_note"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



