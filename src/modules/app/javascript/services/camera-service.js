function CameraService($q) {
  'ngInject';
  return {
    getPicture: (options) => {
      const q = $q.defer();

      navigator.camera.getPicture((imageData) => {
        q.resolve(imageData);
      }, (err) => {
        q.reject(err);
      }, options);

      return q.promise;
    },
  };
}

export { CameraService };
