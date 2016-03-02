function DeviceService($q) {
    'ngInject';
    return {
        ready: () => {
            let q = $q.defer();

            if('ontouchstart' in window || navigator.maxTouchPoints) {
                document.addEventListener('deviceready', () => {
                    q.resolve();
                });
            } else {
                angular.element(document).ready(() => {
                    q.resolve();
                }, false);
            }

            return q.promise;
        }
    }
}

export { DeviceService };
