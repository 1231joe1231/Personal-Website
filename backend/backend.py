import logging
import sqlite3
from flask import Flask, request, abort, make_response
from flask_cors import CORS

from utility import insert_note_data

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')


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
        title = request.json['title']
        content = request.json['content']
        print("title is %s, content is %s" % (title, content))
        if not len(title) == 0 and len(content) == 0:
            abort(400)
        insert_note_data(conn, title, content)
        conn.commit()
        conn.close()
        response = make_response()
        response.status_code = 200
        return response


if __name__ == "__main__":
    app.run(host='0.0.0.0')
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
