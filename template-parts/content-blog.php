<?php
/**
 * Template part for displaying the main post in home.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Simply
 */

?>

<?php tha_entry_before(); ?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'column main'); ?>>
      <?php tha_entry_top(); ?>
      <header class="entry-header">
            <div class="meta">
                  <?php simply_theme_entry_header(); ?>
            </div>
            <?php the_title( '<h2 class="entry-title">', '</h2>' ); ?>
      </header><!-- .entry-header -->

      <div class="entry-content">
            <?php tha_entry_content_before(); ?>
            <?php the_content(); ?>
            <?php tha_entry_content_after(); ?>
      </div><!-- .entry-content -->

      <div class="continue">
            <div class="actions">
                  <a class="button black" href="<?php esc_url( the_permalink() ); ?>"><?php esc_html_e( 'Read the full post', 'simply' ); ?></a>
                  <a class="button twitter" href="<?php echo esc_url( get_permalink() . '#comments' ); ?>"><?php esc_html_e( 'Read post comments', 'simply' ); ?></a>
            </div>
      </div>
      <?php tha_entry_bottom(); ?>
</article><!-- #post-## -->
<?php tha_entry_after(); ?>
