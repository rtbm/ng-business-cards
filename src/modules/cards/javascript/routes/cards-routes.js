function CardsRoutes ($stateProvider) {
    'ngInject';
    $stateProvider
        .state('cards', {
            url: '/cards',
            templateUrl: 'cards/res/layout/cards-list-view.html',
            controller: 'CardsListController',
            controllerAs: 'CardsListVM'
        })
        .state('cards_add', {
            url: '/cards/add',
            templateUrl: 'cards/res/layout/cards-add-view.html',
            controller: 'CardsAddController',
            controllerAs: 'CardsAddVM'
        });
}

export { CardsRoutes };
