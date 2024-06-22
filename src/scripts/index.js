import { Email } from './smtp.js';
import { showSpinner, hideSpinner } from "./loaderPage.js";

showSpinner();

// Displaying the header
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

// Event to submit the form
document.getElementById('form').addEventListener('submit', handleSubmit);

// creating modal content
const modalComponent = document.querySelector('modal-component');
const createModalMessage = async ({modalTitle, modalMessage}) =>{
  
  const title = modalComponent.shadowRoot.querySelector('.modal__title');
  title.textContent = modalTitle || 'Sent';
  const body = modalComponent.shadowRoot.querySelector('.modal__body');
  let content = '';
  content = `
  <div class ="modal__confirm--container">
    <p class="modal__confirm--message">${modalMessage}</p>
  </div>
    `;
  body.innerHTML = content;
}

// function to display modal error Message
const displayErrorModal = (errorMessage) => {
  createModalMessage({
    modalTitle: "Oops! Error",
    modalMessage: errorMessage,
  }).then(() => {
    modalComponent.showModal();
  });
};
// function to send email with contact us details for action
function handleSubmit (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const mail = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(el => el.textContent = '');

  let isValid = true;

  if (name.trim() === '') {
    document.getElementById('nameError').textContent = 'Name is required';
    isValid = false;
  }

  if (mail.trim() === '') {
    document.getElementById('emailError').textContent = 'Email is required';
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      document.getElementById('emailError').textContent = 'Invalid email format. Email should be in this format: hi@email.com';
      isValid = false;
    }
  }

  if (subject.trim() === '') {
    document.getElementById('subjectError').textContent = 'Subject is required';
    isValid = false;
  }

  if (message.trim() === '') {
    document.getElementById('messageError').textContent = 'Message is required';
    isValid = false;
  }

  if (isValid) {
      Email.send({
    Host: 'smtp.elasticemail.com',
    Username: 'contactgradey@gmail.com',
    Password:'E8EC4148F31E21029AA2018C4C171D8E4663',
    To: 'contactgradey@gmail.com',
    From: 'contactgradey@gmail.com',
    Subject: 'Message received from contact form on Gradey-Grade App!',
    Body: `Name: ${name}<br>
           Email: ${mail}<br>
           Subject: ${subject}<br>
           Message: ${message}`
  }).then(
    message => {
      if (message === 'OK') {
        createModalMessage({
          modalTitle: "Success",
          modalMessage:"Your message has been sent successfully!"
        }).then(() => {
          modalComponent.showModal();
          setTimeout(() => {
            location.reload();
          }, 3500);
        })       
      } else {
        displayErrorModal(`Email not sent. Error: ${message}`)
        console.error('Email not sent. Error:', message);
      }
    }
  ).catch(error => {
    displayErrorModal(`Email not sent. Error: ${error}`);
    console.error('Email not sent. Error:', error);
  });
  }
}

window.addEventListener('load', () => hideSpinner());
