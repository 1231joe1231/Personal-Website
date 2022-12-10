import sqlite3
import markdown
from flask import Flask, request, abort, make_response
from flask_cors import CORS

from utility import insert_note_data

app = Flask(__name__)
CORS(app, origins='http://155.138.129.234')


def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/notes', methods=['GET', 'POST'])
def index():
    conn = get_db_connection()

    if request.method == 'GET':
        db_notes = conn.execute(
            'SELECT id, created, title, content FROM notes;').fetchall()
        conn.close()

        notes = []
        for note in db_notes:
            note = dict(note)
            # Convert markdown to html
            # note['content'] = markdown.markdown(note['content'])
            notes.append(note)

        return notes
    elif request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        print("title is %s, content is %s" % (title, content))
        if not len(title) == 0 and len(content) == 0:
            abort(400)
        try:
            insert_note_data(conn, title, content)
        except sqlite3.OperationalError:
            abort(500)
        conn.commit()
        conn.close()
        response = make_response()
        response.status_code = 200
        return response


if __name__ == "__main__":
    app.run(host='0.0.0.0')
