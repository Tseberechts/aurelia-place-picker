# Aurelia-place-picker

This aurelia plugin is a wrapper around the google.maps.places.autocomplete. It renders a searchbox and returns an object with the placename, latitude and longitude coordinates

See the example: [here](http://github.com/Tseberechts/aurelia-place-picker-example);
The inspiration:

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


It returns an object: 

```javascript
location = {
  name: 'location name',
  lat: '12.3456',
  lng: '98.7654'
}
```
