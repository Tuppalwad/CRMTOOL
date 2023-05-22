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


@app.route("/feedback", methods=["POST"])
def feedback():
    if request.method == "POST":
        try:
            data = request.get_json()
            email = data["email"].split("@")[0]
            message = data["message"]
            rating = data["rating"]
            feedback = data["feedback"]
            id = ref.child("spamMails").child(email).get()
            if id == None:
                id = 0
            else:
                id = len(id)
            ref.child("spamMails").child(email).child(str(id)).set(
                {
                    "message": message,
                    "rating": rating,
                    "feedback": feedback,
                }
            )
            return jsonify({"message": "Success"})
        except Exception as e:
            print(e)
            return jsonify({"message": "faild"})
    else:
        return


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
                        "username": temp_user,
                        "email": email,
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
        try:
            serverdata = ref.child("users").child(lst[0]).get()
            serverUsername = serverdata["email"]
            serverPassword = serverdata["password"]
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
        datetimes = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        list.append([datetimes])

        try:
            ref.child("users").child(user).child("contactList").child(filename).set(
                list
            )

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
        try:
            serverdata = ref.child("users").child(user).child("contactList").get()
            list_date = []
            for i in serverdata:
                x = (
                    ref.child("users")
                    .child(user)
                    .child("contactList")
                    .child(i)
                    .get()[-1]
                )
                list_date.append([i, " ".join(x)])

            return jsonify(
                {
                    "status": True,
                    "message": "Created successful",
                    "code": "Success",
                    "data": list_date,
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
            type = data["type"].split(" ")
            condition = data["condition"]
            body = BeautifulSoup(body, "html.parser")
            body = body.get_text()
            countofmailsend = 0
            meargeClist = []
            allmails = []
            topitem = (
                ref.child("users")
                .child(user)
                .child("contactList")
                .child(contact_list[0])
                .get()[0]
            )

            for i in contact_list:
                for j in (
                    ref.child("users")
                    .child(user)
                    .child("contactList")
                    .child(i)
                    .get()[1:-1]
                ):
                    meargeClist.append(j)
                    allmails.append(j[1])

            contact_list = meargeClist
            server = smtplib.SMTP(host, port)
            server.ehlo()
            server.starttls()
            server.login(username, password)
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = "<{}>".format(username)

            if type[1] == "Message":
                html = (
                    """\
                    """
                    + body
                    + """
                    """
                )
                part = MIMEText(html, "html")
                msg.attach(part)
                server.sendmail(username, singlemail, msg.as_string())

                count = ref.child("users").child(user).child("inbox").get()
                if count is None:
                    count = 0
                else:
                    count = len(count)

                ref.child("users").child(user).child("inbox").child(str(count)).set(
                    {
                        "to": singlemail,
                        "subject": subject,
                        "body": body,
                        "date": date,
                        "type": type[1],
                    }
                )
                countofmailsend += 1

                server.quit()
                return jsonify(
                    {
                        "status": True,
                        "message": "Mail sent successfully",
                        "code": "Success",
                        "count": countofmailsend,
                    }
                )
            elif type[1] == "BCC":
                list_of_emails = []
                for i in contact_list:
                    message = ""
                    for j in range(2, len(i)):
                        list_of_emails.append(i[1])
                        message += topitem[j] + ":" + str(i[j])
                        message += "\n"
                    if condition == "Below 50%" and i[-1] < 50:
                        html = (
                            """\
                        """
                            + body
                            + message
                            + """
                        """
                        )

                        part = MIMEText(html, "html")
                        msg.attach(part)

                        server.sendmail(username, i[1], msg.as_string())
                        count = ref.child("users").child(user).child("inbox").get()
                        if count is None:
                            count = 0
                        else:
                            count = len(count)
                        ref.child("users").child(user).child("inbox").child(
                            str(count)
                        ).set(
                            {
                                "subject": subject,
                                "body": body,
                                "date": date,
                                "type": type[1],
                                "clist": contact_list + [singlemail],
                            }
                        )
                        countofmailsend += 1

                    elif condition == "Above 50%" and i[-1] > 50:
                        html = (
                            """\
                        """
                            + body
                            + message
                            + """
                        """
                        )

                        part = MIMEText(html, "html")
                        msg.attach(part)

                        server.sendmail(username, i[1], msg.as_string())
                        count = ref.child("users").child(user).child("inbox").get()
                        if count is None:
                            count = 0
                        else:
                            count = len(count)
                        ref.child("users").child(user).child("inbox").child(
                            str(count)
                        ).set(
                            {
                                "subject": subject,
                                "body": body,
                                "date": date,
                                "type": type[1],
                                "clist": contact_list + [singlemail],
                            }
                        )
                        countofmailsend += 1

                    elif condition == "Not attempt" and i[-1] == 0:
                        html = (
                            """\
                        """
                            + body
                            + message
                            + """
                        """
                        )

                        part = MIMEText(html, "html")
                        msg.attach(part)

                        server.sendmail(username, i[1], msg.as_string())

                        count = ref.child("users").child(user).child("inbox").get()
                        if count is None:
                            count = 0
                        else:
                            count = len(count)
                        ref.child("users").child(user).child("inbox").child(
                            str(count)
                        ).set(
                            {
                                "subject": subject,
                                "body": body,
                                "date": date,
                                "type": type[1],
                                "clist": contact_list + [singlemail],
                            }
                        )
                        countofmailsend += 1

                    elif condition == str(condition).isnumeric() and i[-1] < condition:
                        html = (
                            """\
                        """
                            + body
                            + message
                            + """
                        """
                        )

                        part = MIMEText(html, "html")
                        msg.attach(part)

                        count = ref.child("users").child(user).child("inbox").get()
                        if count is None:
                            count = 0
                        else:
                            count = len(count)
                        ref.child("users").child(user).child("inbox").child(
                            str(count)
                        ).set(
                            {
                                "subject": subject,
                                "body": body,
                                "date": date,
                                "type": type[1],
                                "clist": contact_list + [singlemail],
                            }
                        )
                        countofmailsend += 1

                    server.quit()
                    return jsonify(
                        {
                            "status": True,
                            "message": "Mail sent successfully",
                            "code": "Success",
                            "count": str(countofmailsend),
                        }
                    )

            elif type[1] == "CC":
                list_of_emails = []
                for i in contact_list:
                    message = ""
                    countofmailsend = 0
                    for j in range(2, len(i)):
                        list_of_emails.append(i[1])
                        message += topitem[j] + ":" + str(i[j])
                        message += "\n"

                    html = (
                        """\
                    """
                        + body
                        + message
                        + """
                    """
                    )
                    part = MIMEText(html, "html")
                    msg.attach(part)
                    msg["To"] = singlemail
                    msg["Cc"] = ",".join(allmails)

                    if server.sendmail(username, i[1], msg.as_string()):
                        # server.sendmail(username, i[1], msg.as_string())
                        count = len(ref.child("users").child(user).child("inbox").get())
                        ref.child("users").child(user).child("inbox").child(count).set(
                            {
                                "subject": subject,
                                "body": body,
                                "date": date,
                                "type": type[1],
                                "clist": contact_list + [singlemail],
                            }
                        )
                        countofmailsend += 1
                    else:
                        continue
                server.quit()
                return jsonify(
                    {
                        "status": True,
                        "message": "Mail sent successfully",
                        "code": "Success",
                        "count": countofmailsend,
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


@app.route("/deleteclist", methods=["DELETE"])
def deletecontactlist():
    if request.method == "DELETE":
        data = request.get_json()
        clist = data["clist"]
        user = data["email"].split("@")[0]
        try:
            ref.child("users").child(user).child("contactList").child(clist).delete()
            data = ref.child("users").child(user).child("contactList").get()
            return jsonify(
                {
                    "status": True,
                    "message": "Deleted successful",
                    "code": "Success",
                    "data": data,
                }
            )
        except Exception as e:
            print(e)
            return jsonify(
                {
                    "status": False,
                    "message": "Error while deleting contact list : {}".format(e),
                    "code": "Error",
                }
            )


@app.route("/getbirthdyadata", methods=["POST"])
def getbirthdyadata():
    if request.method == "POST":
        data = request.get_json()
        user = data["email"].split("@")[0]
        try:
            data = (
                ref.child("users")
                .child(user)
                .child("contactList")
                .child("BirthdayList")
                .get()
            )
            newlist = []
            dates = []
            for i in data[1:-1]:
                if i[5].split("T")[0] == datetime.now().strftime("%Y-%m-%d"):
                    newlist.append(i)
                dates.append(i[5].split("T")[0])

            return jsonify(
                {
                    "status": True,
                    "message": "Success",
                    "code": "Success",
                    "data": newlist,
                    "dates": dates,
                    "date": datetime.now().strftime("%Y-%m-%d"),
                }
            )
        except Exception as e:
            print(e)
            return jsonify(
                {
                    "status": False,
                    "message": "Error while getting birthday data : {}".format(e),
                    "code": "Error",
                }
            )


# send birthday mail
@app.route("/sendBirthdayMail", methods=["GET"])
def sendBirthdayMail():
    if request.method == "GET":
        try:
            data = list(ref.child("users").get().keys())

            listofusers = []
            listofmailssend = []
            for i in data:
                x = (
                    ref.child("users")
                    .child(i)
                    .child("contactList")
                    .child("BirthdayList")
                    .get()
                )
                if x is None:
                    continue
                else:
                    email = []
                    for j in x[1:-1]:
                        if j[5].split("T")[0] == datetime.now().strftime("%Y-%m-%d"):
                            email.append(j[6])
                    listofusers.append([i, email])

            for i in listofusers:
                for j in i[1]:
                    data = ref.child("users").child(i[0]).child("smtpConfig").get()
                    host = data["host"]
                    port = data["port"]
                    username = data["username"]
                    password = data["password"]
                    server = smtplib.SMTP(host, port)
                    server.ehlo()
                    server.starttls()
                    server.login(username, password)
                    msg = MIMEMultipart("alternative")
                    msg["Subject"] = "Happy Birthday"
                    msg["From"] = "<{}>".format(username)
                    html = (
                        """\
                        """
                        + "Happy Birthday"
                        + """
                        """
                    )
                    part = MIMEText(html, "html")
                    msg.attach(part)
                    server.sendmail(username, j, msg.as_string())
                    listofmailssend.append(j)
                    server.quit()
            return jsonify(
                {
                    "status": True,
                    "message": "Mail sent successfully",
                    "code": "Success",
                    "list": listofmailssend,
                }
            )
        except Exception as e:
            print(e)
            return jsonify(
                {
                    "status": False,
                    "message": "Error while sending birthday mail : {}".format(e),
                    "code": "Error",
                }
            )


# send mail less attendenc stuendt to parents
@app.route("/sendlessattendencemail", methods=["POST"])
def sendlessattendencemail():
    if request.method == "POST":
        try:
            data = request.get_json()
            user = data["email"].split("@")[0]
            subject = data["subject"]
            body = data["message"]
            contact_list = data["file"]
            condition = data["condition"]
            body = BeautifulSoup(body, "html.parser")
            body = body.get_text()
            meargeClist = (
                ref.child("users")
                .child(user)
                .child("contactList")
                .child(contact_list)
                .get()[1:-1]
            )

            if condition == "Below 40%":
                for i in meargeClist:
                    if i[-1] < 40:
                        data = ref.child("users").child(user).child("smtpConfig").get()
                        host = data["host"]
                        port = data["port"]
                        username = data["username"]
                        password = data["password"]
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
                        server.sendmail(username, i[1], msg.as_string())
                        server.quit()
                        return jsonify(
                            {
                                "status": True,
                                "message": "Mail sent successfully",
                                "code": "Success",
                            }
                        )

            elif condition == "Below 50%":
                for i in meargeClist:
                    if i[-1] < 50:
                        data = ref.child("users").child(user).child("smtpConfig").get()
                        host = data["host"]
                        port = data["port"]
                        username = data["username"]
                        password = data["password"]
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
                        server.sendmail(username, i[1], msg.as_string())
                        server.quit()
                        return jsonify(
                            {
                                "status": True,
                                "message": "Mail sent successfully",
                                "code": "Success",
                            }
                        )

            elif condition == "Below 60%":
                for i in meargeClist:
                    if i[-1] < 60:
                        data = ref.child("users").child(user).child("smtpConfig").get()
                        host = data["host"]
                        port = data["port"]
                        username = data["username"]
                        password = data["password"]
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
                        server.sendmail(username, i[1], msg.as_string())
                        server.quit()
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


# get inbox from database


@app.route("/inbox", methods=["POST"])
def getallmails():
    if request.method == "POST":
        data = request.get_json()
        user = data["email"].split("@")[0]
        emails = ref.child("users").child(user).child("inbox").get()
        return jsonify({"status": True, "email": emails})
    else:
        return jsonify(
            {
                "Error": "something went wrong",
            }
        )


@app.route("/serchemails", methods=["POST"])
def serchmails():
    if request.method == "POST":
        data = request.get_json()

        text = data["text"]
        user = data["email"].split("@")[0]
        print(text, user)
        email = ref.child("users").child(user).child("inbox").get()
        filtered_data = list(filter(lambda d: d["subject"] == text, email))
        return jsonify({"email": filtered_data})
    else:
        return jsonify({"error": "something wrong"})


# # serch emails
# @app.route("/serchemails", methods="POST")
# def findMails():
#     if request.method == "POST":
#         data = request.get_json()
#         text = data["text"]
#         user = data["email"].split("@")[0]
#         emails = ref.child("users").child(user).child("inbox").get()
#         filtered_data = list(filter(lambda d: d["subject"] == text, emails))
#         return jsonify({"data": filtered_data})
#     else:
#         return jsonify({"error": "some thing went wrong"})


if __name__ == "__main__":
    # ref.child("users").child("vtuppalwad").child("contactList").delete()
    # sendBirthdayMail()

    app.run(debug=True)
