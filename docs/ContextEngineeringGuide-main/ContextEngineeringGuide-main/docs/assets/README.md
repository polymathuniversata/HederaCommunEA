# docs/assets/

This folder holds images and static assets used by the documentation pages.

Guidelines

- Put images used by docs in `docs/assets/` or in the same folder as the markdown that references them.
- Use descriptive, dash-separated filenames (e.g. `deployment-diagram.png`, `token-flow.svg`).
- Prefer SVG for diagrams and PNG/JPEG for screenshots.
- When referencing images in markdown, use relative links:
  - From `docs/deployment/Hedera-dApp-Deployment-Guide.md`: `![diagram](../assets/deployment-diagram.svg)`
- Keep file sizes reasonable (optimize screenshots); large images can be added to the repo only when necessary.
- If you add new assets, update the relevant `docs/<phase>/README.md` to mention them if helpful.
