import sqlite3

connection = sqlite3.connect('database.db')

connection.executescript(
    '''DROP TABLE IF EXISTS notes;
    CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL)''')

cur = connection.cursor()

cur.execute("INSERT INTO notes (content) VALUES (?)", ('# The First Note',))
cur.execute("INSERT INTO notes (content) VALUES (?)", ('_Another note_',))
cur.execute("INSERT INTO notes (content) VALUES (?)",
            ('Visit [this page](https://www.digitalocean.com/community/tutorials) for more tutorials.',))

connection.commit()
connection.close()
