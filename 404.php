<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package WordPress
 * @subpackage Simply
 * @since 1.0
 * @version 1.0
 */

$has_image = get_theme_mod( 'error_image' );
$image = wp_get_attachment_image_src($has_image, 'full');
$style = $has_image ? $image[0] : get_stylesheet_directory_uri() . '/assets/images/error-default.jpg';
$error_text = get_theme_mod( 'error_text_color' );

get_header(); ?>

<section class="row cover">
	<div class="background" style="background-image: url('<?php echo $style; ?>')"></div>
	<div class="copy <?php echo $error_text; ?>">
		<h2><?php esc_html_e( 'Whoops! That\'s not here.', 'simply' ); ?></h2>
		<p><?php esc_html_e( 'Sorry, but what you’re looking for isn\'t here. Try something else in the menu above or head back to the home page.', 'simply' ); ?></p>
		<a class="button white" href="<?php home_url(); ?>"><?php esc_html_e( 'Head back home', 'simply' ); ?></a>
	</div>
</section>

<?php get_footer();
