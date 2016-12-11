function isSVGTag(e){return RE_SVG_TAGS.test(e)}function isBoolAttr(e){return RE_BOOL_ATTRS.test(e)}function isFunction(e){return typeof e===T_FUNCTION||!1}function isObject(e){return e&&typeof e===T_OBJECT}function isUndefined(e){return typeof e===T_UNDEF}function isString(e){return typeof e===T_STRING}function isBlank(e){return isUndefined(e)||null===e||""===e}function isArray(e){return Array.isArray(e)||e instanceof Array}function isWritable(e,t){var r=Object.getOwnPropertyDescriptor(e,t);return isUndefined(e[t])||r&&r.writable}function isReservedName(e){return RE_RESERVED_NAMES.test(e)}function $$(e,t){return(t||document).querySelectorAll(e)}function $(e,t){return(t||document).querySelector(e)}function createFrag(){return document.createDocumentFragment()}function createDOMPlaceholder(){return document.createTextNode("")}function mkEl(e,t){return t?document.createElementNS("http://www.w3.org/2000/svg","svg"):document.createElement(e)}function getOuterHTML(e){if(e.outerHTML)return e.outerHTML;var t=mkEl("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}function setInnerHTML(e,t){if(isUndefined(e.innerHTML)){var r=(new DOMParser).parseFromString(t,"application/xml"),n=e.ownerDocument.importNode(r.documentElement,!0);e.appendChild(n)}else e.innerHTML=t}function remAttr(e,t){e.removeAttribute(t)}function getAttr(e,t){return e.getAttribute(t)}function setAttr(e,t,r){var n=XLINK_REGEX.exec(t);n&&n[1]?e.setAttributeNS(XLINK_NS,n[1],r):e.setAttribute(t,r)}function safeInsert(e,t,r){e.insertBefore(t,r.parentNode&&r)}function walkAttrs(e,t){if(e)for(var r;r=RE_HTML_ATTRS.exec(e);)t(r[1].toLowerCase(),r[2]||r[3]||r[4])}function walkNodes(e,t,r){if(e){var n,i=t(e,r);if(i===!1)return;for(e=e.firstChild;e;)n=e.nextSibling,walkNodes(e,t,i),e=n}}function each(e,t){for(var r,n=e?e.length:0,i=0;i<n;++i)r=e[i],t(r,i)===!1&&i--;return e}function contains(e,t){return~e.indexOf(t)}function toCamel(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})}function startsWith(e,t){return e.slice(0,t.length)===t}function defineProperty(e,t,r,n){return Object.defineProperty(e,t,extend({value:r,enumerable:!1,writable:!1,configurable:!0},n)),e}function extend(e){for(var t,r=arguments,n=1;n<r.length;++n)if(t=r[n])for(var i in t)isWritable(e,i)&&(e[i]=t[i]);return e}function handleEvent(e,t,r){var n=this._parent,i=this._item;if(!i)for(;n&&!i;)i=n._item,n=n._parent;if(isWritable(r,"currentTarget")&&(r.currentTarget=e),isWritable(r,"target")&&(r.target=r.srcElement),isWritable(r,"which")&&(r.which=r.charCode||r.keyCode),r.item=i,t.call(this,r),!r.preventUpdate){var a=getImmediateCustomParentTag(this);a.isMounted&&a.update()}}function setEventHandler(e,t,r,n){var i,a=handleEvent.bind(n,r,t);return r.addEventListener?(r[e]=null,i=e.replace(EVENTS_PREFIX_REGEX,""),r._riotEvents||(r._riotEvents={}),r._riotEvents[e]&&r.removeEventListener(i,r._riotEvents[e]),r._riotEvents[e]=a,void r.addEventListener(i,a,!1)):void(r[e]=a)}function updateDataIs(e,t){var r,n=tmpl(e.value,t);if(e.tag&&e.tagName===n)return void e.tag.update();if(e.tag){var i=e.value,a=e.tag._parent.tags;setAttr(e.tag.root,RIOT_TAG_IS,n),arrayishRemove(a,i,e.tag)}e.impl=__TAG_IMPL[n],r={root:e.dom,parent:t,hasImpl:!0,tagName:n},e.tag=initChildTag(e.impl,r,e.dom.innerHTML,t),e.tagName=n,e.tag.mount(),e.tag.update(),t.on("unmount",function(){var t=e.tag.opts.dataIs,r=e.tag.parent.tags,n=e.tag._parent.tags;arrayishRemove(r,t,e.tag),arrayishRemove(n,t,e.tag),e.tag.unmount()})}function updateExpression(e){var t,r=e.dom,n=e.attr,i=tmpl(e.expr,this),a="riot-value"===n,s=e.root&&"VIRTUAL"===e.root.tagName,o=r&&(e.parent||r.parentNode);if(e.bool?i=!!i&&n:(isUndefined(i)||null===i)&&(i=""),e._riot_id){if(e.isMounted)e.update();else if(e.mount(),s){var u=document.createDocumentFragment();makeVirtual.call(e,u),e.root.parentElement.replaceChild(u,e.root)}}else{if(t=e.value,e.value=i,e.update)return void e.update();if(e.isRtag&&i)return updateDataIs(e,this);if(t!==i&&(!a||r.value!==i)){if(!n)return i+="",void(o&&(e.parent=o,"TEXTAREA"===o.tagName?(o.value=i,IE_VERSION||(r.nodeValue=i)):r.nodeValue=i));if(e.isAttrRemoved&&i||(remAttr(r,n),e.isAttrRemoved=!0),isFunction(i))setEventHandler(n,i,r,this);else if(/^(show|hide)$/.test(n))"hide"===n&&(i=!i),r.style.display=i?"":"none";else if(a)r.value=i;else if(startsWith(n,RIOT_PREFIX)&&n!==RIOT_TAG_IS)n=n.slice(RIOT_PREFIX.length),CASE_SENSITIVE_ATTRIBUTES[n]&&(n=CASE_SENSITIVE_ATTRIBUTES[n]),null!=i&&setAttr(r,n,i);else{if("selected"===n&&o&&/^(SELECT|OPTGROUP)$/.test(o.tagName)&&null!=i&&(o.value=r.value),e.bool&&(r[n]=i,!i))return;(0===i||i&&typeof i!==T_OBJECT)&&setAttr(r,n,i)}}}}function update$1$1(e){each(e,updateExpression.bind(this))}function mkitem(e,t,r,n){var i=n?Object.create(n):{};return i[e.key]=t,e.pos&&(i[e.pos]=r),i}function unmountRedundant(e,t,r,n){for(var i,a=t.length,s=e.length;a>s;)i=t[--a],t.splice(a,1),i.unmount(),arrayishRemove(n.tags,r,i,!0)}function moveNestedTags(e){var t=this;each(Object.keys(this.tags),function(r){var n=t.tags[r];isArray(n)?each(n,function(t){moveChildTag.apply(t,[r,e])}):moveChildTag.apply(n,[r,e])})}function move(e,t,r){r?moveVirtual.apply(this,[e,t]):safeInsert(e,this.root,t.root)}function insert(e,t,r){r?makeVirtual.apply(this,[e,t]):safeInsert(e,this.root,t.root)}function append(e,t){t?makeVirtual.call(this,e):e.appendChild(this.root)}function _each(e,t,r){remAttr(e,"each");var n,i=typeof getAttr(e,"no-reorder")!==T_STRING||remAttr(e,"no-reorder"),a=getTagName(e),s=__TAG_IMPL[a]||{tmpl:getOuterHTML(e)},o=RE_SPECIAL_TAGS.test(a),u=e.parentNode,l=createDOMPlaceholder(),c=getTag(e),p=getAttr(e,"if"),d=[],h=[],f=!0,g=!__TAG_IMPL[a],m="VIRTUAL"===e.tagName;return r=tmpl.loopKeys(r),r.isLoop=!0,p&&remAttr(e,"if"),u.insertBefore(l,e),u.removeChild(e),r.update=function(){var v,_,T,y=tmpl(r.val,t);u=l.parentNode,v?(T=createDOMPlaceholder(""),v.insertBefore(T,u),v.removeChild(u)):_=createFrag(),isArray(y)?n=!1:(n=y||!1,y=n?Object.keys(y).map(function(e){return mkitem(r,y[e],e)}):[]),p&&(y=y.filter(function(e,n){return r.key?!!tmpl(p,mkitem(r,e,n,t)):!!tmpl(p,t)||!!tmpl(p,e)})),each(y,function(l,p){var v=i&&typeof l===T_OBJECT&&!n,T=h.indexOf(l),A=~T&&v?T:p,E=d[A];if(l=!n&&r.key?mkitem(r,l,p):l,!v&&!E||v&&!~T){var b=p===d.length;E=new Tag$$1(s,{parent:t,isLoop:f,isAnonymous:g,root:o?u:e.cloneNode(),item:l},e.innerHTML),E.mount(),b?append.apply(E,[_||u,m]):insert.apply(E,[u,d[p],m]),b||h.splice(p,0,l),d.splice(p,0,E),c&&arrayishAdd(t.tags,a,E,!0),A=p}else E.update(l);A!==p&&v&&(contains(y,h[p])&&move.apply(E,[u,d[p],m]),r.pos&&(E[r.pos]=p),d.splice(p,0,d.splice(A,1)[0]),h.splice(p,0,h.splice(A,1)[0]),!c&&E.tags&&moveNestedTags.call(E,p)),E._item=l,defineProperty(E,"_parent",t)}),unmountRedundant(y,d,a,t),h=y.slice(),_?u.insertBefore(_,l):(v.insertBefore(u,T),v.removeChild(T))},r.unmount=function(){each(d,function(e){e.unmount()})},r}function parseExpressions(e,t,r){var n=this,i={parent:{children:t}};return walkNodes(e,function(t,i){var a,s,o,u=t.nodeType,l=i.parent;if(!r&&t===e)return{parent:l};if(3===u&&"STYLE"!==t.parentNode.tagName&&tmpl.hasExpr(t.nodeValue)&&l.children.push({dom:t,expr:t.nodeValue}),1!==u)return i;if(a=getAttr(t,"each"))return l.children.push(_each(t,n,a)),!1;if(a=getAttr(t,"if"))return l.children.push(Object.create(IfExpr).init(t,n,a)),!1;if((s=getAttr(t,RIOT_TAG_IS))&&tmpl.hasExpr(s))return l.children.push({isRtag:!0,expr:s,dom:t}),!1;if(o=getTag(t),o&&(t!==e||r)){var c={root:t,parent:n,hasImpl:!0};return l.children.push(initChildTag(o,c,t.innerHTML,n)),!1}return parseAttributes.apply(n,[t,t.attributes,function(e,t){t&&l.children.push(t)}]),{parent:l}},i),{tree:i,root:e}}function parseAttributes(e,t,r){var n=this;each(t,function(t){var i,a=t.name,s=isBoolAttr(a);~["ref","data-ref"].indexOf(a)?i=Object.create(RefExpr).init(e,a,t.value,n):tmpl.hasExpr(t.value)&&(i={dom:e,expr:t.value,attr:t.name,bool:s}),r(t,i)})}function specialTags(e,t,r){var n="o"===r[0],i=n?"select>":"table>";if(e.innerHTML="<"+i+t.trim()+"</"+i,i=e.firstChild,n)i.selectedIndex=-1;else{var a=rootEls[r];a&&1===i.childElementCount&&(i=$(a,i))}return i}function replaceYield(e,t){if(!reHasYield.test(e))return e;var r={};return t=t&&t.replace(reYieldSrc,function(e,t,n){return r[t]=r[t]||n,""}).trim(),e.replace(reYieldDest,function(e,t,n){return r[t]||n||""}).replace(reYieldAll,function(e,r){return t||r||""})}function mkdom(e,t,r){var n=e&&e.match(/^\s*<([-\w]+)/),i=n&&n[1].toLowerCase(),a=mkEl(GENERIC,r&&isSVGTag(i));return e=replaceYield(e,t),tblTags.test(i)?a=specialTags(a,e,i):setInnerHTML(a,e),a.stub=!0,a}function Tag$1(e,t){var r=this,n=r.name,i=r.tmpl,a=r.css,s=r.attrs,o=r.onCreate;return __TAG_IMPL[n]||(tag$$1(n,i,a,s,o),__TAG_IMPL[n].class=this.constructor),mountTo(e,n,t,this),a&&styleManager.inject(),this}function tag$$1(e,t,r,n,i){return isFunction(n)&&(i=n,/^[\w\-]+\s?=/.test(r)?(n=r,r=""):n=""),r&&(isFunction(r)?i=r:styleManager.add(r)),e=e.toLowerCase(),__TAG_IMPL[e]={name:e,tmpl:t,attrs:n,fn:i},e}function tag2$$1(e,t,r,n,i){r&&styleManager.add(r,e);var a=!!__TAG_IMPL[e];return __TAG_IMPL[e]={name:e,tmpl:t,attrs:n,fn:i},a&&util.hotReloader&&util.hotReloader(e),e}function mount$$1(e,t,r){function n(e){if(e.tagName){var a=getAttr(e,RIOT_TAG_IS);t&&a!==t&&(a=t,setAttr(e,RIOT_TAG_IS,t));var s=mountTo(e,a||e.tagName.toLowerCase(),r);s&&i.push(s)}else e.length&&each(e,n)}var i=[];styleManager.inject(),isObject(t)&&(r=t,t=0);var a,s;if(isString(e)?(e="*"===e?s=selectTags():e+selectTags(e.split(/, */)),a=e?$$(e):[]):a=e,"*"===t){if(t=s||selectTags(),a.tagName)a=$$(t,a);else{var o=[];each(a,function(e){return o.push($$(t,e))}),a=o}t=0}return n(a),i}function mixin$$1(e,t,r){if(isObject(e))return void mixin$$1("__unnamed_"+_id++,e,!0);var n=r?globals:mixins;if(!t){if(isUndefined(n[e]))throw new Error("Unregistered mixin: "+e);return n[e]}n[e]=isFunction(t)?extend(t.prototype,n[e]||{})&&t:extend(n[e]||{},t)}function update$2(){return each(__TAGS_CACHE,function(e){return e.update()})}function unregister$$1(e){delete __TAG_IMPL[e]}function updateOpts(e,t,r,n,i){if(!e||!r){var a=!r&&e?this:t||this;each(i,function(e){e.expr&&update$1$1.call(a,[e.expr]),n[toCamel(e.name)]=e.expr?e.expr.value:e.value})}}function Tag$$1(e,t,r){var n,i=extend({},t.opts),a=t.parent,s=t.isLoop,o=t.isAnonymous,u=cleanUpData(t.item),l=[],c=[],p=[],d=t.root,h=t.tagName||getTagName(d),f="virtual"===h,g=[];observable(this),e.name&&d._tag&&d._tag.unmount(!0),this.isMounted=!1,d.isLoop=s,defineProperty(this,"_internal",{isAnonymous:o,instAttrs:l,innerHTML:r,virts:[],tail:null,head:null}),defineProperty(this,"_riot_id",++__uid),extend(this,{parent:a,root:d,opts:i},u),defineProperty(this,"tags",{}),defineProperty(this,"refs",{}),n=mkdom(e.tmpl,r,s),defineProperty(this,"update",function(e){return isFunction(this.shouldUpdate)&&!this.shouldUpdate(e)?this:(e=cleanUpData(e),s&&o&&inheritFrom.apply(this,[this.parent,g]),extend(this,e),updateOpts.apply(this,[s,a,o,i,l]),this.isMounted&&this.trigger("update",e),update$1$1.call(this,p),this.isMounted&&this.trigger("updated"),this)}.bind(this)),defineProperty(this,"mixin",function(){var e=this;return each(arguments,function(t){var r,n,i=[];t=isString(t)?mixin$$1(t):t,r=isFunction(t)?new t:t;var a=Object.getPrototypeOf(r);do i=i.concat(Object.getOwnPropertyNames(n||r));while(n=Object.getPrototypeOf(n||r));each(i,function(t){if("init"!==t){var n=Object.getOwnPropertyDescriptor(r,t)||Object.getOwnPropertyDescriptor(a,t),i=n&&(n.get||n.set);!e.hasOwnProperty(t)&&i?Object.defineProperty(e,t,n):e[t]=isFunction(r[t])?r[t].bind(e):r[t]}}),r.init&&r.init.bind(e)()}),this}.bind(this)),defineProperty(this,"mount",function(){var t=this;d._tag=this,parseAttributes.apply(a,[d,d.attributes,function(e,r){!o&&RefExpr.isPrototypeOf(r)&&(r.tag=t),e.expr=r,l.push(e)}]),c=[],walkAttrs(e.attrs,function(e,t){c.push({name:e,value:t})}),parseAttributes.apply(this,[d,c,function(e,t){t?p.push(t):setAttr(d,e.name,e.value)}]),this._parent&&o&&inheritFrom.apply(this,[this._parent,g]),updateOpts.apply(this,[s,a,o,i,l]);var r=mixin$$1(GLOBAL_MIXIN);if(r)for(var h in r)r.hasOwnProperty(h)&&t.mixin(r[h]);if(e.fn&&e.fn.call(this,i),this.trigger("before-mount"),parseExpressions.apply(this,[n,p,!1]),this.update(u),s&&o)this.root=d=n.firstChild;else{for(;n.firstChild;)d.appendChild(n.firstChild);d.stub&&(d=a.root)}return defineProperty(this,"root",d),this.isMounted=!0,!this.parent||this.parent.isMounted?this.trigger("mount"):this.parent.one("mount",function(){t.trigger("mount")}),this}.bind(this)),defineProperty(this,"unmount",function(t){var r,n=this,i=this.root,s=i.parentNode,o=__TAGS_CACHE.indexOf(this);if(this.trigger("before-unmount"),walkAttrs(e.attrs,function(e){startsWith(e,RIOT_PREFIX)&&(e=e.slice(RIOT_PREFIX.length)),remAttr(d,e)}),~o&&__TAGS_CACHE.splice(o,1),s){if(a)r=getImmediateCustomParentTag(a),f?Object.keys(this.tags).forEach(function(e){arrayishRemove(r.tags,e,n.tags[e])}):arrayishRemove(r.tags,h,this);else for(;i.firstChild;)i.removeChild(i.firstChild);t?remAttr(s,RIOT_TAG_IS):s.removeChild(i)}return this._internal.virts&&each(this._internal.virts,function(e){e.parentNode&&e.parentNode.removeChild(e)}),unmountAll(p),each(l,function(e){return e.expr&&e.expr.unmount&&e.expr.unmount()}),this.trigger("unmount"),this.off("*"),this.isMounted=!1,delete this.root._tag,this}.bind(this))}function getTag(e){return e.tagName&&__TAG_IMPL[getAttr(e,RIOT_TAG_IS)||getAttr(e,RIOT_TAG_IS)||e.tagName.toLowerCase()]}function inheritFrom(e,t){var r=this;each(Object.keys(e),function(n){var i=!isReservedName(n)&&contains(t,n);(isUndefined(r[n])||i)&&(i||t.push(n),r[n]=e[n])})}function moveChildTag(e,t){var r,n=this.parent;n&&(r=n.tags[e],isArray(r)?r.splice(t,0,r.splice(r.indexOf(this),1)[0]):arrayishAdd(n.tags,e,this))}function initChildTag(e,t,r,n){var i=new Tag$$1(e,t,r),a=t.tagName||getTagName(t.root,!0),s=getImmediateCustomParentTag(n);return i.parent=s,i._parent=n,arrayishAdd(s.tags,a,i),s!==n&&arrayishAdd(n.tags,a,i),t.root.innerHTML="",i}function getImmediateCustomParentTag(e){for(var t=e;t._internal.isAnonymous&&t.parent;)t=t.parent;return t}function unmountAll(e){each(e,function(e){e instanceof Tag$$1?e.unmount(!0):e.unmount&&e.unmount()})}function getTagName(e,t){var r=getTag(e),n=!t&&getAttr(e,RIOT_TAG_IS);return n&&!tmpl.hasExpr(n)?n:r?r.name:e.tagName.toLowerCase()}function cleanUpData(e){if(!(e instanceof Tag$$1||e&&typeof e.trigger===T_FUNCTION))return e;var t={};for(var r in e)RE_RESERVED_NAMES.test(r)||(t[r]=e[r]);return t}function arrayishAdd(e,t,r,n){var i=e[t],a=isArray(i);i&&i===r||(!i&&n?e[t]=[r]:i?(!a||a&&!contains(i,r))&&(a?i.push(r):e[t]=[i,r]):e[t]=r)}function arrayishRemove(e,t,r,n){isArray(e[t])?(each(e[t],function(n,i){n===r&&e[t].splice(i,1)}),e[t].length?1!==e[t].length||n||(e[t]=e[t][0]):delete e[t]):delete e[t]}function isInStub(e){for(;e;){if(e.inStub)return!0;e=e.parentNode}return!1}function mountTo(e,t,r,n){var i=__TAG_IMPL[t],a=__TAG_IMPL[t].class,s=n||(a?Object.create(a.prototype):{}),o=e._innerHTML=e._innerHTML||e.innerHTML;e.innerHTML="";var u={root:e,opts:r};return r&&r.parent&&(u.parent=r.parent),i&&e&&Tag$$1.apply(s,[i,u,o]),s&&s.mount&&(s.mount(!0),contains(__TAGS_CACHE,s)||__TAGS_CACHE.push(s)),s}function makeVirtual(e,t){var r,n,i=this,a=createDOMPlaceholder(),s=createDOMPlaceholder(),o=createFrag();for(this._internal.head=this.root.insertBefore(a,this.root.firstChild),this._internal.tail=this.root.appendChild(s),n=this._internal.head;n;)r=n.nextSibling,o.appendChild(n),i._internal.virts.push(n),n=r;t?e.insertBefore(o,t._internal.head):e.appendChild(o)}function moveVirtual(e,t){for(var r,n=this,i=this._internal.head,a=createFrag();i;)if(r=i.nextSibling,a.appendChild(i),i=r,i===n._internal.tail){a.appendChild(i),e.insertBefore(a,t._internal.head);break}}function selectTags(e){if(!e){var t=Object.keys(__TAG_IMPL);return t+selectTags(t)}return e.filter(function(e){return!/[^-\w]/.test(e)}).reduce(function(e,t){var r=t.trim().toLowerCase();return e+",["+RIOT_TAG_IS+'="'+r+'"]'},"")}var __TAGS_CACHE=[],__TAG_IMPL={},GLOBAL_MIXIN="__global_mixin",RIOT_PREFIX="riot-",RIOT_TAG_IS="data-is",T_STRING="string",T_OBJECT="object",T_UNDEF="undefined",T_FUNCTION="function",XLINK_NS="http://www.w3.org/1999/xlink",XLINK_REGEX=/^xlink:(\w+)/,WIN=typeof window===T_UNDEF?void 0:window,RE_SPECIAL_TAGS=/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,RE_SPECIAL_TAGS_NO_OPTION=/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/,RE_RESERVED_NAMES=/^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/,RE_SVG_TAGS=/^(altGlyph|animate(?:Color)?|circle|clipPath|defs|ellipse|fe(?:Blend|ColorMatrix|ComponentTransfer|Composite|ConvolveMatrix|DiffuseLighting|DisplacementMap|Flood|GaussianBlur|Image|Merge|Morphology|Offset|SpecularLighting|Tile|Turbulence)|filter|font|foreignObject|g(?:lyph)?(?:Ref)?|image|line(?:arGradient)?|ma(?:rker|sk)|missing-glyph|path|pattern|poly(?:gon|line)|radialGradient|rect|stop|svg|switch|symbol|text(?:Path)?|tref|tspan|use)$/,RE_HTML_ATTRS=/([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g,CASE_SENSITIVE_ATTRIBUTES={viewbox:"viewBox"},RE_BOOL_ATTRS=/^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/,IE_VERSION=0|(WIN&&WIN.document||{}).documentMode,check=Object.freeze({isSVGTag:isSVGTag,isBoolAttr:isBoolAttr,isFunction:isFunction,isObject:isObject,isUndefined:isUndefined,isString:isString,isBlank:isBlank,isArray:isArray,isWritable:isWritable,isReservedName:isReservedName}),dom=Object.freeze({$$:$$,$:$,createFrag:createFrag,createDOMPlaceholder:createDOMPlaceholder,mkEl:mkEl,getOuterHTML:getOuterHTML,setInnerHTML:setInnerHTML,remAttr:remAttr,getAttr:getAttr,setAttr:setAttr,safeInsert:safeInsert,walkAttrs:walkAttrs,walkNodes:walkNodes}),styleNode,cssTextProp,byName={},remainder=[];WIN&&(styleNode=function(){var e=mkEl("style");setAttr(e,"type","text/css");var t=$("style[type=riot]");return t?(t.id&&(e.id=t.id),t.parentNode.replaceChild(e,t)):document.getElementsByTagName("head")[0].appendChild(e),e}(),cssTextProp=styleNode.styleSheet);var styleManager={styleNode:styleNode,add:function(e,t){t?byName[t]=e:remainder.push(e)},inject:function(){if(WIN){var e=Object.keys(byName).map(function(e){return byName[e]}).concat(remainder).join("\n");cssTextProp?cssTextProp.cssText=e:styleNode.innerHTML=e}}},brackets=function(e){function t(e){return e}function r(e,t){return t||(t=T),new RegExp(e.source.replace(/{/g,t[2]).replace(/}/g,t[3]),e.global?l:"")}function n(e){if(e===m)return v;var t=e.split(" ");if(2!==t.length||h.test(e))throw new Error('Unsupported brackets "'+e+'"');return t=t.concat(e.replace(f,"\\").split(" ")),t[4]=r(t[1].length>1?/{[\S\s]*?}/:v[4],t),t[5]=r(e.length>3?/\\({|})/g:v[5],t),t[6]=r(v[6],t),t[7]=RegExp("\\\\("+t[3]+")|([[({])|("+t[3]+")|"+d,l),t[8]=e,t}function i(e){return e instanceof RegExp?o(e):T[e]}function a(e){(e||(e=m))!==T[8]&&(T=n(e),o=e===m?t:r,T[9]=o(v[9])),_=e}function s(e){var t;e=e||{},t=e.brackets,Object.defineProperty(e,"brackets",{set:a,get:function(){return _},enumerable:!0}),u=e,a(t)}var o,u,l="g",c=/\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,p=/"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,d=p.source+"|"+/(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source+"|"+/\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,h=RegExp("[\\x00-\\x1F<>a-zA-Z0-9'\",;\\\\]"),f=/(?=[[\]()*+?.^$|])/g,g={"(":RegExp("([()])|"+d,l),"[":RegExp("([[\\]])|"+d,l),"{":RegExp("([{}])|"+d,l)},m="{ }",v=["{","}","{","}",/{[^}]*}/,/\\([{}])/g,/\\({)|{/g,RegExp("\\\\(})|([[({])|(})|"+d,l),m,/^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,/(^|[^\\]){=[\S\s]*?}/],_=e,T=[];return i.split=function(e,t,r){function n(e){t||s?l.push(e&&e.replace(r[5],"$1")):l.push(e)}function i(e,t,r){var n,i=g[t];for(i.lastIndex=r,r=1;(n=i.exec(e))&&(!n[1]||(n[1]===t?++r:--r)););return r?e.length:i.lastIndex}r||(r=T);var a,s,o,u,l=[],c=r[6];for(s=o=c.lastIndex=0;a=c.exec(e);){if(u=a.index,s){if(a[2]){c.lastIndex=i(e,a[2],c.lastIndex);continue}if(!a[3])continue}a[1]||(n(e.slice(o,u)),o=c.lastIndex,c=r[6+(s^=1)],c.lastIndex=o)}return e&&o<e.length&&n(e.slice(o)),l},i.hasExpr=function(e){return T[4].test(e)},i.loopKeys=function(e){var t=e.match(T[9]);return t?{key:t[1],pos:t[2],val:T[0]+t[3].trim()+T[1]}:{val:e.trim()}},i.array=function(e){return e?n(e):T},Object.defineProperty(i,"settings",{set:s,get:function(){return u}}),i.settings="undefined"!=typeof riot&&riot.settings||{},i.set=a,i.R_STRINGS=p,i.R_MLCOMMS=c,i.S_QBLOCKS=d,i}(),tmpl=function(){function e(e,n){return e?(s[e]||(s[e]=r(e))).call(n,t):e}function t(t,r){t.riotData={tagName:r&&r.root&&r.root.tagName,_riot_id:r&&r._riot_id},e.errorHandler?e.errorHandler(t):"undefined"!=typeof console&&"function"==typeof console.error&&(t.riotData.tagName&&console.error("Riot template error thrown in the <%s> tag",t.riotData.tagName.toLowerCase()),console.error(t))}function r(e){var t=n(e);return"try{return "!==t.slice(0,11)&&(t="return "+t),new Function("E",t+";")}function n(e){var t,r=[],n=brackets.split(e.replace(c,'"'),1);if(n.length>2||n[0]){var a,s,o=[];for(a=s=0;a<n.length;++a)t=n[a],t&&(t=1&a?i(t,1,r):'"'+t.replace(/\\/g,"\\\\").replace(/\r\n?|\n/g,"\\n").replace(/"/g,'\\"')+'"')&&(o[s++]=t);t=s<2?o[0]:"["+o.join(",")+'].join("")'}else t=i(n[1],0,r);return r[0]&&(t=t.replace(p,function(e,t){return r[t].replace(/\r/g,"\\r").replace(/\n/g,"\\n")})),t}function i(e,t,r){function n(t,r){var n,i=1,a=d[t];for(a.lastIndex=r.lastIndex;n=a.exec(e);)if(n[0]===t)++i;else if(!--i)break;r.lastIndex=i?e.length:a.lastIndex}if(e=e.replace(l,function(e,t){return e.length>2&&!t?o+(r.push(e)-1)+"~":e}).replace(/\s+/g," ").trim().replace(/\ ?([[\({},?\.:])\ ?/g,"$1")){for(var i,s=[],c=0;e&&(i=e.match(u))&&!i.index;){var p,h,f=/,|([[{(])|$/g;for(e=RegExp.rightContext,p=i[2]?r[i[2]].slice(1,-1).trim().replace(/\s+/g," "):i[1];h=(i=f.exec(e))[1];)n(h,f);h=e.slice(0,i.index),e=RegExp.rightContext,s[c++]=a(h,1,p)}e=c?c>1?"["+s.join(",")+'].join(" ").trim()':s[0]:a(e,t)}return e}function a(e,t,r){var n;return e=e.replace(f,function(e,t,r,i,a){return r&&(i=n?0:i+e.length,"this"!==r&&"global"!==r&&"window"!==r?(e=t+'("'+r+h+r,i&&(n="."===(a=a[i])||"("===a||"["===a)):i&&(n=!g.test(a.slice(i)))),e}),n&&(e="try{return "+e+"}catch(e){E(e,this)}"),r?e=(n?"function(){"+e+"}.call(this)":"("+e+")")+'?"'+r+'":""':t&&(e="function(v){"+(n?e.replace("return ","v="):"v=("+e+")")+';return v||v===0?v:""}.call(this)'),e}var s={};e.hasExpr=brackets.hasExpr,e.loopKeys=brackets.loopKeys,e.clearCache=function(){s={}},e.errorHandler=null;var o=String.fromCharCode(8279),u=/^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,l=RegExp(brackets.S_QBLOCKS,"g"),c=/\u2057/g,p=/\u2057(\d+)~/g,d={"(":/[()]/g,"[":/[[\]]/g,"{":/[{}]/g},h='"in this?this:'+("object"!=typeof window?"global":"window")+").",f=/[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,g=/^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;return e.version=brackets.version="v3.0.1",e}(),misc=Object.freeze({each:each,contains:contains,toCamel:toCamel,startsWith:startsWith,defineProperty:defineProperty,extend:extend}),observable=function(e){e=e||{};var t={},r=Array.prototype.slice;return Object.defineProperties(e,{on:{value:function(r,n){return"function"==typeof n&&(t[r]=t[r]||[]).push(n),e},enumerable:!1,writable:!1,configurable:!1},off:{value:function(r,n){if("*"!=r||n)if(n)for(var i,a=t[r],s=0;i=a&&a[s];++s)i==n&&a.splice(s--,1);else delete t[r];else t={};return e},enumerable:!1,writable:!1,configurable:!1},one:{value:function(t,r){function n(){e.off(t,n),r.apply(e,arguments)}return e.on(t,n)},enumerable:!1,writable:!1,configurable:!1},trigger:{value:function(n){var i,a,s,o=arguments,u=arguments.length-1,l=new Array(u);for(s=0;s<u;s++)l[s]=o[s+1];for(i=r.call(t[n]||[],0),s=0;a=i[s];++s)a.apply(e,l);return t["*"]&&"*"!=n&&e.trigger.apply(e,["*",n].concat(l)),e},enumerable:!1,writable:!1,configurable:!1}}),e},EVENTS_PREFIX_REGEX=/^on/,IfExpr={init:function(e,t,r){remAttr(e,"if"),this.parentTag=t,this.expr=r,this.stub=document.createTextNode(""),this.pristine=e;var n=e.parentNode;return n.insertBefore(this.stub,e),n.removeChild(e),this},update:function(){var e=tmpl(this.expr,this.parentTag);e&&!this.current?(this.current=this.pristine.cloneNode(!0),this.stub.parentNode.insertBefore(this.current,this.stub),this.expressions=[],parseExpressions.apply(this.parentTag,[this.current,this.expressions,!0])):!e&&this.current&&(unmountAll(this.expressions),this.current._tag?this.current._tag.unmount():this.current.parentNode&&this.current.parentNode.removeChild(this.current),this.current=null,this.expressions=[]),e&&update$1$1.call(this.parentTag,this.expressions)},unmount:function(){unmountAll(this.expressions||[]),delete this.pristine,delete this.parentNode,delete this.stub}},RefExpr={init:function(e,t,r,n){return this.dom=e,this.attr=t,this.rawValue=r,this.parent=n,this.hasExp=tmpl.hasExpr(r),this.firstRun=!0,this},update:function(){var e=this.rawValue;if(this.hasExp&&(e=tmpl(this.rawValue,this.parent)),this.firstRun||e!==this.value){var t=this.parent&&getImmediateCustomParentTag(this.parent),r=this.tag||this.dom;!isBlank(this.value)&&t&&arrayishRemove(t.refs,this.value,r),isBlank(e)?remAttr(this.dom,this.attr):(t&&arrayishAdd(t.refs,e,r),setAttr(this.dom,this.attr,e)),this.value=e,this.firstRun=!1}},unmount:function(){var e=this.tag||this.dom,t=this.parent&&getImmediateCustomParentTag(this.parent);!isBlank(this.value)&&t&&arrayishRemove(t.refs,this.value,e),delete this.dom,delete this.parent}},reHasYield=/<yield\b/i,reYieldAll=/<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/gi,reYieldSrc=/<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/gi,reYieldDest=/<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/gi,rootEls={tr:"tbody",th:"tr",td:"tr",col:"colgroup"},tblTags=IE_VERSION&&IE_VERSION<10?RE_SPECIAL_TAGS:RE_SPECIAL_TAGS_NO_OPTION,GENERIC="div",mixins={},globals=mixins[GLOBAL_MIXIN]={},_id=0,__uid=0,tags=Object.freeze({getTag:getTag,inheritFrom:inheritFrom,moveChildTag:moveChildTag,initChildTag:initChildTag,getImmediateCustomParentTag:getImmediateCustomParentTag,unmountAll:unmountAll,getTagName:getTagName,cleanUpData:cleanUpData,arrayishAdd:arrayishAdd,arrayishRemove:arrayishRemove,isInStub:isInStub,mountTo:mountTo,makeVirtual:makeVirtual,moveVirtual:moveVirtual,selectTags:selectTags}),settings=Object.create(brackets.settings),util={tmpl:tmpl,brackets:brackets,styleManager:styleManager,vdom:__TAGS_CACHE,styleNode:styleManager.styleNode,dom:dom,check:check,misc:misc,tags:tags},riot$2=Object.freeze({settings:settings,util:util,observable:observable,Tag:Tag$1,tag:tag$$1,tag2:tag2$$1,mount:mount$$1,mixin:mixin$$1,update:update$2,unregister:unregister$$1});riot$2.tag2("app","<cat> <dog></Dog> </Cat>",'app,[data-is="app"]{ display: block; }',"",function(e){}),riot$2.tag2("cat",'<div class="cat"> <h1>地べたを這い泥水すすってでも戻ってきてやる</h1> <yield></yield> </div>','cat,[data-is="cat"]{ display: block; } cat .cat:before,[data-is="cat"] .cat:before{ content: "🐈"; } cat > .cat > h1,[data-is="cat"] > .cat > h1{ font-size: 20px; color: #ee0000; }',"",function(e){}),riot$2.tag2("dog",'<div class="cat"> <h1>あー そーゆーことね 完全に理解した←わかってない</h1> </div>','dog,[data-is="dog"]{ display: block; } dog .cat:before,[data-is="dog"] .cat:before{ content: "U^ｪ^U"; } dog h1,[data-is="dog"] h1{ font-size: 40px; }',"",function(e){}),riot$2.mount("app");