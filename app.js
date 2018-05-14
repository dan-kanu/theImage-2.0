

var elem = document.querySelector('#section-fullHero > div.row > div:nth-child(1) > input[type="range"]');
var slider2= document.querySelector('#section-fullHero > div.row > div:nth-child(2) > input[type="range"]');
var slider3= document.querySelector('#section-fullHero > div.row > div:nth-child(3) > input[type="range"]');

var rangeValue = function(){
  var newValue = elem.value;
  var newValue2 = slider2.value;
  var newValue3 = slider3.value;
  var bgXpos = document.getElementById('bgXpos');
  var bgYpos = document.getElementById('bgYpos');
  var bgZpos = document.getElementById('bgZpos');

  var target = document.querySelector('.value');
 
  document.getElementById("bg1").style.backgroundPositionX=elem.value+"px";
  document.getElementById("bg1").style.backgroundPositionY=slider2.value+"px";
  document.getElementById("bg1").style.backgroundSize=slider3.value+"%";
  console.log("Background-Pos-X: " +  elem.value);
  console.log("Background-Pos-Y: " +  slider2.value);
  console.log("Background-Size: " + slider3.value + "%");

  bgXpos.innerHTML=elem.value;
  bgYpos.innerHTML=slider2.value;
  bgZpos.innerHTML=slider3.value;
}

elem.addEventListener("input", rangeValue);
slider2.addEventListener("input", rangeValue);
slider3.addEventListener("input", rangeValue);

$(function()
 {
   if(!window.File || !window.FileReader)
     return alert('Oops!\nYour browser isn\'t quite compatible with this pen.');
   

   $('#bgImg > input').bind('change', function()
   {
     var file = this.files[0],
         reader = new FileReader();
         reader.onload = function(e)
         {
        //   $('#bgImg > img').attr('src', e.target.result);
          $('#bgImg2 > img, #og-image > img').attr('src', e.target.result);
          $('.bg1 > img').attr('src', e.target.result);
          $('#img1 > img').attr('src', e.target.result);
          $('#bg1').css('background-image', 'url(' + e.target.result + ')').css('background-size', 'cover');
          $('.hero-image, .cta, #frame, .fullCTA').css('background-image', 'url(' + e.target.result + ')');
          $('#cta-cover').css('background-image', 'url(' + e.target.result + ')').css('background-size', 'cover');
          $('#paraSection , #resize-div' ).css('background-image', 'url(' + e.target.result + ')').css('background-size', 'cover');
          console.log(elem.value);
         };
         console.log(elem.value);
     reader.readAsDataURL(file);
   });


/**DRAGGABLE */
   var dragg = function(){
    return {
      diffX : 0,
      diffY : 0,
      move : function(divid,xpos,ypos){
        var a = $(divid);
        $(divid).css({left: xpos + 'px', top: ypos + 'px'});
      },
      startMoving : function(evt){
        //alert('blaat');
        //alert(evt.clientX);
        evt = evt || window.event;
        if(evt.originalEvent.touches) {
          var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
          if(touch)
            evt = touch;
        }
        var posX = evt.clientX,
            posY = evt.clientY,
            a = $('.crop-image'),
            divTop = a.css('top'),
            divLeft = a.css('left')
        
        divTop = divTop.replace('px','');
        divLeft = divLeft.replace('px','');
        dragg.diffX = posX - divLeft,
        dragg.diffY = posY - divTop;
        
        var mouseMoveEventType=((document.ontouchmove!==null)?'mousemove':'touchmove');
        $(document).on(mouseMoveEventType, dragg.mouseMoving);
      },
      mouseMoving : function(evt){
        evt = evt || window.event;
        if(evt.originalEvent.touches) {
          var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
          if(touch)
            evt = touch;
        }
  /*      console.log(evt);
        console.dir(evt);*/
        var posX = evt.clientX,
            posY = evt.clientY,
            aX = posX - dragg.diffX,
            aY = posY - dragg.diffY;
  /*      console.log([aX, aY]);*/
        dragg.move('.crop-image',aX,aY);
      },
      stopMoving : function(){
        var a = document.createElement('script');
        
        var mouseMoveEventType=((document.ontouchmove!==null)?'mousemove':'touchmove');
        $(document).off(mouseMoveEventType, dragg.mouseMoving);
      },
    }
  }();
  
  $(function() {
    var a = document.createElement('script');
    a.src = 'https://dev.elobbies.com/scripts/jgestures/jgestures.js';
    document.body.appendChild(a);
    var mouseDownEventType=((document.ontouchstart!==null)?'mousedown':'touchstart');
    var mouseUpEventType=((document.ontouchend!==null)?'mouseup':'touchend');
    $('.shine-through').on(mouseDownEventType, dragg.startMoving);
    $('body').on(mouseUpEventType, dragg.stopMoving);
    
  });

  $( "#resize-div" ).resizable();
  $('#bg-cover').click(function(){
    var bgState;
    if (this.checked) {
        bgState="contain";
    }else{
      $('#resize-div').css('background-size', 'cover');
      bgState="cover";
    }
    $('#resize-div').css('background-size', bgState);
}) 
 });