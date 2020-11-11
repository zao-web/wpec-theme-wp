<?php
/**
 * Action hooks and filters.
 *
 * A place to put hooks and filters that aren't necessarily template tags.
 *
 * @package Simply
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function simply_body_classes( $classes ) {
	
	// Give every page this class.
	$classes[] = 'narrow';

	// Give all pages a unique class.
	if ( is_page() ) {
		$classes[] = 'page-' . basename( get_permalink() );
	}

	return $classes;
}
add_filter( 'body_class', 'simply_body_classes' );

/**
 * Adds custom classes to the array of mailchimp form classes.
 *
 * @param array $classes Classes for the form element.
 * @return array
 */
function simply_mailchimp_forms( $classes ) {
	$classes[] = 'dark';
	return $classes;
}
add_filter( 'mc4wp_form_css_classes', 'simply_mailchimp_forms' );

/**
 * Custom Excerpt Length.
 *
 * @param number $length Word length for the excerpt.
 * @return number
 */
function simply_custom_excerpt_length( $length ) {
   return 22;
}
add_filter( 'excerpt_length', 'simply_custom_excerpt_length', 999 );

add_action( 'pre_get_posts', function( $q ) {
	if ( ! $q->is_main_query() ) {
		return;
	}

	// Set blog and archive sidebars to next most recent
	// Override settings posts per page
	if ( $q->is_home() || $q->is_archive() ) {
		$q->set( 'offset', 1 );
		$q->set( 'posts_per_page', 90 );
	}
});

/**
 * Returns the size for avatars used in the theme.
 */
function simply_get_avatar_size() {
	return 60;
}

/**
 * Returns true if comment is by author of the post.
 *
 * @see get_comment_class()
 */
function simply_is_comment_by_post_author( $comment = null ) {
	if ( is_object( $comment ) && $comment->user_id > 0 ) {
		$user = get_userdata( $comment->user_id );
		$post = get_post( $comment->comment_post_ID );
		if ( ! empty( $user ) && ! empty( $post ) ) {
			return $comment->user_id === $post->post_author;
		}
	}
	return false;
}

/**
 * Update classes in comments reply link
 */
function simply_comment_reply_link($content) {
    $extra_classes = 'button black';
    return preg_replace( '/comment-reply-link/', 'comment-reply-link ' . $extra_classes, $content);
}

add_filter('comment_reply_link', 'simply_comment_reply_link', 99);

/**
 * Creates a hook for Shared Counts social media to use
 */
function simply_social_media() {
	do_action( 'simply_social_media' );
}

/**
 * Move Shared Counts
 * @see http://sharedcountsplugin.com/2019/03/27/change-the-theme-location-for-share-buttons/
 *
 * @param array $locations
 * @return array
 */
function simply_shared_counts_location( $locations ) {
	$locations['after']['hook'] = 'simply_social_media';
	$locations['after']['filter'] = false;
	return $locations;
}
add_filter( 'shared_counts_theme_locations', 'simply_shared_counts_location' );

/**
 * Add a Sub Nav Toggle to the Primary Menu.
 *
 * @param stdClass $args An array of arguments.
 * @param string   $item Menu item.
 * @param int      $depth Depth of the current menu item.
 *
 * @return stdClass $args An object of wp_nav_menu() arguments.
 */
function simply_add_sub_toggles_to_main_menu( $args, $item, $depth ) {

	// Add sub menu toggles to the Expanded Menu with toggles.
	if ( isset( $args->show_toggles ) && $args->show_toggles ) {

		// Wrap the menu item link contents in a div, used for positioning.
		$args->before = '<div class="ancestor-wrapper">';
		$args->after  = '';

		// Add a toggle to items with children.
		if ( in_array( 'menu-item-has-children', $item->classes, true ) ) {

			$toggle_target_string = '.menu-modal .menu-item-' . $item->ID . ' > .sub-menu';
			$toggle_duration      = simply_toggle_duration();

			// Add the sub menu toggle.
			$args->after .= '<button class="toggle sub-menu-toggle fill-children-current-color" data-toggle-target="' . $toggle_target_string . '" data-toggle-type="slidetoggle" data-toggle-duration="' . absint( $toggle_duration ) . '" aria-expanded="false"><span class="screen-reader-text">' . __( 'Show sub menu', 'simply' ) . '</span>' . simply_get_icon_svg( 'chevron-down' ) . '</button>';

		}

		// Close the wrapper.
		$args->after .= '</div><!-- .ancestor-wrapper -->';

		// Add sub menu icons to the primary menu without toggles.
	} elseif ( 'primary' === $args->theme_location ) {
		if ( in_array( 'menu-item-has-children', $item->classes, true ) ) {
			$args->after = '<span class="icon"></span>';
		} else {
			$args->after = '';
		}
	}

	return $args;

}

add_filter( 'nav_menu_item_args', 'simply_add_sub_toggles_to_main_menu', 10, 3 );