(function t(){var t=Okta.parseUri,o=_okta.any,r=_okta.compose,a=_okta.contains,e=_okta.each,n=_okta.find,i=_okta.reduce,s=Okta.fn.other.string.endsWith,u=_okta.pick,c=Okta.fn.url={};var m=["cloudareanet.com","clouditude.com","hioktane.com","lowoktane.com","openalloy.com","okta.com","okta1.com","okta-emea.com","oktapreview.com","perfcloud.org","primeapp.com","trexcloud.com","widerock.com"];var f="-admin";var p=["/app/UserHome","/app/Home","/enduser"];var l=["/app/UserHome","/plugin/bookmark","/home/plugin","/enduser/app-settings"];var h=["www.okta.com","trust.okta.com","system.okta.com","static.okta.com","support.okta.com","developer.okta.com","login.okta.com","help.okta.com","trustro.okta.com","investor.okta.com","oanmanager.okta.com","oinmanager.okta.com","devforum.okta.com","store.okta.com"];var k=["/app/*/*/sso/saml*","/app/office365/*/*"];var g="/api/plugin/2/sites*";function P(t){var o=[],r="https://*.",a="http://*.";e(m,function(e){var n=e+t;o.push(r+n);if(Okta.Config.allowOktaHttp){o.push(a+n)}});return o}c.hrefToUrlParts=function(o){var r=t(o);r.href=o;return u(r,"anchor","path","port","host","protocol","href","queryKey")};c.locationToUrlParts=function(o){return{anchor:o.hash.replace("#",""),path:o.pathname,port:o.port,host:o.hostname,protocol:o.protocol.replace(":",""),href:o.href,queryKey:t(o.search)["queryKey"]}};c.urlPartsToHref=function(t){return t.href};c.urlPartsToDomain=function(t){var o=t.protocol+"://"+t.host;if(t.port!==""){o+=":"+t.port}return o};c.urlPartsToDomainWithoutPort=function(t){var o=t.protocol+"://"+t.host;return o};c.urlPartsToDomainAndPath=function(t){return c.urlPartsToDomain(t)+t.path};c.replaceUrlPartsPath=function(t,o){return c.hrefToUrlParts(c.urlPartsToDomain(t)+o)};c.isOktaPage=function(t,r){var a,e,n;if(!Okta.Config.allowOktaHttp&&t.protocol!=="https"){return false}if(r&&r!==t.path.substring(0,r.length)){return false}a=t.host.split(".");if(a.length<2){return false}e=a[a.length-2]+"."+a[a.length-1];n=o(m,function(t){return t===e});return n};c.isOktaHref=r(c.isOktaPage,c.hrefToUrlParts);c.isOktaAdminPage=function(t){var o=t.host.split(".");return c.isOktaPage(t)&&s(o[0],f)};c.isOktaEndUserHomePage=function(t){return c.isOktaHref(t.href)&&!c.isOktaAdminPage(t)&&!!n(p,function(o){return t.path.indexOf(o)===0})};c.isOktaPluginHomePage=function(t){return!!n(l,function(o){return c.isOktaPage(t,o)})};c.isOktaEndUserHomeHref=r(c.isOktaEndUserHomePage,c.hrefToUrlParts);c.normalizeOktaSubdomain=function(t){if(c.isOktaAdminPage(t)){var o=t.host.split(".");o[0]=o[0].substr(0,o[0].length-f.length);t.host=o.join(".")}return t};c.isOktaTrustedFQDN=function(t){return a(h,t.host)};c.matchesHref=function(t){var o=new Okta.Url(c.urlPartsToHref(t));return function(t){return o.matches(t)}};c.matchesDomains=function(t,o){return c.urlPartsToDomain(t)===c.urlPartsToDomain(o)};c.getOktaFederatedRequestMatchPatterns=function(){return i(k,function(t,o){return t.concat(P(o))},[])};c.getMonitoredSitesApiMatchPatterns=function(){return P(g)}})();