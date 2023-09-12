import { hook_all } from "./debug";

function main() {
    Java.perform(function () {
        console.log("Hello Frida")
        hook_all();
    })
}

function hook_register() {

}


setImmediate(main)