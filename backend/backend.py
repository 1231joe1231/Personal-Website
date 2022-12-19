import logging
import time
import os
import sqlite3
from flask import Flask, request, abort, jsonify, redirect
from flask_cors import CORS
from werkzeug.utils import secure_filename

from utility import insert_note_data, insert_image_data, get_image_data, get_note_data, get_recent_image_data

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')
image_folder = '/home/ubuntu/images'
cwd = os.getcwd()
host = "https://joe-zhuang.com"
local_dev = True

ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif']

if os.environ['FLASK_ENV'] == 'dev':
    print('Running in development mode', flush=True)
else:
    print('Running in production mode', flush=True)
    local_dev = False


def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/notes', methods=['GET', 'POST'])
def notes():

    if request.method == 'GET':
        conn = get_db_connection()
        db_notes = get_note_data(conn)
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
        conn = get_db_connection()
        insert_note_data(conn, title, content)
        conn.commit()
        conn.close()
        response = jsonify({"message": "This note is added successfully!"})
        return response


def get_extension(filename):
    return filename.rsplit('.', 1)[1].lower()


def allowed_file(filename):
    return '.' in filename and get_extension(filename) in ALLOWED_EXTENSIONS


@app.route('/images', methods=['POST', 'GET'])
def images():
    if request.method == 'POST':
        # Redirect local request to remote server
        if local_dev:
            return redirect(host + '/api/images')
        else:
            # Upload images
            print(request.files, flush=True)
            if 'image' not in request.files:
                abort(400, 'Bad Request: no file attached')
            uploaded_file = request.files['image']
            if uploaded_file.filename == '':
                abort(400, 'Bad Request: file is empty')
            if uploaded_file and allowed_file(uploaded_file.filename):
                filename = secure_filename(uploaded_file.filename)
                print("cwd is "+cwd, flush=True)
                full_save_path = os.path.join(
                    cwd, image_folder, filename)
                print("full_save_path is "+full_save_path, flush=True)
                title = request.form['title']
                if len(title) == 0:
                    title = time.strftime("%H:%M:%S") + \
                        '.'+get_extension(filename)
                uploaded_file.save(full_save_path)
                uploaded_file.close()
                hosted_image_path = host + '/images/' + filename
                conn = get_db_connection()
                insert_image_data(conn, title, hosted_image_path)
                conn.commit()
                conn.close()
                return jsonify({"message": "This image is uploaded successfully", "path": hosted_image_path})

    elif request.method == 'GET':
        # Get all images
        conn = get_db_connection()
        db_images = get_image_data(conn)
        conn.close()
        images = []
        for note in db_images:
            note = dict(note)
            images.append(note)
        return images


@app.route("/images/recent", methods=['GET'])
def get_recent_images():
    count = request.args.get("count", default=5, type=int)
    conn = get_db_connection()
    db_images = get_recent_image_data(conn, count)
    conn.close()
    images = []
    for note in db_images:
        note = dict(note)
        images.append(note)
    return images


if __name__ == "__main__":
    app.run(host='0.0.0.0')
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
