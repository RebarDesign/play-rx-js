require(['rx'], function(Rx) {
  var obs = Rx.Observable.of(42);
  obs.forEach(function (x) { console.log(x); });
});