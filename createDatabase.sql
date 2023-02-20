create type os as enum ('Windows', 'MacOS', 'Linux');

create table developer_infos (
    "id" serial primary key,
    "developerSince" date not null,
    "preferredOS" os not null
);

create table technologies (
    "id" serial primary key,
    "name" varchar(50) not null
);

create table developers (
    "id" serial primary key,
    "name" varchar(50) not null,
    "email" varchar(50) not null unique,
    "developerInfoId" integer unique,
    foreign key ("developerInfoId") references developer_infos(id)
);

create table projects (
    "id" serial primary key,
    "name" varchar(50) not null,
    "description" text not null,
    "estimatedTime" varchar(20) not null,
    "repository" varchar(120) not null,
    "startDate" date not null,
    "endDate" date,
    "developerId" integer not null,
    foreign key ("developerId") references developers("id") on delete cascade
);


create table projects_technologies (
    "id" serial not null primary key,
    "addedIn" date not null default current_date,
    "projectId" integer not null,
    "technologyId" integer not null,
    foreign key ("projectId") references projects(id) on delete cascade,
    foreign key ("technologyId") references technologies(id)
);


INSERT INTO 
    technologies ("name") 
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