
-- demo data


-- delete from indicators
-- delete from points
-- delete from projects


INSERT INTO organizations(
            name, code)
    VALUES ('canecas', '123'),
    ('casal', '456');


INSERT INTO users(
            username, password, email, oid_org)
    VALUES ('naboavida', 'pass', 'naboavida@gmail.com', 1);

INSERT INTO users(
            username, password, email, oid_org)
    VALUES ('jpsantos', 'pass', 'jpsantos@gmail.com', 2);



INSERT INTO projects(
            title, area, location)
    VALUES ('Water Collaboration', 123.5, 'São Tomé'),
            ('Oilfields', 453.5, 'Texas, US');


INSERT INTO organizations_projects(
        oid_org, pid_proj)
    VALUES (1, 1),
            (2, 2);



    

INSERT INTO points(
            x, y, location, picturename, pid_proj)
    VALUES (32.666667, -16.85, 'Santa Maria', 'santa_maria_point.jpg', 1);
INSERT INTO points(
            x, y, location, picturename, pid_proj)
    VALUES (32.666667, -16.95, 'São José', 'sao_jose_point.jpg', 1);


INSERT INTO indicators(
            title, unit, alarm, value, readings, pid_proj)
    VALUES ('Water Quality', '', 'yes', 'Good', ARRAY['Good'], 1);

INSERT INTO parameters(
            title, unit, alarm, value, objective, min, max, readings, iid_ind)
    VALUES ('pH', '', 'yes', 7.3, 7, 5, 8, ARRAY[7.3], 1);
INSERT INTO parameters(
            title, unit, alarm, value, objective, min, max, readings, iid_ind)
    VALUES ('Coliforms', 'UFC/100ml', 'yes', 6, 2, 0, 6, ARRAY[6], 1);





INSERT INTO indicators(
            title, unit, alarm, value, readings, pid_proj, pointid_point)
    VALUES ('Water Quality', '', 'yes', 'Good', ARRAY['Good'], 1, 1);

INSERT INTO parameters(
            title, unit, alarm, value, objective, min, max, readings, iid_ind)
    VALUES ('Coliforms', 'UFC/100ml', 'yes', 4, 2, 0, 6, ARRAY[4], 2);

INSERT INTO parameters(
            title, unit, alarm, value, objective, min, max, readings, iid_ind)
    VALUES ('Level', 'l', 'yes', 4, 10, 5, 12, ARRAY[5,6,3,2,1,1,8,4], 2);


INSERT INTO activities(
            title, description, responsible, start, allDay, pid_proj)
    VALUES ('Budget Revision', 'The monthly task to revise the operational expenses and profits.', 'João Santos', '2014-06-20 00:00:00.000000', true, 1);

INSERT INTO activities(
            title, description, responsible, start, allDay, pid_proj, pointid_point)
    VALUES ('Budget Revision on Point 1', 'The monthly task to revise the operational expenses and profits.', 'João Santos', '2014-06-23 00:00:00.000000', true, 1, 1);

