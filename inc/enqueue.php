<?php
/**
 * Load Enqueue Files
 * @since 1.0.0
 * @author tCoderBD <touhid@tcoderbd.com>
 * @package IndiaOutToday
 */
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

function tiot_load_scripts() {	
    wp_enqueue_style('Noto-Sans-Bengali', '//fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@100..900&display=swap', array(), wp_rand() );
    wp_enqueue_style('tcbdaml', TIOT_URL . 'main.css', array(), wp_rand() );
    wp_enqueue_script( 'tcbdaml', TIOT_URL . 'dist/bundle.js', [ 'jquery' ], wp_rand(), true ); 
}
add_action('wp_enqueue_scripts','tiot_load_scripts');