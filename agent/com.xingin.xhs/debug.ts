

export function hook_all() {
    trace_java_string()
    hook_delay("libxhsjvmti.so", 0)
}

export function trace_java_string() {
    Java.perform(function () {
        var StringClass = Java.use('java.lang.String');
        var StringConstructor = StringClass.$init.overload('java.lang.String');

        StringConstructor.implementation = function (str) {
            console.log('[*] String Constructor Hooked');
            console.log('[*] String Value: ' + str);

            // 调用原始构造函数
            var result = StringConstructor.call(this, str);

            return result;
        };
    });
}

function hook_delay(soName, offset) {
    let dlopen_addr = Module.findExportByName(null, "dlopen")
    if (dlopen_addr == null) return
    Interceptor.attach(dlopen_addr,
        {
            onEnter: function (args) {
                var pathptr = args[0];
                if (pathptr !== undefined && pathptr != null) {
                    var path = pathptr.readCString();
                    if (path == null) return
                    if (path.indexOf(soName) >= 0) {
                        this.is_can_hook = true;
                        console.log("\n" + soName + "_address:", path);
                    }
                }
            },
            onLeave: function (retval) {
                if (this.is_can_hook) {

                }
            }
        }
    );
    let android_dlopen_ext_addr = Module.findExportByName(null, "android_dlopen_ext")
    if (android_dlopen_ext_addr == null) return;
    Interceptor.attach(android_dlopen_ext_addr,
        {
            onEnter: function (args) {
                var pathptr = args[0];
                if (pathptr !== undefined && pathptr != null) {
                    var path = pathptr.readCString();
                    console.log("android_dlopen_ext:", path);
                    if (path == null) return;
                    if (path.indexOf(soName) >= 0) {
                        this.is_can_hook = true;
                    }
                }
            },
            onLeave: function (retval) {

                if (this.is_can_hook) {
                    console.log('can hook')
                }
            }
        }
    );

}
function hook_delay2(soName, offset) {
    let dlopen_addr = Module.findExportByName(null, "dlopen")
    if (dlopen_addr == null) return
    Interceptor.attach(dlopen_addr,
        {
            onEnter: function (args) {
                var pathptr = args[0];
                if (pathptr !== undefined && pathptr != null) {
                    var path = pathptr.readCString();
                    if (path == null) return
                    if (path.indexOf(soName) >= 0) {
                        this.is_can_hook = true;
                        // console.log("\n" + soName + "_address:", path);
                    }
                }
            },
            onLeave: function (retval) {
                if (this.is_can_hook) {

                }
            }
        }
    );
    let android_dlopen_ext_addr = Module.findExportByName(null, "android_dlopen_ext")
    if (android_dlopen_ext_addr == null) return;
    Interceptor.attach(android_dlopen_ext_addr,
        {
            onEnter: function (args) {
                var pathptr = args[0];
                if (pathptr !== undefined && pathptr != null) {
                    var path = pathptr.readCString();
                    // console.log("android_dlopen_ext:", path);
                    if (path == null) return;
                    if (path.indexOf(soName) >= 0) {
                        this.is_can_hook = true;
                    }
                }
            },
            onLeave: function (retval) {

            }
        }
    );

}

export function trace_button() {
    Java.use('com.example.app.LoadingButton').onClick.implementation = function () {
        // 打印调用堆栈
        var stackTrace = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("调用堆栈:\n" + stackTrace);

        // 调用原始方法
        this.onClick.apply(this, arguments);
    }
}