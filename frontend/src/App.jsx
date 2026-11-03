
import { useState } from 'react'
import './App.css'

function App() {
  // ==================== PRODUCT DATA ====================

  const categories = [
    { id: 1, name: 'চাল, ডাল ও শস্য', english: 'Rice, Lentils & Grains', icon: '🌾' },
    { id: 2, name: 'তেল ও মসলা', english: 'Oil & Spices', icon: '🫙' },
    { id: 3, name: 'বিস্কুট ও স্ন্যাকস', english: 'Biscuits & Snacks', icon: '🍪' },
    { id: 4, name: 'পানীয়', english: 'Beverages', icon: '🥤' },
    { id: 5, name: 'ব্যক্তিগত পরিচর্যা', english: 'Personal Care', icon: '🧴' },
    { id: 6, name: 'পরিষ্কার-পরিচ্ছন্নতা', english: 'Cleaning Products', icon: '🧹' },
    { id: 7, name: 'চা, কফি ও দুধ', english: 'Tea, Coffee & Milk', icon: '☕' },
    { id: 8, name: 'বেবি কেয়ার', english: 'Baby Care', icon: '🍼' },
  ]

  const products = [
    {
      id: 1,
      name: 'Miniket Rice',
      category: 'Rice, Lentils & Grains',
      image: '/images/products/miniket-rice.svg',
      description: 'Premium quality Miniket rice for your everyday family meals. Carefully selected grains with excellent taste and quality.',
      variants: [
        { size: '1 KG', price: 95 },
        { size: '2 KG', price: 190 },
        { size: '5 KG', price: 450 },
        { size: '10 KG', price: 890 },
        { size: '25 KG', price: 2200 },
      ],
    },
    {
      id: 2,
      name: 'Soybean Oil',
      category: 'Oil & Spices',
      image: '/images/products/soybean-oil.svg',
      description: 'Quality soybean cooking oil suitable for everyday cooking and food preparation.',
      variants: [
        { size: '500 ml', price: 90 },
        { size: '1 Litre', price: 175 },
        { size: '2 Litre', price: 340 },
        { size: '5 Litre', price: 830 },
      ],
    },
    {
      id: 3,
      name: 'Masoor Dal',
      category: 'Rice, Lentils & Grains',
      emoji: '🫘',
      description: 'Everyday masoor dal, a convenient essential for preparing delicious home-cooked meals.',
      variants: [
        { size: '250 Gram', price: 35 },
        { size: '500 Gram', price: 65 },
        { size: '1 KG', price: 120 },
        { size: '2 KG', price: 235 },
      ],
    },
    {
      id: 4,
      name: 'Sugar',
      category: 'Rice, Lentils & Grains',
      emoji: '🧂',
      description: 'Everyday household sugar for tea, coffee, desserts and regular cooking needs.',
      variants: [
        { size: '500 Gram', price: 65 },
        { size: '1 KG', price: 125 },
        { size: '2 KG', price: 245 },
        { size: '5 KG', price: 610 },
      ],
    },
    {
      id: 5,
      name: 'Tea Leaves',
      category: 'Tea, Coffee & Milk',
      emoji: '🍵',
      description: 'Enjoy a refreshing cup of tea with these everyday tea leaves.',
      variants: [
        { size: '100 Gram', price: 60 },
        { size: '200 Gram', price: 110 },
        { size: '400 Gram', price: 215 },
      ],
    },
    {
      id: 6,
      name: 'Instant Noodles',
      category: 'Biscuits & Snacks',
      emoji: '🍜',
      description: 'Quick and convenient instant noodles for an easy snack or meal.',
      variants: [
        { size: 'Single Pack', price: 25 },
        { size: '4 Pack', price: 95 },
        { size: '8 Pack', price: 185 },
      ],
    },
    {
      id: 7,
      name: 'Biscuits',
      category: 'Biscuits & Snacks',
      emoji: '🍪',
      description: 'Tasty biscuits for everyday snacks and family tea time.',
      variants: [
        { size: 'Single Pack', price: 20 },
        { size: 'Family Pack', price: 50 },
        { size: 'Large Pack', price: 90 },
      ],
    },
    {
      id: 8,
      name: 'Laundry Detergent',
      category: 'Cleaning Products',
      emoji: '🧺',
      description: 'A household laundry essential for everyday clothes cleaning.',
      variants: [
        { size: '200 Gram', price: 25 },
        { size: '500 Gram', price: 55 },
        { size: '1 KG', price: 95 },
        { size: '2 KG', price: 185 },
      ],
    },
  ]

  const features = [
    { icon: '🛍️', title: 'Daily Essentials', description: 'All your daily needs' },
    { icon: '🚚', title: 'Fast Delivery', description: 'Quick home delivery' },
    { icon: '🔒', title: 'Secure Payment', description: 'Safe payment options' },
    { icon: '🎧', title: 'Customer Support', description: 'We are here to help' },
    { icon: '🏷️', title: 'Special Offers', description: 'Best deals every day' },
  ]

  // ==================== STATES ====================

  const [selectedVariants, setSelectedVariants] = useState(
    Object.fromEntries(products.map((product) => [product.id, 0]))
  )

  const [quantities, setQuantities] = useState(
    Object.fromEntries(products.map((product) => [product.id, 1]))
  )

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('ss-enterprise-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  // Checkout information
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  const [paymentPhone, setPaymentPhone] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [completedOrder, setCompletedOrder] = useState(null)

  // Login information
  const [loginIdentifier, setLoginIdentifier] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  // Registration information
  const [registerName, setRegisterName] = useState('')
  const [registerPhone, setRegisterPhone] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  // ==================== CART CALCULATIONS ====================

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart)

    try {
      localStorage.setItem('ss-enterprise-cart', JSON.stringify(updatedCart))
    } catch {
      console.error('Unable to save cart data.')
    }
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  )

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )

  const deliveryCharge = cartItems.length === 0
    ? 0
    : cartSubtotal >= 1000 ? 0 : 60

  const grandTotal = cartSubtotal + deliveryCharge

  // ==================== PRODUCT FUNCTIONS ====================

  const updateVariant = (productId, variantIndex) => {
    setSelectedVariants((previous) => ({
      ...previous,
      [productId]: variantIndex,
    }))
  }

  const updateQuantity = (productId, change) => {
    setQuantities((previous) => ({
      ...previous,
      [productId]: Math.max(1, previous[productId] + change),
    }))
  }

  const addToCart = (product, variant, quantity) => {
    const cartKey = `${product.id}-${variant.size}`

    const existingItem = cartItems.find(
      (item) => item.cartKey === cartKey
    )

    let updatedCart

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    } else {
      updatedCart = [
        ...cartItems,
        {
          cartKey,
          productId: product.id,
          productName: product.name,
          category: product.category,
          image: product.image || null,
          emoji: product.emoji || '🛒',
          size: variant.size,
          quantity,
          price: variant.price,
        },
      ]
    }

    saveCart(updatedCart)
    alert(`${product.name} added to cart successfully!`)
  }

  const updateCartQuantity = (cartKey, change) => {
    const updatedCart = cartItems
      .map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter((item) => item.quantity > 0)

    saveCart(updatedCart)
  }

  const removeCartItem = (cartKey) => {
    saveCart(cartItems.filter((item) => item.cartKey !== cartKey))
  }

  // ==================== NAVIGATION FUNCTIONS ====================

  const backToProducts = () => {
    setSelectedProduct(null)
    setIsCartOpen(false)
    setIsCheckoutOpen(false)
    setIsLoginOpen(false)
    setIsRegisterOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openLogin = () => {
    setSelectedProduct(null)
    setIsCartOpen(false)
    setIsCheckoutOpen(false)
    setIsRegisterOpen(false)
    setIsLoginOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeLogin = () => {
    setIsLoginOpen(false)
    setLoginPassword('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openRegister = () => {
    setIsLoginOpen(false)
    setIsRegisterOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeRegister = () => {
    setIsRegisterOpen(false)
    setRegisterPassword('')
    setConfirmPassword('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openCart = () => {
    setSelectedProduct(null)
    setIsCheckoutOpen(false)
    setIsLoginOpen(false)
    setIsRegisterOpen(false)
    setIsCartOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add products first.')
      return
    }

    setIsCartOpen(false)
    setIsLoginOpen(false)
    setIsRegisterOpen(false)
    setIsCheckoutOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const backToCart = () => {
    setIsCheckoutOpen(false)
    setIsLoginOpen(false)
    setIsRegisterOpen(false)
    setIsCartOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openProductDetails = (product) => {
    setIsCartOpen(false)
    setIsCheckoutOpen(false)
    setIsLoginOpen(false)
    setIsRegisterOpen(false)
    setSelectedProduct(product)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ==================== LOGIN & REGISTRATION ====================

  const handleLogin = (event) => {
    event.preventDefault()
    alert('Login authentication will be connected with the backend later.')
  }

  const handleRegister = (event) => {
    event.preventDefault()

    if (!/^01[3-9]\d{8}$/.test(registerPhone)) {
      alert('Please enter a valid 11-digit Bangladesh mobile number.')
      return
    }

    if (registerPassword.length < 8) {
      alert('Password must contain at least 8 characters.')
      return
    }

    if (registerPassword !== confirmPassword) {
      alert('Password and Confirm Password do not match.')
      return
    }

    if (!acceptTerms) {
      alert('Please accept the Terms & Conditions.')
      return
    }

    alert(
      'Registration form completed successfully! Backend registration will be connected later.'
    )

    setIsRegisterOpen(false)
    setIsLoginOpen(true)
    setLoginIdentifier(registerEmail || registerPhone)

    setRegisterName('')
    setRegisterPhone('')
    setRegisterEmail('')
    setRegisterPassword('')
    setConfirmPassword('')
    setAcceptTerms(false)
    setShowRegisterPassword(false)
  }

  // ==================== CHECKOUT FUNCTION ====================

  const placeOrder = (event) => {
    event.preventDefault()

    const order = {
      orderId: `SS-${Date.now()}`,
      customerName,
      customerPhone,
      deliveryAddress,
      paymentMethod,
      paymentPhone: paymentMethod === 'Cash on Delivery' ? '' : paymentPhone,
      transactionId: paymentMethod === 'Cash on Delivery' ? '' : transactionId,
      items: [...cartItems],
      subtotal: cartSubtotal,
      deliveryCharge,
      total: grandTotal,
      createdAt: new Date().toLocaleString('en-BD'),
    }

    setCompletedOrder(order)
    saveCart([])
    setIsCheckoutOpen(false)
    setIsCartOpen(false)
    setIsLoginOpen(false)
    setIsRegisterOpen(false)
    setSelectedProduct(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ==================== REUSABLE COMPONENTS ====================

  const renderProductImage = (product) => (
    <div className="product-image">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="product-photo"
        />
      ) : (
        product.emoji
      )}
    </div>
  )

  const renderVariantOptions = (product) => {
    const selectedIndex = selectedVariants[product.id]

    return (
      <div className="variant-options">
        {product.variants.map((variant, index) => (
          <button
            key={variant.size}
            type="button"
            className={selectedIndex === index ? 'variant-btn active' : 'variant-btn'}
            onClick={() => updateVariant(product.id, index)}
          >
            {variant.size}
          </button>
        ))}
      </div>
    )
  }

  const renderQuantityControl = (product) => (
    <div className="quantity-control">
      <button type="button" onClick={() => updateQuantity(product.id, -1)}>−</button>
      <strong>{quantities[product.id]}</strong>
      <button type="button" onClick={() => updateQuantity(product.id, 1)}>+</button>
    </div>
  )

  const detailVariantIndex = selectedProduct
    ? selectedVariants[selectedProduct.id]
    : 0

  const detailVariant = selectedProduct
    ? selectedProduct.variants[detailVariantIndex]
    : null

  const detailQuantity = selectedProduct
    ? quantities[selectedProduct.id]
    : 1

  const detailTotal = detailVariant
    ? detailVariant.price * detailQuantity
    : 0

  // ==================== INLINE FORM STYLES ====================

  const formPageStyle = {
    minHeight: '650px',
    padding: '45px 20px',
    background: '#F4F7F4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const formCardStyle = {
    width: '100%',
    maxWidth: '460px',
    background: '#FFFFFF',
    padding: '35px',
    borderRadius: '18px',
    boxShadow: '0 12px 40px rgba(23, 33, 27, 0.10)',
    border: '1px solid #E5EDE6',
    boxSizing: 'border-box',
  }

  const formLabelStyle = {
    display: 'block',
    color: '#17211B',
    fontWeight: '600',
    marginBottom: '8px',
  }

  const formInputStyle = {
    width: '100%',
    padding: '13px',
    border: '1px solid #D5DED6',
    borderRadius: '9px',
    marginBottom: '18px',
    boxSizing: 'border-box',
    fontSize: '15px',
    outlineColor: '#15803D',
  }

  const formPrimaryButtonStyle = {
    width: '100%',
    padding: '15px',
    background: '#15803D',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '9px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
  }

  const formSecondaryButtonStyle = {
    background: 'transparent',
    border: '1px solid #15803D',
    color: '#15803D',
    padding: '11px 25px',
    borderRadius: '8px',
    fontWeight: '700',
    cursor: 'pointer',
  }

  const backButtonStyle = {
    display: 'block',
    margin: '23px auto 0',
    border: 'none',
    background: 'transparent',
    color: '#647067',
    cursor: 'pointer',
    fontSize: '14px',
  }

  // ==================== MAIN UI ====================

  return (
    <div className="app">

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <span>🚚 Free Shipping on orders over ৳1000</span>
          <span>📞 Customer Support</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="main-header">
        <div className="container header-content">

          <div className="logo" onClick={backToProducts} style={{ cursor: 'pointer' }}>
            <span className="logo-icon">🛒</span>
            <div>
              <h1>SS-Enterprise</h1>
              <p>Your Trusted Grocery Store</p>
            </div>
          </div>

          <div className="search-box">
            <input type="text" placeholder="Search grocery products..." />
            <button type="button">🔍</button>
          </div>

          <div className="header-actions">
            <button
              type="button"
              onClick={openLogin}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'inherit',
                font: 'inherit',
                cursor: 'pointer',
              }}
            >
              👤 Account
            </button>

            <span>♡ Wishlist</span>

            <button
              type="button"
              onClick={openCart}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'inherit',
                font: 'inherit',
                cursor: 'pointer',
              }}
            >
              🛒 Cart ({cartCount})
            </button>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="navigation">
        <div className="container nav-content">
          <button className="category-button" onClick={backToProducts}>
            ☰ All Categories
          </button>

          <div className="nav-links">
            <a href="#home" onClick={backToProducts}>Home</a>
            <a href="#categories" onClick={backToProducts}>Categories</a>
            <a href="#deals" onClick={backToProducts}>Deals</a>
            <a href="#about" onClick={backToProducts}>About</a>
            <a href="#contact" onClick={backToProducts}>Contact</a>
          </div>
        </div>
      </nav>

      {/* ORDER CONFIRMATION PAGE */}
      {completedOrder ? (

        <main className="container checkout-section">
          <div className="order-success-card">
            <div className="order-success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you, {completedOrder.customerName}. Your order has been received.</p>

            <div className="order-number">
              <span>Order Number</span>
              <strong>{completedOrder.orderId}</strong>
            </div>

            <div className="checkout-summary">
              <h3>Order Details</h3>

              {completedOrder.items.map((item) => (
                <div className="checkout-summary-row" key={item.cartKey}>
                  <span>{item.productName} ({item.size}) × {item.quantity}</span>
                  <strong>৳{item.price * item.quantity}</strong>
                </div>
              ))}

              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <strong>৳{completedOrder.subtotal}</strong>
              </div>

              <div className="checkout-summary-row">
                <span>Delivery Charge</span>
                <strong>
                  {completedOrder.deliveryCharge === 0 ? 'FREE' : `৳${completedOrder.deliveryCharge}`}
                </strong>
              </div>

              <div className="checkout-summary-row checkout-total-row">
                <span>Grand Total</span>
                <strong>৳{completedOrder.total}</strong>
              </div>

              <p><strong>Payment:</strong> {completedOrder.paymentMethod}</p>
              <p><strong>Delivery Address:</strong> {completedOrder.deliveryAddress}</p>
              <p><strong>Contact:</strong> {completedOrder.customerPhone}</p>
            </div>

            <p className="checkout-demo-note">
              This is a frontend demo. The order has not yet been sent to a server, and no online payment was processed.
            </p>

            <button
              className="primary-btn"
              onClick={() => {
                setCompletedOrder(null)
                setCustomerName('')
                setCustomerPhone('')
                setDeliveryAddress('')
                setPaymentMethod('Cash on Delivery')
                setPaymentPhone('')
                setTransactionId('')
                backToProducts()
              }}
            >
              Continue Shopping →
            </button>
          </div>
        </main>

      ) : isRegisterOpen ? (

        /* ==================== REGISTRATION PAGE ==================== */
        <main style={formPageStyle}>
          <div style={formCardStyle}>

            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <div style={{
                width: '65px',
                height: '65px',
                margin: '0 auto 12px',
                background: '#15803D',
                color: '#FFFFFF',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
              }}>
                🛒
              </div>

              <h2 style={{ color: '#17211B', fontSize: '27px', margin: '0 0 8px' }}>
                Create Your Account
              </h2>

              <p style={{ color: '#647067', margin: 0 }}>
                Join SS-Enterprise and enjoy easy grocery shopping.
              </p>
            </div>

            <form onSubmit={handleRegister}>

              <label style={formLabelStyle}>Full Name *</label>
              <input
                type="text"
                value={registerName}
                onChange={(event) => setRegisterName(event.target.value)}
                placeholder="Enter your full name"
                required
                style={formInputStyle}
              />

              <label style={formLabelStyle}>Mobile Number *</label>
              <input
                type="tel"
                value={registerPhone}
                onChange={(event) => setRegisterPhone(event.target.value)}
                placeholder="01XXXXXXXXX"
                pattern="01[3-9][0-9]{8}"
                title="Enter a valid 11-digit Bangladesh mobile number"
                required
                style={formInputStyle}
              />

              <label style={formLabelStyle}>Email Address</label>
              <input
                type="email"
                value={registerEmail}
                onChange={(event) => setRegisterEmail(event.target.value)}
                placeholder="example@email.com"
                style={formInputStyle}
              />

              <label style={formLabelStyle}>Password *</label>
              <div style={{ position: 'relative', marginBottom: '18px' }}>
                <input
                  type={showRegisterPassword ? 'text' : 'password'}
                  value={registerPassword}
                  onChange={(event) => setRegisterPassword(event.target.value)}
                  placeholder="Minimum 8 characters"
                  minLength="8"
                  required
                  style={{
                    ...formInputStyle,
                    marginBottom: 0,
                    paddingRight: '70px',
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    color: '#15803D',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  {showRegisterPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <label style={formLabelStyle}>Confirm Password *</label>
              <input
                type={showRegisterPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter your password"
                minLength="8"
                required
                style={formInputStyle}
              />

              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '9px',
                color: '#647067',
                fontSize: '14px',
                margin: '5px 0 22px',
                lineHeight: '1.5',
              }}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(event) => setAcceptTerms(event.target.checked)}
                  required
                  style={{ marginTop: '4px', accentColor: '#15803D' }}
                />
                <span>I agree to the Terms & Conditions and Privacy Policy.</span>
              </label>

              <button type="submit" style={formPrimaryButtonStyle}>
                Create Account →
              </button>
            </form>

            <div style={{
              textAlign: 'center',
              marginTop: '23px',
              paddingTop: '20px',
              borderTop: '1px solid #E5EDE6',
            }}>
              <p style={{ color: '#647067', margin: '0 0 12px' }}>
                Already have an account?
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsRegisterOpen(false)
                  setIsLoginOpen(true)
                }}
                style={formSecondaryButtonStyle}
              >
                Login to Account
              </button>
            </div>

            <button type="button" onClick={closeRegister} style={backButtonStyle}>
              ← Back to Shopping
            </button>

            <p style={{
              color: '#89938B',
              textAlign: 'center',
              fontSize: '12px',
              margin: '22px 0 0',
            }}>
              SS-Enterprise | Your Trusted Grocery Store
            </p>
          </div>
        </main>

      ) : isLoginOpen ? (

        /* ==================== LOGIN PAGE ==================== */
        <main style={formPageStyle}>
          <div style={formCardStyle}>

            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                width: '70px',
                height: '70px',
                margin: '0 auto 15px',
                background: '#15803D',
                color: '#FFFFFF',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '34px',
              }}>
                🛒
              </div>

              <h2 style={{ color: '#17211B', fontSize: '28px', margin: '0 0 8px' }}>
                Welcome Back!
              </h2>

              <p style={{ color: '#647067', margin: 0 }}>
                Login to your SS-Enterprise account
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <label style={formLabelStyle}>Email or Mobile Number</label>

              <input
                type="text"
                value={loginIdentifier}
                onChange={(event) => setLoginIdentifier(event.target.value)}
                placeholder="Enter email or mobile number"
                required
                style={formInputStyle}
              />

              <label style={formLabelStyle}>Password</label>

              <div style={{ position: 'relative', marginBottom: '12px' }}>
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    ...formInputStyle,
                    paddingRight: '75px',
                    marginBottom: 0,
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    color: '#15803D',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  {showLoginPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div style={{ textAlign: 'right', marginBottom: '22px' }}>
                <span style={{ color: '#15803D', fontSize: '14px', fontWeight: '600' }}>
                  Forgot Password?
                </span>
              </div>

              <button type="submit" style={formPrimaryButtonStyle}>
                Login to Account →
              </button>
            </form>

            <div style={{
              textAlign: 'center',
              marginTop: '25px',
              paddingTop: '20px',
              borderTop: '1px solid #E5EDE6',
            }}>
              <p style={{ color: '#647067', margin: '0 0 15px' }}>
                New to SS-Enterprise?
              </p>

              <button type="button" onClick={openRegister} style={formSecondaryButtonStyle}>
                Create New Account
              </button>
            </div>

            <button type="button" onClick={closeLogin} style={backButtonStyle}>
              ← Back to Shopping
            </button>

            <p style={{
              color: '#89938B',
              textAlign: 'center',
              fontSize: '12px',
              margin: '22px 0 0',
            }}>
              SS-Enterprise | Your Trusted Grocery Store
            </p>
          </div>
        </main>

      ) : isCheckoutOpen ? (

        /* ==================== CHECKOUT PAGE ==================== */
        <main className="container checkout-section">

          <div className="checkout-page-heading">
            <div>
              <h2>Checkout</h2>
              <p>Enter your delivery information to place your order.</p>
            </div>

            <button className="back-products-btn" onClick={backToCart}>
              ← Back to Cart
            </button>
          </div>

          <form className="checkout-layout" onSubmit={placeOrder}>

            <section className="checkout-form-card">
              <h3>Customer Information</h3>

              <label className="checkout-field">
                <span>Full Name *</span>
                <input
                  type="text"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label className="checkout-field">
                <span>Mobile Number *</span>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(event) => setCustomerPhone(event.target.value)}
                  placeholder="01XXXXXXXXX"
                  pattern="01[3-9][0-9]{8}"
                  title="Enter a valid 11-digit Bangladesh mobile number"
                  required
                />
              </label>

              <label className="checkout-field">
                <span>Full Delivery Address *</span>
                <textarea
                  value={deliveryAddress}
                  onChange={(event) => setDeliveryAddress(event.target.value)}
                  placeholder="House, road, area, thana and district"
                  rows="4"
                  required
                />
              </label>

              <div className="checkout-divider"></div>

              <h3>Payment Method</h3>

              {['Cash on Delivery', 'bKash', 'Nagad'].map((method) => (
                <label className="payment-option" key={method}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  <span>
                    {method === 'Cash on Delivery' ? '💵' : '📱'} {method}
                  </span>
                </label>
              ))}

              {paymentMethod !== 'Cash on Delivery' && (
                <div className="online-payment-demo">
                  <p>
                    <strong>{paymentMethod} selected.</strong> Online payment is not connected yet.
                    For this frontend demo, enter the payment reference details below.
                  </p>

                  <label className="checkout-field">
                    <span>{paymentMethod} Sender Mobile Number *</span>
                    <input
                      type="tel"
                      value={paymentPhone}
                      onChange={(event) => setPaymentPhone(event.target.value)}
                      placeholder="01XXXXXXXXX"
                      pattern="01[3-9][0-9]{8}"
                      title="Enter a valid 11-digit Bangladesh mobile number"
                      required
                    />
                  </label>

                  <label className="checkout-field">
                    <span>Transaction ID *</span>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(event) => setTransactionId(event.target.value)}
                      placeholder="Enter transaction ID"
                      required
                    />
                  </label>
                </div>
              )}
            </section>

            <aside className="checkout-summary">
              <h3>Your Order</h3>

              {cartItems.map((item) => (
                <div className="checkout-summary-row" key={item.cartKey}>
                  <span>{item.productName} ({item.size}) × {item.quantity}</span>
                  <strong>৳{item.price * item.quantity}</strong>
                </div>
              ))}

              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <strong>৳{cartSubtotal}</strong>
              </div>

              <div className="checkout-summary-row">
                <span>Delivery Charge</span>
                <strong>{deliveryCharge === 0 ? 'FREE' : `৳${deliveryCharge}`}</strong>
              </div>

              <div className="checkout-summary-divider"></div>

              <div className="checkout-summary-row checkout-total-row">
                <span>Grand Total</span>
                <strong>৳{grandTotal}</strong>
              </div>

              <button type="submit" className="checkout-btn">
                Place Order →
              </button>

              <p className="checkout-demo-note">
                Online payment gateway and order-server connection will be added during backend development.
              </p>
            </aside>
          </form>
        </main>

      ) : isCartOpen ? (

        /* ==================== SHOPPING CART PAGE ==================== */
        <main className="container cart-page-section">

          <div className="cart-page-heading">
            <div>
              <h2>Shopping Cart</h2>
              <p>You have {cartCount} item(s) in your shopping cart.</p>
            </div>

            <button className="back-products-btn" onClick={backToProducts}>
              ← Continue Shopping
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your Cart is Empty!</h2>
              <p>Looks like you haven't added any grocery products yet.</p>
              <button className="primary-btn" onClick={backToProducts}>
                Start Shopping →
              </button>
            </div>
          ) : (
            <div className="cart-layout">

              <div className="cart-items-section">
                <div className="cart-items-heading">
                  <h3>Cart Items ({cartItems.length})</h3>
                </div>

                {cartItems.map((item) => (
                  <div className="cart-item" key={item.cartKey}>

                    <div className="cart-item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.productName} />
                      ) : (
                        <span>{item.emoji}</span>
                      )}
                    </div>

                    <div className="cart-item-info">
                      <h3>{item.productName}</h3>
                      <p>Size: {item.size}</p>
                      <p>Price: ৳{item.price}</p>

                      <div className="cart-item-actions">
                        <div className="cart-quantity-control">
                          <button
                            onClick={() => updateCartQuantity(item.cartKey, -1)}
                            aria-label={`Decrease ${item.productName} quantity`}
                          >
                            −
                          </button>
                          <strong>{item.quantity}</strong>
                          <button
                            onClick={() => updateCartQuantity(item.cartKey, 1)}
                            aria-label={`Increase ${item.productName} quantity`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="remove-cart-item"
                          onClick={() => removeCartItem(item.cartKey)}
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      <span>Subtotal</span>
                      <strong>৳{item.price * item.quantity}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="cart-summary">
                <h3>Order Summary</h3>

                <div className="cart-summary-row">
                  <span>Subtotal ({cartCount} items)</span>
                  <strong>৳{cartSubtotal}</strong>
                </div>

                <div className="cart-summary-row">
                  <span>Delivery Charge</span>
                  <strong>{deliveryCharge === 0 ? 'FREE' : `৳${deliveryCharge}`}</strong>
                </div>

                {cartSubtotal < 1000 && (
                  <p className="cart-delivery-note">
                    Add ৳{1000 - cartSubtotal} more to get free delivery.
                  </p>
                )}

                <div className="cart-summary-divider"></div>

                <div className="cart-grand-total">
                  <span>Grand Total</span>
                  <strong>৳{grandTotal}</strong>
                </div>

                <button className="checkout-btn" onClick={openCheckout}>
                  Proceed to Checkout →
                </button>

                <button className="continue-shopping-btn" onClick={backToProducts}>
                  Continue Shopping
                </button>

                <div className="cart-payment-info">
                  <p>💳 Cash on Delivery Available</p>
                  <p>🔒 Safe and Convenient Shopping</p>
                  <p>🚚 Delivery Available in Dhaka</p>
                </div>
              </aside>
            </div>
          )}
        </main>

      ) : selectedProduct ? (

        /* ==================== PRODUCT DETAILS PAGE ==================== */
        <main className="container product-details-section">

          <button className="back-products-btn" onClick={backToProducts}>
            ← Back to Products
          </button>

          <div className="product-details-card">

            <div className="product-details-image">
              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="product-details-photo"
                />
              ) : (
                <span>{selectedProduct.emoji}</span>
              )}
            </div>

            <div className="product-details-info">
              <span className="details-category">{selectedProduct.category}</span>
              <h1>{selectedProduct.name}</h1>

              <div className="details-rating">
                ⭐⭐⭐⭐⭐ <span>Quality Grocery Product</span>
              </div>

              <p className="details-description">{selectedProduct.description}</p>

              <div className="details-divider"></div>

              <h3>Select Size / Weight</h3>
              {renderVariantOptions(selectedProduct)}

              <div className="details-price-row">
                <span>Price</span>
                <strong>৳{detailVariant.price}</strong>
              </div>

              <div className="details-quantity-row">
                <span>Quantity</span>
                {renderQuantityControl(selectedProduct)}
              </div>

              <div className="details-total-row">
                <span>Total Amount</span>
                <strong>৳{detailTotal}</strong>
              </div>

              <button
                className="primary-btn details-add-cart-btn"
                onClick={() => addToCart(selectedProduct, detailVariant, detailQuantity)}
              >
                🛒 Add to Cart
              </button>

              <div className="product-delivery-info">
                <p>🚚 Delivery available in Dhaka</p>
                <p>💳 Cash on Delivery available</p>
                <p>🔒 Safe and convenient shopping</p>
              </div>
            </div>
          </div>
        </main>

      ) : (

        /* ==================== HOMEPAGE ==================== */
        <>
          <section className="hero-section" id="home">
            <div className="container hero-content">

              <div className="hero-text">
                <span className="hero-label">Your Daily Grocery Partner</span>

                <h2>
                  Everyday Needs
                  <br />
                  <span>One Trusted Store</span>
                </h2>

                <p>
                  Choose your preferred grocery products
                  and enjoy convenient shopping.
                </p>

                <a href="#products" className="primary-btn">
                  Shop Now →
                </a>
              </div>

              <div className="hero-image">🛒 🌾 🛢️ 🍪</div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="container features-section">
            <div className="feature-grid">
              {features.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CATEGORIES */}
          <section className="container section" id="categories">
            <div className="section-heading">
              <h2>Shop by Categories</h2>
              <span>Explore Our Grocery Categories</span>
            </div>

            <div className="category-grid">
              {categories.map((category) => (
                <a href="#products" className="category-card" key={category.id}>
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.name}</h3>
                  <p>{category.english}</p>
                </a>
              ))}
            </div>
          </section>

          {/* DEALS */}
          <section className="container deals-section" id="deals">
            <div className="deals-banner">
              <div>
                <span>Special Grocery Deals</span>
                <h2>Save More on Your Daily Shopping!</h2>
                <p>Discover great value on everyday essentials.</p>
              </div>

              <a href="#products" className="primary-btn">
                Explore Products →
              </a>
            </div>
          </section>

          {/* PRODUCTS */}
          <section className="container section" id="products">
            <div className="section-heading">
              <h2>Popular Grocery Products</h2>
              <span>Choose Size & Quantity</span>
            </div>

            <div className="product-grid">
              {products.map((product) => {
                const selectedIndex = selectedVariants[product.id]
                const selectedVariant = product.variants[selectedIndex]
                const quantity = quantities[product.id]
                const total = selectedVariant.price * quantity

                return (
                  <div className="product-card variant-card" key={product.id}>
                    {renderProductImage(product)}

                    <h3>{product.name}</h3>

                    <button
                      className="view-details-btn"
                      onClick={() => openProductDetails(product)}
                    >
                      View Details →
                    </button>

                    <p className="variant-label">Select Size / Weight</p>
                    {renderVariantOptions(product)}

                    <div className="selected-price">
                      <span>Price</span>
                      <strong>৳{selectedVariant.price}</strong>
                    </div>

                    <div className="quantity-row">
                      <span>Quantity</span>
                      {renderQuantityControl(product)}
                    </div>

                    <div className="total-row">
                      <span>Total</span>
                      <strong>৳{total}</strong>
                    </div>

                    <button
                      className="primary-btn add-cart-btn"
                      onClick={() => addToCart(product, selectedVariant, quantity)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ABOUT */}
          <section className="container about-section" id="about">
            <div className="about-content">
              <h2>About SS-Enterprise</h2>
              <p>
                SS-Enterprise is your trusted grocery shopping destination.
                We aim to provide quality everyday essentials,
                convenient shopping and reliable service.
              </p>
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="container footer-content">
          <h2>SS-Enterprise</h2>
          <p>Your Trusted Grocery Store</p>
          <p>Quality Products | Best Prices | Trusted Service</p>
          <p>Contact Us | Dhaka, Bangladesh</p>
          <p>© 2026 SS-Enterprise. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
