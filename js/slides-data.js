"use strict";

const SLIDES = [
  {
    id: "inicio",
    section: "INICIO",
    title: "Datos bajo control.<br><em>PHP nativo.</em>",
    type: "cover",
    kicker: "PRESENTACIÓN TÉCNICA · PHP 8.x",
    subtitle:
      "Nueve funciones. Cuatro áreas clave. Una forma más rigurosa de construir aplicaciones.",
    tags: ["Arrays", "Persistencia", "Validación", "Seguridad"],
    note: "Una guía visual para comprender qué recibe cada función, qué devuelve y qué efecto produce.",
  },
  {
    id: "mapa",
    section: "INTRODUCCIÓN",
    title: "Nueve funciones.<br><em>Cuatro decisiones.</em>",
    type: "overview",
    lead: "Antes de elegir una función, identifica qué necesitas resolver: consultar una estructura, transformar datos, persistir información o proteger credenciales.",
    cards: [
      [
        "01",
        "ESTRUCTURAS Y ARRAYS",
        "array_keys() · array_key_exists() · array_column() · array_filter() · is_null()",
        "ph ph-brackets-curly",
        "cyan",
      ],
      [
        "02",
        "ARCHIVOS Y PERSISTENCIA",
        "file_put_contents()",
        "ph ph-hard-drives",
        "blue",
      ],
      ["03", "VALIDACIÓN", "filter_var()", "ph ph-shield-check", "amber"],
      [
        "04",
        "SEGURIDAD",
        "password_hash() · password_verify()",
        "ph ph-lock-key",
        "violet",
      ],
    ],
    note: "Contrato de lectura: parámetros → retorno → efectos → límites.",
  },
  {
    id: "contrato",
    section: "INTRODUCCIÓN",
    title: "Lee el contrato,<br><em>no solo la llamada.</em>",
    type: "principles",
    lead: "Una función nativa resuelve una operación concreta. El contexto de uso sigue siendo responsabilidad de quien desarrolla.",
    principles: [
      [
        "ENTRADA",
        "¿Qué tipo de dato recibe? ¿Qué parámetros son opcionales?",
        "ph ph-arrow-down",
      ],
      [
        "RETORNO",
        "¿Devuelve un array, un booleano, bytes o un hash?",
        "ph ph-arrow-bend-down-right",
      ],
      [
        "EFECTO",
        "¿Solo consulta, crea una estructura nueva o escribe en disco?",
        "ph ph-arrows-clockwise",
      ],
      [
        "CONTROL",
        "¿Qué debe validar o comprobar el programa alrededor?",
        "ph ph-shield-check",
      ],
    ],
    callout:
      "La API puede ser sencilla; el uso responsable depende de lo que validas, proteges y compruebas.",
  },
  {
    id: "array-keys",
    section: "01 · ARRAYS",
    title: "array_keys()<br><em>Descubrir la estructura.</em>",
    type: "function",
    badge: "INSPECCIÓN",
    icon: "ph ph-key",
    definition:
      "Devuelve un nuevo array con todas las claves del array de entrada, conservando su orden.",
    purpose: [
      "Inspeccionar la estructura de una respuesta o configuración.",
      "Conocer los campos recibidos sin modificar sus valores.",
      "Buscar claves asociadas a un valor mediante el segundo parámetro.",
    ],
    syntax:
      "array_keys(array $array, mixed $filter_value = null, bool $strict = false): array",
    params: [
      ["$array", "Array cuyas claves se desean obtener."],
      [
        "$filter_value",
        "Opcional. Si se indica, devuelve las claves cuyos valores coinciden.",
      ],
      ["$strict", "Opcional. Usa comparación estricta cuando es true."],
    ],
    returns:
      "Un array de claves de tipo int o string. Si no hay coincidencias con el filtro, devuelve [].",
    code: `<?php
$payload = [
    'email' => 'ana@ejemplo.com',
    'role'  => 'editor',
];

$fields = array_keys($payload);
$required = ['email', 'csrf_token'];
$missing = array_values(array_diff($required, $fields));

echo json_encode([
    'fields' => $fields,
    'missing' => $missing,
], JSON_PRETTY_PRINT);
?>`,
    output: `{
  "fields": ["email", "role"],
  "missing": ["csrf_token"]
}`,
    insight:
      "El array de claves permite comparar la forma del payload con los campos requeridos. array_keys() no comprueba por sí sola la validez de los valores.",
    caution:
      "Si la clave buscada no existe, array_keys() no lanza una excepción: devuelve un array vacío.",
  },
  {
    id: "array-keys-lab",
    section: "01 · ARRAYS",
    title: "De un payload a sus claves.",
    type: "sim-array-keys",
    lead: "Modifica el conjunto de campos y observa qué claves se obtienen. Es una simulación conceptual en JavaScript; no ejecuta PHP.",
  },
  {
    id: "array-key-exists",
    section: "01 · ARRAYS",
    title: "array_key_exists()<br><em>Comprobar presencia.</em>",
    type: "function",
    badge: "PRESENCIA",
    icon: "ph ph-check-circle",
    definition:
      "Comprueba si una clave o índice específico existe dentro de un array.",
    purpose: [
      "Verificar la presencia de un campo antes de utilizarlo.",
      "Revisar datos de usuarios, formularios o configuraciones.",
      "Distinguir una clave ausente de una clave presente cuyo valor sea null.",
    ],
    syntax: "array_key_exists(string|int $key, array $array): bool",
    params: [
      ["$key", "Clave o índice que se desea buscar."],
      ["$array", "Array en el que se realiza la búsqueda."],
    ],
    returns:
      "true si la clave está presente; false si no existe. Una clave con valor null también cuenta como existente.",
    code: `<?php
$usuario = [
    "nombre" => "Valeria",
    "edad" => 17,
    "correo" => "valeria@gmail.com"
];

if (array_key_exists("nombre", $usuario)) {
    echo "La clave nombre existe";
} else {
    echo "La clave nombre no existe";
}
?>`,
    output: "La clave nombre existe",
    insight:
      "La función responde si la clave existe; no evalúa si su valor es verdadero ni si es distinto de null.",
    caution:
      "No confundas presencia con contenido. Para comprobar específicamente null, utiliza is_null() sobre el valor.",
  },
  {
    id: "array-key-lab",
    section: "01 · ARRAYS",
    title: "Presente no significa lleno.",
    type: "sim-key-exists",
    lead: "El mismo array puede contener una clave ausente, una clave con null o una clave con valor. Comprueba la diferencia.",
  },
  {
    id: "array-column",
    section: "01 · ARRAYS",
    title: "array_column()<br><em>Extraer una columna.</em>",
    type: "function",
    badge: "EXTRACCIÓN",
    icon: "ph ph-columns",
    definition:
      "Devuelve los valores de una sola columna de un array multidimensional.",
    purpose: [
      "Obtener nombres, precios o correos de una lista de registros.",
      "Evitar recorrer y copiar manualmente cada valor.",
      "Usar una segunda columna como índice del array resultante.",
    ],
    syntax:
      "array_column(array $array, int|string|null $column_key, int|string|null $index_key = null): array",
    params: [
      ["$array", "Array multidimensional que contiene los registros."],
      ["$column_key", "Clave de la columna que se desea extraer."],
      [
        "$index_key",
        "Opcional. Clave cuyos valores se utilizarán como índices del resultado.",
      ],
    ],
    returns: "Un nuevo array con los valores de la columna solicitada.",
    code: `<?php
$usuarios = [
    ["id" => 1, "nombre" => "Ana"],
    ["id" => 2, "nombre" => "Luis"],
    ["id" => 3, "nombre" => "Marta"]
];

$nombres = array_column($usuarios, "nombre");
print_r($nombres);
?>`,
    output: `Array
(
    [0] => Ana
    [1] => Luis
    [2] => Marta
)`,
    insight:
      "Cada elemento del array principal representa un registro. array_column() toma de cada registro el valor de la clave indicada.",
    caution:
      "El tercer parámetro es opcional. Si se proporciona, los valores de esa columna pasan a ser las claves del array resultante.",
  },
  {
    id: "array-column-lab",
    section: "01 · ARRAYS",
    title: "De registros a una lista.",
    type: "sim-column",
    lead: "Selecciona qué columna extraer y observa el array resultante. La simulación conserva el concepto de extracción, no reproduce todos los casos límite de PHP.",
  },
  {
    id: "array-filter",
    section: "01 · ARRAYS",
    title: "array_filter()<br><em>Seleccionar por condición.</em>",
    type: "function",
    badge: "FILTRADO",
    icon: "ph ph-funnel",
    definition:
      "Crea un array con los elementos que cumplen una condición. Normalmente, la condición se expresa mediante una función callback.",
    purpose: [
      "Seleccionar elementos sin copiar manualmente cada uno.",
      "Filtrar números pares, usuarios activos o productos que cumplan un requisito.",
      "Conservar solo los elementos para los que el callback devuelve true.",
    ],
    syntax:
      "array_filter(array $array, ?callable $callback = null, int $mode = 0): array",
    params: [
      ["$array", "Array que se desea filtrar."],
      [
        "$callback",
        "Opcional. Función que decide si cada elemento se conserva.",
      ],
      ["$mode", "Opcional. Define qué argumentos recibe el callback."],
    ],
    returns:
      "Un array con los elementos aceptados. Se conservan las claves originales.",
    code: `<?php
$numeros = [1, 2, 3, 4, 5, 6];

$pares = array_filter($numeros, function($numero) {
    return $numero % 2 == 0;
});

print_r($pares);
?>`,
    output: `Array
(
    [1] => 2
    [3] => 4
    [5] => 6
)`,
    insight:
      "El operador % obtiene el residuo de una división. Si el residuo entre 2 es cero, el número es par. Las claves originales se mantienen.",
    caution:
      "Si necesitas índices consecutivos después de filtrar, puedes reindexar explícitamente con array_values().",
  },
  {
    id: "array-filter-lab",
    section: "01 · ARRAYS",
    title: "Ajusta la condición.",
    type: "sim-filter",
    lead: "Cambia el criterio y observa qué elementos sobreviven al filtro. La simulación ilustra el callback y la conservación de índices.",
  },
  {
    id: "is-null",
    section: "01 · ARRAYS",
    title: "is_null()<br><em>Comprobar un valor.</em>",
    type: "function",
    badge: "COMPROBACIÓN",
    icon: "ph ph-circle-half",
    definition: "Verifica si una variable contiene el valor null.",
    purpose: [
      "Comprobar datos opcionales antes de operar con ellos.",
      "Identificar un valor explícitamente nulo en formularios o respuestas.",
      "Diferenciar null de otros valores que pueden parecer vacíos.",
    ],
    syntax: "is_null(mixed $value): bool",
    params: [["$value", "Valor que se desea comprobar."]],
    returns: "true cuando el valor es null; false para cualquier otro valor.",
    code: `<?php
$telefono = null;

if (is_null($telefono)) {
    echo "No se registró un teléfono";
} else {
    echo "Teléfono: " . $telefono;
}
?>`,
    output: "No se registró un teléfono",
    insight:
      "Como $telefono contiene null, is_null() devuelve true y se ejecuta el primer bloque.",
    caution:
      "null no es lo mismo que 0, false o una cadena vacía (''). Cada uno representa un valor distinto.",
  },
  {
    id: "null-lab",
    section: "01 · ARRAYS",
    title: "Null no es cero ni vacío.",
    type: "sim-null",
    lead: "Selecciona un valor para comprobar cómo se distingue null de otros valores habituales.",
  },
  {
    id: "arrays-summary",
    section: "01 · ARRAYS",
    title: "Cinco funciones.<br><em>Un flujo de datos.</em>",
    type: "flow",
    lead: "En el trabajo con arrays, cada función responde a una pregunta distinta.",
    steps: [
      ["array_keys()", "¿Qué claves hay?", "Inspecciona"],
      ["array_key_exists()", "¿Está esta clave?", "Comprueba"],
      ["array_column()", "¿Qué valores extraigo?", "Proyecta"],
      ["array_filter()", "¿Qué elementos cumplen?", "Selecciona"],
      ["is_null()", "¿El valor es null?", "Distingue"],
    ],
    note: "No son sustitutas entre sí: combinarlas permite inspeccionar, comprobar y transformar datos con intención.",
  },
  {
    id: "file-put",
    section: "02 · ARCHIVOS",
    title: "file_put_contents()<br><em>Persistir contenido.</em>",
    type: "function",
    badge: "ESCRITURA",
    icon: "ph ph-file-arrow-down",
    definition:
      "Escribe una cadena o un array de bytes en un archivo. Abre o crea el recurso, escribe los bytes y lo cierra; por defecto reemplaza el contenido existente.",
    purpose: [
      "Guardar logs pequeños, cachés, exportaciones y archivos de configuración.",
      "Usar FILE_APPEND para agregar al final sin truncar.",
      "Usar LOCK_EX para solicitar un bloqueo exclusivo durante la escritura.",
    ],
    syntax:
      "file_put_contents(string $filename, mixed $data, int $flags = 0, ?resource $context = null): int|false",
    params: [
      ["$filename", "Ruta del archivo que se escribirá."],
      ["$data", "Contenido que se desea escribir."],
      ["$flags", "Opcional. Banderas como FILE_APPEND y LOCK_EX."],
      ["$context", "Opcional. Contexto de flujo."],
    ],
    returns:
      "Cantidad de bytes escritos o false si ocurre un error. Comprueba el fallo con === false.",
    code: `<?php
$path = __DIR__ . '/app.log';
$line = sprintf(
    "[%s] %s%s",
    date('c'),
    'LOGIN_SUCCESS',
    PHP_EOL
);

$bytes = file_put_contents(
    $path, $line, FILE_APPEND | LOCK_EX
);

if ($bytes === false) {
    throw new RuntimeException('No se pudo escribir el log');
}

echo "Bytes escritos: {$bytes}";
?>`,
    output: "Bytes escritos: (depende del timestamp y del salto de línea)",
    insight:
      "El contrato estable es: un entero con los bytes escritos en caso de éxito o false en caso de error.",
    caution:
      "Valida la ruta y los permisos. No uses entrada del usuario como nombre de archivo sin control. Para alto volumen, utiliza un sistema de logging dedicado.",
  },
  {
    id: "file-lab",
    section: "02 · ARCHIVOS",
    title: "Sobrescribir o anexar.",
    type: "sim-file",
    lead: "Compara el comportamiento conceptual de la escritura normal con FILE_APPEND. La simulación no escribe archivos reales.",
  },
  {
    id: "filter-var",
    section: "03 · VALIDACIÓN",
    title: "filter_var()<br><em>Validar una entrada.</em>",
    type: "function",
    badge: "VALIDACIÓN",
    icon: "ph ph-shield-check",
    definition:
      "Aplica un filtro a una variable. Según el filtro elegido, puede validar si un dato cumple un formato o modificarlo mediante una operación de filtrado.",
    purpose: [
      "Comprobar datos recibidos de formularios.",
      "Validar formatos de correo electrónico, URL o números enteros.",
      "Detectar entradas que no cumplen el formato esperado.",
    ],
    syntax:
      "filter_var(mixed $value, int $filter = FILTER_DEFAULT, array|int $options = 0): mixed",
    params: [
      ["$value", "Variable que se desea filtrar o validar."],
      ["$filter", "Filtro que se aplicará. Por defecto, FILTER_DEFAULT."],
      ["$options", "Opciones o flags del filtro, según corresponda."],
    ],
    returns:
      "Depende del filtro. En validaciones comunes devuelve el dato si es válido o false si no cumple.",
    code: `<?php
$correo = "ana@ejemplo.com";

if (filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo "Correo válido";
} else {
    echo "Correo no válido";
}
?>`,
    output: "Correo válido",
    insight:
      "FILTER_VALIDATE_EMAIL comprueba que el valor tenga una estructura válida de dirección de correo electrónico.",
    caution:
      "Validar el formato no confirma que la dirección exista ni que pueda recibir mensajes.",
  },
  {
    id: "filter-lab",
    section: "03 · VALIDACIÓN",
    title: "Formato válido, dato verificable.",
    type: "sim-email",
    lead: "Introduce una dirección y observa una comprobación ilustrativa del formato. La validación definitiva debe realizarse en PHP con FILTER_VALIDATE_EMAIL.",
  },
  {
    id: "password-hash",
    section: "04 · SEGURIDAD",
    title: "password_hash()<br><em>Proteger el secreto.</em>",
    type: "function",
    badge: "DERIVACIÓN",
    icon: "ph ph-lock-key",
    definition:
      "Genera un hash unidireccional de contraseña mediante un algoritmo adaptativo. PHP genera una sal aleatoria segura e incorpora en el hash la información necesaria del algoritmo y su coste.",
    purpose: [
      "Almacenar contraseñas sin conservar el secreto original.",
      "Aumentar el coste computacional para dificultar ataques offline.",
      "Permitir revisar y actualizar el coste mediante password_needs_rehash().",
    ],
    syntax:
      "password_hash(string $password, string|int|null $algo, array $options = []): string",
    params: [
      ["$password", "Contraseña que se desea convertir en hash."],
      [
        "$algo",
        "Algoritmo; PASSWORD_DEFAULT permite que PHP seleccione el recomendado.",
      ],
      [
        "$options",
        "Opciones específicas del algoritmo, como el coste cuando corresponda.",
      ],
    ],
    returns:
      "Una cadena hash autocontenida. Su longitud depende del algoritmo y puede cambiar entre versiones.",
    code: `<?php
$plain = 'Tr3s-Funciones!';

// La sal aleatoria hace que el hash varíe entre ejecuciones.
$hash = password_hash($plain, PASSWORD_DEFAULT);

echo $hash;
?>`,
    output: "$2y$10$… (hash ilustrativo; el valor real cambia)",
    insight:
      "El hash contiene la información del algoritmo, la sal y el coste. No necesitas almacenar la contraseña en texto plano.",
    caution:
      "Nunca compares con == ni intentes descifrar el hash. Para comprobar una contraseña utiliza password_verify(). Nunca registres ni muestres contraseñas en texto plano.",
  },
  {
    id: "password-verify",
    section: "04 · SEGURIDAD",
    title: "password_verify()<br><em>Comprobar sin revelar.</em>",
    type: "function",
    badge: "VERIFICACIÓN",
    icon: "ph ph-shield-check",
    definition:
      "Comprueba si una contraseña ingresada coincide con un hash de contraseña almacenado previamente.",
    purpose: [
      "Verificar credenciales durante el inicio de sesión.",
      "Evitar guardar o comparar la contraseña original en texto normal.",
      "Usar el hash recuperado del almacenamiento, por ejemplo, de una base de datos.",
    ],
    syntax: "password_verify(string $password, string $hash): bool",
    params: [
      ["$password", "Contraseña ingresada que se desea comprobar."],
      ["$hash", "Hash almacenado previamente, generado con password_hash()."],
    ],
    returns:
      "true si la contraseña coincide con el hash; false si no coincide.",
    code: `<?php
$contraseña = "Clave123";

// En un sistema real, este hash se recupera de la base de datos.
$hashGuardado = password_hash(
    $contraseña,
    PASSWORD_DEFAULT
);

if (password_verify("Clave123", $hashGuardado)) {
    echo "Contraseña correcta";
} else {
    echo "Contraseña incorrecta";
}
?>`,
    output: "Contraseña correcta",
    insight:
      "La verificación compara la contraseña recibida con la información contenida en el hash. No se descifra ni se recupera la contraseña original.",
    caution:
      "En producción, el hash debe recuperarse del almacenamiento. El ejemplo genera uno al vuelo solo para demostrar el flujo.",
  },
  {
    id: "password-flow",
    section: "04 · SEGURIDAD",
    title: "Un ciclo.<br><em>Dos responsabilidades.</em>",
    type: "security-flow",
    lead: "password_hash() protege al registrar o actualizar una contraseña. password_verify() verifica al autenticar.",
  },
  {
    id: "conclusion",
    section: "CIERRE",
    title: "Elige la función<br><em>por su efecto.</em>",
    type: "conclusion",
    groups: [
      [
        "ESTRUCTURAS",
        "array_keys() · array_key_exists() · array_column() · array_filter() · is_null()",
        "Leer, comprobar y transformar datos.",
      ],
      [
        "PERSISTENCIA",
        "file_put_contents()",
        "Escribir bytes y comprobar errores.",
      ],
      [
        "VALIDACIÓN",
        "filter_var()",
        "Aplicar filtros según el formato esperado.",
      ],
      [
        "SEGURIDAD",
        "password_hash() · password_verify()",
        "Derivar hashes y verificar credenciales.",
      ],
    ],
    final:
      "La API nativa es sencilla. La calidad técnica está en validar entradas, proteger recursos y comprobar retornos.",
  },
  {
    id: "video",
    section: "RECURSO",
    title: "StickMan vs Code.",
    type: "video",
    lead: "StickMan y Code se enfrentan en un conflicto donde Code obliga a StickMan a aprender a programar para evitar su derrota.",
  },
];
