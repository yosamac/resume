
const url = "http://127.0.0.1:8000/api/messages/";
var messages = [];

function drawMessages(){
    var messagesTable = document.getElementById("inbox-table");
    var tbody = document.createElement("tbody");

    if (messages.length === 0) {
        var noMsgsAlert = document.createTextNode("No raven has arrived");
        var cell = document.createElement("td");
        var row = document.createElement("tr");
        cell.setAttribute("colspan","8");
        cell.classList.add("section-title")
        cell.appendChild(noMsgsAlert);
        row.appendChild(cell);
        tbody.appendChild(row)
        messagesTable.appendChild(tbody);
        console.log("No raven has arrived")
    } else {
        for (var i = 0; i < messages.length; i ++){
            var row = document.createElement("tr");
            row.setAttribute("data-id",messages[i].id);
            var value = "";
            for (var j = 0; j < 3; j++) {
                var cell = document.createElement("td");
                switch (j) {
                    case 1: {
                        cell.setAttribute("colspan","2");
                        value = document.createTextNode(messages[i].name)
                        cell.appendChild(value)
                        break;
                    }
                    case 2: {
                        cell.setAttribute("colspan","5");
                        meetingValue = (messages[i].meeting_msg)? messages[i].meeting_msg : "";
                        value = (!messages[i].meeting_msg) ? document.createTextNode(messages[i].meeting_opt): document.createTextNode(messages[i].meeting_opt + " - " + messages[i].meeting_msg)
                        cell.appendChild(value);
                        break;
                    }
                    default :{
                        removeButton = document.createElement("button")
                        removeButton.classList.add('fa','fa-trash','button-remove');
                        cell.appendChild(removeButton);
                    }
                }
                row.appendChild(cell)
                tbody.appendChild(row)
                messagesTable.appendChild(tbody);
            }
        }
    } 
}

var list = function () {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            console.log(request.responseText);
            messages = JSON.parse(request.responseText);
            drawMessages()
        } else if (XHR.readyState === 4 && XHR.status === 404) {
            console.log("Page not found");
        }
    }
    request.send();
}

var remove = function (id) {
    var request = new XMLHttpRequest();
    request.open("DELETE", url + id, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            console.log("message deleted");
            list();
        } else if (request.readyState === 4 && request.status === 404) {
            console.log("Page not found");
        }
    }
    request.send();
}

var getMessage = function (id) {
    var request = new XMLHttpRequest();
    request.open("GET", url + id, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            console.log(request.responseText);
            messages = JSON.parse(request.responseText);
            drawMessageDetail(id)
        } else if (request.readyState === 4 && request.status === 404) {
            console.log("Page not found");
        }
    }
    request.send();
}

list();
