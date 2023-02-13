

create table developer_infos (
    id serial primary key,
    developer_since date not null,
    preferred_os preferredOS not null
);

create table developers (
    id serial primary key,
    name varchar(50) not null,
    email varchar(50) not null,
    developer_info_id integer,
    foreign key (developer_info_id) references developer_infos(id)
);

create table projects (
    id serial primary key,
    name varchar(50) not null,
    description text not null,
    estimated_time varchar(20) not null,
    repository varchar(120) not null,
    start_date date not null,
    end_date date,
    developer_id integer not null,
    foreign key (developer_id) references developers(id)

);

create table projects_technologies (
    id serial not null primary key,
    added_in date not null,
    project_id integer not null,
    technology_id integer not null,
    foreign key (project_id) references projects(id),
    foreign key (technology_id) references technologies(id)   
);

create table technologies (
    id serial primary key,
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
