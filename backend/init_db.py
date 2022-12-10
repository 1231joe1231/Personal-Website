import sqlite3

from utility import insert_note_data

connection = sqlite3.connect('database.db')

connection.executescript(
    '''DROP TABLE IF EXISTS notes;
    CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    content TEXT NOT NULL)''')

cur = connection.cursor()

init_data = [('Note 1', '# The First Note'), ('Note 2', '_Another note_'),
             ('Note 3', 'Visit [this page](https://www.digitalocean.com/community/tutorials) for more tutorials.')]


for i in init_data:
    insert_note_data(cur, i[0], i[1])

connection.commit()
connection.close()
