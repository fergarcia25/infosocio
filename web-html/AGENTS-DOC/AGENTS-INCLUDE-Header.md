# AGENTS-INCLUDE-Header

## Output file
`include/header.php`

## JavaScript needed (in `js/scripts.js`)
- **Scroll detection**: Add/remove `.navbar-scrolled` class when `window.scrollY >= window.innerHeight`
- **Mobile menu toggle**: Open/close `.nav-offcanvas` when `.navbar-toggler` / `.nav-close-btn` / `.nav-overlay` is clicked
- **Search submit**: Capture form submit, redirect to `/resultados?q=...`
- **Optional**: Scroll-to-next-section on wheel/keydown at top of page (simplified version)

## PHP logic (at the very top, before DOCTYPE)

```php
<?php
$currentUri = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$currentUri = preg_replace('#/index\.php$#', '', $currentUri) ?: '/';
$currentUri = preg_replace('#\.php$#', '', $currentUri);
$currentUri = ltrim($currentUri, '/') ?: '.';
$knownRoutes = ['.', 'infoboost', 'infotarget'];
$currentRoute = in_array($currentUri, $knownRoutes, true) ? $currentUri : null;
function navActive($href) {
    global $currentRoute;
    return $currentRoute === $href ? ' active' : '';
}
?>
```

## Page content

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>InfoSocio — Informes Personalizados</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<!-- Mobile overlay -->
<div class="nav-overlay" id="navOverlay" style="display: none;"></div>

<nav class="container d-flex mx-auto navbar navbar-expand-lg" id="mainNav">
  <div class="container-fluid px-0">

    <!-- Logo -->
    <a class="navbar-brand" href=".">
      <img src="assets/images/logo-full.png" alt="InfoSocio" height="52" />
    </a>

    <!-- Toggler (mobile) -->
    <button class="navbar-toggler" type="button" id="navbarToggler">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Offcanvas (mobile) -->
    <div class="nav-offcanvas" id="navOffcanvas">
      <button class="nav-close-btn" id="navCloseBtn">
        <i class="bi bi-x-lg"></i>
      </button>
      <ul class="nav-offcanvas-links">
        <li class="nav-item">
          <a class="nav-link<?php echo navActive('.'); ?>" href=".">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link<?php echo navActive('infoboost'); ?>" href="infoboost">InfoBoost</a>
        </li>
        <li class="nav-item">
          <a class="nav-link<?php echo navActive('infotarget'); ?>" href="infotarget">InfoTarget</a>
        </li>
      </ul>
      <div class="nav-offcanvas-search">
        <form class="d-flex" style="background: #f1f1f1; border-radius: 16px; padding: 0;">
          <input type="text" class="form-control border-0" placeholder="Buscar.." style="background: transparent; padding: 6px 10px; border-top-left-radius: 16px; border-bottom-left-radius: 16px;" />
          <button class="btn btn-dark fw-bold" type="submit" style="border-radius: 16px; padding: 0.3rem 1rem;">Buscar</button>
        </form>
      </div>
    </div>

    <!-- Desktop nav -->
    <div class="collapse navbar-collapse">
      <div class="d-flex align-items-center ms-auto gap-3">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link<?php echo navActive('.'); ?>" href=".">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link<?php echo navActive('infoboost'); ?>" href="infoboost">InfoBoost</a>
          </li>
          <li class="nav-item">
            <a class="nav-link<?php echo navActive('infotarget'); ?>" href="infotarget">InfoTarget</a>
          </li>
        </ul>
        <form class="d-flex" style="background: #f1f1f1; border-radius: 16px; padding: 0;">
          <input type="text" class="form-control border-0" placeholder="Buscar.." style="background: transparent; padding: 6px 10px; border-top-left-radius: 16px; border-bottom-left-radius: 16px;" />
          <button class="btn btn-dark fw-bold" type="submit" style="border-radius: 16px; padding: 0.3rem 1rem;">Buscar</button>
        </form>
      </div>
    </div>

  </div>
</nav>

<main>
