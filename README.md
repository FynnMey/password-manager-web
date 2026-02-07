# Web Client (Blazor WASM)

## Overview
Das Web-Frontend auf Basis von Blazor WebAssembly. Diese Applikation dient als Benutzeroberfläche und nutzt die zentrale **Core Library** für sämtliche kryptographischen Operationen und API-Kommunikation.

## Features
* **UI/UX:** Responsive Dashboard für den Tresor-Zugriff.
* **Forms:** Validierte Formulare für Login, Registrierung und Datenerfassung.
* **Vault View:** Übersichtliche Darstellung und Verwaltung verschlüsselter Einträge.
* **Core Integration:** Nutzt die plattformunabhängige Library für maximale Sicherheit.

## Tech Stack
* **Framework:** Blazor WebAssembly (.NET)
* **Styling:** Tailwind CSS
* **Security:** JS Interop zur Einbindung von WebCrypto APIs (falls erforderlich).
* **Logic:** Shared Business Logic via Client-Core.

## Project Structure
```text
src/
 ├── Pages           # Razor Pages (Login, Vault, Settings)
 ├── Components      # Reusable UI Elements (Modals, Inputs)
 ├── Shared          # Layouts und Navigation
 ├── wwwroot         # Tailwind CSS, Static Assets
