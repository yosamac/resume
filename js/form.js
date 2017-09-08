/**
 * Created by yos on 04/09/2017.
 */
var contactForm = document.getElementById('form-contact');
var firtsname = document.getElementById('firstname');
var email = document.getElementById('email');
var phone = document.getElementById('phone');
var meetingOptions  = {
    meetingOption1: document.getElementById('meeting_1'),
    meetingOption2: document.getElementById('meeting_2'),
    meetingOption3: document.getElementById('meeting_3'),
    meetingOption4: document.getElementById('meeting_4')
}
var meetingMessage = document.getElementById('meeting-message');
var userMessage = document.getElementById('user-message');
var errorMessage = "You can't leave this empty."
var btnSend = document.getElementById('btn-send');
const url = "http://127.0.0.1:8000/api/messages/";

document.addEventListener('click', getEventTarget);
document.addEventListener('keyup', getEventTarget);

function getEventTarget(event){
    var elementId = event.target.id;
    if (elementId === "firstname" || elementId === "email"  || elementId === "phone" || event.target.name ==="meeting_options") {
        deleteErrorMessage(event.target)
    } 
}

function deleteErrorMessage(element){
    var elementToRemove = document.getElementById('error-msg');
    if (elementToRemove !== null ){
        element.parentElement.removeChild(elementToRemove);
    }
    return
} 

var loadingIcon = document.createElement('i');
loadingIcon.classList.add("fa", "fa-spinner", "fa-spin");

contactForm.addEventListener('submit', validateContactForm);

function validateContactForm (event) {
    event.preventDefault();
    if (firtsname.checkValidity() === false){
        message = "Write your name please";
        var invalidNode = document.getElementsByClassName('form-row')[0];
        buildAlertMessage(invalidNode, message);
        firtsname.focus();
        email.classList.add('invalid');
        return false;
    }

    if (email.checkValidity()=== false) {
        message = " Write a correct email please";
        var invalidNode = document.getElementsByClassName('form-row')[1];
        if(email.value === "") {
            message = "";
        } 
        buildAlertMessage(invalidNode, message);
        email.focus();
        email.classList.add('invalid');
        return false;
    } 

    if (phone.checkValidity() === false) {
        message = " Write a correct phone please";
        var invalidNode = document.getElementsByClassName('form-row')[2];
        if(phone.value === "") {
            message = "";
        } 
        buildAlertMessage(invalidNode, message);
        phone.focus()
        phone.classList.add('invalid');
        return false;
    }

    if (meetingOptions.meetingOption1.checkValidity() === false) {
        message = "Select an option please";
        var invalidNode = document.getElementsByClassName('form-row')[3];
        buildAlertMessage(invalidNode, message);
        return false;
    }

    btnSend.setAttribute("disabled", "");
    btnSend.appendChild(loadingIcon);
    event.preventDefault();
    sendMessage();
}

function buildAlertMessage(element, msg){
    var meessageElement =  document.createElement("span")
    var customMessage = "You can't leave this empty. ";
    var emailMsg = (msg.search("email") !== -1) ? msg : customMessage + msg;
    var phoneMsg = (msg.search("phone") !== -1) ? msg : customMessage + msg;
    customMessage = (msg.search("email") !== -1) ? emailMsg : phoneMsg;
    meessageElement.id = "error-msg";
    meessageElement.classList.add('errormsg');
    meessageElement.innerHTML = customMessage;
    element.appendChild(meessageElement);
}

contactForm.addEventListener('change', showDescriptionTextArea);
userMessage.addEventListener('keyup', showAlertWordLeft);
userMessage.addEventListener('click', function(event) {
    if (this.readOnly === true ){
        this.readOnly = false;
    }
})

function showDescriptionTextArea() {
    if (meetingOptions.meetingOption4.checked === false){
        meetingMessage.classList.add('hidden');
        meetingMessage.value = "";
    } else {
        meetingMessage.classList.remove('hidden');
    }
}

function showAlertWordLeft(event) {
    const wordsMax = 250;
    if (event.target.value.length > 0){
        var wordsNumber = userMessage.value.match(/[a-zA-Z]+/g).length;
        var alertMessage = wordsMax - wordsNumber  + " words left."
        var alertMessageElement =  document.createElement("span")
        var element = document.getElementById('alert-msg');
        alertMessageElement.id = "alert-msg";
        alertMessageElement.classList.add('alertmsg');
        alertMessageElement.innerHTML = alertMessage;
        console.log(wordsNumber);
        if ( wordsNumber >= 240 ) {
            if (element === null) {
                event.target.parentElement.appendChild(alertMessageElement);
            } else {
                element.innerHTML = alertMessage;
            }
        } 

        if (element !== null ) {
            element.innerHTML = alertMessage;
        }

        if (wordsNumber >= wordsMax) {
            this.readOnly = true;
        }
    } 
}

function sendMessage() {
    var data = {
        name: firtsname.value,
        email: email.value,
        phone: phone.value,
        meeting_opt: document.querySelector('input[type=radio]:checked').value, 
        user_msg: userMessage.value
    }

    if (meetingMessage.value !== "") {
        data['meeting_msg'] = meetingMessage.value;
    }
    console.log(data);
    insert(data);
    contactForm.reset();
}

var insert = function (data){
    var xhr;
    if (window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           getServerResult(xhr.responseText);
        } else if (xhr.readyState === 4 && xhr.status === 404) {
            console.log("Page not found");
        }
    }
    var usrMsg = "";
    if (meetingMessage.value !== "") {
        usrMsg = meetingMessage.value;
    }
    xhr.send(JSON.stringify(data));
}

var messages = [];
function getServerResult(result){
    messages.push(JSON.parse(result));
    btnSend.removeAttribute("disabled");
    btnSend.removeChild(loadingIcon);
    console.log(messages);
}