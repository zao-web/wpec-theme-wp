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

            <button class="toggle nav-toggle menu-toggle mobile-nav-toggle" data-toggle-target=".menu-modal"  data-toggle-body-class="showing-menu-modal" aria-expanded="false" data-set-focus=".close-nav-toggle">
              <span class="screen-reader-text"><?php esc_html_e( 'menu', 'zao-theme' ); ?></span>
              <span aria-hidden="true" class="menu-bars"></span>
            </button><!-- .nav-toggle -->

          </div>

          <?php
          if ( has_nav_menu( 'primary' ) ) {
            ?>

            <nav class="primary-menu-wrapper" aria-label="<?php esc_attr_e( 'Main Menu', 'simply' ); ?>" role="navigation">

                <ul class="primary-menu main-menu reset-list-style">

                <?php

                  wp_nav_menu(
                    array(
                      'container'  => '',
                      'items_wrap' => '%3$s',
                      'show_toggles'   => true,
                      'theme_location' => 'primary',
                    )
                  );

                ?>

                </ul>

              </nav><!-- .primary-menu-wrapper -->

            <?php
          } 

          get_search_form();

          ?>

        </div>
      </div>
      <?php tha_header_bottom(); ?>
    </header>
    <?php tha_header_after(); ?>

    <?php
    // Output the menu modal.
    get_template_part( 'template-parts/modal-menu' );
