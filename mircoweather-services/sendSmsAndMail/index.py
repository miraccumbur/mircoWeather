from audioop import tomono
from email import message
from twilio.rest import Client
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import firebase_admin
from firebase_admin import credentials, firestore
import schedule
import time



sender_address = 'mircoweather@gmail.com'
sender_pass = ''
# session = smtplib.SMTP('smtp.gmail.com', 587) #use gmail with port
# session.starttls() #enable security
# session.login(sender_address, sender_pass) #login with mail_id and password

account_sid = ''
auth_token =''
client = Client(account_sid, auth_token)

cities=list()
usersInfo=dict()

cred = credentials.Certificate("./keys/mircoweather-dabdb-firebase-adminsdk-7rr76-0a2c0a6673.json")
firebase_admin.initialize_app(cred)
db=firestore.client()


# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
def sendSMS(messageforSended,phoneNumber):
    pass
    # msg=str(messageforSended)
    # message = client.messages \
    #                 .create(
    #                     body=msg,
    #                     from_='+17655634677',
    #                     to=phoneNumber
    #                 )

    # print(message.sid)

def sendMail(email,message,subject):
    mail_content = message
    #The mail addresses and password
    receiver_address = email
    #Setup the MIME
    message = MIMEMultipart()
    message['From'] = sender_address
    message['To'] = receiver_address
    message['Subject'] = subject  #The subject line
    #The body and the attachments for the mail
    message.attach(MIMEText(mail_content, 'plain'))
    #Create SMTP session for sending the mail
    text = message.as_string()
    session.sendmail(sender_address, receiver_address, text)
    print('Mail Sent')

# sendSMS()
# sendMail("miraccumbur@gmail.com","bu mail mircoweather tarafından test için gönderilmiştir","test")
def getCityList():
    citiesListFromDb=db.collection('cities').stream()
    for city in citiesListFromDb:
        cities.append(city.id)

def getUsers():
    userUid=list()
    for city in cities:
        usersDoc=db.collection("cities").document(city).collection("users").stream()
        
        usersInfo[city]={}
        for user in usersDoc:
            print("**",user.id)
            userUid.append(user.id)
        for user in userUid:
            usersInfo[city][user]={}
            userInfo=db.collection("users").document(user).get().to_dict()
            print(userInfo["notificationType"])
            usersInfo[city][user]["notificationType"]=userInfo["notificationType"]
            usersInfo[city][user]["email"]=userInfo["emailForNotification"]
            usersInfo[city][user]["phoneNumber"]=userInfo["phoneNumber"]
            usersInfo[city][user]["premium"]=userInfo["premium"]
        userUid.clear()

def alertFirstAdd():
    for city in cities:
        db.collection("weather").document(city).collection("alert").document("lastAlertPreciption").set({"value":"none"})
        db.collection("weather").document(city).collection("alert").document("lastPreciption").set({"value":"none"})

def messageCreator(type,title,infoList):
    message=""
    if type=="daily":
        # message="deneme"
        message="""
        {}
        - - - - -
        Weather : {} - {}
        Tempreature : {}°C - {}°C
        Feels Like : {}°C - {}°C
        Wind : {} - {} km/hb
        Humidity : {}%
        Pressure : {}
        Dew Point : {}°C
        - - - - -
        """.format(title,infoList[0],infoList[1],infoList[2],infoList[3],infoList[4],infoList[5],infoList[6],infoList[7],infoList[8],infoList[9],infoList[10])
    elif type=="hourly":
        message="""
        {}
        - - - - -
        Weather : {} - {}
        Tempreature : {}°C
        Feels Like : {}°C
        Wind : {} - {} km/h
        Humidity : {}%
        Pressure : {}
        Dew Point : {}°C
        - - - - -
        """.format(title,infoList[0],infoList[1],infoList[2],infoList[3],infoList[4],infoList[5],infoList[6],infoList[7],infoList[8])
    return message
def sendDailyWeather():
    for city in cities:
        today=db.collection("weather").document(city).collection("daily").document("today").get().to_dict()
        tomorrow=db.collection("weather").document(city).collection("daily").document("tomorrow").get().to_dict()
        afterTomorrow=db.collection("weather").document(city).collection("daily").document("afterTomorrow").get().to_dict()
        todayMessage=messageCreator("daily","Today",[today["weather"]["main"],today["weather"]["description"],today["temp"]["temp-max"],
        today["temp"]["temp-min"],today["temp"]["feelsLike-max"],today["temp"]["feelsLike-min"],today["wind"]["windDirection"],
        today["wind"]["windSpeed"],today["humidity"],today["pressure"],today["dewpoint"]])
        tomorrowMessage=messageCreator("daily","Tomorrow",[tomorrow["weather"]["main"],tomorrow["weather"]["description"],tomorrow["temp"]["temp-max"],
        tomorrow["temp"]["temp-min"],tomorrow["temp"]["feelsLike-max"],tomorrow["temp"]["feelsLike-min"],tomorrow["wind"]["windDirection"],
        tomorrow["wind"]["windSpeed"],tomorrow["humidity"],tomorrow["pressure"],tomorrow["dewpoint"]])
        afterTomorrowMessage=messageCreator("daily","After Tomorrow",[afterTomorrow["weather"]["main"],afterTomorrow["weather"]["description"],afterTomorrow["temp"]["temp-max"],
        afterTomorrow["temp"]["temp-min"],afterTomorrow["temp"]["feelsLike-max"],afterTomorrow["temp"]["feelsLike-min"],afterTomorrow["wind"]["windDirection"],
        afterTomorrow["wind"]["windSpeed"],afterTomorrow["humidity"],afterTomorrow["pressure"],afterTomorrow["dewpoint"]])
        message=todayMessage+tomorrowMessage+afterTomorrowMessage
        title="Daily Weather for {} from mircoWeather".format(city)
        
        for userUid in usersInfo[city]:
            print(userUid)
            email=usersInfo[city][userUid]["email"]
            phoneNumber=usersInfo[city][userUid]["phoneNumber"]
            if usersInfo[city][userUid]["notificationType"]=="Mail&Sms":
                if usersInfo[city][userUid]["premium"]:
                    sendSMS(message,phoneNumber)
                    sendMail(email,message,title)  
                else:
                    sendMail(email,message,title)                    
            elif usersInfo[city][userUid]["notificationType"]=="Mail":
                sendMail(email,message,title) 
            elif usersInfo[city][userUid]["notificationType"]=="Sms":
                if usersInfo[city][userUid]["premium"]:
                    sendSMS(message,phoneNumber)
            #print(userUid)
            #print(usersInfo[city][userUid]["email"])

def sendHourlyWeather():    
    for city in cities:
        message=""
        i=0
        while i<24:
            titleLow=str(i)+":00 o'clock"
            hour=str(i)+":00"
            weather=db.collection("weather").document(city).collection("hourly").document(hour).get().to_dict()
            hourlyMessage=messageCreator("hourly",titleLow,[weather["weather"]["main"],weather["weather"]["description"],
            weather["temp"]["temp"],weather["temp"]["feelsLike"],weather["wind"]["windDirection"],weather["wind"]["windSpeed"],
            weather["humidity"],weather["pressure"],weather["dewpoint"]])
            message=message+hourlyMessage
            i+=1
        
        title="Hourly Weather for {} from mircoWeather".format(city)
        for userUid in usersInfo[city]:
            print(userUid)
            email=usersInfo[city][userUid]["email"]
            phoneNumber=usersInfo[city][userUid]["phoneNumber"]
            if usersInfo[city][userUid]["notificationType"]=="Mail&Sms":
                if usersInfo[city][userUid]["premium"]:
                    sendSMS(message,phoneNumber)
                    sendMail(email,message,title)  
                else:
                    sendMail(email,message,title)                    
            elif usersInfo[city][userUid]["notificationType"]=="":
                sendMail(email,message,title) 
            elif usersInfo[city][userUid]["notificationType"]=="Sms":
                if usersInfo[city][userUid]["premium"]:
                    sendSMS(message,phoneNumber)

def sendAlert():
    for city in cities:
        
        rain=db.collection("weather").document(city).collection("alert").document("Rain").get().to_dict()["value"]
        snow=db.collection("weather").document(city).collection("alert").document("Snow").get().to_dict()["value"]
        rainAlert=db.collection("weather").document(city).collection("alert").document("rainAlert").get().to_dict()["value"]
        snowAlert=db.collection("weather").document(city).collection("alert").document("snowAlert").get().to_dict()["value"]
        lastPreciption=db.collection("weather").document(city).collection("alert").document("lastPreciption").get().to_dict()["value"]
        lastAlertPreciption=db.collection("weather").document(city).collection("alert").document("lastAlertPreciption").get().to_dict()["value"]
        #print(rain,snow,rainAlert,snowAlert,lastPreciption,lastAlertPreciption)
        messagePreciption=""
        messageAlert=""
        booleanMessagePreciption=False
        booleanMessageAlert=False
        if rain==True:
            if lastPreciption=="none" or lastPreciption=="snow":
                booleanMessagePreciption=True
                messagePreciption="Rain started for "+city
                db.collection("weather").document(city).collection("alert").document("lastPreciption").set({"value":"rain"})
                #yağmur başladı mesajı ve last preciption "rain" değiştir
        elif snow==True:
            if lastPreciption=="none" or lastPreciption=="rain":
                booleanMessagePreciption=True
                messagePreciption="Snow started for "+city
                db.collection("weather").document(city).collection("alert").document("lastPreciption").set({"value":"snow"})
                #kar başladı mesajı ve last preciption "snow" değiştir   
        else:
            if lastPreciption=="snow":
                booleanMessagePreciption=True
                messagePreciption="Snow stoped for "+city
                db.collection("weather").document(city).collection("alert").document("lastPreciption").set({"value":"none"})
                #kar durdu mesajı ve last preciption "none" değiştir        
            elif lastPreciption=="rain":
                booleanMessagePreciption=True
                messagePreciption="Rain stoped for "+city
                db.collection("weather").document(city).collection("alert").document("lastPreciption").set({"value":"none"})
                #yağmur durdu mesajı ve last preciption "none" değiştir
        if rainAlert==True: 
            if lastAlertPreciption=="none" or lastAlertPreciption=="snow":
                booleanMessageAlert=True
                messageAlert="Heavy Rain, hail storm, thunder and etc. extreme weather condition in "+city
                db.collection("weather").document(city).collection("alert").document("lastAlertPreciption").set({"value":"rain"})
                #yoğun yağmur dolu alarmı lastalertpret "rain" yap
        elif snowAlert==True:
            if lastAlertPreciption=="none" or lastAlertPreciption=="rain":
                booleanMessageAlert=True
                messageAlert="Heavy snow extreme weather condition in "+city
                db.collection("weather").document(city).collection("alert").document("lastAlertPreciption").set({"value":"snow"})
                #yoğun kar alarmı lastalertpret "snow" yap
        else:
            if lastAlertPreciption=="rain":
                booleanMessageAlert=True
                messageAlert="Heavy Rain, hail storm, thunder and etc. extreme weather condition leave "+city
                db.collection("weather").document(city).collection("alert").document("lastAlertPreciption").set({"value":"none"})
                #yoğun yağmur dolu alarmı bitti lastalertpret "none" yap
            elif lastAlertPreciption=="snow":
                booleanMessageAlert=True
                messageAlert="Heavy snow extreme weather condition leave "+city
                db.collection("weather").document(city).collection("alert").document("lastAlertPreciption").set({"value":"none"})
                #yoğun kar  alarmı bitti lastalertpret "none" yap


        
        if booleanMessagePreciption:
            for userUid in usersInfo[city]:
                print(userUid)
                email=usersInfo[city][userUid]["email"]
                phoneNumber=usersInfo[city][userUid]["phoneNumber"]
                if usersInfo[city][userUid]["notificationType"]=="Mail&Sms":
                    if usersInfo[city][userUid]["premium"]:
                        sendSMS(messagePreciption,phoneNumber)
                        sendMail(email,messagePreciption,"Preciption")  
                    else:
                        sendMail(email,messagePreciption,"Preciption")                    
                elif usersInfo[city][userUid]["notificationType"]=="Mail":
                    sendMail(email,messagePreciption,"Preciption") 
                elif usersInfo[city][userUid]["notificationType"]=="Sms":
                    if usersInfo[city][userUid]["premium"]:
                        sendSMS(messagePreciption,phoneNumber)

        if booleanMessageAlert:
            for userUid in usersInfo[city]:
                print(userUid)
                email=usersInfo[city][userUid]["email"]
                phoneNumber=usersInfo[city][userUid]["phoneNumber"]
                if usersInfo[city][userUid]["notificationType"]=="Mail&Sms":
                    if usersInfo[city][userUid]["premium"]:
                        sendSMS(messageAlert,phoneNumber)
                        sendMail(email,messageAlert,"Extreme Weather Condition")  
                    else:
                        sendMail(email,messageAlert,"Extreme Weather Condition")                      
                elif usersInfo[city][userUid]["notificationType"]=="Mail":
                    sendMail(email,messageAlert,"Extreme Weather Condition")  
                elif usersInfo[city][userUid]["notificationType"]=="Sms":
                    if usersInfo[city][userUid]["premium"]:
                        sendSMS(messageAlert,phoneNumber)





        
getCityList()
getUsers()
alertFirstAdd()
sendAlert()
sendDailyWeather()
#sendSMS()

# alertFirstAdd()
# schedule.every().day.at("23:55").do(getCityList)
# schedule.every().day.at("23:55").do(getUsers)
# schedule.every().day.at("00:30").do(sendDailyWeather)
# schedule.every().day.at("00:30").do(sendHourlyWeather)
# schedule.every(15).minutes.do(sendAlert)


# while True:
#     print(time.time())
#     schedule.run_pending()
#     time.sleep(1)
    
