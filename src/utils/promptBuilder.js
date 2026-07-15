import { routes } from "../data/routes.js";

const baseInstruction =
  "Actúa como un asistente de inclusión laboral y social. Ayúdame a crear un texto claro, respetuoso, positivo y útil para una persona usuaria de CADIR. CADIR acompaña a personas con discapacidad y también a personas en situación de exclusión social, por lo que no debes asumir discapacidad, diagnóstico, limitaciones personales ni necesidades especiales si no aparecen en las respuestas. Usa un lenguaje fácil de entender sin infantilizar, evita exagerar sus habilidades y enfócate en sus capacidades reales. No inventes información que no esté en las respuestas. Si falta información importante, indícalo de forma breve.";

const emptyFallback = "No indicado";

const formatValue = (value) => {
  const cleanValue = String(value || "").trim();
  return cleanValue.length > 0 ? cleanValue : emptyFallback;
};

const formatFieldList = (fields) =>
  fields.map(([label, value]) => `- ${label}: ${formatValue(value)}`).join("\n");

const getRouteFields = (route) => [
  ...route.additionalFields,
  ...(route.supportFields || []),
];

export const buildPrompt = ({ baseData, selectedRoute, routeData }) => {
  const route = routes[selectedRoute];

  if (!route) {
    return "";
  }

  const generalInfo = formatFieldList([
    ["Nombre", baseData.name],
    ["Edad", baseData.age],
    ["Fecha de la ficha", baseData.formDate],
    ["Persona de apoyo o profesional acompañante", baseData.supportProfessional],
    ["Habilidades principales", baseData.skills],
    ["Intereses", baseData.interests],
    ["Experiencia previa", baseData.experience],
    ["Forma de trabajar o condiciones que ayudan", baseData.supports],
    ["Objetivo actual", baseData.currentGoal],
  ]);

  const personalizationInfo = formatFieldList([
    ["Quién leerá o escuchará el resultado", baseData.finalAudience],
    ["Uso final del material", baseData.finalUse],
    ["Tono deseado", baseData.desiredTone],
    ["Extensión preferida", baseData.desiredLength],
    ["Datos o ideas que sí deben aparecer", baseData.mustInclude],
    ["Datos, palabras o enfoques que debe evitar", baseData.mustAvoid],
    [
      "Contexto interno para orientar el tono, sin mencionarlo",
      baseData.internalContext,
    ],
  ]);

  const routeInfo = formatFieldList(
    route.additionalFields.map((field) => [field.label, routeData[field.name]]),
  );

  const supportInfo =
    route.supportFields?.length > 0
      ? formatFieldList(
          route.supportFields.map((field) => [field.label, routeData[field.name]]),
        )
      : "No hay datos complementarios definidos para esta ruta.";

  const requestedMaterials = route.requestedMaterials
    .map((material) => `- ${material}`)
    .join("\n");

  const contextInstruction = route.contextInstruction
    ? `\nInstrucción específica para esta ruta:\n- ${route.contextInstruction}\n`
    : "";

  const outputTemplateInstruction = route.outputTemplate
    ? `\nPlantilla de salida obligatoria:\n${route.outputTemplate}\n`
    : "";

  return `${baseInstruction}

Información general de la persona:
${generalInfo}

Preferencias de personalización y uso:
${personalizationInfo}

Ruta elegida:
- ${route.title}

Información específica de esta ruta:
${routeInfo}

Datos complementarios para completar mejor cada material:
${supportInfo}

${contextInstruction}
Materiales que necesito que generes:
${requestedMaterials}

${outputTemplateInstruction}
Instrucciones de seguridad y estilo:
- No inventes datos.
- No exageres habilidades, experiencia ni formación.
- Si falta información para un campo de una plantilla, escribe exactamente "por completar" en ese campo.
- Si hay una plantilla de salida obligatoria, respeta exactamente sus títulos, orden y formato.
- Si hay una plantilla de salida obligatoria, no agregues saludo, introducción, cierre, notas extra ni secciones no solicitadas.
- Si hay una plantilla visual, escribe textos compactos que quepan en una página y evita párrafos largos.
- No uses emojis, tablas, bloques de cita ni adornos de Markdown dentro de una plantilla visual.
- Usa un tono claro, respetuoso, cercano y positivo, pero también natural y adulto.
- No uses un tono paternalista, infantilizante ni excesivamente asistencial.
- No menciones discapacidad, exclusión social, diagnóstico, limitaciones o apoyos personales salvo que la información entregada lo indique claramente.
- Si hay contexto interno, úsalo solo para ajustar el tono y la sensibilidad del texto. No lo menciones de forma explícita en los materiales finales.
- Respeta los datos, palabras o enfoques que se hayan marcado como "debe evitar".
- Incluye, cuando sea natural, los datos o ideas marcados como "sí deben aparecer".
- Ajusta extensión, formato y nivel de detalle a las preferencias indicadas.
- Adapta el texto al objetivo indicado y al contexto real de uso.
- Antes de escribir, detecta si hay contradicciones o datos poco claros. No las resuelvas inventando.
- Si hay una plantilla de salida obligatoria, no agregues sección de pendientes: usa "por completar" dentro del campo correspondiente.
- Si no hay plantilla de salida obligatoria y falta información importante, incluye al final una sección breve llamada "Datos pendientes por completar".
- Organiza la respuesta con títulos y secciones fáciles de revisar solo si no contradice la plantilla obligatoria.

Nota importante:
El resultado generado por IA debe ser revisado con apoyo de CADIR antes de utilizarse.`;
};

export const getAllRouteFields = getRouteFields;
