import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import TextField from "./TextField.jsx";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const initialTemplateForm = {
  title: "",
  description: "",
  materialName: "",
  fieldsText: "",
  outputTemplate: "",
  extraInstructions: "",
};

const cleanMarker = (marker) =>
  marker
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

const toOutputLabel = (marker) =>
  cleanMarker(marker)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

const extractTemplateMarkers = (text) => {
  const markers = new Map();
  const variants = [
    text,
    text.replace(/\s+/g, ""),
    text.replace(/\s+/g, " "),
  ];

  variants.forEach((variant) => {
    const matches = variant.matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g);
    Array.from(matches).forEach((match) => {
      const marker = cleanMarker(match[1]);
      if (marker) {
        markers.set(marker.toLowerCase(), marker);
      }
    });
  });

  return Array.from(markers.values());
};

const buildOutputTemplateFromMarkers = (markers) =>
  markers.map((marker) => `${toOutputLabel(marker)}:`).join("\n");

const getFileNameWithoutExtension = (fileName) =>
  fileName.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ");

export default function CustomTemplatePanel({ onCreateTemplate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialTemplateForm);
  const [feedback, setFeedback] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const updateField = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }));
    setFeedback("");
  };

  const handlePdfImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setFeedback("Leyendo PDF de Canva...");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
      }).promise;
      const pageTexts = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => item.str || "")
          .join("");
        const pageTextWithSpaces = textContent.items
          .map((item) => item.str || "")
          .join(" ");
        pageTexts.push(pageText, pageTextWithSpaces);
      }

      const markers = extractTemplateMarkers(pageTexts.join("\n"));

      if (markers.length === 0) {
        setFeedback(
          "No encontré campos tipo {{NOMBRE}}. En Canva, agrega marcadores con doble llave y vuelve a exportar el PDF.",
        );
        return;
      }

      setFormData((current) => ({
        ...current,
        title: current.title || getFileNameWithoutExtension(file.name),
        description:
          current.description ||
          "Plantilla importada desde un PDF diseñado en Canva.",
        materialName:
          current.materialName ||
          `Contenido para completar la plantilla ${getFileNameWithoutExtension(
            file.name,
          )}`,
        fieldsText: markers.join("\n"),
        outputTemplate: buildOutputTemplateFromMarkers(markers),
        extraInstructions:
          current.extraInstructions ||
          "Genera textos breves y listos para copiar en los espacios de la plantilla visual.",
      }));
      setIsOpen(true);
      setFeedback(
        `Detecté ${markers.length} campo(s): ${markers.join(", ")}. Revisa la estructura y guarda la plantilla.`,
      );
    } catch {
      setFeedback(
        "No pude leer el PDF. Prueba exportarlo desde Canva como PDF estándar o crea la plantilla manualmente.",
      );
    } finally {
      setIsImporting(false);
      event.target.value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasTitle = formData.title.trim().length > 0;
    const hasFields = formData.fieldsText
      .split("\n")
      .some((field) => field.trim().length > 0);
    const hasOutputTemplate = formData.outputTemplate.trim().length > 0;

    if (!hasTitle || !hasFields || !hasOutputTemplate) {
      setFeedback(
        "Completa al menos el nombre, los campos necesarios y la estructura de salida.",
      );
      return;
    }

    onCreateTemplate(formData);
    setFormData(initialTemplateForm);
    setFeedback("Plantilla agregada. Ya puedes elegirla como ruta.");
    setIsOpen(false);
  };

  return (
    <section className="rounded-[1.75rem] border border-cadir-cyan/30 bg-cadir-cyanSoft p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cadir-purple">
            Plantillas personalizadas
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-700">
            Crea una nueva plantilla para que el generador pida sus campos y
            arme un prompt específico.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsOpen((current) => !current);
            setFeedback("");
          }}
          className="rounded-full bg-cadir-purple px-5 py-3 text-sm font-black text-white shadow-glow transition hover:bg-cadir-ink focus:outline-none focus:ring-4 focus:ring-cadir-cyan/30"
        >
          {isOpen ? "Cerrar plantilla" : "Agregar plantilla"}
        </button>
      </div>

      {feedback && (
        <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-cadir-purple">
          {feedback}
        </p>
      )}

      {isOpen && (
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              id="custom-template-title"
              label="Nombre de la plantilla"
              value={formData.title}
              onChange={(value) => updateField("title", value)}
              placeholder="Ejemplo: Carta de presentación"
              multiline={false}
            />
            <TextField
              id="custom-template-material"
              label="Material que debe generar"
              value={formData.materialName}
              onChange={(value) => updateField("materialName", value)}
              placeholder="Ejemplo: contenido para carta breve"
              multiline={false}
            />
          </div>

          <TextField
            id="custom-template-description"
            label="Descripción o uso de la plantilla"
            value={formData.description}
            onChange={(value) => updateField("description", value)}
            placeholder="Ejemplo: Para enviar a una empresa junto con el CV."
          />

          <TextField
            id="custom-template-fields"
            label="Campos que debe pedir la plantilla"
            value={formData.fieldsText}
            onChange={(value) => updateField("fieldsText", value)}
            placeholder={`Escribe un campo por línea. Ejemplo:
Empresa o entidad
Puesto al que se postula
Motivo de interés
Disponibilidad`}
          />

          <TextField
            id="custom-template-output"
            label="Estructura exacta de salida"
            value={formData.outputTemplate}
            onChange={(value) => updateField("outputTemplate", value)}
            placeholder={`Ejemplo:
NOMBRE:
EMPRESA:
PUESTO:
CARTA BREVE:
DATOS PENDIENTES:`}
          />

          <TextField
            id="custom-template-instructions"
            label="Instrucciones especiales, si aplica"
            value={formData.extraInstructions}
            onChange={(value) => updateField("extraInstructions", value)}
            placeholder="Ejemplo: que sea formal, máximo 120 palabras, sin inventar experiencia."
          />

          <button
            type="submit"
            className="w-full rounded-full bg-cadir-cyan px-5 py-3 font-black text-cadir-ink shadow-glow transition hover:bg-cadir-purple hover:text-white focus:outline-none focus:ring-4 focus:ring-cadir-cyan/30"
          >
            Guardar plantilla personalizada
          </button>
        </form>
      )}
    </section>
  );
}
