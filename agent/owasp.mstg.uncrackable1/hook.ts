
// Hooking the 'c' method
export function hook_all() {
    var c = Java.use('sg.vantagepoint.a.c');
    c.c.implementation = function () {
        console.log('Modified c() method');
        // Always return false to bypass the check
        return false;
    }

    c.b.implementation = function () {
        console.log('Modified b() method');
        // Always return false to bypass the check
        return false;
    }

    c.a.implementation = function () {
        console.log('Modified a() method');
        // Always return false to bypass the check
        return false;
    }

    var b = Java.use('sg.vantagepoint.a.b');
    b.a.implementation = function () {
        console.log('Modified b.a() method');
        return false;
    }
}