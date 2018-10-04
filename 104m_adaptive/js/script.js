$(window).load(function() {
      setTimeout(function () { 
    $(".preloader").delay().fadeOut('slow').remove();   
  }, 2000);  
});
$(function () {
    


    var $closeReg = $('.close');
    var $regFormWrap = $('.registration-form-wrapper');
    var $regForm = $('.registration-form')
    var $enterLink = $('.enter')
    var $actionButtons = $('.photos-buttons > button');
    var $body = $('body');


    $body.on("click",".registration-form-wrapper", function (e) {
        if(e.target == this) {
            $regFormWrap.hide();
        }
        // console.log(e.target, this, closeReg.eq(0).nodeName);
    });
    $closeReg.on("click", function () {
        $regFormWrap.hide();
    })


    $enterLink.click(function () {
        $regFormWrap.show();
    });

    $actionButtons.click(function () {
        $regFormWrap.show();
    });


    var i = 4;
    var count = 0;
    if (i < 0) {
        i = 4;
    }

    var $buttonNext = $('.like, .dislike');
    var $image = $('.image-wrapper');
    var $firstImage = $('.first-image');

    $buttonNext.on("click", function (e) {




        var $photoInfo = $('.photos-description');
        var $currentPartner = $('.current-partner');
        var $currentPartnerImage = $currentPartner.children();
        var $activePhotoInfo = $('.active-description');

        var $footerImageBlock = $('.liked-photos');

        console.log('before',i);
        $footerImageBlock.eq(i).children().attr("src", $currentPartnerImage.attr("src"));
        i--;



        var $lastImage = $('.last-image');

        if($currentPartner.hasClass('last-image')) {

            $image.removeClass("index");
            $firstImage.addClass("current-partner");

            $currentPartner.addClass("last").one('animationend', function (e) {
                $(this).removeClass("animate last");
            });

            $currentPartner.prev().addClass("current-partner");
            $currentPartner.removeClass("current-partner");

            $photoInfo.eq(0).addClass("active-description");


        } else {

            $currentPartner.addClass("animate index").one('animationend', function (e) {
                $(this).removeClass("animate");
            });

            $currentPartner.prev().addClass("current-partner");
            $currentPartner.removeClass("current-partner");
        }
        $activePhotoInfo.removeClass("active-description");
        $activePhotoInfo.prev().removeClass("active-description");
        $activePhotoInfo.next().addClass("active-description");

        // console.log('target == this', e.target==this);



        if (count >= 5) {
            $regFormWrap.show();
        }
        count++;

        // console.log('$(e.target)==$(this)', $(e.target)==$(this), $(e.target), $(this));
        // console.log('e.target==this', e.target==this);

    });



});