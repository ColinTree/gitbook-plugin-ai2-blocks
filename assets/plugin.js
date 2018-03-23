'use strict';

const COLOUR_EVENT = '#B18E35';
const COLOUR_METHOD = '#7C5385';
const COLOUR_GET = '#439970';  // [67, 153, 112]
const COLOUR_SET = '#266643';  // [38, 102, 67]

var ComponentName = "Component1";
var ComponentDropDown = null;

var TEXT_WHEN = 'when';
var TEXT_DO = 'do';
var TEXT_CALL = 'call';
var TEXT_SET = 'set';

require(['gitbook', 'jQuery'], function(gitbook, $) {
  
  gitbook.events.bind("start", function(e, config) {
    var conf = config || {};
    TEXT_WHEN = conf['ai2-blocks']['text_when'] || TEXT_WHEN;
    TEXT_DO = conf['ai2-blocks']['text_do'] || TEXT_DO;
    TEXT_CALL = conf['ai2-blocks']['text_call'] || TEXT_CALL;
    TEXT_SET = conf['ai2-blocks']['text_set'] || TEXT_SET;
    
    ComponentDropDown = new Blockly.FieldDropdown([[ComponentName, 'OPTIONNAME']]);
    // METHOD
    $('div[ai2-method]').each(function(){
      var block = getBlock(decodeURI($(this).attr("value")));
      
      var name = block['name'];
      var arg = block['arg'] || [];
      var divId = 'method_'+name;

      $(this).attr('id', divId).show();

      Blockly.Blocks['dynamicCreated_'+divId] = {
        init: function() {
          this.appendDummyInput().appendField(TEXT_CALL).appendField(ComponentDropDown, 'COMPONENT_SELECTOR').appendField('.'+name);
          for (var i=0; i<arg.length; i++) {
            this.appendValueInput('NAME').setAlign(Blockly.ALIGN_RIGHT).appendField(arg[i]);
          }
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(COLOUR_METHOD);
          this.setTooltip('');
          this.setHelpUrl('');
        }
      };
      
      newBlockAndWorkspace(divId);
    });

    // EVENT
    $('div[ai2-event]').each(function(){
      var block = getBlock(decodeURI($(this).attr("value")));
      
      var name = block['name'];
      var arg = block['arg'] || [];
      var divId = 'event_'+name;
  
      $(this).attr('id', divId).show();
  
      Blockly.Blocks['dynamicCreated_'+divId] = {
        init: function() {
          this.appendDummyInput('').appendField(TEXT_WHEN).appendField(ComponentDropDown, "COMPONENT_SELECTOR").appendField('.' + name);
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
      
      newBlockAndWorkspace(divId);
    });
  
    // PROPERTY
    $('div[ai2-property]').each(function(){
      var block = getBlock(decodeURI($(this).attr("value")));
      
      var name = block['name'];
      var getter = block['getter'];
      if (getter !== true && getter !== false) {
        getter = true;
      }
      var divId = 'property_'+(getter?'getter':'setter')+'_'+name;
  
      $(this).attr('id', divId).show();
  
      Blockly.Blocks['dynamicCreated_'+divId] = {
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
          input.appendField(ComponentDropDown, "NAME")
              .appendField(".")
              .appendField(new Blockly.FieldDropdown([[name, "OPTIONNAME"]]), "NAME2");
          this.setColour(getter ? COLOUR_GET : COLOUR_SET);
          this.setTooltip('');
          this.setHelpUrl('');
        }
      };
      
      newBlockAndWorkspace(divId).moveBy((getter?8:0), 0);
    });
  });
});

/**
 * return a required block
 * @param {*} node for $(node)
 * @returns object or null
 */
function getBlock(json) {
  var blockData = JSON.parse(json);
  if (typeof(blockData) != "object") {
    console.error("block info is not a json object");
    return null;
  }
  if (typeof(blockData['componentName']) != "undefined" && blockData['componentName'].length > 0) {
    ComponentName = blockData.componentName;
    ComponentDropDown = new Blockly.FieldDropdown([[ComponentName, 'OPTIONNAME']]);
  }
  return blockData;
}

function newBlockAndWorkspace(id) {
  var workspace = Blockly.inject(id, {
    toolbox: false,
    trashcan: false,
    readOnly: true,
    scrollbars: false,
    startScale: 0.5
  });

  var block = workspace.newBlock('dynamicCreated_'+id);
  block.initSvg();
  block.render();
  
  var metrics = workspace.getMetrics();
  $("#"+id).height(metrics.contentHeight).width(metrics.contentWidth);
  Blockly.svgResize(workspace);
  workspace.render();

  return block;
}