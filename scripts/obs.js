require(['rx'], function(Rx) {
  // items that arrive over time
  var Observable = Rx.Observable;
  
  // get DOM elements
  var sprite = document.getElementById('sprite'); 
  var button = document.getElementById('button'); 
  var body = document.body;
  
  // observe reset button click
  var buttonPress = Observable.fromEvent(button, 'click');
 
  // listen to click drag on sprite
  var mouseDown = Observable.fromEvent(sprite, 'mousedown'),
      containerMouseMoves = Observable.fromEvent(body, 'mousemove'),
      containerMouseUp = Observable.fromEvent(body, 'mouseup'),
      
      // parse mouse drag event, stop on mouse up
      mouseDrags = 
        mouseDown
          .concatMap(function(dragPoint){
            dragPoint.preventDefault();
            // prevent from going up
            event.stopPropagation();
              return containerMouseMoves.takeUntil(containerMouseUp).
              map(function(movePoint) {
                return {
                  pageX: movePoint.pageX - dragPoint.offsetX,
                  pageY: movePoint.pageY - dragPoint.offsetY
                };
              });
          });
      
  // on each reset button press, move sprite to 200.200
  buttonPress.forEach(function(e){
    sprite.style.left = "200px";
    sprite.style.top = "200px";
  });
  
  // log mouse up position
  containerMouseUp.forEach(function onNext(stopPoint) {
    console.log(stopPoint.pageX + ' + ' + stopPoint.pageY);
  });
  
  // change sprite position on mouse drag
  mouseDrags.forEach(function onNext(dragPoint) {
    //  make sure we stick to clicked element
     if (dragPoint.target == dragPoint.currentTarget)
          {
            console.log(dragPoint);
            sprite.style.left = dragPoint.pageX + "px";
            sprite.style.top = dragPoint.pageY + "px";
          }
    }, function onError(error){
    console.error('error')
  }, function onCompleted(){
    console.log('done');
  });

  
});