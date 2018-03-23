module.exports = {
    book: {
        assets: "./assets",
        css: ["plugin.css"],
        js: ["blockly_compressed.js", "plugin.js"]
    },
    blocks: {
        // "{% Ai2Method %}{"name":"MethodName", "componentName":"ComponentName", "arg":["arg1","arg2"]}{% endAi2Method %}"
        Ai2Method: {
            process: function(blk) {
                return "<div ai2-method value=\""+encodeURI(blk.body)+"\"></div>";
            }
        },
        // "{% Ai2Event %}{"name":"EventName", "componentName":"ComponentName", "arg":["arg1","arg2"]}{% endAi2Event %}"
        Ai2Event: {
            process: function(blk) {
                return "<div ai2-event value=\""+encodeURI(blk.body)+"\"></div>";
            }
        },
        // "{% Ai2Property %}{"name":"PropertyName", "componentName":"ComponentName", "getter":true|false}{% endAi2Property %}"
        Ai2Property: {
            process: function(blk) {
                return "<div ai2-property value=\""+encodeURI(blk.body)+"\"></div>";
            }
        },
    }
}