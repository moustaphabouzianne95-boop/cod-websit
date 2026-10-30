import React, { useMemo, useState } from 'react';
import { site } from './siteConfig';

const formats = [
  {
    id: '50',
    label: '50 ml',
    subtitle: 'L’essentiel, à emporter',
    price: 349,
    oldPrice: 399,
  },
  {
    id: '100',
    label: '100 ml',
    subtitle: 'Le rituel au quotidien',
    price: 549,
    oldPrice: 629,
    badge: 'Le plus choisi',
  },
];

const products = [
  {
    id: 'aube',
    number: '01',
    name: 'Aube d’Or',
    category: 'Mixte',
    family: 'Floral ambré',
    tagline: 'Une lumière douce qui reste sur la peau.',
    description: 'Une eau de parfum mixte à la tenue généreuse. Vaporisez-la sur les points de pulsation, puis laissez votre peau raconter le reste.',
    noteLine: 'Safran · Néroli · Bois ambré',
    prices: { 50: 349, 100: 549 },
    oldPrices: { 50: 399, 100: 629 },
    bottle: { light: '#dfbb68', mid: '#d29635', dark: '#8c541b', accent: '#a36c27', card: '#ded0b5' },
  },
  {
    id: 'nuit',
    number: '02',
    name: 'Nuit de Thé',
    category: 'Femme',
    family: 'Floral oriental',
    tagline: 'Un thé noir velouté, relevé d’une rose de minuit.',
    description: 'Nuit de Thé compose un sillage tendre et mystérieux, où la rose s’habille de thé noir et d’une vanille soyeuse.',
    noteLine: 'Thé noir · Rose damascena · Vanille',
    prices: { 50: 369, 100: 579 },
    oldPrices: { 50: 419, 100: 659 },
    bottle: { light: '#b47a72', mid: '#914f55', dark: '#592f35', accent: '#81464c', card: '#d8bec0' },
  },
  {
    id: 'cedre',
    number: '03',
    name: 'Cèdre Nomade',
    category: 'Homme',
    family: 'Boisé épicé',
    tagline: 'L’élégance tranquille du bois, jamais attendue.',
    description: 'Un départ poivré et vif, une profondeur de cèdre sec, puis un accord cuir doux qui signe la peau avec assurance.',
    noteLine: 'Poivre noir · Cèdre atlas · Cuir doux',
    prices: { 50: 379, 100: 589 },
    oldPrices: { 50: 429, 100: 679 },
    bottle: { light: '#c29d6f', mid: '#92663d', dark: '#4c3424', accent: '#765031', card: '#cdb99c' },
  },
  {
    id: 'fleur',
    number: '04',
    name: 'Fleur de Sable',
    category: 'Mixte',
    family: 'Musqué solaire',
    tagline: 'Une fleur blanche chauffée par le sable.',
    description: 'Fleur de Sable révèle un musc propre, une tubéreuse lumineuse et un souffle salin pour les journées qui durent.',
    noteLine: 'Tubéreuse · Sel de mer · Musc blanc',
    prices: { 50: 359, 100: 559 },
    oldPrices: { 50: 409, 100: 639 },
    bottle: { light: '#ddc79d', mid: '#c6a66d', dark: '#8b7657', accent: '#8d7042', card: '#e0d7c3' },
  },
];

const catalogCategories = ['Tous', 'Femme', 'Homme', 'Mixte'];

function getFormats(product) {
  return formats.map((format) => ({
    ...format,
    price: product.prices[format.id],
    oldPrice: product.oldPrices[format.id],
  }));
}


const reviews = [
  {
    text: 'Le flacon est encore plus beau en vrai, et le parfum tient toute la journée. La confirmation par téléphone m’a rassurée.',
    name: 'Salma B.',
    city: 'Oujda',
    initials: 'SB',
  },
  {
    text: 'Commande reçue en 24 h à Casablanca. L’odeur est raffinée, pas entêtante, exactement ce que je cherchais.',
    name: 'Yassine K.',
    city: 'Casablanca',
    initials: 'YK',
  },
  {
    text: 'J’ai choisi le 100 ml pour l’offrir : packaging soigné, paiement à la réception et un sillage magnifique.',
    name: 'Nour A.',
    city: 'Rabat',
    initials: 'NA',
  },
];

const faqs = [
  {
    question: 'Comment fonctionne le paiement à la livraison ?',
    answer: 'Vous réglez votre commande en espèces lorsque votre colis est livré. Aucun paiement en ligne n’est demandé au moment de la commande.',
  },
  {
    question: 'Le parfum est-il authentique ?',
    answer: 'Oui. Chaque flacon Maison Noor est contrôlé, scellé et expédié dans son étui signature. Notre équipe reste disponible avant et après votre livraison.',
  },
  {
    question: 'Dans combien de temps serai-je livré(e) ?',
    answer: 'Nous préparons les commandes après confirmation. Comptez généralement 24 à 48 h dans les principales villes du Maroc.',
  },
  {
    question: 'Puis-je modifier mon adresse après ma commande ?',
    answer: 'Oui. Répondez simplement à notre appel de confirmation ou contactez-nous dès que possible, avant l’expédition du colis.',
  },
];

function formatMoney(amount) {
  return `${new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 0 }).format(amount)} MAD`;
}

function Icon({ name, size = 20, stroke = 1.8 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const paths = {
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    arrowUp: <><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>,
    bag: <><path d="M5 8.5h14l-1 12H6l-1-12Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    check: <path d="m5 12 4.2 4L19 6.5" />,
    shield: <><path d="M12 3 19 6v5.2c0 4.4-3 7.8-7 9.8-4-2-7-5.4-7-9.8V6l7-3Z" /><path d="m8.6 12.1 2.2 2.2 4.7-5" /></>,
    truck: <><path d="M3 5h11v11H3z" /><path d="M14 9h3.3L21 13v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
    phone: <><path d="M8.3 3.7 6.6 5.2c-.7.6-.9 1.6-.5 2.5 1.6 3.9 4.6 6.9 8.5 8.5.9.4 1.9.2 2.5-.5l1.5-1.7c.6-.7.6-1.7.1-2.4l-1.3-1.8c-.5-.7-1.4-1-2.2-.6l-1.3.6c-1.7-.8-3.1-2.2-3.9-3.9l.6-1.3c.4-.8.1-1.7-.6-2.2L10.7 3c-.7-.5-1.7-.5-2.4.1Z" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    leaf: <><path d="M20 4C11.5 4.2 5.4 7 4.4 14.2c-.4 2.6 1.6 5 4.2 5.1C15.8 19.7 19.8 11.5 20 4Z" /><path d="M4.5 19.5C8.2 14.9 11.7 11.7 17 8" /></>,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function BrandMark({ light = false }) {
  return (
    <span className={`brand-mark${light ? ' brand-mark--light' : ''}`} aria-hidden="true">
      <span className="brand-mark__arc" />
      <span className="brand-mark__letter">N</span>
    </span>
  );
}

function StarRating({ compact = false }) {
  return (
    <span className={`stars${compact ? ' stars--compact' : ''}`} aria-label="5 étoiles sur 5">
      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
    </span>
  );
}

function FragranceBottle({ product = products[0], mini = false, shadow = true }) {
  const label = product.name.toUpperCase();
  return (
    <div
      className={`bottle-art${mini ? ' bottle-art--mini' : ''}${shadow ? '' : ' bottle-art--no-shadow'}`}
      aria-label={`Flacon de parfum ${product.name}`}
      style={{
        '--bottle-light': product.bottle.light,
        '--bottle-mid': product.bottle.mid,
        '--bottle-dark': product.bottle.dark,
        '--bottle-accent': product.bottle.accent,
      }}
    >
      <span className="bottle-art__halo" />
      <span className="bottle-art__sprig bottle-art__sprig--one" />
      <span className="bottle-art__sprig bottle-art__sprig--two" />
      <div className="bottle-art__cap">
        <span /><span /><span />
      </div>
      <div className="bottle-art__neck" />
      <div className="bottle-art__glass">
        <span className="bottle-art__shine" />
        <span className="bottle-art__gold" />
        <div className="bottle-art__label">
          <span className="bottle-art__seal">MN</span>
          <strong>MAISON<br />NOOR</strong>
          <small>{label}</small>
          <i>EAU DE PARFUM</i>
        </div>
      </div>
      <span className="bottle-art__ground" />
    </div>
  );
}

function QuantityControl({ value, onChange, dark = false }) {
  return (
    <div className={`quantity-control${dark ? ' quantity-control--dark' : ''}`} aria-label="Quantité">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Diminuer la quantité"><Icon name="minus" size={14} /></button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(Math.min(5, value + 1))} aria-label="Augmenter la quantité"><Icon name="plus" size={14} /></button>
    </div>
  );
}

function App() {
  const [activeProductId, setActiveProductId] = useState('aube');
  const [selectedFormat, setSelectedFormat] = useState('100');
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [catalogFilter, setCatalogFilter] = useState('Tous');
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
  });

  const activeProduct = products.find((product) => product.id === activeProductId) || products[0];
  const activeFormats = getFormats(activeProduct);
  const selected = activeFormats.find((item) => item.id === selectedFormat) || activeFormats[1];
  const visibleProducts = catalogFilter === 'Tous'
    ? products
    : products.filter((product) => product.category === catalogFilter);

  const cartEntries = useMemo(() => cartItems.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    if (!product) return null;
    const format = getFormats(product).find((candidate) => candidate.id === item.formatId);
    if (!format) return null;
    return { ...item, product, format };
  }).filter(Boolean), [cartItems]);

  const checkoutEntries = cartEntries.length
    ? cartEntries
    : [{ product: activeProduct, format: selected, quantity }];
  const checkoutSubtotal = checkoutEntries.reduce((sum, item) => sum + (item.format.price * item.quantity), 0);
  const shipping = checkoutSubtotal >= 499 ? 0 : 35;
  const total = checkoutSubtotal + shipping;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartEntries.reduce((sum, item) => sum + (item.format.price * item.quantity), 0);
  const cartShipping = cartSubtotal >= 499 ? 0 : 35;
  const cartTotal = cartSubtotal + cartShipping;

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  };

  const goToOrder = () => {
    setMenuOpen(false);
    document.getElementById('commande')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('customer-name')?.focus({ preventScroll: true }), 650);
  };

  const selectProduct = (productId, shouldScroll = true) => {
    setActiveProductId(productId);
    setSelectedFormat('100');
    setQuantity(1);
    setSubmitted(false);
    if (shouldScroll) {
      window.setTimeout(() => document.getElementById('rituel')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }
  };

  const addItem = (product, formatId = '100', itemQuantity = 1, openCart = true) => {
    const format = getFormats(product).find((candidate) => candidate.id === formatId) || getFormats(product)[1];
    setCartItems((current) => {
      const existing = current.find((item) => item.productId === product.id && item.formatId === format.id);
      if (existing) {
        return current.map((item) => item.productId === product.id && item.formatId === format.id
          ? { ...item, quantity: Math.min(5, item.quantity + itemQuantity) }
          : item);
      }
      return [...current, { productId: product.id, formatId: format.id, quantity: itemQuantity }];
    });
    if (openCart) setCartOpen(true);
    showToast(`${product.name} ${format.label} ajouté au panier`);
  };

  const addToCart = (openCart = true) => addItem(activeProduct, selectedFormat, quantity, openCart);

  const handleBuyNow = () => {
    setCartItems([{ productId: activeProduct.id, formatId: selectedFormat, quantity }]);
    showToast(`${activeProduct.name} prêt à commander`);
    goToOrder();
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
    setSubmitted(false);
  };

  const updateCartQuantity = (productId, formatId, nextQuantity) => {
    if (nextQuantity < 1) {
      setCartItems((current) => current.filter((item) => !(item.productId === productId && item.formatId === formatId)));
      return;
    }
    setCartItems((current) => current.map((item) => item.productId === productId && item.formatId === formatId
      ? { ...item, quantity: Math.min(5, nextQuantity) }
      : item));
  };

  const removeCartItem = (productId, formatId) => {
    setCartItems((current) => current.filter((item) => !(item.productId === productId && item.formatId === formatId)));
  };

  const createOrderPayload = () => ({
    orderId: `MN-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`,
    createdAt: new Date().toISOString(),
    status: 'Nouvelle',
    customer: {
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city,
      address: form.address.trim(),
    },
    items: checkoutEntries.map((item) => ({
      name: item.product.name,
      variant: item.format.label,
      quantity: item.quantity,
      unitPrice: item.format.price,
      lineTotal: item.format.price * item.quantity,
    })),
    subtotal: checkoutSubtotal,
    shipping,
    total,
    currency: 'MAD',
    paymentMethod: 'Paiement à la livraison',
    source: 'Maison Noor — site web',
    whatsapp: 'Lien de confirmation proposé',
  });

  const sendOrderToSheet = (payload) => {
    if (!site.ordersEndpoint) return;
    // text/plain keeps this request simple for an Apps Script Web App endpoint.
    fetch(site.ordersEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // The customer has already received confirmation; the Apps Script log can be retried if needed.
    });
  };

  const whatsappConfirmationUrl = lastOrder ? (() => {
    const lines = [
      'Bonjour Maison Noor,',
      `Je confirme ma commande COD ${lastOrder.orderId}.`,
      '',
      `Client : ${lastOrder.customer.name}`,
      `Téléphone : ${lastOrder.customer.phone}`,
      `Ville : ${lastOrder.customer.city}`,
      `Adresse : ${lastOrder.customer.address}`,
      '',
      'Articles :',
      ...lastOrder.items.map((item) => `• ${item.name} ${item.variant} ×${item.quantity}`),
      '',
      `Total à régler : ${formatMoney(lastOrder.total)}`,
      'Paiement : à la livraison.',
    ];
    return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  })() : '';

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
  };

  const submitOrder = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Indiquez votre nom complet.';
    if (form.phone.replace(/\D/g, '').length < 9) nextErrors.phone = 'Saisissez un numéro valide.';
    if (!form.city) nextErrors.city = 'Choisissez votre ville.';
    if (form.address.trim().length < 6) nextErrors.address = 'Ajoutez une adresse de livraison.';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      showToast('Quelques informations sont à compléter.');
      return;
    }

    const orderPayload = createOrderPayload();
    if (!cartItems.length) {
      setCartItems([{ productId: activeProduct.id, formatId: selectedFormat, quantity }]);
    }
    setLastOrder(orderPayload);
    sendOrderToSheet(orderPayload);
    setSubmitted(true);
    showToast(site.ordersEndpoint ? 'Commande transmise. Confirmez-la sur WhatsApp.' : 'Commande prête. Confirmez-la sur WhatsApp.');
  };

  return (
    <div className="site-shell">
      <div className="announcement-bar">
        <div className="announcement-bar__inner">
          <span><Icon name="truck" size={15} /> Livraison offerte dès 499 MAD</span>
          <span className="announcement-separator">•</span>
          <span><Icon name="shield" size={15} /> Paiement à la livraison partout au Maroc</span>
          <span className="announcement-separator announcement-separator--last">•</span>
          <span className="announcement-extra">Parfums contrôlés &amp; scellés</span>
        </div>
      </div>

      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="Maison Noor, accueil">
          <BrandMark />
          <span className="brand__text"><strong>MAISON</strong><small>NOOR</small></span>
        </a>

        <nav className={`desktop-nav${menuOpen ? ' desktop-nav--open' : ''}`} aria-label="Navigation principale">
          <a href="#catalogue" onClick={() => setMenuOpen(false)}>La collection</a>
          <a href="#fragrance" onClick={() => setMenuOpen(false)}>La fragrance</a>
          <a href="#rituel" onClick={() => setMenuOpen(false)}>Notre promesse</a>
          <a href="#avis" onClick={() => setMenuOpen(false)}>Vos avis</a>
          <button className="nav-mobile-order" type="button" onClick={goToOrder}>Commander</button>
        </nav>

        <div className="header-actions">
          <button className="header-order-button" type="button" onClick={goToOrder}>Commander</button>
          <button className="cart-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Panier, ${cartCount} article${cartCount > 1 ? 's' : ''}`}>
            <Icon name="bag" size={20} />
            <span className="cart-button__count">{cartCount}</span>
          </button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((current) => !current)} aria-expanded={menuOpen} aria-label="Ouvrir le menu">
            <Icon name={menuOpen ? 'close' : 'menu'} size={23} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero__left">
            <div className="hero__eyebrow"><span /> EAU DE PARFUM · ÉDITION SIGNATURE</div>
            <h1>Le sillage qui<br /><em>vous précède.</em></h1>
            <p className="hero__description">Aube d’Or mêle la chaleur du safran à un cœur de fleur d’oranger, sur un fond de bois ambré. Une présence discrète, inoubliable.</p>
            <div className="hero__product-line">
              <div className="hero__rating"><StarRating compact /><span>4,9 <i>— 1 284 avis vérifiés</i></span></div>
              <span className="hero__line" />
              <span>À partir de <strong>{formatMoney(formats[0].price)}</strong></span>
            </div>
            <div className="hero__actions">
              <button className="button button--gold" type="button" onClick={goToOrder}>Commander maintenant <Icon name="arrow" size={18} /></button>
              <a className="text-link" href="#fragrance">Découvrir le sillage <span>↓</span></a>
            </div>
            <div className="hero__assurances">
              <span><Icon name="shield" size={18} /> 100 % authentique</span>
              <span><Icon name="truck" size={18} /> Reçu puis payé</span>
            </div>
          </div>

          <div className="hero__right" aria-label="Présentation du parfum Aube d’Or">
            <span className="hero__sun hero__sun--one" />
            <span className="hero__sun hero__sun--two" />
            <div className="hero__arch" />
            <p className="hero__vertical-type">AUBE D’OR · 01</p>
            <div className="hero__bottle-wrap"><FragranceBottle /></div>
            <div className="hero-note hero-note--saffron"><span>01</span><strong>SAFRAN</strong><small>éclat épicé</small></div>
            <div className="hero-note hero-note--neroli"><span>02</span><strong>NÉROLI</strong><small>cœur lumineux</small></div>
            <div className="hero__roundel"><span>MAISON NOOR</span><b>✦</b><span>PARIS · MAROC</span></div>
            <div className="hero__edition">N° <b>01</b><br />ÉDITION<br />SIGNATURE</div>
          </div>
        </section>

        <section className="trust-ribbon" aria-label="Les garanties Maison Noor">
          <div><span className="trust-ribbon__number">01</span><Icon name="shield" size={19} /><p><strong>Authenticité garantie</strong><small>Flacon scellé &amp; contrôlé</small></p></div>
          <div><span className="trust-ribbon__number">02</span><Icon name="phone" size={19} /><p><strong>Confirmation humaine</strong><small>Nous validons chaque commande</small></p></div>
          <div><span className="trust-ribbon__number">03</span><Icon name="bag" size={19} /><p><strong>Vous payez à réception</strong><small>Simple, sans carte bancaire</small></p></div>
        </section>

        <section className="catalog-section section" id="catalogue">
          <div className="catalog-heading">
            <div>
              <p className="section-kicker">LA COLLECTION 2026</p>
              <h2>Un parfum pour<br /><em>chaque empreinte.</em></h2>
            </div>
            <p>Explorez quatre signatures composées pour suivre vos jours, vos nuits et ce que vous laissez dans l’air.</p>
          </div>
          <div className="catalog-toolbar">
            <span>{visibleProducts.length} parfum{visibleProducts.length > 1 ? 's' : ''}</span>
            <div className="catalog-filters" aria-label="Filtrer la collection">
              {catalogCategories.map((category) => (
                <button key={category} type="button" className={catalogFilter === category ? 'active' : ''} onClick={() => setCatalogFilter(category)}>{category}</button>
              ))}
            </div>
          </div>
          <div className="catalog-grid">
            {visibleProducts.map((product) => {
              const fromPrice = getFormats(product)[0].price;
              return (
                <article className={`product-card${activeProduct.id === product.id ? ' product-card--active' : ''}`} key={product.id}>
                  <div className="product-card__visual" style={{ '--card-background': product.bottle.card }}>
                    <span className="product-card__number">N° {product.number}</span>
                    <span className="product-card__family">{product.family}</span>
                    <FragranceBottle product={product} shadow={false} />
                    {product.id === 'aube' && <span className="product-card__tag">Best seller</span>}
                  </div>
                  <div className="product-card__body">
                    <p>{product.category} · Eau de parfum</p>
                    <h3>{product.name}</h3>
                    <span className="product-card__notes">{product.noteLine}</span>
                    <div className="product-card__footer">
                      <strong>Dès {formatMoney(fromPrice)}</strong>
                      <div>
                        <button className="product-card__discover" type="button" onClick={() => selectProduct(product.id)}>Découvrir</button>
                        <button className="product-card__quick" type="button" aria-label={`Ajouter ${product.name} au panier`} onClick={() => { setActiveProductId(product.id); setSelectedFormat('100'); addItem(product, '100', 1, true); }}><Icon name="bag" size={17} /></button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="scent-section section" id="fragrance">
          <div className="section-heading">
            <p className="section-kicker">LE PORTRAIT OLFACTIF</p>
            <h2>Une lumière douce<br />sur <em>la peau.</em></h2>
          </div>
          <p className="section-intro">Pensé comme une seconde peau, Aube d’Or passe d’un éclat solaire à un sillage enveloppant. Trois accords, une signature qui vous ressemble.</p>

          <div className="scent-layout">
            <div className="ingredients-art" aria-hidden="true">
              <div className="ingredients-art__disc" />
              <div className="ingredients-art__orb ingredients-art__orb--amber" />
              <div className="ingredients-art__orb ingredients-art__orb--flower" />
              <div className="ingredients-art__leaf ingredients-art__leaf--one" />
              <div className="ingredients-art__leaf ingredients-art__leaf--two" />
              <div className="ingredients-art__card"><span>UNE COMPOSITION</span><strong>florale,<br />boisée &amp;<br />ambrée</strong></div>
              <div className="ingredients-art__tag">Made for<br />your <i>ritual.</i></div>
            </div>
            <div className="accord-list">
              <article className="accord-item">
                <span className="accord-item__number">01</span>
                <div><p className="accord-item__label">NOTES DE TÊTE</p><h3>Safran &amp; poire nashi</h3><p>Une ouverture claire et vibrante, comme les premiers rayons du matin.</p></div>
                <span className="accord-item__accent accord-item__accent--saffron" />
              </article>
              <article className="accord-item">
                <span className="accord-item__number">02</span>
                <div><p className="accord-item__label">NOTES DE CŒUR</p><h3>Néroli &amp; fleur d’oranger</h3><p>Un bouquet blanc, solaire et délicatement enveloppant.</p></div>
                <span className="accord-item__accent accord-item__accent--flower" />
              </article>
              <article className="accord-item">
                <span className="accord-item__number">03</span>
                <div><p className="accord-item__label">NOTES DE FOND</p><h3>Bois ambré &amp; musc</h3><p>Une signature chaude qui reste, sans jamais prendre toute la place.</p></div>
                <span className="accord-item__accent accord-item__accent--wood" />
              </article>
            </div>
          </div>
        </section>

        <section className="product-section" id="rituel">
          <div className="product-display">
            <span className="product-display__ring product-display__ring--one" />
            <span className="product-display__ring product-display__ring--two" />
            <span className="product-display__caption">{activeProduct.name.toUpperCase()}<br />N°{activeProduct.number}</span>
            <FragranceBottle product={activeProduct} shadow={false} />
            <div className="product-display__label"><span>{activeProduct.family.toUpperCase()}</span><b>faite<br />pour vous</b><i>8–10 h de sillage*</i></div>
            <span className="product-display__fineprint">*Selon votre peau et votre routine.</span>
          </div>

          <div className="product-info">
            <p className="section-kicker">VOTRE FLACON, VOTRE RITUEL</p>
            <h2>{activeProduct.name}<br /><em>eau de parfum</em></h2>
            <div className="product-info__rating"><StarRating compact /><span>4,9 / 5</span><a href="#avis">Lire les 1 284 avis</a></div>
            <p className="product-info__description">{activeProduct.description}</p>
            <p className="product-info__notes"><Icon name="leaf" size={15} /> {activeProduct.noteLine}</p>

            <fieldset className="format-picker">
              <legend>Choisissez votre contenance</legend>
              <div className="format-picker__options">
                {activeFormats.map((format) => (
                  <button
                    key={format.id}
                    className={`format-option${selectedFormat === format.id ? ' format-option--selected' : ''}`}
                    type="button"
                    onClick={() => handleFormatChange(format.id)}
                    aria-pressed={selectedFormat === format.id}
                  >
                    {format.badge && <span className="format-option__badge">{format.badge}</span>}
                    <span className="format-option__check"><Icon name="check" size={12} /></span>
                    <strong>{format.label}</strong>
                    <small>{format.subtitle}</small>
                    <b>{formatMoney(format.price)}</b>
                    <del>{formatMoney(format.oldPrice)}</del>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="product-actions">
              <QuantityControl value={quantity} onChange={setQuantity} />
              <button className="button button--ink product-actions__add" type="button" onClick={() => addToCart()}><Icon name="bag" size={19} /> Ajouter au panier</button>
            </div>
            <button className="button button--outline product-actions__buy" type="button" onClick={handleBuyNow}>Acheter maintenant <Icon name="arrow" size={18} /></button>
            <div className="product-reassurance"><Icon name="lock" size={16} /><span>Rien à payer maintenant — règlement en espèces à la livraison.</span></div>
          </div>
        </section>

        <section className="ritual-banner">
          <div className="ritual-banner__copy">
            <p>LE GESTE MAISON NOOR</p>
            <h2>Trois vaporisations.<br /><em>Tout un souvenir.</em></h2>
            <span>Poignets · creux du cou · derrière l’oreille</span>
          </div>
          <div className="ritual-banner__illustration" aria-hidden="true">
            <span className="ritual-banner__line ritual-banner__line--one" />
            <span className="ritual-banner__line ritual-banner__line--two" />
            <span className="ritual-banner__drop" />
            <span className="ritual-banner__star">✦</span>
            <span className="ritual-banner__hand">⟋</span>
          </div>
          <div className="ritual-banner__quote">“Ce que l’on porte<br />le plus longtemps<br />est invisible.”</div>
        </section>

        <section className="reviews-section section" id="avis">
          <div className="reviews-heading">
            <div>
              <p className="section-kicker">DES MOTS QUI RESTENT</p>
              <h2>Adopté dès<br /><em>la première note.</em></h2>
            </div>
            <div className="reviews-score">
              <strong>4,9</strong>
              <div><StarRating /><span>Sur plus de 1 284 commandes vérifiées</span></div>
            </div>
          </div>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <StarRating compact />
                <blockquote>“{review.text}”</blockquote>
                <footer><span className="review-avatar">{review.initials}</span><p><strong>{review.name}</strong><small><Icon name="check" size={12} /> Achat vérifié · {review.city}</small></p></footer>
              </article>
            ))}
          </div>
        </section>

        <section className="order-section" id="commande">
          <div className="order-section__texture" />
          <div className="order-intro">
            <p className="section-kicker section-kicker--light">LIVRAISON PARTOUT AU MAROC</p>
            <h2>Votre parfum<br /><em>vous attend.</em></h2>
            <p>Complétez ces quelques détails. Nous vous appelons pour confirmer votre créneau, puis vous réglez seulement lorsque le colis arrive.</p>
            <div className="order-intro__steps">
              <div><span>1</span><p><strong>Vous commandez</strong><small>Sans paiement en ligne</small></p></div>
              <div><span>2</span><p><strong>On vous confirme</strong><small>Par téléphone</small></p></div>
              <div><span>3</span><p><strong>Vous recevez &amp; payez</strong><small>À votre porte</small></p></div>
            </div>
            <div className="order-intro__secure"><Icon name="shield" size={19} /><span>Vos informations restent privées et servent uniquement à livrer votre commande.</span></div>
          </div>

          <div className="order-card-wrap">
            <form className="order-card" onSubmit={submitOrder} noValidate>
              <div className="order-card__topline"><span>COMMANDE EXPRESS</span><span><i /> {checkoutEntries.length} parfum{checkoutEntries.length > 1 ? 's' : ''}</span></div>
              <div className="order-card__products">
                {checkoutEntries.map((item) => (
                  <div className="order-card__product" key={`${item.product.id}-${item.format.id}`}>
                    <div className="order-card__image"><FragranceBottle product={item.product} mini shadow={false} /></div>
                    <div><small>MAISON NOOR · N°{item.product.number}</small><h3>{item.product.name}</h3><p>{item.format.label} · Qté {item.quantity}</p></div>
                    <strong>{formatMoney(item.format.price * item.quantity)}</strong>
                  </div>
                ))}
              </div>
              {!cartItems.length && (
                <div className="order-card__format-row">
                  <span>Contenance</span>
                  <div>{activeFormats.map((format) => <button type="button" onClick={() => handleFormatChange(format.id)} className={selectedFormat === format.id ? 'active' : ''} key={format.id}>{format.label}</button>)}</div>
                </div>
              )}
              {cartItems.length > 0 && <p className="order-card__edit"><button type="button" onClick={() => { setMenuOpen(false); document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' }); }}>Modifier ma sélection</button></p>}

              <div className="form-grid">
                <label className={errors.name ? 'input-error' : ''}>Nom complet<input id="customer-name" name="name" value={form.name} onChange={handleFormChange} placeholder="Ex. Hana El Amrani" autoComplete="name" />{errors.name && <small>{errors.name}</small>}</label>
                <label className={errors.phone ? 'input-error' : ''}>Téléphone<input name="phone" value={form.phone} onChange={handleFormChange} placeholder="Ex. 06 12 34 56 78" inputMode="tel" autoComplete="tel" />{errors.phone && <small>{errors.phone}</small>}</label>
                <label className={errors.city ? 'input-error' : ''}>Ville<select name="city" value={form.city} onChange={handleFormChange}><option value="" disabled>Choisir votre ville</option><option>Oujda</option><option>Casablanca</option><option>Rabat</option><option>Marrakech</option><option>Tanger</option><option>Fès</option><option>Autre ville</option></select>{errors.city && <small>{errors.city}</small>}</label>
                <label className={errors.address ? 'input-error' : ''}>Adresse détaillée<input name="address" value={form.address} onChange={handleFormChange} placeholder="Quartier, rue, repère…" autoComplete="street-address" />{errors.address && <small>{errors.address}</small>}</label>
              </div>

              <div className="order-summary">
                <p><span>Sous-total</span><strong>{formatMoney(checkoutSubtotal)}</strong></p>
                <p><span>Livraison</span><strong className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'Offerte' : formatMoney(shipping)}</strong></p>
                <p className="order-summary__total"><span>Total à régler à la livraison</span><strong>{formatMoney(total)}</strong></p>
              </div>
              <button className="button button--gold order-card__submit" type="submit">Confirmer ma commande <Icon name="arrow" size={18} /></button>
              <p className="order-card__footnote"><Icon name="lock" size={14} /> Vous ne payez rien aujourd’hui. Règlement en espèces à réception.</p>
            </form>
            {submitted && (
              <div className="success-modal" role="status">
                <div className="success-modal__icon"><Icon name="check" size={28} /></div>
                <p className="section-kicker">DEMANDE ENREGISTRÉE</p>
                <h3>Merci, {form.name.split(' ')[0]}.</h3>
                <p>{site.ordersEndpoint ? <>Votre commande est aussi enregistrée dans notre système. Confirmez-la sur WhatsApp pour recevoir rapidement notre appel au <strong>{form.phone}</strong>.</> : <>Confirmez votre demande sur WhatsApp : notre équipe vous appellera au <strong>{form.phone}</strong> pour organiser votre livraison.</>}</p>
                {whatsappConfirmationUrl && <a className="success-modal__whatsapp" href={whatsappConfirmationUrl} target="_blank" rel="noreferrer"><Icon name="phone" size={18} /> Confirmer sur WhatsApp</a>}
                <button type="button" onClick={() => setSubmitted(false)}>Modifier ma demande</button>
              </div>
            )}
          </div>
        </section>

        <section className="faq-section section" id="faq">
          <div className="faq-heading"><p className="section-kicker">ON VOUS DIT TOUT</p><h2>Quelques réponses,<br /><em>avant le grand oui.</em></h2><p>Notre équipe est là si vous préférez parler à quelqu’un : chaque commande est confirmée avec soin.</p></div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<Icon name="plus" size={20} /></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__brand"><a className="brand brand--footer" href="#accueil"><BrandMark light /><span className="brand__text"><strong>MAISON</strong><small>NOOR</small></span></a><p>Des sillages qui deviennent des souvenirs.</p></div>
        <div className="site-footer__links"><p>MAISON</p><a href="#catalogue">La collection</a><a href="#fragrance">La fragrance</a><a href="#rituel">Notre promesse</a><a href="#avis">Vos avis</a></div>
        <div className="site-footer__links"><p>AIDE</p><a href="#commande">Suivre ma commande</a><a href="#commande">Livraison &amp; paiement</a><a href="#faq">Nous écrire</a></div>
        <div className="site-footer__contact"><p>UNE QUESTION ?</p><a href={`tel:${site.contactPhone}`}>{site.contactPhoneDisplay}</a><span>Lun — Sam, 9h à 19h</span></div>
        <div className="site-footer__bottom"><span>© 2026 Maison Noor. Tous droits réservés.</span><span>Parfums authentiques · Paiement à la livraison</span><a href="#accueil" aria-label="Remonter en haut"><Icon name="arrowUp" size={18} /></a></div>
      </footer>

      <div className={`cart-overlay${cartOpen ? ' cart-overlay--show' : ''}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer${cartOpen ? ' cart-drawer--open' : ''}`} aria-label="Votre panier" aria-hidden={!cartOpen}>
        <header><div><span>VOTRE SÉLECTION</span><h2>Le panier</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Fermer le panier"><Icon name="close" size={22} /></button></header>
        {cartItems.length > 0 ? <>
          <div className="cart-drawer__items">
            {cartEntries.map((item) => (
              <div className="cart-drawer__item" key={`${item.product.id}-${item.format.id}`}>
                <div className="cart-drawer__visual"><FragranceBottle product={item.product} mini shadow={false} /></div>
                <div><small>MAISON NOOR · N°{item.product.number}</small><strong>{item.product.name}</strong><span>{item.format.label} · Qté {item.quantity}</span><b>{formatMoney(item.format.price * item.quantity)}</b></div>
                <div className="cart-drawer__item-actions"><div className="cart-drawer__stepper"><button type="button" onClick={() => updateCartQuantity(item.product.id, item.format.id, item.quantity - 1)} aria-label="Diminuer">−</button><span>{item.quantity}</span><button type="button" onClick={() => updateCartQuantity(item.product.id, item.format.id, item.quantity + 1)} aria-label="Augmenter">+</button></div><button className="cart-drawer__remove" type="button" onClick={() => removeCartItem(item.product.id, item.format.id)}>Retirer</button></div>
              </div>
            ))}
          </div>
          <div className="cart-drawer__benefit"><Icon name="shield" size={18} /><span>Authenticité garantie, flacon contrôlé avant expédition.</span></div>
          <div className="cart-drawer__total"><span>Total estimé</span><strong>{formatMoney(cartTotal)}</strong><small>Dont {cartShipping === 0 ? 'livraison offerte' : '35 MAD de livraison'}</small></div>
          <button className="button button--gold cart-drawer__checkout" type="button" onClick={() => { setCartOpen(false); goToOrder(); }}>Finaliser ma commande <Icon name="arrow" size={18} /></button>
          <p className="cart-drawer__cod"><Icon name="lock" size={15} /> Paiement en espèces à la livraison</p>
        </> : <div className="cart-drawer__empty"><span><Icon name="bag" size={28} /></span><h3>Votre panier est vide</h3><p>Votre futur sillage vous attend.</p><button className="button button--outline" type="button" onClick={() => { setCartOpen(false); document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' }); }}>Découvrir la collection</button></div>}
      </aside>

      {toast && <div className="toast" role="status"><Icon name="check" size={17} /> {toast}</div>}
      <button className="mobile-order-bar" type="button" onClick={goToOrder}><span><small>{activeProduct.name} dès</small><strong>{formatMoney(selected.price)}</strong></span><b>Commander <Icon name="arrow" size={17} /></b></button>
    </div>
  );
}

export default App;
