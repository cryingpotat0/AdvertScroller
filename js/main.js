$(document).ready(function() {
  const controller = new ScrollMagic.Controller({
    container: ".mobile-container", 
    refreshInterval: 1000
  });
  controller.scrollTo("body");

  adBannerAtBeginning({
    controller,
    start_elem: "#start-of-article",
    ad:         ".sliding-ad"
  });

  blockAdScroller({
    triggers:       ".advert-placeholder",
    ad:             ".sliding-ad",
    controller
  });

  contextualImageShare({
    triggers: ".contextual-image",
    controller,
    ad: ".sliding-ad",
    share_banner: ".share-block"
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
  const controller = options.controller;
  const ad = options.ad;
  let scene = new ScrollMagic.Scene();
  let tween = TweenMax.to(ad, 0.5, tweenParams(true));
  populateScene(scene, start_elem, 0, tween, controller, 0);
}

function populateScene(scene, trigger, hook, tween, controller, offset) {
  scene
    .triggerElement(trigger)
    .triggerHook(hook)
    .setTween(tween)
    .addTo(controller)
    .offset(offset)
    //.addIndicators();
}

function contextualImageShare(options) {
  const triggers = options.triggers;
  const controller = options.controller;
  const ad = options.ad;
  const share_banner = options.share_banner;

  let banner_update = function(event, firstScroll, secondScroll, url) {
      if(event.scrollDirection === firstScroll) {
        $(share_banner).html(
         `<h3>
            Share the <a href = "${url}"> image </a>!
          </h3>`
        );
      }
      else if(event.scrollDirection === secondScroll) {
        setTimeout( () => {
          $(share_banner).html(
           `<h3>
              Share the article!
            </h3>`
          );
        },
        500);
      }
  }

  $(triggers).each( function (j){
    let tween1 = new TimelineMax()
      .add(TweenMax.to(ad, 0.2, tweenParams(false)))
      .add(TweenMax.to(share_banner, 0.5, tweenParams(true)));
    let tween2 = new TimelineMax()
      .add(TweenMax.to(share_banner, 0.2, tweenParams(false)))
      .add(TweenMax.to(ad, 0.5, tweenParams(true)));

    let top_scene = new ScrollMagic.Scene();
    populateScene(top_scene, this, 1, tween1, controller, 0);
    let _this = this;
    top_scene.on("start", (event) => {
      banner_update(event, "FORWARD", "REVERSE", $(_this).find('img:first').attr("src"))
    });
    

    let bottom_scene = new ScrollMagic.Scene();
    populateScene(bottom_scene, this, 0, tween2, controller, $(this).height() - 10);
    bottom_scene.on("start", (event) => {
      banner_update(event, "REVERSE", "FORWARD", $(_this).find('img:first').attr("src"))
    });

  });
}

function endOfArticleShare(options) {
  const end_elem = options.end_elem;
  const controller = options.controller;
  const ad = options.ad;
  const share_banner = options.share_banner;
  let scene = new ScrollMagic.Scene();
  let tween = new TimelineMax()
    .add(TweenMax.to(ad, 0.2, tweenParams(false)))
    .add(TweenMax.to(share_banner, 0.5, tweenParams(true)));
  populateScene(scene, end_elem, 1, tween, controller, -150);
}

function blockAdScroller(options) {
  const triggers = options.triggers;
  const controller = options.controller;
  const ad = options.ad;
  $(triggers).each( function (j){
    let top_scene = new ScrollMagic.Scene();
    let tween1 = TweenMax.to(ad, 0.5, tweenParams(false));
    populateScene(top_scene, this, 1, tween1, controller, 0);

    let bottom_scene = new ScrollMagic.Scene();
    let tween2 = TweenMax.to(ad, 0.5, tweenParams(true));
    populateScene(bottom_scene, this, 0, tween2, controller, $(this).height() - 10);
  });
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
