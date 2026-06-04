Descripción detallada para la creación de un componente de gráfico de Scoring Crediticio en React

Esta descripción sirve como especificación técnica para crear un componente de interfaz de usuario dinámico en React que represente un gráfico de dona de scoring crediticio, basándose visualmente en el ejemplo de image_0.png pero utilizando datos lógicos corregidos y consistentes para su funcionamiento. El componente debe ser capaz de recibir un valor numérico (un "score") y colocar un indicador visual en el segmento correcto.

1. Estructura General del Componente:

Título Principal (Encabezado): Texto centrado en la parte superior: "SCORING CREDITICIO GLOBAL" en una fuente sans-serif clara y en mayúsculas (similar a Arial o Roboto).

Tipo de Gráfico: Un gráfico de anillo o dona (donut chart) circular, con un centro hueco.

Fondo: Un fondo blanco limpio y uniforme.

Diseño: Estilo de diseño de interfaz de usuario plano y limpio, con un ligero degradado suave en los segmentos de color para dar profundidad.

2. Segmentación del Gráfico y Lógica de Datos:

El gráfico de dona está dividido en 5 sectores o rangos, progresando en el sentido de las agujas del reloj desde la parte superior-izquierda. A continuación, se detallan los rangos corregidos y lógicos para el código (estos son los rangos de datos, no el texto desordenado de la imagen):

Sector 1 (Púrpura): Representa "Bajo". Rango de datos: e.g., 0-300.

Sector 2 (Rojo): Representa "Regular" (nivel inferior). Rango de datos: e.g., 301-500.

Sector 3 (Naranja): Representa "Regular" (nivel superior). Rango de datos: e.g., 501-650.

Sector 4 (Verde Lima): Representa "Bueno". Rango de datos: e.g., 651-750.

Sector 5 (Verde Oscuro): Representa "Excelente". Rango de datos: e.g., 751-850.

Nota: Estos rangos numéricos específicos son ejemplos lógicos para que el programador tenga una base, ya que los textos de la imagen son inconsistentes.

3. Elementos Visuales Dinámicos (El Indicador):

El componente debe manejar dinámicamente un valor de entrada (score).

Aguja Indicadora: Una aguja en forma de triángulo rojo sólido, con la base en el centro de la dona y la punta hacia afuera, que gira para apuntar al segmento correspondiente al score actual.

Cuadro de Valor (Floating Data Box): A la derecha del gráfico, debe haber un cuadro rectangular verde rectangular con esquinas redondeadas. Dentro, hay texto blanco: "[SCORE] - [ESTADO]" (e.g., "820 - MUY ALTO"). La aguja debe apuntar exactamente a este cuadro y al sector verde oscuro.

4. Etiquetas Estáticas (UI Labels):

Hay etiquetas estáticas con líneas de conexión finas que señalan cada segmento. Estas etiquetas deben ser limpias y legibles:

Arriba-Izquierda (señalando Púrpura): Texto de dos líneas: "Bajo" (primera línea), "[corrected low range]" (segunda línea).

Izquierda (señalando Rojo): Texto de dos líneas: "Regular" (primera línea), "[corrected lower-mid range]" (segunda línea).

Abajo-Izquierda (señalando Naranja): Texto de dos líneas: "Regular" (primera línea), "[corrected mid range]" (segunda línea).

Abajo-Derecha (señalando Verde Lima): Texto de dos líneas: "Bueno" (primera línea), "[corrected good range]" (segunda línea).

Arriba-Derecha (señalando Verde Oscuro): Texto de dos líneas: "Excelente" (primera línea), "[corrected excellent range]" (segunda línea).

5. Lógica del Componente React (Pseudocódigo de flujo):

Propiedades (Props): El componente ScoringChart debe recibir una prop, e.g., score={currentScoreValue}.

Estado (State - Opcional): El estado interno podría manejar la animación de la aguja al cambiar el score.

Cálculo de Rotación: Basado en el score de entrada, una función debe calcular el ángulo de rotación de la aguja y la posición del cuadro de valor, mapeando el score al rango de grados (0-360) que representa el sector correcto.

Renderizado: El componente debe renderizar los elementos SVG o Canvas para el gráfico de dona, las etiquetas estáticas y el indicador dinámico en la posición correcta.