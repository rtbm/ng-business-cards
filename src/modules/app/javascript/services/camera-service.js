function CameraService ($q) {
    'ngInject';
    return {
        getPicture: (options) => {
            var q = $q.defer();

            navigator.camera.getPicture((imageData) => {
                q.resolve(imageData);
            }, (err) => {
                q.reject(err);
            }, options);

            return q.promise;
        }
    }
}

export { CameraService };
