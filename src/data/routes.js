export const routes = {
  empleo: {
    id: "empleo",
    emoji: "💼",
    title: "Busco empleo",
    description: "Genera materiales para preparar una búsqueda laboral.",
    additionalFields: [
      {
        name: "jobType",
        label: "Tipo de empleo que busca",
        placeholder: "Ejemplo: atención al cliente, almacén, limpieza...",
      },
      {
        name: "workArea",
        label: "Área de interés laboral",
        placeholder: "Ejemplo: comercio, hostelería, administración...",
      },
      {
        name: "availability",
        label: "Disponibilidad",
        placeholder: "Ejemplo: mañanas, tardes, jornada parcial...",
      },
      {
        name: "training",
        label: "Formación o cursos, si tiene",
        placeholder: "Ejemplo: curso de manipulador de alimentos...",
      },
    ],
    supportFieldsTitle: "Datos para completar mejor el CV y la entrevista",
    supportFields: [
      {
        name: "phone",
        label: "Teléfono de contacto",
        placeholder: "Ejemplo: 600 000 000",
        multiline: false,
      },
      {
        name: "email",
        label: "Correo electrónico",
        placeholder: "Ejemplo: nombre@email.com",
        multiline: false,
      },
      {
        name: "city",
        label: "Ciudad o zona de residencia",
        placeholder: "Ejemplo: Valencia, Mislata, Torrent...",
        multiline: false,
      },
      {
        name: "experiencePlace",
        label: "Lugar de la experiencia o voluntariado",
        placeholder: "Ejemplo: nombre de la entidad, empresa o proyecto...",
      },
      {
        name: "experienceDates",
        label: "Fechas aproximadas de la experiencia",
        placeholder: "Ejemplo: marzo-junio de 2025, verano de 2024...",
      },
      {
        name: "experienceTasks",
        label: "Tareas realizadas en esa experiencia",
        placeholder: "Ejemplo: limpieza de espacios, apoyo en cocina, atención a usuarios...",
      },
      {
        name: "educationLevel",
        label: "Estudios o formación general",
        placeholder: "Ejemplo: ESO, formación básica, talleres realizados...",
      },
      {
        name: "cvNotes",
        label: "Otros datos útiles para el CV",
        placeholder: "Ejemplo: carné, idiomas, informática básica, prácticas, preferencias...",
      },
    ],
    requestedMaterials: [
      "Contenido listo para completar la plantilla de CV básico de Puente Laboral CADIR",
    ],
    outputTemplate: `Devuelve el resultado exactamente con esta estructura, sin saludo inicial, sin explicación adicional, sin formato de tabla y sin secciones extra:

NOMBRE:
TITULAR LABORAL:
TELÉFONO:
CORREO:
CIUDAD:
PERFIL LABORAL:
FORMACIÓN:
- Estudios:
- Cursos o talleres:
- Otros aprendizajes:

HABILIDADES PRINCIPALES:
1.
2.
3.
4.
5.

FORMA DE TRABAJAR:

EXPERIENCIA:
- Lugar o actividad:
- Tareas realizadas:
- Aprendizajes:

ÁREAS DE INTERÉS LABORAL:

DISPONIBILIDAD:
- Horario disponible:
- Tipo de jornada:`,
    contextInstruction:
      "Esta ruta debe generar contenido listo para completar una plantilla visual de CV básico de una página de Puente Laboral CADIR. Usa solo datos entregados y escribe 'por completar' cuando falte información. No conviertas intereses en experiencia laboral si no se indicó. El titular laboral debe ser muy breve, de 2 a 5 palabras, por ejemplo 'Auxiliar de limpieza' o 'Atención al cliente'. El perfil laboral debe caber en un bloque pequeño: máximo 45 palabras, 2 o 3 frases cortas. La formación debe ir en líneas breves. Las habilidades deben ser 5 elementos cortos, de 1 a 4 palabras cada uno. La sección 'Forma de trabajar' debe transformar cualquier condición indicada en una frase universal y positiva sobre estilo de trabajo, por ejemplo: 'Trabajo mejor con instrucciones claras, organización y un ambiente respetuoso'. No uses palabras como discapacidad, limitación, necesidad especial o apoyo en el CV. La experiencia debe ir en tres líneas claras: lugar o actividad, tareas, aprendizajes. Las áreas de interés laboral deben ser 4 a 6 opciones separadas por comas. La disponibilidad debe ser directa y breve. No agregues una carta, entrevista, saludo, recomendaciones ni apartados adicionales si se está usando la plantilla de salida.",
  },
  presentacion: {
    id: "presentacion",
    emoji: "✨",
    title: "Quiero presentarme mejor",
    description: "Crea textos para explicar quién es la persona y qué aporta.",
    additionalFields: [
      {
        name: "message",
        label: "Qué quiere comunicar sobre sí mismo/a",
        placeholder: "Ejemplo: que soy responsable y quiero seguir aprendiendo...",
      },
      {
        name: "presentationPlace",
        label: "Dónde usará su presentación",
        placeholder: "Ejemplo: entrevista, LinkedIn, taller, correo...",
      },
      {
        name: "strengths",
        label: "Fortalezas principales",
        placeholder: "Ejemplo: puntualidad, trato amable, constancia...",
      },
      {
        name: "personalImage",
        label: "Tipo de imagen personal que desea transmitir",
        placeholder: "Ejemplo: cercana, profesional, responsable...",
      },
    ],
    supportFieldsTitle: "Datos para completar mejor la presentación",
    supportFields: [
      {
        name: "preferredName",
        label: "Nombre que desea usar en la presentación",
        placeholder: "Ejemplo: Dani, Daniela, nombre completo...",
        multiline: false,
      },
      {
        name: "city",
        label: "Ciudad o contexto",
        placeholder: "Ejemplo: Valencia, comunidad CADIR, barrio...",
        multiline: false,
      },
      {
        name: "currentSituation",
        label: "Situación actual que puede mencionarse",
        placeholder: "Ejemplo: buscando empleo, en formación, haciendo prácticas...",
      },
      {
        name: "workshopTopic",
        label: "Tema del taller, si aplica",
        placeholder: "Ejemplo: habilidades personales, búsqueda de empleo, autoestima, cocina...",
      },
      {
        name: "workshopAudience",
        label: "Quién escuchará la presentación",
        placeholder: "Ejemplo: compañeros del taller, orientadores, empresas invitadas...",
      },
      {
        name: "workshopGoal",
        label: "Qué quiere conseguir en el taller",
        placeholder: "Ejemplo: presentarse, practicar hablar en público, compartir intereses...",
      },
      {
        name: "workshopFormat",
        label: "Formato o duración aproximada",
        placeholder: "Ejemplo: decirlo en voz alta, leer una tarjeta, 1 minuto, 3 minutos...",
      },
      {
        name: "personalExamples",
        label: "Ejemplos reales que demuestran sus fortalezas",
        placeholder: "Ejemplo: ayudó en un voluntariado, cuida detalles, cumple horarios...",
      },
      {
        name: "experienceDetails",
        label: "Detalles de experiencia o voluntariado que sí pueden mencionarse",
        placeholder: "Ejemplo: tareas realizadas, lugar, aprendizajes, apoyo a otras personas...",
      },
      {
        name: "interestDetails",
        label: "Detalles sobre sus intereses",
        placeholder: "Ejemplo: qué le gusta de la cocina, qué tareas prefiere, qué quiere aprender...",
      },
      {
        name: "thingsToAvoid",
        label: "Temas o datos que prefiere no mencionar",
        placeholder: "Ejemplo: diagnóstico, información familiar, experiencias concretas...",
      },
      {
        name: "tonePreference",
        label: "Tono deseado",
        placeholder: "Ejemplo: cercano, profesional, breve, motivador...",
      },
    ],
    requestedMaterials: [
      "Contenido listo para completar la plantilla de presentación personal de Puente Laboral CADIR",
      "Contenido listo para completar la plantilla de descripción profesional de Puente Laboral CADIR",
    ],
    outputTemplate: `Devuelve el resultado exactamente con esta estructura, sin saludo inicial, sin explicación adicional, sin formato de tabla y sin secciones extra:

PRESENTACIÓN PERSONAL
NOMBRE:
¿QUÉ SÉ HACER?:
¿QUÉ ME INTERESA?:
¿QUIÉN SOY?:
¿QUÉ PUEDO APORTAR?:
MI PRESENTACIÓN FINAL:

DESCRIPCIÓN PROFESIONAL
MI NOMBRE:
CAMPO LABORAL / MIS ÁREAS DE INTERÉS:
MIS HABILIDADES DESTACADAS:
MI EXPERIENCIA O APRENDIZAJES:
MIS FORTALEZAS PERSONALES:
CONDICIONES QUE ME AYUDAN, SI APLICA:
MI DESCRIPCIÓN PROFESIONAL FINAL:
Soy una persona [texto breve].
Me interesa desarrollarme en [áreas de interés].
Me destaco por [habilidades o fortalezas].
He aprendido o tengo experiencia en [experiencia o aprendizajes].
Para desempeñarme mejor, me ayuda [condiciones de trabajo, si aplica].`,
    contextInstruction:
      "Esta ruta debe generar contenido listo para completar dos plantillas visuales: presentación personal y descripción profesional. Adapta todos los textos al lugar donde se usarán. Si el lugar indicado es un taller, prioriza frases naturales para leer en voz alta o compartir con el grupo. No enfoques la respuesta como CV, empresa, entrevista o redes sociales salvo que el usuario lo haya indicado. En la plantilla de presentación personal, cada bloque debe ser breve porque va en una tarjeta pequeña: 'Qué sé hacer' máximo 18 palabras, 'Qué me interesa' máximo 18 palabras, 'Quién soy' máximo 22 palabras, 'Qué puedo aportar' máximo 22 palabras. 'Mi presentación final' debe ser un guion oral de 45 a 65 palabras, claro, cercano y fácil de leer. En la plantilla de descripción profesional, usa frases cortas que puedan rellenar una página limpia: campo laboral máximo 8 palabras o una lista breve; habilidades destacadas máximo 5 elementos separados por comas; experiencia o aprendizajes máximo 18 palabras; fortalezas personales máximo 5 elementos separados por comas; condiciones que me ayudan máximo 14 palabras y solo si aplica. La descripción profesional final debe mantener exactamente las cinco frases dadas y reemplazar los textos entre corchetes con contenido breve. Si falta información, usa 'por completar'. Evita frases demasiado genéricas como 'qué gran paso' y escribe directamente el contenido de las plantillas.",
  },
  emprendimiento: {
    id: "emprendimiento",
    emoji: "🌱",
    title: "Tengo una idea de emprendimiento",
    description: "Ordena una idea de negocio o proyecto propio.",
    additionalFields: [
      {
        name: "productService",
        label: "Producto o servicio",
        placeholder: "Ejemplo: bisutería artesanal, comida casera, reparación...",
      },
      {
        name: "targetAudience",
        label: "Público objetivo",
        placeholder: "Ejemplo: vecinos del barrio, familias, comercios...",
      },
      {
        name: "uniqueValue",
        label: "Qué hace especial la idea",
        placeholder: "Ejemplo: atención cercana, producto personalizado...",
      },
      {
        name: "promotionPlace",
        label: "Dónde quiere promocionarla",
        placeholder: "Ejemplo: Instagram, mercado local, Google Sites...",
      },
      {
        name: "needSolved",
        label: "Necesidad que resuelve",
        placeholder: "Ejemplo: ahorrar tiempo, ofrecer algo hecho a mano...",
      },
    ],
    supportFieldsTitle: "Datos para completar mejor la idea de emprendimiento",
    supportFields: [
      {
        name: "businessName",
        label: "Nombre de la idea o negocio, si lo tiene",
        placeholder: "Ejemplo: Dulces de Ana, Manos Creativas...",
        multiline: false,
      },
      {
        name: "location",
        label: "Zona donde quiere vender o prestar el servicio",
        placeholder: "Ejemplo: Valencia, barrio, online, mercados locales...",
      },
      {
        name: "servicePlace",
        label: "Lugar concreto donde ofrecerá el producto o servicio",
        placeholder: "Ejemplo: a domicilio, parque, local, internet, ferias, centro comunitario...",
      },
      {
        name: "targetProfile",
        label: "Perfil más concreto del público objetivo",
        placeholder: "Ejemplo: principiantes, personas con estrés, familias, vecinos del barrio...",
      },
      {
        name: "experienceOrCredentials",
        label: "Experiencia, formación o confianza para ofrecerlo",
        placeholder: "Ejemplo: años practicando, curso realizado, experiencia personal, recomendaciones...",
      },
      {
        name: "schedule",
        label: "Horarios o disponibilidad para ofrecerlo",
        placeholder: "Ejemplo: tardes, fines de semana, clases de 1 hora, bajo reserva...",
      },
      {
        name: "priceIdea",
        label: "Precio orientativo o forma de cobrar",
        placeholder: "Ejemplo: por encargo, por hora, desde 10 €...",
      },
      {
        name: "bookingMethod",
        label: "Cómo podrá contactar o reservar la gente",
        placeholder: "Ejemplo: mensaje por Facebook, WhatsApp, llamada, formulario...",
      },
      {
        name: "contactPhone",
        label: "Teléfono o WhatsApp de contacto, si quiere mostrarlo",
        placeholder: "Ejemplo: 600 000 000, WhatsApp, solo por mensaje...",
        multiline: false,
      },
      {
        name: "contactEmail",
        label: "Correo de contacto, si tiene",
        placeholder: "Ejemplo: nombre@email.com",
        multiline: false,
      },
      {
        name: "socialMedia",
        label: "Redes sociales o canal principal",
        placeholder: "Ejemplo: Facebook, Instagram, TikTok, Google Sites...",
      },
      {
        name: "communicationTone",
        label: "Tono de comunicación del negocio",
        placeholder: "Ejemplo: profesional, cercano, tranquilo, alegre, elegante...",
      },
      {
        name: "resources",
        label: "Recursos que ya tiene",
        placeholder: "Ejemplo: materiales, herramientas, redes sociales, contactos...",
      },
      {
        name: "nextStep",
        label: "Próximo paso que quiere dar",
        placeholder: "Ejemplo: crear una presentación, probar con clientes, hacer fotos...",
      },
      {
        name: "limitations",
        label: "Aspectos prácticos que necesita organizar",
        placeholder: "Ejemplo: reservas, cobros, transporte, materiales, gestión de mensajes...",
      },
    ],
    requestedMaterials: [
      "Contenido listo para completar la presentación del emprendimiento de Puente Laboral CADIR",
    ],
    outputTemplate: `Devuelve el resultado exactamente con esta estructura, sin saludo inicial, sin explicación adicional, sin formato de tabla y sin secciones extra:

DIAPOSITIVA 1 - PORTADA
NOMBRE DEL EMPRENDIMIENTO:
PRESENTADO POR:
FRASE O IDEA PRINCIPAL:

DIAPOSITIVA 2 - QUÉ OFREZCO
DESCRIPCIÓN DEL PRODUCTO O SERVICIO:
MI OBJETIVO ES:

DIAPOSITIVA 3 - QUÉ NECESIDAD ATIENDO
NECESIDAD, PROBLEMA O SITUACIÓN:

DIAPOSITIVA 4 - MI PROPUESTA DE VALOR
PRODUCTO O SERVICIO:
VALOR PRINCIPAL:
FORMA DE COMUNICARLO:

DIAPOSITIVA 5 - A QUIÉN QUIERO LLEGAR
PÚBLICO OBJETIVO:

DIAPOSITIVA 6 - CÓMO PUEDO COMUNICARLO
PRIMER PASO:
CANALES:
RECURSOS O ASPECTOS POR ORGANIZAR:

DIAPOSITIVA 7 - PRESENTACIÓN BREVE DEL EMPRENDIMIENTO
TEXTO FINAL PARA EXPLICAR LA IDEA EN MENOS DE UN MINUTO:

DIAPOSITIVA 8 - CIERRE Y CONTACTO
FRASE DE CIERRE:
CONTACTO:
EMAIL:
REDES:`,
    contextInstruction:
      "Esta ruta debe generar contenido listo para completar una presentación horizontal de 8 diapositivas sobre un emprendimiento. Debe sonar como una propuesta de negocio real, profesional y cercana. No la redactes como si la persona necesitara simplificación por discapacidad o dificultad personal. El lenguaje claro debe servir para comunicar mejor el emprendimiento, no para reducir el nivel del mensaje. No menciones discapacidad, exclusión social, acompañamiento de CADIR ni apoyos personales dentro de los textos comerciales salvo que el usuario lo pida expresamente. Usa 'recursos o aspectos por organizar' en lugar de 'apoyos necesarios'. Mantén cada diapositiva breve: portada con nombre y frase principal de máximo 12 palabras; descripción del producto o servicio máximo 35 palabras; objetivo máximo 18 palabras; necesidad máximo 28 palabras; producto/servicio, valor principal y forma de comunicarlo máximo 18 palabras cada uno; público objetivo máximo 22 palabras; primer paso, canales y recursos por organizar máximo 18 palabras cada uno. El texto final para explicar la idea debe durar menos de un minuto: 70 a 95 palabras, tono natural y fácil de decir en voz alta. La frase de cierre debe ser breve y amable. Si falta contacto, email o redes, escribe 'por completar'. Si hay contradicciones entre intereses personales y el negocio, señálalas solo si no hay plantilla obligatoria; si hay plantilla obligatoria, usa los datos disponibles y coloca 'por completar' donde falte información. Evita saludos excesivos o frases paternalistas; empieza directamente con el contenido de la presentación.",
  },
};

export const routeOptions = Object.values(routes);
