import { CardsFormController } from './cards-form-controller';

class CardsAddController extends CardsFormController {
    constructor ($translate, $state, CardsService, NotifyService) {
        'ngInject';
        super($translate, $state, CardsService, NotifyService);
        this.Card = angular.extend(this.Card, {
            owner: true,
            createdAt: new Date()
        });
    }

    saveAction (Card) {
        this.CardsService.save(Card, () => {
            this.$translate(['CARDS.NOTIFY.SAVED']).then((translations) => {
                this.NotifyService.show({
                    text: translations['CARDS.NOTIFY.SAVED']
                });
                this.$state.go('cards');
            });
        });
    }
}

export { CardsAddController };
