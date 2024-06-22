class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.userName = localStorage.getItem('userName');
  }

  connectedCallback() {
    this.render();
    this.showUserName(this.userName);
    this.menuIconClickHandler();
    this.dropdownMenuBtnHandler();
    this.logoutHandler();
  }

  render() {
    const headerClass = this.getAttribute('class') || '';
    const user = this.getAttribute('user');
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="./components/header/header.css">
    <header class="site-header ${headerClass}">
      <div class="container justify-content-between align-items-center flex-direction-row">
        <div class="logo">
          <a href="index.html"><img src="./img/logo-circle.png" alt="logo" class="header__logo" aria-labelledby="logo"></a>
        </div>
        ${user === 'true' ? this.getUserDropdownHTML() : ''}
        <div class="menu__icon-container">
          <img src='./img/svg/burger-menu.svg' alt='burger menu icon' class='menu__icon menu__icon-close'>
          <img src='./img/svg/close-menu.svg' alt='burger menu icon' class='menu__icon menu__icon-open'>
        </div>
      </div>
    </header>
    `;
    this.menuIcon = this.shadowRoot.querySelector('.menu__icon-container');
    this.dropdownMenuBtn = this.shadowRoot.querySelector('.dropdown-toggle-btn');
    this.logoutButton = this.shadowRoot.getElementById('header-dropdown-menu');
  }

  getUserDropdownHTML() {
    return `
      <div class="dropdown user__name">
        <div class="dropdown-toggle dropdown-toggle-btn">
          <div>
            <span id='currentUserName'></span>
          </div>
          <div class="user-icon__img">
            <img src="./img/svg/user-icon.svg" alt="avatar" width="100%" height="100%">
          </div>
        </div>
        <div class="dropdown-menu" id="header-dropdown-menu">
          <a class="dropdown-item">Log Out</a>
        </div>
      </div>
    `;
  }

  showUserName(fullName) {
    const fullNameElement = this.shadowRoot.getElementById('currentUserName');
    fullNameElement ? fullNameElement.textContent = fullName || 'Student' : null;
  }

  menuIconClickHandler() {
    const menuContainer = document.querySelector('sidebar-component');
    this.menuIcon.addEventListener('click', () => {
      this.menuIcon.classList.toggle('is-active');
      const subheaderComponent = document.querySelector('subheader-component');
      const subheader = subheaderComponent.shadowRoot.querySelector('.subheader');
      [subheader, menuContainer].forEach((item) => {
        item.classList.toggle('is-active');
      });
    });
  }

  dropdownMenuBtnHandler() {
    const dropdownMenu = this.shadowRoot.querySelector('.dropdown-menu');
    this.dropdownMenuBtn && this.dropdownMenuBtn.addEventListener('click', () => {
      dropdownMenu.classList.toggle('show');
    });
  }


  logoutHandler() {
    this.logoutButton && this.logoutButton.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        localStorage.clear();
        window.location.href = './login.html';
      } catch (error) {
        console.log('Error', error);
      }
    });
  }
}

customElements.define('header-component', Header);
