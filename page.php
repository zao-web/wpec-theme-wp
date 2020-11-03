<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Simply
 */

get_header(); ?>

	<?php tha_content_before(); ?>
	<section class="row article page">
		<?php tha_content_top(); ?>
		<div class="inner">
			<div class="post">
				<?php tha_content_while_before(); ?>

				<?php
				while ( have_posts() ) : the_post();

					get_template_part( 'template-parts/content', 'page' );

					// If comments are open or we have at least one comment, load up the comment template.
					if ( comments_open() || get_comments_number() ) :
						comments_template();
					endif;

				endwhile; // End of the loop.
				?>

				<?php tha_content_while_after(); ?>
			</div> <!-- .post -->
		</div> <!-- .inner -->
		<?php tha_content_bottom(); ?>
	</section>
	<?php tha_content_after(); ?>

<?php get_footer(); ?>
