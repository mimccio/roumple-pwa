alter table "public"."routine" add column "user_id" uuid not null;

alter table "public"."routine" enable row level security;

alter table "public"."routine" add constraint "routine_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."routine" validate constraint "routine_user_id_fkey";

create policy "Enable crud for users based on user_id"
on "public"."routine"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



