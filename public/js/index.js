var Handle = function() {};

Handle.prototype.addField = function () {
    document.getElementById('table').appendChild(document.getElementsByClassName('group')[0].cloneNode(true));
}

var blackhole = new Handle();
// document.getElementById('add').onclick = blackhole.addField;
