
function login() {

    var email=document.getElementById("emailtextbox").value;
    var password=document.getElementById("passwordtextbox").value;



    if ((email = sessionStorage.getItem("email")) && (password = sessionStorage.getItem("password"))) {
        console.log("Login Success");
        document.getElementById("result").innerHTML="Login Success!";
        window.location.replace("../Teacher's hub/main_teacher.html");
    }
    else {
        console.log("Login Failure");
        document.getElementById("result").innerHTML="Incorrect Username or Password...";
    }
}
function register() {
    var useremail=document.getElementById("emailtextbox").value;
    var userpassword=document.getElementById("passwordtextbox").value;
    console.log("useremail = " + useremail);
    sessionStorage.setItem("email", useremail);
    sessionStorage.setItem("password", userpassword);
    window.location.replace("../login/login.html");
}