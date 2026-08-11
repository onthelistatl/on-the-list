alter table reports add column device_id uuid;

drop policy "Anyone can submit a report" on reports;

create policy "Anyone can submit a report"
  on reports for insert
  with check (device_id = auth.uid());

create or replace function enforce_report_rate_limit()
returns trigger as $$
begin
  if exists (
    select 1 from reports
    where club_id = new.club_id
      and device_id = new.device_id
      and created_at > now() - interval '30 minutes'
  ) then
    raise exception 'You already reported this club recently — try again in a bit.';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger reports_rate_limit
before insert on reports
for each row
execute function enforce_report_rate_limit();
