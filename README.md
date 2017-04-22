# AdvertScroller
There are 4 contexts in which different sticky footers slide in and out

1. adBannerAtBeginning: This is when the user enter the article. An ad-banner pops up from below
2. blockAdScroller: This is for generic block advertisements. 
      The ad-banner disappears when the user scrolls into the view of the block advertisement. 
      The ad-banner appears when the user scrolls out of view of the block advertisement. 
3. contextualImageShare: This is for images in the article. If they are wrapped in a div with class 
      "contextual-image", they will trigger a share-banner sliding up. This share banner can have
      information specific to the image. In the example shown, the share-banner updates to the url of
      image shown. This could allow users to do specific things with that image, for example share 
      it on Facebook!
4. endOfArticleShare: This is to trigger the share-banner popping up when the user reaches the
      end of the article. In this case the share banner can be used to share the article as a 
      whole.

All of these are easy to use with different classes of images and advertisements as long as the divs in question have a common class!

