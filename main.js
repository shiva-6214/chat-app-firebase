var firebaseConfig = {
    apiKey: "AIzaSyBLGMyfwiVKQHhwDjISuWNSV5WuwDVXp7U",
    authDomain: "chat-application-e00c2.firebaseapp.com",
    databaseURL: "https://chat-application-e00c2-default-rtdb.firebaseio.com",
    projectId: "chat-application-e00c2",
    storageBucket: "chat-application-e00c2.appspot.com",
    messagingSenderId: "844264511802",
    appId: "1:844264511802:web:12cc0a042ac7d3ab44d803"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var myName = prompt("Enter your name");

console.log(myName);

function send() {
    var message = document.getElementById("txtMsg").value;
    var timeRaw = new Date();

    var fineTim = timeRaw.getHours() + ":" + timeRaw.getMinutes() + ":" + timeRaw.getSeconds();
 
        // save in database
    firebase.database().ref("messages/" + "8854").push().set({
        "sender": myName,
        "message": message,
        "Time" : fineTim
    });

    document.getElementById("txtMsg").value = "";

    // prevent form from submitting
}

function dis() {
    document.getElementById("lblUserName").innerHTML = "Name: " + myName;
}

function deleteMsg(self) {
    // get message ID
    var messageId = self.getAttribute("data-id");
    
    // delete message
    firebase.database().ref("messages/" + "8854").child(messageId).remove();
}

// attach listener for delete message
firebase.database().ref("messages/" + "8854").on("child_removed", function (snapshot) {
    // remove message node
    document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
    document.getElementById("message-" + snapshot.key).style.fontStyle = "italic";
});

firebase.database().ref("messages/" + "8854").on("child_added", function (snapshot) {
    var html = "";
    

    if (snapshot.val().sender == myName) {
        // give each message a unique ID
        html += "<li class='list-group-item-warning msg' id='message-" + snapshot.key + "'>";

        html += "<small>";

        html += snapshot.val().Time;

        html += "</small>";

        html += "<br>";

        html += "You" + ": " + snapshot.val().message;

        html += "<button class='btn btn-danger btn-sm buttonDel' onclick='deleteMsg(this);' data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
            html += "Delete";
        html += "</button>";

        html += "</li>";
    }

    else {
        // give each message a unique ID
        html += "<li class='list-group-item msgOther' id='message-" + snapshot.key + "'>";
        
        html += "<small>";

        html += snapshot.val().Time;

        html += "</small>";

        html += "<br>";

        html += snapshot.val().sender + ": " + snapshot.val().message;


        html += "</li>";
    }

    document.getElementById("messages").innerHTML += html;
});