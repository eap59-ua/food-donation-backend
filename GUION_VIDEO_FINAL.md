# Guion del vídeo — Defensa Test de Usabilidad · GCS-08
### Adaptado a la presentación `GCS08_Evaluacion_Heuristica.pptx` (14 diapositivas)

**Duración objetivo:** ≤ 10 min · **App:** Red de Donación de Alimentos · **Prototipos web A (morado-violeta) y B (terracota-oliva)**

> Cada persona graba su tramo. Tiempos orientativos para no pasar de 10 min.

---

## Luis — Slides 1-2 · Portada + Descripción (≈1:10)

**Slide 1 (portada):**
"Hola, somos el grupo GCS-08 y presentamos el informe de evaluación heurística y test de usuario de **Red de Donación de Alimentos**. El estudio se hizo con **28 participantes**, **2 prototipos**, **5 tareas**, en modalidad **no moderada** con la herramienta **Loop11**."

**Slide 2 (descripción):**
"RedDonación es una plataforma web que conecta donantes de alimentos —restaurantes, supermercados y particulares— con receptores y ONGs, para reducir el desperdicio. El **backend** es una API REST en FastAPI con autenticación JWT, y el **frontend** está en React + TypeScript con Tailwind. Dos subgrupos desarrollaron de forma independiente los prototipos **A y B**, consumiendo la misma API y cubriendo las mismas funcionalidades. Hay cuatro roles —donante, receptor, ONG y admin— y los estados de donación y solicitud que veis en pantalla."

## Jastin — Slides 3-4 · Prototipos + Heurísticas (≈1:30)

**Slide 3 (semejanzas y diferencias):**
"Ambos prototipos comparten la marca, la landing con estadísticas de impacto y el flujo completo de registro, catálogo, donaciones y solicitudes. Las diferencias clave: **A** usa una paleta morado-violeta, minimalista, con formulario de donación de 5 campos; **B** usa terracota-oliva, mayor densidad de información, formulario de 8 campos con selector de unidad, y botones Aprobar/Rechazar en la propia tarjeta. Detectamos además un **bug en B**: 'Invalid Date' en las fechas de donación."

**Slide 4 (heurísticas Nielsen):**
"Justificamos el diseño con las heurísticas de Nielsen. En **H1 visibilidad del estado**, A gana con sus chips de color, mientras el bug de fecha de B oculta un dato crítico. En **H2 coherencia**, B mezcla filtros en inglés con interfaz en castellano. En **H5 prevención de errores**, B acierta con el selector kg/unidades frente al campo de texto libre de A. Y en **H6 reconocimiento**, las tarjetas con datos visibles de B reducen navegación."

## Adrián — Slides 5-6 · Test + Personas (≈1:20)

**Slide 5 (características del test):**
"El test fue **no moderado y remoto**, con Loop11, sobre **28 participantes**, 14 por prototipo, con equilibrio de género (7 mujeres y 7 hombres por prototipo) y edades de 18 a 54. Cada uno hizo las 5 tareas en orden fijo: nueva solicitud, aceptar, ver, rechazar y compartir donación. Loop11 nos registró tiempo, páginas visitadas, éxito o abandono, índice de lostness, expectativa/experiencia, UMUX y NPS."

**Slide 6 (personas):**
"Definimos dos personas. **Laura Martínez**, 32 años, responsable de logística en un supermercado, perfil donante en escritorio: quiere donar excedentes antes de que caduquen. Y **Carla Romero**, 41 años, coordinadora en un banco de alimentos, perfil receptor/ONG en móvil: quiere ver donaciones cercanas y solicitarlas sin llamadas."

## Esteban — Slides 7-8 · Rendimiento T2 + Exp/Exp (≈1:30)

**Slide 7 (T2 — Aceptar solicitud, mayor divergencia de tiempo):**
"La tarea con más divergencia de tiempo fue la **T2, aceptar una solicitud**. Escenario: una ONG recibe una notificación, localiza la solicitud pendiente y la aprueba. **A tardó 66 segundos frente a los 91 de B**, un 38% más, con mejor éxito (92,9% vs 78,6%) y mejor experiencia (+0,71 vs −0,07). La causa: en A los chips de color permiten identificar la solicitud pendiente de un vistazo; en B hay que leer cada tarjeta, lo que sube el lostness a 0,44 y genera más abandonos."

**Slide 8 (expectativa/experiencia y tiempo global):**
"Estos gráficos confirman la percepción subjetiva en T2 y T5: A supera la expectativa del usuario y B se queda en neutro o por debajo. Y en el tiempo medio por tarea se ve el patrón global: **A es más rápido en T2 y T5**, y B solo gana ligeramente en T4."

## Ángel — Slide 9 · Rendimiento por género (T1 en B) (≈1:15)

"Por género, la mayor divergencia apareció en la **T1, crear una nueva solicitud, en el Prototipo B**, con una **brecha de éxito de 43 puntos: las mujeres completaron el 57% frente al 100% de los hombres**. Los tiempos fueron parecidos (90,7 s mujeres vs 93 s hombres), pero ellas navegaron más páginas (5,3 vs 4,0). La causa probable: el botón 'Compartir' junto a 'Donaciones disponibles' se interpreta como publicar un excedente propio en vez de solicitar —viola las heurísticas H2 y H3—. Las mujeres buscaban la acción 'Solicitar' agrupada en la sección de Solicitudes, donde no estaba."

## Héctor — Slide 10 · UMUX y NPS (≈1:15)

"En las medidas globales, el **UMUX casi empata: A 69 y B 68,2**, ambos en zona aceptable; la diferencia está en la facilidad de uso (UMUX2), donde A puntúa mejor. En cambio el **NPS es muy distinto: A obtiene 0 y B un +43**. ¿Por qué, si la usabilidad es casi igual? Porque el NPS mide intención de recomendar, influida por el diseño emocional: la paleta cálida de B, las estadísticas de impacto social y el lenguaje empático generan más vínculo. En plataformas de impacto social, la experiencia emocional pesa tanto como la eficiencia."

## Iván — Slides 11-12 · Tabla resumen + Problemas (≈1:30)

**Slide 11 (tabla resumen):**
"Esta tabla resume la comparativa. **A gana en** tiempo global (74,4 vs 83,5 s), éxito medio (81,4% vs 78,6%), experiencia total, menor brecha de género y consistencia de idioma. **B gana en** NPS (+43 vs 0), menor lostness global y en la tarea T3, donde sube al 85,7% frente al 64,3% de A gracias a las tarjetas con datos visibles. A destacar: el bug 'Invalid Date' de B debe ser la primera corrección."

**Slide 12 (problemas y soluciones):**
"Aquí están los problemas detectados con su gravedad y solución propuesta: el 'Invalid Date' de B (alta, se arregla formateando la fecha con fallback), el botón 'Compartir' confuso (alta, renombrar a 'Publicar donación' con tooltip), las tarjetas sin chip de estado en A (alta, mostrar el chip), los filtros en inglés de B, y la falta de confirmación al aprobar/rechazar."

## Erardo (tú) — Slides 13-14 · Reflexiones + Conclusión (≈1:30)

**Slide 13 (reflexiones / lecciones aprendidas):**
"Como lecciones aprendidas: primero, **NPS no es lo mismo que usabilidad** —UMUX casi idénticos pero NPS de 0 frente a +43—; ambas dimensiones son necesarias. Segundo, **riqueza visual no es facilidad de tarea**: cada elemento debe servir a la acción del usuario. Tercero, **los bugs de producción contaminan los datos**: hay que hacer un smoke test antes de distribuir el prototipo. Y cuarto, los **tests no moderados son potentes para medir pero limitados para diagnosticar**: recomendamos combinarlos con unas pocas sesiones moderadas con think-aloud."

**Slide 14 (conclusión):**
"En conclusión, **ningún prototipo es superior en todo**. A es más eficiente, con mejor experiencia global, menor brecha de género y sin bugs críticos. B tiene mejor NPS, menor lostness y mayor conexión emocional. Por eso la **solución óptima es un híbrido**: tomar la estructura de navegación y la claridad de etiquetas de A, combinarlas con la identidad visual y los formularios estructurados de B, y corregir el bug de fechas, unificar el idioma de los filtros y añadir el selector de unidades. Eso es lo que llevamos al prototipo nativo en Ionic. Gracias."

---

### Checklist antes de grabar
- [ ] Cada uno con sus diapositivas abiertas y cronometrado (≈40-60 s por slide).
- [ ] Total por debajo de 10 min.
- [ ] Subir el vídeo a la nube y pegar el enlace público en Moodle (cierra martes 16, 9:00).
