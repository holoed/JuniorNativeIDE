var eqInt = {
  "==": function(x) { return function(y) { 
      return x == y; 
  }}
}

var ordInt = {
  ">": function(x) { return function(y) { return x > y }},
  "<": function(x) { return function(y) { return x < y }},
  ">=": function(x) { return function(y) { return x >= y }},
  "<=": function(x) { return function(y) { return x <= y }},
  "==": eqInt["=="]
}

var numInt = {
  "+": function(x) { return function(y) { return x + y; }},
  "*": function(x) { return function(y) { return x * y; }},
  "-": function(x) { return function(y) { return x - y; }},
  "fromInteger": function(x) { return x; }
}

var fromInteger = function(inst) {
  return function(x) {
     return inst["fromInteger"](x);
  }
}

var __add = function(inst) {
  return function(x) {
    return function(y) {
      return inst["+"](x)(y)
    }
  }
}

var __mul = function(inst) {
  return function(x) {
    return function(y) {
      return inst["*"](x)(y)
    }
  }
}

var __sub = function(inst) {
  return function(x) {
    return function(y) {
      return inst["-"](x)(y)
    }
  }
}

var __eqeq = function(inst) {
  return function(x) {
    return function(y) {
      return inst["=="](x)(y)
    }
  }
}

var __gt = function(inst) {
  return function(x) {
    return function(y) {
      return inst[">"](x)(y)
    }
  }
}

var __colon = function(x) {
  return function(xs) {
    var ys = xs.slice();
    ys.unshift(x);
    return ys;
  }
}

var isEmpty = function(xs) {
  return xs.length == 0;
}

var head = function(xs) {
  return xs[0];
}

var tail = function(xs) {
  return xs.slice(1);
}
