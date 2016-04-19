import {inject} from 'aurelia-dependency-injection';
import {bindable, customElement} from 'aurelia-templating';

import {Configure} from './configure';

@customElement('place-picker')
@inject(Element, Configure)

export class AureliaPlacePicker {
  @bindable location;
  @bindable customClass;

  _scriptPromise = null;
  _mapPromise = null;
  _mapResolve = null;

  constructor(element, config) {
    this.element = element;
    this.config = config;

    if (!config.get('apiScript')) {
      console.error('No API script is defined.');
    }

    if (!config.get('apiKey')) {
      console.error('No API key has been specified.');
    }

    this.loadApiScript();

    let self = this;
    this._mapPromise = this._scriptPromise.then(() => {
      return new Promise((resolve, reject) => {
        // Register the the resolve method for _mapPromise
        self._mapResolve = resolve;
      });
    });
  }

  attached() {
    let self = this;
    this._scriptPromise.then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.input);
      autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace();
        if (place.geometry) {
          self.location.name = place.name;
          self.location.lat = place.geometry.location.lat();
          self.location.lng = place.geometry.location.lng();
        }
      });
    });
  }

  /**
   * Load API Script
   *
   * Loads the Google Maps Javascript and then resolves a promise
   * if loaded. If Google Maps is already loaded, we just return
   * an immediately resolved promise.
   *
   * @return Promise
   *
   */
  loadApiScript() {
    if (this._scriptPromise) {
      return this._scriptPromise;
    }

    if (window.google === undefined || window.google.maps === undefined) {
      // google has not been defined yet
      let script = document.createElement('script');

      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = `${this.config.get('apiScript')}?key=${this.config.get('apiKey')}&libraries=places&callback=myGoogleMapsCallback`;
      document.body.appendChild(script);

      this._scriptPromise = new Promise((resolve, reject) => {
        window.myGoogleMapsCallback = () => {
          resolve();
        };

        script.onerror = error => {
          reject(error);
        };
      });

      return this._scriptPromise;
    }

    // google has been defined already, so return an immediately resolved Promise that has scope
    this._scriptPromise = new Promise(resolve => { resolve(); });

    return this._scriptPromise;
  }
}
