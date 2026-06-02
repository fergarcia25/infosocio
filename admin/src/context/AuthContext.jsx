import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('admin_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = useCallback(async (username, password) => {
    const res = await fetch('/admin/api/index.php?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (data.success) {
      setUser(data.user)
      sessionStorage.setItem('admin_user', JSON.stringify(data.user))
    }
    return data
  }, [])

  const logout = useCallback(async () => {
    await fetch('/admin/api/index.php?action=logout')
    setUser(null)
    sessionStorage.removeItem('admin_user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
