---
trigger: always_on
---

# Backend Security & Compliance Checklist
## Stack: FastAPI · Python · SQLAlchemy · PostgreSQL · Hexagonal Architecture

---

## 1. Autenticación (OWASP ASVS V2, API2)
- [ ] Autenticación centralizada (OAuth2 / OpenID Connect)
- [ ] Tokens JWT firmados con algoritmo asimétrico (RS256 / ES256)
- [ ] Access tokens con expiración corta
- [ ] Refresh tokens rotatorios y revocables
- [ ] MFA para cuentas administrativas
- [ ] Protección contra fuerza bruta (rate limiting + lockout)
- [ ] Errores de login genéricos (no enumeración de usuarios)

---

## 2. Autorización y control de acceso (OWASP ASVS V4, API1, API3)
- [ ] Autorización por **objeto** en todos los endpoints (BOLA)
- [ ] Verificación de ownership en recursos (`user_id`, `community_id`, etc.)
- [ ] Roles y permisos verificados **server-side**
- [ ] Matriz de permisos documentada
- [ ] Prohibido confiar en controles del frontend
- [ ] Denegación explícita (403) ante accesos indebidos

---

## 3. Validación de entrada y prevención de inyecciones (ASVS V5, API8)
- [ ] Validación estricta con Pydantic (tipos, rangos, formatos)
- [ ] Rechazo de campos no esperados (`extra=forbid`)
- [ ] Prevención de Mass Assignment (DTOs de input separados)
- [ ] Uso exclusivo de ORM o consultas parametrizadas
- [ ] Validación adicional en capa de dominio (reglas de negocio)

---

## 4. Exposición de datos y serialización (API3 – Excessive Data Exposure)
- [ ] DTOs de salida explícitos (no serialización automática)
- [ ] Exclusión de campos sensibles en respuestas
- [ ] Nunca exponer hashes, tokens, flags internos
- [ ] Control de paginación y filtros para evitar scraping

---

## 5. Criptografía y gestión de secretos (ASVS V7, ISO 27001)
- [ ] TLS 1.2+ obligatorio en todo el tráfico
- [ ] HSTS habilitado
- [ ] Contraseñas con Argon2 o bcrypt
- [ ] Secretos fuera del código (env vars / secret manager)
- [ ] Rotación periódica de claves y secretos

---

## 6. Base de datos y persistencia (ISO 27001, ASVS)
- [ ] Usuario de BD con privilegios mínimos
- [ ] Sin acceso de superusuario en runtime
- [ ] Row-Level Security si hay multi-tenant
- [ ] Backups cifrados y protegidos
- [ ] Conexiones a BD cifradas (TLS)

---

## 7. Manejo de errores y logging (ASVS V10, GDPR)
- [ ] `debug=False` en producción
- [ ] Manejo global de excepciones
- [ ] Mensajes de error genéricos al cliente
- [ ] Logs sin datos personales ni secretos
- [ ] Correlation ID por request
- [ ] Política de retención de logs definida

---

## 8. Rate limiting y protección DoS (ASVS V13, API4)
- [ ] Rate limiting global por IP / token
- [ ] Límites estrictos en login y endpoints sensibles
- [ ] Límites de tamaño de payload
- [ ] Timeouts configurados

---

## 9. Seguridad de despliegue y CI/CD (ISO 27001, CIS)
- [ ] Análisis SAST (Bandit)
- [ ] Escaneo de dependencias (pip-audit / safety)
- [ ] Separación dev / staging / prod
- [ ] Infraestructura como código
- [ ] Secrets scanning en CI

---

## 10. GDPR y privacidad (GDPR, ISO 27701)
- [ ] Minimización de datos personales
- [ ] Finalidad y base legal documentadas
- [ ] Derechos ARCO implementados
- [ ] Pseudonimización cuando sea posible
- [ ] Registro de accesos a datos personales
- [ ] Procedimiento de notificación de brechas (<72h)
