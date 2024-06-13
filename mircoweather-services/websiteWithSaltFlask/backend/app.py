from flask import Flask, render_template, request, redirect, url_for, session
import firebase_admin
from firebase_admin import credentials, auth, firestore
import re
import pyrebase
from keys.pyrebaseKey import pyrebaseConfig

def checkEmailCorrect(email):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if(re.fullmatch(regex, email)):
        return True
    else:
        return False


app= Flask(__name__)
cred = credentials.Certificate("./keys/mircoweather-dabdb-firebase-adminsdk-7rr76-0a2c0a6673.json")
firebase_admin.initialize_app(cred)
pyrebaseApp=pyrebase.initialize_app(pyrebaseConfig)
db=firestore.client()

@app.route("/")
def index():
    return render_template("mainPage.html")

@app.route("/register", methods=["POST","GET"])
def register():
    if request.method == 'POST':
        try:
            email=request.form.get("username-input")
            password=request.form.get("password-input1")
            passwordAgain=request.form.get("password-input2")
            if password==passwordAgain and len(password)>7 and len(passwordAgain)>7 and checkEmailCorrect(email) :
                #print(email,password,passwordAgain)
                user = auth.create_user(email=email,password=password)
                data={"email":email}
                db.collection("users").document(user.uid).set(data)
            return redirect(url_for("login"))
        except Exception as e :
            print("--------------------------------------")
            print(e)
            print("--------------------------------------")
            return redirect(url_for("register"))
        
        
    elif request.method == 'GET':
        return render_template("registerPage.html")

@app.route("/login", methods=["POST","GET"])
def login():
    if request.method == 'POST':
        try:
            email=request.form.get("username-input")
            password=request.form.get("password-input")
            logged_in_user=pyrebaseApp.auth().sign_in_with_email_and_password(email,password)
            session["logged_in"]=True
            session["token_id"]=logged_in_user["idToken"]
            session["username"]=logged_in_user["email"]
            session["uid"]=auth.get_user_by_email(logged_in_user["email"]).uid
            return redirect(url_for("user"))
        except Exception as e:
            print(e)
            return redirect(url_for("login"))
        
    elif request.method == 'GET':
        return render_template("loginPage.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

@app.route("/user")
def user():
    if session:
        print(session["uid"])
        return render_template("userPage.html")
    else:
        return redirect(url_for("login"))

@app.route("/changeInformation", methods=["POST"])
def changeInformation():
    email=request.form.get("email-area-input")
    phoneNumber=request.form.get("phone-number-area-input")
    notificationType=request.form.get("type-selection-select")
    if checkEmailCorrect(email) and len(phoneNumber)==13 and (notificationType is not None):
        db.collection("users").document(session["uid"]).update({"emailForNotification":email,"phoneNumber":phoneNumber,"notificationType":notificationType,"premium":False})
    else:
        #add flash try again
        pass
    return redirect(url_for("user"))

@app.route("/changeLocation", methods=["POST"])
def changeLocation():
    location=request.form.get("location-display-label")
    if location is not None:
        db.collection("users").document(session["uid"]).update({"location":location})
        db.collection("cities").document(location).collection("users").document(session["uid"]).set({"uid":session["uid"]})
    else:
        #add flash message try again
        pass
    return redirect(url_for("user"))

@app.route("/changePassword", methods=["POST"])
def changePassword():
    newPassword=request.form.get("new-password-input")
    if len(newPassword)>7:
        auth.update_user(session["uid"],password=newPassword)
        return redirect(url_for("login"))
    else:
        #flash başarısız
        return redirect(url_for("user"))

if __name__=="__main__":
    app.secret_key = 'sukulent'
    app.run(debug=True, port=2000)






