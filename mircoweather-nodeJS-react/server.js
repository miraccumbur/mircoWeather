const express = require("express")
const path = require("path")
const cors = require("cors")
const dotenv = require("dotenv")
const firebase = require("firebase/app")
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, get } = require("firebase/auth");
const firebaseAuth = require("firebase/auth");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const emailValidator = require("email-validator")
const jwtOperations = require("./functions/jwtOperations")

const FIREBASE_CONFIG = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  }

const app=express()
app.use(express.json())
dotenv.config();

const PORT=process.env.PORT || 3001

const firebaseApp=firebase.initializeApp(FIREBASE_CONFIG)

const serviceAccount = require('./keys/mircoweather-dabdb-firebase-adminsdk-7rr76-23d7bf33c0.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const auth = getAuth(firebaseApp)
const cities=Array()


app.use(express.static(path.resolve(__dirname,"frontend","build")))
app.use(cors())

const getCityList=async()=>{
    const citiesListFromDb= await db.collection('cities').stream()
    await citiesListFromDb.forEach(city=>{
        cities.push(city.data().name)
    })
}
getCityList()

// app.get("/encodeToken",(req,res,next)=>{
//     res.send(jwtOperations.encodeToken({localId:"1",email:"miraccumbur@gmail.com"}))
// })

app.post("/userAuthorizationControl",(req,res,next)=>{
    try {
        const data=req.body
        const returningValue = jwtOperations.decodeToken(data.token)
        res.send({
            value:returningValue
        })
    } catch (error) {
        res.send(error)
    }
})

app.post("/getWeather",async (req,res,next)=>{
    try {
        const data=req.body
        const weather={}
        if (cities.includes(data.city)){
            weather["current"]=(await db.collection("weather").doc(data.city).collection("current").doc("current").get()).data();
            weather["daily"]=[
                (await db.collection("weather").doc(data.city).collection("daily").doc("today").get()).data(),
                (await db.collection("weather").doc(data.city).collection("daily").doc("tomorrow").get()).data(),
                (await db.collection("weather").doc(data.city).collection("daily").doc("afterTomorrow").get()).data()
            ]
            weather["hourly"]=[]
            for (let i=0;i<48;i++){
                weather["hourly"].push((await db.collection("weather").doc(data.city).collection("hourly").doc(String(i)+":00").get()).data())
            }
        }else throw "City is not found."
        res.send({
            code:200,
            weather:weather
        })
    } catch (error) {
        res.send(error)
    }
})

app.get("/getCityList",(req,res,next)=>{
    try {
        res.send({
            code:200,
            list:cities
        })
        
    } catch (error) {
        res.send({
            code:400,
            list:error
        })
    }
})

app.post("/signin",async(req,res,next)=>{
    try {
        const data=req.body
        if(data.name!="" && data.surname!="" && data.mail!="" && data.password.length>7 && data.password===data.passwordAgain){
            const user = (await createUserWithEmailAndPassword(auth,data.mail,data.password)).user
            data["uid"]=user.uid
            data["premium"]=false
            delete data["password"]
            delete data["passwordAgain"]
            db.collection("users").doc(user.uid).set(data)
            res.json({
                code:200,
                message:"success"
            })
        }else{
            throw ("Input data is wrong.")
        }
    } catch (error) {
        res.json({
            code:400,
            message:String(error)
        })
    }
})

app.post("/login",async(req,res,next)=>{
    try {
        const data=req.body
        if(!emailValidator.validate(data.mail)){
            throw ("Email is wrong.")
        }else if(data.password.length<8){
            throw ("Password is wrong.")
        }else{
            const logged_in_user = (await signInWithEmailAndPassword(auth,data.mail,data.password)).user
            // console.log(auth)
            // const user = await(db.collection("users").doc(logged_in_user.uid).update({currentUser:auth}))
            const token = jwtOperations.encodeToken(logged_in_user)
            const userInfo = (await db.collection("users").doc(logged_in_user.uid).get()).data()
            userInfo["token"]=token
            res.json({
                code:200,
                message:"success",
                userInfo:userInfo
            })
        }
    } catch (error) {
        let message=error
        if(error.code==="auth/user-not-found"){
            message = "EMAIL_NOT_FOUND"
        }
        res.json({
            code:400,
            message:String(message)
        })
    }
})

app.post("/changeInformation",async(req,res,next)=>{
    try {
        const data=req.body

        if (emailValidator.validate(data.notificationMail)&& data.notificationPhoneNumber.length===12){
            db.collection("users").doc(data.uid).update({
                emailForNotification:data.notificationMail,
                phoneNumber:"+"+data.notificationPhoneNumber,
                notificationType:data.notificationType
            })
            res.json({
                code:200,
                message:"success"
            })
        }else{
            throw ("Input data is wrong.")
        }
    } catch (error) {
        res.json({
            code:400,
            message:String(error)
        })
    }
})

app.post("/changeLocation",async(req,res,next)=>{
    try {
        const data = req.body
        if (data.location!=null){
            db.collection("users").doc(data.uid).update({
                location:data.location
            })
            db.collection("cities").doc(data.location).collection("users").doc(data.uid).set({
                uid:data.uid
            })
        }else{
            throw ("Location is not found.")
        }

        res.json({
            code:200,
            message:"success"
        })
    } catch (error) {
        res.json({
            code:400,
            message:String(error)
        })
    }
})

app.post("/changePassword",async(req,res,next)=>{
    try {
        const data = req.body
        if (data.newPassword.length>7 && data.newPassword===data.newPasswordAgain && data.password.length>7){
            const user1=await signInWithEmailAndPassword(auth,JSON.parse(data.loggedUser).mail,data.password)
            updatePassword(auth.currentUser,data.newPassword)

            res.json({
                code:200,
                message:"success"
            })

        

        } else{
            throw("Password is wrong.")
        }
    } catch (error) {
        console.log("noluyo")
        res.json({
            code:400,
            message:String(error)
        })
    }
})

app.get("*",(req,res,next)=>{
    res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))   
})



app.listen(PORT, ()=>{
    console.log("Server Started with PORT: "+PORT)
})