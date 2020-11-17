/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function( $ ) {

	// Collect information from panel-customizer.js about which panels are opening
	wp.customize.bind( 'preview-ready', function() {
		wp.customize.preview.bind( 'section-highlight', function( data ) {

			// If there's an expanded panel section, scroll down to that panel & highlight in the preview
			if ( true === data.expanded ) {
				$.scrollTo( $( '.' + data.section ), {
					duration: 600,
					offset: { 'top': -40 }
				} );
				$( '.' + data.section ).addClass( 'simply-highlight' );

			// If we've left the panel, remove the highlight and scroll back to the top
			} else {
				$.scrollTo( $( '#masthead' ), {
					duration: 300,
					offset: { 'top': 0 }
				} );
				$( '.' + data.section ).removeClass( 'simply-highlight' );
			}
		} );
	} );

	// Color scheme.
	wp.customize( 'colorscheme', function( value ) {
		value.bind( function( to ) {

			// Update color body class.
			$( 'body' ).removeClass( 'colors-theme-1 colors-theme-2 colors-theme-3 colors-theme-4 colors-theme-5' )
				.addClass( 'colors-' + to );
		} );
	} );
} )( jQuery );