(function(t,e){var i=[];var n=i.slice;var s=e.Events={on:function(t,e,i){if(!a(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var n=this._events[t]||(this._events[t]=[]);n.push({callback:e,context:i,ctx:i||this});return this},once:function(e,i,n){if(!a(this,"once",e,[i,n])||!i)return this;var s=this;var r=t.once(function(){s.off(e,r);i.apply(this,arguments)});r._callback=i;return this.on(e,r,n)},off:function(e,i,n){var s,r,l,c,h,f,o,u;if(!this._events||!a(this,"off",e,[i,n]))return this;if(!e&&!i&&!n){this._events={};return this}c=e?[e]:t.keys(this._events);for(h=0,f=c.length;h<f;h++){e=c[h];if(l=this._events[e]){this._events[e]=s=[];if(i||n){for(o=0,u=l.length;o<u;o++){r=l[o];if(i&&i!==r.callback&&i!==r.callback._callback||n&&n!==r.context){s.push(r)}}}if(!s.length)delete this._events[e]}}return this},trigger:function(t){if(!this._events)return this;var e=n.call(arguments,1);if(!a(this,"trigger",t,e))return this;var i=this._events[t];var s=this._events.all;if(i)l(i,e);if(s)l(s,arguments);return this},stopListening:function(t,e,i){var n=this._listeners;if(!n)return this;var s=!e&&!i;if(typeof e==="object")i=this;if(t)(n={})[t._listenerId]=t;for(var r in n){n[r].off(e,i,this);if(s)delete this._listeners[r]}return this}};var r=/\s+/;var a=function(t,e,i,n){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(n))}return false}if(r.test(i)){var a=i.split(r);for(var l=0,c=a.length;l<c;l++){t[e].apply(t,[a[l]].concat(n))}return false}return true};var l=function(t,e){var i,n=-1,s=t.length,r=e[0],a=e[1],l=e[2];switch(e.length){case 0:while(++n<s)(i=t[n]).callback.call(i.ctx);return;case 1:while(++n<s)(i=t[n]).callback.call(i.ctx,r);return;case 2:while(++n<s)(i=t[n]).callback.call(i.ctx,r,a);return;case 3:while(++n<s)(i=t[n]).callback.call(i.ctx,r,a,l);return;default:while(++n<s)(i=t[n]).callback.apply(i.ctx,e)}};var c={listenTo:"on",listenToOnce:"once"};t.each(c,function(e,i){s[i]=function(i,n,s){var r=this._listeners||(this._listeners={});var a=i._listenerId||(i._listenerId=t.uniqueId("l"));r[a]=i;if(typeof n==="object")s=this;i[e](n,s,this);return this}})})(_okta,Okta);