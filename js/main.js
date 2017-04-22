$(() => {
  /*
  const controller = new ScrollMagic.Controller();
  const tween0 = TweenMax.to('.sliding-ad', 0.5, {
    backgroundColor: 'rgb(255, 39, 46)',
    bottom: -50

  });
  const tween1 = TweenMax.to('.sliding-ad', 0.5, {
    backgroundColor: 'rgb(0, 39, 46)',
    bottom: 0

  });

  $('.advert-placeholder').each(function(index) {
    let scene = new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 1,
      offset: -40,
      duration: 40
    })
      .setTween(eval("tween" + index))
      .addTo(controller);

  // Add debug indicators fixed on right side
    scene.addIndicators();
    console.log(index, scene.triggerHook());
  });
  */
  let last_p = $(".article-body p").last();
  blockAdScroller({
    triggers:       [".advert-placeholder", ".advert-placeholder-2"],
    top:            [".sliding-ad", ".sliding-ad"],
    top_display:    [false, false],
    bottom:         [".sliding-ad", ".sliding-ad"],
    bottom_display: [true, true],
    parent: "body"
  });
});

function addBannerAtBeginning(options) {

}

function blockAdScroller(options) {
  const triggers = options.triggers;
  const top = options.top;
  const top_display = options.top_display;
  const bottom = options.bottom;
  const bottom_display = options.bottom_display;
  const controller = new ScrollMagic.Controller();

  triggers.forEach( function(curr, index){
    if(typeof curr === "string") {
      $(curr).each( function (j){
        let scene = new ScrollMagic.Scene();
        populateTop(scene, top[index], top_display[index], controller, this);

        scene = new ScrollMagic.Scene();
        populateBottom(scene, bottom[index], bottom_display[index], controller, this);
      });
    } else {
      let _this = curr;
      let scene = new ScrollMagic.Scene();
      populateTop(scene, top[index], top_display[index], controller, _this);

      scene = new ScrollMagic.Scene();
      populateBottom(scene, bottom[index], bottom_display[index], controller, _this);
    }
  });
}




function populateTop(scene, elem, display, controller, block) {
  if(elem === undefined)  return; 
  let tween = TweenMax.to(elem, 0.5, tweenParams(display));
  scene
    .triggerElement(block)
    .triggerHook(1)
    //.offset(-50)
    //.duration(60)
    .setTween(tween)
    .addTo(controller)
    .addIndicators();
}

function populateBottom(scene, elem, display, controller, block) {
  if(elem === undefined)  return; 
  let tween = TweenMax.to(elem, 0.5, tweenParams(display));
  scene
    .triggerElement(block)
    .triggerHook(0)
    .offset($(block).height())
    //.duration(60)
    .setTween(tween)
    .addTo(controller)
    .addIndicators();
}

function tweenParams(display) {
  if(display) {
    return {
      bottom: 0
    }
  } else {
    return {
      bottom: -50
    }
  }
}
