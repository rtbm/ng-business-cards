class CardsFormController {
  constructor($translate, $state, CardsService, NotifyService) {
    'ngInject';
    this.$translate = $translate;
    this.$state = $state;
    this.CardsService = CardsService;
    this.NotifyService = NotifyService;
    this.step = 1;
    this.Card = {
      owner: true,
    };
  }

  isFormValid(step, Card) {
    if (step > 1 && !Card || !Card.name) {
      this.$translate(['APP.REQUIRED.NAME']).then((translations) =>
        this.handleError(translations['APP.REQUIRED.NAME']));

      return false;
    }
    return true;
  }

  setStepAction(step, Card) {
    if (!this.isFormValid(step, Card)) {
      return;
    }
    this.step = step;
  }

  handleError(err) {
    if (!err) {
      return;
    }
    this.NotifyService.show({
      text: err,
    });
  }
}

export { CardsFormController };
