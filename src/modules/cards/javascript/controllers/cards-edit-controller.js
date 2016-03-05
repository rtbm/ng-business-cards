import { CardsFormController } from './cards-form-controller';

class CardsEditController extends CardsFormController {
  constructor($translate, $state, CardsService, NotifyService) {
    'ngInject';
    super($translate, $state, CardsService, NotifyService);
    this.CardsService.get(this.$state.params.cardKey, (response) => {
      this.Card = angular.extend(this.Card, {
        updatedAt: new Date(),
      }, response);
    });
  }

  updateAction(Card) {
    this.CardsService.save(Card).then(() => {
      this.$translate(['CARDS.NOTIFY.UPDATE']).then((translations) => {
        this.NotifyService.show({
          text: translations['CARDS.NOTIFY.UPDATE'],
        });
        this.$state.go('cards');
      });
    });
  }
}

export { CardsEditController };
