---
name: Despliegue SaaS Premium (Salon Plus Style)
description: Guía y templates para desplegar rápidamente una aplicación SaaS con diseño premium, glassmorphism y calendario complejo, basada en la arquitectura de 'Agenda Plus'.
---

# Despliegue de SaaS Premium

Este skill permite replicar la arquitectura y diseño de "Agenda Plus" (Salon Plus) para nuevos proyectos. Utiliza un stack de React + Vite con un diseño visual "Premium" basado en Vanilla CSS y Glassmorphism.

## Requisitos Previos

- Node.js instalado
- NPM o PNPM

## Paso 1: Inicialización del Proyecto

1.  Crear el proyecto con Vite:
    ```bash
    npm create vite@latest nombre-del-proyecto -- --template react
    cd nombre-del-proyecto
    npm install
    ```

2.  Instalar dependencias clave:
    ```bash
    npm install lucide-react date-fns
    ```
    *(Otras dependencias como `recharts` o `framer-motion` pueden ser necesarias según la complejidad)*

## Paso 2: Arquitectura de Carpetas

Establece la siguiente estructura en `src/`:

```text
src/
├── components/      # Componentes UI reutilizables
├── pages/           # Vistas principales (Dashboard, Agenda, etc.)
├── services/        # Lógica de negocio y API calls
├── stores/          # Estado global (Context o Zustand)
├── App.jsx          # Router principal
├── Layout.jsx       # Shell de la aplicación (Sidebar + Header)
└── index.css        # Sistema de diseño global
```

## Paso 3: Implementación del Diseño

Copiar los archivos template a sus ubicaciones respectivas:

1.  **Estilos Globales (`index.css`):**
    Reemplaza `src/index.css` con el contenido de `templates/index.css`.
    *Esto define variables CSS, glassmorphism, botones premium y tipografía.*

2.  **Layout Principal (`Layout.jsx`):**
    Copiar `templates/Layout.jsx`.
    *Este componente maneja el Sidebar colapsable, la navegación y el Header flotante.*

3.  **Calendario/Agenda (`Agenda.jsx`):**
    Copiar `templates/Agenda.jsx`.
    *Implementación base de la grilla horaria compleja.*

4.  **Entry Point (`App.jsx`):**
    Actualizar `src/App.jsx` con `templates/App.jsx`.

## Paso 4: Personalización

-   **Colores**: Edita las variables `--primary` y `--primary-gradient` en `index.css` para cambiar la identidad de marca.
-   **Menú**: Modifica el array `menuItems` en `Layout.jsx` para agregar o quitar secciones.
-   **Lógica**: Conecta `Agenda.jsx` con tu base de datos o estado global real.

## Recursos del Diseño

-   **Fuente**: 'Outfit' (Google Fonts). Asegúrate de importarla en `index.html`.
-   **Iconos**: Utilizamos `lucide-react` por su consistencia.
-   **Sombras**: Utilizamos una sombra suave definida en `--shadow-pro`.

---
*Skill creado automáticamente por Antigravity a petición del usuario.*
