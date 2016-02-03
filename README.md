# Multi-monitor window opener Chrome extension

## Description
This Chrome extension is a workaround to solve a Chrome long-time standing bug:
[Window.open() disregards "left" parameter when Chrome is on second monitor](https://code.google.com/p/chromium/issues/detail?id=137681)

The extension provides a JavaScript function `openNewWindow` that user can call anywhere to open the given URL at desired position and dimension, with multi-monitor setup supported.

## Usage
After install MMWO extension, call function like below:

```javascript
openNewWindow("http://google.com.au", { top: 200, left:2000, width:500, height:600 });
```
