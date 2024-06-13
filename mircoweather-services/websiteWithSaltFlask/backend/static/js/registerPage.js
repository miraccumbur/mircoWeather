function passControl(){
    var pass1 = document.getElementById("password-input1")
    var pass2 = document.getElementById("password-input2") 
    var message = document.getElementById("password-same-message")
    if (pass1.value===pass2.value){
        message.style.display="none";
    }else{
        message.style.display="flex";
    }
}