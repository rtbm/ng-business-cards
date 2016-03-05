import { GlobalsService } from './javascript/services/globals-service';
import { DeviceService } from './javascript/services/device-service';
import { DialogService } from './javascript/services/dialog-service';
import { NotifyService } from './javascript/services/notify-service';
import { NfcService } from './javascript/services/nfc-service';
import { CameraService } from './javascript/services/camera-service';
import { AppController } from './javascript/controllers/app-controller';
import { SwipeLeftDirective } from './javascript/directives/swipe-directive'
import { SwipeRightDirective } from './javascript/directives/swipe-directive'

export default angular.module('ngApp.app', [])
  .service('GlobalsService', GlobalsService)
  .factory('DeviceService', DeviceService)
  .service('DialogService', DialogService)
  .service('NotifyService', NotifyService)
  .factory('NfcService', NfcService)
  .factory('CameraService', CameraService)
  .controller('AppController', AppController)
  .directive('swipeLeft', SwipeLeftDirective)
  .directive('swipeRight', SwipeRightDirective)
  .config((Config, $compileProvider, $translateProvider) => {
    'ngInject';
    $compileProvider.debugInfoEnabled(false);
    $translateProvider.registerAvailableLanguageKeys(Config.languages);
    $translateProvider.determinePreferredLanguage();
    $translateProvider.fallbackLanguage('en');
  })
  .run(($state) => {
    'ngInject';
    $state.go('cards');
  });
