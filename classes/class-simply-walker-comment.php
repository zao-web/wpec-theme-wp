<?php
/**
 * Custom comment walker for this theme
 *
 * @package WordPress
 * @subpackage Simply
 * @since 1.0.0
 */

/**
 * This class outputs custom comment walker for HTML5 friendly WordPress comment and threaded replies.
 *
 * @since 1.0.0
 */
class Simply_Walker_Comment extends Walker_Comment {

	/**
	 * Outputs a comment in the HTML5 format.
	 *
	 * @see wp_list_comments()
	 *
	 * @param WP_Comment $comment Comment to display.
	 * @param int        $depth   Depth of the current comment.
	 * @param array      $args    An array of arguments.
	 */
	protected function html5_comment( $comment, $depth, $args ) {

		$tag = ( 'div' === $args['style'] ) ? 'div' : 'li';

		?>
		<<?php echo $tag; ?> id="comment-<?php comment_ID(); ?>" <?php comment_class( $this->has_children ? 'parent' : '', $comment ); ?>>
			<article id="div-comment-<?php comment_ID(); ?>" class="comment-body">
				<div class="person">
					<div class="meta profile">
						<?php
						$comment_author_link = get_comment_author_link( $comment );
						$comment_author_url  = get_comment_author_url( $comment );
						$comment_author      = get_comment_author( $comment );
						$avatar              = get_avatar( $comment, $args['avatar_size'] ); ?>

						<span class="author-initial"><?php echo $comment_author[0]; ?></span>

						<?php
						if ( 0 != $args['avatar_size'] ) {
							if ( empty( $comment_author_url ) ) {
								echo $avatar;
							} else {
								printf( '<a href="%s" rel="external nofollow" class="url" target="_blank">', $comment_author_url );
								echo $avatar;
							}
						}

						if ( ! empty( $comment_author_url ) ) {
							echo '</a>';
						} ?>
					</div><!-- .profile -->
					<div class="meta badge">
						<?php
						/*
						 * Using the `check` icon instead of `check_circle`, since we can't add a
						 * fill color to the inner check shape when in circle form.
						 */
						if ( simply_is_comment_by_post_author( $comment ) ) {
							printf( '<span class="post-author-badge" aria-hidden="true">%s</span>', __( 'Author', 'simply' ) );
						}
						?>
					</div>
					<div class="meta name"><?php echo $comment_author; ?></div>
					<div class="meta date mobile">
						<?php
							/* translators: 1: comment date, 2: comment time */
							$comment_timestamp = __( get_comment_date( '', $comment ) );
						?>
						<time datetime="<?php comment_time( 'c' ); ?>" title="<?php echo $comment_timestamp; ?>">
							<?php echo $comment_timestamp; ?>
						</time>
					</div><!-- .date -->
				</div><!-- .person -->

				<div class="text">
					<div class="comment-meta">
						<?php if ( '0' == $comment->comment_approved ) : ?>
						<p class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.', 'simply' ); ?></p>
						<?php endif; ?>
					</div><!-- .comment-meta -->
					<div class="comment-metadata">
						<div class="meta date desktop">
							<time datetime="<?php comment_time( 'c' ); ?>" title="<?php echo $comment_timestamp; ?>">
								<?php echo $comment_timestamp; ?>
							</time>
						</div><!-- .date -->
						<?php
							$edit_comment_icon = simply_get_icon_svg( 'edit', 16 );
							edit_comment_link( __( 'Edit', 'simply' ), '<span class="edit-link">' . $edit_comment_icon, '</span>' );
						?>
					</div><!-- .comment-metadata -->
					<?php comment_text(); ?>

					<?php
					comment_reply_link(
						array_merge(
							$args,
							array(
								'add_below' => 'div-comment',
								'depth'     => $depth,
								'max_depth' => $args['max_depth'],
								'before'    => '<div class="actions">',
								'after'     => '</div>',
							)
						)
					);
					?>
				</div><!-- .comment-content -->

			</article><!-- .comment-body -->	
		<?php
	}
}