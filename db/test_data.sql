
-- demo data






INSERT INTO projects(
            title, area, location)
    VALUES ('Water Collaboration', 123.5, 'São Tomé');

INSERT INTO indicators(
            title, unit, alarm, value, readings, pid_proj)
    VALUES ('Water Quality', '', 'yes', 'Good', ARRAY['Good'], 1);

INSERT INTO parameters(
            title, unit, alarm, value, objective, min, max, readings, iid_ind)
    VALUES ('pH', '', 'yes', 7.3, 7, 5, 8, ARRAY[7.3], 1);
INSERT INTO parameters(
            title, unit, alarm, value, objective, min, max, readings, iid_ind)
    VALUES ('Coliforms', 'UFC/100ml', 'yes', 6, 2, 0, 6, ARRAY[6], 1);


INSERT INTO points(
            x, y, location, picturename, pid_proj)
    VALUES (32.666667, -16.85, 'Santa Maria', 'santa_maria_point.jpg', 1);
INSERT INTO points(
            x, y, location, picturename, pid_proj)
    VALUES (32.666667, -16.95, 'São José', 'sao_jose_point.jpg', 1);


INSERT INTO indicators(
            title, unit, alarm, value, readings, pid_proj, pointid_point)
    VALUES ('Water Quality', '', 'yes', 'Good', ARRAY['Good'], 1, 1);