class DialogService {
    constructor($templateCache, $compile, $rootScope, $q, GlobalsService) {
        'ngInject';
        this.$templateCache = $templateCache;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.$q = $q;
        this.GlobalsService = GlobalsService;

        this.el = {
            body: angular.element(document.getElementsByTagName('body')[0])
        }
    }

    resolve(response) {
        this.el.dialog.remove();
        this.GlobalsService.overlay.visible = false;
        this.scope.$destroy();
        this.deffered.resolve(response);
    }

    show(options) {
        let template = this.$templateCache.get('app/res/layout/dialog-partial.html');

        this.deffered = this.$q.defer();

        this.scope = this.$rootScope.$new();
        this.scope = angular.extend(this.scope, options);
        this.scope.resolve = (response) => this.resolve(response);

        this.el.dialog = this.$compile(template)(this.scope);
        this.el.body.append(this.el.dialog);

        this.GlobalsService.overlay.visible = true;

        return this.deffered.promise;
    }
}

export { DialogService };
