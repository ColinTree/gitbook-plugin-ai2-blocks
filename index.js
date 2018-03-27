module.exports = {
    book: {
        assets: "./assets",
        css: ["plugin.css"],
        js: ["blockly_compressed.js", "plugin.js"]
    },
    blocks: {
        Ai2Method: {
            process: function(blk) {
                return "<div ai2-block=\"method\" not-rendered value=\""+encodeURI(blk.body)+"\"></div>";
            }
        },
        Ai2Event: {
            process: function(blk) {
                return "<div ai2-block=\"event\" not-rendered value=\""+encodeURI(blk.body)+"\"></div>";
            }
        },
        Ai2Property: {
            process: function(blk) {
                return "<div ai2-block=\"property\" not-rendered value=\""+encodeURI(blk.body)+"\"></div>";
            }
        },
    }
}