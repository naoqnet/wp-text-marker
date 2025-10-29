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
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'), 100);
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
    }
    
    public function enqueue_editor_assets() {
        // バージョンはファイルの更新時刻を使用してキャッシュバスティング
        $editor_js_path  = plugin_dir_path(__FILE__) . 'editor.js';
        $editor_css_path = plugin_dir_path(__FILE__) . 'editor.css';
        $editor_js_ver   = file_exists($editor_js_path) ? filemtime($editor_js_path) : '1.0.0';
        $editor_css_ver  = file_exists($editor_css_path) ? filemtime($editor_css_path) : '1.0.0';

        // エディタ用JavaScript
        wp_enqueue_script(
            'text-marker-editor',
            plugin_dir_url(__FILE__) . 'editor.js',
            array('wp-rich-text', 'wp-element', 'wp-compose'),
            $editor_js_ver,
            true
        );
        
        // エディタ用CSS
        wp_enqueue_style(
            'text-marker-editor',
            plugin_dir_url(__FILE__) . 'editor.css',
            array('wp-components', 'wp-edit-blocks'),
            $editor_css_ver
        );
    }
    
    public function enqueue_frontend_assets() {
        // フロントエンド用CSS（同様に更新時刻でバージョン付与）
        $frontend_css_path = plugin_dir_path(__FILE__) . 'style.css';
        $frontend_css_ver  = file_exists($frontend_css_path) ? filemtime($frontend_css_path) : '1.0.0';
        wp_enqueue_style(
            'text-marker-frontend',
            plugin_dir_url(__FILE__) . 'style.css',
            array(),
            $frontend_css_ver
        );
    }
}

new Text_Marker_Plugin();