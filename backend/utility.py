
def insert_note_data(connection, title, content):
    sql = "INSERT INTO notes (title, content) VALUES ('{0}','{1}')"
    connection.execute(sql.format(title, content))


def insert_image_data(connection, title, path):
    sql = "INSERT INTO images (title, path) VALUES ('{0}','{1}')"
    connection.execute(sql.format(title, path))


def get_note_data(connection):
    return connection.execute(
        'SELECT id, created, title, content FROM notes;').fetchall()


def get_image_data(connection):
    return connection.execute(
        'SELECT id, created, title, path FROM images;').fetchall()


def get_recent_image_data(connection, count):
    sql = "SELECT * FROM images ORDER BY created DESC LIMIT {0}"
    return connection.execute(sql.format(count)).fetchall()
