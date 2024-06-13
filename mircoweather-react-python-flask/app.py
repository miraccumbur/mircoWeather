import re
import firebase_admin
import pyrebase
import requests
import time
from flask import Flask,request
from flask_cors import CORS,cross_origin
from firebase_admin import credentials, auth, firestore
from keys.pyrebaseKey import pyrebaseConfig
from functions.emailOperations import checkEmailCorrect
from functions.jwtOperations import encodeToken, decodeToken

app= Flask(__name__, static_folder='frontend/build',static_url_path='')
CORS(app)

cred = credentials.Certificate("./keys/mircoweather-dabdb-firebase-adminsdk-7rr76-0a2c0a6673.json")
firebase_admin.initialize_app(cred)
pyrebaseApp=pyrebase.initialize_app(pyrebaseConfig)
db=firestore.client()
cities=[]

def getCityList():
    citiesListFromDb=db.collection('cities').stream()
    for city in citiesListFromDb:
        #print(city.id)
        cities.append(city.id)

getCityList()

@app.route('/userAuthorizationControl', methods=["POST"])
@cross_origin()
def userAuthorizationControl():
    if request.method=="POST":
        try:
            data=request.get_json()
            returningValue=decodeToken(data["token"])
            return {
                "value":returningValue
            }
        except Exception as e:
            return e

@app.route('/getCityList')
@cross_origin()
def returnCityList():
    try:
        return {
            "code":200,
            "list":cities
        }
    except Exception as e:
        return {
            "code":200,
            "list":str(e)
        }
@app.route('/getWeather', methods=["POST"])
@cross_origin()
def getWeather():
    if request.method=="POST":
        try:
            data=request.get_json()
            if data["city"] in cities:
                weather={}
                weather["current"]=db.collection("weather").document(data["city"]).collection("current").document("current").get().to_dict()
                weather["daily"]=[
                    db.collection("weather").document(data["city"]).collection("daily").document("today").get().to_dict(),
                    db.collection("weather").document(data["city"]).collection("daily").document("tomorrow").get().to_dict(),
                    db.collection("weather").document(data["city"]).collection("daily").document("afterTomorrow").get().to_dict()
                ]
                weather["hourly"]=[]
                for i in range(48):
                    weather["hourly"].append(db.collection("weather").document(data["city"]).collection("hourly").document(str(i)+":00").get().to_dict())
            else:
                raise Exception("City is not found.")
            return {
                "code":200,
                "weather":weather
            }
        except Exception as e:
            return e

@app.route('/')
@cross_origin()
def mainPage():
    return app.send_static_file('index.html')

@app.route('/weather')
@cross_origin()
def weatherPage():
    return app.send_static_file('index.html')

@app.route('/signin', methods=["POST","GET"])
@cross_origin()
def signInPage():
    if request.method=="GET" :
        try:
            return app.send_static_file('index.html')
        except:
            return ""
    elif request.method=="POST" :
        try:
            data=request.get_json()
            if data["name"]!="" and data["surname"]!="" and data["mail"]!="" and len(data["password"])>7 and data["password"]==data["passwordAgain"] :
                user = auth.create_user(email=data["mail"],password=data["password"])
                data["uid"]=user.uid
                data["premium"]=False
                data.pop("passwordAgain")
                data.pop("password")
                db.collection("users").document(user.uid).set(data)
                return {
                    "code":200,
                    "message":"success"
                }
            else:
                raise Exception("Input data is wrong.")
        except Exception as e:
            return {
                    "code":400,
                    "message":str(e)
                }
    
        
@app.route('/login', methods=["POST","GET"])
@cross_origin()
def logInPage():
    if request.method=="GET" :
        try:
            return app.send_static_file('index.html')
        except:
            return ""
    elif request.method=="POST" :  
        try:
            data=request.get_json()
            if not checkEmailCorrect(data["mail"]) :
                raise Exception("Email is wrong.")
            elif len(data["password"])<8:
                raise Exception("Password is wrong.")
            else:
                logged_in_user=pyrebaseApp.auth().sign_in_with_email_and_password(data["mail"],data["password"])
                token=encodeToken(logged_in_user)
                userInfo=db.collection("users").document(logged_in_user["localId"]).get().to_dict()
                userInfo["token"]=token
                return{
                    "code":200,
                    "message":"success",
                    "userInfo":userInfo
                }

        except requests.exceptions.HTTPError as e:
            response = e.args[0].response
            error = response.json()['error']
            error=error["message"]
            return {
                    "code":400,
                    "message":error
                }
        except Exception as e:
            return {
                    "code":400,
                    "message":str(e)
                }

@app.route("/changeInformation", methods=["POST"])
@cross_origin()
def changeInformation():
    try:
        data=request.get_json()
        if checkEmailCorrect(data["notificationail"]) and len(data["notificationPhoneNumber"])==12:
            db.collection("users").document(data["uid"]).update({"emailForNotification":data["notificationail"],"phoneNumber":"+"+data["notificationPhoneNumber"],"notificationType":data["notificationType"]})
            return {
                "code":200,
                "message":"success"
            }
        else:
            raise Exception("Input data is wrong.")
    except Exception as e:
        return {
            "code":400,
            "message":str(e)
        }
    

@app.route("/changeLocation", methods=["POST"])
@cross_origin()
def changeLocation():
    data=request.get_json()
    try:
        if data["location"] is not None:
            db.collection("users").document(data["uid"]).update({"location":data["location"]})
            db.collection("cities").document(data["location"]).collection("users").document(data["uid"]).set({"uid":data["uid"]})
        else:
            raise Exception("Location is not found.")
        return {
            "code":200,
            "message":"success"
        }
    except Exception as e:
        print(e)
        return {
            "code":400,
            "message":str(e)
        }


@app.route("/changePassword", methods=["POST"])
@cross_origin()
def changePassword():
    try:
        data=request.get_json()
        if len(data["newPassword"])>7 and data["newPassword"]==data["newPasswordAgain"]:
            auth.update_user(data["uid"],password=data["newPassword"])
            return {
                "code":200,
                "message":"success"
            }
        else:
            raise Exception("Password is wrong.")
    except Exception as e:
        return {
            "code":400,
            "message":str(e)
        }
        
@app.errorhandler(404)
@cross_origin()
def deneme(e):
    return app.send_static_file('index.html')
    # return send_from_directory(app.static_folder, "index.html", path)



# @app.route('/weatherApi',methods=['GET'])
# @cross_origin()
# def index():
#     return {
#         'message':'hava guzel mi'
#     }

# # @app.route('/', defaults={'path': ''})
# # @app.route('/<path:path>')
# # def catch_all(path):
# #      if path != "" :
# #          return send_from_directory(app.static_folder,'index.html', path)
# #      else:
# #          return send_from_directory(app.static_folder,'index.html')


# @app.route('/weather')
# @cross_origin()
# def serve2():
#     return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run()