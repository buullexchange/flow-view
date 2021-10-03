var W=Object.defineProperty,G=Object.defineProperties;var V=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var D=(r,e,t)=>e in r?W(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,u=(r,e)=>{for(var t in e||(e={}))O.call(e,t)&&D(r,t,e[t]);if(_)for(var t of _(e))j.call(e,t)&&D(r,t,e[t]);return r},k=(r,e)=>G(r,V(e));var B=(r,e)=>{var t={};for(var s in r)O.call(r,s)&&e.indexOf(s)<0&&(t[s]=r[s]);if(r!=null&&_)for(var s of _(r))e.indexOf(s)<0&&j.call(r,s)&&(t[s]=r[s]);return t};var a=(r,e,t)=>(D(r,typeof e!="symbol"?e+"":e,t),t);const f=r=>`${r}--highlighted`,z=r=>({transition:`${r} 117ms ease-in-out`}),T=r=>`--fv-default-${r}`,b=r=>`var(--fv-${r}, var(${T(r)}))`,c={backgroundColor:b("background-color"),borderRadius:b("border-radius"),boxShadow:b("box-shadow"),connectionColor:b("connection-color"),connectionColorHighlighted:b(f("connection-color")),fontFamily:b("font-family"),fontSize:b("font-size"),nodeBackgroundColor:b("node-background-color"),nodeBorderColorHighlighted:b(f("node-border-color")),textColor:b("text-color")},Y={"border-radius":"2px","font-family":"sans-serif","font-Size":"17px"},H={light:k(u({},Y),{"background-color":"#fefefe","connection-color":"#ccc","box-shadow":"0px 0px 7px 1px rgba(0, 0, 0, 0.1)",[f("connection-color")]:"#717171","node-background-color":"#fefefe",[f("node-border-color")]:"#717171","text-color":"#111"}),dark:{"background-color":"#555","connection-color":"#aaa","box-shadow":"0px 0px 7px 1px rgba(117, 117, 117, 0.7)",[f("connection-color")]:"#ddd","node-background-color":"#212121",[f("node-border-color")]:"#efefef","text-color":"#bbb"}},M=r=>Object.entries(H[r]).reduce((e,[t,s])=>k(u({},e),{[T(t)]:s}),{});export{f as cssModifierHighlighted};export{z as cssTransition};export{c as cssVar};export{H as cssDefault};export{M as cssTheme};class P{static generateId(e){const t=Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,5);return e.shadowRoot.getElementById(t)?P.generateId(e):t}constructor(n){var o=n,{cssClassName:e,id:t,view:s}=o,i=B(o,["cssClassName","id","view"]);const h=t||P.generateId(s),d=this.element=document.createElement("div");d.setAttribute("id",h),d.classList.add(e),s.shadowRoot.appendChild(d),this.view=s,this._selected=!1,this.cssClassName=e,this.init(i)}init(){}dispose(){}get bounds(){return this.element.getBoundingClientRect()}get id(){return this.element.getAttribute("id")}set highlight(e){const t=f(this.cssClassName);e?this.element.classList.add(t):this.element.classList.remove(t)}get isSelected(){return this._selected}set selected(e){e?this._selected=!0:this._selected=!1}createDiv(e){const t=document.createElement("div");return t.classList.add(e),this.element.appendChild(t),t}createSvg(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}remove(){this.dispose(),this.element.remove()}toObject(){return{id:this.id}}}export{P as FlowViewBase};const N=class extends P{init({node:e}){this.node=e,this._onPointerdown=this.onPointerdown.bind(this),this.element.addEventListener("pointerdown",this._onPointerdown),this._onPointerenter=this.onPointerenter.bind(this),this.element.addEventListener("pointerenter",this._onPointerenter),this._onPointerleave=this.onPointerleave.bind(this),this.element.addEventListener("pointerleave",this._onPointerleave),this._onPointerup=this.onPointerup.bind(this),this.element.addEventListener("pointerup",this._onPointerup)}get halfPinSize(){return Math.round(N.size/2)}dispose(){this.element.removeEventListener("pointerdown",this._onPointerdown),this.element.removeEventListener("pointerenter",this._onPointerenter),this.element.removeEventListener("pointerleave",this._onPointerleave),this.element.removeEventListener("pointerup",this._onPointerup)}onPointerleave(e){e.stopPropagation(),this.highlight=!1}};let g=N;a(g,"cssClassName","fv-pin"),a(g,"size",10),a(g,"style",{[`.${N.cssClassName}`]:u({"background-color":c.connectionColor,display:"block",width:`${N.size}px`,height:`${N.size}px`},z("background-color")),[`.${f(N.cssClassName)}`]:{"background-color":c.connectionColorHighlighted}});export{g as FlowViewPin};class I extends g{get center(){const{bounds:{x:e},halfPinSize:t,node:{borderWidth:s,bounds:{x:i},position:{x:n,y:o}}}=this,h=e-i;return{x:n+t+s+h,y:o+t-s}}onPointerdown(e){e.stopPropagation()}onPointerenter(e){e.stopPropagation(),!this.view.isDraggingEdge&&(this.highlight=!0)}onPointerup(){const{view:e}=this;if(e.isDraggingEdge){const{semiEdge:t}=e;if(t.hasSourcePin){const{source:s}=t;e.newEdge({source:s,target:this})}}}}class A extends g{get center(){const{bounds:{x:e},halfPinSize:t,node:{borderWidth:s,bounds:{height:i,x:n},position:{x:o,y:h}}}=this,d=e-n;return{x:o+t+s+d,y:h+i-t-s}}onPointerdown(e){e.isBubblingFromPin=!0,this.view.createSemiEdge({source:this})}onPointerenter(e){e.stopPropagation(),!this.view.isDraggingEdge&&(this.highlight=!0)}onPointerup(e){}}const L=class extends P{get hasSourcePin(){return this.source instanceof A}get hasTargetPin(){return this.target instanceof I}get isSemiEdge(){return!this.hasTargetPin||!this.hasSourcePin}init({source:e,target:t}){const s=e instanceof A,i=t instanceof I;this.source=i&&!s?{center:{x:t.center.x,y:t.center.y}}:e,this.target=s&&!i?{center:{x:e.center.x,y:e.center.y}}:t;const n=this.svg=this.createSvg("svg");this.element.appendChild(n);const o=this.line=this.createSvg("line");n.appendChild(o),this.updateGeometry(),this._onPointerdownLine=this.onPointerdownLine.bind(this),o.addEventListener("pointerdown",this._onPointerdownLine),this._onPointerenterLine=this.onPointerenterLine.bind(this),o.addEventListener("pointerenter",this._onPointerenterLine),this._onPointerleaveLine=this.onPointerleaveLine.bind(this),o.addEventListener("pointerleave",this._onPointerleaveLine)}dispose(){const{line:e}=this;e.removeEventListener("pointerdown",this._onPointerdownLine),e.removeEventListener("pointerenter",this._onPointerenterLine),e.removeEventListener("pointerleave",this._onPointerleaveLine)}set start({x:e,y:t}){this.line.setAttribute("x1",Math.round(e)),this.line.setAttribute("y1",Math.round(t))}set end({x:e,y:t}){this.line.setAttribute("x2",Math.round(e)),this.line.setAttribute("y2",Math.round(t))}set dimension([e,t]){const{lineWidth:s}=L,{element:{style:i},svg:n}=this,o=Math.max(e,s),h=Math.max(t,s);i.width=`${o}px`,i.height=`${h}px`,n.setAttribute("width",o),n.setAttribute("height",h)}set position({x:e,y:t}){const{element:{style:s}}=this;s.top=`${t}px`,s.left=`${e}px`}onPointerdownLine(e){e.stopPropagation(),e.shiftKey||this.view.clearSelection(),this.view.selectEdge(this)}onPointerenterLine(){this.isSemiEdge||this.view.isDraggingEdge||this.isSelected||(this.highlight=!0,this.source.highlight=!0,this.target.highlight=!0)}onPointerleaveLine(){this.isSemiEdge||this.isSelected||(this.highlight=!1,this.source.node.isSelected||(this.source.highlight=!1),this.target.node.isSelected||(this.target.highlight=!1))}updateGeometry(){const{source:{center:{x:e,y:t}},target:{center:{x:s,y:i}},view:{origin:{x:n,y:o}}}=this,h=s<e,d=i<t;this.position={x:Math.round((h?s:e)-n),y:Math.round((d?i:t)-o)};const l=Math.abs(Math.round(s-e)),p=Math.abs(Math.round(i-t));this.dimension=[l,p],this.start={x:h?l:0,y:d?p:0},this.end={x:h?0:l,y:d?0:p}}toObject(){const{isSemiEdge:e,source:t,target:s}=this;if(e)return;const i=t.node.id,n=t.id,o=s.node.id,h=s.id;return k(u({},super.toObject()),{from:[i,n],to:[o,h]})}};let m=L;a(m,"cssClassName","fv-edge"),a(m,"lineWidth",2),a(m,"zIndex",0),a(m,"style",{[`.${L.cssClassName}`]:{display:"inline-block",position:"absolute",border:0,"pointer-events":"none"},[`.${L.cssClassName} line`]:u({"pointer-events":"all",stroke:c.connectionColor,"stroke-width":L.lineWidth},z("stroke")),[`.${f(L.cssClassName)} line`]:{stroke:c.connectionColorHighlighted}});export{m as FlowViewEdge};const v=class extends P{init({label:e,inputs:t=[],outputs:s=[],x:i,y:n}){const{element:o}=this;this.borderWidth=v.borderWidth,this._inputs=new Map,this.inputListDiv=this.createDiv("pins");for(const h of t)this.newInput(h);this.labelDiv=this.createDiv("label"),this.label=e,this._outputs=new Map,this.outputListDiv=this.createDiv("pins");for(const h of s)this.newOutput(h);this.position={x:i,y:n},this._onDblclick=this.onDblclick.bind(this),o.addEventListener("dblclick",this._onDblclick),this._onPointerdown=this.onPointerdown.bind(this),o.addEventListener("pointerdown",this._onPointerdown)}dispose(){const{element:e}=this;e.removeEventListener("dblclick",this._onDblclick),e.removeEventListener("pointerdown",this._onPointerdown)}get label(){return this.labelDiv.textContent}set label(e){this.labelDiv.textContent=e}get inputs(){return Array.from(this._inputs.values())}get outputs(){return Array.from(this._outputs.values())}get position(){return{x:this.x,y:this.y}}set position({x:e=0,y:t=0}={}){const{element:s,view:i}=this;this.x=e,this.y=t,s.style.top=`${t-i.origin.y}px`,s.style.left=`${e-i.origin.x}px`}deleteInput(e){this._inputs.get(e).remove(),this._inputs.delete(e)}deleteOutput(e){this._outputs.get(e).remove(),this._outputs.delete(e)}input(e){return this._inputs.get(e)}output(e){return this._outputs.get(e)}newInput({id:e}){const t=new I({id:e,node:this,view:this.view,cssClassName:g.cssClassName});this._inputs.set(t.id,t),this.inputListDiv.appendChild(t.element)}newOutput({id:e}){const t=new A({id:e,node:this,view:this.view,cssClassName:g.cssClassName});this._outputs.set(t.id,t),this.outputListDiv.appendChild(t.element)}onDblclick(e){e.stopPropagation()}onPointerdown(e){if(e.isBubblingFromPin)return;e.isBubblingFromNode=!0,e.shiftKey||this.view.hasSelectedNodes&&this.isSelected||this.view.clearSelection(),this.view.selectNode(this)}toObject(){return u({},super.toObject())}};let w=v;a(w,"cssClassName","fv-node"),a(w,"borderWidth",1),a(w,"minSize",g.size*4),a(w,"zIndex",m.zIndex+1),a(w,"style",{[`.${v.cssClassName}`]:u({position:"absolute","background-color":c.nodeBackgroundColor,"border-radius":c.borderRadius,"box-shadow":c.boxShadow,display:"flex","flex-direction":"column","justify-content":"space-between",border:`${v.borderWidth}px solid transparent`,"min-height":`${v.minSize}px`,"min-width":`${v.minSize}px`,width:"fit-content","z-index":v.zIndex},z("border-color")),[`.${f(v.cssClassName)}`]:{"border-color":c.nodeBorderColorHighlighted},[`.${v.cssClassName} .label`]:{"user-select":"none","padding-left":"0.5em","padding-right":"0.5em"},[`.${v.cssClassName} .pins`]:{display:"flex","flex-direction":"row","justify-content":"space-between",height:`${g.size}px`}});export{w as FlowViewNode};const S=class extends P{init({position:e}){const{element:t}=this;t.setAttribute("tabindex",0);const s=this.input=document.createElement("input");t.appendChild(s);const i=this.hint=document.createElement("input");i.classList.add(`${S.cssClassName}__hint`),t.appendChild(i),this.position=e,this._onDblclick=this.onDblclick.bind(this),t.addEventListener("dblclick",this._onDblclick),this._onKeydown=this.onKeydown.bind(this),t.addEventListener("keydown",this._onKeydown),this._onPointerdown=this.onPointerdown.bind(this),t.addEventListener("pointerdown",this._onPointerdown)}dispose(){const{element:e}=this;e.removeEventListener("dblclick",this._onDblclick),e.removeEventListener("keydown",this._onKeydown),e.removeEventListener("pointerdown",this._onPointerdown)}focus(){this.input.focus()}get suggestion(){return this.hint.getAttribute("placeholder")}set suggestion(e){this.hint.setAttribute("placeholder",e)}set position({x:e,y:t}){const{element:s,view:i}=this;s.style.top=`${t-i.origin.y}px`,s.style.left=`${e-i.origin.x}px`,this.x=e,this.y=t}get position(){return{x:this.x,y:this.y}}onDblclick(e){e.stopPropagation()}onKeydown(e){switch(e.stopPropagation(),!0){case e.code==="Enter":{const{x:t,y:s}=this.position;this.view.newNode({x:t,y:s,label:this.input.value}),this.view.removeSelector();break}case e.code==="Escape":{this.view.removeSelector();break}case e.code==="Tab":{e.preventDefault();const{suggestion:t}=this;t&&(this.input.value=t);break}default:}}onPointerdown(e){e.stopPropagation()}};let E=S;a(E,"cssClassName","fv-selector"),a(E,"zIndex",w.zIndex+1),a(E,"style",{[`.${S.cssClassName}`]:{position:"absolute","box-shadow":c.boxShadow,"z-index":S.zIndex},[`.${S.cssClassName} input`]:{border:0,margin:0,outline:0,"border-radius":c.borderRadius,"font-family":c.fontFamily,"font-size":c.fontSize,padding:"0.5em"},[`.${S.cssClassName}__hint`]:{position:"absolute",left:"0",background:"transparent","pointer-events":"none"},[`.${S.cssClassName}__hint::placeholder`]:{opacity:"0.4"}});const y=class extends HTMLElement{static generateStylesheet(e){return Object.entries(e).reduce((t,[s,i])=>[t,`${s} {`,Object.entries(i).map(([n,o])=>`  ${n}: ${o};`).join(`
`),"}"].join(`
`),"")}static pointerCoordinates(e){const{clientX:t,clientY:s,target:i}=e,{left:n,top:o}=i.getBoundingClientRect(),h=Math.round(t-n),d=Math.round(s-o);return{x:h,y:d}}constructor(){super();const e=document.createElement("template");e.innerHTML=["<style>",y.generateStylesheet(y.style),"@media (prefers-color-scheme: dark) {",y.generateStylesheet({":host":M("dark")}),"}","</style>"].join(`
`),this.attachShadow({mode:"open"}).appendChild(e.content.cloneNode(!0)),this._origin={x:0,y:0},this._nodes=new Map,this._edges=new Map;const t=this.itemClass=new Map;Object.entries(y.defaultItems).forEach(([s,i])=>{t.set(s,i)})}get host(){return this._host||{viewChange:()=>{}}}set host(e){this._host=e}connectedCallback(){this.canResize?(this.rootResizeObserver=new ResizeObserver(this.onRootResize.bind(this)),this.rootResizeObserver.observe(this.parentNode)):this.height=this.getAttribute("height")||y.minHeight,this.getAttribute("tabindex")||this.setAttribute("tabindex",0),this.addEventListener("dblclick",this.onDblclick),this.addEventListener("keydown",this.onKeydown),this.addEventListener("pointerdown",this.onPointerdown),this.addEventListener("pointermove",this.onPointermove),this.addEventListener("pointerleave",this.onPointerleave),this.addEventListener("pointerup",this.onPointerup)}disconnectedCallback(){this.canResize&&this.rootResizeObserver.unobserve(this.parentNode),this.removeEventListener("dblclick",this.onDblclick),this.removeEventListener("keydown",this.onKeydown),this.removeEventListener("pointerdown",this.onPointerdown),this.removeEventListener("pointermove",this.onPointermove),this.removeEventListener("pointerleave",this.onPointerleave),this.removeEventListener("pointerup",this.onPointerup)}get canResize(){return"ResizeObserver"in window}get origin(){return this.translateVector&&!this.hasSelectedNodes?{x:this._origin.x+this.translateVector.x,y:this._origin.y+this.translateVector.y}:this._origin}get selectedEdges(){return this.edges.filter(e=>e.isSelected)}get hasSelectedNodes(){return this.selectedNodes.length>0}get isDraggingEdge(){return this.semiEdge instanceof m}get selectedNodeIds(){return this.selectedNodes.map(e=>e.id)}get selectedNodes(){return this.nodes.filter(e=>e.isSelected)}get edges(){return Array.from(this._edges.values())}get nodes(){return Array.from(this._nodes.values())}set width(e){this.style.width=`${e}px`}set height(e){this.style.height=`${e}px`}newEdge({id:e,source:t,target:s}){const i=this.itemClass.get("edge"),n=new i({id:e,view:this,cssClassName:i.cssClassName,source:t,target:s});return this.addEdge(n),this.host.viewChange({newEdges:[n.toObject()]}),n}newNode({x:e=0,y:t=0,label:s="node",id:i,nodeType:n="node",inputs:o=[],outputs:h=[]}){const d=this.itemClass.get(n),l=new d({id:i,view:this,cssClassName:d.cssClassName,label:s,inputs:o,outputs:h,x:e,y:t});return this.addNode(l),this.host.viewChange({newNodes:[l.toObject()]}),l}selectEdge(e){e.highlight=!0,e.selected=!0,e.source.highlight=!0,e.target.highlight=!0}selectNode(e){e.highlight=!0,e.selected=!0;for(const t of e.inputs)t.highlight=!0;for(const t of e.outputs)t.highlight=!0;for(const t of this.edges)t.source.node.isSelected&&t.target.node.isSelected?this.selectEdge(t):this.deselectEdge(t)}deselectEdge(e){e.highlight=!1,e.selected=!1,e.source.node.isSelected||(e.source.highlight=!1),e.target.node.isSelected||(e.target.highlight=!1)}deselectNode(e){e.highlight=!1,e.selected=!1;for(const t of e.inputs)t.highlight=!1;for(const t of e.outputs)t.highlight=!1}addEdge(e){this._edges.set(e.id,e)}addNode(e){this._nodes.set(e.id,e)}deleteEdge(e){this._edges.delete(e.id),e.source.highlight=!1,e.target.highlight=!1,this.host.viewChange({deletedEdges:[e.toObject()]}),e.remove()}deleteNode(e){const t=[];for(const s of this.edges)(s.source.node.id===e.id||s.target.node.id===e.id)&&(this.deleteEdge(s),t.push(s.toObject()));this._nodes.delete(e.id),this.host.viewChange({deletedEdges:t,deletedNodes:[e.toObject()]}),e.remove()}edge(e){return this._edges.get(e)}node(e){return this._nodes.get(e)}startTranslation(e){if(this.startDraggingPoint=y.pointerCoordinates(e),this.translateVector={x:0,y:0},this.hasSelectedNodes){const t={};for(const s of this.selectedNodes)t[s.id]=s.position;this.selectedNodesStartPosition=t}}stopTranslation(){this.translateVector&&!this.hasSelectedNodes&&!this.semiEdge&&(this._origin={x:this._origin.x+this.translateVector.x,y:this._origin.y+this.translateVector.y}),this.translateVector=void 0,this.startDraggingPoint=void 0,this.selectedNodesStartPosition=void 0}createSelector({position:e}){return this.selector=new E({id:"selector",view:this,cssClassName:E.cssClassName,position:e})}onDblclick(e){const{origin:t}=this;this.clearSelection(),this.removeSelector();const s=y.pointerCoordinates(e);this.createSelector({position:{x:s.x+t.x,y:s.y+t.y}}).focus()}onKeydown(e){switch(e.stopPropagation(),!0){case this.selector instanceof E:return;case e.code==="Backspace":{this.deleteSelectedItems();break}case e.code==="Escape":{this.clearSelection();break}case"KeyU":{this.undo();break}case"KeyR":{this.redo();break}default:}}onPointerdown(e){e.stopPropagation(),this.removeSelector(),e.isBubblingFromNode||this.clearSelection(),this.startTranslation(e)}onPointermove(e){const{hasSelectedNodes:t,semiEdge:s,startDraggingPoint:i}=this;if(i){const n=y.pointerCoordinates(e),o=i.x-n.x,h=i.y-n.y;switch(!0){case!!s:{const{origin:d}=this;s.hasTarget||(s.target.center.x=n.x+d.x,s.target.center.y=n.y+d.y),s.updateGeometry();break}case t:{this.translateVector={x:o,y:h};const{edges:d,selectedNodes:l,selectedNodeIds:p,selectedNodesStartPosition:$}=this;for(const C of l){const{x:K,y:X}=$[C.id];C.position={x:K-o,y:X-h}}for(const C of d)(p.includes(C.source.node.id)||p.includes(C.target.node.id))&&C.updateGeometry();break}default:{this.translateVector={x:o,y:h};const{nodes:d,edges:l}=this;for(const p of d){const{x:$,y:C}=p.position;p.position={x:$,y:C}}for(const p of l)p.updateGeometry()}}}}onPointerleave(){this.stopTranslation()}onPointerup(){this.stopTranslation(),this.removeSemiEdge()}onRootResize(e){for(const t of e)if(this.parentNode===t.target){const s=Array.isArray(t.contentBoxSize)?t.contentBoxSize[0]:t.contentBoxSize;s?(this.width=s.inlineSize,this.height=s.blockSize-10):t.contentRect&&(this.width=t.contentRect.width,this.height=t.contentRect.height)}}createSemiEdge({source:e,target:t}){const s=this.itemClass.get("edge");return this.semiEdge=new s({view:this,cssClassName:s.cssClassName,source:e,target:t})}clearSelection(){for(const e of this.selectedNodes)this.deselectNode(e);for(const e of this.selectedEdges)this.deselectEdge(e)}deleteSelectedItems(){for(const e of this.selectedEdges)this.deleteEdge(e);for(const e of this.selectedNodes)this.deleteNode(e)}removeSemiEdge(){const{semiEdge:e}=this;e instanceof m&&e.remove(),this.semiEdge=void 0}removeSelector(){const{selector:e}=this;e instanceof E&&e.remove(),this.selector=void 0}undo(){}redo(){}};let x=y;a(x,"customElementName","flow-view"),a(x,"minHeight",200),a(x,"defaultItems",{edge:m,node:w}),a(x,"style",u(u(u(u({":host([hidden])":{display:"none"},":host":k(u({},M("light")),{position:"relative",display:"block",overflow:"hidden",border:0,margin:0,outline:0,"background-color":c.backgroundColor,"border-radius":c.borderRadius,"box-shadow":c.boxShadow,"font-family":c.fontFamily,"font-size":c.fontSize,color:c.textColor})},m.style),w.style),g.style),E.style));export{x as FlowViewElement};class R{static defineCustomElement(){const{customElementName:e}=x;window.customElements.get(e)||window.customElements.define(e,x)}constructor({container:e,element:t}={}){if(R.defineCustomElement(),t instanceof x)t.host=this,this.view=t;else{const s=this.view=document.createElement(x.customElementName);s.host=this,e instanceof HTMLElement?e.appendChild(s):document.body.appendChild(s)}this._onViewChange=()=>{}}clearGraph(){this.view.nodes.clear(),this.view.edges.clear()}loadGraph({nodes:e=[],edges:t=[]}){if(!Array.isArray(e)||!Array.isArray(t))throw new TypeError("Invalid graph");for(const s of e)this.newNode(s);for(const s of t)this.newEdge(s)}get onViewChange(){return this._onViewChange}onChange(e){typeof e=="function"&&(this._onViewChange=e)}viewChange(e){this.onViewChange(e)}newEdge({id:e,from:[t,s],to:[i,n]}){const o=this.view.node(t),h=this.view.node(i),d=o.output(s),l=h.input(n);return this.view.newEdge({id:e,source:d,target:l})}newNode({id:e,label:t,nodeType:s,inputs:i,outputs:n,x:o,y:h}={}){return this.view.newNode({id:e,label:t,nodeType:s,inputs:i,outputs:n,x:o,y:h})}}export{R as FlowView};
