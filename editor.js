(function() {
    const { registerFormatType, applyFormat, removeFormat } = wp.richText;
    const { RichTextToolbarButton } = wp.blockEditor;
    const { Dropdown, MenuGroup, MenuItem } = wp.components;

    // マーカーの色定義
    const markerColors = [
        { name: 'yellow', label: '黄色', color: '#ffff00' },
        { name: 'pink', label: 'ピンク', color: '#ffb3d9' },
        { name: 'blue', label: '水色', color: '#b3e5fc' },
        { name: 'green', label: '緑', color: '#c8e6c9' },
        { name: 'orange', label: 'オレンジ', color: '#ffd699' },
    ];

    // 各色のマーカーをフォーマットとして登録
    markerColors.forEach(marker => {
        registerFormatType(`text-marker/marker-${marker.name}`, {
            title: `マーカー ${marker.label}`,
            tagName: 'mark',
            className: `marker-${marker.name}`,
            edit() {
                return null;
            },
        });
    });

    // ドロップダウンメニュー付きマーカーボタン
    registerFormatType('text-marker/dropdown', {
        title: 'マーカー',
        tagName: 'mark',
        className: null,
        edit({ value, onChange, isActive, contentRef }) {
            
            const applyMarker = (markerName) => {
                // 既存のマーカーを全て削除
                let newValue = value;
                markerColors.forEach(m => {
                    newValue = removeFormat(
                        newValue,
                        `text-marker/marker-${m.name}`,
                        value.start,
                        value.end
                    );
                });
                
                // 新しいマーカーを適用
                newValue = applyFormat(
                    newValue,
                    {
                        type: `text-marker/marker-${markerName}`,
                    },
                    value.start,
                    value.end
                );
                
                onChange(newValue);
            };
            
            const removeAllMarkers = () => {
                let newValue = value;
                markerColors.forEach(m => {
                    newValue = removeFormat(
                        newValue,
                        `text-marker/marker-${m.name}`,
                        value.start,
                        value.end
                    );
                });
                onChange(newValue);
            };

            return wp.element.createElement(
                Dropdown,
                {
                    className: 'text-marker-dropdown',
                    popoverProps: { 
                        placement: 'bottom-start',
                    },
                    renderToggle: ({ isOpen, onToggle }) => {
                        return wp.element.createElement(
                            RichTextToolbarButton,
                            {
                                icon: wp.element.createElement(
                                    'svg',
                                    { 
                                        width: '20', 
                                        height: '20', 
                                        viewBox: '0 0 20 20',
                                        xmlns: 'http://www.w3.org/2000/svg'
                                    },
                                    wp.element.createElement('rect', {
                                        x: '2',
                                        y: '13',
                                        width: '16',
                                        height: '4',
                                        fill: '#ffeb3b'
                                    }),
                                    wp.element.createElement('path', {
                                        d: 'M3 3h14v8H3z',
                                        fill: 'currentColor',
                                        opacity: '0.3'
                                    })
                                ),
                                title: 'マーカー',
                                onClick: onToggle,
                                isActive: isOpen,
                            }
                        );
                    },
                    renderContent: ({ onClose }) => {
                        const menuItems = markerColors.map(marker => {
                            return wp.element.createElement(
                                MenuItem,
                                {
                                    key: marker.name,
                                    onClick: () => {
                                        applyMarker(marker.name);
                                        onClose();
                                    },
                                },
                                wp.element.createElement(
                                    'div',
                                    {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }
                                    },
                                    [
                                        wp.element.createElement('span', {
                                            key: 'preview',
                                            className: 'marker-color-preview',
                                            style: {
                                                width: '24px',
                                                height: '24px',
                                                backgroundColor: marker.color,
                                                border: '1px solid #ddd',
                                                borderRadius: '3px',
                                                display: 'inline-block'
                                            }
                                        }),
                                        wp.element.createElement('span', {
                                            key: 'label',
                                        }, marker.label)
                                    ]
                                )
                            );
                        });

                        // 削除ボタンを追加
                        menuItems.push(
                            wp.element.createElement(
                                'div',
                                {
                                    key: 'divider',
                                    style: {
                                        borderTop: '1px solid #ddd',
                                        margin: '8px 0'
                                    }
                                }
                            ),
                            wp.element.createElement(
                                MenuItem,
                                {
                                    key: 'remove',
                                    onClick: () => {
                                        removeAllMarkers();
                                        onClose();
                                    },
                                },
                                'マーカーを削除'
                            )
                        );

                        return wp.element.createElement(
                            MenuGroup,
                            {},
                            menuItems
                        );
                    },
                }
            );
        },
    });

    console.log('Text Marker plugin loaded with dropdown');

})();