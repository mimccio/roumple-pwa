alter table "public"."routine" drop constraint "routine_user_id_fkey";

alter table "public"."routine" add constraint "routine_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."routine" validate constraint "routine_user_id_fkey";


