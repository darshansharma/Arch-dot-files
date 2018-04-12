/**
 * Created by Anton on 17.06.2015.
 */
chrome.runtime.sendMessage({action: 'sb', sub: 'getCode', page: {url: location.href}}, function(msg) {
  if (msg && msg.action === 'sb' && msg.sub === 'code' && msg.data) {
    if (msg.data.css) {
      var style = document.createElement('style');
      style.textContent = msg.data.css;
      document.body.appendChild(style);
    }
    if (msg.data.js) {
      (new Function('', msg.data.js))();
    }
  }
});