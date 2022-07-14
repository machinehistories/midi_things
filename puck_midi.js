var midi = require("ble_midi");
midi.init();
var i = 0;
var on = false;
var z_map = 0;
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};


/*
setWatch(function() {
  // When a button is pressed...
  digitalPulse(LED,1,10);
   on = !on;
  i++;
  if (i > 1){ i = 0;}
  if (i == 0)
  //console.log(i);  
  midi.noteOn(0, 60, 100);
  if (i ==1)
  midi.noteOff(0, 60, 0);  
}, BTN, { repeat:true, edge:"rising", debounce:10 });
*/
setWatch(function() {
  // When a button is pressed...
  digitalPulse(LED,1,10);
   on = !on;
  var val = on * 100;
  //console.log(i);  
  midi.noteOn(0, z_map, val);
}, BTN, { repeat:true, edge:"rising", debounce:10 });

/*
setInterval (function() {
  val [] = 
  Puck.mag();
  midi.send(0, val, 100);
}, 1000);
*/
Puck.accelOn(); // default is 12.5Hz, with gyro
// or Puck.accelOn(1.6); 
Puck.on('accel', function(a) {
  var x_acc = a.acc.x;
  var y_acc = a.acc.y;
  var z_acc = a.acc.z;
  var x_map = Math.round(x_acc.map(-8600, 8600, 0, 127));
  var y_map = Math.round(y_acc.map(-8600, 8600, 0, 127));
  var z_map = Math.round(z_acc.map(8600, -8600, 60, 70));
 // console.log("z_val", z_acc);
 // console.log(z_map);
  // midi.send(channel, controller, value);
  midi.send(0, z_map, y_map);
});
