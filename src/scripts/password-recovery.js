import { auth, sendPasswordResetEmail } from './firebase.js';
import { showSpinner, hideSpinner } from "./loaderPage.js";

showSpinner();

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
<a href="register.html" class="header__button header__button-signup">Sign Up</a>
`;
el.insertAdjacentHTML('beforeend', content);

const userEmail = document.getElementById('email');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

document.getElementById('form-recovery').addEventListener('submit', handleReset);

function handleReset(e) {
    e.preventDefault();
    const email = userEmail.value;

    if (email === '') {
        displayErrorMessage('Email is required');
        return;
    }

    if (!emailPattern.test(email)) {
        displayErrorMessage('Invalid email format');
        return;
    }

    recoveryPassword({ email }).then(() => {
        displaySuccessMessage('Password reset email sent!');
        userEmail.value = '';
    }).catch(error => {
        displayErrorMessage(error.message);
    });
}

async function recoveryPassword({ email }) {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (e) {
        if (e.code === 'auth/user-not-found') {
            throw new Error('User with this email not found. Kindly sign-up!');
        } else {
            throw new Error(e.message);
        }
    }
}

function displayErrorMessage(message) {
  errorMessage.textContent = message;
  successMessage.textContent = '';
}

function displaySuccessMessage(message) {
  successMessage.textContent = message;
  errorMessage.textContent = '';
}

window.addEventListener('load', () => hideSpinner());
