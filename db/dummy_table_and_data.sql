
-- dummy data

CREATE TABLE public.tablea
(
   id integer, 
   name text, 
   CONSTRAINT "PK" PRIMARY KEY (id)
) 
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.tablea
  OWNER TO postgres;



INSERT INTO tablea(
            id, name)
    VALUES (0, 'Jacaré');

INSERT INTO tablea(
            id, name)
    VALUES (1, 'Javali');

INSERT INTO tablea(
            id, name)
    VALUES (2, 'Marmota');