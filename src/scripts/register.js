import { auth, db, ref, set, createUserWithEmailAndPassword } from "./firebase.js";
import showHidePassword from './showHidePassword.js';
import { showSpinner, hideSpinner } from "./loaderPage.js";

showSpinner();
showHidePassword();

// update header component
const headerComponent = document.querySelector('header-component');
const el = headerComponent.shadowRoot.querySelector('.site-header .container');
const content = `
<div class="right hide-small">
<nav class="nav">
  <ul class="nav__list">
    <li class="nav__item"><a href="index.html">Home</a></li>
    <li class="nav__item"><a href="contact.html">Contact us</a></li>
  </ul>
</nav>
</div>
<a href="login.html" class="header__button header__button-signin">Sign In</a>
`;
el.insertAdjacentHTML('beforeend', content);

document.getElementById('form').addEventListener('submit', handleSignUp);

function handleSignUp(e) {
  e.preventDefault();

  RemoveAllErrorMessage();
  const RegiFullName = document.getElementById('newFullName').value;// changed Input Box ID
  const RegiEmailAddres = document.getElementById('email').value;
  const RegiPassword = document.getElementById('password').value;
  const RegiConfirmPassword = document.getElementById('confirmPassword').value;

  signUpWithEmailAndPassword({ email: RegiEmailAddres, password: RegiPassword, RegiFullName });

  function RemoveAllErrorMessage() {
    const allErrorMessage = document.getElementsByClassName('error-message');
    const allErrorFiled = document.getElementsByClassName('error-input');
    let i;

    for (i = allErrorMessage.length - 1; i >= 0; i--) {
      allErrorMessage[i].remove();
    }

    for (i = allErrorFiled.length - 1; i >= 0; i--) {
      allErrorFiled[i].classList.remove('error-input');
    }
  }

  function ShowErrorMessage(InputBoxID, Message) {
    const InputBox = document.getElementById(InputBoxID);
    InputBox.classList.add('error-input');
    InputBox.focus();

    const ErrorMessageElement = document.createElement('p');
    ErrorMessageElement.innerHTML = Message;
    ErrorMessageElement.classList.add('error-message');
    ErrorMessageElement.style.color = 'red';
    ErrorMessageElement.setAttribute('id', `${InputBoxID}-error`);

    InputBox.parentNode.insertBefore(ErrorMessageElement, InputBox.nextSibling);
  }

  function isValidFullName(fullName) {
    const fullNameRegex = /^[A-Za-z\s]+$/;
    if (!fullName || fullName.trim() === '') {
      ShowErrorMessage('newFullName', 'Please add the Full name!');
      return false;
    }
    if (!fullNameRegex.test(fullName)) {
      ShowErrorMessage('newFullName', 'Please enter a valid full name!');
      return false;
    }
    if (fullName.trim().length < 5) {
      ShowErrorMessage('newFullName', 'Your name is too short!');
      return false;
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === '') {
      ShowErrorMessage('email', '**Please add email address!');
      return false;
    }
    if (emailRegex.test(email) === false) {
      ShowErrorMessage('email', '**Please enter a valid email address!');
      return false;
    }
  }

  function isValidPassword(password) {
    if (password === '') {
      ShowErrorMessage('confirmPassword', 'Please add the Password!');
      return false;
    }
    if (password.length < 6) {
      ShowErrorMessage('confirmPassword', '**Password Length must be at least 6 Character');
      return false;
    }
  }

  function isValidConfirmPassword() {
    if (RegiPassword !== RegiConfirmPassword) {
      ShowErrorMessage('confirmPassword', "**Password doesn't match");
      return false;
    }
  }

  function isValidInputs(nameInput, passwordInput, emailInput, confirmPasswordInput) {
    return nameInput !== false && passwordInput !== false && emailInput !== false && confirmPasswordInput !== false;
  }

  async function signUpWithEmailAndPassword({ email, password, ...rest }) {
    if (!isValidInputs(isValidFullName(RegiFullName), isValidEmail(RegiEmailAddres), isValidPassword(RegiConfirmPassword), isValidConfirmPassword())) { return; }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('userCredential', userCredential);

      const { RegiFullName } = rest;
      const userId = userCredential.user.uid;
      const userRef = ref(db, `users/${userId}`);

      const { accessToken } = userCredential.user.stsTokenManager;

      set(userRef, { email, name: RegiFullName })
        .then(() => {
          localStorage.setItem('userId', userId);
          localStorage.setItem('TOKEN_KEY', accessToken);
          localStorage.setItem('userName', RegiFullName);// Added to display full name on course.html
          window.location.href = './course.html';
        })
        .catch((error) => {
          console.error('Error user create:', error);
        });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        ShowErrorMessage('email', 'Email already in use. Please, try another one');
      }
      console.log('error auth', error);
    }
  }
}

window.addEventListener('load', () => hideSpinner());
