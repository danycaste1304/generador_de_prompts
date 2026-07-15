import { useState } from "react";
import TextField from "./TextField.jsx";

const initialTemplateForm = {
  title: "",
  description: "",
  materialName: "",
  fieldsText: "",
  outputTemplate: "",
  extraInstructions: "",
};

export default function CustomTemplatePanel({ onCreateTemplate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialTemplateForm);
  const [feedback, setFeedback] = useState("");

  const updateField = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }));
    setFeedback("");
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
