<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Simply
 */

?>

<!-- Footer: For the newsletter form and footer menu. -->
  <?php tha_footer_before(); ?>
    <footer class="row" id="footer">
      <?php tha_footer_top(); ?>
      <div class="inner">
        <div class="row newsletter">
          <?php
            if(is_active_sidebar('footer-1')){
              dynamic_sidebar('footer-1');
            }
          ?>
        </div><!-- .footer-1 -->

        <div class="row menus four">
          <?php
            if(is_active_sidebar('footer-2')){
              dynamic_sidebar('footer-2');
            }
          ?>
        </div><!-- .footer-2 -->

      </div><!-- .inner -->
      <?php tha_footer_bottom(); ?>
    </footer>
    <?php tha_footer_after(); ?>

    <!-- Side Cart: The cart modal integrated as a sidebar. -->
    <div class="cart" id="cart-side">
      <span class="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </span>

      <header>
        <h3>Your Cart: 2 Items</h3>
        <p>Here’s what you’re purchasing today.</p>
      </header>

      <div class="row overview">
        <div class="row product">
          <div class="product-cover" style="background-image: url(https://source.unsplash.com/lEOogB2xh1M);">
          </div>

          <div class="meta">
            <span class="label">Stack of Vinyl</span><br />
            <span class="quantity">50 Count</span>
            <span class="options">Blue Box</span>
          </div>

          <span class="price">$50.00</span>
        </div>

        <div class="row product">
          <div class="product-cover" style="background-image: url(https://source.unsplash.com/uK9QFr3fFk0);">
          </div>

          <div class="meta">
            <span class="label">Bugera Amp</span><br />
            <span class="quantity">x1</span>
            <span class="options">Red Box</span>
          </div>
          <span class="price">$100.00</span>
        </div>
      </div>

      <a class="button visual green checkout" href="checkout.html">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
          </svg>
        </div>
        Continue to checkout
      </a>

      <a class="button visual black" href="cart.html">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
          </svg>
        </div>
        Edit your cart
      </a>
    </div>

    <!-- Sign-in: The sign-in panel and form. -->
    <div class="panel" id="sign-in">
      <span class="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </span>

      <div class="inner forms">
        <header>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 12c0 1.103-.896 2-2 2-1.103 0-2-.897-2-2s.897-2 2-2c1.104 0 2 .897 2 2zm10 0c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-14.795 7.507c-2.17-.813-3.893-2.54-4.699-4.714l-1.02.127c.896 2.628 2.968 4.704 5.592 5.606l.127-1.019zm.26-2.077c-1.271-.596-2.299-1.624-2.895-2.896l-1.041.13c.709 1.721 2.084 3.097 3.807 3.807l.129-1.041zm6.535-5.43c0-2.209-1.791-4-4-4s-4 1.791-4 4 1.791 4 4 4 4-1.791 4-4zm2.473-2.665c-.711-1.722-2.086-3.097-3.807-3.807l-.131 1.041c1.271.596 2.299 1.624 2.896 2.896l1.042-.13zm2.027-.253c-.902-2.61-2.969-4.672-5.582-5.568l-.129 1.019c2.162.808 3.877 2.52 4.691 4.677l1.02-.128z"/></svg>
          <p>Sign in to manage your account and view your orders.</p>
        </header>

        <form action="" method="POST" id="login-form" novalidate="novalidate">
          <div class="row">
            <div class="group">
              <div class="fields precedes bottom whole">
                <label>Email Address &#42;</label>
                <input type="text" name="member-email" placeholder="you@youremail" required>
              </div>

              <div class="fields whole">
                <label>Password &#42;</label>
                <input type="password" name="member-password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" required>
              </div>
            </div>
          </div>

          <div class="row action">
            <a class="button black submit" href="account.html">Sign in to continue ...</a>
          </div>
        </form>
      </div>
    </div>

    <?php tha_body_bottom(); ?>
    <?php wp_footer(); ?>
  </body>
</html>