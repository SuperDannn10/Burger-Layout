import { useState, useMemo } from 'react'
import logoImg from './assets/images/logo.png'
import crispyChickenImg from './assets/images/crispy-chicken.png'
import ultimateBaconImg from './assets/images/ultimate-bacon.png'
import blackSheepImg from './assets/images/black-sheep.png'
import veganBurgerImg from './assets/images/vegan-burger.png'
import './App.css'

export type Category = 'all' | 'burgers' | 'fries' | 'drinks'

export interface MenuItem {
  id: string
  name: string
  category: 'burgers' | 'fries' | 'drinks'
  tag?: string
  description: string
  price: number
  rating: number
  reviewsCount: number
  prepTime: string
  calories: string
  spicy?: boolean
  vegetarian?: boolean
  image: string
}

export interface CartItem {
  item: MenuItem
  quantity: number
}

const MENU_ITEMS: MenuItem[] = [
  // --- CRAZY BURGERS ---
  {
    id: 'crispy-chicken',
    name: 'Crispy Chicken Zinger',
    category: 'burgers',
    tag: 'Best Seller',
    description: 'Crispy battered breast, sweet chilli glaze, pickled relish, creamy slaw on toasted brioche.',
    price: 99.15,
    rating: 5,
    reviewsCount: 312,
    prepTime: '12 min',
    calories: '620 kcal',
    spicy: true,
    image: crispyChickenImg,
  },
  {
    id: 'ultimate-bacon',
    name: 'Ultimate Bacon Double',
    category: 'burgers',
    tag: "Chef's Choice",
    description: 'Dual smashed Angus patties, hardwood smoked bacon, double aged cheddar & caramelized onions.',
    price: 119.50,
    rating: 4,
    reviewsCount: 245,
    prepTime: '15 min',
    calories: '840 kcal',
    image: ultimateBaconImg,
  },
  {
    id: 'black-sheep',
    name: 'Black Sheep Gourmet',
    category: 'burgers',
    tag: 'Top Rated',
    description: 'Prime charbroiled beef, American melt, ripe avocado slices, tomato relish & red onion ring.',
    price: 89.00,
    rating: 5,
    reviewsCount: 189,
    prepTime: '14 min',
    calories: '710 kcal',
    image: blackSheepImg,
  },
  {
    id: 'vegan-burger',
    name: 'Green Goddess Vegan',
    category: 'burgers',
    tag: 'Plant Based',
    description: 'Craft botanical veggie patty, crushed avocado, crisp iceberg, plant-based cheddar & herb dressing.',
    price: 99.25,
    rating: 4,
    reviewsCount: 142,
    prepTime: '10 min',
    calories: '490 kcal',
    vegetarian: true,
    image: veganBurgerImg,
  },
  {
    id: 'firehouse-jalapeno',
    name: 'Firehouse Spicy Smash',
    category: 'burgers',
    tag: 'Extra Hot 🔥',
    description: 'Double beef smash, melted pepperjack, torched jalapeños, crispy onion strings & spicy chipotle sauce.',
    price: 105.00,
    rating: 5,
    reviewsCount: 198,
    prepTime: '12 min',
    calories: '760 kcal',
    spicy: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'truffle-mushroom-swiss',
    name: 'Truffle Mushroom Swiss',
    category: 'burgers',
    tag: 'Gourmet',
    description: 'Single Angus beef patty, sautéed garlic butter cremini mushrooms, Swiss Gruyère & white truffle mayo.',
    price: 125.00,
    rating: 5,
    reviewsCount: 164,
    prepTime: '16 min',
    calories: '790 kcal',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
  },

  // --- CRISPY & LOADED FRIES ---
  {
    id: 'classic-crinkle-fries',
    name: 'Golden Sea Salt Fries',
    category: 'fries',
    tag: 'Crispy Side',
    description: 'Double-fried Belgian style hand-cut potatoes, seasoned with flaky sea salt and garden rosemary.',
    price: 45.00,
    rating: 5,
    reviewsCount: 420,
    prepTime: '6 min',
    calories: '340 kcal',
    vegetarian: true,
    // Photo: Chris Woodrich, CC BY-SA 4.0 — https://commons.wikimedia.org/wiki/File:Cajun_fries_from_Popeyes_Louisiana_Kitchen,_Stratford,_Ontario,_2025-08-04.jpg
    image: '/images/golden-sea-salt-fries.jpg',
  },
  {
    id: 'cheesy-bacon-fries',
    name: 'Loaded Cheesy Bacon Fries',
    category: 'fries',
    tag: 'Crowd Favorite',
    description: 'Crispy hot fries drenched in warm artisanal cheese sauce, crispy bacon crumbles and chives.',
    price: 75.00,
    rating: 5,
    reviewsCount: 382,
    prepTime: '8 min',
    calories: '580 kcal',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'truffle-parmesan-fries',
    name: 'Truffle & Shaved Parmesan Fries',
    category: 'fries',
    tag: 'Chef Choice',
    description: 'Golden skin-on fries drizzled with white truffle oil, 24-month aged parmesan cheese & parsley.',
    price: 85.00,
    rating: 5,
    reviewsCount: 215,
    prepTime: '8 min',
    calories: '490 kcal',
    vegetarian: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'peri-peri-curly-fries',
    name: 'Fiery Peri-Peri Curly Fries',
    category: 'fries',
    tag: 'Spicy 🔥',
    description: 'Crisp spiral cut curly fries tossed in our zesty South African peri-peri spice dust with garlic dip.',
    price: 65.00,
    rating: 4,
    reviewsCount: 176,
    prepTime: '7 min',
    calories: '420 kcal',
    spicy: true,
    vegetarian: true,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&auto=format&fit=crop&q=80',
  },

  // --- DRINKS & SHAKES ---
  {
    id: 'salted-caramel-shake',
    name: 'Salted Caramel Pretzel Shake',
    category: 'drinks',
    tag: 'Sweet Treat',
    description: 'Creamy Madagascar vanilla custard blended with buttery salted caramel, topped with whipped cream.',
    price: 55.00,
    rating: 5,
    reviewsCount: 154,
    prepTime: '5 min',
    calories: '510 kcal',
    vegetarian: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'craft-mint-lemonade',
    name: 'Sparkling Mint Lime Cooler',
    category: 'drinks',
    tag: 'Refreshing',
    description: 'Fresh squeezed Persian limes, muddled garden mint, sparkling water and raw sugar crystals.',
    price: 35.00,
    rating: 4,
    reviewsCount: 96,
    prepTime: '3 min',
    calories: '110 kcal',
    vegetarian: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
  },
]

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dietFilter, setDietFilter] = useState<'all' | 'spicy' | 'veg'>('all')
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { item: MENU_ITEMS[0], quantity: 1 },
    { item: MENU_ITEMS[7], quantity: 1 }, // Cheesy Bacon Fries
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Calculations
  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)
  const subtotal = cartItems.reduce(
    (acc, curr) => acc + curr.item.price * curr.quantity,
    0
  )
  const deliveryFee = subtotal > 150 ? 0 : 25
  const grandTotal = subtotal > 0 ? subtotal + deliveryFee : 0

  // Filtered Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false
      }
      // Diet filter
      if (dietFilter === 'spicy' && !item.spicy) return false
      if (dietFilter === 'veg' && !item.vegetarian) return false
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase()
        const matchesName = item.name.toLowerCase().includes(query)
        const matchesDesc = item.description.toLowerCase().includes(query)
        const matchesTag = item.tag?.toLowerCase().includes(query)
        if (!matchesName && !matchesDesc && !matchesTag) return false
      }
      return true
    })
  }, [selectedCategory, searchQuery, dietFilter])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const exists = prev.find((c) => c.item.id === item.id)
      if (exists) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      }
      return [...prev, { item, quantity: 1 }]
    })
    showToast(`Added ${item.name} to cart!`)
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((c) => {
          if (c.item.id === itemId) {
            const next = c.quantity + delta
            return next > 0 ? { ...c, quantity: next } : null
          }
          return c
        })
        .filter((c): c is CartItem => c !== null)
    )
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((c) => (c === msg ? null : c))
    }, 2400)
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    setIsCheckingOut(false)
    setOrderSuccess(true)
    setCartItems([])
    setTimeout(() => {
      setOrderSuccess(false)
      setIsCartOpen(false)
    }, 3500)
  }

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && <div className="toast-pill">{toastMessage}</div>}

      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <span>🔥 CRAZY DEAL: Free Express Delivery on orders over $150!</span>
        <span className="phone-order">📞 Hotline: 01700-TASTY</span>
      </div>

      {/* Modern Sticky Navigation */}
      <header className="site-header">
        <div className="header-inner">
          {/* Logo & Brand */}
          <div className="brand-group">
            <a href="#" className="brand-link">
              <img src={logoImg} alt="Tasty Burger Logo" className="brand-logo" />
              <div className="brand-text">
                <span className="brand-title">TASTY BURGER</span>
                <span className="brand-tagline">CRAFT BURGERS & FRIES</span>
              </div>
            </a>
          </div>

          {/* Quick Search */}
          <div className="search-bar-wrapper">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search burgers, crispy fries, drinks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Actions: Status & Cart */}
          <div className="header-actions">
            <div className="delivery-status-pill">
              <span className="live-dot"></span>
              <span>Kitchen Open • 20-30 min</span>
            </div>

            <button
              type="button"
              className="cart-toggle-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
            >
              <div className="cart-icon-box">
                <svg
                  className="cart-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalCartCount > 0 && (
                  <span className="cart-count-badge">{totalCartCount}</span>
                )}
              </div>
              <div className="cart-label-info">
                <span className="cart-label">My Cart</span>
                <span className="cart-total-amount">${subtotal.toFixed(2)}</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Showcase Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="fire-emoji">🔥</span>
            <span>FRESH FROM THE FLAME GRILL</span>
          </div>
          <h1 className="hero-headline">
            Craving Burgers & <span className="highlight-text">Loaded Fries?</span>
          </h1>
          <p className="hero-subtext">
            Experience sensational flavor packed between butter-toasted brioche buns
            and paired with golden crinkle-cut fries smothered in hot melted cheddar!
          </p>

          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">🥩</span>
              <span>100% Prime Angus Patties</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🍟</span>
              <span>Hand-Cut Belgian Style Fries</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Fast 25-Min Delivery</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⭐</span>
              <span>4.9 / 5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories & Filters Bar */}
      <section className="menu-controls-section">
        <div className="controls-container">
          {/* Main Category Tabs */}
          <div className="category-tabs">
            <button
              type="button"
              className={`cat-tab ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              <span className="tab-icon">🍽️</span>
              All Flavors ({MENU_ITEMS.length})
            </button>
            <button
              type="button"
              className={`cat-tab ${selectedCategory === 'burgers' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('burgers')}
            >
              <span className="tab-icon">🍔</span>
              Crazy Burgers (6)
            </button>
            <button
              type="button"
              className={`cat-tab ${selectedCategory === 'fries' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('fries')}
            >
              <span className="tab-icon">🍟</span>
              Crispy & Loaded Fries (4)
            </button>
            <button
              type="button"
              className={`cat-tab ${selectedCategory === 'drinks' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('drinks')}
            >
              <span className="tab-icon">🥤</span>
              Drinks & Shakes (2)
            </button>
          </div>

          {/* Quick Dietary Filters */}
          <div className="diet-filters">
            <button
              type="button"
              className={`diet-btn ${dietFilter === 'all' ? 'active' : ''}`}
              onClick={() => setDietFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`diet-btn ${dietFilter === 'spicy' ? 'active' : ''}`}
              onClick={() => setDietFilter(dietFilter === 'spicy' ? 'all' : 'spicy')}
            >
              🌶️ Spicy Only
            </button>
            <button
              type="button"
              className={`diet-btn ${dietFilter === 'veg' ? 'active' : ''}`}
              onClick={() => setDietFilter(dietFilter === 'veg' ? 'all' : 'veg')}
            >
              🌱 Vegetarian
            </button>
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <main className="menu-section">
        <div className="menu-grid-header">
          <h2 className="grid-heading">
            {selectedCategory === 'all' && 'Our Full Flavor Lineup'}
            {selectedCategory === 'burgers' && 'Handcrafted Gourmet Burgers'}
            {selectedCategory === 'fries' && 'Crispy, Cheesy & Loaded Fries'}
            {selectedCategory === 'drinks' && 'Chilled Shakes & Thirst Quenchers'}
          </h2>
          <span className="grid-count">{filteredItems.length} items ready to order</span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="empty-search-state">
            <span className="empty-icon">🔍</span>
            <h3>No delicious items found</h3>
            <p>Try adjusting your search terms or reset the filters.</p>
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setDietFilter('all')
              }}
            >
              Show All Menu Items
            </button>
          </div>
        ) : (
          <div className="menu-grid">
            {filteredItems.map((item) => {
              const isFav = !!favorites[item.id]
              const cartEntry = cartItems.find((c) => c.item.id === item.id)

              return (
                <article key={item.id} className="food-card">
                  {/* Card Media Header */}
                  <div className="card-media">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="food-img"
                      loading="lazy"
                    />

                    {/* Tag Badge */}
                    {item.tag && (
                      <span className={`item-tag ${item.spicy ? 'tag-spicy' : ''}`}>
                        {item.tag}
                      </span>
                    )}

                    {/* Heart Favorite Button */}
                    <button
                      type="button"
                      className={`favorite-btn ${isFav ? 'active' : ''}`}
                      onClick={() => toggleFavorite(item.id)}
                      aria-label="Toggle Wishlist"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="heart-svg"
                        fill={isFav ? '#ef4444' : 'rgba(0,0,0,0.3)'}
                        stroke={isFav ? '#ef4444' : '#ffffff'}
                        strokeWidth="2"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>

                    {/* Specs Pill (Prep time / Calories) */}
                    <div className="media-footer-pill">
                      <span>⏱ {item.prepTime}</span>
                      <span>•</span>
                      <span>🔥 {item.calories}</span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="card-body">
                    {/* Rating row */}
                    <div className="rating-row">
                      <div className="stars">
                        {'★'.repeat(item.rating)}
                        {'☆'.repeat(5 - item.rating)}
                      </div>
                      <span className="reviews-text">
                        ({item.reviewsCount} reviews)
                      </span>
                    </div>

                    <h3 className="food-name">{item.name}</h3>
                    <p className="food-description">{item.description}</p>

                    {/* Price and Add button */}
                    <div className="card-bottom">
                      <div className="price-block">
                        <span className="currency-label">Price</span>
                        <span className="price-val">${item.price.toFixed(2)}</span>
                      </div>

                      {cartEntry ? (
                        <div className="card-qty-control">
                          <button
                            type="button"
                            className="qty-btn-card"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="qty-val">{cartEntry.quantity}</span>
                          <button
                            type="button"
                            className="qty-btn-card"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="add-cart-btn"
                          onClick={() => addToCart(item)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="plus-svg"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>

      {/* Features & Promise Banner */}
      <section className="promise-section">
        <div className="promise-grid">
          <div className="promise-card">
            <span className="promise-icon">🍔</span>
            <h4>Handcrafted Daily</h4>
            <p>Every single patty is ground fresh and pressed to order with secret spices.</p>
          </div>
          <div className="promise-card">
            <span className="promise-icon">🍟</span>
            <h4>Crispiest Fries in Town</h4>
            <p>Cut from select russet potatoes, double-fried for the crunch you dream of.</p>
          </div>
          <div className="promise-card">
            <span className="promise-icon">🛵</span>
            <h4>Thermal Bag Delivery</h4>
            <p>Guaranteed sizzling hot upon arrival at your doorstep in under 30 minutes.</p>
          </div>
          <div className="promise-card">
            <span className="promise-icon">💯</span>
            <h4>100% Satisfaction</h4>
            <p>If you don't fall in love with the first bite, we replace it free of charge.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <img src={logoImg} alt="Tasty Burger" className="footer-logo" />
              <h3>TASTY BURGER & FRIES</h3>
            </div>
            <p>
              Your neighborhood craft burger house. We take pride in serving high-grade
              Angus beef, fresh buns, and legendary loaded fries.
            </p>
          </div>
          <div className="footer-col">
            <h4>Opening Hours</h4>
            <p>Monday – Thursday: 11:00 AM – 11:30 PM</p>
            <p>Friday – Saturday: 11:00 AM – 1:00 AM</p>
            <p>Sunday: 12:00 PM – 11:00 PM</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#burgers">Gourmet Burgers</a></li>
              <li><a href="#fries">Loaded Fries</a></li>
              <li><a href="#shakes">Handspun Shakes</a></li>
              <li><a href="#deals">Combos & Deals</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Location & Contact</h4>
            <p>📍 42 Flavor Avenue, Foodie District</p>
            <p>📞 Phone: +880 1700-TASTY</p>
            <p>✉️ Email: hello@tastyburger.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Tasty Burger & Co. All rights reserved. Crafted with ❤️ for burger lovers.</p>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <aside
            className="cart-panel"
            onClick={(e) => e.stopPropagation()}
            aria-label="Order Cart"
          >
            <div className="cart-panel-header">
              <div>
                <h3 className="cart-title">Your Tray</h3>
                <span className="cart-subtitle">{totalCartCount} items added</span>
              </div>
              <button
                type="button"
                className="cart-close"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="cart-items-container">
              {cartItems.length === 0 ? (
                <div className="empty-cart-view">
                  <span className="empty-cart-art">🍟🍔</span>
                  <h4>Your tray is empty</h4>
                  <p>Load up on juicy burgers and hot crinkle fries!</p>
                  <button
                    type="button"
                    className="start-order-btn"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <div className="cart-list">
                  {cartItems.map(({ item, quantity }) => (
                    <div key={item.id} className="cart-row">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-row-img"
                      />
                      <div className="cart-row-info">
                        <h4 className="cart-row-title">{item.name}</h4>
                        <span className="cart-row-unit-price">
                          ${item.price.toFixed(2)} each
                        </span>
                        <div className="cart-row-controls">
                          <div className="qty-pill">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              -
                            </button>
                            <span>{quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                          <span className="cart-row-line-total">
                            ${(item.price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-panel-footer">
                <div className="calc-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="calc-row">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="free-text">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                {deliveryFee > 0 && (
                  <p className="free-shipping-hint">
                    Add ${(150 - subtotal).toFixed(2)} more for <strong>FREE Delivery!</strong>
                  </p>
                )}
                <div className="calc-row total-row">
                  <span>Grand Total</span>
                  <span className="total-amount">${grandTotal.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  className="checkout-action-btn"
                  onClick={() => setIsCheckingOut(true)}
                >
                  Proceed to Checkout • ${grandTotal.toFixed(2)}
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="modal-overlay" onClick={() => setIsCheckingOut(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Fast Checkout</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setIsCheckingOut(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCheckout} className="checkout-form">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" required placeholder="e.g. Tanvir Ahmed" defaultValue="Tanvir Ahmed" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" required placeholder="e.g. 01712-345678" defaultValue="01712-345678" />
              </div>
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  required
                  rows={2}
                  placeholder="House, Road, Area..."
                  defaultValue="House 12, Road 4, Sector 7, Uttara, Dhaka"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-options">
                  <label className="radio-label">
                    <input type="radio" name="payment" defaultChecked />
                    <span>Cash on Delivery (COD)</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="payment" />
                    <span>bKash / Nagad</span>
                  </label>
                </div>
              </div>
              <div className="modal-total-summary">
                <span>Amount to Pay:</span>
                <strong>${grandTotal.toFixed(2)}</strong>
              </div>
              <button type="submit" className="confirm-order-btn">
                Confirm & Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Success Popup */}
      {orderSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <span className="success-icon">🎉</span>
            <h3>Order Received!</h3>
            <p>Your sizzling burgers & crispy fries are being prepared right now.</p>
            <p className="order-time">Estimated arrival: <strong>25 minutes</strong></p>
          </div>
        </div>
      )}
    </div>
  )
}
