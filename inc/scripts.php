<?php
/**
 * Custom scripts and styles.
 *
 * @package Simply
 */

/**
 * Register Google font.
 *
 * @link http://themeshaper.com/2014/08/13/how-to-add-google-fonts-to-wordpress-themes/
 */
function simply_font_url() {

	$fonts_url = '';

	/**
	 * Translators: If there are characters in your language that are not
	 * supported by the following, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$roboto = esc_html_x( 'on', 'Roboto font: on or off', 'simply' );
	$open_sans = esc_html_x( 'on', 'Open Sans font: on or off', 'simply' );
	$lora = esc_html_x( 'on', 'Lora font: on or off', 'simply' );

	if ( 'off' !== $roboto || 'off' !== $open_sans || 'off' !== $lora ) {
		$font_families = array();

		if ( 'off' !== $roboto ) {
			$font_families[] = 'Roboto:300,400,700';
		}

		if ( 'off' !== $open_sans ) {
			$font_families[] = 'Open Sans:400,300,700';
		}

		if ( 'off' !== $open_sans ) {
			$font_families[] = 'Lora:400,700';
		}

		$query_args = array(
			'family' => urlencode( implode( '|', $font_families ) ),
		);

		$fonts_url = add_query_arg( $query_args, '//fonts.googleapis.com/css' );
	}

	return $fonts_url;
}

/**
 * Enqueue scripts and styles.
 */
function simply_scripts() {
	/**
	 * If WP is in script debug, or we pass ?script_debug in a URL - set debug to true.
	 */
	$debug = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG == true ) || ( isset( $_GET['script_debug'] ) ) ? true : false;

	/**
	 * If we are debugging the site, use a unique version every page load so as to ensure no cache issues.
	 */
	$version = '1.0.1';

	/**
	 * Should we load minified files?
	 */
	$suffix = ( true === $debug ) ? '' : '.min';

	// Register styles.
	wp_register_style( 'simply-google-font', simply_font_url(), array(), null );

	// Enqueue styles.
	wp_enqueue_style( 'simply-google-font' );
	wp_enqueue_style( 'simply-style', get_stylesheet_directory_uri() . '/style.css', array(), $version );

	// Enqueue scripts.
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	wp_enqueue_script( 'simply-scripts', get_stylesheet_directory_uri() . '/assets/js/global.js', array( 'jquery' ), $version, true );

}
add_action( 'wp_enqueue_scripts', 'simply_scripts' );

/**
 * Add SVG definitions to footer.
 */
// function simply_include_svg_icons() {

// 	// Define SVG sprite file.
// 	$svg_icons = get_template_directory() . '/assets/images/svg-icons.svg';

// 	// If it exists, include it.
// 	if ( file_exists( $svg_icons ) ) {
// 		require_once( $svg_icons );
// 	}
// }
// add_action( 'wp_footer', 'simply_include_svg_icons', 9999 );
