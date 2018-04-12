function SHA256(r){var n=8;var t=0;function e(r,n){var t=(r&65535)+(n&65535);var e=(r>>16)+(n>>16)+(t>>16);return e<<16|t&65535}function a(r,n){return r>>>n|r<<32-n}function o(r,n){return r>>>n}function f(r,n,t){return r&n^~r&t}function u(r,n,t){return r&n^r&t^n&t}function i(r){return a(r,2)^a(r,13)^a(r,22)}function c(r){return a(r,6)^a(r,11)^a(r,25)}function v(r){return a(r,7)^a(r,18)^o(r,3)}function h(r){return a(r,17)^a(r,19)^o(r,10)}function C(r,n){var t=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298);var a=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225);var o=new Array(64);var C,g,A,d,l,S,m,y,s,w;var b,p;r[n>>5]|=128<<24-n%32;r[(n+64>>9<<4)+15]=n;for(var s=0;s<r.length;s+=16){C=a[0];g=a[1];A=a[2];d=a[3];l=a[4];S=a[5];m=a[6];y=a[7];for(var w=0;w<64;w++){if(w<16)o[w]=r[w+s];else o[w]=e(e(e(h(o[w-2]),o[w-7]),v(o[w-15])),o[w-16]);b=e(e(e(e(y,c(l)),f(l,S,m)),t[w]),o[w]);p=e(i(C),u(C,g,A));y=m;m=S;S=l;l=e(d,b);d=A;A=g;g=C;C=e(b,p)}a[0]=e(C,a[0]);a[1]=e(g,a[1]);a[2]=e(A,a[2]);a[3]=e(d,a[3]);a[4]=e(l,a[4]);a[5]=e(S,a[5]);a[6]=e(m,a[6]);a[7]=e(y,a[7])}return a}function g(r){var t=Array();var e=(1<<n)-1;for(var a=0;a<r.length*n;a+=n){t[a>>5]|=(r.charCodeAt(a/n)&e)<<24-a%32}return t}function A(r){r=r.replace(/\r\n/g,"\n");var n="";for(var t=0;t<r.length;t++){var e=r.charCodeAt(t);if(e<128){n+=String.fromCharCode(e)}else if(e>127&&e<2048){n+=String.fromCharCode(e>>6|192);n+=String.fromCharCode(e&63|128)}else{n+=String.fromCharCode(e>>12|224);n+=String.fromCharCode(e>>6&63|128);n+=String.fromCharCode(e&63|128)}}return n}function d(r){var n=t?"0123456789ABCDEF":"0123456789abcdef";var e="";for(var a=0;a<r.length*4;a++){e+=n.charAt(r[a>>2]>>(3-a%4)*8+4&15)+n.charAt(r[a>>2]>>(3-a%4)*8&15)}return e}r=A(r);return d(C(g(r),r.length*n))}