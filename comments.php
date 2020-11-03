<?php
/**
 * The template for displaying comments
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Simply
 * @since 1.0.0
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
*/
if ( post_password_required() ) {
	return;
}

$discussion = simply_get_discussion_data();
?>

<?php tha_comments_before(); ?>
<section id="comments" class="row <?php echo comments_open() ? 'comments-area' : 'comments-area comments-closed'; ?>">
	<div class="inner">
		<div class="row intro <?php echo $discussion->responses > 0 ? 'comments-title-wrap' : 'comments-title-wrap no-responses'; ?>">
			<h2 class="comments-title h3">
			<?php
			if ( comments_open() ) {
				if ( have_comments() ) {
					printf(
						/* translators: 1: number of comments, 2: post title */
						_nx(
							'Questions or comments? We have %1$s response so far.',
							'Questions or comments? We have %1$s responses so far.',
							$discussion->responses,
							'simply'
						),
						number_format_i18n( $discussion->responses )
					);
				} else {
					_e( 'Questions or comments? Start the conversation now.', 'simply' );
				}
			}
			?>
			</h2><!-- .comments-title -->
			<?php get_template_part( 'template-parts/post/discussion', 'meta' ); ?>
		</div><!-- .comments-title-flex -->
		<?php
		if ( have_comments() ) :

			// Show comment form at top if showing newest comments at the top.
			if ( comments_open() ) {
				simply_comment_form( 'desc' );
			}

			?>
			<ol class="comment-list">
				<?php
				wp_list_comments(
					array(
						'walker'      => new Simply_Walker_Comment(),
						'avatar_size' => simply_get_avatar_size(),
						'short_ping'  => true,
						'style'       => 'ul',
					)
				);
				?>
			</ol><!-- .comment-list -->
			<?php

			// Show comment navigation
			if ( have_comments() ) :
				$prev_icon     = simply_get_icon_svg( 'chevron_left', 22 );
				$next_icon     = simply_get_icon_svg( 'chevron_right', 22 );
				$comments_text = __( 'Comments', 'simply' );
				the_comments_navigation(
					array(
						'prev_text' => sprintf( '%s <span class="nav-prev-text"><span class="primary-text">%s</span> <span class="secondary-text">%s</span></span>', $prev_icon, __( 'Previous', 'simply' ), __( 'Comments', 'simply' ) ),
						'next_text' => sprintf( '<span class="nav-next-text"><span class="primary-text">%s</span> <span class="secondary-text">%s</span></span> %s', __( 'Next', 'simply' ), __( 'Comments', 'simply' ), $next_icon ),
					)
				);
			endif;

			// Show comment form at bottom if showing newest comments at the bottom.
			if ( comments_open() && 'asc' === strtolower( get_option( 'comment_order', 'asc' ) ) ) :
				?>
				<div class="comment-form-flex">
					<h2 class="comments-title" aria-hidden="true"><?php _e( 'Leave a comment', 'simply' ); ?></h2>
					<?php simply_comment_form( 'asc' ); ?>
				</div>
				<?php
			endif;

			// If comments are closed and there are comments, let's leave a little note, shall we?
			if ( ! comments_open() ) :
				?>
				<p class="no-comments">
					<?php _e( 'Comments are closed.', 'simply' ); ?>
				</p>
				<?php
			endif;

		else :

			// Show comment form.
			simply_comment_form( true );

		endif; // if have_comments();
		?>
	</div><!-- .inner -->
</section><!-- #comments -->
<?php tha_comments_after(); ?>