# Aurelia-place-picker

This aurelia plugin is a wrapper around the google.maps.places.autocomplete. It renders a searchbox and returns an object with the placename, latitude and longitude coordinates

See the example: [here](http://github.com/Tseberechts/aurelia-place-picker-example);
The inspiration: [here](http://blog.thecoderecipe.com/articles/aurelia/places/2015/12/06/aurelia-places-autocomplete.html);

## Installation

```shell
jspm install npm:aurelia-place-picker
```

Or for webpack:

```shell
npm install aurelia-place-picker
```


## Usage

In your main.js:

```javascript
.plugin('aurelia-place-picker', config => {
      config.options({
      apiKey: '[YOUR API KEY HERE]',          //Required
      getAPI: true,                           //Optional, see 'Problems'
      apiLoadedEvent: 'googlemap:api:loaded'  //Optional, see 'Problems'
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

## Problems

If you try to use this together with the aurelia-google-maps plugin, you'll get an error:

```
You have included the Google Maps API multiple times on this page. This may cause unexpected errors.
```

If this is the case, you need to set the getAPI property to false and have to set a name for the apiLoadedEvent.
At the time of writing, the aurelia-google-maps plugin will not fire an event, so this will not work. 
I suggest you go to [My Fork](https://github.com/Tseberechts/aurelia-google-maps) and overwrite the dist folder in you node_modules. 
Let's hope my pull request will get merged soon.
