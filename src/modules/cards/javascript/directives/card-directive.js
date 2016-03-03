function CardDirective () {
    return {
        restrict: 'E',
        templateUrl: 'cards/res/layout/card-directive.html',
        scope: {
            Card: '=ngModel'
        },
        link: (el, attr, scope) => {

        }
    }
}

export { CardDirective };
