<?php
/**
 * Admin Functions
 * @since 1.0.0
 * @author tCoderBD <touhid@tcoderbd.com>
 * @package IndiaOutToday
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * IndiaOutToday class
 *
 * @author tCoderBD <touhid@tcoderbd.com>
 * @since 1.0.0
 */
class TCBD_IndiaOutToday {
	/**
	 * Set up plugin.
	 *
	 * @author tCoderBD <touhid@tcoderbd.com>
	 * @since 1.0.0
	 */
	// public function __construct() {
        
	// }
}

/**
 * The main function responsible for returning the one true MediaLibraryUnsplash Instance.
 *
 * @author tCoderBD <touhid@tcoderbd.com>
 * @since 1.0.0
 */
function tcbd_india_out_today() {
	global $tcbd_india_out_today;
	if ( ! isset( $tcbd_india_out_today ) ) {
		$tcbd_india_out_today = new TCBD_IndiaOutToday();
	}
	return $tcbd_india_out_today;
}

tcbd_india_out_today();