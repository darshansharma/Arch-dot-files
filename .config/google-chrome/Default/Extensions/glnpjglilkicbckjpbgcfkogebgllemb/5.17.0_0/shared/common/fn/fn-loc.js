(function e(){var e=Okta.fn.loc={},a=_okta.reduce,n=_okta.keys,o=_okta.escape;e.localizeTemplate=function(e,r,t,c,l){var u=r["en"];var f=r[t]||u;var i=n(u);return a(i,function(e,a){var n=f[a]||u[a];if(n){n=decodeURIComponent(n)}else{n="L10N_ERROR["+o(a)+"]"}return e.replace(new RegExp(c+a+l,"g"),n)},e)}})();