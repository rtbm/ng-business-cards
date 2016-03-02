class NotifyService {
    constructor($templateCache, $compile, $rootScope, $q, $timeout, GlobalsService) {
        'ngInject';
        this.$templateCache = $templateCache;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.$q = $q;
        this.$timeout = $timeout;
        this.GlobalsService = GlobalsService;

        this.el = {
            body: angular.element(document.getElementsByTagName('body')[0])
        }
    }

    show(options, timeout) {
        let template = this.$templateCache.get('app/res/layout/notify-partial.html');

        this.scope = this.$rootScope.$new();
        this.scope = angular.extend(this.scope, options);

        this.el.notify = this.$compile(template)(this.scope);
        this.el.body.append(this.el.notify);

        this.$timeout(() => this.hide(), timeout || 3000);
    }

    hide() {
        this.el.notify.remove();
    }
}

export { NotifyService };
