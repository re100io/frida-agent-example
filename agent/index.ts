/** test.js **/

import { debug_all } from "./debug";
import { hook_all } from "./hook";

function main() {
    Java.perform(function () {
        console.log("Hello Frida")
        hook_all();
        debug_all();
    })
}


setImmediate(main)