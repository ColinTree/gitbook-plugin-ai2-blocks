# gitbook-plugin-ai2-blocks

A plugin for gitbook, allowing create blocks through blockly with a piece of text.

It is actually creating workspace for each block, and then resize the workspace so that it just fits size the block.

## Plugin Config

* **text_call** text `call` for methods
* **text_do**   text `do` for events
* **text_set**  text `set` for properties
* **text_when** text `when` for events
* **scale_level** scale level for all blocks

e.g.

```
{
    "author": "Colintree <502470184@qq.com>",
    "plugins": [
        "ai2-blocks@git+https://github.com/ColinTree/gitbook-plugin-ai2-blocks.git#1.0.0"
    ],
    "pluginsConfig": {
        "ai2-blocks": {
            "text_call": "call",
            "text_do": "do",
            "text_set": "set",
            "text_when": "when",
            "scale_level": 0.9
        }
    }
}
```

## How to use / Example

```markdown
# test
---

{% Ai2Method %}{"name":"MethodName", "componentName":"compName1", "arg":["arg1","arg2"]}{% endAi2Method %}

{% Ai2Method %}{"name":"MethodName2", "arg":["arg1","arg2"], "output":true}{% endAi2Method %}

{% Ai2Method %}{"name":"MethodName2", "arg":["arg1","arg2"], "output":true, "scale":0.9}{% endAi2Method %}

{% Ai2Event %}{"name":"EventName", "componentName":"compName2", "arg":["arg1","arg2"]}{% endAi2Event %}

{% Ai2Property %}{"name":"PropertyName", "componentName":"compName3", "getter":true}{% endAi2Property %}

{% Ai2Property %}{"name":"PropertyName2", "getter":false}{% endAi2Property %}
```

will be converted into:

![](example.png)