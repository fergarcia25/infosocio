# include/status-badge.php

Function `statusBadge($status)`:

Map status strings to Bootstrap badge classes:
- `pendiente` → `bg-warning text-dark` label "Pendiente"
- `rechazado` → `bg-danger` label "Rechazado"
- `finalizado` → `bg-success` label "Finalizado"
- `aprobado` → `bg-success` label "Aprobado"
- default → `bg-secondary` label = $status

Output: `<span class="badge badge-estado {bg}">{text}</span>`
