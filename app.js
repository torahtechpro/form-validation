const form = document.querySelector("#form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const captcha = document.getElementById("captcha");

// add a submit event listener on the form to prevent the default behavior
// event propagation
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    checkInputs();
});

function setError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
}
function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success"
}

function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const captchaValue = captcha.value.trim();
    // console.log(usernameValue, emailValue, passwordValue, password2Value, captchaValue);

    // validate the username (empty fields, min length is 5)

    if (usernameValue === "") {
        // console.log("username is required")
        setError(username, "Username is required")
    } else if (usernameValue.length < 5) {
        setError(username, "Minimum username length is 5");
        // console.log("username is not enough")
    } else {
        // success
        setSuccess(username)
    }

    // validate email (email must not be empty, email must iclude @)

    if (emailValue === "") {
        setError(email, "Email is required");
    } else if (!emailValue.includes("@")) {
        setError(email, "@ must be included");
    } else {
        setSuccess(email)
    }

    // password must not be empty and the minimum password length is 7

    if (passwordValue === "") {
        setError(password, "password must not be empty");
    } else if (passwordValue.length <= 7) {
        setError(password, "password is too short");
    } else {
        setSuccess(password)
    }

     if (password2Value === "") {
       setError(password2, "password must not be empty");
     } else if (password2Value != passwordValue) {
       setError(password2, "password not match");
     } else {
       setSuccess(password2);
     }

     if (captchaValue === "") {
        setError(captcha, "captcha must not be empty");}
}

const showBtn = document.querySelector(".show-btn");

showBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputType = password.getAttribute("type");
    if (inputType === "password") {
        password.setAttribute("type", "text");
        showBtn.value = "Hide";
    } else {
        password.setAttribute("type", "password");
        showBtn.value = "show";
    }
});

captcha.addEventListener("input", (e) => {
    const img = document.querySelector("img");
    const text = e.target.value.trim();
    const blurValue = 20 - text.length;
    img.style.filter = `blur(${blurValue}px)`;

    if (blurValue <= 0) {
        setSuccess(captcha);
    } else {
        setError(captcha, "Text is not long enough");
    }
});