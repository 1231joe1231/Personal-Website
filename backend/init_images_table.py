import sqlite3

from utility import insert_note_data

connection = sqlite3.connect('database.db')

connection.executescript(
    '''DROP TABLE IF EXISTS images;
    CREATE TABLE images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    path TEXT NOT NULL);''')


connection.commit()
connection.close()
