import { auth, signInWithEmailAndPassword, db, ref, get} from './firebase.js';
import showHidePassword from './showHidePassword.js';
import { showSpinner, hideSpinner } from "./loaderPage.js";

// update header component
function initializeHeader() {
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
  <a href="register.html" class="header__button header__button-signup">Sign Up</a>
  `;
  el.insertAdjacentHTML('beforeend', content);
}

function initializePage() {
  showSpinner();
  showHidePassword();
  initializeHeader();

  const formLogin = document.getElementById('form-login');
  formLogin.addEventListener('submit', handleLogin);

  window.addEventListener('load', hideSpinner);
}

initializePage();
const errorMessage = document.createElement('p');
errorMessage.classList.add('error-message');

function displayErrorMessage(message, targetElement) {
  errorMessage.innerHTML = message;
  targetElement.appendChild(errorMessage);
}

function handleLogin(e) {
  e.preventDefault();
  const emailElement = document.getElementById('email');
  const passwordElement = document.getElementById('password');
  const email = emailElement.value;
  const password = passwordElement.value;

  if (email === '') {
    displayErrorMessage('Email id is required', document.getElementById('email-validate'));
    return;
  }
  if (password === '') {
    displayErrorMessage('Password is required', document.getElementById('pswd'));
    return;
  }
  login({ email, password });
}

async function login({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();
    const userFullName = userData.name;

    if (userId) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userFullName); // Store the full name in localStorage
      window.location.href = './course.html';
    }
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      displayErrorMessage("User with this email doesn't exist", document.getElementById('email-validate'));
    } else if (error.code === 'auth/wrong-password') {
      displayErrorMessage('Incorrect password', document.getElementById('pswd'));
    } else {
      console.error('Error during login:', error);
    }
  }
}
