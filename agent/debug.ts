export function debug_all() {
    Java.use('sg.vantagepoint.a.a').a.overload('[B', '[B').implementation = function (bArr, bArr2) {
        var result = this.a(bArr, bArr2);
        var resultStr = '';

        for (var i = 0; i < result.length; i++) {
            resultStr += String.fromCharCode(result[i]);
        }

        console.log('Decrypted result: ' + resultStr);

        return result;
    }
}