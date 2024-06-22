export default class BurgerMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    emitCheckedChangeEvent(checked) {
        const event = new CustomEvent('menuToggle', { detail: checked });
        window.dispatchEvent(event);
    }

    connectedCallback() {
        this.render();
        const menuToggle = this.shadowRoot.querySelector('#menu__toggle');
        const self = this;

        menuToggle.addEventListener('change', function() {
            const isChecked = this.checked;
            self.emitCheckedChangeEvent(isChecked);
        });

        window.addEventListener('closeMenu', (event) => {
            const isChecked = event.detail;
            const menuToggle = this.shadowRoot.querySelector('#menu__toggle');
            if (menuToggle && isChecked) {
                menuToggle.checked = false;
            }
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
           <link rel="stylesheet" href="./components/burger-menu/burger-menu.css">  
		   <div class="menu__button">
		      <input id="menu__toggle" type="checkbox" />
		      <label class="menu__btn menu__btn--bright-bg" for="menu__toggle">
		        <span>
		        </span>
              </label>
		  </div>
    `;
    }

}

customElements.define('burger-menu', BurgerMenu);
