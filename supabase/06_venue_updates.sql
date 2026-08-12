-- Halo Lounge is permanently closed. Its reports cascade-delete
-- automatically (reports.club_id has `on delete cascade`).
delete from clubs where name = 'Halo Lounge';

-- Gold Room is actually Buckhead/Lindbergh, not Midtown.
update clubs set neighborhood = 'Buckhead' where name = 'Gold Room';

-- Tongue & Groove is already 'Buckhead' — confirmed correct, no change needed.

-- New venues at The Battery.
insert into clubs (name, neighborhood, city, genre, dress_code, last_call, cover_tiers) values
  ('PBR Atlanta', 'The Battery', 'Atlanta', 'Country / Line Dancing', 'Casual / Western', '3:00 AM',
    '[{"until": null, "price": 0}]'::jsonb),
  ('Park Bench Battery', 'The Battery', 'Atlanta', 'Piano Bar / Live Music', 'Casual', '2:00 AM',
    '[{"until": null, "price": 0}]'::jsonb),
  ('Sports & Social', 'The Battery', 'Atlanta', 'Sports Bar / Games', 'Casual', '2:00 AM',
    '[{"until": null, "price": 0}]'::jsonb);
