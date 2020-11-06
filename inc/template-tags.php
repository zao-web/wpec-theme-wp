<?php
/**
 * Custom template tags.
 *
 * @package Simply
 */

if ( ! function_exists( 'simply_theme_posted_on' ) ) :
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function simply_theme_posted_on() {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		printf(
			'<span class="posted-on">%1$s %2$s</span>',
			esc_html__( 'Posted on'),
			$time_string
		);
	}
endif;

if ( ! function_exists( 'simply_theme_time_stamp' ) ) :
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function simply_theme_time_stamp() {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';

		$time_string = sprintf(
			$time_string,
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_modified_date( DATE_W3C ) ),
			esc_html( get_the_modified_date() )
		);

		echo $time_string;
	}
endif;

if ( ! function_exists( 'simply_theme_posted_by' ) ) :
	/**
	 * Prints HTML with meta information about theme author.
	 */
	function simply_theme_posted_by() {
		printf(
			/* translators: 2: post author, only visible to screen readers. 3: author link. 3: author name.*/
			'<span class="byline"><span class="screen-reader-text">%1$s</span><span class="author vcard"><a class="url fn n" href="%2$s">%3$s</a></span></span>',
			__( 'Posted by', 'simply' ),
			esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
			esc_html( get_the_author() )
		);
	}
endif;

if ( ! function_exists( 'simply_theme_entry_header' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function simply_theme_entry_header() {

		// Hide author, post date, category and tag text for pages.
		if ( 'post' === get_post_type() ) {

			// Posted on
			simply_theme_posted_on();

			/* translators: used between list items, there is a space after the comma. */
			$categories_list = get_the_category_list( __( ', ', 'simply' ) );

			if ( $categories_list ) {
				printf(
					/* translators: 1: posted in label, only visible to screen readers. 2: list of categories. */
					'<span class="cat-links"> %1$s %2$s</span>',
					__( 'in', 'simply' ),
					$categories_list
				); // WPCS: XSS OK.
			}
		}
	}
endif;

if ( ! function_exists( 'simply_the_posts_navigation' ) ) :
	/**
	 * Blog post navigation.
	 */
	function simply_the_posts_navigation() { ?>
		<nav class="row post-navigation">
            <a class="older more" href="#">
				<span class="screen-reader-text"><?php esc_html_e( 'view older posts'); ?></span>
				<?php echo simply_get_icon_svg( 'chevron_left' ); ?>
            </a>

            <a class="newer more" href="#">
				<span class="screen-reader-text"><?php esc_html_e( 'view newer posts'); ?></span>
				<?php echo simply_get_icon_svg( 'chevron_right' ); ?>
            </a>
        </nav>
	<?php }
endif;

if ( ! function_exists( 'simply_sidebar_slideout_controls' ) ) :
	/**
	 * Controls to handle the sliding in and out the sidebar.
	 */
	function simply_sidebar_slideout_controls() { ?>
		<!-- Sidebar Slider: Just for toggling the sidebar on mobile. -->
		  <span class="slider left toggle">
			<span class="screen-reader-text"><?php esc_html_e( 'Access posts navigator'); ?></span>
			<?php echo simply_get_icon_svg( 'chevron_right' ); ?>
		  </span>

		  <!-- Sidebar Slider: Just for toggling the sidebar on mobile. -->
		  <span class="slider right toggled">
			<span class="screen-reader-text"><?php esc_html_e( 'Hide posts navigator'); ?></span>
			<?php echo simply_get_icon_svg( 'chevron_left' ); ?>
		  </span>
	<?php }
endif;

if ( ! function_exists( 'simply_get_discussion_data' ) ) :
	/**
	 * Returns information about the current post's discussion, with cache support.
	 */
	function simply_get_discussion_data() {
		static $discussion, $post_id;

		$current_post_id = get_the_ID();
		if ( $current_post_id === $post_id ) {
			return $discussion; /* If we have discussion information for post ID, return cached object */
		} else {
			$post_id = $current_post_id;
		}

		$comments = get_comments(
			array(
				'post_id' => $current_post_id,
				'orderby' => 'comment_date_gmt',
				'order'   => get_option( 'comment_order', 'asc' ), /* Respect comment order from Settings » Discussion. */
				'status'  => 'approve',
				'number'  => 20, /* Only retrieve the last 20 comments, as the end goal is just 6 unique authors */
			)
		);

		$authors = array();
		foreach ( $comments as $comment ) {
			$authors[] = ( (int) $comment->user_id > 0 ) ? (int) $comment->user_id : $comment->comment_author_email;
		}

		$authors    = array_unique( $authors );
		$discussion = (object) array(
			'authors'   => array_slice( $authors, 0, 6 ),           /* Six unique authors commenting on the post. */
			'responses' => get_comments_number( $current_post_id ), /* Number of responses. */
		);

		return $discussion;
	}
endif;

if ( ! function_exists( 'simply_comment_form' ) ) :
	/**
	 * Documentation for function.
	 */
	function simply_comment_form( $order ) {
		if ( true === $order || strtolower( $order ) === strtolower( get_option( 'comment_order', 'asc' ) ) ) {

			comment_form(
				array(
					'fields' 		=> array(
				        //Author field
				        'author' => '<p class="row comment-form-author"><label for="author">' . __( 'Name' ) . '<span class="required">*</span></label><input type="text" id="author" name="author" aria-required="true" placeholder="' . $comment_author .'"></input></p>',
				        //Email Field
				        'email' => '<p class="row comment-form-email"><label for="email">' . __( 'Email' ) . '<span class="required">*</span></label><input type="email" id="email" name="email" aria-required="true" placeholder="' . $comment_email .'"></input></p>',
				        //URL Field
				        'url' => '<p class="row comment-form-url"><label for="url">' . __( 'Website' ) . '</label><input type="text" id="url" name="url" placeholder="' . $comment_url .'"></input></p>',
				    ),
				    'comment_field' => '<p class="row comment-form-comment"><label for="comment">' . __( 'Comment' ) . '</label><textarea id="comment" name="comment" maxlength="65525" aria-required="true" style="overflow: hidden; overflow-wrap: break-word; resize: horizontal;"></textarea></p>',
					'logged_in_as'  => null,
					'title_reply'   => null,
					'submit_button' => '<input name="%1$s" type="submit" id="%2$s" class="%3$s button black" value="%4$s" />'
				)
			);
		}
	}
endif;

if ( ! function_exists( 'simply_comment_count' ) ) :
	/**
	 * Prints HTML with the comment count for the current post.
	 */
	function simply_comment_count() {
		if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			echo simply_get_icon_svg( 'comment', 16 );

			/* translators: %s: Name of current post. Only visible to screen readers. */
			comments_popup_link( sprintf( __( 'Leave a comment<span class="screen-reader-text"> on %s</span>', 'simply' ), get_the_title() ) );

			echo '</span>';
		}
	}
endif;