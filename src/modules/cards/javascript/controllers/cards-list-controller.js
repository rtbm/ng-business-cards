class CardsListController {
  constructor($q, $rootScope, $compile, $timeout, $translate, $templateCache, DeviceService,
              DialogService, CardsService, NfcService, NotifyService) {
    'ngInject';
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$compile = $compile;
    this.$timeout = $timeout;
    this.$translate = $translate;
    this.$templateCache = $templateCache;
    this.DeviceService = DeviceService;
    this.DialogService = DialogService;
    this.CardsService = CardsService;
    this.NfcService = NfcService;
    this.NotifyService = NotifyService;

    this.offset = 0;
    this.Card = {};
    this.swipeEnabled = true;
    this.previousCardScope = false;
    this.previousCardElement = false;

    this.cardsElement = angular.element(document.getElementById('cards'));
    this.cardTemplate = this.$templateCache.get('cards/res/layout/card-partial.html');

    this.onInit();
  }

  onInit() {
    this.getCards().then((cards) => {
      if (!cards.length) {
        return;
      }
      this.cards = cards;
      this.showCard(0);
    });

    this.isNfcEnabled().then(
      () => this.setupReceiveNdefListener(),
      () => this.showNfcDisabledNotify()
    );
  }

  isNfcEnabled() {
    const deferred = this.$q.defer();

    this.DeviceService.ready().then(
      () => this.NfcService.isEnabled().then(
        () => deferred.resolve(),
        () => deferred.reject()
      )
    );

    return deferred.promise;
  }

  setupReceiveNdefListener() {
    this.receiveNdefListener = this.NfcService.NdefListener();

    this.receiveNdefListener.then(null, () => this.showErrorNotify(), (nfcEvent) => {
      const card = ndef.textHelper.decodePayload(nfcEvent.tag.ndefMessage[0].payload);
      const Card = angular.fromJson(card);

      this.save(Card).then(() => {
        this.getCards().then(() => this.showCard(this.cards.length - 1));
      });
    });
  }

  showNfcDisabledNotify() {
    this.$translate(['CARDS.NOTIFY.NFC_DISABLED']).then((translations) => {
      this.NotifyService.show({
        text: translations['CARDS.NOTIFY.NFC_DISABLED'],
      });
    });
  }

  showErrorNotify() {
    this.$translate(['CARDS.NOTIFY.ERROR']).then((translations) => {
      this.NotifyService.show({
        text: translations['CARDS.NOTIFY.ERROR'],
      });
    });
  }

  getCards() {
    return this.CardsService.query();
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

  swipeRightAction() {
    if (!this.cards.length || !this.swipeEnabled || this.offset === 0) {
      return;
    }
    this.offset--;
    this.showCard(this.offset, 'animate-right');
  }

  swipeLeftAction() {
    if (!this.cards.length || !this.swipeEnabled || this.offset === this.cards.length - 1) {
      return;
    }
    this.offset++;
    this.showCard(this.offset, 'animate-left');
  }

  removeAction(Card) {
    this.$translate(['CARDS.DIALOG.REMOVE.TEXT', 'APP.OK', 'APP.CANCEL']).then((translations) => {
      this.removeConfirmationDialog(translations).then((response) => {
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

          this.showCard(this.offset, 'animate-down');
        });
      });
    });
  }

  removeConfirmationDialog(translations) {
    return this.DialogService.show({
      text: translations['CARDS.DIALOG.REMOVE.TEXT'],
      buttons: [{
        text: translations['APP.OK'],
        response: 'OK',
      }, {
        text: translations['APP.CANCEL'],
        response: 'CANCEL',
      }],
    });
  }

  removeCard(Card) {
    return this.CardsService.remove(Card.key);
  }

  shareActionDialog(translations) {
    return this.DialogService.show({
      text: translations['CARDS.DIALOG.SHARE.TEXT'],
      buttons: [{
        text: translations['APP.CANCEL'],
        response: 'CANCEL',
      }],
    });
  }

  shareAction(Card) {
    this.isNfcEnabled().then(() => {
      this.$translate(['CARDS.DIALOG.SHARE.TEXT', 'APP.CANCEL']).then((translations) => {
        const card = angular.extend({}, Card);

        delete card.key;
        delete card.owner;
        delete card.createdAt;

        this.receiveNdefListener.cancel();
        this.shareNdefListener = this.NfcService.shareTextRecord(angular.toJson(card));

        this.shareDialog = this.shareActionDialog(translations);

        this.shareNdefListener.then(
          () => this.shareDialog.cancel(),
          () => this.showErrorNotify()
        );

        this.shareDialog.then(() => {
          this.shareNdefListener.cancel();
          this.setupReceiveNdefListener();
        });
      });
    }, () => this.showNfcDisabledNotify());
  }

  save(Card) {
    return this.CardsService.save(Card, () => this.showSavedNotify());
  }

  showSavedNotify() {
    this.$translate(['CARDS.NOTIFY.SAVED']).then((translations) => {
      this.NotifyService.show({
        text: translations['CARDS.NOTIFY.SAVED'],
      });
    });
  }
}

export { CardsListController };
