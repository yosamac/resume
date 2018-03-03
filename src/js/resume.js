
var navbarItems = document.getElementsByClassName("navbar-item");

for (var i = 0; i < navbarItems.length; i ++) {
    navbarItems[i].addEventListener('click', function(){
        var sectionToGo = this.getElementsByTagName('a')[0].href.split("#");
        deleteClassActive();
        this.classList.add('active');
        if (sectionToGo.length === 2) {
            event.preventDefault();
            var goTo = sectionToGo[sectionToGo.length - 1];
            getElementByIdAndScroll(goTo)
        }
    });
}

function getElementByIdAndScroll (elementId) {
    var element;
    if (elementId === '') {
        element = document.getElementsByClassName("header")[0];
    } else {
        element = document.getElementById(elementId);
    }
    scrollToElement(element);
}

function scrollToElement(element) {
    var distance = parseInt(element.getBoundingClientRect().top * 0.3);
    console.log(distance);
    document.body.scrollTop += distance;

    if (!element.lastDistance || element.lastDistance > Math.abs(distance)) {
        element.lastDistance = Math.abs(distance);
        setTimeout(function (){
            scrollToElement(element);
        }, 50);
    } else {
        element.lastDistance = null;
    }
}

function deleteClassActive (){
    for (var i = 0; i < navbarItems.length; i ++) {
        navbarItems[i].classList.remove('active');
    }
}

var techSkills = document.getElementsByClassName("sprite");
function deleteClassAnimation(){
    for (var i = 0; i < techSkills.length; i ++) {
        techSkills[i].classList.remove('animated', 'infinite','tada');
    }
}

var accumulativeOffset = function (element) {
    var top = 0;
    do {
        top += element.offsetTop || 0;
        element = element.offsetParent;
    } while (element)
    return top;
}

var offsetProfile = accumulativeOffset(document.getElementById("profile")) - 50;
var offsetExperience = accumulativeOffset(document.getElementById("work-experience")) - 50;
var offsetSkills = accumulativeOffset(document.getElementById("skills")) - 50;
var offsetEducation = accumulativeOffset(document.getElementById("education")) - 50;
var offsetCourse = accumulativeOffset(document.getElementById("course")) - 50;
var offsetAboutMe = accumulativeOffset(document.getElementById("about-me")) - 50;
var offsetContact = accumulativeOffset(document.getElementById("contact")) - 50;
var navbar = document.getElementsByClassName("navbar")[0];

window.addEventListener('scroll', changeMenuStyle);

var previous;
function changeMenuStyle (){
    var pageOffset = window.pageYOffset;

    if (pageOffset >= 0 && pageOffset < offsetProfile) {
        if (!previous || previous !== 1 ){
            previous = 1;
        } else if (previous === 1){
            return false;
        }
        deleteClassActive();
        deleteClassAnimation();
        
    } else if (pageOffset >= offsetProfile && pageOffset < offsetExperience) {
        if (!previous || previous !== 2){
            previous = 2;
        } else if (previous === 2){
            return false;
        }
        console.log("profile");
        deleteClassActive()
        deleteClassAnimation();
        document.querySelector('a[href$="profile"]').parentNode.classList.add('active');
    } else if (pageOffset >= offsetExperience && pageOffset < offsetSkills) {
        if (!previous || previous !== 3 ){
            previous = 3;
        } else if (previous === 3){
            return false;
        }
        console.log("experience");
        deleteClassActive()
        deleteClassAnimation();
        document.querySelector('a[href$="work-experience"]').parentNode.classList.add('active');
    } else if (pageOffset >= offsetSkills && pageOffset < offsetEducation) {

        if (!previous || previous !== 4) {
            previous = 4;
        } else if (previous === 4) {
            return false;
        }
        console.log("skills");
        deleteClassActive()
        document.querySelector('a[href$="skills"]').parentNode.classList.add('active');
        for (var i = 0; i < techSkills.length; i ++) {
            techSkills[i].classList.add('animated','infinite','tada');
        }
    }  else if (pageOffset >= offsetEducation && pageOffset < offsetCourse) {
        if (!previous || previous !== 5) {
            previous = 5;
        } else if (previous === 5) {
            return false;
        }
        console.log("education");
        deleteClassActive()
        deleteClassAnimation()
        document.querySelector('a[href$="education"]').parentNode.classList.add('active');
    }  else if (pageOffset >= offsetCourse && pageOffset < offsetAboutMe) {

        if (!previous || previous !== 6) {
            previous = 6;
        } else if (previous === 6) {
            return false;
        }
        console.log("course");
        deleteClassActive()
        deleteClassAnimation();
        document.querySelector('a[href$="course"]').parentNode.classList.add('active');
    }  else if (pageOffset >= offsetAboutMe && pageOffset < offsetContact) {
        if (!previous || previous !== 7) {
            previous = 7;
        } else if (previous === 7) {
            return false;
        }
        console.log("About Me");
        deleteClassActive()
        deleteClassAnimation();
        document.querySelector('a[href$="about-me"]').parentNode.classList.add('active');
    }  else if (pageOffset >= offsetContact || pageOffset >= 2937) {
        if (!previous || previous !== 8) {
            previous = 8;
        } else if (previous === 8) {
            return false;
        }
        console.log("Contact");
        deleteClassActive()
        deleteClassAnimation();
        document.querySelector('a[href$="contact"]').parentNode.classList.add('active');
    }
}

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
    var wordsMax = 250;
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