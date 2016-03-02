function NfcService($q) {
    'ngInject';
    return {
        NdefListener: () => {
            var q = $q.defer();

            var cb = (nfcEvent) => {
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
            var q = $q.defer();

            nfc.write([ndef.textRecord(message)], (nfcEvent) => {
                q.resolve(nfcEvent);
            }, (err) => {
                q.reject(err);
            });

            return q.promise;
        }
    }
}

export { NfcService };
