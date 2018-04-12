function isChecked(str){
    if ("false" === str) {
        return false;
    } else if ("true" === str) {
        return true;
    } 
    return true;
}
document.addEventListener('DOMContentLoaded', function () {
    if (typeof localStorage.instantHighlighterDisabled == 'undefined') {
        localStorage["instantHighlighterDisabled"] = true;
    }
    document.getElementById("instantHighlighterDisabled").checked = isChecked(localStorage["instantHighlighterDisabled"]);
    document.getElementById('instantHighlighterDisabled').addEventListener('click', uponSelectText);
});

function uponSelectText(el) {
   localStorage["instantHighlighterDisabled"] = el.target.checked;
}
