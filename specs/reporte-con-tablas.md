# Informe de Test de Usabilidad y Evaluación de Prototipos

## 1. Descripción del proyecto
**Food Donation Network** es una plataforma solidaria diseñada para conectar a donantes de alimentos (como restaurantes, supermercados y particulares) con receptores individuales y ONGs (como Bancos de Alimentos). Su objetivo principal es reducir drásticamente el desperdicio alimentario, facilitando una logística rápida, segura y accesible para que los excedentes lleguen de forma eficiente a quienes más lo necesitan.

## 2. Prototipos: Comparativa y Justificación Heurística
En esta sección se comparan los dos prototipos desarrollados (Prototipo A y Prototipo B) por los subgrupos.

* **Principales Semejanzas:** Ambos prototipos comparten la filosofía "Mobile First", focalizándose en priorizar la experiencia móvil ya que es la herramienta que un potencial donante usaría desde cualquier lugar. Además, las tipografías limpias y los colores corporativos solidarios (verdes y blancos) se mantienen con el objetivo de fomentar la confianza (Prevención de Errores - Heurística 5).
* **Principales Diferencias:** El Prototipo B simplifica abismalmente el flujo de visualización de datos, limitando los inputs obligatorios en una tarjeta visual rápida. El Prototipo A, en cambio, utiliza ventanas emergentes (`modals`) con descripciones largas. Esto afecta directamente a la heurística de "Estética y diseño minimalista".
* **Justificación basada en Heurísticas de Nielsen:**
  * *Prototipo A:* Cumple con mantener a los usuarios en un espacio conocido (Similitud del sistema con el mundo real - Heurística 2) añadiendo mucha información a los modals. Falla fuertemente en "Prevención de Errores", porque el Exceso de inputs en una primera toma abrumaba al usuario.
  * *Prototipo B:* Cumple excepcionalmente bien con "Control y libertad del usuario" (Heurística 3) proporcionando retrocesos inmediatos y botones grandes de cancelación. También respeta el "Reconocimiento antes que recuerdo" mediante jerarquía de tarjetas (Heurística 6).

## 3. Características del test de usuario
* **Tipo de test:** No moderado (Automático, para escalar a más usuarios de forma simultánea).
* **Entorno:** Remoto (Test realizado de forma online desde el ordenador o teléfono propio de los participantes).
* **Plataforma utilizada:** Loop11 u otra plataforma automatizada.

## 4. Persona elegida para hacer el test
* **Perfil/Arquetipo (Persona):** Donantes frecuentes u ONGs (Ej. Dueño de pequeño restaurante local con exceso de inventario diario / Voluntario joven).
* **Características demográficas y tecnológicas:** Edad entre 24 y 55 años, habituados a usar el teléfono móvil, frecuentemente corto de tiempo e interesado en la usabilidad "clic e ir" en vez del flujo denso habitual.

## 5. Resultados de Rendimiento: Tiempo de ejecución
* **Tarea con más divergencia de tiempo:** "Nueva Solicitud". Aunque ambos logran crear la petición, el desgaste por el tiempo que emplean marca distancias.
* **Escenario descrito al usuario:** "Eres miembro de una ONG. Tras iniciar sesión, necesitas registrar una urgencia en la plataforma para recibir una donación de Alimentos lo antes posible."
* **Comparativa:**
  * **Tiempo medio por tarea:** Prototipo A: 74.07s | Prototipo B: 83.29s
  * **Número mínimo de pasos:** Prototipo A: 3 | Prototipo B: 3
  * **Número medio de pasos:** Prototipo A: 5.21 | Prototipo B: 4.64
  * **% de Compleción:** Prototipo A: 78.57% | Prototipo B: 78.57%
* **Análisis y Explicación:** Pese a que el tiempo fue ligeramente mayor en el Prototipo B, el número medio de pasos fue **menor que en el Prototipo A.** Se detecta que el Prototipo A lograba finalizar rápido porque la interfaz era más agresiva visualmente obligando a clicar de inmediato (aunque sin mucha atención resultaba en abandonos en otros perfiles), mientras que en el B los usuarios dedicaban casi 10 segundos extra a revisar con calma el resumen con mejor visibilidad antes de hacer click ("Reconocimiento"); esto favoreció sustancialmente su percepción (UMUX).

## 6. Resultados de Rendimiento: Género
* **Tarea con mayor divergencia entre géneros:** "Nueva Solicitud" (Revisión Demográfica).
* **Escenario y factores críticos (ROI):** Crear solicitud ágil reduce de forma crítica el desperdicio. ROI clave: Eficiencia frente al abandono (Costo de Oportunidad de 1 menú).
* **Comparativa (Hombres vs. Mujeres):**
  * **Tiempo medio por tarea:** Hombres (A: 80.43s / B: 88.71s) | Mujeres (A: 67.71s / B: 77.86s)
  * **Número mínimo de pasos:** 3
  * **Número medio de pasos:** Hombres (A: 5.29 / B: 5.29) | Mujeres (A: 5.14 / B: 4)
  * **% de Compleción:** Hombres (A: 57.14% / B: 57.14%) | Mujeres (A: 100% / B: 100%)
* **Explicación de la brecha:** Existe un patrón crítico: el grupo masculino tiene un abandono y ratio de fallo masivo comparado con el femenino (57% de éxito frente a 100%). Esto puede deberse a que el sector masculino del test trataba de resolver el flujo saltando validaciones de formulario. Como el Prototipo A no tenía una visibilidad reactiva de los estados ("Prevención de Errores"), se encontraban bloqueados con tiempos altos y decidían abandonar. Las usuarias leyeron la indicación completa y en ambos prototipos lograron el éxito en mucho menos tiempo, destacando en el **Prototipo B con solo 4 pasos de media**.

## 7. Medidas Globales: UMUX, NPS
* **UMUX:** Prototipo A (72.07) vs Prototipo B (85.29)
* **NPS:** Prototipo A (7.36) vs Prototipo B (40.57)
* **Conclusión:** El Prototipo B obtuvo resultados dramáticamente superiores. Aunque puede demorar una media de 9 segundos extra en completarse una tarea de solicitud, esta fricción es positiva puesto que ofrece muchísima más claridad al usuario, reduciendo el "Lostness" de forma que perciben el sistema como útil (ganando 13 puntos extra de UMUX y 33 de NPS). Promotores fuertemente vinculados al flujo calmado y simplificado en pasos del modelo B.

## 8. Análisis comparativo (Script en Python)

A continuación, la tabla generada desde nuestro script `analisis_test.py` con el motor en Python para analizar los resultados agregados y limpiados del test A/B:

### RENDIMIENTO GENERAL T1 (Nueva Solicitud)
| Prototipo | Tiempo Medio (Seg) | Pasos Mín | Pasos Medios | Compleción (%) | UMUX Medio | NPS Medio |
| :-------: | :----------------: | :-------: | :----------: | :------------: | :--------: | :-------: |
| **A** | 74.07 | 3 | 5.21 | 78.57% | 72.07 | 7.36 |
| **B** | 83.29 | 3 | 4.64 | 78.57% | 85.29 | 40.57 |

**Otros resultados destacables (Insights):**
* Existe una falsa correlación entre velocidad y experiencia: Ser más rápido (Prot. A) no resultó en mejores métricas cualitativas; el Prototipo B es marginalmente más "lento" (12% más de tiempo) pero logró una reducción clave del -11% en el número de pasos promedio, indicando que avanzan seguros.
* La tarea de "Aceptar Solicitud (T2)" mostraba también caídas en picado (Fails) cuando se trataba de usuarios móviles Android en el Prototipo A, indicando targets táctiles demasiado pequeños.

## 9. Problemas detectados y Solución final
| Problema Detectado | Prototipo Origen | Gravedad (1-4) | Frecuencia | Heurística Violada | Solución aplicada en el Prototipo Final |
| :--- | :---: | :---: | :---: | :--- | :--- |
| Exceso de campos visibles sin segmentación (bloqueo masculino) | A | Crítica (4) | 42% | Estética y Minimalismo | Migrar del modelo de Popups pesados a un sistema progresivo de un par de campos (Modelo B). |
| Falta de certeza si la solicitud se envió o no | A y B | Alta (3) | 30% | Visibilidad Estado | Se implementará un Snackbar / Toast que confirme "Solicitud creada con éxito" junto un cambio de pestaña automático. |
| Inconsistencia botones atrás | A | Media (2) | 15% | Control y Libertad | Se adoptan las cabeceras estándar con iconos 'flecha atrás' claros en vez de usar la navegación nativa. |

## 10. Reflexiones y Lecciones aprendidas
* **La agilidad no significa usabilidad superior.** Comprobamos matemáticamente mediante NPS y número de pasos que, aunque el Prototipo B hace "frenar" a los usuarios para confirmar datos o leer con mayor espacio los campos, resultan muchísimos más proactivos y contentos que lidiando con clics ansiosos del modelo A.
* **Sesgo tecnológico y de género:** Confirmar que una interfaz agresiva causa un ratio alto de frustración o "abandono prematuro" si las validaciones no son evidentes (los hombres fallaron ostensiblemente frente a las mujeres prestando menos atención a los errores ocultos). Implementaremos prevención estricta de errores con validación en línea de formularios o Zod en el frontend.
* El análisis de datos apoyado en **análisis algorítmico mediante scripts Python** nos ha facilitado unificar las fuentes y darnos una vista imparcial muy lejana de nuestra propia presunción como creadores. La voz soberana siempre la tiene la métrica final de los usuarios y su _Lostness_.
