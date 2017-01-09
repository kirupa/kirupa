var cppClass;
var notificationCount = 0;

// Wait for DOM loaded and set up event listeners on HTML elements
document.addEventListener("DOMContentLoaded", function () {

    if (typeof Windows !== "undefined") {
        //instantiate the C++ component
        cppClass = new Numbers.NumClass();

        //add the event listeners for C++ component manipulation
        document.getElementById('GetNum').addEventListener('click', getNum);
        document.getElementById('SetNum').addEventListener('click', function () {
            var num = document.getElementById('setNumIpt').value;
            setNum(num);
        });
        document.getElementById('GetRand').addEventListener('click', function () {
            var num = document.getElementById('range').value;
            getRand(0, num)
        });
        document.getElementById('GetFactorial').addEventListener('click', function () {
            var num = document.getElementById('facNumIpt').value;
            getFactorial(num)
        });

        //add the event listeners for badge notifications
        document.getElementById("plus").addEventListener("click", addNotify);
        document.getElementById("minus").addEventListener("click", minusNotify);

        //init badge notifications
        sendBadgeNotification(0);

        var dynamicWebView = document.createElement("x-ms-webview");
        dynamicWebView.navigate("https://teams.microsoft.com/");
        document.body.appendChild(dynamicWebView);
    }

    //create a webview
    var dynamicH1 = document.createElement("h1");
    dynamicH1.innerText = "Hello";
    document.body.appendChild(dynamicH1);
})

//define all the methods off the C++ component
function getNum() {
    var returnVal = cppClass.getNum();
    console.log("The number in NumClass is: " + returnVal);
    return returnVal;
}

function setNum(num) {
    cppClass.setNum(num);
    console.log("The number in NumClass is set to: " + num);
}

function getRand(min, max) {
    var returnVal = cppClass.randomNumber(min, max);
    console.log("The max number is: " + max + ", the reandom number returned is: " + returnVal);
}

function getFactorial(num) {
    var returnVal = cppClass.factorial(num);
    console.log("The factorial of " + num + " is: " + returnVal);
}

//define methods for badge notifications
function addNotify() {
    sendBadgeNotification(1);
}

function minusNotify() {
    sendBadgeNotification(-1);
}

function sendBadgeNotification(n) {
    var Notifications = Windows.UI.Notifications;
    var badgeXml;
    var badgeAttributes;

    // Get an XML DOM version of a specific template by using getTemplateContent.
    badgeXml = Notifications.BadgeUpdateManager.getTemplateContent(Notifications.BadgeTemplateType.badgeNumber);
    badgeAttributes = badgeXml.getElementsByTagName("badge");
    notificationCount += n;
    badgeAttributes[0].setAttribute("value", notificationCount);

    // Create a badge notification from the XML content.
    var badgeNotification = new Notifications.BadgeNotification(badgeXml);

    // Send the badge notification to the app's tile.
    Notifications.BadgeUpdateManager.createBadgeUpdaterForApplication().update(badgeNotification);
}