# Contributing

Thanks for wanting to contribute! A few simple conventions keep the repo tidy and make it easy for contributors and reviewers.

Repository conventions
- Keep long-form guide content inside the `docs/` folder. Each phase or topic should have its own markdown file (for example `docs/deployment/Hedera-dApp-Deployment-Guide.md`).
- Use `README.md` files inside each `docs/<phase>/` folder as a short index that points to the longer documents in that folder. The `README.md` should be 8–12 lines max.
- The root `README.md` is an index and should not contain long-form content. Use it to surface badges, a short table-of-contents, and links to the phase README files.
- File naming: use human-friendly, dash-separated names, e.g. `Ideation-Phase-Quick-Guide.md` or `Hedera-AI-Agent-Kit-Development-Guide.md`.

How to add or edit content
1. Fork the repo and create a feature branch.
2. Add or update content inside `docs/<phase>/`. If you're adding a long guide, prefer creating a new file and updating the phase `README.md` to link to it.
3. Keep commits focused and write clear PR descriptions describing what changed and why.

Examples
- Good: add `docs/ideation/New-Workshop-Worksheet.md` and update `docs/ideation/README.md` to link to it.
- Bad: paste the entire ideation guide into the root `README.md`.

Style notes
- Use Markdown. Keep images in the same folder as the markdown that references them or in a central `docs/assets/` folder and link relatively.

Assets
- Shared assets: put general documentation images and shared static assets under `docs/assets/`.
- Phase- or page-specific assets: if a phase has many images, create a small `assets/` subfolder inside that phase, e.g. `docs/deployment/assets/`. This keeps large or numerous images scoped and easier to manage.
- Placement rules:
  - Use `docs/assets/` for images that are reused across multiple pages.
  - Use `docs/<phase>/assets/` or place images next to the markdown file when images are specific to a single page.
  - Always reference images with relative paths so links work in forks and local previews (for example from `docs/deployment/Hedera-dApp-Deployment-Guide.md`: `![diagram](../assets/deployment-diagram.svg)` or `![screenshot](./assets/deploy-1.png)`).
- Filenames: use lowercase, dash-separated names, and include a short descriptor and file type, e.g. `deployment-diagram.svg`.
- Prefer SVG for diagrams; use PNG/JPEG for screenshots. Optimize images to reduce repo size.
- Large images: avoid checking very large files into the repo. If a file must be large, consider hosting it externally and linking to it, but prefer local assets for reproducibility.
- When adding assets, update the related `docs/<phase>/README.md` or the specific markdown file to reference them with a relative path and a short caption where helpful.
- Avoid committing secrets. Use `.env` for private keys and add `.env` to `.gitignore` if needed.

Previewing documentation locally

If you'd like to preview markdown locally as HTML, a small helper script is provided at `scripts/preview_markdown.py`.

Quick steps:

1. (Optional) Install the Python markdown package if you don't have it:

	pip install markdown

2. Generate a preview HTML for a given markdown file (example uses the repo root):

	python scripts/preview_markdown.py CONTRIBUTING.md

	This writes `preview_CONTRIBUTING.html` in the current working directory.

3. Serve the file to view it in your browser:

	python -m http.server

	Then open `http://localhost:8000/preview_CONTRIBUTING.html` in your browser.

Notes on docs structure and per-folder files

- The current repo structure already uses `README.md` inside each `docs/<phase>/` folder as a short index - keep this convention. Use those `README.md` files for short pointers (8–12 lines) and to surface phase-specific assets or examples.
- For phase-specific configuration, examples or templates it's fine to add small helper files in the root of the phase folder (for example `docs/deployment/EXAMPLES.md`, `docs/research/TEMPLATES.md`, or `docs/ideation/WORKSHEET.md`). These should be descriptive and linked from the phase `README.md`.
- Recommendation: keep long-form guides as standalone markdown files and keep each phase folder's root limited to index/readme, a small `assets/` folder if needed, and 1–3 supportive files (examples, templates, checklists). This keeps navigation predictable and reviewer-friendly.

Questions
- Open an issue or reach out on the repo for guidance.

Thanks - maintainers
