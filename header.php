<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Simply
 */

?>
<!DOCTYPE html>
<?php tha_html_before(); ?>
<html <?php language_attributes(); ?>>
<head>
  <?php tha_head_top(); ?>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no">
  <link rel="profile" href="http://gmpg.org/xfn/11">
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
  <?php tha_head_bottom(); ?>
  <?php wp_head(); ?>
</head>

  <!-- Narrow: Need the "narrow" body class for pages. -->
  <body <?php body_class(); ?>>
    <?php tha_body_top(); ?>
    <?php tha_header_before(); ?>
    <!-- Header: Includes the thin header bar, main menu and search. -->
    <header class="row" id="header">
      <?php tha_header_top(); ?>
      <!-- The header bar. -->
      <div class="row bar">
        <div class="inner">

          <?php if ( has_nav_menu( 'social' ) ) : ?>
            <nav class="social" aria-label="<?php esc_attr_e( 'Social Links Menu', 'simply' ); ?>">
              <?php
              wp_nav_menu(
                array(
                  'theme_location' => 'social',
                  'menu_class'     => 'social-links-menu',
                  'link_before'    => '<span class="screen-reader-text">',
                  'link_after'     => '</span>' . simply_get_icon_svg( 'link' ),
                  'depth'          => 1,
                )
              );
              ?>
            </nav><!-- .social-navigation -->
          <?php endif; ?>

          <nav class="user">
            <a class="open" href="#sign-in">Account</a>
            <a class="addtocart" href="#">
              Cart
              <span>2</span>
            </a>
          </nav>
        </div>
      </div>

      <!-- The main header section. -->
      <div class="row main">
        <div class="inner">
          <div class="site-branding">
            <?php if ( has_custom_logo() ) : ?>
              <div class="site-logo"><?php the_custom_logo(); ?></div>
            <?php endif; ?>

            <?php $blog_info = get_bloginfo( 'name' ); ?>
            <?php if ( ! empty( $blog_info ) ) : ?>
              <?php if ( is_front_page() && is_home() ) : ?>
                <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
              <?php else : ?>
                <p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
              <?php endif; ?>
            <?php endif; ?>

            <svg class="menu-toggle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </div>

          <?php if ( has_nav_menu( 'social' ) ) : ?>
            <nav class="primary-menu" aria-label="<?php esc_attr_e( 'Main Menu', 'simply' ); ?>">
              <?php
              wp_nav_menu(
                array(
                  'theme_location' => 'primary',
                  'menu_class'     => 'main-menu',
                  'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                )
              );
              ?>
            </nav><!-- .primary-menu -->
          <?php endif; ?>

          <?php get_search_form(); ?>

        </div>
      </div>
      <?php tha_header_bottom(); ?>
    </header>
    <?php tha_header_after(); ?>

    <!-- Sub-menus: Toggled via the main menu above. -->
    <div class="sub-menus" style="display: none;">
      <div class="row menus" id="menu">
        <span class="close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </span>

        <div class="inner">
          <nav class="row main-menu">
            <a href="/">Home</a>
            <a href="post-archive.html">Journal</a>
            <a href="page.html">About</a>
          </nav>

          <div class="menu">
            <h3>Turntables</h3>
            <ul>
              <li><a href="#">Inceptos</a></li>
              <li><a href="#">Parturient</a></li>
              <li><a href="#">Dapibus Cursus</a></li>
              <li><a href="#">Inceptos</a></li>
              <li><a href="#">Ridiculus</a></li>
            </ul>
          </div>

          <div class="menu">
            <h3>Vinyl</h3>
            <ul>
              <li><a href="#">Ridiculus</a></li>
              <li><a href="#">Inceptos</a></li>
              <li><a href="#">Dolor</a></li>
              <li><a href="#">Purus</a></li>
            </ul>
          </div>

          <div class="menu">
            <h3>Accessories</h3>
            <ul>
              <li><a href="#">Dapibus Cursus</a></li>
              <li><a href="#">Parturient</a></li>
              <li><a href="#">Inceptos</a></li>
              <li><a href="#">Ridiculus</a></li>
            </ul>
          </div>

          <div class="menu">
            <h3>Gear</h3>
            <ul>
              <li><a href="#">Dolor</a></li>
              <li><a href="#">Inceptos</a></li>
              <li><a href="#">Purus</a></li>
              <li><a href="#">Dapibus Cursus</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>