<?php
/**
 * Template part for displaying the posts sidebar in archive.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Simply
 */

?>

  <div class="row widget">
  	<a class="widget__link" href="<?php esc_url( the_permalink() );?>">
	    <span class="meta"><?php simply_theme_time_stamp(); ?></span>
	    <h3 class="entry-title"><?php the_title(); ?></h3>
	    <?php the_excerpt(); ?>
    </a>
  </div>
