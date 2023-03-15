#!/user/pin/python
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from data import data


file_name = __name__


def connect_to_db():
    conn = sqlite3.connect("database.db")
    return conn


def drop_students(sefl):
    try:
        conn = connect_to_db()
        conn.execute("DROP TABLE IF EXISTS students")
        conn.commit()
    except:
        print("error")
    finally:
        conn.close()


def create_db_table():
    try:
        conn = connect_to_db()
        conn.execute(
            """
                CREATE TABLE IF NOT EXISTS students(
                    name VARCHAR(20) NOT NULL,
                    id INTEGER UNIQUE NOT NULL,
                    point INTEGER NOT NULL
                );
        """
        )

        conn.commit()
        print(f"{file_name}--{create_db_table.__name__}--SUCCESS")
    except sqlite3.Error as e:
        print(f"{file_name}--{create_db_table.__name__}--ERROR: {e}")
    finally:
        conn.close()


def insert_student(student):
    message = ""
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute(
            f'INSERT INTO students (name, id, point) VALUES (\'{student["name"]}\', {student["id"]}, {student["point"]});'
        )
        conn.commit()
        message = f"{file_name}--{insert_student.__name__}--SUCCESS"
    except sqlite3.Error as e:
        message = f"{file_name}--{insert_student.__name__}--ERROR: {e}"
        conn.rollback()
    finally:
        conn.close()

    print(message)
    return message


def get_students():
    students = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM students")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            student = {}
            student["name"] = i["name"]
            student["id"] = i["id"]
            student["point"] = i["point"]
            students.append(student)

        message = f"{file_name}--{get_students.__name__}--SUCCESS"
        print(message)

    except sqlite3.Error as e:
        message = f"{file_name}--{get_students.__name__}--ERROR: {e}"
        print(message)
        students = []
        return message
    return students


def get_student_by_id(id):
    student = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute(f"SELECT * FROM students WHERE id = {id}")
        row = cur.fetchone()
        # convert row object to dictionary
        if row:
            student["name"] = row["name"]
            student["id"] = row["id"]
            student["point"] = row["point"]
        message = f"{file_name}--{get_student_by_id.__name__}--SUCCESS"
        print(message)
    except sqlite3.Error as e:
        message = f"{file_name}--{get_student_by_id.__name__}--ERROR: {e}"
        print(message)
        student = {}
        return message

    return student


def update_student(student):
    message = ""
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute(
            f'UPDATE students SET name = \'{student["name"]}\', id = {student["id"]}, point = {student["point"]} WHERE id = {student["id"]};'
        )
        conn.commit()

        # updated_student = get_student_by_id(student["id"])
        message = f"{file_name}--{update_student.__name__}--SUCCESS"
    except sqlite3.Error as e:
        message = f"{file_name}--{update_student.__name__}--ERROR: {e}"
    finally:
        conn.close()

    print(message)
    return message


def delete_student(id):
    message = ""
    try:
        conn = connect_to_db()
        conn.execute(f"DELETE FROM students WHERE id = {id}")
        conn.commit()
        message = f"{file_name}--{delete_student.__name__}--SUCCESS"
    except sqlite3.Error as e:
        message = f"{file_name}--{delete_student.__name__}--ERROR: {e}"
        conn.rollback()
    finally:
        conn.close()
    print(message)
    return message


create_db_table()
for student in data:
    print(insert_student(student=student))
# drop_students()


# setting endpoints
api = Flask(__name__)
cors = CORS(
    api,
    resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}},
)
api.config["CORS_HEADERS"] = "Content-Type"

# CORS(api, support_credentials=True)


@api.route("/")
@cross_origin(supports_credentials=True)
def main():
    return "this is main page"


@api.route("/students", methods=["GET"])
@cross_origin(supports_credentials=True)
def getStudents():
    data = get_students()
    message = {}
    if isinstance(data, str):
        message["status"] = data
        print(f"{file_name}--{getStudents.__name__}--ERROR")
        return jsonify(message)
    elif data.__len__() == 0:
        message["status"] = f"{file_name}--{getStudents.__name__}--EMPTY"
        print(message["status"])
        return jsonify(message)
    # print(data)
    print(f"{file_name}--{getStudents.__name__}--SUCCESS")
    return jsonify(data)


@api.route("/students/id=<int:id>", methods=["GET"])
@cross_origin(supports_credentials=True)
def getStudent(id):
    data = get_student_by_id(id)
    message = {}
    if isinstance(data, str):
        message["status"] = f"{file_name}--{getStudent.__name__}--ERROR"
        print(message["status"])
        return jsonify(message)
    elif data.__len__() == 0:
        message["status"] = f"{file_name}--{getStudent.__name__}--EMPTY"
        print(message["status"])
        return jsonify(message)
    # print(data)
    print(f"{file_name}--{getStudent.__name__}--SUCCESS")
    return jsonify(data)


@api.route(
    "/students/insert",
    methods=["GET", "POST"],
)
@cross_origin(supports_credentials=True)
def insertStudent():
    student = request.get_json()
    message = {}
    if request.method == "POST":
        message["status"] = insert_student(student=student)
        print(f"{file_name}--{insertStudent.__name__}--SUCCESS")
        return jsonify(message)

    message["status"] = f"{file_name}--{insertStudent.__name__}--ERROR"
    print(message)
    return jsonify(message)


@api.route(
    "/students/update",
    methods=["GET", "POST"],
)
@cross_origin(supports_credentials=True)
def updateStudent():
    student = request.get_json()
    # print(updateStudent.__name__)
    # print(student)
    message = {}
    if request.method == "POST":
        message["status"] = update_student(student=student)
        print(f"{file_name}--{updateStudent.__name__}--SUCCESS")
        return jsonify(message)

    message["status"] = f"{file_name}--{deleteStudent.__name__}--ERROR"
    print(message)
    return jsonify(message)


@api.route(
    "/students/delete/id=<int:id>",
    methods=["GET", "DELETE"],
)
@cross_origin(supports_credentials=True)
def deleteStudent(id):
    message = {}
    if request.method == "DELETE":
        message["status"] = delete_student(id=id)
        print(f"{file_name}--{deleteStudent.__name__}--SUCCESS")
        return jsonify(message)

    message["status"] = f"{file_name}--{deleteStudent.__name__}--ERROR"
    print(message)
    return jsonify(message)
