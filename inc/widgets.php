<?php 
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function simply_widgets_init() {

	// Define sidebars.
	$sidebars = array(
		'sidebar-post'  => esc_html__( 'Posts Sidebar', 'simply' ),
		'sidebar-left'  => esc_html__( 'Sidebar Left', 'simply' ),
		'sidebar-right'  => esc_html__( 'Sidebar Right', 'simply' ),
	);

	// Loop through each sidebar and register.
	foreach ( $sidebars as $sidebar_id => $sidebar_name ) {
		register_sidebar( array(
			'name'          => $sidebar_name,
			'id'            => $sidebar_id,
			'description'   => /* translators: the sidebar name */ sprintf( esc_html__( 'Widget area for %s', 'simply' ), $sidebar_name ),
			'before_widget' => '<aside class="row widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		) );
	}

	$footer_sidebars = array(
		'footer-1'  => esc_html__( 'Footer Top Sidebar', 'simply' ),
		'footer-2'  => esc_html__( 'Footer Bottom Sidebar', 'simply' ),
	);

	// Loop through each sidebar and register.
	foreach ( $footer_sidebars as $sidebar_id => $sidebar_name ) {
		register_sidebar( array(
			'name'          => $sidebar_name,
			'id'            => $sidebar_id,
			'description'   => /* translators: the sidebar name */ sprintf( esc_html__( 'Widget area for %s', 'simply' ), $sidebar_name ),
			'before_widget' => '<aside class="widget %2$s">',
			'after_widget'  => '</aside>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		) );
	}
}
add_action( 'widgets_init', 'simply_widgets_init' );

/**
 * Count the number of widgets in a sidebar and add the number to the class
 */
function simply_footer_sidebar_params($params) {

    $sidebar_id = $params[0]['id'];
    $sidebars = array( 'footer-1', 'footer-2' );

    foreach ( $sidebars as $sidebar ) {
    	if ( $sidebar_id === $sidebar ) {

	        $total_widgets = wp_get_sidebars_widgets();
	        $sidebar_widgets = count($total_widgets[$sidebar_id]);

	        $params[0]['before_widget'] = str_replace('class="', 'class="widget-' . $sidebar_widgets . ' ', $params[0]['before_widget']);
	    }
    }

    return $params;
}
add_filter('dynamic_sidebar_params','simply_footer_sidebar_params');