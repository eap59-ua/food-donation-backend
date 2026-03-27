# Plan TEST-BUG-001: Pydantic email-validator Error

**Identificador**: TEST-BUG-001
**Problema**: La suite de pruebas backend falla de forma crítica al importar el módulo `pydantic` porque falta el paquete `email-validator` (requisito de Pydantic v2 para tipos `EmailStr`).

## Tarea 1: Reproducción (Red)
El error ya ha sido demostrado y documentado en tu consola, afectando a la carga de todos los archivos de testing que tocan las entidades: `test_api.py`, `test_news_api.py`, `test_main.py`.

## Tarea 2: Implementación de Fix (Green)
Añadiremos el "extra" `email` a la dependencia de `pydantic` en `backend/pyproject.toml` usando Poetry, de forma que se instale `email-validator` con las dependencias globales. Alternativamente podemos añadir `email-validator` explícitamente.

#### [MODIFY] pyproject.toml
```toml
- pydantic = "^2.6.0"
+ pydantic = {extras = ["email"], version = "^2.6.0"}
```

## Tarea 3: Evitar Regresiones (Regression Guard)
Una vez aplicado el cambio a las dependencias, reconstruiremos el contenedor de Docker para cargar los nuevos paquetes de Poetry y verificaremos que los tests pasen (o al menos que el punto de fallo sea el test corriendo, no la fase de recolección/importación).

## Tarea 4: Sincronización de Logs y Estado (Docs)
Marcaremos el ticket `TEST-BUG-001` como finalizado (`[x]`) en el archivo `tickets.md` y registraremos los cambios en nuestro log de `progress.md`.
