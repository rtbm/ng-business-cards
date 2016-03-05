function NfcService($q) {
  'ngInject';
  return {
    NdefListener: () => {
      const q = $q.defer();

      const cb = (nfcEvent) => {
        q.resolve(nfcEvent);
      };

      nfc.addNdefListener(cb, () => {
        q.notify('Waiting for NFC');
      }, (err) => {
        q.reject(err);
      });

      q.promise.cancel = () => {
        nfc.removeNdefListener(cb);
      };

      return q.promise;
    },

    writeTextRecord: (message) => {
      const q = $q.defer();

      nfc.write([ndef.textRecord(message)], (nfcEvent) => {
        q.resolve(nfcEvent);
      }, (err) => {
        q.reject(err);
      });

      return q.promise;
    },

    shareTextRecord: (message) => {
      const q = $q.defer();

      nfc.write([share.textRecord(message)], (nfcEvent) => {
        q.resolve(nfcEvent);
      }, (err) => {
        q.reject(err);
      });

      return q.promise;
    },
  };
}

export { NfcService };
