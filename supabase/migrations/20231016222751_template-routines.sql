create table "public"."template" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" text,
    "published" boolean not null default false
);


alter table "public"."template" enable row level security;

create table "public"."template_category" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "color" text not null,
    "template_id" uuid not null
);


alter table "public"."template_category" enable row level security;

create table "public"."template_routine" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "template_id" uuid not null,
    "name" text not null,
    "description" jsonb,
    "priority" smallint not null default '0'::smallint,
    "period" smallint not null default '0'::smallint,
    "daily_recurrence" smallint[] not null default '{0,1,2,3,4,5,6}'::smallint[],
    "weekly_recurrence" smallint[] not null default '{0,1}'::smallint[],
    "monthly_recurrence" smallint[] not null default '{0,1,2,3,4,5,6,7,8,9,10,11}'::smallint[],
    "template_category_id" uuid,
    "occurrence" smallint not null default '1'::smallint,
    "schedule_type" text not null default 'DAILY'::text
);


alter table "public"."template_routine" enable row level security;

create table "public"."template_routine_checklist_item" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "template_routine_id" uuid not null
);


alter table "public"."template_routine_checklist_item" enable row level security;

CREATE UNIQUE INDEX template_category_pkey ON public.template_category USING btree (id);

CREATE UNIQUE INDEX template_pkey ON public.template USING btree (id);

CREATE UNIQUE INDEX template_routine_checklist_item_pkey ON public.template_routine_checklist_item USING btree (id);

CREATE UNIQUE INDEX template_routine_pkey ON public.template_routine USING btree (id);

alter table "public"."template" add constraint "template_pkey" PRIMARY KEY using index "template_pkey";

alter table "public"."template_category" add constraint "template_category_pkey" PRIMARY KEY using index "template_category_pkey";

alter table "public"."template_routine" add constraint "template_routine_pkey" PRIMARY KEY using index "template_routine_pkey";

alter table "public"."template_routine_checklist_item" add constraint "template_routine_checklist_item_pkey" PRIMARY KEY using index "template_routine_checklist_item_pkey";

alter table "public"."template_category" add constraint "template_category_template_id_fkey" FOREIGN KEY (template_id) REFERENCES template(id) ON DELETE CASCADE not valid;

alter table "public"."template_category" validate constraint "template_category_template_id_fkey";

alter table "public"."template_routine" add constraint "template_routine_template_category_id_fkey" FOREIGN KEY (template_category_id) REFERENCES template_category(id) ON DELETE SET NULL not valid;

alter table "public"."template_routine" validate constraint "template_routine_template_category_id_fkey";

alter table "public"."template_routine" add constraint "template_routine_template_id_fkey" FOREIGN KEY (template_id) REFERENCES template(id) ON DELETE CASCADE not valid;

alter table "public"."template_routine" validate constraint "template_routine_template_id_fkey";

alter table "public"."template_routine_checklist_item" add constraint "template_routine_checklist_item_template_routine_id_fkey" FOREIGN KEY (template_routine_id) REFERENCES template_routine(id) ON DELETE CASCADE not valid;

alter table "public"."template_routine_checklist_item" validate constraint "template_routine_checklist_item_template_routine_id_fkey";

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

create policy "Enable delete access to admin users"
on "public"."template"
as permissive
for delete
to authenticated
using ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb));


create policy "Enable insert access to admin users"
on "public"."template"
as permissive
for insert
to authenticated
with check ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb));


create policy "Enable read access to all authenticated users"
on "public"."template"
as permissive
for select
to authenticated
using (true);


create policy "Enable update access to admin users"
on "public"."template"
as permissive
for update
to authenticated
with check ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb));


create policy "Enable all access to admin user"
on "public"."template_category"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb));


create policy "Enable select access to all authenticated users"
on "public"."template_category"
as permissive
for select
to authenticated
using (true);


create policy "Enable all access to admin users"
on "public"."template_routine"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb));


create policy "Enable select to all authenticated users"
on "public"."template_routine"
as permissive
for select
to authenticated
using (true);


create policy "Enable all access to admin users"
on "public"."template_routine_checklist_item"
as permissive
for all
to authenticated
using ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb))
with check ((get_my_claim('userrole'::text) = '"ADMIN"'::jsonb));


create policy "Enable select access to all autheticated users"
on "public"."template_routine_checklist_item"
as permissive
for select
to authenticated
using (true);



