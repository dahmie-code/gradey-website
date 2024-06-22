export default class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // Initialization tasks when the element is connected to the DOM.
  connectedCallback() {
    this.render();
    this.addEventListeners();
    this.hideModal();
  }

  render() {
    const style = this.getAttribute('style-file');
    const styleFile = style === 'modal-form' ? '<link rel="stylesheet" href="./components/modal/modal-form.css">' : '';
    this.shadowRoot.innerHTML += styleFile;
    this.shadowRoot.innerHTML += `  
    <link rel="stylesheet" href="./components/modal/modal.css">
    <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__content modal__content-form">
          <div class="modal__header">
            <button class="modal__close" aria-label="Close">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.1045 30.8958L30.8962 19.1041M30.8962 30.8958L19.1045 19.1041M25.0003 45.8333C36.4587 45.8333 45.8337 36.4583 45.8337 25C45.8337 13.5416 36.4587 4.16663 25.0003 4.16663C13.542 4.16663 4.16699 13.5416 4.16699 25C4.16699 36.4583 13.542 45.8333 25.0003 45.8333Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <h2 class="modal__title">Modal title</h2>
          </div>
          <div class="modal__body">
          </div>
        </div>
    </div>
    `;
  }

  showModal() {
    this.removeAttribute('hidden');
  }

  hideModal() {
    this.setAttribute('hidden', '');
  }

  addEventListeners() {
    const closeButton = this.shadowRoot.querySelector('.modal__close');
    closeButton.addEventListener('click', () => {
      this.hideModal();
    });
  }
}
customElements.define('modal-component', Modal);
