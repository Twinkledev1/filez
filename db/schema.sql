DROP TABLE IF EXISTS folders CASCADE;
DROP TABLE IF EXISTS files;

-- creat folders and file tables

CREATE TABLE folders ( 
id serial PRIMARY KEY, 
name TEXT UNIQUE NOT NULL
);

CREATE TABLE files (
id serial PRIMARY KEY,
name TEXT NOT NULL,
size INTEGER NOT NULL,
folder_id INTEGER NOT NULL,
 UNIQUE(name, folder_id),
 FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE
);