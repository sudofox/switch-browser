# Media Queries

## Custom

The Nintendo Switch browser has two custom CSS media queries which allow developers to specify styles depending on the device mode.

### device-mode

The `-webkit-nintendo-switch-device-mode` query can be used to detect whether or not the Switch is in console or handheld mode.

**example:**

```css
@media(-webkit-nintendo-switch-device-mode: -webkit-nintendo-switch-device-console) {
  /* css styles for console mode */
}

@media(-webkit-nintendo-switch-device-mode: -webkit-nintendo-switch-device-handheld) {
  /* css styles for handheld mode */
}
```

### performance-mode


The `-webkit-nintendo-switch-performance-mode` query can be used to detect which performance setting the Switch is currently using.

**example:**

```css
@media(-webkit-nintendo-switch-performance-mode: -webkit-nintendo-switch-performance-0) {
  /* css styles for performance setting 0 */
}

@media(-webkit-nintendo-switch-performance-mode: -webkit-nintendo-switch-performance-1) {
  /* css styles for performance setting 1 */
}
```

### sources

CSS media query definitions can be found in `NintendoSwitch_OpenSources1.0.0/webkit/WebCore/css/CSSValueKeywords.in`

line 977:

```
#if defined(ENABLE_WKC_DEVICE_MODE_CSS_MEDIA) && ENABLE_WKC_DEVICE_MODE_CSS_MEDIA
// (-webkit-nintendo-switch-device-mode:) media feature:
-webkit-nintendo-switch-device-console
-webkit-nintendo-switch-device-handheld
#endif
```

line 983:

```
#if defined(ENABLE_WKC_PERFORMANCE_MODE_CSS_MEDIA) && ENABLE_WKC_PERFORMANCE_MODE_CSS_MEDIA
// (-webkit-nintendo-switch-performance-mode:) media feature:
-webkit-nintendo-switch-performance-0
-webkit-nintendo-switch-performance-1
#endif
```
