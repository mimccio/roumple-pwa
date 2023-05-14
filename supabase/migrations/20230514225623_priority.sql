alter table "public"."routine" add column "priority" smallint not null default '0'::smallint;

alter table "public"."routine" alter column "id" drop identity;

alter table "public"."routine" alter column "id" set data type uuid using "id"::uuid;


