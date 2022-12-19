import sqlite3

from utility import insert_note_data

connection = sqlite3.connect('database.db')

connection.executescript(
    '''DROP TABLE IF EXISTS notes;
    DROP TABLE IF EXISTS images;
    CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    content TEXT NOT NULL);
    CREATE TABLE images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    path TEXT NOT NULL);''')

cur = connection.cursor()

init_data = [
    ('Note 1', '# The First Note\n\nThis is a **bold** note.'),
    ('Note 2', '_Another note_\n\nThis is an _italic_ note.'),
    ('Note 3', 'Visit [this page](https://www.digitalocean.com/community/tutorials) for more tutorials.\n\nThis is a link to a page.'),
    ('Note 4', '1. Item 1\n2. Item 2\n3. Item 3\n\nThis is a numbered list.'),
    ('Note 5', '- Item 1\n- Item 2\n- Item 3\n\nThis is a bullet point list.'),
    ('Note 6', '> This is a blockquote.\n\nThis is a quote from someone else.'),
    ('Note 7', '```\nprint("This is a code block.")\n```\n\nThis is a code block.'),
    ('Note 8', '# This is a heading\n\nThis is a paragraph.'),
    ('Note 9', '![An image](https://via.placeholder.com/150)\n\nThis is an image.'),
]


for i in init_data:
    insert_note_data(cur, i[0], i[1])

connection.commit()
connection.close()
