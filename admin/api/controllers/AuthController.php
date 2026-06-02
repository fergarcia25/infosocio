<?php
require_once __DIR__ . '/../config/database.php';

class AuthController {
    public function login() {
        $input = json_decode(file_get_contents('php://input'), true);
        $username = $input['username'] ?? '';
        $password = $input['password'] ?? '';

        if (!$username || !$password) {
            return ['success' => false, 'message' => 'Usuario y contraseña requeridos'];
        }

        $db = getDB();
        $stmt = $db->prepare("SELECT id, username, password_hash FROM admin_users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            return ['success' => false, 'message' => 'Credenciales inválidas'];
        }

        if (session_status() === PHP_SESSION_NONE) session_start();
        $_SESSION['admin_user'] = ['id' => $user['id'], 'username' => $user['username']];

        return ['success' => true, 'user' => $_SESSION['admin_user']];
    }

    public function logout() {
        if (session_status() === PHP_SESSION_NONE) session_start();
        session_destroy();
        return ['success' => true];
    }

    public function check() {
        require_once __DIR__ . '/../middleware/auth.php';
        $user = checkAuth();
        return ['success' => true, 'user' => $user];
    }
}
