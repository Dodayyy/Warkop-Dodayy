class AppFooter extends HTMLElement {
  static get observedAttributes() {
    return ['copyright', 'year', 'brand'];
  }

  constructor() {
    super();
  }

  get copyright() {
    return this.getAttribute('copyright') ?? '©';
  }

  get year() {
    return this.getAttribute('year') ?? new Date().getFullYear();
  }

  get brand() {
    return this.getAttribute('brand') ?? 'Warkop Dodayy';
  }

  connectedCallback() {
    this.updateContent();
  }

  updateContent() {
    this.innerHTML = `
      <footer>
        <p>Copyright ${this.copyright} ${this.year} - ${this.brand}</p>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
