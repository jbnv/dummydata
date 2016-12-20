// Parse a selector object and provide methods to access it.
function Selector() {
  var _content = [];
  var _sum = 0;

  function _fill(array) {
    array.forEach(function(item) {
      if (item.constructor === Array) {
        _content.push(item);
        _sum += item[0];
      } else {
        _content.push([1,item]);
        _sum += 1;
      }
    });
  }

  // For backwards compatibility.
  _fill(arguments[0].constructor === Array ? arguments[0] : Array.from(arguments));

  // call with (fn) or (weight,fn)
  this.add = function(p1,p2) {
    if (_isFunction(p1)) {
      _content.push([1,p1]);
      _sum += 1;
    } else {
      _content.push([p1,p2]);
      _sum += p1;
    }
    return this;
  }

  return function() {

    // Pick a selector value at random.
    var selector = Math.floor(Math.random()*_sum);

    var i = 0;
    for(var i = 0, len = _content.length; i < len; i++) {
      selector -= _content[i][0];
      if (selector < 0) {
        selected = _content[i][1];
        if (selected.constructor === Array) { return selected.randomElement(); }
        if (_isFunction(selected)) { return selected(); }
        return selected;
      }
    }

    return "Array breach; sum="+_sum+", selector="+selector; // this should never happen
  }
}

function _isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
