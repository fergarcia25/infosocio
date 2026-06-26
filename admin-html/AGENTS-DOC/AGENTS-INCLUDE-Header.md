# include/header.php

The header include should render:
1. `<!DOCTYPE html>` + `<html lang="es">`
2. `<head>` with:
   - charset UTF-8
   - viewport meta
   - title "InfoSocio Admin"
   - Google Fonts (Raleway + Roboto)
   - Bootstrap 5 CSS CDN
   - Bootstrap Icons CDN
   - Chart.js CDN
   - html2canvas + jsPDF CDNs
   - Link to `assets/css/admin.css`
3. Detect current page from `$_GET['page']` for active nav
4. `<body>` + `<div class="admin-layout">`
5. Include sidebar (unless login page)
6. `<div class="main-content">` + `<header class="admin-header">`

The header should NOT close `<body>` or `<html>` — footer.php does that.
