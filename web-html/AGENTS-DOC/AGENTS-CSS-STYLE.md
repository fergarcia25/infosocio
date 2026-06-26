# AGENTS-CSS-STYLE

## Output file
`assets/css/style.css`

## Notes
This CSS is converted from the SCSS files in `/web/src/styles/` (`_variables.scss`, `main.scss`). All SCSS variables, nesting, and functions have been resolved to plain CSS.

## Page content

/* ===== RESET & GLOBAL ===== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
}

.container {
  padding-right: calc(var(--bs-gutter-x) * 1.4);
  padding-left: calc(var(--bs-gutter-x) * 1.4);
}

/* ===== NAVBAR ===== */

.navbar {
  --bs-navbar-brand-padding-y: 0;
  --nav-left: 0;
  --nav-right: 0;
  padding: 0.1rem 0.75rem;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 30px;
  border: 1px solid rgb(243 243 243 / 35%);
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 100%);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0 4px 10px rgba(159, 159, 159, 0.4);
  animation: nav-enter 3.5s ease-out forwards;
}

.navbar .container-fluid > :not(.navbar-brand):not(.navbar-toggler) {
  animation: nav-children-enter 1.5s ease-out forwards;
}

@keyframes nav-enter {
  0% {
    opacity: 0;
    max-width: 190px;
    min-width: 190px;
    left: var(--nav-left);
    right: var(--nav-right);
  }
  28.6% {
    opacity: 1;
    max-width: 190px;
    left: var(--nav-left);
    right: var(--nav-right);
  }
  67.1% {
    opacity: 1;
    width: calc(102% - (calc(var(--bs-gutter-x) * 1.4)*2));
    max-width: 1300px;
    min-width: 190px;
    left: var(--nav-left);
    right: var(--nav-right);
    margin-right: calc(var(--bs-gutter-x) * 1.4);
    margin-left: calc(var(--bs-gutter-x) * 1.4);
  }
  to {
    opacity: 1;
    width: calc(100% - (calc(var(--bs-gutter-x) * 1.4)*2));
    max-width: 1300px;
    min-width: 230px;
    left: var(--nav-left);
    right: var(--nav-right);
    margin-right: calc(var(--bs-gutter-x) * 1.4);
    margin-left: calc(var(--bs-gutter-x) * 1.4);
  }
}

@keyframes nav-children-enter {
  0%, 85.7% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 575.98px) {
  .navbar {
    --nav-left: calc(var(--bs-gutter-x) * 1.4);
    --nav-right: calc(var(--bs-gutter-x) * 1.4);
    left: calc(var(--bs-gutter-x) * 1.4);
    right: calc(var(--bs-gutter-x) * 1.4);
    width: auto;
  }
}

.navbar-scrolled {
  border: 1px solid rgb(243 243 243 / 30%);
  background: linear-gradient(90deg, rgba(255,255,255,0.875) 0%, rgba(255,255,255,0.65) 100%);
}

.navbar-brand {
  padding: 0;
}

.navbar-toggler {
  border: none;
  outline: none;
  box-shadow: none;
  padding: 0.25rem 0;
}

.navbar-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(20,20,20,0.9)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2.5' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.navbar-toggler:focus {
  box-shadow: none;
  outline: none;
}

@media (max-width: 992px) {
  .navbar-toggler {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    animation: nav-toggler-enter 0.1s ease-out 1s forwards;
  }
}

@keyframes nav-toggler-enter {
  to {
    visibility: visible;
    opacity: 1;
    position: static;
  }
}

/* Offcanvas mobile menu */

.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.nav-offcanvas {
  display: none;
  justify-self: center;
  position: fixed;
  top: 10vh;
  left: 1%;
  width: 98%;
  z-index: 1050;
  background: rgba(255, 255, 255, 0.89);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(4px);
  flex-direction: column;
  transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-bottom: 6vh;
  border-radius: 25px;
  padding-top: 0.5rem;
}

.nav-offcanvas.open {
  display: flex;
  transform: translateX(0);
}

.nav-close-btn {
  position: fixed;
  top: -9.5vh;
  right: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-close-btn:hover {
  background: #e0e0e0;
}

.nav-offcanvas-links {
  list-style: none;
  padding: 1rem 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-offcanvas-links .nav-link {
  margin: 0;
  padding: 0.75rem 0.6rem !important;
  font-size: 1.25rem;
  font-weight: 500;
  border-bottom: 1px solid #590e0e30;
  text-align: center;
}

.nav-offcanvas-links .nav-link.active {
  color: #b71c1c;
  background: none;
}

.nav-offcanvas-links .nav-link:hover {
  color: #b71c1c;
  background: none;
}

.nav-offcanvas-search {
  margin-top: auto;
  padding: 1rem 1rem;
  background: #b3b3b3;
  border-radius: 20px;
}

.nav-offcanvas-search .form-control {
  font-size: 1.4rem !important;
}

@media (min-width: 992px) {
  .nav-offcanvas,
  .nav-overlay {
    display: none;
  }
}

.navbar-nav {
  display: flex;
  gap: 0.5rem;
}

.navbar-nav .nav-link {
  margin: 0;
  padding: 8px 14px 8px !important;
  color: #f1f1f1;
  font-size: 0.79rem;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 20px;
  border: 0;
  text-decoration: none;
  background: #212529;
  transition: all 0.3s ease;
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.active {
  background: #282d33;
  color: #d32f2f;
}

/* ===== HERO / BUSCADOR ===== */

.hero-section {
  background: linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%);
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.hero-section p {
  color: var(--bs-gray-300);
}

.search-container {
  width: 100%;
}

.search-container .form-control {
  padding: 1rem 1rem;
}

.search-container .home-search-input {
  font-size: 1rem;
  padding: 7px 18px 9px;
}

@media (min-width: 992px) {
  .search-container .home-search-input {
    font-size: 1.6rem;
  }
}

.home-search-wrapper {
  display: flex;
}

@media (min-width: 992px) {
  .home-search-wrapper {
    flex-direction: row;
    align-items: stretch;
  }

  .home-search-wrapper .home-search-input {
    border-radius: 0.5rem 0 0 0.5rem;
    flex: 1;
  }

  .home-search-wrapper .home-search-btn {
    border-radius: 0 0.5rem 0.5rem 0;
    font-size: 1.25em;
  }
}

@media (max-width: 991.98px) {
  .home-search-wrapper {
    flex-direction: row;
    gap: 0;
  }

  .home-search-wrapper .home-search-input {
    width: 80%;
    border-radius: 0.5rem 0 0 0.5rem;
    padding: 0.9rem 1.2rem;
  }

  .home-search-wrapper .home-search-btn {
    width: 20%;
    border-radius: 0 0.5rem 0.5rem 0;
    background: linear-gradient(135deg, #b71c1c, #d32f2f) !important;
    color: #fff;
    font-weight: 600;
    border: none;
    font-size: 1.25em;
    padding: 0.85rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .home-search-wrapper .home-search-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(183, 28, 28, 0.35);
    color: #fff;
  }
}

.form-control:focus {
  border: 0;
  box-shadow: -7px 0 5px 5px rgba(30, 29, 29, 0.1);
}

/* ===== HOME HERO (full viewport) ===== */

.home-hero {
  height: 100vh !important;
  min-height: 100vh !important;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
}

.home-hero .about-hero-bg {
  background: radial-gradient(ellipse 700px 400px at 20% 50%, rgba(183, 28, 28, 0.12), transparent),
              radial-gradient(ellipse 500px 400px at 80% 30%, rgba(255, 111, 0, 0.06), transparent);
}

.home-hero .about-circle-1 {
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, rgba(183, 28, 28, 0.2), rgba(255, 111, 0, 0.1));
  animation: about-hero-float 5s ease-in-out infinite;
  right: 10%;
}

.home-hero .about-circle-2 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(255, 111, 0, 0.15), rgba(183, 28, 28, 0.05));
  top: 40%;
  right: 20%;
  animation: about-hero-float 6s ease-in-out infinite reverse;
}

.home-hero .about-circle-3 {
  width: 45px;
  height: 45px;
  background: rgba(183, 28, 28, 0.08);
  bottom: 35%;
  right: 35%;
  animation: about-hero-float 3s ease-in-out infinite 1s;
}

@keyframes about-hero-float {
  0%, 100% { transform: translate(0,0); }
  50% { transform: translate(-30px, -40px); }
}

/* Home Slider (inside hero) */

.home-hero .home-slider {
  position: absolute;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
}

.home-slider-track {
  display: flex;
  height: 100%;
  flex: 1;
  gap: 12px;
}

@media (min-width: 768px) {
  .home-slider-track {
    gap: 16px;
  }
}

@media (min-width: 992px) {
  .home-slider-track {
    gap: 24px;
  }
}

.home-slide {
  flex: 0 0 228px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

.home-slide-card {
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(20px);
  border: 0 solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 0.8rem 0.75rem 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.25s ease;
}

.home-slide-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}

.home-slide-icon {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}

.home-slide-title {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  color: #fff;
  line-height: 1.15;
  font-size: clamp(0.85rem, 2vw, 0.85rem);
}

.home-hero-floating-link {
  position: absolute;
  right: 30px;
  top: 14vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 1px solid rgb(91 37 37 / 70%);
  background: rgba(183, 28, 28, 0.35);
  backdrop-filter: blur(20px);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 400;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.1;
  opacity: 0;
  animation: home-hero-float-in 1.2s ease-out 3s forwards;
  z-index: 2;
  cursor: pointer;
}

.home-hero-floating-link i {
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
}

.home-hero-floating-link:hover {
  background: rgba(183, 28, 28, 0.65);
  color: #fff;
  box-shadow: 0 4px 10px rgba(159, 159, 159, 0.4);
}

@keyframes home-hero-float-in {
  from {
    transform: translateX(60px) rotate(0deg);
    opacity: 0;
  }
  65% {
    transform: translateX(0) rotate(-360deg);
    opacity: 1;
    width: 76px;
    height: 76px;
    box-shadow: 0 4px 10px rgba(159, 159, 159, 0.1);
  }
  80% {
    transform: translateX(0) rotate(-360deg);
    opacity: 1;
    width: 82px;
    height: 82px;
    box-shadow: 0 4px 10px rgba(159, 159, 159, 0.4);
  }
  95% {
    transform: translateX(0) rotate(-360deg);
    opacity: 1;
  }
  to {
    transform: translateX(0) rotate(-360deg);
    opacity: 1;
    box-shadow: 0 4px 10px rgba(159, 159, 159, 0.1);
  }
}

/* ===== FOOTER ===== */

.site-footer {
  background-color: rgb(187, 32, 32);
  color: #fff;
  padding: 3rem 0 1.5rem;
}

/* ===== CARDS ===== */

.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* ===== SERVICES / PLANS ===== */

.services-hero {
  background: linear-gradient(135deg, #b71c1c 0%, #d32f2f 50%, #a51a1a 100%);
  padding: 4rem 1.5rem;
  position: relative;
  overflow: hidden;
}

.services-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50%;
}

.services-hero::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50%;
}

.plan-card {
  background: #fff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  position: relative;
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.plan-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #b71c1c, #d32f2f);
  opacity: 1;
}

.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(183, 28, 28, 0.12);
  border-color: transparent;
}

.plan-card:hover::before {
  opacity: 1;
}

.plan-card.popular {
  border-color: transparent;
  box-shadow: 0 8px 40px rgba(183, 28, 28, 0.15);
  transform: scale(1.02);
}

.plan-card.popular::before {
  opacity: 1;
  height: 5px;
}

.plan-card.popular:hover {
  transform: scale(1.02) translateY(-8px);
}

.plan-card.highlight {
  background: linear-gradient(180deg, #fffaf0 0%, #fff 40%);
  border-color: rgba(255, 111, 0, 0.2);
}

.plan-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #b71c1c, #d32f2f);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.35rem 0.9rem;
  border-radius: 50px;
}

.plan-badge.highlight-badge {
  background: linear-gradient(135deg, #ff6f00, #ff8f00);
}

.plan-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1;
  color: #b71c1c;
}

.plan-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
}

.plan-desc {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.plan-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: #b71c1c;
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s ease;
  border: none;
}

.plan-btn:hover {
  background: #981717;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(183, 28, 28, 0.3);
}

.plan-card.popular .plan-btn {
  background: linear-gradient(135deg, #b71c1c, #d32f2f);
}

.plan-card.popular .plan-btn:hover {
  box-shadow: 0 8px 25px rgba(183, 28, 28, 0.35);
}

.result-card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
}

/* ===== HOME ABOUT CARD ===== */

.home-about-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.home-about-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #b71c1c, #d32f2f);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
}

.home-about-card-header i {
  font-size: 1.1rem;
}

.home-about-list {
  display: flex;
  flex-direction: column;
}

.home-about-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
}

.home-about-item:last-child {
  border-bottom: none;
}

.home-about-item i:first-child {
  width: 20px;
  color: #b71c1c;
  font-size: 1rem;
  flex-shrink: 0;
}

.home-about-item i:last-child {
  margin-left: auto;
  color: #ccc;
  font-size: 0.8rem;
  transition: transform 0.2s ease;
}

.home-about-item:hover {
  background: #fafafa;
  color: #b71c1c;
  padding-left: 1.8rem;
}

.home-about-item:hover i:last-child {
  transform: translateX(3px);
  color: #b71c1c;
}

/* ===== ABOUT / NOSOTROS ===== */

.min-vh-80 {
  min-height: 80vh;
}

.text-gradient {
  background: linear-gradient(135deg, #d32f2f, #b71c1c, #e12929);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-hero {
  position: relative;
  background: #0a0a1a;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding: 0;
}

.about-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 600px 400px at 10% 50%, rgba(183, 28, 28, 0.15), transparent),
              radial-gradient(ellipse 500px 400px at 80% 20%, rgba(255, 111, 0, 0.08), transparent),
              radial-gradient(ellipse 300px 300px at 60% 80%, rgba(183, 28, 28, 0.25), transparent);
}

.about-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #d32f2f;
  background: rgba(183, 28, 28, 0.1);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.about-hero-title {
  width: 100%;
  font-size: clamp(2.4rem, 3.2vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.about-hero-sub {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 520px;
  line-height: 1.7;
}

.about-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  background: linear-gradient(135deg, #b71c1c, #d32f2f);
  color: #fff;
  font-weight: 600;
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
}

.about-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(183, 28, 28, 0.35);
  color: #fff;
}

.about-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  color: #fff;
  font-weight: 600;
  border-radius: 14px;
  text-decoration: none;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.about-btn-outline:hover {
  border-color: #d32f2f;
  background: rgba(183, 28, 28, 0.1);
  color: #fff;
}

.about-hero-visual {
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: about-fade-in 1.6s ease-out 0.8s forwards;
}

.about-circle {
  position: absolute;
  border-radius: 50%;
}

.about-circle-1 {
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, rgba(183, 28, 28, 0.2), rgba(255, 111, 0, 0.1));
  animation: about-float 6s ease-in-out infinite;
}

.about-circle-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, rgba(255, 111, 0, 0.15), rgba(183, 28, 28, 0.05));
  top: 20%;
  right: 10%;
  animation: about-float 8s ease-in-out infinite reverse;
}

.about-circle-3 {
  width: 120px;
  height: 120px;
  background: rgba(183, 28, 28, 0.08);
  bottom: 10%;
  right: 30%;
  animation: about-float 5s ease-in-out infinite 1s;
}

@keyframes about-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

.about-hero-card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2rem;
  width: 220px;
}

/* About hero entrance animations */

.about-hero .about-tag,
.about-hero .about-hero-title,
.about-hero .about-hero-sub,
.about-hero .about-hero-visual,
.about-hero .about-hero-card,
.about-hero .search-container,
.about-hero .home-slider {
  opacity: 0;
}

.about-tag {
  animation: about-fade-in 0.4s ease-out 0s forwards;
}

.about-hero-title {
  animation: about-fade-in 1.8s ease-out 0.3s forwards;
}

.about-hero-visual {
  animation: about-fade-in 0.6s ease-out 1.5s forwards;
}

.about-hero-sub,
.about-hero-card {
  animation: about-fade-in 1.5s ease-out 2.5s forwards;
}

.home-hero .search-container {
  opacity: 0;
  animation: about-show 0.8s ease-out 0.4s forwards;
}

.home-slider {
  animation: about-fade-in 0.5s ease-out 1.7s forwards;
}

@keyframes about-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.about-hero .about-buttons {
  opacity: 0;
  animation: about-show 0.8s ease-out 0.4s forwards;
}

@keyframes about-show {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.about-section {
  padding: 7.5rem 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.about-section > .container {
  width: 100%;
}

.about-plans-section {
  padding: 7rem 0;
}

.about-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #666;
  margin-bottom: 0.75rem;
}

.about-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.about-text {
  font-size: 1rem;
  color: #555;
  line-height: 1.7;
}

.about-stats-row {
  display: flex;
  gap: 2.5rem;
  margin-top: 2rem;
}

.about-stats-row > div {
  display: flex;
  flex-direction: column;
}

.about-stat-num {
  font-size: 1.8rem;
  font-weight: 800;
  color: #b71c1c;
  line-height: 1;
}

.about-stat-label {
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.25rem;
}

.about-targets {
  background: #fafafa;
  border-radius: 24px;
  padding: 2.5rem;
  border: 1px solid #f0f0f0;
}

.about-target-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.about-target-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.about-target-icon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.about-transform-section {
  background: #0a0a1a;
  padding: 7rem 0;
  position: relative;
  overflow: hidden;
}

.about-transform-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(183, 28, 28, 0.3), transparent);
}

.about-transform-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(183, 28, 28, 0.3), transparent);
}

.about-transform-grid {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3.5rem;
  flex-wrap: wrap;
}

.about-transform-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 2rem;
  width: 240px;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.about-transform-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(183, 28, 28, 0.2);
  transform: translateY(-4px);
}

.about-transform-card .about-tc-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: rgba(183, 28, 28, 0.3);
  line-height: 1;
  margin-bottom: 0.75rem;
}

.about-transform-card h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.about-transform-card p {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  line-height: 1.6;
}

.about-transform-arrow {
  color: #b71c1c;
  flex-shrink: 0;
}

@media (max-width: 991.98px) {
  .about-transform-arrow {
    display: none;
  }
}

.about-features-section {
  background: #fafafa;
}

.about-feat-card {
  background: #fff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.35s ease;
  height: 100%;
}

.about-feat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
  border-color: transparent;
}

.about-feat-card .about-feat-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #fef2f2, #fce4e4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  font-size: 1.4rem;
  color: #b71c1c;
}

.about-feat-card h4 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
}

.about-feat-card h3 {
  margin-bottom: 0.75rem;
}

.about-feat-card p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.7;
  margin: 0;
}

.about-feat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.about-feat-tags span {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.3rem 0.7rem;
  border-radius: 50px;
  background: #f5f5f5;
  color: #555;
}

.about-benefits-section {
  background: #0a0a1a;
  padding: 7rem 0;
  min-height: calc(5rem + 5px);
  display: flex;
  vertical-align: middle;
}

.about-benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

@media (min-width: 992px) {
  .about-benefits-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.about-benefit-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 1.2rem 1.6rem 1.8rem;
  text-align: center;
  transition: all 0.3s ease;
}

.about-benefit-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-4px);
}

.about-benefit-card i {
  font-size: 2rem;
  color: #b71c1c;
  margin-bottom: 1rem;
}

.about-benefit-card h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.about-benefit-card p {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  line-height: 1.6;
}

.about-steps {
  max-width: 700px;
  margin: 0 auto;
}

.about-step {
  display: flex;
  gap: 1.5rem;
  position: relative;
  padding-bottom: 2.5rem;
}

.about-step:last-child {
  padding-bottom: 0;
}

.about-step:last-child .about-step-line {
  display: none;
}

.about-step-num {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #b71c1c, #d32f2f);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.about-step-line {
  position: absolute;
  top: 48px;
  left: 23.5px;
  width: 2px;
  height: calc(100% - 48px);
  background: linear-gradient(180deg, rgba(183, 28, 28, 0.3), transparent);
}

.about-step-content {
  padding-top: 0.5rem;
}

.about-step-content h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.about-step-content p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.7;
  margin: 0;
}

.about-cta-section {
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a0a 50%, #0a0a1a 100%);
  padding: 7rem 0;
  position: relative;
  overflow: hidden;
}

.about-cta-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 800px 400px at 50% 50%, rgba(183, 28, 28, 0.1), transparent);
}

.results-filter-wrap .form-label {
  color: rgba(255, 255, 255, 0.8) !important;
}

.about-form {
  background: #fff;
  border-radius: 24px;
  padding: 1.2rem;
  box-shadow: 0 10px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.about-input {
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.25s ease;
  outline: none;
  background: #fafafa;
}

.about-input:focus {
  border-color: #b71c1c;
  box-shadow: 0 0 0 3px rgba(183, 28, 28, 0.08);
  background: #fff;
}

.about-input::placeholder {
  color: #aaa;
}

.about-textarea {
  resize: vertical;
  min-height: 90px;
}

/* ===== ESTILOS ESPECÍFICOS PARA EL INFORME ===== */

.report-container .card {
  border: 1px solid #e7e7e7 !important;
  border-radius: 8px !important;
  box-shadow: 0 1px 12px rgba(0,0,0,0.1);
}

.report-container .card .card-body {
  padding: 1.25rem;
}

.report-container h5.fw-bold {
  color: #b71c1c;
}

.report-container .table {
  border: 1px solid #dee2e6;
}

.report-container .table thead {
  background-color: #b71c1c !important;
  color: #ffffff;
}

.report-container .table thead th {
  border-color: #a51a1a;
  font-size: 0.85rem;
  padding: 8px !important;
}

.report-container .table tbody td {
  font-size: 0.85rem;
  padding: 8px !important;
  vertical-align: middle;
}

/* ===== UTILITIES ===== */

.text-muted { color: #6c757d; }
.text-danger { color: #b71c1c !important; }
.text-success { color: #2e7d32 !important; }
