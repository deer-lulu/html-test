//头
$(function(){
$('.ding-nei2-a').on('click',function(){
    $(this).toggleClass('bian');
    $('.chunhei').toggleClass('bai');
    $('.chun').toggleClass('chu');
    $('.chunhei').toggleClass('ch');
    $('.ding-nei2').toggleClass('neibian2');
    if($(this).hasClass('bian')){
        $('.ding-nei2-c').addClass('chu');
        $('.shangdezuihou').addClass('shangzh1').slideDown(300).css({opacity:1});
        $('.zhongzhongzhong,.xiaxiaxia').addClass('meile');
        $('body').css({overflow:'hidden'})
    }else{
        $('.ding-nei2-c').removeClass('chu');
        $('body').css({overflow:'inherit'})
        $('.shangdezuihou').removeClass('shangzh1').slideUp(300).css({opacity:0});
        $('.zhongzhongzhong,.xiaxiaxia').removeClass('meile');


    }


})
    $('.fangdajing').on('click',function(){
        $('.uailou').addClass('shouqi');
        $('.sousuo').addClass('chuxian');
        var dingnei=$('.xiamianla');
        if($('.uailou').hasClass('shouqi')) {
            dingnei.show();

        }else {
            dingnei.hide();

        }
        $('.sssou').find('li').addClass('lichuxian');

    })
    $('.gouwudai').on('click',function(){
        $('.uailou').removeClass('shouqi');
        $('.sousuo').removeClass('chuxian');
        var dingnei=$('.xiamianla');
        if($('.uailou').hasClass('shouqi')) {
            dingnei.show();
        }else {
            dingnei.hide();

        }
        $('.sssou').find('li').removeClass('lichuxian');

    })

     $(window).on('resize',function(){
         if($(document).width()<880){
             $('.gouwudai').trigger('click');
         }
     })
    //$(window).on('resize',function(){
    //    if($(document).width()>880){
    //        $('.ding-nei2-a').trigger('click');
    //    }
    //})

});

//新BANNER
$(function(){

  var as=$('.banner-box a');
  var num=0;
  var next=0;
    var width=3000;
  var dian=$('.xia .dian');
  var zuo=$('.banner-box .zuo');
  var you=$('.banner-box .you');
  var kaiguan=true;
  var kai=true;
    for(var i = 0;i<as.length;i++){
        if(i==0){
            continue;
        }
        as.eq(i).css({left:width});
    }

    dian.on('click',function(){
        if(kaiguan){
             nn=$(this).index();

            for(i=0;i<dian.length;i++){
                dian.eq(i).removeClass('quan');
                as.eq(i).css({left:width});
            }
            $(this).addClass('quan');
            as.eq(nn).animate({left:0},function(){
                kaiguan=true;
                console.log("1111")
            });
            kaiguan=false;
            console.log("1111")
            num=nn;
            next=num;
        }else {
            return;
        }
    })
  you.on('click',function(){
      if(kaiguan){
          bb();
          kaiguan=false;
      }else {
          return;
      }

  })
  zuo.on('click',function(){
      if(kaiguan){
          aa();
          kaiguan=false;
      }else {
          return;
      }

    })
    $('.banner-box').on('mouseover',function(){
        clearInterval(t);
    })
    $('.banner-box').on('mouseout',function(){
        t=setInterval(aa,2000);
    })

//$(window).on('resize',function(){
//    width=$(window).width();
//})

        function aa() {

            next++;
            if (next == as.length) {
                next = 0
            }
            as.eq(next).css({left:width});
            as.eq(num).animate({left: -width}, function () {
                kaiguan = true;
            });
            as.eq(next).animate({left: 0});
            num = next;

            for (j = 0; j < dian.length; j++) {
                dian.eq(j).removeClass('quan');
            }
            dian.eq(num).addClass('quan');
        }

        function bb() {
            next--;
            if (next < 0) {
                next = as.length - 1;
            }
            as.eq(next).css({left: -width});
            as.eq(num).animate({left: width}, function () {
                kaiguan = true;
            });
            as.eq(next).animate({left: 0});
            num = next;
            for (j = 0; j < dian.length; j++) {
                dian.eq(j).removeClass('quan');
            }
            dian.eq(num).addClass('quan');
        }

        var t = setInterval(aa, 2000);


});
//dibu
$(function(){
    dul=$('.lie');

    dul.on('click',function(){

        $(this).find('.xyclose').toggleClass('chazhuan') ;
        $(this).toggleClass("chuxian");
        $('.lie.chuxian').height(($(this).children()).length*25);
    })
    var pp=dul.find('span');
    pp.on('click',function(){
        $('.lie').height(40);
    })
})