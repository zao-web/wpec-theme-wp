<?php
/**
 * Displays the menu icon and modal
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

?>

<div class="menu-modal cover-modal header-footer-group" data-modal-target-string=".menu-modal">

	<div class="menu-modal-inner modal-inner">

		<div class="menu-wrapper section-inner">

			<nav class="mobile-menu" aria-label="<?php esc_attr_e( 'Mobile', 'simply' ); ?>" role="navigation">

				<ul class="modal-menu reset-list-style">

				<?php

					wp_nav_menu(
						array(
							'container'      => '',
							'items_wrap'     => '%3$s',
							'show_toggles'   => true,
							'theme_location' => 'primary',
						)
					);

				?>

				</ul>

			</nav>

		</div><!-- .menu-wrapper -->

	</div><!-- .menu-modal-inner -->

</div><!-- .menu-modal -->