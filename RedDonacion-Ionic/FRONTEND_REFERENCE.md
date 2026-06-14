# RedDonación Ionic – Documentación de Implementación

## Qué se ha tomado del frontend (React/Vite)

Este documento describe qué elementos, patrones y decisiones del frontend React han sido portados al proyecto Ionic Angular.

---

## 1. Paleta de Colores (`variables.scss`)

| Token frontend (CSS/Tailwind)         | Valor HSL original            | Equivalente en Ionic SCSS            |
|---------------------------------------|-------------------------------|--------------------------------------|
| `--primary` (Terracotta)              | `hsl(24.3, 61.8%, 43.1%)`    | `--rd-primary: #b8602a`              |
| `--primary-foreground`                | `hsl(40, 60%, 99%)`          | `--rd-primary-light: #f5e8df`        |
| `--secondary` (Olive Green)           | `hsl(82.6, 46.0%, 51.4%)`    | `--rd-secondary: #7aab46`            |
| `--background` (Warm White)           | `hsl(40, 60%, 99%)`          | `--rd-bg: #fdfaf7`                   |
| `--foreground` (Navy)                 | `hsl(255.6, 23.9%, 22.2%)`   | `--rd-foreground: #2e2a3b`           |
| `--muted-foreground` (Gray)           | `hsl(288, 2.2%, 44.5%)`      | `--rd-muted-fg: #706c7a`             |
| `--destructive`                       | `hsl(0, 84.2%, 60.2%)`       | `--rd-destructive: #dc2626`          |
| `--border`                            | `hsl(288, 2.2%, 44.5%)`      | `--rd-border: #e2ddd8`               |

Estas variables se definen en `src/theme/variables.scss` y se usan globalmente como `var(--rd-*)`.

---

## 2. Tipografía

- **Fuente**: `Inter` (igual que el frontend que la define en `tailwind.config.js` como `fontFamily.sans`).
- Se importa desde Google Fonts en `global.scss`:
  ```scss
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  ```

---

## 3. Diseño de Componentes

### Cards (`.rd-card`)
Replicado del patrón `rounded-2xl shadow-sm border border-border` del frontend:
```scss
border-radius: 16px;
border: 1px solid var(--rd-border);
box-shadow: 0 1px 4px rgba(0,0,0,.06);
```

### Badges de estado (`.rd-badge`)
Basados en los colores implícitos del frontend:
```scss
&.pending   { background: #fef3c7; color: #92400e; }
&.accepted  { background: var(--rd-secondary-light); color: #386018; }
&.rejected  { background: #fee2e2; color: #991b1b; }
&.completed { background: #dbeafe; color: #1e40af; }
```

### Botón primario (`.rd-btn-primary`)
Equivalente a `bg-primary text-primary-foreground hover:bg-primary/90`:
```scss
--background: var(--rd-primary);
--color: #fdfaf7;
--border-radius: 10px;
font-weight: 600;
```

---

## 4. Flujo de Autenticación

Portado desde `src/features/auth/` del frontend:

| Frontend (React)                        | Ionic (Angular)                              |
|-----------------------------------------|----------------------------------------------|
| `useAuth.tsx` + Context API             | `AuthService` con `BehaviorSubject`          |
| `localStorage.getItem('auth_token')`    | `IonicStorage.get('auth_token')`             |
| `jwtDecode()` para validar expiración   | `atob(token.split('.')[1])` manual           |
| Axios interceptor (`auth_unauthorized`) | `AuthInterceptor` + `HTTP_INTERCEPTORS`      |
| `localStorage.removeItem('auth_token')` | `IonicStorage.remove('auth_token')`          |

### DTOs usados (de `auth.ts` frontend)
```typescript
// Portados directamente
LoginRequestDTO  → { email, password }
RegisterUserDTO  → { name, email, password, role: 'DONANTE' | 'RECEPTOR' | 'ONG' }
TokenDTO         → { access_token, token_type }
UserResponseDTO  → { id, name, email, role, is_active, created_at }
```

---

## 5. Páginas implementadas

### Login Page
- Lógica: igual que `LoginPage.tsx` del frontend
- Validaciones: email requerido + válido, contraseña requerida
- Estados: loading (spinner), error (banner rojo)
- Extra Ionic: `ion-input` con botón de mostrar/ocultar contraseña

### Register Page
- Lógica: igual que `RegisterPage.tsx` del frontend
- Campos: nombre, email, rol (`ion-select` con action-sheet), contraseña
- Roles disponibles: `RECEPTOR`, `DONANTE`, `ONG` (idénticos al frontend)

### Landing (Dashboard Ionic)
Equivalente a la landing del frontend pero adaptado a móvil:
- Estadísticas (total, pendientes, completadas) ← comparable a `+1,200 kg / 15 ONGs / 340 Familias`
- Saludo personalizado con rol del usuario
- Acciones rápidas (ver donaciones, nueva donación, solicitudes)

### Donations List
- Busqueda en tiempo real (debounce 300ms)
- Filtros por estado (chips horizontales)
- Pull-to-refresh con `ion-refresher`

### Donation Detail
- Vista de detalles con iconos en tarjetas
- Receptor: botón para solicitar (abre `AlertController` con textarea)
- Donante: gestión de solicitudes recibidas (aceptar/rechazar) + marcar completada + eliminar

### Create Donation (nueva)
- Formulario completo: título, descripción, cantidad + unidad, fecha caducidad
- Fecha mínima = hoy

### My Requests (nueva)
- Lista de solicitudes enviadas por el usuario
- Barra de progreso visual de 3 pasos: Enviada → Revisada → Recibida

---

## 6. Servicios

| Servicio            | Endpoint base                     | Métodos                                                               |
|---------------------|-----------------------------------|-----------------------------------------------------------------------|
| `AuthService`       | `/auth/login`, `/auth/register`   | `login()`, `register()`, `fetchMe()`, `logout()`                     |
| `DonationsService`  | `/donations`                      | `getAll()`, `getById()`, `getMyDonations()`, `create()`, `updateStatus()`, `delete()` |
| `RequestsService`   | `/requests`                       | `getAll()`, `getById()`, `getMyRequests()`, `create()`, `updateStatus()` |

La URL base `http://localhost:8005/api/v1` es idéntica a la del frontend (`http.ts`).

---

## 7. Guards y Seguridad

- **`AuthGuard`**: protege rutas privadas (dashboard, donations-list, donation-detail, create-donation, my-requests)
- **`AuthInterceptor`**: adjunta `Authorization: Bearer <token>` a cada petición HTTP automáticamente, y maneja 401 redirigiendo al login
- Configurado con `APP_INITIALIZER` para restaurar la sesión al iniciar la app

---

## 8. Módulos Angular usados

```
AppModule:
  - BrowserModule, CommonModule
  - HttpClientModule + AuthInterceptor (HTTP_INTERCEPTORS)
  - IonicModule.forRoot({ mode: 'md' })  ← Material Design forzado
  - IonicStorageModule.forRoot()          ← Reemplaza localStorage
  - ReactiveFormsModule
  - APP_INITIALIZER → AuthService.init()
```

---

## 9. Estructura de archivos creados/modificados

```
src/
├── theme/variables.scss          ← Paleta completa (portada del frontend)
├── global.scss                   ← Fuente Inter + utilidades CSS reutilizables
├── environments/environment.ts   ← apiUrl: 'http://localhost:8005/api/v1'
└── app/
    ├── app.module.ts             ← HttpClient + Storage + Interceptor
    ├── app-routing.module.ts     ← Rutas con AuthGuard
    ├── app.component.ts/html/scss← Menú lateral con logo + usuario + logout
    ├── guards/auth.guard.ts      ← Protección de rutas privadas
    ├── interceptors/auth.interceptor.ts  ← JWT automático en requests
    ├── services/
    │   ├── auth.service.ts       ← Autenticación completa con Storage
    │   ├── donations.service.ts  ← CRUD donaciones
    │   └── requests.service.ts   ← CRUD solicitudes
    └── pages/
        ├── login/                ← Login con validación reactiva
        ├── register/             ← Registro con selector de rol
        ├── dashboard/            ← Stats + recientes + acciones
        ├── donations-list/       ← Búsqueda + filtros + lista
        ├── donation-detail/      ← Detalle + acciones por rol
        ├── create-donation/      ← Formulario de nueva donación
        └── my-requests/          ← Mis solicitudes + progress bar
```

---

## 10. Cómo ejecutar

```bash
cd food-donation-backend/RedDonacion-Ionic
npm install
npm start          # ng serve → http://localhost:4200
# o bien:
npx ionic serve    # con Ionic DevTools
```

> **Requisito**: El backend debe estar corriendo en `http://localhost:8005`.