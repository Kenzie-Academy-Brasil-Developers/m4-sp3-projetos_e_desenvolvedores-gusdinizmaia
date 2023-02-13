

CREATE TABLE public.developer_infos (
    id serial not null primary key,
    developer_since date not null,
    preferred_os preferredOS not null
);

CREATE TABLE public.developers (
    id serial not null primary key,
    name varchar(50) not null,
    email varchar(50) not null,
    developer_info_id integer
);


CREATE TABLE public.projects (
    id serial not null primary key,
    name varchar(50) not null,
    description text not null,
    estimated_time varchar(20) not null,
    repository varchar(120) not null,
    start_date date not null,
    end_date date,
    developer_id integer not null
);

CREATE TABLE public.projects_technologies (
    id serial not null primary key,
    added_in date not null,
    project_id integer not null,
    technology_id integer not null
);

CREATE TABLE public.technologies (
    id serial not null primary key,
    name varchar(50) not null
);

INSERT INTO 
    technologies (name) 
values 
    ('JavaScript'),
    ('Python'),
    ('React'),
    ('Express.js'),
    ('HTML'),
    ('CSS'),
    ('Django'),
    ('PostgreSQL'),
    ('MongoDB');
