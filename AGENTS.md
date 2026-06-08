# InfoSocio — Production Config

## Stack
- **Web SPA**: React 19 + Vite 8 + Bootstrap 5 + SASS
- **Admin SPA**: React 19 + Vite 8 + Bootstrap 5 + SASS + Recharts
- **Backend**: PHP REST API (`/admin/api/`)
- **Database**: MySQL 8 (`infosoci_db_infosocio`)
- **Hosting**: BAEHOST (cPanel)

## Production URLs
| App | URL |
|---|---|
| Web SPA | `https://infosocio.com/` (o `https://infosocio.com.ar/`) |
| Admin SPA | `https://infosocio.com/admin/` (o `https://infosocio.com.ar/admin/`) |

## Base paths
| App | Environment | `vite.config.js` base |
|---|---|---|
| `web/` | Production | `'/'` |
| `web/` | Local dev | `'/web/'` |
| `admin/` | All | `'/admin/'` |

## Directory structure (production)
```
public_html/
├── .htaccess          # Root router: admin passthrough + asset rewrite + SPA fallback
├── index.php          # Web SPA router (serves dist/index.html)
├── dist/              # Web SPA build output
│   ├── index.html
│   ├── assets/
│   └── favicon.svg, icons.svg
├── web/               # MercadoPago return pages
│   ├── exito.php
│   ├── fallo.php
│   └── pendiente.php
└── admin/             # Admin SPA + PHP API
    ├── .htaccess      # API passthrough + SPA fallback
    ├── index.php      # Admin router (base `/admin`)
    ├── api/           # PHP REST API
    │   ├── config/
    │   │   ├── database.php     # DB credentials (prod active)
    │   │   └── mercadopago.php  # MP access token + public key
    │   ├── controllers/
    │   ├── middleware/
    │   ├── buscar.php, buscar2.php, buscar-basic.php
    │   └── index.php  # API router (?action=...)
    └── dist/          # Admin SPA build output
        ├── index.html
        ├── assets/
        └── favicon.svg, icons.svg
```

## Auth
- PHP session-based, login via `POST /admin/api/index.php?action=login`
- Default user: `admin`, pass: `123`
- Password hash (bcrypt): `$2y$10$KGGjFrTK6E.xFtLgqBngTOHA4GlNZv.vt9LbMIz9TohfnVClx5Dsa`

## Database
- File: `DOC/database-last.sql`
- Tables: `admin_users`, `solicitudes`, `precio`
- Import via phpMyAdmin after deployment
- Production credentials (`admin/api/config/database.php`):
  - Host: `localhost`
  - DB: `infosoci_db_infosocio`
  - User: `infosoci_db_infosocio`
  - Pass: `wtx0=SzAPMN+4v(S`

## MercadoPago
- Access Token: `APP_USR-4661912481375972-060219-1b91589ed50da52e21c0c34584c4fb71-3211823773`
- Public Key: `APP_USR-cb2d0218-3b5d-444c-b5b0-9c02a1e811ad`
- Return URLs: `/web/exito.php`, `/web/fallo.php`, `/web/pendiente.php`

## Deployment
1. Build both apps: `cd web && npm run build` (base `/`), `cd admin && npm run build` (base `/admin/`)
2. Create zip with correct structure (see `infosocio_deploy.zip`)
3. Upload via cPanel File Manager to `public_html/`
4. Import `DOC/database-last.sql` via phpMyAdmin
5. Ensure DNS points to BAEHOST IP

## DNS
- `infosocio.com`: registrado en PublicDomainRegistry.com, nameservers apuntando a BAEHOST
- `infosocio.com.ar`: delegado y apuntando a BAEHOST (Parked Domain sobre infosocio.com)
- Nameservers: `ns9.baehost.com`, `ns10.baehost.com`, `ns11.baehost.com`
- Server IP: `131.255.5.12`

## Key files
| Path | Purpose |
|---|---|
| `.htaccess` | Root routing rules |
| `index.php` | Web SPA router |
| `web/exito.php` | MP success page |
| `web/fallo.php` | MP failure page |
| `web/pendiente.php` | MP pending page |
| `admin/api/config/database.php` | DB credentials |
| `admin/api/config/mercadopago.php` | MP credentials |
| `DOC/database-last.sql` | Database dump |
