function login() {
    var email = document.getElementById("emailtextbox").value;
    var password = document.getElementById("passwordtextbox").value;

    if (email === "james123@gmail.com" && password === "4321") {
        console.log("Login Success");
        document.getElementById("result").innerHTML = "Login Success!";
        window.location.replace("../Teacher/main_teacher.html");
    } else {
        console.log("Login Failure");
        document.getElementById("result").innerHTML = "Incorrect Username or Password. Please try again.";
        showErrorPopup("Incorrect username or password. Please check your details and try again.");
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