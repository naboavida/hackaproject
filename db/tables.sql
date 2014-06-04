
-- tables for demo data


-- Table: projects




DROP TABLE activities;
DROP TABLE parameters;
DROP TABLE indicators;
DROP TABLE points;
DROP TABLE projects;



CREATE TABLE projects
(
  pid serial NOT NULL,
  title character varying(50) NOT NULL,
  area double precision,
  location character varying(50),
  CONSTRAINT pid PRIMARY KEY (pid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE projects
  OWNER TO postgres;




CREATE TABLE points
(
  pointid serial NOT NULL,
  x double precision NOT NULL,
  y double precision NOT NULL,
  location character varying(50),
  picturename character varying(50),
  pid_proj integer NOT NULL,
  CONSTRAINT points_pkey PRIMARY KEY (pointid),
  CONSTRAINT points_pid_proj_fkey FOREIGN KEY (pid_proj)
      REFERENCES projects (pid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE points
  OWNER TO postgres;




CREATE TABLE indicators
(
  iid serial NOT NULL,
  title character varying(20) NOT NULL,
  unit character varying(12),
  alarm character varying(12),
  value character varying(12),
  readings character varying(12)[],
  pid_proj integer NOT NULL,
  pointid_point integer,
  CONSTRAINT indicators_pkey PRIMARY KEY (iid),
  CONSTRAINT indicators_pid_proj_fkey FOREIGN KEY (pid_proj)
      REFERENCES projects (pid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT indicators_pointid_point_fkey FOREIGN KEY (pointid_point)
      REFERENCES points (pointid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE indicators
  OWNER TO postgres;




CREATE TABLE parameters
(
  parmid serial NOT NULL,
  title character varying(20) NOT NULL,
  value character varying(12),
  unit character varying(12),
  alarm character varying(12),
  objective character varying(12),
  min character varying(12),
  max character varying(12),
  readings character varying(12)[],
  iid_ind integer NOT NULL,
  CONSTRAINT parameters_pkey PRIMARY KEY (parmid),
  CONSTRAINT parameters_iid_ind_fkey FOREIGN KEY (iid_ind)
      REFERENCES indicators (iid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE parameters
  OWNER TO postgres;





CREATE TABLE activities
(
  aid serial NOT NULL,
  title character varying(50),
  description text,
  responsible character varying(30),
  start timestamp with time zone,
  "end" timestamp with time zone,
  allDay boolean,
  pid_proj integer NOT NULL,
  pointid_point integer,
  CONSTRAINT activities_pkey PRIMARY KEY (aid),
  CONSTRAINT activities_pid_proj_fkey FOREIGN KEY (pid_proj)
      REFERENCES projects (pid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT activities_pointid_point_fkey FOREIGN KEY (pointid_point)
      REFERENCES points (pointid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE activities
  OWNER TO postgres;
