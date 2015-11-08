# flow-view

> Visual editor for dataflow programming, powered by [svg.js][1]

[![Project Status](https://stillmaintained.com/fibo/flow-view.png)](https://stillmaintained.com/fibo/flow-view) [![NPM version](https://badge.fury.io/js/flow-view.png)](http://badge.fury.io/js/flow-view) [![Dependency Status](https://gemnasium.com/fibo/flow-view.png)](https://gemnasium.com/fibo/flow-view)

[![NPM](https://nodei.co/npm-dl/flow-view.png)](https://nodei.co/npm-dl/flow-view/)

[![Throughput Graph](https://graphs.waffle.io/fibo/flow-view/throughput.svg)](https://waffle.io/fibo/flow-view)

## Description

*flow-view* is a reusable visual editor you can use to provide a GUI to your dataflow project. I am using it for [dflow][2], but, I would like it'd be used by other node projects, like [graft](https://github.com/GraftJS/graft).

> Please, help me give Node a common visual interface. Use *flow-view*!

Any feedback is welcome!

### Status

The goal to achieve with version **1.0** is to let *flow-view* be a minimal visual editor but extensible.
I am adding [events](#events) to let integrate with other libs.

## Installation

With [bower](http://bower.io/) do

```bash
$ bower install flow-view
```

Note that *flow-view* should be used client side. However, if you want to import it in your Node package
and bundle it with browserify, or whatever, you can install it with [npm](https://npmjs.org/) doing

```bash
$ npm install flow-view
```

## Synopsis

Go to [examples/synopsis.html](http://g14n.info/flow-view/examples/synopsis.html) to see results.

```html
<div id="drawing"></div>
<script type="text/javascript" src="path/to/flowView.js"></script>
<script type="text/javascript">
  var Canvas = require(flow-view).Canvas,
      view = {
        node: {
          a: {
            x: 80, y: 100,
            text: "Drag me",
            outs: [{name: "out0"}]
          },
          b: {
            x: 180, y: 200,
            text: "Hello",
            ins: [{name: "in0"}, {name: "in1"}]
          }
       },
       link: {
         1: {
           from: ['a', 0],
           to: ['b', 1]
         }
       }
     }

  var canvas = new Canvas('drawing')

  canvas.render(view)
</script>
```

## Canvas

A *Canvas* need to know its *div* id which will be passed to [svg.js][1]. In your HTML file, put a *div* like this

```html
<div id="drawing"></div>
```

Create a [view object](#view)

```
var view = {
      node: {
        a: {
          x: 80, y: 100,
          text: "Drag me",
          outs: [{name: "out0"}]
        },
        b: {
          x: 180, y: 100,
          text: "Hello",
          ins: [{name: "in0"}, {name: "in1"}]
        }
     },
     link: {
        1: {
         from: ['a', 0],
         to: ['b', 1]
     }
   }
```

Create a *canvas* instance

```js
  var canvas = new Canvas('drawing')
```

and render a view graph

```js
  canvas.render(view)
```

### view

The *view* object contains two collections:

  * [node]{view-node}
  * [link]{view-link}

Any other property of the *view* object will be just ignored.

### view.node

The *view.node* collection contains the canvas nodes, that are objects with the following attributes

#### x

The *x* coord of the top left vertex of the node.

#### y

The *y* coord of the top left vertex of the node.

#### w

The *width* of the rect containing the node. It is expressed in width units.
It defaults to a value enough to contain node text.

#### h

The *height* of the rect containing the node. It is expressed in height units.
It defaults to 1.

#### text

The *text* label displayed in the node.

#### ins

An optional list of *node inputs*, which are objects that can contain anything accepted by JSON.

#### outs

An optional list of *node outputs*, which are objects that can contain anything accepted by JSON.

### view.link

The *view.link* collection contains the canvas links, that are objects with the following attributes

#### from

An array with two entries:

  0. The key of the source node.
  1. The position of the output.

#### to

An array with two entries:

  0. The key of the target node.
  1. The position of the input.

## Events

The following events are triggered

| eventName  | eventData                        |
| ---------- | -------------------------------- |
| addNode    | `{"text":"ciao","x":326,"y":82}` |
| addLink    | `{"from":["a",0],"to":["b",1]}`  |
| delNode    | `{"nodeid":"a"}`                 |
| delLink    | `{"linkid":"c"}`                 |
| moveNode   | `{"nodeid":"a","x":362,"y":98}`  |
| addInput   | `{"nodeid":"a","position":0}`    |
| addOutput  | `{"nodeid":"c","position":2}`    |
| renameNode | `{"nodeid":"a","text":"foo"}`    |
| selectNode | `{"nodeid":"a"}`                 |

For example, I used events in [dflow][2] editor to save the view server side, using [Socket.IO](http://socket.io/).

Follows an example that uses events to log their data.

```
var eventNames = ['addLink' , 'addNode',
                  'addInput', 'addOutput',
                  'delLink' , 'delNode'  ,
                  'moveNode', 'renameNode', 'selectNode']

eventNames.forEach(function (eventName) {
  canvas.broker.on(eventName, function (ev) {
    console.log(eventName, ev)
  })
})
```

Go to [examples/event-log.html](http://g14n.info/flow-view/examples/event-log.html) to see results.

## NodeSelector

When you double click on svg canvas, a foreign object input text will appear;
you can use it to create new nodes.

The [NodeSelector](https://github.com/fibo/flow-view/blob/master/src/NodeSelector.js) supports autocompletion via [datalist](https://developer.mozilla.org/it/docs/Web/HTML/Element/datalist).


See [examples/autocompletion-from-url.html](http://g14n.info/flow-view/examples/autocompletion-from-url.html).

## Support and License

*flow-view* is [MIT](http://g14n.info/mit-license) licensed.

  [1]: http://svgjs.com/ "SVG.js"
  [2]: http://g14n.info/dflow "dflow"

