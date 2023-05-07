from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import jwt
from SpamDetation import check_spam
import smtplib
import time
import threading

# from inbox import getMails
import firebase_admin
from firebase_admin import credentials, db


try:
    cred = credentials.Certificate("./firebase/firebaseconfig.json")
    firebase_admin.initialize_app(
        cred,
        {
            "databaseURL": "https://sem7-project-default-rtdb.firebaseio.com",
        },
    )
    ref = db.reference()
except Exception as e:
    print(e)
    print("Error connecting firebase")


app = Flask(__name__)
app.secret_key = "iamfuckingcreazy"
# session configuration
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
# cors config
CORS(app)
# getting date and time
date = datetime.now()
date = date.strftime("%d-%m-%Y,%H:%M:%S")


@app.route("/register", methods=["POST"])
def register():
    if request.method == "POST":
        data = request.get_json()
        # name = data["name"]
        email = data["email"]
        # password = data["password"]

        temp = email.split("@")
        temp_user = temp[0]
        try:
            if ref.child("users").child(temp_user).get() is None:
                ref.child("users").child(temp_user).set(
                    {
                        # "name": name,
                        "username": temp_user,
                        "email": email,
                        # "password": password,
                    }
                )

                return jsonify(
                    {
                        "status": True,
                        "message": "User created successfully",
                        "code": "Success",
                    }
                )
            else:
                return jsonify(
                    {"status": False, "message": "User already exists", "code": "Error"}
                )
        except Exception as e:
            return jsonify(
                {
                    "status": False,
                    "message": "Error creating user: {}".format(e),
                    "code": "Error",
                }
            )


@app.route("/login", methods=["Post"])
def login():
    if request.method == "POST":
        data = request.get_json()
        email = data["email"]
        password = data["password"]
        lst = email.split("@")
        print(data)
        try:
            serverdata = ref.child("users").child(lst[0]).get()
            serverUsername = serverdata["email"]
            serverPassword = serverdata["password"]
            print(serverdata)
            if serverUsername == email and serverPassword == password:
                return jsonify(
                    {
                        "status": True,
                        "message": "Login successful",
                        "code": "Success",
                        "token": jwt.encode(
                            {
                                "user": serverUsername,
                                "exp": datetime.utcnow() + timedelta(hours=12),
                            },
                            app.secret_key,
                        ),
                        "data": serverdata,
                    }
                )
            else:
                return jsonify(
                    {"status": False, "message": "Login Failed", "code": "Error"}
                )
        except Exception as e:
            return jsonify(
                {
                    "status": False,
                    "message": "Error while log in : {}".format(e),
                    "code": "Error",
                }
            )


@app.route("/smtpConfig", methods=["POST"])
def smtpConfig():
    if request.method == "POST":
        data = request.get_json()
        host = data["host"]
        port = data["port"]
        username = data["username"]
        password = data["password"]
        user = data["email"]
        user = user.split("@")
        email = user[0]
        print(host, port, username, password, email)
        try:
            ref.child("users").child(email).child("smtpConfig").set(
                {
                    "host": host,
                    "port": port,
                    "username": username,
                    "password": password,
                }
            )

            return jsonify(
                {
                    "status": True,
                    "message": "SMTP Configured",
                    "code": "Success",
                    "data": data,
                }
            )
        except Exception as e:
            print(e)
            return jsonify(
                {
                    "status": False,
                    "message": "Error while configuring SMTP : {}".format(e),
                    "code": "Error",
                }
            )


@app.route("/getSmtpConfig", methods=["POST"])
def getSmtpConfig():
    if request.method == "POST":
        data = request.get_json()
        user = data["email"]
        user = user.split("@")
        email = user[0]
        try:
            serverdata = ref.child("users").child(email).child("smtpConfig").get()
            if serverdata is None:
                return jsonify(
                    {"data": {"host": "", "port": "", "username": "", "password": ""}}
                )
            else:
                return jsonify(
                    {
                        "status": True,
                        "message": "SMTP Configured",
                        "code": "Success",
                        "data": serverdata,
                    }
                )
        except Exception as e:
            print(e)
            return jsonify(
                {
                    "status": False,
                    "message": "Error while configuring SMTP : {}".format(e),
                    "code": "Error",
                }
            )


@app.route("/contactList", methods=["POST"])
def contactList():
    if request.method == "POST":
        data = request.get_json()
        list = data["rows"]
        user = data["email"]
        filename = data["filename"]
        email = user.split("@")
        user = email[0]
        contacts = []
        print("***********")
        print(list, user)
        for i in list:
            contacts.extend(i)
        try:
            ref.child("users").child(user).child("contactList").child(filename).set(
                contacts
            )
            print(contacts)
            return jsonify(
                {
                    "status": True,
                    "message": "Created successful",
                    "code": "Success",
                }
            )
        except Exception as e:
            print(e)
            return jsonify(
                {
                    "status": False,
                    "message": "Error while creating contact list : {}".format(e),
                    "code": "Error",
                }
            )


@app.route("/getContactList", methods=["POST"])
def getContactList():
    if request.method == "POST":
        data = request.get_json()
        user = data["email"]
        email = user.split("@")
        user = email[0]
        print(user)
        try:
            serverdata = ref.child("users").child(user).child("contactList").get()
            list = []
            for i, j in serverdata.items():
                list.append(i)
            print(list)
            return jsonify(
                {
                    "status": True,
                    "message": "Created successful",
                    "code": "Success",
                    "data": list,
                }
            )
        except Exception as e:
            print(e)
            return jsonify(
                {
                    "status": False,
                    "message": "Error while creating contact list : {}".format(e),
                    "code": "Error",
                }
            )


@app.route("/checkSpam", methods=["POST"])
def checkSpam():
    if request.method == "POST":
        data = request.get_json()
        body = data["message"]
        print(body)
        if check_spam(body):
            return jsonify({"status": 200})
        else:
            return jsonify({"status": 400})


@app.route("/composemail", methods=["POST"])
def sendmail():
    if request.method == "POST":
        try:
            data = request.get_json()
            singlemail = data["to"]
            user = data["email"].split("@")[0]
            subject = data["subject"]
            body = data["message"]
            contact_list = data["file"]
            host = data["host"]
            port = int(data["port"])
            username = data["username"]
            password = data["password"]
            date = data["date"]
            type = data["type"].split(" ")
            body = BeautifulSoup(body, "html.parser")
            body = body.get_text()
            contact_list = (
                ref.child("users")
                .child(user)
                .child("contactList")
                .child(contact_list)
                .get()
            )

            server = smtplib.SMTP(host, port)
            server.ehlo()
            server.starttls()
            server.login(username, password)
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = "<{}>".format(username)
            html = (
                """\
                """
                + body
                + """
                """
            )
            part = MIMEText(html, "html")
            msg.attach(part)
            if type[1] == "Message":
                server.sendmail(username, singlemail, msg.as_string())
                server.quit()
                ref.child("users").child(user).child("sent").push(
                    {
                        "to": singlemail,
                        "subject": subject,
                        "body": body,
                        "date": date,
                        "type": type[1],
                        "clist": contact_list,
                    }
                )
                return jsonify(
                    {
                        "status": True,
                        "message": "Mail sent successfully",
                        "code": "Success",
                    }
                )
            elif type[1] == "BCC":
                server.sendmail(username, contact_list, msg.as_string())
                server.quit()
                ref.child("users").child(user).child("sent").push(
                    {
                        "to": singlemail,
                        "subject": subject,
                        "body": body,
                        "date": date,
                        "type": type[1],
                        "clist": contact_list,
                    }
                )
                return jsonify(
                    {
                        "status": True,
                        "message": "Mail sent successfully",
                        "code": "Success",
                    }
                )
            elif type[1] == "CC":
                server.sendmail(username, contact_list, msg.as_string())
                server.quit()
                ref.child("users").child(user).child("sent").push(
                    {
                        "to": singlemail,
                        "subject": subject,
                        "body": body,
                        "date": date,
                        "type": type[1],
                        "clist": contact_list,
                    }
                )
                return jsonify(
                    {
                        "status": True,
                        "message": "Mail sent successfully",
                        "code": "Success",
                    }
                )

        except Exception as e:
            print(e)
            return jsonify(
                {
                    "status": False,
                    "message": "Error while sending mail",
                    "code": "Error",
                }
            )

    else:
        return jsonify(
            {
                "status": False,
                "message": "Error while sending mail",
                "code": "Error",
            }
        )


if __name__ == "__main__":
    app.run(debug=True)
