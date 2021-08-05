var eqInt = {
  "==": function(x) { return function(y) { 
      return x == y; 
  }}
}

var eqDouble = {
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

var ordDouble = {
  ">": function(x) { return function(y) { return x > y }},
  "<": function(x) { return function(y) { return x < y }},
  ">=": function(x) { return function(y) { return x >= y }},
  "<=": function(x) { return function(y) { return x <= y }},
  "==": eqDouble["=="]
}

var numInt = {
  "+": function(x) { return function(y) { return x + y; }},
  "*": function(x) { return function(y) { return x * y; }},
  "-": function(x) { return function(y) { return x - y; }},
  "fromInteger": function(x) { return x; }
}

var fractionalInt = {
  "+": numInt["+"],
  "*": numInt["*"],
  "-": numInt["-"],
  "/": function(x) { return function(y) { return ~~(x/y); }},
  "fromInteger": numInt["fromInteger"],
  "fromRational": function(x) { return Math.floor(x); }
}

var numDouble = {
  "+": function(x) { return function(y) { return x + y; }},
  "*": function(x) { return function(y) { return x * y; }},
  "-": function(x) { return function(y) { return x - y; }},
  "fromInteger": function(x) { return x; }
}

var fractionalDouble = {
  "+": numDouble["+"],
  "*": numDouble["*"],
  "-": numDouble["-"],
  "/": function(x) { return function(y) { return x / y; }},
  "fromInteger": numDouble["fromInteger"],
  "fromRational": function(x) { return x; }
}

var floatingDouble = {
  "cos": function(x) { return Math.cos(x); },
  "sin": function(x) { return Math.sin(x); }
}

var numTuple2 = function(instA) {
  return function(instB) {
    return {
      "+": function([x1, y1]){ return function([x2, y2]) { return [instA["+"](x1)(x2), instB["+"](y1)(y2)]  } },
      "-": function([x1, y1]){ return function([x2, y2]) { return [instA["-"](x1)(x2), instB["-"](y1)(y2)]  } },
      "*": function([x1, y1]){ return function([x2, y2]) { 
        var mul = instA["*"];
        var sub = instA["-"];
        var add = instA["+"];
        return [sub(mul(x1)(x2))(mul(y1)(y2)), add(mul(x1)(y2))(mul(y1)(x2))];
      } 
    }
    }
  }
}

var fromInteger = function(inst) {
  return function(x) {
     return inst["fromInteger"](x);
  }
}

var fromRational = function(inst) {
  return function(x) {
     return inst["fromRational"](x);
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

var __div = function(inst) {
  return function(x) {
    return function(y) {
      return inst["/"](x)(y)
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

var __or = function(x) {
    return function(y) {
      return x || y;
    }
}

var __and = function(inst) {
  return function(x) {
    return function(y) {
      return x && y;
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

var __dot = function(f) {
  return function(g) {
    return function(x) {
      return f(g(x));
    }
  }
}

var toDouble = function(x) {
  return x + 0.0;
}

var truncate = function(x) {
  return Math.floor(x);
}

var cos = function(inst) {
  return function(x) {
    return inst["cos"](x);
  }
}

var fst = function([x,y]){
  return x;
}

var snd = function([x,y]){
  return y;
}

var display = function(imageData) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width  = imageData.length;
  canvas.height = imageData.length; 
  canvas.style.display = "block";
      for(var y = 0; y < imageData.length; y++){
          for(var x = 0; x < imageData[y].length; x++){
             ctx.fillStyle = `rgb(${imageData[y][x][0]}, ${imageData[y][x][1]}, ${imageData[y][x][2]})`;
             ctx.fillRect( x, y, 1, 1 );
          }
      }
}