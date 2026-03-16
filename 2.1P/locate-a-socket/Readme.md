# Locate a Socket — EV Charging Station Web Application

**Unit:** SIT725 — Applied Software Engineering  
**Task:** 2.1P — Software Requirements Specification  
**Student:** MUHAMMAD NOUMAN QAISER | Student ID: 224114075  
**University:** Deakin University  

---

## About This Repository

This repository contains my submission for **SIT725 Task 2.1P**. The task required writing a Software Requirements Specification (SRS) document for a proposed web application called **"Locate a Socket"** — a location-based platform that helps electric vehicle (EV) drivers find, access, and pay for charging stations along their routes.

---

## The Application — Locate a Socket

> *"The rising adoption of electric vehicles necessitates an increased availability of charging stations. The objective is to develop a business model for a web application named 'Locate a Socket.' This application aims to assist electric vehicle drivers in finding charging stations conveniently along their routes."*

### What it does

- Find nearby EV charging stations on an interactive map
- Check real-time availability, pricing, and connector type
- Get turn-by-turn directions to a selected station
- Start and stop charging sessions
- Pay securely online and receive a digital receipt
- Station owners can manage their listings
- Admins can monitor and manage the platform

---

## Repository Contents

```
📦 locate-a-socket/
├── README.md                  ← You are here
└── SRS_LocateASocket.PDF      ← Full SRS document (Task 2.1P submission)
```

---

## SRS Document Structure

The SRS follows the **IEEE ISO/IEC/IEEE 29148:2018** standard and the Lecture 2 structure:

| Section | Content |
|---------|---------|
| **1. Introduction** | Purpose, scope, conventions, acronyms, references |
| **2. Overall Description** | Product perspective, functions, user classes, environment, constraints |
| **3. Specific Requirements** | Functional (FR1–FR8), external interfaces, non-functional requirements |
| **4. Supporting Models** | Use Case Diagram, System Architecture Diagram, references |

---

## System Architecture

```
┌──────────────────────────────────────────────────┐
│                  Client Layer                    │
│     Web Browser (Desktop)  |  Mobile Browser     │
│            React UI · HTTPS · JWT                │
└─────────────────────┬────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────┐
│       Application Layer  (Node.js / Express)     │
│  Auth  |  Station Service  |  Session  |  Payment│
└──────────────┬───────────────────┬───────────────┘
               │                   │
┌──────────────▼──────┐  ┌─────────▼──────────────┐
│     Data Layer      │  │    External Services    │
│  PostgreSQL DB      │  │  Google Maps / Mapbox   │
│  Logs & Receipts    │  │  Stripe / PayPal        │
└─────────────────────┘  └────────────────────────┘
```

---

## Use Case Summary

| Actor | Use Cases |
|-------|-----------|
| **EV Driver** | Register/Login, Search Stations, View Details, Get Directions, Start/Stop Session, Make Payment |
| **Station Owner** | Register Station, Update Listing, Deactivate Station |
| **Administrator** | Manage Users, View Logs, Resolve Disputes |

---

## Tech Stack (Proposed)

| Layer | Technology |
|-------|------------|
| Frontend | React.js, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Auth | JWT |
| Maps | Google Maps API / Mapbox |
| Payments | Stripe / PayPal |

---

## How to View the SRS

1. Clone or download this repository
2. Open `SRS_LocateASocket.docx` in Microsoft Word or Google Docs or PDF reader.

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

---

## References

- IEEE. (2018). *ISO/IEC/IEEE 29148:2018 — Requirements engineering*. IEEE.
- Sommerville, I. (2016). *Software Engineering* (10th ed.). Pearson Education.
- OWASP Foundation. (2023). *OWASP Top Ten*. https://owasp.org/www-project-top-ten/
- PCI Security Standards Council. (2022). *PCI DSS v4.0*. https://www.pcisecuritystandards.org/

---

## Academic Integrity

This work is submitted in accordance with Deakin University's academic integrity policy.  
© MUHAMMAD NOUMAN QISER — SIT725, Deakin University. All rights reserved.