# Puente Laboral CADIR

Prototipo web para generar prompts personalizados que CADIR puede copiar y pegar en herramientas como ChatGPT, Gemini o Claude.

La aplicación no usa backend, base de datos ni conexión directa con ninguna API de IA. Solo recopila información en el navegador y genera un prompt listo para copiar.

## Requisitos

- Node.js 18 o superior
- npm

## Ejecutar en local

```bash
npm install
npm run dev
```

En Windows, si PowerShell muestra un aviso sobre `npm.ps1` y la política de ejecución de scripts, usa:

```bash
npm.cmd install
npm.cmd run dev
```

Después abre la URL local que indique Vite, normalmente:

```bash
http://localhost:5173
```

## Crear versión de producción

```bash
npm run build
npm run preview
```

La carpeta final para publicar será `dist`.

## Publicar en Vercel

Vercel es la opción recomendada para mantener el generador actualizado desde un repositorio.

1. Sube este proyecto a GitHub, GitLab o Bitbucket.
2. Entra en [Vercel](https://vercel.com/) e inicia sesión.
3. Crea un proyecto nuevo con **Add New > Project**.
4. Importa el repositorio de `puente-laboral-cadir`.
5. Vercel debería detectar Vite automáticamente.
6. Revisa estos valores:
   - Framework Preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
7. Haz clic en **Deploy**.
8. Copia la URL final, por ejemplo `https://puente-laboral-cadir.vercel.app`.
9. Usa esa URL en Google Sites y en la plantilla de Google Sheets.

El archivo `vercel.json` incluido ayuda a que la app cargue correctamente como aplicación React/Vite.

## Publicar en Netlify

1. Sube el proyecto a GitHub, GitLab o Bitbucket.
2. Entra en Netlify y crea un sitio nuevo desde el repositorio.
3. Usa estos valores:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Publica y copia la URL final.
5. En Google Sites, enlaza o incorpora la herramienta.

## Automatizar desde Google Forms y Google Sheets

La app puede recibir datos por la URL. Esto permite que una respuesta de Google Forms abra el generador con campos ya rellenados.

Flujo recomendado:

1. Crea el Google Forms de ficha inicial.
2. Conecta el formulario a Google Sheets.
3. Publica esta app en Vercel o Netlify.
4. En la hoja de respuestas, crea una columna llamada `Enlace al generador`.
5. Usa una fórmula para construir un enlace con los datos de cada fila.

También se incluye una plantilla lista para adaptar en:

```text
outputs/forms-template/plantilla_google_forms_puente_laboral_cadir.xlsx
```

En esa plantilla solo debes cambiar la URL de ejemplo por la URL real de Vercel o Netlify cuando publiques el generador.

Ejemplo de URL:

```text
https://TU-SITIO.netlify.app/?name=Daniela&skills=Soy%20responsable&interests=Cocina&route=presentacion
```

Parámetros principales que reconoce la app:

- `name`
- `age`
- `date`
- `professional`
- `interests`
- `skills`
- `hasExperience`
- `experience`
- `supports`
- `objective`
- `route`
- `routeGoal`

También acepta nombres en español como `nombre`, `edad`, `fecha`, `profesional`, `intereses`, `habilidades`, `experiencia`, `apoyos`, `objetivo` y `ruta`.

Ejemplo de fórmula en Google Sheets, suponiendo que:

- A = Nombre y apellido
- B = Edad
- C = Fecha
- D = Profesional acompañante
- E = Actividades de interés
- F = Habilidades
- G = Experiencia sí/no
- H = Descripción de experiencia
- I = Apoyos o condiciones
- J = Objetivo principal
- K = Ruta
- L = Qué quiere lograr

```text
="https://TU-SITIO.netlify.app/?"&
"name="&ENCODEURL(A2)&
"&age="&ENCODEURL(B2)&
"&date="&ENCODEURL(C2)&
"&professional="&ENCODEURL(D2)&
"&interests="&ENCODEURL(E2)&
"&skills="&ENCODEURL(F2)&
"&hasExperience="&ENCODEURL(G2)&
"&experience="&ENCODEURL(H2)&
"&supports="&ENCODEURL(I2)&
"&objective="&ENCODEURL(J2)&
"&route="&ENCODEURL(K2)&
"&routeGoal="&ENCODEURL(L2)
```

Cuando se abre ese enlace, la app muestra un aviso de “Ficha inicial cargada automáticamente”. El equipo de CADIR solo debe revisar, completar campos específicos de la ruta y generar el prompt.

## Nota de uso responsable

Los textos generados por herramientas de IA siempre deben revisarse con apoyo de CADIR antes de usarse. La app incluye esta advertencia en pantalla y dentro del prompt generado.
