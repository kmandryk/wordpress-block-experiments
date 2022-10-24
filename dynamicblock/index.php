<?php
/**
 * Plugin Name:       Dynamicblock
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamicblock
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_dynamicblock_block_init() {
	register_block_type( __DIR__ . '/build' , array(
		'render_callback' => 'author_box_author_plugin_render_author_content'
	) );
}
add_action( 'init', 'create_block_dynamicblock_block_init' );

function author_box_author_plugin_render_author_content() {
	return 'Hello World!';
}