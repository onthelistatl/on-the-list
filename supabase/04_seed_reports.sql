insert into reports (club_id, crowd_level, cover_paid, created_at)
select c.id, v.crowd_level, v.cover_paid, now() - (v.mins_ago || ' minutes')::interval
from clubs c
join (values
  ('Sister Louisa''s Church', 3, 0, 12),
  ('Sister Louisa''s Church', 2, 0, 40),
  ('The Music Room', 5, 20, 8),
  ('The Music Room', 4, 15, 35),
  ('The Music Room', 4, 15, 60),
  ('Noni''s Bar & Deli', 2, 0, 100),
  ('Blake''s on the Park', 3, 0, 20),
  ('Blake''s on the Park', 3, 0, 55),
  ('Halo Lounge', 4, 20, 5),
  ('Halo Lounge', 3, 0, 45),
  ('Gold Room', 5, 20, 3),
  ('Gold Room', 5, 20, 25),
  ('Gold Room', 4, 10, 70),
  ('Tongue & Groove', 3, 25, 30),
  ('Havana Club Buckhead', 4, 10, 15),
  ('Havana Club Buckhead', 3, 10, 50),
  ('The EARL', 3, 10, 18),
  ('The EARL', 2, 10, 80),
  ('Graveyard Tavern', 2, 0, 95),
  ('Argosy', 3, 0, 22),
  ('Argosy', 3, 0, 58)
) as v(name, crowd_level, cover_paid, mins_ago) on c.name = v.name;
