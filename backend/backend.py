import logging
import time
import os
import sqlite3
from flask import Flask, request, abort, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

from utility import insert_note_data, insert_image_data

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')
image_folder = 'images'
cwd = os.getcwd()
host = "https://joe-zhuang.com"
ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif']


def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/notes', methods=['GET', 'POST'])
def notes():
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
            abort(400, 'Bad Request: empty title or content')
        insert_note_data(conn, title, content)
        conn.commit()
        conn.close()
        response = jsonify({"message": "This note is added successfully!"})
        return response


def get_extension(filename):
    return filename.rsplit('.', 1)[1].lower()


def allowed_file(filename):
    return '.' in filename and get_extension(filename) in ALLOWED_EXTENSIONS


@app.route('/images/upload', methods=['POST'])
def images():
    if request.method == 'POST':
        print(request.files, flush=True)
        if 'image' not in request.files:
            abort(400, 'Bad Request: no file attached')
        uploaded_file = request.files['image']
        if uploaded_file.filename == '':
            abort(400, 'Bad Request: file is empty')
        if uploaded_file and allowed_file(uploaded_file.filename):
            filename = secure_filename(uploaded_file.filename)
            print("cwd is "+cwd)
            full_save_path = os.path.join(
                cwd, image_folder, filename)
            print("full_save_path is "+full_save_path)
            title = request.form['title']
            if len(title) == 0:
                title = time.strftime("%H:%M:%S") + '.'+get_extension(filename)
            uploaded_file.save(full_save_path)
            uploaded_file.close()
            hosted_image_path = host + '/' + filename
            conn = get_db_connection()
            insert_image_data(conn, title, hosted_image_path)
            conn.commit()
            conn.close()
            return jsonify({"message": "This image is uploaded successfully", "path": hosted_image_path})


if __name__ == "__main__":
    app.run(host='0.0.0.0')
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
