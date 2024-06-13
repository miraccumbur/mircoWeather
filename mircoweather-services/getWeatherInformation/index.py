from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore
import requests
import schedule
import time
import requests as requests
from bs4 import BeautifulSoup
from keys.pyrebaseKey import pyrebaseConfig
from weather import oneCallWeather, currentWeather
import cv2

precipitationScaleList=list()
precipitationScaleSet=set()
snowScaleList=list()
snowScaleSet=set()
rainScaleList=list()
rainScaleSet=set()


def kelvinToCelcius(kelvin):
    return kelvin-273.15

def findWindDirection(value):
    windType=""
    if(value>=0 and value <=1) or (value>346 and value <=360):
        windType="North"
    elif value>=16 and value <=75:
        windType="North East"
    elif value>=76 and value <=105:
        windType="East"
    elif value>=106 and value <=165:
        windType="South East"
    elif value>=166 and value <=195:
        windType="South"
    elif value>=196 and value <=255:
        windType="South West"
    elif value>=256 and value <=285:
        windType="South"
    elif value>286 and value <=345:
        windType="North West"
    return windType


def precipitationScale():
    image=cv2.imread("./radarScaleImage/colorForPrecipitation.jpg",1)
    height=image.shape[0]
    width=image.shape[1]

    for i in range(0,height):
        for j in range(0,width):
            b,g,r=image[i,j]
            precipitationScaleList.append(str(r)+","+str(g)+","+str(b))
def snowScale():
    image=cv2.imread("./radarScaleImage/colorForSnowAlert.jpg",1)
    height=image.shape[0]
    width=image.shape[1]

    for i in range(0,height):
        for j in range(0,width):
            b,g,r=image[i,j]
            snowScaleList.append(str(r)+","+str(g)+","+str(b))
def rainScale():
    image=cv2.imread("./radarScaleImage/colorForRainAlert.jpg",1)
    height=image.shape[0]
    width=image.shape[1]

    for i in range(0,height):
        for j in range(0,width):
            b,g,r=image[i,j]
            rainScaleList.append(str(r)+","+str(g)+","+str(b))

def preciptionFinder(city,areaName,imgSize,areaTop,areaBottom,areaLeft,areaRight,hourlyWeatherMain):
    radarImageColorList=[]
    if imgSize=="max":
        image=cv2.imread("./radarImage/maxImage/"+areaName+"-max.jpg",1)
        image=image[areaTop:areaBottom,areaLeft:areaRight]
        height=image.shape[0]
        width=image.shape[1]

        for i in range(0,height):
            for j in range(0,width):
                b,g,r=image[i,j]
                radarImageColorList.append(str(r)+","+str(g)+","+str(b))
    elif imgSize=="ppi":
        image=cv2.imread("./radarImage/ppiImage/"+areaName+"-ppi.jpg",1)
        image=image[areaTop:areaBottom,areaLeft:areaRight]
        height=image.shape[0]
        width=image.shape[1]

        for i in range(0,height):
            for j in range(0,width):
                b,g,r=image[i,j]
                radarImageColorList.append(str(r)+","+str(g)+","+str(b))
    
    radarImageColorSet=set(radarImageColorList)
    booleanValue=False
    for i in precipitationScaleSet:
        for j in radarImageColorSet:
            if i==j:
                booleanValue=True
    print("The precipitation status was refined using the radar image for",city)
    if(booleanValue):
        print("It is",hourlyWeatherMain,"in",city) #database güncelle
        db.collection("weather").document(city).collection("alert").document(hourlyWeatherMain).set({"value":True})
    else:
        print("It is not preciption in",city) #yağışyok database güncelle
        db.collection("weather").document(city).collection("alert").document(hourlyWeatherMain).set({"value":False})
    return booleanValue

def snowAlertFinder(city,areaName,imgSize,areaTop,areaBottom,areaLeft,areaRight):
    radarImageColorList=[]
    if imgSize=="max":
        image=cv2.imread("./radarImage/maxImage/"+areaName+"-max.jpg",1)
        image=image[areaTop:areaBottom,areaLeft:areaRight]
        height=image.shape[0]
        width=image.shape[1]

        for i in range(0,height):
            for j in range(0,width):
                b,g,r=image[i,j]
                radarImageColorList.append(str(r)+","+str(g)+","+str(b))
    elif imgSize=="ppi":
        image=cv2.imread("./radarImage/ppiImage/"+areaName+"-ppi.jpg",1)
        image=image[areaTop:areaBottom,areaLeft:areaRight]
        height=image.shape[0]
        width=image.shape[1]

        for i in range(0,height):
            for j in range(0,width):
                b,g,r=image[i,j]
                radarImageColorList.append(str(r)+","+str(g)+","+str(b))
    
    radarImageColorSet=set(radarImageColorList)
    booleanValue=False
    for i in snowScaleSet:
        for j in radarImageColorSet:
            if i==j:
                booleanValue=True
    print("The snow status was refined using the radar image for",city)
    if(booleanValue):
        print("There is a snowfall alarm in",city) #database güncelle
        db.collection("weather").document(city).collection("alert").document("snowAlert").set({"value":True})
        db.collection("weather").document(city).collection("alert").document("rainAlert").set({"value":False})
    else:
        print("There is not a snowfall alarm in",city) #yağışyok database güncelle
        db.collection("weather").document(city).collection("alert").document("snowAlert").set({"value":False})
        db.collection("weather").document(city).collection("alert").document("rainAlert").set({"value":False})





#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-
#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-
#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-
#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-
#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-
#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-





def rainAlertFinder(city,areaName,imgSize,areaTop,areaBottom,areaLeft,areaRight):
    radarImageColorList=[] #create radarimagecolor list 
    if imgSize=="max": #if picture model is max enter this block or ppi enter else if ppi block
        image=cv2.imread("./radarImage/maxImage/"+areaName+"-max.jpg",1) #read picture
        image=image[areaTop:areaBottom,areaLeft:areaRight] #crop the picture
        height=image.shape[0] #get hight and width information from picture
        width=image.shape[1]

        for i in range(0,height): #look every row and column pixels
            for j in range(0,width):
                b,g,r=image[i,j] #get bluee green and red value and add radar image color list
                radarImageColorList.append(str(r)+","+str(g)+","+str(b))
    elif imgSize=="ppi": #same operations but this block for if image model is ppi
        image=cv2.imread("./radarImage/ppiImage/"+areaName+"-ppi.jpg",1)
        image=image[areaTop:areaBottom,areaLeft:areaRight]
        height=image.shape[0]
        width=image.shape[1]

        for i in range(0,height):
            for j in range(0,width):
                b,g,r=image[i,j]
                radarImageColorList.append(str(r)+","+str(g)+","+str(b))
    
    radarImageColorSet=set(radarImageColorList) # radar image color list change to radarimagecolorset
    booleanValue=False
    for i in rainScaleSet:
        for j in radarImageColorSet:
            if i==j:
                booleanValue=True #if any radarimagecolor set value match the any extreme weather rain condition scale value, our value change to true.
    print("The rain status was refined using the radar image for",city)
    if(booleanValue):
        print("There is a rainfall alarm in",city) #if boolean value is true update database "there is a rainfall alarm in any city"
        db.collection("weather").document(city).collection("alert").document("rainAlert").set({"value":True})
        db.collection("weather").document(city).collection("alert").document("snowAlert").set({"value":False})
    else:
        print("There is not a rainfall alarm in",city) #but if our value is false, update to database "there is not rainfall alarm in city"
        db.collection("weather").document(city).collection("alert").document("rainAlert").set({"value":False})#these operations is do for all cities.
        db.collection("weather").document(city).collection("alert").document("snowAlert").set({"value":False})
    return booleanValue





#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-
#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-
#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-
#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-
#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-
#-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-






cred = credentials.Certificate("./keys/mircoweather-dabdb-firebase-adminsdk-7rr76-0a2c0a6673.json")
firebase_admin.initialize_app(cred)
db=firestore.client()



areas=[]
cities=[]

def getCityList():
    citiesListFromDb=db.collection('cities').stream()
    for city in citiesListFromDb:
        #print(city.id)
        cities.append(city.id)

def getAreaList():
    areaListFromDb=db.collection("radarImage").document("areaInfo").get()
    areas.extend(areaListFromDb.to_dict()["name"])


def getCurrentWeather():
    # print("---------current weather working--------")
    for city in cities:
        latitude=db.collection("cities").document(city).collection("location").document("latitude").get().to_dict()
        longitude=db.collection("cities").document(city).collection("location").document("longitude").get().to_dict()
        # url="http://api.openweathermap.org/data/2.5/onecall?lat="+latitude["value"]+"&lon="+longitude["value"]+"&exclude=daily,minutely,hourly,alerts&appid=4bea130418e11ef03d28e10bb3dbe90c"
        url="http://api.openweathermap.org/data/2.5/weather?lat="+latitude["value"]+"&lon="+longitude["value"]+"&appid="
        data=requests.get(url).json()
        #format(432.456, ".2f")
        #print(data)
        wind={"windSpeed":data["wind"]["speed"],
        "windDirection":findWindDirection(data["wind"]["deg"])}
        weather={"main":data["weather"][0]["main"],
        "description":data["weather"][0]["description"]}
        temp={"temp":format(kelvinToCelcius(data["main"]["temp"]),".1f"),
        "feelsLike":format(kelvinToCelcius(data["main"]["feels_like"]),".1f")}
        weatherData=currentWeather(data["dt"],data["main"]["pressure"],data["main"]["humidity"],wind,weather,temp)
        db.collection("weather").document(city).collection("current").document("current").set(weatherData.__dict__)
        print("Current weather information has been updated for",city)   



def getDailyWeather():
    days=["today","tomorrow","afterTomorrow"]
    for city in cities:
        latitude=db.collection("cities").document(city).collection("location").document("latitude").get().to_dict()
        longitude=db.collection("cities").document(city).collection("location").document("longitude").get().to_dict()
        #print(latitude["value"],longitude["value"])
        url="http://api.openweathermap.org/data/2.5/onecall?lat="+latitude["value"]+"&lon="+longitude["value"]+"&exclude=current,minutely,hourly,alerts&appid="
        data=requests.get(url).json()
        i=0
        while i<3:
            wind={"windSpeed":data["daily"][i]["wind_speed"],
                "windDirection":findWindDirection(data["daily"][i]["wind_deg"])}
            weather={"main":data["daily"][i]["weather"][0]["main"],
                "description":data["daily"][i]["weather"][0]["description"]}
            temp={"temp-min":format(kelvinToCelcius(data["daily"][i]["temp"]["min"]),".1f"),
                "temp-max":format(kelvinToCelcius(data["daily"][i]["temp"]["max"]),".1f"),
                "feelsLike-min":min(format(kelvinToCelcius(data["daily"][i]["feels_like"]["day"]),".1f"),
                format(kelvinToCelcius(data["daily"][i]["feels_like"]["night"]),".1f"),
                format(kelvinToCelcius(data["daily"][i]["feels_like"]["eve"]),".1f"),
                format(kelvinToCelcius(data["daily"][i]["feels_like"]["morn"]),".1f")),
                "feelsLike-max":max(format(kelvinToCelcius(data["daily"][i]["feels_like"]["day"]),".1f"),
                format(kelvinToCelcius(data["daily"][i]["feels_like"]["night"]),".1f"),
                format(kelvinToCelcius(data["daily"][i]["feels_like"]["eve"]),".1f"),
                format(kelvinToCelcius(data["daily"][i]["feels_like"]["morn"]),".1f"))
                }
            weatherData={"wind":wind,
            "weather":weather,
            "temp":temp,
            "datetime":data["daily"][i]["dt"],
            "pressure":data["daily"][i]["pressure"],
            "humidity":data["daily"][i]["humidity"],
            "dewpoint":format(kelvinToCelcius(data["daily"][i]["dew_point"]),".1f"),
            "sunrise":data["daily"][i]["sunrise"],
            "sunset":data["daily"][i]["sunset"]
            }    
            x=oneCallWeather(data["daily"][i]["dt"],data["daily"][i]["pressure"],data["daily"][i]["humidity"],
                format(kelvinToCelcius(data["daily"][i]["dew_point"]),".1f"),wind,weather,temp)
            db.collection("weather").document(city).collection("daily").document(days[i]).set(weatherData)
            # db.collection("weather").document(city).collection("daily").document(days[i]).set({"sunrise":data["daily"][i]["sunrise"],"sunset":data["daily"][i]["sunset"]})
            i+=1
        print("Daily weather information has been updated for",city)

def getHourlyWeather():
    for city in cities:
        latitude=db.collection("cities").document(city).collection("location").document("latitude").get().to_dict()
        longitude=db.collection("cities").document(city).collection("location").document("longitude").get().to_dict()
        #print(latitude["value"],longitude["value"])
        url="http://api.openweathermap.org/data/2.5/onecall?lat="+latitude["value"]+"&lon="+longitude["value"]+"&exclude=current,minutely,daily,alerts&appid="
        data=requests.get(url).json()
        i=0
        while i<48:
            wind={"windSpeed":data["hourly"][i]["wind_speed"],
            "windDirection":findWindDirection(data["hourly"][i]["wind_deg"])}
            weather={"main":data["hourly"][i]["weather"][0]["main"],
            "description":data["hourly"][i]["weather"][0]["description"]}
            temp={"temp":format(kelvinToCelcius(data["hourly"][i]["temp"]),".1f"),
            "feelsLike":format(kelvinToCelcius(data["hourly"][i]["feels_like"]),".1f")}
            weatherData=oneCallWeather(data["hourly"][i]["dt"],data["hourly"][i]["pressure"],data["hourly"][i]["humidity"],
            format(kelvinToCelcius(data["hourly"][i]["dew_point"]),".1f"),wind,weather,temp)
            db.collection("weather").document(city).collection("hourly").document(str(i)+":00").set(weatherData.__dict__)
              
            i+=1
        print("Hourly weather information has been updated for",city) 
        
def getRadarImage():
    print("--------get radar image func working------")
    try:
        for area in areas:
            html = requests.get("https://data.rainviewer.com/images/"+area+"/")
            soup = BeautifulSoup(html.content, "html.parser")

            list = soup.findAll("a")
            for i in list[::-1]:
                if str(i.get("href")).endswith("source.url"):
                    url = str(i.get("href"))
                    break
            
            responseURL = requests.get("https://data.rainviewer.com/images/"+area+"/" + url)
            responseURL = str(responseURL.content).split("=")
            responseURL = responseURL[1][0:len(responseURL[1]) - 1]
            response = requests.get(responseURL)

            print(area+"-ppi.jpg")
            file = open("./radarImage/ppiImage/"+area+"-ppi.jpg", "wb")
            file.write(response.content)
            file.close()

            responseURLforMax = responseURL.replace("ppi", "max")
            response = requests.get(responseURLforMax)

            print(area+"-max.jpg")
            file = open("./radarImage/maxImage/"+area+"-max.jpg", "wb")
            file.write(response.content)
            file.close()

    except Exception as error :
        print(error)

def alertAnalayses():
    for city in cities:
        # print(city,"6. aşama tamamlandı")
        imageSize=db.collection("cities").document(city).collection("information").document("imageSize").get().to_dict()["value"]
        areaName=db.collection("cities").document(city).collection("radarArea").document("areaName").get().to_dict()["value"]
        areaTop=db.collection("cities").document(city).collection("radarArea").document("areaSize").get().to_dict()["heightTop"]
        areaBottom=db.collection("cities").document(city).collection("radarArea").document("areaSize").get().to_dict()["heightBottom"]
        areaLeft=db.collection("cities").document(city).collection("radarArea").document("areaSize").get().to_dict()["widthLeft"]
        areaRight=db.collection("cities").document(city).collection("radarArea").document("areaSize").get().to_dict()["widthRight"]
        currentWeatherMain=db.collection("weather").document(city).collection("current").document("current").get().to_dict()["weather"]["main"]
        if currentWeatherMain=="Rain":
            print("It's raining in",city)
            db.collection("weather").document(city).collection("alert").document("Rain").set({"value":True})
            db.collection("weather").document(city).collection("alert").document("Snow").set({"value":False})
        elif currentWeatherMain=="Snow":
            print("It's snowing in",city)
            db.collection("weather").document(city).collection("alert").document("Snow").set({"value":True})
            db.collection("weather").document(city).collection("alert").document("Rain").set({"value":False})

        else:
            print("There is no precipitation in",city)
            db.collection("weather").document(city).collection("alert").document("Rain").set({"value":False})
            db.collection("weather").document(city).collection("alert").document("Snow").set({"value":False})
        date = datetime.now()
        hourlyWeatherMain=db.collection("weather").document(city).collection("hourly").document(str(date.hour)+":00").get().to_dict()["weather"]["main"]
        if currentWeatherMain=="Snow":
            snowAlertFinder(city,areaName,imageSize,areaTop,areaBottom,areaLeft,areaRight)
        elif hourlyWeatherMain=="Snow":
            booleanValue=preciptionFinder(city,areaName,imageSize,areaTop,areaBottom,areaLeft,areaRight,hourlyWeatherMain)
            if(booleanValue):
                snowAlertFinder(city,areaName,imageSize,areaTop,areaBottom,areaLeft,areaRight)
        elif currentWeatherMain=="Rain":
            rainAlertFinder(city,areaName,imageSize,areaTop,areaBottom,areaLeft,areaRight)
        elif hourlyWeatherMain=="Rain":
            booleanValue=preciptionFinder(city,areaName,imageSize,areaTop,areaBottom,areaLeft,areaRight,hourlyWeatherMain)
            if(booleanValue):
                rainAlertFinder(city,areaName,imageSize,areaTop,areaBottom,areaLeft,areaRight)        
        else:
            pass
        db.collection("weather").document(city).collection("alert").document("lastPreciption").set({"value":"none"})
        db.collection("weather").document(city).collection("alert").document("lastAlertPreciption").set({"value":"none"})

def setField():
    for city in cities:
        db.collection("weather").document(city).set({"name":city})


start_time = time.time()
precipitationScale()
precipitationScaleSet=set(precipitationScaleList)
print("Precipitation Scale Created")
snowScale()
snowScaleSet=set(snowScaleList)
print("Snow Scale Created")
rainScale()
rainScaleSet=set(rainScaleList)
print("Rain Scale Created")
getCityList()
print("City List Taken")
getAreaList()
print("Area List Taken")

getHourlyWeather()
print("Hourly Weather Updated")
getRadarImage()
print("Radar Image Updated")
getCurrentWeather()
print("Current Weather Updated")
getDailyWeather()
print("Daily Weather Updated")
alertAnalayses()
print("Alerts Updated")

print("--- %s seconds ---" % (time.time() - start_time))

# getCityList()
# getDailyWeather()




# schedule.every().day.at("23:55").do(getCityList)
# schedule.every().day.at("23:55").do(getAreaList)
# schedule.every().day.at("00:00").do(getDailyWeather)
# schedule.every().day.at("00:00").do(getHourlyWeather)
# schedule.every(15).minutes.do(getCurrentWeather)
# schedule.every(15).minutes.do(getRadarImage)
# schedule.every(15).minutes.do(alertAnalayses)


# while True:
#     print(time.time())
#     schedule.run_pending()
#     time.sleep(1)

    



