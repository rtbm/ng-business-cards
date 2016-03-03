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
        })

        .state('cards_edit', {
            url: '/cards/:cardKey',
            templateUrl: 'cards/res/layout/cards-edit-view.html',
            controller: 'CardsEditController',
            controllerAs: 'CardsEditVM'
        });
}

export { CardsRoutes };
