# Browser Extension Manager

Frontend Mentor challenge – Browser extensions manager UI built with HTML, CSS, JavaScript, and Bootstrap.

A solution to the [Browser Extensions Manager UI Challenge](https://www.frontendmentor.io/challenges) on Frontend Mentor.

## Overview

A browser extension manager interface that lets users view, filter, toggle, and remove browser extensions. Supports light and dark mode with persistence across page reloads.

## Features

- Display extension cards loaded dynamically from a local `data.json` file
- Filter extensions by **All**, **Active**, and **Inactive** status
- Toggle extensions on/off in real time using a switch — updates filter view instantly
- Remove extensions from the list
- Light/Dark mode toggle with icon swap
- Active filter and theme preference persisted via `localStorage` across reloads

## Built With

- Semantic HTML5
- CSS3 with custom properties
- [Bootstrap 5](https://getbootstrap.com/) — layout, grid, cards, form switches, and utility classes
- Vanilla JavaScript (no frameworks)

## What I Learned

- Fetching and rendering data from a local JSON file using the `fetch` API
- Managing application state (extensions array, active filter) in plain JS
- Using `localStorage` to persist UI state across reloads
- Dynamically wiring up event listeners to elements created at runtime
- Using `body.dark-mode` as a CSS ancestor to style all child components without touching them in JS
- Fixing Bootstrap's toggle switch appearance using a custom SVG `background-image`

## Project Structure

```
├── assets/
│   └── images/         # Extension logos, favicon, and theme icons
├── data.json            # Extensions data (name, description, logo, isActive)
├── styles/
│   └── index.css        # Custom styles and dark mode overrides
├── js/
│   └── theme.js         # All JS logic (theme, filtering, rendering)
└── index.html
```

## How It Works

The extensions are loaded from `data.json` on page load. Each extension object contains a `name`, `description`, `logo` path, and `isActive` boolean. Cards are rendered dynamically into a Bootstrap grid. The toggle switch mutates `isActive` directly on the source array and re-renders the current filter view. Removing an extension splices it from the array and re-renders. Dark mode and the active filter are saved to `localStorage` and restored immediately on load before any rendering happens.

## Acknowledgements

- Challenge by [Frontend Mentor](https://www.frontendmentor.io/)
- Built by [Your Name](https://github.com/your-username)
