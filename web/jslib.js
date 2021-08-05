var eqInt = {
  "==": function(x) { return function(y) { 
      return x == y; 
  }}
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
