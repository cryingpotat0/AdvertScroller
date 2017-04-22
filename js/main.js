$(document).ready(function() {
  const controller = new ScrollMagic.Controller({container: ".mobile-container"});
  controller.scrollTo("body");

  adBannerAtBeginning({
    controller,
    start_elem: "#start-of-article",
    ad:         ".sliding-ad"
  });

  blockAdScroller({
    triggers:       ".advert-placeholder",
    top:            ".sliding-ad",
    top_display:    false,
    bottom:         ".sliding-ad",
    bottom_display: true,
    controller
  });

  endOfArticleShare({
    controller,
    end_elem:     "#end-of-article",
    ad:           ".sliding-ad",
    share_banner: ".share-block"
  });
});

function adBannerAtBeginning(options) {
  const start_elem = options.start_elem;
  console.log(start_elem);
  const controller = options.controller;
  const ad = options.ad;
  let scene = new ScrollMagic.Scene();
  let tween = TweenMax.to(ad, 0.5, tweenParams(true));
  scene
    .triggerElement(start_elem)
    .triggerHook(0.1)
    .setTween(tween)
    .addTo(controller)
    .duration(100)
    .addIndicators();
}

function contextualImageShare(options) {
  const triggers = options.triggers;
  const top = options.top;
  const top_display = options.top_display;
  const bottom = options.bottom;
  const bottom_display = options.bottom_display;
  const controller = options.controller;
  $(triggers).each( function (j){
    let scene = new ScrollMagic.Scene();
    populateTop(scene, top, top_display, controller, this);
    scene = new ScrollMagic.Scene();
    populateBottom(scene, bottom, bottom_display, controller, this);
  });
}

function endOfArticleShare(options) {
  const end_elem = options.end_elem;
  console.log("end: ", end_elem);
  const controller = options.controller;
  const ad = options.ad;
  const share_banner = options.share_banner;
  let scene = new ScrollMagic.Scene();
  let tween = new TimelineMax()
    .add(TweenMax.to(ad, 0.2, tweenParams(false)))
    .add(TweenMax.to(share_banner, 0.5, tweenParams(true)));
  scene
    .triggerElement(end_elem)
    .offset(-150)
    .triggerHook(1)
    .setTween(tween)
    .addTo(controller)
    .addIndicators();
}

function blockAdScroller(options) {
  const triggers = options.triggers;
  const top = options.top;
  const top_display = options.top_display;
  const bottom = options.bottom;
  const bottom_display = options.bottom_display;
  const controller = options.controller;
  $(triggers).each( function (j){
    let scene = new ScrollMagic.Scene();
    populateTop(scene, top, top_display, controller, this);
    console.log(this);

    scene = new ScrollMagic.Scene();
    populateBottom(scene, bottom, bottom_display, controller, this);
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
    .offset($(block).height() - 10)
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
