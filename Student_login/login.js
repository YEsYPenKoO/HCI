function login() {
    var studentId = document.getElementById("studentidtextbox").value;
    var password = document.getElementById("passwordtextbox").value;

    // Fetch student data from local storage or a database
    var students = JSON.parse(localStorage.getItem('students')) || [];
    var currentStudent = students.find(s => s.id === studentId && s.password === password);

    if (currentStudent) {
        console.log("Login Success");
        document.getElementById("result").innerHTML = "Login Success!";
        window.location.replace("../Student/student-dashboard.html");
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