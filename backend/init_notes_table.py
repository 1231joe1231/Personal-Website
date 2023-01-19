import sqlite3

from utility import insert_note_data

connection = sqlite3.connect('database.db')

connection.executescript(
    '''DROP TABLE IF EXISTS notes;
    CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type INTEGER NOT NULL);''')

cur = connection.cursor()

# 0 for note, 1 for article
init_data = [
    ('Note 1', '# The First Note\n\nThis is a **bold** note.', 0),
    ('Note 2', '_Another note_\n\nThis is an _italic_ note.', 0),
    ('Note 3', 'Visit [this page](https://www.digitalocean.com/community/tutorials) for more tutorials.\n\nThis is a link to a page.', 0),
    ('Note 4', '1. Item 1\n2. Item 2\n3. Item 3\n\nThis is a numbered list.', 0),
    ('Note 5', '- Item 1\n- Item 2\n- Item 3\n\nThis is a bullet point list.', 0),
    ('Note 6', '> This is a blockquote.\n\nThis is a quote from someone else.', 0),
    ('Article 1', '```\nprint("This is a code block.")\n```\n\nThis is a code block.', 1),
    ('Article 2', '# This is a heading\n\nThis is a paragraph.', 1),
    ('Article 3',
     '![An image](https://via.placeholder.com/150)\n\nThis is an image.', 1),
]


for i in init_data:
    insert_note_data(cur, i[0], i[1], i[2])

connection.commit()
connection.close()
