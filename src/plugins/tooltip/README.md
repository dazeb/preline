# Tooltip & Popover

A tooltip is a floating, non-actionable label used to explain a user interface element or feature.

[![npm](https://img.shields.io/badge/npm-v4.2.0-blue)](https://www.npmjs.com/package/@preline/tooltip) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://preline.co/plugins/tooltip.html)

## Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Configuration Options](#configuration-options)
- [JavaScript API](#javascript-api)
- [Events](#events)
- [Common Patterns](#common-patterns)
- [License](#license)

## Overview

The Tooltip component provides contextual information when users hover over or focus on an element. It supports multiple placement options, customizable triggers, and integrates with Floating UI for advanced positioning.

**Key Features:**
- Multiple placement options (top, bottom, left, right, auto)
- Customizable trigger events (hover, focus)
- Floating UI integration for smart positioning
- Programmatic control via JavaScript API
- Event system for lifecycle hooks
- Accessibility support (ARIA attributes)

## Installation

To get started, install Tooltip & Popover plugin via npm, else you can skip this step if you are already using Preline UI as a package.

```bash
npm i @preline/tooltip
```

### CSS

Use [`@source`](https://tailwindcss.com/docs/functions-and-directives#source-directive) to register the plugin's JavaScript path for Tailwind CSS scanning, then [`@import`](https://tailwindcss.com/docs/functions-and-directives#import-directive) the plugin's CSS files into your Tailwind CSS file.

```css
@import "tailwindcss";

/* @preline/tooltip */
@source "../node_modules/@preline/tooltip/*.js";
@import "./node_modules/@preline/tooltip/variants.css";
@import "./node_modules/@preline/tooltip/theme.css";
```

### JavaScript

Include the JavaScript that powers the interactive elements near the end of your `</body>` tag:

```html
<script src="./node_modules/@preline/tooltip/index.js"></script>
```

### Manual Initialization

Use the `non-auto` entry if you need manual initialization. In this mode, automatic initialization on page load is not included, so the component should be initialized explicitly.

```html
<script type="module">
  import HSTooltip from "@preline/tooltip/non-auto.mjs";

  new HSTooltip(document.querySelector("#tooltip"));
</script>
```

### Via Bundler

When using a bundler (Vite, webpack, etc.), import the plugin directly as an ES module.

`@preline/tooltip` is the auto-init entry: it scans the DOM and initializes matching elements automatically.

```js
import "@preline/tooltip";
```

`@preline/tooltip/non-auto` is the manual entry: use it when you want explicit control over when initialization happens, either via `autoInit()` or by creating a specific instance yourself.

```js
import HSTooltip from "@preline/tooltip/non-auto";

HSTooltip.autoInit();

// Or initialize a specific element manually
const el = document.querySelector("#tooltip");
if (el) new HSTooltip(el);
```

### TypeScript

This package ships with TypeScript type definitions. No additional `@types/` package is needed.

## Basic usage

The following example demonstrates the minimal HTML structure required for a tooltip component. This is a base template without custom styling - you can apply your own CSS classes and styles as needed. The tooltip appears when hovering over the button.

```html
<div class="hs-tooltip [--placement:auto] inline-block">
  <button type="button" class="hs-tooltip-toggle">
    Hover me
    <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-white" role="tooltip">
      Tooltip on top
    </span>
  </button>
</div>
```

**Structure Requirements:**
- `hs-tooltip`: Required container wrapper
- `hs-tooltip-toggle`: Required element that triggers the tooltip (button, link, etc.)
- `hs-tooltip-content`: Required element containing the tooltip content
- Proper ARIA attributes (`role="tooltip"`)

## Configuration Options

### CSS Classes (Modifiers)

CSS class modifiers use Tailwind-style syntax with `--` prefix to control tooltip behavior.

| Class Modifier | Target Element | Values | Default | Description |
| --- | --- | --- | --- | --- |
| `[--trigger:*]` | `hs-tooltip` (container) | `"focus"` \| `"hover"` | `"hover"` | Event to trigger a tooltip. `hover` shows on mouse enter, `focus` shows on focus. |
| `[--placement:*]` | `hs-tooltip` (container) | `"auto"` \| `"top"` \| `"top-left"` \| `"top-right"` \| `"bottom"` \| `"bottom-left"` \| `"bottom-right"` \| `"right"` \| `"right-top"` \| `"right-bottom"` \| `"left"` \| `"left-top"` \| `"left-bottom"` | `"auto"` (top → bottom, left → right) | Tooltip placement relative to the trigger element. If `"auto"`, the tooltip will be positioned based on available space. |
| `[--strategy:*]` | `hs-tooltip` (container) | `"fixed"` \| `"absolute"` | `"absolute"` | Sets the position strategy. `fixed` positions relative to viewport, `absolute` positions relative to the nearest positioned ancestor. |
| `[--prevent-popper:*]` | `hs-tooltip` (container) | `"true"` \| `"false"` | `"false"` | Prevents Floating UI positioning calculation issues. Set to `"true"` if experiencing positioning problems. |

**Example:**
```html
<div class="hs-tooltip --trigger:focus --placement:bottom">
  <button class="hs-tooltip-toggle">Focus me</button>
  <span class="hs-tooltip-content">Tooltip content</span>
</div>
```

### Required CSS Classes

These classes define the structure and must be present for the tooltip to function.

| Class | Required On | Purpose |
| --- | --- | --- |
| `hs-tooltip` | Container wrapper | Groups the toggle and content elements together |
| `hs-tooltip-toggle` | Trigger element | The element that activates the tooltip (button, link, etc.) |
| `hs-tooltip-content` | Content element | The tooltip content that appears on trigger |

## JavaScript API

The `HSTooltip` object is available in the global `window` object after the plugin is loaded.

### Instance Methods

These methods are called on a tooltip instance.

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| `show()` | None | `void` | Forces the tooltip to show programmatically. |
| `hide()` | None | `void` | Forces the tooltip to hide programmatically. |
| `destroy()` | None | `void` | Destroys the tooltip instance, removes all generated markup, classes, and event listeners. Use when removing tooltip from DOM. |

### Static Methods

These methods are called directly on the `HSTooltip` class.

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| `HSTooltip.getInstance(target, isInstance)` | `target`: `HTMLElement \| string` (CSS selector)<br>`isInstance`: `boolean` (optional) | `{ id: string \| number, element: HSTooltip } \| HTMLElement \| null` | Returns the tooltip instance or element associated with the target. If `isInstance` is `true`, returns collection item object `{ id, element }` where `element` is the `HSTooltip` instance. If `isInstance` is `false` or omitted, returns the DOM element (`HTMLElement`). Returns `null` if tooltip instance is not found. |
| `HSTooltip.show(target)` | `target`: `HSTooltip \| HTMLElement \| string` (CSS selector) | `void` | Shows the tooltip identified by target. Accepts a tooltip instance, DOM element, or CSS selector string. Static alternative to instance `show()` method. |
| `HSTooltip.hide(target)` | `target`: `HSTooltip \| HTMLElement \| string` (CSS selector) | `void` | Hides the tooltip identified by target. Accepts a tooltip instance, DOM element, or CSS selector string. Static alternative to instance `hide()` method. |

### Usage Examples

**Example 1: Using instance methods (public API)**
```javascript
// Create a new tooltip instance
const tooltip = new HSTooltip(document.querySelector('#hs-tooltip'));
const showBtn = document.querySelector('#hs-show-btn');

// Show tooltip programmatically
showBtn.addEventListener('click', () => {
  tooltip.show();
});
```

**Example 2: Using static methods**
```javascript
const showBtn = document.querySelector('#hs-show-btn');

// Show tooltip using static method (no instance needed)
showBtn.addEventListener('click', () => {
  HSTooltip.show(document.querySelector('#hs-tooltip'));
});
```

**Example 3: Getting instance and using methods (recommended pattern)**
```javascript
// Get the tooltip instance
const instance = HSTooltip.getInstance('#hs-tooltip', true);

if (instance) {
  const { element } = instance; // element is the HSTooltip instance
  const showBtn = document.querySelector('#hs-show-btn');

  // Use instance methods
  showBtn.addEventListener('click', () => {
    element.show();
  });

  // Clean up when removing from DOM
  function removeTooltip() {
    element.destroy();
  }
}
```

**Example 4: Destroying tooltip instance**
```javascript
const instance = HSTooltip.getInstance('#hs-tooltip', true);

if (instance) {
  const { element } = instance;
  const removeBtn = document.querySelector('#hs-remove-btn');

  removeBtn.addEventListener('click', () => {
    // Clean up before removing from DOM
    element.destroy();
    // Now safe to remove the element
    document.querySelector('#hs-tooltip').remove();
  });
}
```

## Events

Tooltip instances emit events that can be listened to for lifecycle hooks and custom behavior.

| Event Name | When Fired | Callback Parameter | Description |
| --- | --- | --- | --- |
| `on:show` | After tooltip is shown | `HSTooltip` (tooltip instance) | Fires after the tooltip has been displayed. Use for post-show actions like tracking analytics. |
| `on:hide` | After tooltip is hidden | `HSTooltip` (tooltip instance) | Fires after the tooltip has been hidden. Use for cleanup or state updates. |

### Event Usage Example

```javascript
// Get tooltip instance
const instance = HSTooltip.getInstance('#hs-tooltip', true);

if (instance) {
  const { element } = instance;

  // Listen to show event
  element.on('show', (tooltipInstance) => {
    console.log('Tooltip shown:', tooltipInstance);
    // Perform actions after tooltip shows
    // e.g., track analytics, update UI
  });

  // Listen to hide event
  element.on('hide', (tooltipInstance) => {
    console.log('Tooltip hidden:', tooltipInstance);
    // Perform cleanup or state updates
  });
}
```

## Common Patterns

### Pattern 1: Focus-based Tooltip

Show tooltip on focus for keyboard accessibility.

```html
<div class="hs-tooltip --trigger:focus --placement:bottom">
  <button class="hs-tooltip-toggle">Focus me</button>
  <span class="hs-tooltip-content">Helpful information</span>
</div>
```

### Pattern 2: Programmatic Control

Control tooltip from external buttons.

```html
<div class="hs-tooltip" id="hs-tooltip-first">
  <button class="hs-tooltip-toggle">Hover me</button>
  <span class="hs-tooltip-content">Tooltip content</span>
</div>

<button id="hs-show-tooltip">Show Tooltip</button>
<button id="hs-hide-tooltip">Hide Tooltip</button>

<script>
  const instance = HSTooltip.getInstance('#hs-tooltip-first', true);
  
  if (instance) {
    const { element } = instance;

    document.querySelector('#hs-show-tooltip').addEventListener('click', () => {
      element.show();
    });

    document.querySelector('#hs-hide-tooltip').addEventListener('click', () => {
      element.hide();
    });
  }
</script>
```

## License

Copyright (c) 2024 Htmlstream.

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
