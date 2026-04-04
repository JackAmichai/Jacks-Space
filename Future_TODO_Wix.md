# Future TODO: Professional Update (Transition to Wix)

## Overview
This document outlines the required updates to transition Jack Amichai's portfolio to reflect his new role as a **Solutions Engineer at Wix**, and the conclusion of his previous roles at Deloitte and Adi Ohayon Revenue Management.

---

## 1. Professional Timeline Updates

### Deloitte
- **Current Status:** Junior Consultant (SAP BTP & Integrations)
- **Update:** Set end date to **March 2026**.
- **Files to Modify:**
  - `translations.js`: Update `exp_deloitte_date` (if exists) or vertical timeline dates.
  - `index.html`: Update the vertical timeline year range.
  - `script.js`: Update the horizontal timeline data points.

### Adi Ohayon Revenue Management
- **Current Status:** Freelance Data Engineer
- **Update:** Set end date to **April 2026**.
- **Files to Modify:**
  - `translations.js`: Update `exp_freelance_date` or relevant strings.
  - `index.html`: Update vertical timeline.
  - `script.js`: Update horizontal timeline.

### Wix.com
- **New Role:** Solutions Engineer
- **Start Date:** **April 2026**
- **Action:** Add this as the top-most/current role.
- **Content to Add:**
  - **Title:** Solutions Engineer
  - **Company:** Wix.com
  - **Description:** Architecting tailored solutions for Wix's enterprise-tier users, bridging advanced platform capabilities with specific business goals.
  - **Tech Stack Tags:** System Architecture, Pre-Sales, Enterprise Solutions, API Integration.

---

## 2. Global Text & AI Assistant Updates

### Hero Section
- Update `hero_role` in `translations.js` to prioritize "Solutions Engineer at Wix".
- Update `hero_eyebrow` or `hero_tagline` to mention the transition if desired.

### AI Assistant (Cloud)
- Update `chatbot.js` and `translations.js` (bot knowledge base):
  - Change answers related to "where does Jack work?" or "current role".
  - Ensure the bot knows Jack has transitioned from Deloitte/Freelance to Wix.

### Role Fit Modal
- Update the "Solutions Engineer" card details to emphasize that this is Jack's current professional focus at Wix.

---

## 3. Implementation Steps (Plan)

1.  **Draft Wix Description:** Prepare localized strings for the Wix role in `translations.js` (English and Hebrew).
2.  **Surgical Date Updates:** Update all "Present" occurrences for Deloitte and Adi Ohayon to March/April 2026 respectively.
3.  **Visual Timeline Insert:** Add the Wix entry to the top of the vertical timeline in `index.html` and the corresponding point in the horizontal timeline in `script.js`.
4.  **Bot Re-training:** Update the local knowledge base in `chatbot.js` so the assistant is up-to-date with the new employment status.
5.  **Audit Links:** Check if any "Recruiter" resources or resumes need updating to a newer version that includes Wix.
