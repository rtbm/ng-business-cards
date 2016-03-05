import { CardsRoutes } from './javascript/routes/cards-routes';
import { CardsService } from './javascript/services/cards-service';
import { CardsListController } from './javascript/controllers/cards-list-controller';
import { CardsAddController } from './javascript/controllers/cards-add-controller';
import { CardsEditController } from './javascript/controllers/cards-edit-controller';

angular.module('ngApp.cards', [])
  .config(CardsRoutes)
  .service('CardsService', CardsService)
  .controller('CardsListController', CardsListController)
  .controller('CardsAddController', CardsAddController)
  .controller('CardsEditController', CardsEditController)
;
