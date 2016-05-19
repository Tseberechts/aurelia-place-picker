import {inject} from 'aurelia-dependency-injection';
import {bindable, customElement} from 'aurelia-templating';
import {EventAggregator} from 'aurelia-event-aggregator';

import {Configure} from './configure';

@customElement('place-picker')
@inject(Element, Configure, EventAggregator)

export class AureliaPlacePicker {
  @bindable location = {};
  @bindable customClass;

  _scriptPromise = null;
  inputDisabled = true;

  constructor(element, config, eventAggregator) {
    this.element = element;
    this.config = config;
    this.event = eventAggregator;

    if (!config.get('apiScript')) {
      console.error('No API script is defined.');
    }

    if (!config.get('apiKey')) {
      console.error('No API key has been specified.');
    }

    if (config.get('getAPI')) {
      this.loadApiScript();
    }
  }

  attached() {
    if (!this.config.get('getAPI')) {
      this.event.subscribe(this.config.get('mapLoadedEvent'), (scriptPromise) => {
        this._scriptPromise = scriptPromise;
        this.initializeAutocomplete();
      });
    } else {
      this.initializeAutocomplete();
    }
  }

  initializeAutocomplete() {
    let self = this;
    this._scriptPromise.then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.input);
      this.inputDisabled = false;
      autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace();
        if (place.geometry) {
          self.location.name = place.name;
          self.location.lat = place.geometry.location.lat();
          self.location.lng = place.geometry.location.lng();
        }
        this.event.publish('placePicker:place_changed', self.location);
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
