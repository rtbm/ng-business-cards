import { CardsRoutes } from './javascript/routes/cards-routes';
import { CardsService } from './javascript/services/cards-service';
import { CardsListController } from './javascript/controllers/cards-list-controller';
import { CardsAddController } from './javascript/controllers/cards-add-controller';
import { CardDirective } from './javascript/directives/card-directive';

angular.module('ngApp.cards', [])
    .config(CardsRoutes)
    .service('CardsService', CardsService)
    .controller('CardsListController', CardsListController)
    .controller('CardsAddController', CardsAddController)
    .directive('card', CardDirective)
;
