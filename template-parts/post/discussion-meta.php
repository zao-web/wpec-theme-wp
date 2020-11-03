<?php
/**
 * The template for displaying Current Discussion on posts
 *
 * @package WordPress
 * @subpackage Simply
 * @since 1.0.0
 */

/* Get data from current discussion on post. */
$discussion    = simply_get_discussion_data();
$has_responses = $discussion->responses > 0;

if ( $has_responses ) {
	/* translators: %1(X comments)$s */
	$meta_label = sprintf( _n( '%d Comment', '%d Comments', $discussion->responses, 'simply' ), $discussion->responses );
} else {
	$meta_label = __( 'No comments', 'simply' );
}
?>

<div class="discussion-meta">
	<a class="button black" href="#comment"><?php esc_html_e( 'Write a Response', 'simply' ); ?></a>

	<?php simply_social_media(); ?>
</div><!-- .discussion-meta -->