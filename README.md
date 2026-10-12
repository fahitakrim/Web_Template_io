# Web_Template_io

Centralized design system and site template repository organized by **design type** so any aesthetic, layout, or interactive pattern can be called on demand.

---

## Directory Architecture

```text
Web_Template_io/
├── index.html                        # Interactive Template Hub & Live Preview Launcher
├── templates.json                    # Machine- & AI-readable registry of all templates
├── README.md                         # Documentation & quick lookup table
└── templates/
    ├── portfolio/                    # Personal portfolios, generalist & developer showcases
    │   └── muse-wonder/              # [Template 01] Editorial AI Generalist Portfolio
    │       ├── index.html            # Original standalone site (untouched)
    │       ├── style.css             # Responsive dark/light theme & typography
    │       ├── app.js                # Canvas animations, braille scramble, tabs
    │       ├── fonts/                # Included FieldMono WOFF font & license
    │       ├── README.txt            # Original template instructions
    │       └── template.json         # Template design tokens & metadata manifest
    ├── landing-page/                 # SaaS, product launches, startup marketing pages
    ├── editorial/                    # Long-form essays, research stories, blogs
    ├── agency-studio/                # Creative studios, motion showcases
    ├── dashboard-app/                # AI interfaces, web apps, dashboards
    └── ecommerce/                    # Storefronts, digital product catalogs
```

---

## Template Registry (Call by ID or Design Type)

| ID | Name | Category | Style Archetype | Key Features | Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`muse-wonder`** | **Muse Wonder** | `portfolio` / `editorial` | Research Lab · Monospace Editorial · Interactive Canvas | Interactive ASCII/dot-matrix hero canvas, procedural 16s intro film, braille text-scramble headings, sticky scroll-spy TOC, dark/light mode, generative tabs | `templates/portfolio/muse-wonder/` |

---

## How to Call a Design Type

When building a new site or prompting an AI coding assistant, you can reference this repository by:

1. **By Template ID:**
   > *"Use the `muse-wonder` template from `Web_Template_io` (`templates/portfolio/muse-wonder`) for this site."*
2. **By Design Category or Tags (via `templates.json`):**
   > *"Check `templates.json` in `Web_Template_io` for a `portfolio` or `editorial` design with `interactive-canvas` and `monospace`."*

---

## How to Add a New Template

1. Choose the appropriate category folder under `templates/<category>/<template-slug>/` (e.g., `templates/landing-page/nova-saas/`).
2. Place the site's original files (`index.html`, `style.css`, `app.js`, assets) inside that folder.
3. Add a `template.json` manifest in the template folder and append an entry to the root `templates.json` catalog.
4. Commit and push to `main`.

---

## Running Locally

From the repository root:

```bash
py -m http.server 8000
```

- **Template Library Hub:** `http://localhost:8000/`
- **Muse Wonder (Direct Live Site):** `http://localhost:8000/templates/portfolio/muse-wonder/`
