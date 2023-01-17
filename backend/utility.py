
def insert_note_data(connection, title, content, type):
    sql = "INSERT INTO notes (title, content, type) VALUES ('{0}','{1}',{2})"
    connection.execute(sql.format(title, content, type))


def insert_image_data(connection, title, path):
    sql = "INSERT INTO images (title, path) VALUES ('{0}','{1}')"
    connection.execute(sql.format(title, path))


def get_note_data(connection):
    return connection.execute(
        'SELECT id, created, title, content, type FROM notes;').fetchall()


def get_image_data(connection):
    return connection.execute(
        'SELECT id, created, title, path FROM images;').fetchall()


def get_recent_image_data(connection, count):
    sql = "SELECT * FROM images ORDER BY created DESC LIMIT {0}"
    return connection.execute(sql.format(count)).fetchall()
