<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>InfoSocio Admin - Login</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/admin.css">
</head>
<body>
  <div class="login-page">
    <div class="login-card card p-4">
      <div class="card-body">
        <h3 class="fw-bold text-center mb-4">InfoSocio Admin</h3>
        <form id="loginForm">
          <div id="loginError" class="alert alert-danger py-2 d-none"></div>
          <div class="mb-3">
            <label class="form-label">Usuario</label>
            <input type="text" id="username" class="form-control" value="admin" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input type="password" id="password" class="form-control" value="123" required>
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary btn-lg" id="loginBtn">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = document.getElementById('loginBtn');
      const errorEl = document.getElementById('loginError');
      btn.disabled = true;
      btn.textContent = 'Ingresando...';
      errorEl.classList.add('d-none');
      try {
        const res = await fetch('./api/index.php?action=login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
          })
        });
        const data = await res.json();
        if (data.success) {
          sessionStorage.setItem('admin_user', JSON.stringify(data.user));
          window.location.href = 'index.php?page=dashboard';
        } else {
          errorEl.textContent = data.message || 'Credenciales inválidas';
          errorEl.classList.remove('d-none');
        }
      } catch(err) {
        errorEl.textContent = 'Error de conexión';
        errorEl.classList.remove('d-none');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Ingresar';
      }
    });
  </script>
</body>
</html>
