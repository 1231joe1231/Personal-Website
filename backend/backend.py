import sqlite3
import markdown
from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/")
def hello_world():
    return "<p>Hello, World from Joe!</p>"


@app.route('/notes')
def index():
    conn = get_db_connection()
    db_notes = conn.execute(
        'SELECT id, created, content FROM notes;').fetchall()
    conn.close()

    notes = []
    for note in db_notes:
        note = dict(note)
        # Convert markdown to html
        # note['content'] = markdown.markdown(note['content'])
        notes.append(note)

    return notes


if __name__ == "__main__":
    app.run(host='0.0.0.0')
