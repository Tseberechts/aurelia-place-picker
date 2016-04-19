# Aurelia-place-picker

See the example [here](http://github.com/Tseberechts/aurelia-place-picker-example)

## Installation

```shell
jspm install npm:aurelia-place-picker
```

Or for webpack:

```shell
npm install aurelia-place-picker
```

---

## Usage

In your main.js:

```javascript
.plugin('aurelia-place-picker', config => {
      config.options({
      apiKey: '[YOUR API KEY HERE]'
    });
```

Then in your HTML:

```html
<place-picker location.bind="location"></place-picker>
```

And finally the CSS:

```css
.aurelia-place-picker{
 [YOUR STYLE HERE]
}
```
