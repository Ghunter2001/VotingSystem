const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//SIGN UP VALIDATION
document.getElementById("submitButton").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var course = document.getElementById("course").value;
  var year = document.getElementById("year").value;
  var section = document.getElementById("section").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  // Validate form fields
  var isValid = true;
  if (fname.trim() === "") {
    isValid = false;
  }
  if (lname.trim() === "") {
    isValid = false;
  }
  if (course.trim() === "") {
    isValid = false;
  }
  if (year.trim() === "") {
    isValid = false;
  }
  if (section.trim() === "") {
    isValid = false;
  }
  if (email.trim() === "") {
    isValid = false;
  }
  if (password.trim() === "") {
    isValid = false;
  }
  if (confirmPassword.trim() === "") {
    isValid = false;
  }
  if (password !== confirmPassword) {
    isValid = false;
    document.getElementById("passwordMatchMessage").textContent = "Passwords do not match";
  } else {
    document.getElementById("passwordMatchMessage").textContent = "";
  }

  // Submit the form if valid
  if (isValid) {
    document.getElementById("sign-up").submit();
  }else {
    res.send(`
            <script>
              alert("Signup successful!");
              window.location.href = "/login.html"; // Redirect to the login page after successful sign-up
            </script>
          `);
  }
});


//login form validation
function validateLoginForm(event) {
  event.preventDefault(); // Prevent form submission

  // Clear previous error messages
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");
  usernameError.textContent = "";
  passwordError.textContent = "";

  // Get form inputs
  const username = document.getElementById("username").value.trim();
  const pass = document.getElementById("pass").value.trim();

  // Perform validation
  let isValid = true;
  if (username === "") {
    usernameError.textContent = "Please enter a username.";
    isValid = false;
  }

  if (pass === "") {
    passwordError.textContent = "Please enter a password.";
    isValid = false;
  }

  // Submit the form if valid
  if (isValid) {
    document.getElementById("sign-in").submit();
  }
}
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error');

if (error === '1') {
  alert("INVALID DATA");
}