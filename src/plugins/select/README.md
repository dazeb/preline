# Advanced Select

Advanced select solutions for massive datasets.

[![npm](https://img.shields.io/badge/npm-v4.2.0-blue)](https://www.npmjs.com/package/@preline/select) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://preline.co/plugins/advanced-select.html)

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

The Advanced Select component provides a customizable dropdown select interface with support for search, tags, API integration, and extensive styling options. It's designed for handling large datasets and complex selection scenarios.

**Key Features:**
- Search functionality
- Tags mode for multiple selections
- API integration for dynamic options
- Custom templates and styling
- Multiple selection support
- Option grouping
- Icons and descriptions for options
- Programmatic control via JavaScript API
- Event system for selection tracking

## Installation

To get started, install Select plugin via npm, else you can skip this step if you are already using Preline UI as a package.

```bash
npm i @preline/select
```

Some positioning features require [Floating UI](https://floating-ui.com). Install it if you plan to use `dropdownScope: "window"`, `dropdownPlacement`, or `dropdownAutoPlacement`:

```bash
npm i @floating-ui/dom
```

### CSS

Use [`@source`](https://tailwindcss.com/docs/functions-and-directives#source-directive) to register the plugin's JavaScript path for Tailwind CSS scanning, then [`@import`](https://tailwindcss.com/docs/functions-and-directives#import-directive) the plugin's CSS files into your Tailwind CSS file.

```css
@import "tailwindcss";

/* @preline/select */
@source "../node_modules/@preline/select/*.js";
@import "./node_modules/@preline/select/variants.css";
@import "./node_modules/@preline/select/theme.css";
```

### JavaScript

Include the JavaScript that powers the interactive elements near the end of your `</body>` tag. If you use `dropdownScope: "window"`, `dropdownPlacement`, or `dropdownAutoPlacement`, also load the [Floating UI](https://floating-ui.com) UMD bundle before the plugin. It exposes the `FloatingUIDOM` global the plugin relies on.

```html
<!-- Optional: required for dropdownScope: "window", dropdownPlacement, dropdownAutoPlacement -->
<script src="https://cdn.jsdelivr.net/npm/@floating-ui/dom@latest/dist/floating-ui.dom.umd.min.js"></script>
<script src="./node_modules/@preline/select/index.js"></script>
```

### Manual Initialization

Use the `non-auto` entry if you need manual initialization. In this mode, automatic initialization on page load is not included, so the component should be initialized explicitly.

```html
<!-- Optional: required for dropdownScope: "window", dropdownPlacement, dropdownAutoPlacement -->
<script src="https://cdn.jsdelivr.net/npm/@floating-ui/dom@latest/dist/floating-ui.dom.umd.min.js"></script>
<script type="module">
  import HSSelect from "@preline/select/non-auto.mjs";

  new HSSelect(document.querySelector("#select"));
</script>
```

### Via Bundler

When using a bundler (Vite, webpack, etc.), import the plugin directly as an ES module. If you use `dropdownScope: "window"`, `dropdownPlacement`, or `dropdownAutoPlacement`, expose `FloatingUIDOM` on `window` before importing the plugin.

`@preline/select` is the auto-init entry: it scans the DOM and initializes matching elements automatically.

```js
// Optional: required for dropdownScope: "window", dropdownPlacement, dropdownAutoPlacement
import * as FloatingUIDOM from "@floating-ui/dom";
window.FloatingUIDOM = FloatingUIDOM;

import "@preline/select";
```

`@preline/select/non-auto` is the manual entry: use it when you want explicit control over when initialization happens, either via `autoInit()` or by creating a specific instance yourself.

```js
// Optional: required for dropdownScope: "window", dropdownPlacement, dropdownAutoPlacement
import * as FloatingUIDOM from "@floating-ui/dom";
window.FloatingUIDOM = FloatingUIDOM;

import HSSelect from "@preline/select/non-auto";

HSSelect.autoInit();

// Or initialize a specific element manually
const el = document.querySelector("#select");
if (el) new HSSelect(el);
```

### TypeScript

This package ships with TypeScript type definitions. No additional `@types/` package is needed.

## Basic usage

The following example demonstrates the minimal HTML structure required for an advanced select component. This is a base template without custom styling - you can apply your own CSS classes and styles as needed. The component transforms a standard select element into an advanced dropdown.

```html
<select data-hs-select='{
    "placeholder": "Select option...",
    "toggleTag": "<button type=\"button\"></button>",
    "toggleClasses": "",
    "dropdownClasses": "",
    "optionClasses": "hs-selected:"
  }'>
  <option>Select option</option>
  <option>Name</option>
  <option>Email address</option>
  <option>Description</option>
  <option>User ID</option>
</select>
```

**Structure Requirements:**
- `data-hs-select`: Required on the `<select>` element, contains configuration options as JSON
- Standard `<option>` elements inside the select
- Optional `<optgroup>` elements for grouping

**Initial State:**
- Select displays placeholder text when no option is selected
- Dropdown is closed by default

## Configuration Options

### Data Options

Data options are specified in the `data-hs-select` attribute as a JSON object.

| Option | Target Element | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `data-hs-select` | Select element | - | - | Activate a Custom Select by specifying on an element. Should be added to the select. |
| `:isOpened` | Inside `data-hs-select` | boolean | `false` | Opens the select if the value is `true`. |
| `:placeholder` | Inside `data-hs-select` | string | `"Select..."` | Define a default placeholder when nothing is selected. |
| `:hasSearch` | Inside `data-hs-select` | boolean | `false` | Define a search field inside the dropdown if the value is `true`. |
| `:minSearchLength` | Inside `data-hs-select` | number | `0` | Specifies the minimum number of characters that must be entered before the search function becomes active. |
| `:preventSearchFocus` | Inside `data-hs-select` | boolean | `false` | Sets autofocus for the search field inside a dropdown list if the value is `true`. |
| `:preventSearchInsideDescription` | Inside `data-hs-select` | boolean | `false` | Prevents searching inside the description when set to `true`. |
| `:mode` | Inside `data-hs-select` | `'default'` \| `'tags'` | `'default'` | Define a select mode. `default` for single/multiple selection, `tags` for tag-based selection. |
| `:scrollToSelected` | Inside `data-hs-select` | boolean | `false` | Scroll to the selected option when the dropdown is opened. |
| `:value` | Inside `data-hs-select` | string \| string[] | - | Defines the initial selected value. Use an array when the select is multiple. |
| `:viewport` | Inside `data-hs-select` | string | - | Defines the viewport selector used when recalculating dropdown direction and available space. |
| `:toggleTag` | Inside `data-hs-select` | string (HTML markup) | - | Define a markup for the select toggle. Note: `data-title` is required if you are using a custom placeholder. |
| `:toggleClasses` | Inside `data-hs-select` | string | - | Define CSS classes for the selects' toggle. CSS classes must be separated by a space. |
| `:toggleSeparators` | Inside `data-hs-select` | object | - | Define separators for the selects' toggle. |
| `:toggleSeparators:items` | Inside `data-hs-select` | string | `", "` | Define which separator will be used for separate selected items. |
| `:toggleSeparators:betweenItemsAndCounter` | Inside `data-hs-select` | string | `"and"` | Define which separator will be used for separate selected items and counter text. |
| `:toggleCountText` | Inside `data-hs-select` | string | - | This option is only available for multiple select. Determines what text will be after the counter. It also activates the counting mode. |
| `:toggleCountTextPlacement` | Inside `data-hs-select` | `'postfix'` \| `'prefix'` \| `'postfix-no-space'` \| `'prefix-no-space'` | `'postfix'` | Allows to specify where the text specified in the `toggleCountText` parameter will be located relative to the counter. |
| `:toggleCountTextMinItems` | Inside `data-hs-select` | number | `1` | This option is only available for multiple select. Defines the minimum number of selected items at which the counting mode will be activated. |
| `:toggleCountTextMode` | Inside `data-hs-select` | `'countAfterLimit'` \| `'nItemsAndCount'` | `'countAfterLimit'` | This option is only available for multiple select. Controls the display of the contents of the button title. |
| `:wrapperClasses` | Inside `data-hs-select` | string | - | Define CSS classes for the selects' wrapper. CSS classes must be separated by a space. |
| `:tagsItemTemplate` | Inside `data-hs-select` | string (HTML markup) | - | This option is only available when tags mode is set up. Define template for the single tag. It could contain: `data-icon` if target option tag has `data-hs-select-option:icon`, `data-title` the text from the target option, `data-remove` the target tag will be deleted when click on tag with this data attribute. |
| `:tagsItemClasses` | Inside `data-hs-select` | string | - | This option is only available when tags mode is set up. Define CSS classes for the single tags. CSS classes must be separated by a space. |
| `:tagsInputId` | Inside `data-hs-select` | string | - | This option is only available when tags mode is set up. This option is useful if there is a need to associate a `label` outside the initialized element with the tags input. |
| `:tagsInputClasses` | Inside `data-hs-select` | string | - | This option is only available when tags mode is set up. Define CSS classes for the input. Defines CSS classes for the search field inside a dropdown list. CSS classes must be separated by a space. |
| `:dropdownTag` | Inside `data-hs-select` | string (HTML markup) | - | This option is only available when tags mode is set up. Define a markup for the dropdown. |
| `:dropdownClasses` | Inside `data-hs-select` | string | - | This option is only available when tags mode is set up. Define CSS classes for the dropdown. Defines CSS classes for the search field inside a dropdown list. CSS classes must be separated by a space. |
| `:dropdownPlacement` | Inside `data-hs-select` | `"top"` \| `"top-left"` \| `"top-right"` \| `"bottom"` \| `"bottom-left"` \| `"bottom-right"` \| `"right"` \| `"right-top"` \| `"right-bottom"` \| `"left"` \| `"left-top"` \| `"left-bottom"` | `"bottom"` | Specifies the position of the menu when opened. Requires the `Floating UI` and `dropdownScope` option to be `window`. |
| `:dropdownAutoPlacement` | Inside `data-hs-select` | boolean | `false` | Automatically determine the placement of the menu based on the available space. Requires the `Floating UI` and `dropdownScope` option to be `window`. |
| `:dropdownVerticalFixedPlacement` | Inside `data-hs-select` | `"top"` \| `"bottom"` \| null | `null` | Specifies a fixed vertical position for the menu when opened. It will not change when scrolling. |
| `:dropdownScope` | Inside `data-hs-select` | `"window"` \| `"parent"` | `"parent"` | Determines whether the dropdown will be moved outside the parent, for correct display in elements with hidden overflow. Requires the `Floating UI` plugin. |
| `:dropdownDirectionClasses` | Inside `data-hs-select` | `{ top?: string; bottom?: string; }` | `null` | Defines classes that are applied when the dropdown is placed above or below the toggle. |
| `:dropdownSpace` | Inside `data-hs-select` | number | `10` | Defines the spacing in pixels between the toggle and dropdown. |
| `:searchTemplate` | Inside `data-hs-select` | string (HTML markup) | `"<input type=\"text\">"` | This option is only available when `hasSearch: true`. Define a custom markup for the search input. |
| `:searchWrapperTemplate` | Inside `data-hs-select` | string (HTML markup) | `"<div></div>"` | This option is only available when `hasSearch: true`. Define a custom markup for the search wrapper. |
| `:searchWrapperClasses` | Inside `data-hs-select` | string | `"bg-white p-2 sticky top-0"` | This option is only available when `hasSearch: true`. Define CSS classes for the search wrapper. |
| `:searchId` | Inside `data-hs-select` | string | - | This option is only available when `hasSearch: true`. This option is useful if there is a need to associate a `label` outside the initialized element with the search input. |
| `:searchLimit` | Inside `data-hs-select` | number | `Infinity` | This option is only available when `hasSearch: true`. If this option is enabled, the search will display only the first 'n' matching items. |
| `:isSearchDirectMatch` | Inside `data-hs-select` | boolean | `true` | This option is only available when `hasSearch: true`. If the option is disabled, then in the search results you will be able to see non-direct matches by text. For example, if you entered `england` in the search field, then `Eng-land`, `Eng.land`, `Eng_land` will also be shown. |
| `:searchClasses` | Inside `data-hs-select` | string | `"block w-[calc(100%-32px)] text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 py-2 px-3 my-2 mx-4"` | This option is only available when `:hasSearch` attribute is `true`. Define CSS classes for the search field inside the dropdown. Defines CSS classes for the search field inside a dropdown list. CSS classes must be separated by a space. |
| `:searchPlaceholder` | Inside `data-hs-select` | string | `"Search..."` | This option is only available when `:hasSearch` attribute is `true`. Determines placeholder for the search field inside the dropdown. |
| `:searchNoResultTemplate` | Inside `data-hs-select` | string (HTML markup) | `"<span></span>"` | This option is only available when `:hasSearch` attribute is `true`. Define a markup for the "no result" text. |
| `:searchNoResultText` | Inside `data-hs-select` | string | `"No options found..."` | This option is only available when `:hasSearch` attribute is `true`. Defines the text that will be displayed if no results are found. |
| `:searchNoResultClasses` | Inside `data-hs-select` | string | `"px-4 text-sm"` | This option is only available when `:hasSearch` attribute is `true`. Defines CSS classes for the "no results" wrapper. CSS classes must be separated by a space. |
| `:optionAllowEmptyOption` | Inside `data-hs-select` | boolean | `false` | This option determines whether an empty option should be included in the list. When set to `true`, an additional option with an empty string (`""`) as its value will be displayed, allowing users to select a blank choice if needed. |
| `:optionTemplate` | Inside `data-hs-select` | string (HTML markup) | - | Define template for the single option. It could contain: `data-icon` if target option tag has `data-hs-select-option:icon`, `data-title` the text from the target option, `data-description` if target option tag has `data-hs-select-option:description`. |
| `:optionTag` | Inside `data-hs-select` | string (HTML markup) | - | Define a markup for the single option. |
| `:optionClasses` | Inside `data-hs-select` | string | - | Define CSS classes for the single option. CSS classes must be separated by a space. |
| `:optgroupTag` | Inside `data-hs-select` | string (HTML markup) | - | Define a markup for the single option group. |
| `:optgroupClasses` | Inside `data-hs-select` | string | - | Define CSS classes for the single option group. CSS classes must be separated by a space. |
| `:extraMarkup` | Inside `data-hs-select` | string \| array (HTML markup) | - | Define a markup that could be extra added to the wrapper of the select for the decoration reasons. If it contains the `--prevent-click` class, clicking on this element will not trigger the open function. |
| `:descriptionClasses` | Inside `data-hs-select` | string | - | Define CSS classes for the description inside the single option. CSS classes must be separated by a space. |
| `:iconClasses` | Inside `data-hs-select` | string | - | Define CSS classes for the icon inside the single option. CSS classes must be separated by a space. |
| `:isAddTagOnEnter` | Inside `data-hs-select` | boolean | `true` | Determines whether a tag will be added when the enter key is pressed. |
| `:isSelectedOptionOnTop` | Inside `data-hs-select` | boolean | `false` | Controls whether selected options should appear at the top of the dropdown list. When set to `true`, selected options will be sorted to the top of the list. |
| `:apiUrl` | Inside `data-hs-select` | string \| null | `null` | Defines the address where the API is located. |
| `:apiQuery` | Inside `data-hs-select` | string \| null | `null` | Defines query parameters that are separated by `?`. |
| `:apiOptions` | Inside `data-hs-select` | RequestInit \| null | `null` | Defines options for the fetch function. |
| `:apiDataPart` | Inside `data-hs-select` | string \| null | `null` | If data is in some first level parameter, then it allows you to specify the name of this parameter to extract the data. |
| `:apiSearchQueryKey` | Inside `data-hs-select` | string \| null | `null` | Defines the key for the query search parameter. |
| `:apiFieldsMap` | Inside `data-hs-select` | `{ id: string; title: string; val?: string; icon?: string \| null; description?: string \| null; page?: string; offset?: string; limit?: string; pageStart?: string; totalPath?: string; [key: string]: unknown; } \| null` | `null` | Allows you to convert fields from the API to the fields required for the plugin to work. `page`, `offset`, and `limit` customize pagination parameter names for remote data. |
| `:apiLoadMore` | Inside `data-hs-select` | `boolean \| { perPage?: number; scrollThreshold?: number; }` | `false` | Defines the options for the load more feature. |
| `:apiPageStart` | Inside `data-hs-select` | number | - | Defines the first page or offset value used for remote option loading. If omitted, page-based loading starts from `1` and offset-based loading starts from `0`. |
| `:apiTotalPath` | Inside `data-hs-select` | string \| null | `null` | Defines the response path used to read the total result count for remote option loading. |
| `:apiSelectedValues` | Inside `data-hs-select` | `string \| string[] \| null` | `null` | Allows to preselect values when loading options from an API. Can be a single value or an array of values for multiple selection. |
| `:apiIconTag` | Inside `data-hs-select` | string \| null | `null` | Allows to define an `img` tag that will be used when rendering options and in the trigger button. |
| `data-hs-select-option` | Option element | object | - | Allows to define the parameters for the single option. Should be added to the option. |
| `:description` | Inside `data-hs-select-option` | string | - | Allows to define the description of the option inside the element that have `data-description` attribute. |
| `:icon` | Inside `data-hs-select-option` | string | - | Allows to define the icon of the option inside the element that have `data-icon` attribute. |
| `:additionalClasses` | Inside `data-hs-select-option` | `[string, string[]][]` | - | Allows to define additional classes. The first string is the selector of the element to apply the classes to, the second string is an array of classes to apply. If the selector is set to `null`, the classes will be applied to the option itself. |
| `:apiFields` | Inside `data-hs-select-option` | `{ [key: string]: unknown; }` | - | Allows to define the fields of the option from the API. |

### Tailwind Modifiers

| Name | Description |
| --- | --- |
| `hs-select-opened:*` | A modifier that allows you to set Tailwind classes when select has been opened. |
| `hs-select-disabled:*` | A modifier that allows you to set Tailwind classes when select has "disabled" attribute. |

## JavaScript API

The `HSSelect` object is available in the global `window` object after the plugin is loaded.

### Instance Methods

These methods are called on a select instance.

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| `open()` | None | `void` | Opens the dropdown list programmatically. |
| `close()` | None | `void` | Closes the dropdown list programmatically. |
| `setValue(value)` | `value`: `string \| string[]` | `void` | Set the select value. This should be a string for a simple select and an array if it's a multiple select. |
| `addOption(items)` | `items`: `{ title: string; val: string; options?: { description: string; icon: string; }; }` or array of such objects | `void` | Adds an option (several possible) to the select. The single option should follow this interface. |
| `removeOption(val)` | `val`: `string \| string[]` | `void` | Removes an option by value (several possible). |
| `recalculateDirection()` | None | `void` | Force recalculation for dropdown list. Useful when dropdown position needs to be updated after layout changes. |
| `destroy()` | None | `void` | Destroys the select instance, removes all generated markup, classes, and event listeners. Use when removing select from DOM. |

### Static Methods

These methods are called directly on the `HSSelect` class.

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| `HSSelect.getInstance(target, isInstance)` | `target`: `HTMLElement \| string` (CSS selector)<br>`isInstance`: `boolean` (optional) | `HTMLElement \| { id: string \| number, element: HSSelect } \| null` | Returns the select instance or element associated with the target. If `isInstance` is `true`, returns collection item object `{ id, element }` where `element` is the `HSSelect` instance. If `isInstance` is `false` or omitted, returns the DOM element (`HTMLElement`). Returns `null` if select instance is not found. |

### Usage Examples

**Example 1: Opening and closing dropdown**
```javascript
// Get the select instance
const instance = HSSelect.getInstance('#hs-select', true);

if (instance) {
  const { element } = instance;

  // Open dropdown
  element.open();

  // Close dropdown
  element.close();
}
```

**Example 2: Setting value programmatically**
```javascript
const instance = HSSelect.getInstance('#hs-select', true);

if (instance) {
  const { element } = instance;

  // Set value for single select
  element.setValue('option-value');

  // Set value for multiple select
  element.setValue(['value-1', 'value-2']);
}
```

**Example 3: Adding and removing options**
```javascript
const instance = HSSelect.getInstance('#hs-select', true);

if (instance) {
  const { element } = instance;

  // Add option
  element.addOption({
    title: 'New Option',
    val: 'new-option',
    options: {
      description: 'Option description',
      icon: '<svg>...</svg>'
    }
  });

  // Remove option
  element.removeOption('new-option');
}
```

**Example 4: Destroying select instance**
```javascript
const instance = HSSelect.getInstance('#hs-select', true);

if (instance) {
  const { element } = instance;
  const removeBtn = document.querySelector('#hs-remove-btn');

  removeBtn.addEventListener('click', () => {
    // Clean up before removing from DOM
    element.destroy();
    // Now safe to remove the element
    document.querySelector('#hs-select').remove();
  });
}
```

## Events

Select instances emit events that can be listened to for selection lifecycle hooks.

| Event Name | When Fired | Callback Parameter | Description |
| --- | --- | --- | --- |
| `on:change` | When the selected value changes | `string | string[]` (new selected value; array in multi-select / tags mode) | Fires after the user picks an option or removes a tag. |
| `on:request` | Right before an `apiUrl` request is sent (search or `apiLoadMore` pagination) | `{ url: string }` | Useful for showing a loading indicator. |
| `on:requestCompleted` | After an `apiUrl` request settles, success or failure | `{ url: string, data?: unknown, error?: unknown }` | `data` holds the parsed response on success, `error` is set on failure. Not fired when a request is superseded/aborted (e.g. a newer search query). |

Both are also dispatched as DOM `CustomEvent`s (`request.hs.select` / `requestCompleted.hs.select`) with the same payload under `event.detail.payload`, so they can be listened to via `addEventListener` as well as `element.on(...)`.

### Event Usage Example

```javascript
// Get select instance
const instance = HSSelect.getInstance('#hs-select', true);

if (instance) {
  const { element } = instance;

  // Listen for selection changes
  element.on('change', (value) => {
    console.log('Selected value:', value);
    // value is a string for single-select, string[] for multi-select / tags mode
  });

  // Listen for API request lifecycle (only relevant when `apiUrl` is set)
  element.on('request', ({ url }) => {
    console.log('Requesting:', url);
    // e.g. show a loading spinner
  });

  element.on('requestCompleted', ({ data, error }) => {
    if (error) console.error('Request failed:', error);
    else console.log('Request completed with:', data);
    // e.g. hide the loading spinner
  });
}
```

## Common Patterns

### Pattern 1: Search Enabled

Enable search functionality in dropdown.

```html
<select data-hs-select='{
  "hasSearch": true,
  "searchPlaceholder": "Search options..."
}'>
  <!-- Options -->
</select>
```

### Pattern 2: Tags Mode

Use tags mode for multiple selections.

```html
<select multiple data-hs-select='{
  "mode": "tags"
}'>
  <!-- Options -->
</select>
```

### Pattern 3: API Integration

Load options from API.

```html
<select data-hs-select='{
  "apiUrl": "/api/options",
  "apiFieldsMap": {
    "id": "id",
    "title": "name",
    "val": "value"
  }
}'>
  <!-- Options -->
</select>
```

## License

Copyright (c) 2024 Htmlstream.

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
