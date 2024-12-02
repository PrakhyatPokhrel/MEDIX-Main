import sqlite3

DATABASE = 'users.db'

def init_db():
    conn = sqlite3.connect(DATABASE)
    conn.execute('''CREATE TABLE IF NOT EXISTS users
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                     username TEXT NOT NULL,
                     password TEXT NOT NULL);''')
    # Add a demo user
    conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', ('testuser', 'testpass'))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print('Database initialized.')
