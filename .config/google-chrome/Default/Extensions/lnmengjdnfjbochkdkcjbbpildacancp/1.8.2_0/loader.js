d=document;
b=d.body;
tmoriginalpage=d.documentElement.innerHTML;

u=document.location.protocol+"//marker.to/";
window.u = u;
l=d.getElementById("tmloading");
if(!l)
{
	l=d.createElement("div");
	l.id="tmloading";
	b.appendChild(l);
};
g=l.appendChild(d.createElement("div"));
g.id="loading";
g.innerHTML="<h4 style='z-index:10000;position:absolute;top:"+((b.scrollTop||d.documentElement.scrollTop)+10)+"px;background-color:#eee'>LOADING...</h4>";

s=d.createElement('script');
if (typeof markerLoader == 'undefined') {
	markerLoader = 'chrome-plugin';  
}
s.innerHTML = "var u = '" + u + "'; var markerLoader='" + markerLoader + "';";
l.appendChild(s);

s=d.createElement('script');
s.src=u+'js/l.js?v=1'+ ('%s'==('%'+'s')?'':'&t=%s')+'&r='+Math.random();
l.appendChild(s);

