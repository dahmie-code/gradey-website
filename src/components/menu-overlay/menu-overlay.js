export default class MenuOverlay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    emitCloseMenuEvent(checked) {
        const event = new CustomEvent('closeMenu', { detail: checked });
        window.dispatchEvent(event);
    }

    connectedCallback() {
        const self = this;
        this.render();
        window.addEventListener('menuToggle', (event) => {
            const isChecked = event.detail;
            if (!isChecked) {
                this.handleClick('close');
            } else {
                this.handleClick('open');
            }
        });

        const allElement =  this.shadowRoot.querySelectorAll('.hover-menu__link')
        allElement.forEach((el) => {
            el.addEventListener('click', () => {
                this.handleClick('close')
                self.emitCloseMenuEvent('close-menu')
            })
        })
    }

    handleClick(newState) {
        const overlay = this.shadowRoot.querySelector('.overlay');
        if (newState === 'open') {
            overlay.classList.add('overlay-opened');
            overlay.classList.remove('overlay-closed')
        } else {
            overlay.classList.add('overlay-closed');
            overlay.classList.remove('overlay-opened');
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
           <link rel="stylesheet" href="./components/menu-overlay/menu-overlay.css">  
		   <div class="overlay overlay-closed">
              <div class="hover-menu">
                 <div class="hover-menu__container hover-menu__container-tab">
                    <nav class="nav-menu">
                       <ul class="menu-list">
                          <li class="hover-menu__item">
                            <a href="#home" class="hover-menu__link">
                              Home
                            </a>
                          </li>
                          <li class="hover-menu__item">
                            <a href="#features" class="hover-menu__link">
                              Features
                            </a>
                          </li>
                          <li class="hover-menu__item">
                            <a href="#usage" class="hover-menu__link">
                              How it works
                            </a>
                          </li>
                          <li class="hover-menu__item">
                            <a href="#feedback" class="hover-menu__link">
                              Review
                            </a>
                           </li>
                          <li class="hover-menu__item">
                            <a href="#contacts" class="hover-menu__link">
                              Contact us
                            </a>
                          </li>
                       </ul>
                    </nav>
                 </div>
              </div>
           </div>
    `;
    }

}

customElements.define('menu-overlay', MenuOverlay);
