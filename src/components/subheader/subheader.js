import { Search } from '../search/search.js';
export default class Subheader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const buttons = JSON.parse(this.getAttribute('buttons')) || {};
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="./components/subheader/subheader.css">
    <section class="subheader">
        <div class="container justify-content-between">
        <button-component action="${buttons.leftBtn.action || ''}" title="${buttons.leftBtn.title || 'Button'}" aria-label="${buttons.leftBtn.title || 'Button'}" class="button--blue ${buttons.leftBtn.class || ''}" mobile-icon="${buttons.leftBtn.mobileIcon || ''}"></button-component>
        <search-component></search-component>
        <button-component action="${buttons.rightBtn.action || ''}" title="${buttons.rightBtn.title || 'Button'}" aria-label="${buttons.rightBtn.title || 'Button'}"  class="button--blue ${buttons.rightBtn.class || ''}"></button-component>  
        </div>
    </section>`;
  }
}

customElements.define('subheader-component', Subheader);
