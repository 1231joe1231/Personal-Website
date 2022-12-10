
def insert_note_data(connection, title, content):
    sql = "INSERT INTO notes (title, content) VALUES ('{0}','{1}')"
    connection.execute(sql.format(title, content))
