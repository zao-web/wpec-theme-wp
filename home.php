<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Simply
 */

get_header(); ?>

  <?php simply_sidebar_slideout_controls(); ?>

  <?php tha_content_before(); ?>
  <section class="row article archive">
    <div class="inner">

      <?php tha_content_while_before(); ?>

      <?php if ( have_posts() ) : ?>

        <header>
          <h1 class="page-title"><?php single_post_title(); ?></h1>
        </header>

        <!-- Sidebar: The sliding sidebar with the post archive. -->
        <div class="column side slide">
          <div class="group current-1">

            <?php
            while ( have_posts() ) : the_post();

              get_template_part( 'template-parts/content', 'posts' );

            endwhile; // End of the loop.
            ?>
          </div>

          <?php simply_the_posts_navigation(); ?>

        </div>

        <?php rewind_posts(); ?>

        <?php $my_query = new WP_Query( 'posts_per_page=1' );

        while ( $my_query->have_posts() ) : $my_query->the_post();

          get_template_part( 'template-parts/content', 'blog' );

        endwhile;

      else :

        get_template_part( 'template-parts/content/content', 'none' );

      endif;
      ?>

      <?php tha_content_while_after(); ?>

      </div> <!-- .inner -->
    </section>

  <?php tha_content_after(); ?>

<?php get_footer(); ?>
