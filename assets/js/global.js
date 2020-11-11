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

  /*  -----------------------------------------------------------------------------------------------
    Namespace
  --------------------------------------------------------------------------------------------------- */

  var simply = simply || {};

  // Set a default value for scrolled.
  simply.scrolled = 0;

  // polyfill closest
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
  if ( ! Element.prototype.closest ) {
    Element.prototype.closest = function( s ) {
      var el = this;

      do {
        if ( el.matches( s ) ) {
          return el;
        }

        el = el.parentElement || el.parentNode;
      } while ( el !== null && el.nodeType === 1 );

      return null;
    };
  }

  // polyfill forEach
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
  if ( window.NodeList && ! NodeList.prototype.forEach ) {
    NodeList.prototype.forEach = function( callback, thisArg ) {
      var i;
      var len = this.length;

      thisArg = thisArg || window;

      for ( i = 0; i < len; i++ ) {
        callback.call( thisArg, this[ i ], i, this );
      }
    };
  }

  // event "polyfill"
  simply.createEvent = function( eventName ) {
    var event;
    if ( typeof window.Event === 'function' ) {
      event = new Event( eventName );
    } else {
      event = document.createEvent( 'Event' );
      event.initEvent( eventName, true, false );
    }
    return event;
  };

  // matches "polyfill"
  // https://developer.mozilla.org/es/docs/Web/API/Element/matches
  if ( ! Element.prototype.matches ) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function( s ) {
        var matches = ( this.document || this.ownerDocument ).querySelectorAll( s ),
          i = matches.length;
        while ( --i >= 0 && matches.item( i ) !== this ) {}
        return i > -1;
      };
  }

  // Add a class to the body for when touch is enabled for browsers that don't support media queries
  // for interaction media features. Adapted from <https://codepen.io/Ferie/pen/vQOMmO>
  ( function() {
    var matchMedia = function() {
      // Include the 'heartz' as a way to have a non matching MQ to help terminate the join. See <https://git.io/vznFH>.
      var prefixes = [ '-webkit-', '-moz-', '-o-', '-ms-' ];
      var query = [ '(', prefixes.join( 'touch-enabled),(' ), 'heartz', ')' ].join( '' );
      return window.matchMedia && window.matchMedia( query ).matches;
    };

    if ( ( 'ontouchstart' in window ) || ( window.DocumentTouch && document instanceof window.DocumentTouch ) || matchMedia() ) {
      document.body.classList.add( 'touch-enabled' );
    }
  }() );

  /*  -----------------------------------------------------------------------------------------------
    Cover Modals
  --------------------------------------------------------------------------------------------------- */

  simply.coverModals = {

    init: function() {
      if ( document.querySelector( '.cover-modal' ) ) {
        // Handle cover modals when they're toggled
        this.onToggle();

        // When toggled, untoggle if visitor clicks on the wrapping element of the modal
        this.outsideUntoggle();

        // Close on escape key press
        this.closeOnEscape();

        // Hide and show modals before and after their animations have played out
        this.hideAndShowModals();
      }
    },

    // Handle cover modals when they're toggled
    onToggle: function() {
      document.querySelectorAll( '.cover-modal' ).forEach( function( element ) {
        element.addEventListener( 'toggled', function( event ) {
          var modal = event.target,
            body = document.body;

          if ( modal.classList.contains( 'active' ) ) {
            body.classList.add( 'showing-modal' );
          } else {
            body.classList.remove( 'showing-modal' );
            body.classList.add( 'hiding-modal' );

            // Remove the hiding class after a delay, when animations have been run
            setTimeout( function() {
              body.classList.remove( 'hiding-modal' );
            }, 500 );
          }
        } );
      } );
    },

    // Close modal on outside click
    outsideUntoggle: function() {
      document.addEventListener( 'click', function( event ) {
        var target = event.target;
        var modal = document.querySelector( '.cover-modal.active' );

        if ( target === modal ) {
          this.untoggleModal( target );
        }
      }.bind( this ) );
    },

    // Close modal on escape key press
    closeOnEscape: function() {
      document.addEventListener( 'keydown', function( event ) {
        if ( event.keyCode === 27 ) {
          event.preventDefault();
          document.querySelectorAll( '.cover-modal.active' ).forEach( function( element ) {
            this.untoggleModal( element );
          }.bind( this ) );
        }
      }.bind( this ) );
    },

    // Hide and show modals before and after their animations have played out
    hideAndShowModals: function() {
      var _doc = document,
        _win = window,
        modals = _doc.querySelectorAll( '.cover-modal' ),
        htmlStyle = _doc.documentElement.style,
        adminBar = _doc.querySelector( '#wpadminbar' );

      function getAdminBarHeight( negativeValue ) {
        var height,
          currentScroll = _win.pageYOffset;

        if ( adminBar ) {
          height = currentScroll + adminBar.getBoundingClientRect().height;

          return negativeValue ? -height : height;
        }

        return currentScroll === 0 ? 0 : -currentScroll;
      }

      function htmlStyles() {
        var overflow = _win.innerHeight > _doc.documentElement.getBoundingClientRect().height;

        return {
          'overflow-y': overflow ? 'hidden' : 'scroll',
          position: 'fixed',
          width: '100%',
          top: getAdminBarHeight( true ) + 'px',
          left: 0
        };
      }

      // Show the modal
      modals.forEach( function( modal ) {
        modal.addEventListener( 'toggle-target-before-inactive', function( event ) {
          var styles = htmlStyles(),
            offsetY = _win.pageYOffset,
            paddingTop = ( Math.abs( getAdminBarHeight() ) - offsetY ) + 'px',
            mQuery = _win.matchMedia( '(max-width: 600px)' );

          if ( event.target !== modal ) {
            return;
          }

          Object.keys( styles ).forEach( function( styleKey ) {
            htmlStyle.setProperty( styleKey, styles[ styleKey ] );
          } );

          _win.simply.scrolled = parseInt( styles.top, 10 );

          if ( adminBar ) {
            _doc.body.style.setProperty( 'padding-top', paddingTop );

            if ( mQuery.matches ) {
              if ( offsetY >= getAdminBarHeight() ) {
                modal.style.setProperty( 'top', 0 );
              } else {
                modal.style.setProperty( 'top', ( getAdminBarHeight() - offsetY ) + 'px' );
              }
            }
          }

          modal.classList.add( 'show-modal' );
        } );

        // Hide the modal after a delay, so animations have time to play out
        modal.addEventListener( 'toggle-target-after-inactive', function( event ) {
          if ( event.target !== modal ) {
            return;
          }

          setTimeout( function() {
            var clickedEl = simply.toggles.clickedEl;

            modal.classList.remove( 'show-modal' );

            Object.keys( htmlStyles() ).forEach( function( styleKey ) {
              htmlStyle.removeProperty( styleKey );
            } );

            if ( adminBar ) {
              _doc.body.style.removeProperty( 'padding-top' );
              modal.style.removeProperty( 'top' );
            }

            if ( clickedEl !== false ) {
              clickedEl.focus();
              clickedEl = false;
            }

            _win.scrollTo( 0, Math.abs( _win.simply.scrolled + getAdminBarHeight() ) );

            _win.simply.scrolled = 0;
          }, 500 );
        } );
      } );
    },

    // Untoggle a modal
    untoggleModal: function( modal ) {
      var modalTargetClass,
        modalToggle = false;

      // If the modal has specified the string (ID or class) used by toggles to target it, untoggle the toggles with that target string
      // The modal-target-string must match the string toggles use to target the modal
      if ( modal.dataset.modalTargetString ) {
        modalTargetClass = modal.dataset.modalTargetString;

        modalToggle = document.querySelector( '*[data-toggle-target="' + modalTargetClass + '"]' );
      }

      // If a modal toggle exists, trigger it so all of the toggle options are included
      if ( modalToggle ) {
        modalToggle.click();

        // If one doesn't exist, just hide the modal
      } else {
        modal.classList.remove( 'active' );
      }
    }

  }; // simply.coverModals

  simply.coverModals.init();

  /*  -----------------------------------------------------------------------------------------------
    Primary Menu
  --------------------------------------------------------------------------------------------------- */

  simply.primaryMenu = {

    init: function() {
      this.focusMenuWithChildren();
    },

    // The focusMenuWithChildren() function implements Keyboard Navigation in the Primary Menu
    // by adding the '.focus' class to all 'li.menu-item-has-children' when the focus is on the 'a' element.
    focusMenuWithChildren: function() {
      // Get all the link elements within the primary menu.
      var menu, links, i, len;

      menu = document.querySelector( '.primary-menu-wrapper' );

      if ( ! menu ) {
        return false;
      }

      links = menu.getElementsByTagName( 'a' );

      // Each time a menu link is focused or blurred, toggle focus.
      for ( i = 0, len = links.length; i < len; i++ ) {
        links[i].addEventListener( 'focus', toggleFocus, true );
        links[i].addEventListener( 'blur', toggleFocus, true );
      }

      //Sets or removes the .focus class on an element.
      function toggleFocus() {
        var self = this;

        // Move up through the ancestors of the current link until we hit .primary-menu.
        while ( -1 === self.className.indexOf( 'primary-menu' ) ) {
          // On li elements toggle the class .focus.
          if ( 'li' === self.tagName.toLowerCase() ) {
            if ( -1 !== self.className.indexOf( 'focus' ) ) {
              self.className = self.className.replace( ' focus', '' );
            } else {
              self.className += ' focus';
            }
          }
          self = self.parentElement;
        }
      }
    }
  }; // simply.primaryMenu

  simply.primaryMenu.init();

  /*  -----------------------------------------------------------------------------------------------
    Modal Menu
  --------------------------------------------------------------------------------------------------- */
  simply.modalMenu = {

    init: function() {
      // If the current menu item is in a sub level, expand all the levels higher up on load
      this.expandLevel();
      this.keepFocusInModal();
    },

    expandLevel: function() {
      var modalMenus = document.querySelectorAll( '.modal-menu' );

      modalMenus.forEach( function( modalMenu ) {
        var activeMenuItem = modalMenu.querySelector( '.current-menu-item' );

        if ( activeMenuItem ) {
          simplyFindParents( activeMenuItem, 'li' ).forEach( function( element ) {
            var subMenuToggle = element.querySelector( '.sub-menu-toggle' );
            if ( subMenuToggle ) {
              simply.toggles.performToggle( subMenuToggle, true );
            }
          } );
        }
      } );
    },

    keepFocusInModal: function() {
      var _doc = document;

      _doc.addEventListener( 'keydown', function( event ) {
        var clickedEl = simply.toggles.clickedEl,
          toggleTarget, modal, selectors, elements, menuType, bottomMenu, activeEl, lastEl, firstEl, tabKey, shiftKey;

        if ( clickedEl && _doc.body.classList.contains( 'showing-modal' ) ) {
          toggleTarget = clickedEl.dataset.toggleTarget;
          selectors = 'input, a, button';
          modal = _doc.querySelector( toggleTarget );

          elements = modal.querySelectorAll( selectors );
          elements = Array.prototype.slice.call( elements );

          if ( '.menu-modal' === toggleTarget ) {
            menuType = window.matchMedia( '(min-width: 1000px)' ).matches;
            menuType = menuType ? '.expanded-menu' : '.mobile-menu';

            elements = elements.filter( function( element ) {
              return null !== element.closest( menuType ) && null !== element.offsetParent;
            } );

            elements.unshift( _doc.querySelector( '.close-nav-toggle' ) );

            bottomMenu = _doc.querySelector( '.menu-bottom > nav' );

            if ( bottomMenu ) {
              bottomMenu.querySelectorAll( selectors ).forEach( function( element ) {
                elements.push( element );
              } );
            }
          }

          lastEl = elements[ elements.length - 1 ];
          firstEl = elements[0];
          activeEl = _doc.activeElement;
          tabKey = event.keyCode === 9;
          shiftKey = event.shiftKey;

          if ( ! shiftKey && tabKey && lastEl === activeEl ) {
            event.preventDefault();
            firstEl.focus();
          }

          if ( shiftKey && tabKey && firstEl === activeEl ) {
            event.preventDefault();
            lastEl.focus();
          }
        }
      } );
    }
  }; // simply.modalMenu

  simply.modalMenu.init();

  /*  -----------------------------------------------------------------------------------------------
    Toggles
  --------------------------------------------------------------------------------------------------- */

  simply.toggles = {

    clickedEl: false,

    init: function() {
      // Do the toggle
      this.toggle();

      // Check for toggle/untoggle on resize
      this.resizeCheck();

      // Check for untoggle on escape key press
      this.untoggleOnEscapeKeyPress();
    },

    performToggle: function( element, instantly ) {
      var self, toggle, _doc, targetString, target, timeOutTime, classToToggle, activeClass;

      self = this;
      _doc = document;

      // Get our targets
      toggle = element;
      targetString = toggle.dataset.toggleTarget;
      activeClass = 'active';

      // Elements to focus after modals are closed
      if ( ! _doc.querySelectorAll( '.show-modal' ).length ) {
        self.clickedEl = _doc.activeElement;
      }

      if ( targetString === 'next' ) {
        target = toggle.nextSibling;
      } else {
        target = _doc.querySelector( targetString );
      }

      // Trigger events on the toggle targets before they are toggled
      if ( target.classList.contains( activeClass ) ) {
        target.dispatchEvent( simply.createEvent( 'toggle-target-before-active' ) );
      } else {
        target.dispatchEvent( simply.createEvent( 'toggle-target-before-inactive' ) );
      }

      // Get the class to toggle, if specified
      classToToggle = toggle.dataset.classToToggle ? toggle.dataset.classToToggle : activeClass;

      // For cover modals, set a short timeout duration so the class animations have time to play out
      timeOutTime = 0;

      if ( target.classList.contains( 'cover-modal' ) ) {
        timeOutTime = 10;
      }

      setTimeout( function() {
        var focusElement, duration, newTarget, subMenued;

        subMenued = target.classList.contains( 'sub-menu' );
        newTarget = subMenued ? toggle.closest( '.menu-item' ).querySelector( '.sub-menu' ) : target;
        duration = toggle.dataset.toggleDuration;

        // Toggle the target of the clicked toggle
        if ( toggle.dataset.toggleType === 'slidetoggle' && ! instantly && duration !== '0' ) {
          simplyMenuToggle( newTarget, duration );
        } else {
          newTarget.classList.toggle( classToToggle );
        }

        // If the toggle target is 'next', only give the clicked toggle the active class
        if ( targetString === 'next' ) {
          toggle.classList.toggle( activeClass );
        } else if ( target.classList.contains( 'sub-menu' ) ) {
          toggle.classList.toggle( activeClass );
        } else {
          // If not, toggle all toggles with this toggle target
          _doc.querySelector( '*[data-toggle-target="' + targetString + '"]' ).classList.toggle( activeClass );
        }

        // Toggle aria-expanded on the toggle
        simplyToggleAttribute( toggle, 'aria-expanded', 'true', 'false' );

        if ( self.clickedEl && -1 !== toggle.getAttribute( 'class' ).indexOf( 'close-' ) ) {
          simplyToggleAttribute( self.clickedEl, 'aria-expanded', 'true', 'false' );
        }

        // Toggle body class
        if ( toggle.dataset.toggleBodyClass ) {
          _doc.body.classList.toggle( toggle.dataset.toggleBodyClass );
        }

        // Check whether to set focus
        if ( toggle.dataset.setFocus ) {
          focusElement = _doc.querySelector( toggle.dataset.setFocus );

          if ( focusElement ) {
            if ( target.classList.contains( activeClass ) ) {
              focusElement.focus();
            } else {
              focusElement.blur();
            }
          }
        }

        // Trigger the toggled event on the toggle target
        target.dispatchEvent( simply.createEvent( 'toggled' ) );

        // Trigger events on the toggle targets after they are toggled
        if ( target.classList.contains( activeClass ) ) {
          target.dispatchEvent( simply.createEvent( 'toggle-target-after-active' ) );
        } else {
          target.dispatchEvent( simply.createEvent( 'toggle-target-after-inactive' ) );
        }
      }, timeOutTime );
    },

    // Do the toggle
    toggle: function() {
      var self = this;

      document.querySelectorAll( '*[data-toggle-target]' ).forEach( function( element ) {
        element.addEventListener( 'click', function( event ) {
          event.preventDefault();
          self.performToggle( element );
        } );
      } );
    },

    // Check for toggle/untoggle on screen resize
    resizeCheck: function() {
      if ( document.querySelectorAll( '*[data-untoggle-above], *[data-untoggle-below], *[data-toggle-above], *[data-toggle-below]' ).length ) {
        window.addEventListener( 'resize', function() {
          var winWidth = window.innerWidth,
            toggles = document.querySelectorAll( '.toggle' );

          toggles.forEach( function( toggle ) {
            var unToggleAbove = toggle.dataset.untoggleAbove,
              unToggleBelow = toggle.dataset.untoggleBelow,
              toggleAbove = toggle.dataset.toggleAbove,
              toggleBelow = toggle.dataset.toggleBelow;

            // If no width comparison is set, continue
            if ( ! unToggleAbove && ! unToggleBelow && ! toggleAbove && ! toggleBelow ) {
              return;
            }

            // If the toggle width comparison is true, toggle the toggle
            if (
              ( ( ( unToggleAbove && winWidth > unToggleAbove ) ||
                ( unToggleBelow && winWidth < unToggleBelow ) ) &&
                toggle.classList.contains( 'active' ) ) ||
              ( ( ( toggleAbove && winWidth > toggleAbove ) ||
                ( toggleBelow && winWidth < toggleBelow ) ) &&
                ! toggle.classList.contains( 'active' ) )
            ) {
              toggle.click();
            }
          } );
        } );
      }
    },

    // Close toggle on escape key press
    untoggleOnEscapeKeyPress: function() {
      document.addEventListener( 'keyup', function( event ) {
        if ( event.key === 'Escape' ) {
          document.querySelectorAll( '*[data-untoggle-on-escape].active' ).forEach( function( element ) {
            if ( element.classList.contains( 'active' ) ) {
              element.click();
            }
          } );
        }
      } );
    }

  }; // simply.toggles

  /**
   * Is the DOM ready
   *
   * this implementation is coming from https://gomakethings.com/a-native-javascript-equivalent-of-jquerys-ready-method/
   *
   * @param {Function} fn Callback function to run.
   */
  function simplyDomReady( fn ) {
    if ( typeof fn !== 'function' ) {
      return;
    }

    if ( document.readyState === 'interactive' || document.readyState === 'complete' ) {
      return fn();
    }

    document.addEventListener( 'DOMContentLoaded', fn, false );
  }

  simplyDomReady( function() {
    simply.toggles.init();  // Handle toggles
    simply.coverModals.init();  // Handle cover modals
    simply.modalMenu.init();  // Modal Menu
    simply.primaryMenu.init();  // Primary Menu
  } );

  /* Toggle an attribute ----------------------- */

  function simplyToggleAttribute( element, attribute, trueVal, falseVal ) {
    if ( trueVal === undefined ) {
      trueVal = true;
    }
    if ( falseVal === undefined ) {
      falseVal = false;
    }
    if ( element.getAttribute( attribute ) !== trueVal ) {
      element.setAttribute( attribute, trueVal );
    } else {
      element.setAttribute( attribute, falseVal );
    }
  }

  /**
   * Toggle a menu item on or off.
   *
   * @param {HTMLElement} target
   * @param {number} duration
   */
  function simplyMenuToggle( target, duration ) {
    var initialPositions = [];
    var finalPositions = [];
    var initialParentHeight, finalParentHeight;
    var menu, menuItems;
    var transitionListener;

    if ( ! target ) {
      return;
    }

    menu = target.closest( '.menu-wrapper' );

    // Step 1: look at the initial positions of every menu item.
    menuItems = menu.querySelectorAll( '.menu-item' );

    menuItems.forEach( function( menuItem, index ) {
      initialPositions[ index ] = { x: menuItem.offsetLeft, y: menuItem.offsetTop };
    } );
    initialParentHeight = target.parentElement.offsetHeight;

    target.classList.add( 'toggling-target' );

    // Step 2: toggle target menu item and look at the final positions of every menu item.
    target.classList.toggle( 'active' );

    menuItems.forEach( function( menuItem, index ) {
      finalPositions[ index ] = { x: menuItem.offsetLeft, y: menuItem.offsetTop };
    } );
    finalParentHeight = target.parentElement.offsetHeight;

    // Step 3: close target menu item again.
    // The whole process happens without giving the browser a chance to render, so it's invisible.
    target.classList.toggle( 'active' );

    // Step 4: prepare animation.
    // Position all the items with absolute offsets, at the same starting position.
    // Shouldn't result in any visual changes if done right.
    menu.classList.add( 'is-toggling' );
    target.classList.toggle( 'active' );
    menuItems.forEach( function( menuItem, index ) {
      var initialPosition = initialPositions[ index ];
      if ( initialPosition.y === 0 && menuItem.parentElement === target ) {
        initialPosition.y = initialParentHeight;
      }
      menuItem.style.transform = 'translate(' + initialPosition.x + 'px, ' + initialPosition.y + 'px)';
    } );

    // The double rAF is unfortunately needed, since we're toggling CSS classes, and
    // the only way to ensure layout completion here across browsers is to wait twice.
    // This just delays the start of the animation by 2 frames and is thus not an issue.
    requestAnimationFrame( function() {
      requestAnimationFrame( function() {
        // Step 5: start animation by moving everything to final position.
        // All the layout work has already happened, while we were preparing for the animation.
        // The animation now runs entirely in CSS, using cheap CSS properties (opacity and transform)
        // that don't trigger the layout or paint stages.
        menu.classList.add( 'is-animating' );
        menuItems.forEach( function( menuItem, index ) {
          var finalPosition = finalPositions[ index ];
          if ( finalPosition.y === 0 && menuItem.parentElement === target ) {
            finalPosition.y = finalParentHeight;
          }
          if ( duration !== undefined ) {
            menuItem.style.transitionDuration = duration + 'ms';
          }
          menuItem.style.transform = 'translate(' + finalPosition.x + 'px, ' + finalPosition.y + 'px)';
        } );
        if ( duration !== undefined ) {
          target.style.transitionDuration = duration + 'ms';
        }
      } );

      // Step 6: finish toggling.
      // Remove all transient classes when the animation ends.
      transitionListener = function() {
        menu.classList.remove( 'is-animating' );
        menu.classList.remove( 'is-toggling' );
        target.classList.remove( 'toggling-target' );
        menuItems.forEach( function( menuItem ) {
          menuItem.style.transform = '';
          menuItem.style.transitionDuration = '';
        } );
        target.style.transitionDuration = '';
        target.removeEventListener( 'transitionend', transitionListener );
      };

      target.addEventListener( 'transitionend', transitionListener );
    } );
  }

  /**
   * traverses the DOM up to find elements matching the query
   *
   * @param {HTMLElement} target
   * @param {string} query
   * @return {NodeList} parents matching query
   */
  function simplyFindParents( target, query ) {
    var parents = [];

    // recursively go up the DOM adding matches to the parents array
    function traverse( item ) {
      var parent = item.parentNode;
      if ( parent instanceof HTMLElement ) {
        if ( parent.matches( query ) ) {
          parents.push( parent );
        }
        traverse( parent );
      }
    }

    traverse( target );

    return parents;
  }

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