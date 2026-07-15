const valueFrom = (params, aliases) => {
  for (const alias of aliases) {
    const value = params.get(alias);
    if (value && value.trim()) {
      return cleanListValue(value);
    }
  }

  return "";
};

const cleanListValue = (value) =>
  String(value || "")
    .replace(/\s*[|;]\s*/g, ", ")
    .replace(/\s*,\s*/g, ", ")
    .trim();

const normalizeRoute = (value, fallbackObjective = "") => {
  const text = `${value || ""} ${fallbackObjective || ""}`.toLowerCase();

  if (
    text.includes("emprend") ||
    text.includes("negocio") ||
    text.includes("producto") ||
    text.includes("servicio")
  ) {
    return "emprendimiento";
  }

  if (
    text.includes("present") ||
    text.includes("marca personal") ||
    text.includes("descripción profesional") ||
    text.includes("descripcion profesional")
  ) {
    return "presentacion";
  }

  if (
    text.includes("empleo") ||
    text.includes("cv") ||
    text.includes("currículum") ||
    text.includes("curriculum")
  ) {
    return "empleo";
  }

  return "";
};

const removeEmpty = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => String(value || "").trim()),
  );

export const buildPrefillFromUrl = (search = "") => {
  const params = new URLSearchParams(search);

  if ([...params.keys()].length === 0) {
    return {
      hasPrefill: false,
      baseData: {},
      routeData: {},
      selectedRoute: "",
    };
  }

  const objective = valueFrom(params, [
    "objective",
    "objetivo",
    "objetivoPrincipal",
    "objetivo_principal",
    "Cuál es tu objetivo principal en este momento",
    "¿Cuál es tu objetivo principal en este momento?",
    "q10",
  ]);

  const routeText = valueFrom(params, [
    "route",
    "ruta",
    "rutaCadir",
    "ruta_cadir",
    "Qué ruta quieres seguir dentro de Puente Laboral CADIR",
    "¿Qué ruta quieres seguir dentro de Puente Laboral CADIR?",
    "q11",
  ]);

  const routeGoal = valueFrom(params, [
    "routeGoal",
    "logro",
    "metaRuta",
    "meta_ruta",
    "Qué te gustaría lograr al terminar esta ruta",
    "¿Qué te gustaría lograr al terminar esta ruta?",
    "q12",
  ]);

  const selectedRoute = normalizeRoute(routeText, `${objective} ${routeGoal}`);

  const baseData = removeEmpty({
    name: valueFrom(params, [
      "name",
      "nombre",
      "nombreApellido",
      "nombre_apellido",
      "Nombre y apellido",
      "q1",
    ]),
    age: valueFrom(params, ["age", "edad", "Edad", "q2"]),
    formDate: valueFrom(params, ["date", "fecha", "Fecha", "q3"]),
    supportProfessional: valueFrom(params, [
      "professional",
      "profesional",
      "personaApoyo",
      "persona_apoyo",
      "Persona de apoyo o profesional que acompaña el proceso, si aplica",
      "q4",
    ]),
    interests: valueFrom(params, [
      "interests",
      "intereses",
      "actividades",
      "actividades_interes",
      "Qué actividades te interesan o te gustaría realizar",
      "¿Qué actividades te interesan o te gustaría realizar?",
      "q5",
    ]),
    skills: valueFrom(params, [
      "skills",
      "habilidades",
      "habilidades_reconocidas",
      "Qué habilidades reconoces en ti",
      "¿Qué habilidades reconoces en ti?",
      "q6",
    ]),
    experience: [
      valueFrom(params, [
        "hasExperience",
        "experienciaSiNo",
        "experiencia_si_no",
        "Has trabajado, hecho prácticas, voluntariado o ayudado en alguna actividad antes",
        "¿Has trabajado, hecho prácticas, voluntariado o ayudado en alguna actividad antes?",
        "q7",
      ]),
      valueFrom(params, [
        "experience",
        "experiencia",
        "descripcionExperiencia",
        "descripcion_experiencia",
        "Describe brevemente tu experiencia, si tienes alguna",
        "q8",
      ]),
    ]
      .filter(Boolean)
      .join(". "),
    supports: valueFrom(params, [
      "supports",
      "apoyos",
      "condiciones",
      "formaTrabajo",
      "forma_trabajo",
      "Qué apoyos te ayudarían a trabajar o aprender mejor",
      "¿Qué apoyos te ayudarían a trabajar o aprender mejor?",
      "q9",
    ]),
    currentGoal: [objective, routeGoal].filter(Boolean).join(". "),
    finalUse: routeText || objective,
    desiredTone: valueFrom(params, ["tone", "tono", "tonoDeseado"]),
    mustAvoid: valueFrom(params, ["avoid", "evitar", "mustAvoid"]),
    internalContext: valueFrom(params, [
      "internalContext",
      "contextoInterno",
      "contexto_interno",
    ]),
  });

  const routeData = removeEmpty({
    jobType: valueFrom(params, ["jobType", "tipoEmpleo", "tipo_empleo"]),
    workArea: valueFrom(params, ["workArea", "areaLaboral", "area_laboral"]),
    availability: valueFrom(params, ["availability", "disponibilidad"]),
    training: valueFrom(params, ["training", "formacion", "cursos"]),
    phone: valueFrom(params, ["phone", "telefono", "teléfono"]),
    email: valueFrom(params, ["email", "correo"]),
    city: valueFrom(params, ["city", "ciudad"]),
    experiencePlace: valueFrom(params, [
      "experiencePlace",
      "lugarExperiencia",
      "lugar_experiencia",
    ]),
    experienceDates: valueFrom(params, [
      "experienceDates",
      "fechasExperiencia",
      "fechas_experiencia",
    ]),
    experienceTasks: valueFrom(params, [
      "experienceTasks",
      "tareasExperiencia",
      "tareas_experiencia",
    ]),
    educationLevel: valueFrom(params, ["education", "estudios"]),
    cvNotes: valueFrom(params, ["cvNotes", "otrosDatosCv"]),
    message: routeGoal || objective,
    presentationPlace: routeText || objective,
    strengths: baseData.skills,
    preferredName: baseData.name,
    currentSituation: objective,
    interestDetails: baseData.interests,
    experienceDetails: baseData.experience,
    productService: valueFrom(params, [
      "productService",
      "productoServicio",
      "producto_servicio",
    ]),
    targetAudience: valueFrom(params, ["targetAudience", "publicoObjetivo"]),
    uniqueValue: valueFrom(params, ["uniqueValue", "valorDiferencial"]),
    promotionPlace: valueFrom(params, ["promotionPlace", "dondePromocionar"]),
    needSolved: valueFrom(params, ["needSolved", "necesidad"]),
    businessName: valueFrom(params, ["businessName", "nombreNegocio"]),
    location: valueFrom(params, ["location", "zona"]),
    bookingMethod: valueFrom(params, ["bookingMethod", "metodoReserva"]),
    contactPhone: valueFrom(params, ["contactPhone", "telefonoContacto"]),
    contactEmail: valueFrom(params, ["contactEmail", "correoContacto"]),
    socialMedia: valueFrom(params, ["socialMedia", "redes"]),
  });

  return {
    hasPrefill: Object.keys(baseData).length > 0 || Object.keys(routeData).length > 0,
    baseData,
    routeData,
    selectedRoute,
  };
};
