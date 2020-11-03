<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Simply
 */

?>

<?php tha_entry_before(); ?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
      <?php tha_entry_top(); ?>
      <header class="entry-header">
            <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
      </header><!-- .entry-header -->

      <div class="entry-content">
            <?php tha_entry_content_before(); ?>
            <?php the_content(); ?>
            <?php tha_entry_content_after(); ?>
      </div><!-- .entry-content -->

      <?php if ( get_edit_post_link() ) : ?>
            <footer class="entry-footer">
                  <?php
                        edit_post_link(
                              sprintf(
                                    /* translators: %s: Name of current post */
                                    esc_html__( 'Edit %s', 'simply' ),
                                    the_title( '<span class="screen-reader-text">"', '"</span>', false )
                              ),
                              '<span class="edit-link">',
                              '</span>'
                        );
                  ?>
            </footer><!-- .entry-footer -->
      <?php endif; ?>
      <?php tha_entry_bottom(); ?>
</article><!-- #post-## -->
<?php tha_entry_after(); ?>
