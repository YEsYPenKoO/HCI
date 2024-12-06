function login() {
    var studentId = document.getElementById("studentidtextbox").value;
    var password = document.getElementById("passwordtextbox").value;

    if (studentId === "23451" && password === "4321") {
        console.log("Login Success");
        document.getElementById("result").innerHTML = "Login Success!";
        window.location.replace("../Student/main_student.html");
    } else {
        console.log("Login Failure");
        document.getElementById("result").innerHTML = "Incorrect Student ID or Password. Please try again.";
        showErrorPopup("Incorrect Student ID or Password. Please check your details and try again.");
    }
}

function showErrorPopup(message) {
    var popup = document.createElement("div");
    popup.className = "popup";
    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(function() {
        popup.remove();
    }, 3000);
}