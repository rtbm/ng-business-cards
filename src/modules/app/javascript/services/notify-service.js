class NotifyService {
    constructor ($templateCache, $compile, $rootScope, $q, $timeout, GlobalsService) {
        'ngInject';
        this.$templateCache = $templateCache;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.$q = $q;
        this.$timeout = $timeout;
        this.GlobalsService = GlobalsService;
        this.queue = [];

        this.el = {
            body: angular.element(document.getElementsByTagName('body')[0])
        }
    }

    show (options, timeout) {
        let template = this.$templateCache.get('app/res/layout/notify-partial.html');

        this.scope = this.$rootScope.$new();
        this.scope = angular.extend(this.scope, options);

        let notify = this.$compile(template)(this.scope);

        if (this.queue.length > 0) {
            notify.css({
                bottom: ((this.queue.length || 1) * 5) + 'rem'
            });
        }

        this.queue.push(notify);
        this.el.body.append(notify);

        this.$timeout(() => this.hide(), timeout || 3000);
    }

    hide () {
        let notify = this.queue.pop();
        notify.remove();
    }
}

export { NotifyService };
