const showHidePassword = () => {
  const showPasswordButton = document.querySelectorAll('.show-password');
  showPasswordButton.forEach((btn) => {
    btn.addEventListener('click', () => {
      const inputElem = btn.previousElementSibling;
      const getPasswordState = inputElem.getAttribute('type');
      getPasswordState === 'password' ? inputElem.type = 'text' : inputElem.type = 'password'
    });
  });
};
export default showHidePassword;
