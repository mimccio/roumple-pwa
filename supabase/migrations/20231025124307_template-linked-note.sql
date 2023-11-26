create table "public"."template_routine_linked_note" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "template_routine_id" uuid not null,
    "template_note_id" uuid not null,
    "template_id" uuid not null
);


alter table "public"."template_routine_linked_note" enable row level security;

create table "public"."template_task_linked_note" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "template_note_id" uuid not null,
    "template_id" uuid not null,
    "template_task_id" uuid not null
);


alter table "public"."template_task_linked_note" enable row level security;

CREATE UNIQUE INDEX template_routine_linked_note_pkey ON public.template_routine_linked_note USING btree (id);

CREATE UNIQUE INDEX template_task_linked_note_pkey ON public.template_task_linked_note USING btree (id);

alter table "public"."template_routine_linked_note" add constraint "template_routine_linked_note_pkey" PRIMARY KEY using index "template_routine_linked_note_pkey";

alter table "public"."template_task_linked_note" add constraint "template_task_linked_note_pkey" PRIMARY KEY using index "template_task_linked_note_pkey";

alter table "public"."template_routine_linked_note" add constraint "template_routine_linked_note_template_id_fkey" FOREIGN KEY (template_id) REFERENCES template(id) ON DELETE CASCADE not valid;

alter table "public"."template_routine_linked_note" validate constraint "template_routine_linked_note_template_id_fkey";

alter table "public"."template_routine_linked_note" add constraint "template_routine_linked_note_template_note_id_fkey" FOREIGN KEY (template_note_id) REFERENCES template_note(id) ON DELETE CASCADE not valid;

alter table "public"."template_routine_linked_note" validate constraint "template_routine_linked_note_template_note_id_fkey";

alter table "public"."template_routine_linked_note" add constraint "template_routine_linked_note_template_routine_id_fkey" FOREIGN KEY (template_routine_id) REFERENCES template_routine(id) ON DELETE CASCADE not valid;

alter table "public"."template_routine_linked_note" validate constraint "template_routine_linked_note_template_routine_id_fkey";

alter table "public"."template_task_linked_note" add constraint "template_task_linked_note_template_id_fkey" FOREIGN KEY (template_id) REFERENCES template(id) not valid;

alter table "public"."template_task_linked_note" validate constraint "template_task_linked_note_template_id_fkey";

alter table "public"."template_task_linked_note" add constraint "template_task_linked_note_template_note_id_fkey" FOREIGN KEY (template_note_id) REFERENCES template_note(id) not valid;

alter table "public"."template_task_linked_note" validate constraint "template_task_linked_note_template_note_id_fkey";

alter table "public"."template_task_linked_note" add constraint "template_task_linked_note_template_task_id_fkey" FOREIGN KEY (template_task_id) REFERENCES template_task(id) ON DELETE CASCADE not valid;

alter table "public"."template_task_linked_note" validate constraint "template_task_linked_note_template_task_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_claim(uid uuid, claim text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data - claim where id = uid;
        return 'OK';
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_claim(uid uuid, claim text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select coalesce(raw_app_meta_data->claim, null) from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_claims(uid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    DECLARE retval jsonb;
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN '{"error":"access denied"}'::jsonb;
      ELSE
        select raw_app_meta_data from auth.users into retval where id = uid::uuid;
        return retval;
      END IF;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_my_claim(claim text)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
AS $function$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata' -> claim, null)
$function$
;

CREATE OR REPLACE FUNCTION public.get_my_claims()
 RETURNS jsonb
 LANGUAGE sql
 STABLE
AS $function$
  select 
  	coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'app_metadata', '{}'::jsonb)::jsonb
$function$
;

CREATE OR REPLACE FUNCTION public.is_claims_admin()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
  BEGIN
    IF session_user = 'authenticator' THEN
      --------------------------------------------
      -- To disallow any authenticated app users
      -- from editing claims, delete the following
      -- block of code and replace it with:
      -- RETURN FALSE;
      --------------------------------------------
      IF extract(epoch from now()) > coalesce((current_setting('request.jwt.claims', true)::jsonb)->>'exp', '0')::numeric THEN
        return false; -- jwt expired
      END IF;
      If current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role' THEN
        RETURN true; -- service role users have admin rights
      END IF;
      IF coalesce((current_setting('request.jwt.claims', true)::jsonb)->'app_metadata'->'claims_admin', 'false')::bool THEN
        return true; -- user has claims_admin set to true
      ELSE
        return false; -- user does NOT have claims_admin set to true
      END IF;
      --------------------------------------------
      -- End of block 
      --------------------------------------------
    ELSE -- not a user session, probably being called from a trigger or something
      return true;
    END IF;
  END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_claim(uid uuid, claim text, value jsonb)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
    BEGIN
      IF NOT is_claims_admin() THEN
          RETURN 'error: access denied';
      ELSE        
        update auth.users set raw_app_meta_data = 
          raw_app_meta_data || 
            json_build_object(claim, value)::jsonb where id = uid;
        return 'OK';
      END IF;
    END;
$function$
;

create policy "Enable all for admin users"
on "public"."template_routine_linked_note"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb));


create policy "Enable read for all athenticated users"
on "public"."template_routine_linked_note"
as permissive
for select
to authenticated
using (true);


create policy "Enable all access to admin users"
on "public"."template_task_linked_note"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb));


create policy "Enable read access to athenticated users"
on "public"."template_task_linked_note"
as permissive
for select
to authenticated
using (true);



