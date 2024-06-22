// eslint-disable-next-line import/prefer-default-export
export class Search extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.pageSpecificSearchHandler = null;
  }

  connectedCallback() {
    this.render();
    this.searchEventListener();
  }

  setPageSpecificSearchHandler(handler) {
    this.pageSpecificSearchHandler = handler;
  }

  render() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="./components/search/search.css"> 
    <div class="search-block">
      <input id="searchBox" type="text" class="search-block__input" placeholder="Search the items">
      <img src="./img/svg/searchzoomin.svg" alt="search icon" class="search-block__icon"/>
    </div>
    `;
    this.searchItem = this.shadowRoot.getElementById('searchBox');
  }

  handleSearch(searchItem) {
    if (this.pageSpecificSearchHandler) {
      this.pageSpecificSearchHandler(searchItem.value);
    }
  }

  searchEventListener() {
    this.searchItem.addEventListener('keyup', () => {
      this.handleSearch(this.searchItem);
    });
  }
}

customElements.define('search-component', Search);
