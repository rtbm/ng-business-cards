class CardsService {
    constructor ($q) {
        'ngInject';
        this.$q = $q;
    }

    get (key, cb) {
        let deferred = this.$q.defer();

        Lawnchair({ name: 'cards', record: 'Card' }, (cards) => {
            cards.get(key, (result) => {
                deferred.resolve(result);
            });
        });

        deferred.promise.then((response) => !!cb && cb(response));

        return deferred.promise;
    }

    save (Card, cb) {
        let deferred = this.$q.defer();

        Lawnchair({ name: 'cards', record: 'Card' }, (cards) => {
            cards.save(Card, (result) => {
                deferred.resolve(result);
            });
        });

        deferred.promise.then((response) => !!cb && cb(response));

        return deferred.promise;
    }

    query (cb) {
        let deferred = this.$q.defer();

        Lawnchair({ name: 'cards', record: 'Card' }, (cards) => {
            cards.all((result) => {
                deferred.resolve(result);
            });
        });

        deferred.promise.then((response) => !!cb && cb(response));

        return deferred.promise;
    }

    remove (key, cb) {
        let deferred = this.$q.defer();

        Lawnchair({ name: 'cards', record: 'Card' }, (cards) => {
            cards.remove(key, (result) => {
                deferred.resolve(result);
            });
        });

        deferred.promise.then((response) => !!cb && cb(response));

        return deferred.promise;
    }
}

export { CardsService };
