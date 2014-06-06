

-- client has requested a new user
-- Ei creates entries on db:

INSERT INTO organizations(
            name, code)
    VALUES ('Consulai', '12353');



INSERT INTO users(
             username, password, email, oid_org)
    VALUES ( 'bcaldeira', 'p', 'bcaldeira@consulai.com', (select oid from organizations where name = 'Consulai') );


-- Ei sends in a secure manner the user and password
--