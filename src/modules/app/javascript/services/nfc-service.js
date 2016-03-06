function NfcService($q) {
  'ngInject';
  return {
    isEnabled: () => {
      const deferred = $q.defer();

      nfc.enabled(
        () => deferred.resolve(),
        () => deferred.reject()
      );

      return deferred.promise;
    },

    NdefListener: () => {
      const deferred = $q.defer();

      nfc.addNdefListener(
        (nfcEvent) => deferred.notify(nfcEvent),
        null,
        (err) => deferred.reject(err)
      );

      deferred.promise.cancel = () => {
        nfc.removeNdefListener(
          (nfcEvent) => deferred.resolve(nfcEvent)
        );
      };

      return deferred.promise;
    },

    writeTextRecord: (message) => {
      const deferred = $q.defer();

      nfc.write(
        [ndef.textRecord(message)],
        (nfcEvent) => deferred.resolve(nfcEvent),
        (err) => deferred.reject(err)
      );

      return deferred.promise;
    },

    shareTextRecord: (message) => {
      const deferred = $q.defer();

      nfc.share(
        [ndef.textRecord(message)],
        (nfcEvent) => deferred.resolve(nfcEvent),
        (err) => deferred.reject(err)
      );

      deferred.promise.cancel = () => {
        nfc.unshare((nfcEvent) => {
          deferred.resolve(nfcEvent);
        });
      };

      return deferred.promise;
    },
  };
}

export { NfcService };
