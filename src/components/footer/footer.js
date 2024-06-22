class Footer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
          <link rel="stylesheet" href="./components/footer/footer.css">
          <footer class="site-footer">
          <div class="container flex-direction-column">
            <h4 class="footer__title">Download the Gradey App </h4>
            <a href="https://apps.apple.com/ca/app/gradey-grade-tracker/id1431015395" target="_blank" class="footer__link">
              <img src="./img/apple-app-store-icon.png" alt="App store" class="footer__icon" />
            </a>
            <p class="footer__copyright"> &copy; Gradey - Grade Tracker, All rights reserved.</p>
          </div>
        `;
    }
}
customElements.define('footer-component', Footer);

