# RedDonación - Front Ionic Angular

Frontend de prototipado en **Ionic + Angular** para la API FastAPI del proyecto GCS-08 de donación de alimentos.

El diseño replica el estilo del front de referencia: fondo cálido con degradados beige/verde, marca RedDonación, tarjetas redondeadas, botones naranja, pantallas de login/registro, dashboard, donaciones, solicitudes y perfil.

## Requisitos

- Node.js 20 o superior recomendado.
- Backend FastAPI levantado en `http://localhost:8000`.

## Arranque rápido

```bash
npm install
npm start
```

Abre el navegador en:

```text
http://localhost:8100
```

## Configuración del backend

La URL base de la API está en:

```text
src/environments/environment.ts
```

Por defecto:

```ts
apiBaseUrl: 'http://localhost:8000/api/v1'
```

Si tu backend está en otra IP o puerto, cambia ese valor.

## Endpoints usados

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `GET /api/v1/donations`
- `GET /api/v1/donations/{id}`
- `POST /api/v1/donations`
- `PATCH /api/v1/donations/{id}/status`
- `POST /api/v1/requests`
- `GET /api/v1/requests/me`
- `PATCH /api/v1/requests/{id}/status`

## Páginas incluidas

- `/` página pública de inicio.
- `/login` acceso.
- `/register` registro.
- `/dashboard` panel principal.
- `/donations` listado y búsqueda por ubicación.
- `/donations/new` creación de donación.
- `/donations/:id` detalle de donación.
- `/requests` solicitudes realizadas o recibidas.
- `/requests/new/:donationId` crear solicitud.
- `/requests/:id` detalle de solicitud.
- `/profile` perfil de usuario.

## Nota sobre modo prototipo

En `environment.ts` está activado `useMockOnApiError: true`. Esto permite que las pantallas de listado sigan viéndose con datos de ejemplo si el backend no está levantado, pero las acciones reales de crear donación, registrarse, iniciar sesión o solicitar ayuda sí intentan usar la API real.

Para forzar que todo dependa del backend real, cambia:

```ts
useMockOnApiError: false
```

## Backend recomendado

Desde el ZIP del backend, puedes levantarlo con Docker desde la raíz del backend:

```bash
docker compose up --build
```

API:

```text
http://localhost:8000
```

Swagger:

```text
http://localhost:8000/docs
```
