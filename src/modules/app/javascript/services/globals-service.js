class GlobalsService {
    constructor ($translate) {
        'ngInject';
        return {
            activeLanguage: ($translate.use()
            || $translate.storage().get($translate.storageKey())
            || $translate.preferredLanguage()),

            overlay: {
                visible: false
            }
        }
    }
}

export { GlobalsService };
