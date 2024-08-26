<?php
/*
    Plugin Name: India Out Today
    Plugin URI: https://github.com/touhidbd/india-out-today
    Description: <em>Shortcode:</em> <strong>[IndiaOutToday]</strong> , India Out Today is a WordPress plugin that helps users boycott products and find alternative options.
    Version: 1.0.0
    Requires at least: 5.8
    Requires PHP: 5.6.20
    Author: Touhidul Sadeek
    Author URI: https://tcoderbd.com/
    License: GPLv2 or later
    Text Domain: india-out-today
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 * Define Path
 * @since 1.0.0
 * @author tCoderBD <touhid@tcoderbd.com>
 * @package IndiaOutToday
 */
define ( 'TIOT_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define ( 'TIOT_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );
define( 'TIOT_BASENAME', plugin_basename( __FILE__ ) );

/**
 * Require Files
 * @since 1.0.0
 * @author tCoderBD <touhid@tcoderbd.com>
 * @package IndiaOutToday
 */
require_once( TIOT_PATH . 'inc/enqueue.php');
require_once( TIOT_PATH . 'inc/admin.php');