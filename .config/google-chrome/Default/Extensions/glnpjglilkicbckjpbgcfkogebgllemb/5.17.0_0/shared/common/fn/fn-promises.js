(function n(){var n=Okta.Q,t=_okta.reduce,r=_okta.rest,e=Okta.Q.when,u=Okta.fn.base.curry2,i=Okta.fn.base.curry3,o=Okta.fn.base.splat,f=_okta.toArray,a=Okta.Q.defer,c=Okta.fn.promises={};c.pipelineP=function(n){return t(r(arguments),e,n)};c.composeP=function(){var n=f(arguments).reverse();n[0]=o(n[0]);return function(){var t=f(arguments);n.unshift(t);return c.pipelineP.apply(this,n)}};c.tapP=u(function(n,t){return e(n(t),function(){return t})});c.fmapObjectP=i(function(n,t,r){return e(t(r[n]),function(t){r[n]=t;return r})});c.pollP=function(n,t,r){function u(n,i){e(n(),function(e){if(t(e)){i.resolve(e)}else{setTimeout(function(){u(n,i)},r)}},function(n){i.reject(n)})}var i=a();u(n,i);return i.promise};c.filterP=function(t,r){return n.all(r.map(t)).then(function(n){return r.filter(function(t,r){return!!n[r]})})}})();