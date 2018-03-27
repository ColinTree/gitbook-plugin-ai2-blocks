'use strict';

const COLOUR_EVENT = '#B18E35';
const COLOUR_METHOD = '#7C5385';
const COLOUR_GET = '#439970';  // [67, 153, 112]
const COLOUR_SET = '#266643';  // [38, 102, 67]

var ComponentName = "Component1";

var CONF_TEXT_WHEN = 'when';
var CONF_TEXT_DO = 'do';
var CONF_TEXT_CALL = 'call';
var CONF_TEXT_SET = 'set';
var CONF_SCALE_LEVEL = 1;
var CONF_MARGIN_LEFT = 0;
var CONF_MARGIN_TOP = 0;
var CONF_MARGIN_RIGHT = 0;
var CONF_MARGIN_BOTTOM = 0;

// will be increased automatically by getBlock(json)
var blockIndex = 0;
var blockId = 'block0';

require(['gitbook', 'jQuery'], function(gitbook, $) {
  
  gitbook.events.bind("start", function(e, config) {
    var conf = config || {"ai2:blocks":{}};
    CONF_TEXT_WHEN = conf['ai2-blocks']['text_when'] || CONF_TEXT_WHEN;
    CONF_TEXT_DO = conf['ai2-blocks']['text_do'] || CONF_TEXT_DO;
    CONF_TEXT_CALL = conf['ai2-blocks']['text_call'] || CONF_TEXT_CALL;
    CONF_TEXT_SET = conf['ai2-blocks']['text_set'] || CONF_TEXT_SET;
    CONF_SCALE_LEVEL = conf['ai2-blocks']['scale_level'] || CONF_SCALE_LEVEL;
    CONF_MARGIN_LEFT = conf['ai2-blocks']['margin_left'] || conf['ai2-blocks']['margin'] || CONF_MARGIN_LEFT;
    CONF_MARGIN_TOP = conf['ai2-blocks']['margin_top'] || conf['ai2-blocks']['margin'] || CONF_MARGIN_TOP;
    CONF_MARGIN_RIGHT = conf['ai2-blocks']['margin_right'] || conf['ai2-blocks']['margin'] || CONF_MARGIN_RIGHT;
    CONF_MARGIN_BOTTOM = conf['ai2-blocks']['margin_bottom'] || conf['ai2-blocks']['margin'] || CONF_MARGIN_BOTTOM;

    render();
  });

  gitbook.events.bind("page.change", function() {
    render();
  })
});

function render() {
  // METHOD
  $('div[ai2-method]').filter("[not-rendered]").each(function(){
    $(this).removeAttr("not-rendered");
    var block = getBlock(decodeURI($(this).attr("value")));
    
    var name = block['name'];
    var param = block['param'] || block['arg'] || [];
    var output = block['output']===true;
    var scale = block['scale'] || CONF_SCALE_LEVEL;
    var margin_left = block['margin_left'] || block['margin'] || CONF_MARGIN_LEFT;
    var margin_top = block['margin_top'] || block['margin'] || CONF_MARGIN_TOP;
    var margin_right = block['margin_right'] || block['margin'] || CONF_MARGIN_RIGHT;
    var margin_bottom = block['margin_bottom'] || block['margin'] || CONF_MARGIN_BOTTOM;

    $(this).attr('id', blockId).show();

    Blockly.Blocks['dynamicCreated_'+blockId] = {
      init: function() {
        this.appendDummyInput().appendField(CONF_TEXT_CALL).appendField(new Blockly.FieldDropdown([[ComponentName, 'OPTIONNAME']]), 'COMPONENT_SELECTOR').appendField('.'+name);
        for (var i=0; i<param.length; i++) {
          this.appendValueInput('NAME').setAlign(Blockly.ALIGN_RIGHT).appendField(param[i]);
        }
        this.setInputsInline(false);
        if (output) {
          this.setOutput(true, null);
        } else {
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
        }
        this.setColour(COLOUR_METHOD);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };
    
    newBlockAndWorkspace(blockId, scale, margin_left, margin_top, margin_right, margin_bottom);
  });

  // EVENT
  $('div[ai2-event]').filter("[not-rendered]").each(function(){
    $(this).removeAttr("not-rendered");
    var block = getBlock(decodeURI($(this).attr("value")));
    
    var name = block['name'];
    var param = block['param'] || block['arg'] || [];
    var scale = block['scale'] || CONF_SCALE_LEVEL;
    var margin_left = block['margin_left'] || block['margin'] || CONF_MARGIN_LEFT;
    var margin_top = block['margin_top'] || block['margin'] || CONF_MARGIN_TOP;
    var margin_right = block['margin_right'] || block['margin'] || CONF_MARGIN_RIGHT;
    var margin_bottom = block['margin_bottom'] || block['margin'] || CONF_MARGIN_BOTTOM;

    $(this).attr('id', blockId).show();

    Blockly.Blocks['dynamicCreated_'+blockId] = {
      init: function() {
        this.appendDummyInput('').appendField(CONF_TEXT_WHEN).appendField(new Blockly.FieldDropdown([[ComponentName, 'OPTIONNAME']]), "COMPONENT_SELECTOR").appendField('.' + name);
        if (param.length > 0) {
          var paramInput = this.appendDummyInput('PARAMETERS').appendField(" ").setAlign(Blockly.ALIGN_LEFT);
          for (var i=0; i<param.length; i++) {
            paramInput.appendField(new Blockly.FieldTextInput(param[i]), 'VAR'+i).appendField(" ");
          }
        }
        this.appendStatementInput("DO").appendField(CONF_TEXT_DO);
        this.setInputsInline(false);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setColour(COLOUR_EVENT);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };
    
    newBlockAndWorkspace(blockId, scale, margin_left, margin_top, margin_right, margin_bottom);
  });

  // PROPERTY
  $('div[ai2-property]').filter("[not-rendered]").each(function(){
    $(this).removeAttr("not-rendered");
    var block = getBlock(decodeURI($(this).attr("value")));
    
    var name = block['name'];
    var getter = block['getter'];
    if (getter !== true && getter !== false) {
      getter = true;
    }
    var scale = block['scale'] || CONF_SCALE_LEVEL;
    var margin_left = block['margin_left'] || block['margin'] || CONF_MARGIN_LEFT;
    var margin_top = block['margin_top'] || block['margin'] || CONF_MARGIN_TOP;
    var margin_right = block['margin_right'] || block['margin'] || CONF_MARGIN_RIGHT;
    var margin_bottom = block['margin_bottom'] || block['margin'] || CONF_MARGIN_BOTTOM;

    $(this).attr('id', blockId).show();

    Blockly.Blocks['dynamicCreated_'+blockId] = {
      init: function() {
        var input;
        if (getter) {
          input = this.appendDummyInput();
          this.setOutput(true, null);
        } else {
          input = this.appendValueInput("NAME").appendField(CONF_TEXT_SET);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
        }
        input.appendField(new Blockly.FieldDropdown([[ComponentName, 'OPTIONNAME']]), "NAME")
            .appendField(".")
            .appendField(new Blockly.FieldDropdown([[name, "OPTIONNAME"]]), "NAME2");
        this.setColour(getter ? COLOUR_GET : COLOUR_SET);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };
    
    newBlockAndWorkspace(blockId, scale, margin_left, margin_top, margin_right, margin_bottom);
  });
}

/**
 * return a required block
 * @param {*} node for $(node)
 * @returns object or null
 */
function getBlock(json) {
  blockIndex++;
  blockId = 'block' + blockIndex;
  var blockData = JSON.parse(json);
  if (typeof(blockData) != "object") {
    console.error("block info is not a json object");
    return null;
  }
  if (typeof(blockData['componentName']) != "undefined" && blockData['componentName'].length > 0) {
    ComponentName = blockData.componentName;
  }
  return blockData;
}

function newBlockAndWorkspace(id, scale, margin_left, margin_top, margin_right, margin_bottom) {
  var workspace = Blockly.inject(id, {
    toolbox: false,
    trashcan: false,
    readOnly: true,
    scrollbars: false
  });
  workspace.setScale(scale);

  var block = workspace.newBlock('dynamicCreated_'+id);
  block.initSvg();
  block.moveBy(8 + margin_left, margin_top);
  block.render();

  var metrics = workspace.getMetrics();
  $("#"+id)
    .height(metrics.contentHeight + margin_top + margin_bottom)
    .width(metrics.contentWidth + 8 + margin_left + margin_right);
  Blockly.svgResize(workspace);
  workspace.render();
}