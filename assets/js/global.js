(function($){

  /* Parallax Scrolling
  ---------------------------------------------------------------------------------------------------- */

  function parallax_scrolling() {
    var scrolled = $(window).scrollTop();

    // Comp Screenshots
    $('.slide').css('transform','translate3d(0, +' + ((scrolled*0.30)) + 'px, 0)');

    $('.slide.more').css('transform','translate3d(0, +' + ((scrolled*0.80)) + 'px, 0)');
  }

  if ($(window).width() >= 860){
    $(window).bind('scroll', function() {
      parallax_scrolling();
    });
  }

  /* Smooth Scrolling
  ---------------------------------------------------------------------------------------------------- */

  $(document).on('click', '.scroll', function() {
    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    });

    return false;
  });

  /* Product Option Selection
  ---------------------------------------------------------------------------------------------------- */

  $(document).on('click', '.option', function() {
    var price = $(this).data('price');

    $('.option.checked').removeClass('checked');
    $(this).addClass('checked');

    $('.button .meta').addClass('fadeout');

    setTimeout(function(){
      $('.button .meta').empty().append(price).addClass('fadein').removeClass('fadeout');
    }, 250);


    return false;
  });

  /* Product Color Selection
  ---------------------------------------------------------------------------------------------------- */

  $(document).on('click', '.color', function() {
    var color = $(this).data('color');

    $('.color.checked').removeClass('checked');
    $(this).addClass('checked');

    $('.colors h3 span').addClass('fadeout');

    setTimeout(function(){
      $('.colors h3 span').empty().append(color).addClass('fadein').removeClass('fadeout');
    }, 250);


    return false;
  });

  /* Post nav
  ---------------------------------------------------------------------------------------------------- */
  var $posts = $( '.row.widget' ).length;
  var $postsGroups = Math.ceil( $posts / 3 );

  $(document).on('click', '.older', function() {
    $('.group').removeClass('fadein').addClass('fadeout');

    var $classes = $('.group').attr('class').split(/\s+/);
    var $index = $classes.findIndex( element => element.includes( 'current-' ));
    var $group = $classes[$index].toString();
    $group = $group.replace('current-', '');
    var $groupNum = parseInt($group);

    setTimeout(function(){
      var $thisName = 'current-' + $groupNum;
      var $next = $('.group').removeClass( $thisName );
      var $className;

      if ( $groupNum !== 1 ) {
        $className = 'fadein current-' + ($groupNum - 1);
        $next.removeClass('fadeout').addClass( $className );
      } else {
        $className = 'fadein current-' + $postsGroups;
        $next.removeClass('fadeout').addClass( $className );
      }
    }, 150);

    return false;
  });

  $(document).on('click', '.newer', function() {
    $('.group').removeClass('fadein').addClass('fadeout');

    var $classes = $('.group').attr('class').split(/\s+/);
    var $index = $classes.findIndex( element => element.includes( 'current-' ));
    var $group = $classes[$index].toString();
    $group = $group.replace('current-', '');
    var $groupNum = parseInt($group);

    setTimeout(function(){
      var $thisName = 'current-' + $groupNum;
      var $prev = $('.group').removeClass( $thisName );
      var $className;

      if ( $groupNum === $postsGroups) {
        $className = 'fadein current-1';
        $prev.removeClass('fadeout').addClass( $className );
      } else {
        $className = 'fadein current-' + ($groupNum + 1);
        $prev.removeClass('fadeout').addClass( $className );
      }
    }, 150);

    return false;
  });

  /* Add to cart
  ---------------------------------------------------------------------------------------------------- */

  $(document).on('click', '.addtocart', function() {
    $('#cart-side').removeClass('slideoutright').addClass('slideinright');

    return false;
  });

  $(document).on('click', '#cart-side .close', function() {
    $('#cart-side').addClass('slideoutright');

    setTimeout(function(){
      $('#cart-side').removeClass('slideinright');
    }, 500);

    return false;
  });

  /* Account Tabbing: For all the tabs on the account page
  ---------------------------------------------------------------------------------------------------- */

  $(document).on('click', '.user .toggle', function() {

    // Update the account menu
    $('.user .toggle.current').removeClass('current');
    $(this).addClass('current');

    // The tab var.
    var tab = $(this).attr('href');

    // Set the current active tab to inactive.
    $('.tab.active').removeClass('fadein').addClass('fadeout');

    setTimeout(function(){
      $('.tab.active').removeClass('active').addClass('inactive');

      $(tab).removeClass('inactive').addClass('active');
      $(tab).removeClass('fadeout').addClass('fadein');
    }, 250);

    return false;
  });

  /* Loadmore for Products: Just for demo purposes.
  ---------------------------------------------------------------------------------------------------- */

  $(function () {
    $('#products .product').slice(0, 3).show();

    $('#products .load').on('click', function (e) {

      e.preventDefault();

      $('#products .product:hidden').slice(0, 3).fadeIn();

      if ($('#products .products:hidden').length == 0) {
        $('#products .loadmore').fadeOut('fast');
      }

      $('html,body').animate({
        scrollTop: $(this).offset().top - 600
      }, 1000);
    });
  });

  /* Toggle Order History Details
  ---------------------------------------------------------------------------------------------------- */

  $(document).on('click', '.order .more', function(e) {

    e.preventDefault();

    var $button = $(this);
    var $buttonText = $(this).html();
    var $thisOrder = $(this).closest('.order').children().find('.row');

    // Change Button Text
    if( $buttonText === 'More Details') {
      $button.text("Less Details");
    } else {
      $button.text("More Details");
    }

    // Show Order History Details
    $thisOrder.not('.overview').not('.total').toggleClass('hide');

  });


  /* Menu Toggles: Used for opening and closing sub-menus.
  ---------------------------------------------------------------------------------------------------- */

  // Open sub-menus.

  $(document).on('mouseenter', '.open-menu', function() {
    var menu = $(this).data('menu');

    // Close any active sub menu.
    $('.menus.fadein').removeClass('fadein').addClass('fadeout');

    // Open the sub menu.
    $(menu).removeClass('fadeout').addClass('fadein');
  });

  if ($(window).width() <= 600){
    $(document).on('click', '#header .brand', function() {

      // Close any active sub menu.
      $('.menus.fadein').removeClass('fadein').addClass('fadeout');

      // Open the sub menu.
      $('#menu').removeClass('fadeout').addClass('fadein');

      return false;
    });
  }

  // Close sub-menus upon leaving an active sub-menu.

  $(document).on('mouseleave', '.sub-menus .menus', function() {

    // Close any active sub menu.
    $('.menus.fadein').removeClass('fadein').addClass('fadeout');
  });

  // Close sub-menus via the ".close" class.

  $(document).on('click', '.sub-menus .close', function() {

    // Close any active sub menu.
    $('.menus.fadein').removeClass('fadein').addClass('fadeout');

    return false;
  });

  /* The Panel Script: Used for all panels (login forms, videos, etc.).
  ---------------------------------------------------------------------------------------------------- */

  // Open panels via the ".open" class.

  $(document).on('click', '.open', function() {
    var panel = $(this).attr('href');

    // Open the panel.
    $(panel).removeClass('fadeout').addClass('fadein');

    return false;
  });

  // Close panels via the ".close" class.

  $(document).on('click', '.panel .close', function() {

    // Close the panel.
    $('.panel.fadein').removeClass('fadein').addClass('fadeout');

    return false;
  });

  /* Search Toggle: For mobile.
  ---------------------------------------------------------------------------------------------------- */

  // Open panels via the ".open" class.

  $(document).on('click', '#search .toggle', function() {

    // Toggle the search form.
    $('#search').addClass('toggled');

    return false;
  });

  /* Sidebar Toggle: Used for toggling the post and archive sidebar.
  ---------------------------------------------------------------------------------------------------- */

  $.fn.isInViewport = function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();

      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  // $(window).on('resize scroll', function() {
  //     if ($('.side:not(.toggled)').isInViewport()) {
  //       $('.slider.left').removeClass('toggled');
  //     } else {
  //       $('.slider.left').addClass('toggled');
  //     }
  // });

  // Open the sidebar and blur the main content.

  $(document).on('click', '.slider.left', function() {
    $('.slider.right').removeClass('toggled');
    $('.slider.left').addClass('toggled');
    $('.column.side').addClass('toggled');
    $('.column.main').addClass('toggled');

    // Scroll to the top!
    $("html, body").animate({
      scrollTop: 0
    }, 500);

    return false;
  });

  // Close the sidebar and unblur the main content.

  $(document).on('click', '.slider.right', function() {
    $('.slider.left').removeClass('toggled');
    $('.slider.right').addClass('toggled');
    $('.column.side').removeClass('toggled');
    $('.column.main').removeClass('toggled');

    return false;
  });

  /* Social Sharing Window Normalization
  ---------------------------------------------------------------------------------------------------- */

  function PopupCenter(url, title, w, h) {
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    if (window.focus) {
      newWindow.focus();
    }
  }

  (function($) {
    $('.share-link').click(function(e) {
      e.preventDefault();
      var href = $(this).attr('href');
      PopupCenter(href,'xtf','600','440');
    });
  })(jQuery);

  /* Autosize Textareas
  ---------------------------------------------------------------------------------------------------- */

  // Autosize (https://github.com/jackmoore/autosize) Version 3.0.14
  (function(e){var t,n={className:"autosizejs",append:"",callback:!1,resizeDelay:10},r='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',i=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],s=e(r).data("autosize",!0)[0];s.style.lineHeight="99px","99px"===e(s).css("lineHeight")&&i.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(r){return this.length?(r=e.extend({},n,r||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function n(){var t,n;"getComputedStyle"in window?(t=window.getComputedStyle(h,null),n=h.getBoundingClientRect().width,e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,r){n-=parseInt(t[r],10)}),s.style.width=n+"px"):s.style.width=Math.max(p.width(),0)+"px"}function o(){var o={};if(t=h,s.className=r.className,f=parseInt(p.css("maxHeight"),10),e.each(i,function(e,t){o[t]=p.css(t)}),e(s).css(o),n(),window.chrome){var u=h.style.width;h.style.width="0px",h.offsetWidth,h.style.width=u}}function u(){var e,i;t!==h?o():n(),s.value=h.value+r.append,s.style.overflowY=h.style.overflowY,i=parseInt(h.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,f&&e>f?(h.style.overflowY="scroll",e=f):(h.style.overflowY="hidden",l>e&&(e=l)),e+=d,i!==e&&(h.style.height=e+"px",v&&r.callback.call(h,h))}function a(){clearTimeout(c),c=setTimeout(function(){var e=p.width();e!==g&&(g=e,u())},parseInt(r.resizeDelay,10))}var f,l,c,h=this,p=e(h),d=0,v=e.isFunction(r.callback),m={height:h.style.height,overflow:h.style.overflow,overflowY:h.style.overflowY,wordWrap:h.style.wordWrap,resize:h.style.resize},g=p.width();p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(d=p.outerHeight()-p.height()),l=Math.max(parseInt(p.css("minHeight"),10)-d||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word",resize:"none"===p.css("resize")||"vertical"===p.css("resize")?"none":"horizontal"}),"onpropertychange"in h?"oninput"in h?p.on("input.autosize keyup.autosize",u):p.on("propertychange.autosize",function(){"value"===event.propertyName&&u()}):p.on("input.autosize",u),r.resizeDelay!==!1&&e(window).on("resize.autosize",a),p.on("autosize.resize",u),p.on("autosize.resizeIncludeStyle",function(){t=null,u()}),p.on("autosize.destroy",function(){t=null,clearTimeout(c),e(window).off("resize",a),p.off("autosize").off(".autosize").css(m).removeData("autosize")}),u())})):this}})(window.jQuery||window.$)

  // Autosize textareas... because unused space sucks.
  $('textarea').autosize();

  /* Match Height: Used for menus.
  ---------------------------------------------------------------------------------------------------- */

  // https://github.com/liabru/jquery-match-height
  !function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,n=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),i=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-n(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(i-a))<=o?r[r.length-1]=s.add(e):r.push(e),i=a}),r},i=function(e){var o={
  byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=i(e);if(o.remove){var n=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(n)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.2",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
  r._afterUpdate=null,r._rows=a,r._parse=n,r._parseOptions=i,r._apply=function(e,o){var s=i(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),u=h.parents().filter(":hidden");return u.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),u.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
  "padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),i=0;if(s.target)i=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),n=e.css("display");"inline-block"!==n&&"flex"!==n&&"inline-flex"!==n&&(n="block");var a={
  display:n};a[s.property]="",e.css(a),e.outerHeight(!1)>i&&(i=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=n(e.css("border-top-width"))+n(e.css("border-bottom-width")),o+=n(e.css("padding-top"))+n(e.css("padding-bottom"))),e.css(s.property,i-o+"px"))})}),u.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
  this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),n=o.attr("data-mh")||o.attr("data-match-height");n in e?e[n]=e[n].add(o):e[n]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(n,a){if(a&&"resize"===a.type){var i=t(window).width();if(i===e)return;e=i;
  }n?o===-1&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi);var h=t.fn.on?"on":"bind";t(window)[h]("load",function(t){r._update(!1,t)}),t(window)[h]("resize orientationchange",function(t){r._update(!0,t)})});

  $(function() {
    $('.menu').matchHeight();
  });

})(jQuery);