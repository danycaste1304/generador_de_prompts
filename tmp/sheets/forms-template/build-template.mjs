import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "C:/Users/Usuario/Documents/CADIR/outputs/forms-template";
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const config = workbook.worksheets.add("Configuración");
const responses = workbook.worksheets.add("Respuestas Forms");
const example = workbook.worksheets.add("Ejemplo");
const instructions = workbook.worksheets.add("Instrucciones");

const purple = "#583D82";
const purpleDark = "#422A66";
const cyan = "#72C4DA";
const cyanSoft = "#E9F8FC";
const lavender = "#F4EFFB";
const ink = "#241A35";
const border = "#D9CFEA";

const applyTitle = (sheet, range, title) => {
  sheet.getRange(range).merge();
  sheet.getRange(range).values = [[title]];
  sheet.getRange(range).format = {
    fill: purple,
    font: { bold: true, color: "#FFFFFF", size: 16 },
    horizontalAlignment: "center",
    verticalAlignment: "center",
  };
};

const styleHeader = (range) => {
  range.format = {
    fill: purple,
    font: { bold: true, color: "#FFFFFF" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: border },
  };
};

const styleInput = (range) => {
  range.format = {
    fill: "#FFFFFF",
    font: { color: ink },
    verticalAlignment: "top",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: border },
  };
};

for (const sheet of [config, responses, example, instructions]) {
  sheet.showGridLines = false;
}

applyTitle(config, "A1:D1", "Configuración del enlace al generador");
config.getRange("A3:B8").values = [
  ["Dato", "Valor"],
  ["URL del generador publicado", "https://TU-SITIO.netlify.app/"],
  ["Estado", "Cambia la URL anterior cuando publiques en Vercel o Netlify"],
  ["Separador recomendado para respuestas múltiples", ", "],
  ["Nota", "No compartas enlaces con datos personales fuera del equipo autorizado"],
  ["Uso", "Copia la fórmula de la hoja Respuestas Forms hacia abajo"],
];
styleHeader(config.getRange("A3:B3"));
styleInput(config.getRange("A4:B8"));
config.getRange("A:A").format.columnWidth = 34;
config.getRange("B:B").format.columnWidth = 78;

const formHeaders = [
  "Marca temporal",
  "Nombre y apellido",
  "Edad",
  "Fecha",
  "Persona de apoyo o profesional que acompaña el proceso, si aplica",
  "¿Qué actividades te interesan o te gustaría realizar?",
  "¿Qué habilidades reconoces en ti?",
  "¿Has trabajado, hecho prácticas, voluntariado o ayudado en alguna actividad antes?",
  "Describe brevemente tu experiencia, si tienes alguna.",
  "¿Qué apoyos te ayudarían a trabajar o aprender mejor?",
  "¿Cuál es tu objetivo principal en este momento?",
  "¿Qué ruta quieres seguir dentro de Puente Laboral CADIR?",
  "¿Qué te gustaría lograr al terminar esta ruta?",
  "Notas internas CADIR, opcional",
  "Enlace al generador",
];

applyTitle(responses, "A1:O1", "Ficha inicial del usuario - Puente Laboral CADIR");
responses.getRange("A2:O2").values = [formHeaders];
styleHeader(responses.getRange("A2:O2"));
styleInput(responses.getRange("A3:O52"));
responses.freezePanes.freezeRows(2);

const linkFormula =
  '=IF($B3="","",Configuración!$B$4&"?"&' +
  '"name="&ENCODEURL($B3)&' +
  '"&age="&ENCODEURL($C3)&' +
  '"&date="&ENCODEURL($D3)&' +
  '"&professional="&ENCODEURL($E3)&' +
  '"&interests="&ENCODEURL($F3)&' +
  '"&skills="&ENCODEURL($G3)&' +
  '"&hasExperience="&ENCODEURL($H3)&' +
  '"&experience="&ENCODEURL($I3)&' +
  '"&supports="&ENCODEURL($J3)&' +
  '"&objective="&ENCODEURL($K3)&' +
  '"&route="&ENCODEURL($L3)&' +
  '"&routeGoal="&ENCODEURL($M3)&' +
  '"&internalContext="&ENCODEURL($N3))';
responses.getRange("O3").formulas = [[linkFormula]];
responses.getRange("O3:O52").fillDown();
responses.getRange("A:A").format.columnWidth = 18;
responses.getRange("B:B").format.columnWidth = 24;
responses.getRange("C:D").format.columnWidth = 14;
responses.getRange("E:E").format.columnWidth = 34;
responses.getRange("F:J").format.columnWidth = 42;
responses.getRange("K:M").format.columnWidth = 36;
responses.getRange("N:N").format.columnWidth = 34;
responses.getRange("O:O").format.columnWidth = 72;
responses.getRange("D3:D52").format.numberFormat = "yyyy-mm-dd";

responses.getRange("L3:L52").dataValidation = {
  rule: {
    type: "list",
    values: [
      "Ruta 1: Busco empleo",
      "Ruta 2: Quiero presentarme mejor",
      "Ruta 3: Tengo una idea de emprendimiento",
      "Necesito ayuda para elegir mi ruta",
    ],
  },
};
responses.getRange("K3:K52").dataValidation = {
  rule: {
    type: "list",
    values: [
      "Buscar empleo",
      "Crear o mejorar mi CV",
      "Aprender a presentarme mejor",
      "Fortalecer mi marca personal",
      "Organizar una idea de emprendimiento",
      "Promocionar un producto o servicio",
      "Todavía no estoy seguro/a",
    ],
  },
};

applyTitle(example, "A1:O1", "Ejemplo de respuesta y enlace generado");
example.getRange("A2:O2").values = [formHeaders];
styleHeader(example.getRange("A2:O2"));
example.getRange("A3:N3").values = [[
  "2026-07-15 10:00",
  "Daniela Pérez",
  "28",
  new Date("2026-07-15"),
  "Orientadora CADIR",
  "Cocinar o ayudar en cocina, Limpiar o mantener espacios organizados",
  "Soy responsable, Soy puntual, Soy amable con otras personas",
  "Sí",
  "Voluntariado en actividades de apoyo y organización.",
  "Instrucciones claras, Horarios organizados, Ambiente tranquilo",
  "Aprender a presentarme mejor",
  "Ruta 2: Quiero presentarme mejor",
  "Poder presentarme con más seguridad en un taller.",
  "Contexto interno: trabajar confianza, no mencionarlo en el texto final.",
]];
example.getRange("O3").formulas = [[
  '=IF($B3="","",Configuración!$B$4&"?"&"name="&ENCODEURL($B3)&"&age="&ENCODEURL($C3)&"&date="&ENCODEURL($D3)&"&professional="&ENCODEURL($E3)&"&interests="&ENCODEURL($F3)&"&skills="&ENCODEURL($G3)&"&hasExperience="&ENCODEURL($H3)&"&experience="&ENCODEURL($I3)&"&supports="&ENCODEURL($J3)&"&objective="&ENCODEURL($K3)&"&route="&ENCODEURL($L3)&"&routeGoal="&ENCODEURL($M3)&"&internalContext="&ENCODEURL($N3))',
]];
styleInput(example.getRange("A3:O3"));
example.freezePanes.freezeRows(2);
example.getRange("A:A").format.columnWidth = 18;
example.getRange("B:B").format.columnWidth = 24;
example.getRange("C:D").format.columnWidth = 14;
example.getRange("E:N").format.columnWidth = 34;
example.getRange("O:O").format.columnWidth = 72;
example.getRange("D3").format.numberFormat = "yyyy-mm-dd";

applyTitle(instructions, "A1:D1", "Cómo usar esta plantilla");
instructions.getRange("A3:D14").values = [
  ["Paso", "Qué hacer", "Dónde", "Nota"],
  ["1", "Publica el generador en Vercel o Netlify.", "Generador web", "Copia la URL final."],
  ["2", "Pega la URL final en Configuración!B4.", "Configuración", "Debe terminar con / si es posible."],
  ["3", "Conecta Google Forms con Google Sheets.", "Google Forms", "Las respuestas llegarán a la hoja de respuestas."],
  ["4", "Asegura que las columnas del Forms coincidan con los encabezados.", "Respuestas Forms", "Puedes copiar los encabezados de esta plantilla."],
  ["5", "Copia la fórmula de O3 hacia abajo si agregas más filas.", "Respuestas Forms", "La fórmula crea el enlace personalizado."],
  ["6", "Busca el nombre de la persona y abre su enlace.", "Columna O", "El generador se abrirá con datos precargados."],
  ["7", "Revisa, completa campos específicos y genera el prompt.", "Generador", "Luego pega el prompt en ChatGPT, Gemini o Claude."],
  ["8", "Pasa el resultado a la plantilla correspondiente.", "Plantillas CADIR", "CV, presentación, descripción profesional o emprendimiento."],
  ["", "", "", ""],
  ["Parámetros usados", "name, age, date, professional, interests, skills, hasExperience, experience, supports, objective, route, routeGoal, internalContext", "", ""],
  ["Privacidad", "Evita publicar la hoja completa. Comparte enlaces solo con el equipo autorizado de CADIR.", "", ""],
];
styleHeader(instructions.getRange("A3:D3"));
styleInput(instructions.getRange("A4:D14"));
instructions.getRange("A:A").format.columnWidth = 16;
instructions.getRange("B:B").format.columnWidth = 64;
instructions.getRange("C:C").format.columnWidth = 24;
instructions.getRange("D:D").format.columnWidth = 48;

const formulaErrors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
console.log(formulaErrors.ndjson);

const preview = await workbook.render({
  sheetName: "Respuestas Forms",
  range: "A1:O12",
  scale: 1,
  format: "png",
});
await fs.writeFile(
  `${outputDir}/respuestas_forms_preview.png`,
  new Uint8Array(await preview.arrayBuffer()),
);

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(`${outputDir}/plantilla_google_forms_puente_laboral_cadir.xlsx`);
