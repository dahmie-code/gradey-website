class Sidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.logoutHandler();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="./components/sidebar/sidebar.css"> 
    <aside class="main-sidebar">
    <div class="logo">
      <a href="index.html"><img src="./img/logo-circle.png" alt="logo" class="header__logo" aria-labelledby="logo"></a>
    </div>
        <nav class="main-nav nav">
            <ul class="nav__list">
                <li class="nav__item"><a href="#" class="nav__link">
                    <img src="./img/svg/house.svg" alt="Icon dashboard" class="nav__item--image" />
                    <span class="nav__item--title">Dashboard</span></a></li>
                <li class="nav__item"><a href="#" class="nav__link">
                    <img src="./img/svg/booksaved.svg" alt="Icon  courses" class="nav__item--image" />
                    <span class="nav__item--title">Courses</span></a>
                </li>
                <li class="nav__item"><a href="#" class="nav__link nav__link--active">
                    <img src="./img/svg/clock.svg" alt="Icon Assessments" class="nav__item--image" />
                    <span class="nav__item--title">Assessments</span></a>
                </li>
                <li class="nav__item"><a href="#" class="nav__link">
                    <img src="./img/svg/exportsquare.svg" alt="Icon Export/Import" class="nav__item--image" />
                    <span class="nav__item--title">Import/Export</span></a>
                </li>
                <li class="nav__item"><a href="#" class="nav__link" id="logoutButton">
                    <img src="./img/svg/usersquare.svg" alt="Icon user logout" class="nav__item--image" />
                    <span class="nav__item--title">Logout</span></a>
                </li>
            </ul>
        </nav>
    </aside>
    `;
    this.logoutButton = this.shadowRoot.getElementById('logoutButton');
  }

  // logout handler
  logoutHandler() {
    this.logoutButton.addEventListener('click', async (e) => {
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

customElements.define('sidebar-component', Sidebar);
