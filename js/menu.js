/**
 * Created by yos on 03/09/2017.
 */

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
        document.querySelector('a[href="#"]').parentNode.classList.add('active');
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
    }  else if (pageOffset >= offsetContact) {
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