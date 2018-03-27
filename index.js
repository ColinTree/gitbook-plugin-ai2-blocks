module.exports = {
    book: {
        assets: "./assets",
        css: ["plugin.css"],
        js: ["blockly_compressed.js", "plugin.js"]
    },
    blocks: {
        Ai2Method: {
            process: function(blk) {
                return "<div ai2-method value=\""+encodeURI(blk.body)+"\"></div>";
            }
        },
        Ai2Event: {
            process: function(blk) {
                return "<div ai2-event value=\""+encodeURI(blk.body)+"\"></div>";
            }
        },
        Ai2Property: {
            process: function(blk) {
                return "<div ai2-property value=\""+encodeURI(blk.body)+"\"></div>";
            }
        },
    }
}