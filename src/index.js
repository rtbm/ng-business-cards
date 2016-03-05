import './modules/app';
import './modules/cards';

angular.module('ngApp', [
  'ngAnimate',
  'ngSanitize',
  'ui.router',
  'pascalprecht.translate',
  'ngApp.config',
  'ngApp.strings',
  'ngApp.layouts',
  'ngApp.app',
  'ngApp.cards',
]);
