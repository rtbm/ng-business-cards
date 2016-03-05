class NotifyService {
  constructor($templateCache, $compile, $rootScope, $timeout) {
    'ngInject';
    this.$templateCache = $templateCache;
    this.$compile = $compile;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;

    this.body = angular.element(document.getElementsByTagName('body')[0]);
  }

  show(options, timeout) {
    if(this.notify) {
      this.hide();
    }

    let template = this.$templateCache.get('app/res/layout/notify-partial.html');

    this.scope = this.$rootScope.$new();
    this.scope =  angular.extend(this.scope, options);

    this.notify = this.$compile(template)(this.scope);
    this.body.append(this.notify);

    this.timeout = this.$timeout(() => this.hide(), timeout || 2500);
  }

  hide() {
    this.notify.remove();
    this.scope.$destroy();
  }
}

export { NotifyService };
