function SwipeLeftDirective($parse) {
  'ngInject';
  return {
    restrict: 'A',
    link: (scope, element, attr) => {
      const swipeHandler = $parse(attr.swipeLeft);
      const mc = new Hammer(element[0], {
        recognizers: [
          [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
        ],
      });

      mc.on('swipeleft', (ev) => {
        scope.$apply(() => {
          element.triggerHandler('swipeleft');
          swipeHandler(scope, { $event: ev });
        });
      });
    },
  };
}

function SwipeRightDirective($parse) {
  'ngInject';
  return {
    restrict: 'A',
    link: (scope, element, attr) => {
      const swipeHandler = $parse(attr.swipeRight);
      const mc = new Hammer(element[0], {
        recognizers: [
          [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
        ],
      });

      mc.on('swiperight', (ev) => {
        scope.$apply(() => {
          element.triggerHandler('swiperight');
          swipeHandler(scope, { $event: ev });
        });
      });
    },
  };
}

export { SwipeLeftDirective, SwipeRightDirective };
