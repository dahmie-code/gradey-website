const creteModalConfirm = async ({
  modalTitle, modalMessage, confirmText, cancelText,
}) => {
  const modalComponent = document.querySelector('modal-component');
  const title = modalComponent.shadowRoot.querySelector('.modal__title');
  title.textContent = modalTitle || 'Are you sure?';
  const body = modalComponent.shadowRoot.querySelector('.modal__body');
  let listHTML = '';
  listHTML = `
  <div class="modal__confirm--container">
    <p class="modal__confirm--message">${modalMessage}</p>
    <div class="add-item__buttons">
        <button class="add-item__button add-item__button--save add-item__button--fill" aria-label="Save">${confirmText || 'Ok'}</button>
        <button class="add-item__button add-item__button--cancel" aria-label="Cancel">${cancelText || 'Cancel'}</button>
    </div>
  <div>
  `;
  body.innerHTML = listHTML;
};

const handleConfirmModalButtons = (method) => {
  const modalComponent = document.querySelector('modal-component');
  const btnCancel = modalComponent.shadowRoot.querySelector('.add-item__button--cancel');
  const brnConfirm = modalComponent.shadowRoot.querySelector('.add-item__button--save');
  btnCancel.addEventListener('click', () => {
    method.oncancel();
    modalComponent.hideModal();
  });
  brnConfirm.addEventListener('click', () => {
    method.onconfirm();
    modalComponent.hideModal();
  });
};

export { creteModalConfirm, handleConfirmModalButtons };
