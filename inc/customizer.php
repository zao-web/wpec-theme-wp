<?php
/**
 * Simply: Theme Customizer
 *
 * @package WordPress
 * @subpackage Simply
 * @since 1.0
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function simply_customize_register( $wp_customize ) {
	/**
	 * Custom colors.
	 */
	$wp_customize->add_setting( 'colorscheme', array(
		'default'           => 'theme-1',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'simply_sanitize_colorscheme',
	) );

	$wp_customize->add_control( 'colorscheme', array(
		'type'    => 'radio',
		'label'    => __( 'Color Schemes', 'simply' ),
		'choices'  => array(
			'theme-1'  => __( 'Theme 1', 'simply' ),
			'theme-2'  => __( 'Theme 2', 'simply' ),
			'theme-3'  => __( 'Theme 3', 'simply' ),
			'theme-4'  => __( 'Theme 4', 'simply' ),
			'theme-5'  => __( 'Theme 5', 'simply' ),
		),
		'section'  => 'panel_1',
		'priority' => 5,
	) );

	/**
		 * Add 'Error Page Background Image' Setting.
		 */
	$wp_customize->add_setting( 'error_image', array(
		'default'           => get_stylesheet_directory_uri() . '/assets/images/error-default.jpg',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'esc_url_raw',
	) );

	/**
	 * Add 'Home Top Background Image' image upload Control.
	 */
	$wp_customize->add_control(
		new WP_Customize_Image_Control(
			// $wp_customize object
			$wp_customize,
			// $id
			'error_image', array(
				'settings'		=> 'error_image',
				'section'		=> 'panel_2',
				'label'			=> __( 'Error Page Background Image', 'theme-slug' ),
				'description'	=> __( 'Select a large image for the background of the 404 or Error Page. (Recommended minimum of 1200x800.', 'theme-slug' )
			)
		)
	);

	/**
	 * Error Page font colors.
	 */
	$wp_customize->add_setting( 'error_text_color', array(
		'default'           => 'light',
		'transport'         => 'postMessage',
		'sanitize_callback' => 'simply_sanitize_error_text_color',
	) );

	$wp_customize->add_control( 'error_text_color', array(
		'type'    => 'radio',
		'label'    => __( 'Font Color', 'simply' ),
		'choices'  => array(
			'light'  => __( 'Light Text', 'simply' ),
			'dark'   => __( 'Dark Text', 'simply' ),
			'accent' => __( 'Accent Text', 'simply' ),
		),
		'section'  => 'panel_2',
		'priority' => 10,
	) );

	/**
	 * Add the Theme Options section.
	 */
	$wp_customize->add_panel( 'options_panel', array(
		'title'       => __( 'Theme Options', 'simply' ),
		'description' => __( 'Configure your theme settings', 'simply' ),
	) );

	// Panel 1.
	$wp_customize->add_section( 'panel_1', array(
		'title'           => __( 'Theme Appearances', 'simply' ),
		'panel'           => 'options_panel',
		'description'     => __( 'Change the look and feel of your theme', 'simply' ),
	) );

	$wp_customize->add_setting( 'panel_1', array(
		'default'           => false,
		'sanitize_callback' => 'absint',
	) );

	// Panel 2.
	$wp_customize->add_section( 'panel_2', array(
		'title'           => __( 'Error Page', 'simply' ),
		'panel'           => 'options_panel',
	) );

	// Panel 3.
	$wp_customize->add_section( 'panel_3', array(
		'title'           => __( 'Panel 3', 'simply' ),
		'panel'           => 'options_panel',
		'description'     => __( 'Add an image to your panel by setting a featured image in the page editor. If you don&rsquo;t select a page, this panel will not be displayed.', 'simply' ),
	) );

	$wp_customize->add_setting( 'panel_3', array(
		'default'           => false,
		'sanitize_callback' => 'absint',
	) );

	$wp_customize->add_control( 'panel_3', array(
		'label'   => __( 'Panel Content', 'simply' ),
		'section' => 'panel_3',
		'type'    => 'dropdown-pages',
	) );

	// Panel 4.
	$wp_customize->add_section( 'panel_4', array(
		'title'           => __( 'Panel 4', 'simply' ),
		'active_callback' => 'is_front_page',
		'panel'           => 'options_panel',
		'description'     => __( 'Add an image to your panel by setting a featured image in the page editor. If you don&rsquo;t select a page, this panel will not be displayed.', 'simply' ),
	) );

	$wp_customize->add_setting( 'panel_4', array(
		'default'           => false,
		'sanitize_callback' => 'absint',
	) );

	$wp_customize->add_control( 'panel_4', array(
		'label'   => __( 'Panel Content', 'simply' ),
		'section' => 'panel_4',
		'type'    => 'dropdown-pages',
	) );
}
add_action( 'customize_register', 'simply_customize_register' );

/**
 * Sanitize the colorscheme.
 */
function simply_sanitize_colorscheme( $input ) {
	$valid = array( 'theme-1', 'theme-2', 'theme-3', 'theme-4', 'theme-5' );

	if ( in_array( $input, $valid ) ) {
		return $input;
	}

	return 'theme-1';
}

/**
 * Sanitize the error_text_color.
 */
function simply_sanitize_error_text_color( $input ) {
	$valid = array( 'light', 'dark', 'accent' );

	if ( in_array( $input, $valid ) ) {
		return $input;
	}

	return 'light';
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function simply_customize_preview_js() {
	wp_enqueue_script( 'simply-customizer', get_theme_file_uri( '/assets/js/customizer.js' ), array( 'customize-preview' ), '1.0', true );
}
add_action( 'customize_preview_init', 'simply_customize_preview_js' );

/**
 * Some extra JavaScript to improve the user experience in the Customizer for this theme.
 */
function simply_panels_js() {
	wp_enqueue_script( 'simply-panel-customizer', get_theme_file_uri( '/assets/js/panel-customizer.js' ), array(), '1.0', true );
}
add_action( 'customize_controls_enqueue_scripts', 'simply_panels_js' );