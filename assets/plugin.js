'use strict';

const COLOUR_EVENT = '#B18E35';
const COLOUR_METHOD = '#7C5385';
const COLOUR_GET = '#439970';  // [67, 153, 112]
const COLOUR_SET = '#266643';  // [38, 102, 67]

var ComponentName = "Component1";

var TEXT_WHEN = 'when';
var TEXT_DO = 'do';
var TEXT_CALL = 'call';
var TEXT_SET = 'set';
var SCALE_LEVEL = 1;

// will be increased automatically by getBlock(json)
var blockIndex = 0;
var blockId = 'block0';

require(['gitbook', 'jQuery'], function(gitbook, $) {
  
  gitbook.events.bind("start", function(e, config) {
    var conf = config || {};
    TEXT_WHEN = conf['ai2-blocks']['text_when'] || TEXT_WHEN;
    TEXT_DO = conf['ai2-blocks']['text_do'] || TEXT_DO;
    TEXT_CALL = conf['ai2-blocks']['text_call'] || TEXT_CALL;
    TEXT_SET = conf['ai2-blocks']['text_set'] || TEXT_SET;
    SCALE_LEVEL = conf['ai2-blocks']['scale_level'] || SCALE_LEVEL;
    
    // METHOD
    $('div[ai2-method]').each(function(){
      var block = getBlock(decodeURI($(this).attr("value")));
      
      var name = block['name'];
      var arg = block['arg'] || [];
      var output = block['output']===true;
      var scale = block['scale'] || SCALE_LEVEL;

      $(this).attr('id', blockId).show();

      Blockly.Blocks['dynamicCreated_'+blockId] = {
        init: function() {
          this.appendDummyInput().appendField(TEXT_CALL).appendField(new Blockly.FieldDropdown([[ComponentName, 'OPTIONNAME']]), 'COMPONENT_SELECTOR').appendField('.'+name);
          for (var i=0; i<arg.length; i++) {
            this.appendValueInput('NAME').setAlign(Blockly.ALIGN_RIGHT).appendField(arg[i]);
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
      
      newBlockAndWorkspace(blockId, scale).moveBy(output?8:0, 0);
    });

    // EVENT
    $('div[ai2-event]').each(function(){
      var block = getBlock(decodeURI($(this).attr("value")));
      
      var name = block['name'];
      var arg = block['arg'] || [];
      var scale = block['scale'] || SCALE_LEVEL;
  
      $(this).attr('id', blockId).show();
  
      Blockly.Blocks['dynamicCreated_'+blockId] = {
        init: function() {
          this.appendDummyInput('').appendField(TEXT_WHEN).appendField(new Blockly.FieldDropdown([[ComponentName, 'OPTIONNAME']]), "COMPONENT_SELECTOR").appendField('.' + name);
          if (arg.length > 0) {
            var paramInput = this.appendDummyInput('PARAMETERS').appendField(" ").setAlign(Blockly.ALIGN_LEFT);
            for (var i=0; i<arg.length; i++) {
              paramInput.appendField(new Blockly.FieldTextInput(arg[i]), 'VAR'+i).appendField(" ");
            }
          }
          this.appendStatementInput("DO").appendField(TEXT_DO);
          this.setInputsInline(false);
          this.setPreviousStatement(false, null);
          this.setNextStatement(false, null);
          this.setColour(COLOUR_EVENT);
          this.setTooltip('');
          this.setHelpUrl('');
        }
      };
      
      newBlockAndWorkspace(blockId, scale);
    });
  
    // PROPERTY
    $('div[ai2-property]').each(function(){
      var block = getBlock(decodeURI($(this).attr("value")));
      
      var name = block['name'];
      var getter = block['getter'];
      if (getter !== true && getter !== false) {
        getter = true;
      }
      var scale = block['scale'] || SCALE_LEVEL;
  
      $(this).attr('id', blockId).show();
  
      Blockly.Blocks['dynamicCreated_'+blockId] = {
        init: function() {
          var input;
          if (getter) {
            input = this.appendDummyInput();
            this.setOutput(true, null);
          } else {
            input = this.appendValueInput("NAME").appendField(TEXT_SET);
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
      
      newBlockAndWorkspace(blockId, scale).moveBy((getter?8:0), 0);
    });
  });
});

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

function newBlockAndWorkspace(id, scale) {
  var workspace = Blockly.inject(id, {
    toolbox: false,
    trashcan: false,
    readOnly: true,
    scrollbars: false
  });
  workspace.setScale(scale);

  var block = workspace.newBlock('dynamicCreated_'+id);
  block.initSvg();
  block.render();

  var metrics = workspace.getMetrics();
  $("#"+id).height(metrics.contentHeight).width(metrics.contentWidth);
  Blockly.svgResize(workspace);
  workspace.render();

  return block;
}