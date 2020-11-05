<?php
/**
 * Template part for displaying post content in single.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Simply
 */

?>

<?php tha_sidebars_before(); ?>
<div class="side column slide">
	<?php tha_sidebar_top(); ?>

	<?php if ( is_active_sidebar( 'sidebar-post' ) ) { ?>
		<?php dynamic_sidebar( 'sidebar-post'); ?>
	<?php } ?>

	<?php tha_sidebar_bottom(); ?>
</div>
<?php tha_sidebars_after(); ?>

<?php tha_entry_before(); ?>
<div class="post">
	<?php tha_entry_top(); ?>
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<header class="entry-header">
			<div class="meta">
				<?php simply_theme_entry_header(); ?>
			</div>
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		</header><!-- .entry-header -->

		<div class="entry-content">
			<?php tha_entry_content_before(); ?>
			<?php the_content(); ?>
			<?php tha_entry_content_after(); ?>

			<?php wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'simply' ),
				'after'  => '</div>',
			) );
		?>
		</div><!-- .entry-content -->

	</article><!-- #post-## -->
	<?php tha_entry_bottom(); ?>
</div><!-- .post -->
<?php tha_entry_after(); ?>