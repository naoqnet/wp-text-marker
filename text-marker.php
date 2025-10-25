<?php
/**
 * Plugin Name: Text Marker
 * Description: ブロックエディタでテキストを選択してマーカー（ハイライト）を適用できるプラグイン
 * Version: 1.0.0
 * Author: NAOQ
 * Text Domain: text-marker
 */

if (!defined('ABSPATH')) {
    exit;
}

class Text_Marker_Plugin {
    
    public function __construct() {
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
    }
    
    public function enqueue_editor_assets() {
        // エディタ用JavaScript
        wp_enqueue_script(
            'text-marker-editor',
            plugin_dir_url(__FILE__) . 'editor.js',
            array('wp-rich-text', 'wp-element', 'wp-compose'),
            '1.0.0',
            true
        );
        
        // エディタ用CSS
        wp_enqueue_style(
            'text-marker-editor',
            plugin_dir_url(__FILE__) . 'editor.css',
            array(),
            '1.0.0'
        );
    }
    
    public function enqueue_frontend_assets() {
        // フロントエンド用CSS
        wp_enqueue_style(
            'text-marker-frontend',
            plugin_dir_url(__FILE__) . 'style.css',
            array(),
            '1.0.0'
        );
    }
}

new Text_Marker_Plugin();