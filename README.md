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
    ├── landing-page/                 # SaaS, product launches, startup marketing pages
    │   └── nova-saas/                # [Template 02] Modern AI SaaS / Aceternity & Magic UI
    ├── dashboard-app/                # AI interfaces, web apps, dashboards
    │   └── apex-analytics/           # [Template 03] Tremor KPI & shadcn Minimalist Dashboard
    ├── agency-studio/                # Creative studios, motion showcases
    │   └── kinetic-craft/            # [Template 04] Luxury Agency / Framer Motion Physics
    ├── editorial/                    # Long-form essays, research stories, blogs
    └── ecommerce/                    # Storefronts, digital product catalogs
```

---

## Template Registry (Call by ID or Design Type)

| ID | Name | Category | Style Archetype | Key Features | Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`muse-wonder`** | **Muse Wonder** | `portfolio` / `editorial` | Research Lab · Monospace Editorial · Interactive Canvas | Interactive ASCII/dot-matrix hero canvas, procedural 16s intro film, braille text-scramble headings, sticky scroll-spy TOC, dark/light mode, generative tabs | `templates/portfolio/muse-wonder/` |
| **`nova-saas`** | **Nova SaaS** | `landing-page` / `agency-studio` | Modern AI SaaS · Aceternity Spotlight & Grid · Magic UI | Mouse-tracking ambient spotlight, animated retro grid canvas, rotating border-beam cards, 3D card tilt, animated stat counters, annual/monthly billing toggle | `templates/landing-page/nova-saas/` |
| **`apex-analytics`** | **Apex Analytics** | `dashboard-app` / `landing-page` | Minimalist Telemetry · Tremor KPI Cards · shadcn Table | Collapsible telemetry sidebar, Tremor-style KPI cards with SVG sparklines, interactive multi-metric canvas area chart with tooltips, filterable & searchable data table | `templates/dashboard-app/apex-analytics/` |
| **`kinetic-craft`** | **Kinetic Craft** | `agency-studio` / `portfolio` | Awwwards Luxury Agency · Framer Motion · Magnetic Interactions | Spring magnetic cursor physics with trailing follower, magnetic action buttons, 3D tilt case study cards, continuous award ticker, interactive services accordion | `templates/agency-studio/kinetic-craft/` |

---

## How to Call a Design Type

When building a new site or prompting an AI coding assistant, you can reference this repository by:

1. **By Template ID:**
   > *"Use the `nova-saas` template from `Web_Template_io` (`templates/landing-page/nova-saas`) for this site."*
2. **By Design Category or Tags (via `templates.json`):**
   > *"Check `templates.json` in `Web_Template_io` for a `dashboard-app` with `tremor`, `sparklines`, and `canvas-chart`."*

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
- **Muse Wonder:** `http://localhost:8000/templates/portfolio/muse-wonder/`
- **Nova SaaS:** `http://localhost:8000/templates/landing-page/nova-saas/`
- **Apex Analytics:** `http://localhost:8000/templates/dashboard-app/apex-analytics/`
- **Kinetic Craft:** `http://localhost:8000/templates/agency-studio/kinetic-craft/`
