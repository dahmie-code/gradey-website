export default class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick.bind(this));
  }

  render() {
    const title = this.getAttribute('title') || 'Button';
    const btnClass = this.getAttribute('class');
    const mobileIcon = this.getAttribute('mobile-icon');
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/buttons/button.css"> 
      <button type="button" aria-label="Button ${title}" class="button ${btnClass}" mobile-icon="${mobileIcon || ''}">${title}</button>
    `;
  }

  handleClick() {
    const action = this.getAttribute('action');
    if (action === 'goBack') {
      this.goBack();
    }
  }

  goBack() {
    window.history.back();
  }
}

customElements.define('button-component', Button);
