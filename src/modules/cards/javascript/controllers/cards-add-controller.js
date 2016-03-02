class CardsAddController {
    constructor($translate, $state, CardsService, NotifyService) {
        'ngInject';
        this.$translate = $translate;
        this.$state = $state;
        this.CardsService = CardsService;
        this.NotifyService = NotifyService;
    }

    save(Card) {
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
