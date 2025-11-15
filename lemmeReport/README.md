
# LemmeReport
LemmeReport is a lightweight, browser-based community safety reporting platform designed for municipal authorities, police departments, citizens, and public infrastructure teams. It enables residents to report issues with geolocation, media, and category metadata, while enabling stakeholders to visualize these reports through integrated dashboards.

The project is structured as a pure front-end MVP suitable for hackathons, early demonstrations, and static hosting platforms such as GitHub Pages. All logic executes locally in the browser, allowing zero-setup deployment.

---

## Overview

LemmeReport demonstrates how an accessible, low-infrastructure platform can improve civic reporting, transparency, and participatory community safety. By combining structured input forms, map interfaces, and a modular data layer, the application provides both citizen-facing and authority-facing experiences.

The solution is intentionally designed to support future backends and analytics engines without altering the core UI or front-end logic.

---

## Core Features

### Citizen Reporting Module
- Category-based reporting (Safety, Infrastructure, Waste, Community, Utilities, Digital/Administrative).
- Rich text descriptions with guidance for proper issue documentation.
- Optional geolocation capture with fallback to manual coordinate entry.
- Map preview using Leaflet/OpenStreetMap.
- Optional image upload.
- Basic image authenticity validation (EXIF-based metadata inspection).
- In-browser cooldown throttling to prevent spam.
- Automatically appended into local report streams for immediate feedback.
- Local JSON export for sharing, archival, or offline analysis.

### Citizen Feed & Discovery
- Real-time loading of local reports from in-memory storage.
- Map-based view of nearby reports.
- Semantic color coding and iconography based on category.
- Responsive card-based layout optimized for mobile and desktop environments.

### Municipality Dashboard (Demo Mode)
- Consolidated overview of civic issues: road damage, lighting, waste, water leaks, and utilities.
- KPI block components showing trends, counts, and priority levels.
- Simplified infrastructure-level indicators for demonstration.
- Live feed of incoming citizen submissions.
- Heat-style spatial aggregation over the map layer (MVP approximation).

### Police Dashboard (Demo Mode)
- Categorized overview of public safety and harassment reports.
- Summaries of high-priority alerts and severity markers.
- Internal metrics such as daily incident counts, top categories, and distribution.
- Streaming feed of high-risk reports.
- Spatial overview integrated with the map engine.

---

## Misuse Prevention and Integrity Measures

LemmeReport integrates multiple technical and UX safeguards intended to reduce misuse, falsified inputs, or abusive submissions.

### Current Safeguards
- **EXIF-based authenticity check**: basic heuristics to detect missing metadata in uploaded images.
- **Client-side rate limiting**: a configurable cooldown preventing rapid successive submissions.
- **Input constraints**: required fields, controlled category selection, size limits on uploads.
- **Front-end validation**: prevention of malformed submissions or code injection attempts.
- **UI guardrails**: explicit warnings, confirmations, and anti-spam measures.

### Planned Safeguards
- Multi-stage image authenticity checks (noise analysis, compression artefact assessment).
- Server-side confirmation layer for image classification and forgery detection.
- Abuse-flagging system for suspicious or repeated reports.
- Reputation scoring for frequent submitters.
- Automated moderation queue for authorities.
- Geographical anomaly alerts (spoofing detection).
- Dedicated audit logs for each modification or submission.

---

## Upcoming Enhancements

The following enhancements have been architected but are not yet fully implemented. The system is structured to support them without requiring major redesign:

### Backend & Data Storage
- Google Sheets / Apps Script backend for multi-user persistent storage.
- Firebase Firestore integration for real-time syncing.
- Supabase or similar REST-database integration.
- Direct API endpoints for ingestion by city/municipal systems.

### Intelligence & Analytics
- Automated categorization of issues via lightweight ML models.
- Anomaly detection for repeated patterns.
- Predictive distributions for municipal resource allocation.
- Clustering of reports for heatmaps with dynamic resolution.
- AI-assisted summarization and tagging for municipal operators.

### Media & Authenticity Enhancements
- Noise-signature based image authenticity scoring.
- Advanced metadata consistency checks.
- Multi-model AI image detection (local + cloud options).
- Device-fingerprinting of camera sensor patterns (CFA pattern inconsistency detection).

### User Experience & Visualization
- Multi-layer map views (infrastructure, safety, utilities).
- User profile system with anonymous mode.
- Bookmarking of locations and incident types.
- Filterable search interface for historical reports.

### Administrative Controls
- Multi-role login: Citizen, Municipality, Police, Supervisor.
- Priority escalation and SLA-based workflow.
- Commenting and progress tracking for each report.
- PDF and CSV export for administrative reporting.

---

## Architecture

The architecture is intentionally modular, with clear boundaries separating UI, application logic, data storage, and external integrations. The separation ensures that the front-end can operate as a complete MVP without any backend, while still supporting future upgrades.

The diagram below captures the components currently implemented and those planned for future integration. Components are intentionally not labeled as current or upcoming to demonstrate full system potential.



```
                                 +-----------------------------+
                                 |         Browser UI          |
                                 |       (HTML / CSS)          |
                                 +---------------+-------------+
                                                 |
                                                 v
                            +------------------------------------------+
                            |           Front-End Application          |
                            |------------------------------------------|
                            | - Form engine                            |
                            | - Report creation module                 |
                            | - Map engine (Leaflet / OSM)             |
                            | - File processor & image validator        |
                            | - Local in-memory datastore (reports[])   |
                            | - Render pipeline for dashboards          |
                            +------------------------------------------+
                                                 |
                                                 v
                       +-------------------------------------------------------+
                       |                Data Interface Layer                   |
                       |-------------------------------------------------------|
                       | - JSON export/import                                  |
                       | - Client-side rate limiting                           |
                       | - Input sanitization and validation                   |
                       | - Optional network transport modules (extensible)     |
                       +-------------------------------------------------------+
                                                 |
                                                 v
      +----------------------------------------------------------------------------+
      |                           External Integrations                             |
      |----------------------------------------------------------------------------|
      |                                                                            |
      |   +---------------------------+   +---------------------------+            |
      |   |    Persistence Backends   |   |     Analytics Engines     |            |
      |   |---------------------------|   |---------------------------|            |
      |   | - Google Sheets API       |   | - Pattern detection       |            |
      |   | - Firebase Firestore      |   | - ML classification       |            |
      |   | - Supabase REST API       |   | - Trend modelling         |            |
      |   | - Custom REST gateway     |   | - Predictive allocation   |            |
      |   +---------------------------+   +---------------------------+            |
      |                                                                            |
      |   +---------------------------+   +---------------------------+            |
      |   |      Media Validation     |   |   Moderation & Security   |            |
      |   |---------------------------|   |---------------------------|            |
      |   | - EXIF metadata parser    |   | - Abuse prevention layer  |            |
      |   | - Compression/noise scan  |   | - Rate limiting           |            |
      |   | - Authenticity heuristics |   | - Spoofing detection      |            |
      |   | - Multi-model checking    |   | - Reputation scoring      |            |
      |   +---------------------------+   +---------------------------+            |
      |                                                                            |
      +----------------------------------------------------------------------------+

                                                 |
                                                 v
                            +----------------------------------------+
                            |                Operators               |
                            |----------------------------------------|
                            | - Municipality dashboard               |
                            | - Police dashboard                     |
                            | - Data exports                         |
                            | - Decision support systems             |
                            +----------------------------------------+
```



## File Structure

```

/  
├── index.html Main application interface  
├── styles.css Application styling  
├── app.js Core logic and data flow  
├── assets/ Icons, images, and branding  
└── README.md Project documentation

````

---

## Running Locally

This project requires no build system. Simply open the `index.html` file in any modern browser.

For a cleaner local test environment:
```bash
npx serve
````

---

## Deployment on GitHub Pages

1. Push the repository to GitHub.
    
2. Go to **Settings → Pages**.
    
3. Select `main` as the source.
    
4. Save and wait for GitHub Pages to publish.
    

---

## Security Considerations

- No persistent personal data is stored.
    
- All processing is local unless an external backend is added.
    
- Optional backend integrations are recommended to implement authentication, authorization, auditing, and advanced moderation workflows.
    

---

## License

MIT License. You may fork, modify, and redistribute without restriction.
