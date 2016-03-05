class CardsListController {
  constructor($rootScope, $compile, $timeout, $translate, $templateCache, DialogService,
    CardsService) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$compile = $compile;
    this.$timeout = $timeout;
    this.$translate = $translate;
    this.$templateCache = $templateCache;
    this.DialogService = DialogService;
    this.CardsService = CardsService;

    this.offset = 0;
    this.Card = {};
    this.swipeEnabled = true;
    this.previousCardScope = false;
    this.previousCardElement = false;

    this.cardsElement = angular.element(document.getElementById('cards'));
    this.cardTemplate = this.$templateCache.get('cards/res/layout/card-partial.html');

    this.CardsService.query((response) => {
      this.cards = response;

      if (this.cards.length) {
        this.showCard(0);
      }
    });
  }

  showCard(offset, cssClass) {
    let cardScope;
    let cardElement;

    if (offset > -1) {
      this.Card = this.cards[offset];

      cardScope = this.$rootScope.$new();
      cardScope = angular.extend(cardScope, { Card: this.Card });

      cardElement = this.$compile(this.cardTemplate)(cardScope);

      this.cardsElement.prepend(cardElement);

      if (!this.previousCardElement) {
        this.previousCardElement = cardElement;
        this.previousCardScope = cardScope;

        return;
      }
    }

    this.previousCardElement.addClass(cssClass);
    this.swipeEnabled = false;

    this.$timeout(() => {
      this.previousCardElement.remove();
      this.previousCardScope.$destroy();

      if (!!cardElement) {
        this.previousCardElement = cardElement;
        this.previousCardScope = cardScope;
      }

      this.swipeEnabled = true;
    }, 250);
  }

  swipeRight() {
    if (!this.cards.length || !this.swipeEnabled || this.offset === 0) {
      return;
    }
    this.offset--;
    this.showCard(this.offset, 'animateRight');
  }

  swipeLeft() {
    if (!this.cards.length || !this.swipeEnabled || this.offset === this.cards.length - 1) {
      return;
    }
    this.offset++;
    this.showCard(this.offset, 'animateLeft');
  }

  removeAction(Card) {
    this.$translate([
      'CARDS.CONFIRMATION.REMOVE.TEXT', 'APP.CONFIRMATION.OK', 'APP.CONFIRMATION.CANCEL',
    ]).then((translations) => {
      this.removeCardConfirmation(translations).then((response) => {
        if (response !== 'OK') {
          return;
        }

        this.removeCard(Card).then(() => {
          this.cards.splice(this.offset, 1);
          this.Card = {};

          if (this.offset > 0) {
            this.offset--;
          } else if (this.cards.length) {
            this.offset = 0;
          } else {
            this.offset = -1;
          }

          this.showCard(this.offset, 'animateDown');
        });
      });
    });
  }

  removeCardConfirmation(translations) {
    return this.DialogService.show({
      text: translations['CARDS.CONFIRMATION.REMOVE.TEXT'],
      buttons: [{
        text: translations['APP.CONFIRMATION.OK'],
        response: 'OK',
      }, {
        text: translations['APP.CONFIRMATION.CANCEL'],
        response: 'CANCEL',
      }],
    });
  }

  removeCard(Card) {
    return this.CardsService.remove(Card.key);
  }
}

export { CardsListController };
