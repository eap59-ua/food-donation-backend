---
trigger: always_on
---

# Frontend Security & Compliance Checklist
## Stack: React/Vue · TypeScript · Vite · SPA

---

## 1. Protección contra XSS (OWASP ASVS, Top 10)
- [ ] No uso de `dangerouslySetInnerHTML` (React) o `v-html` (Vue) sin sanitizar
- [ ] Sanitización con DOMPurify si se renderiza HTML
- [ ] No uso de `eval` ni funciones dinámicas
- [ ] Renderizado de datos externos solo como texto
- [ ] Misión de seguridad: Strict Mode habilitado

---

## 2. Gestión segura de autenticación
- [ ] Tokens almacenados en cookies HttpOnly + Secure
- [ ] `SameSite` configurado correctamente
- [ ] CSRF token si se usan cookies
- [ ] Limpieza completa de sesión en logout
- [ ] Manejo correcto de expiración de sesión

---

## 3. Autorización en la UI (defensiva, no de seguridad)
- [ ] Ocultar acciones no permitidas según rol
- [ ] No confiar en controles del cliente
- [ ] Estado global mínimo (roles, flags)
- [ ] No almacenar objetos completos de usuario

---

## 4. Validación de formularios y entrada
- [ ] Validación en cliente (Zod / Yup / HTML5)
- [ ] Límites de longitud y formato
- [ ] Sanitización de texto libre
- [ ] Control de uploads (tipo, tamaño)

---

## 5. Gestión de secretos y build
- [ ] Ningún secreto en variables `VITE_*`
- [ ] API keys públicas con restricciones
- [ ] Source maps deshabilitados o protegidos en producción
- [ ] Sin datos de prueba o debug en el bundle

---

## 6. Dependencias y cadena de suministro
- [ ] Dependencias actualizadas
- [ ] `npm audit` / Dependabot activo
- [ ] Revisión de librerías externas
- [ ] Evitar paquetes no mantenidos

---

## 7. CSP y cabeceras de seguridad (coordinado con backend)
- [ ] Content-Security-Policy restrictiva
- [ ] `frame-ancestors 'none'`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `Strict-Transport-Security`

---

## 8. Almacenamiento en navegador
- [ ] No guardar datos sensibles en LocalStorage
- [ ] Uso cuidadoso de Service Workers
- [ ] `Cache-Control: no-store` para datos sensibles
- [ ] Limpieza de caches al cerrar sesión

---

## 9. UX y comunicación de seguridad
- [ ] Mensajes claros de sesión expirada
- [ ] Confirmaciones en acciones críticas
- [ ] Reglas de contraseña visibles
- [ ] Errores comprensibles sin detalles técnicos

---

## 10. Cumplimiento GDPR (lado cliente)
- [ ] Consentimiento explícito cuando aplique
- [ ] Información clara sobre uso de datos
- [ ] No exposición innecesaria de datos personales
- [ ] Coordinación con backend para derechos ARCO
