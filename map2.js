MAP_SIZE = 3000
function createMap2(scene) {
    if (scene.map2Group) scene.map2Group.clear(true, true);
    scene.map2Group = scene.add.group();

    const W = MAP_SIZE;
    const centerX = W / 2;
    const centerY = W / 2;

    if (scene.physics && scene.physics.world) {
        scene.physics.world.setBounds(0, 0, W, W);
    }

    // =========================
    // NỀN CỎ
    // =========================
    const grass = scene.add.rectangle(centerX, centerY, W, W, 0x4f8738);
    scene.map2Group.add(grass);

    // =========================
    // THÔNG SỐ PAD
    // Tổng 12 pad = 4 cột x 3 hàng
    // Mỗi pad là khối 8 x 6
    // =========================
    const padGridCols = 4;
    const padGridRows = 3;

    const innerCols = 8;
    const innerRows = 6;
    const cellSize = 12;
    const cellGap = 4;

    const padW = innerCols * cellSize + (innerCols - 1) * cellGap;
    const padH = innerRows * cellSize + (innerRows - 1) * cellGap;

    const gapX = 80;
    const gapY = 60;

    const totalW = padGridCols * padW + (padGridCols - 1) * gapX;
    const totalH = padGridRows * padH + (padGridRows - 1) * gapY;

    const startX = centerX - totalW / 2 + padW / 2;
    const startY = centerY - totalH / 2 + padH / 2;

    // =========================
    // CỜ Ở GIỮA
    // =========================
    const poleX = centerX;
    const poleBaseY = centerY + 10;
    const poleH = 240;

    const poleShadow = scene.add.rectangle(poleX + 3, poleBaseY - poleH / 2, 10, poleH, 0x000000, 0.25);
    const poleBody = scene.add.rectangle(poleX, poleBaseY - poleH / 2, 10, poleH, 0xf2f2f2);
    const poleHighlight = scene.add.rectangle(poleX - 2, poleBaseY - poleH / 2, 3, poleH, 0xffffff);
    const poleBase = scene.add.circle(poleX, poleBaseY + 2, 24, 0x777777).setStrokeStyle(3, 0x333333);
    const poleTop = scene.add.circle(poleX, poleBaseY - poleH, 7, 0xffd700).setStrokeStyle(2, 0xb8860b);

    scene.map2Group.add(poleShadow);
    scene.map2Group.add(poleBody);
    scene.map2Group.add(poleHighlight);
    scene.map2Group.add(poleBase);
    scene.map2Group.add(poleTop);

    function attachFlag() {
        const flagImg = scene.add.image(0, 0, 'flag_vn').setDisplaySize(56, 38);

        // Cờ ban đầu ở giữa cột, bấm sẽ kéo lên gần đỉnh
        const flagGroup = scene.add.container(poleX + 28, poleBaseY - 120, [flagImg]);
        scene.map2Group.add(flagGroup);

        let isFlagUp = false;

        poleBase.setInteractive({ cursor: 'pointer' });
        poleBase.on('pointerdown', () => {
            isFlagUp = !isFlagUp;

            scene.tweens.add({
                targets: flagGroup,
                y: isFlagUp ? (poleBaseY - poleH + 18) : (poleBaseY - 120),
                duration: 1000,
                ease: 'Power2'
            });

            if (typeof showRobloxBubbleChat === 'function') {
                showRobloxBubbleChat(isFlagUp ? 'Đã kéo cờ!' : 'Đã hạ cờ!');
            }
        });
    }

    if (!scene.textures.exists('flag_vn')) {
        scene.load.image('flag_vn', 'https://flagcdn.com/w256/vn.png');
        scene.load.once('complete', () => {
            if (scene && scene.sys && scene.sys.isActive() && scene.map2Group) {
                attachFlag();
            }
        });
        scene.load.start();
    } else {
        attachFlag();
    }

    // =========================
    // VẼ 12 PAD
    // Không viền xấu, chỉ để pad sáng nhẹ
    // =========================
    for (let r = 0; r < padGridRows; r++) {
        for (let c = 0; c < padGridCols; c++) {
            const x = startX + c * (padW + gapX);
            const y = startY + r * (padH + gapY);

            const isCommander = (r === 0 && c === padGridCols - 1);

            // bóng nhẹ
            const shadow = scene.add.rectangle(x + 3, y + 3, padW, padH, 0x000000, 0.15);
            scene.map2Group.add(shadow);

            // nền pad
            const padColor = isCommander ? 0xda251d : 0xf7f7f7;
            const pad = scene.add.rectangle(x, y, padW, padH, padColor, 0.96);
            scene.map2Group.add(pad);

            // chấm ô bên trong
            for (let iy = 0; iy < innerRows; iy++) {
                for (let ix = 0; ix < innerCols; ix++) {
                    const cx = x - padW / 2 + cellSize / 2 + ix * (cellSize + cellGap);
                    const cy = y - padH / 2 + cellSize / 2 + iy * (cellSize + cellGap);

                    const dotColor = isCommander ? 0xffc6c6 : 0xffffff;
                    const dot = scene.add.rectangle(cx, cy, cellSize, cellSize, dotColor, 0.95);
                    scene.map2Group.add(dot);
                }
            }

            if (isCommander) {
                const label = scene.add.text(x, y - padH / 2 - 14, 'CHỈ HUY', {
                    fontSize: '16px',
                    fontFamily: 'Orbitron, sans-serif',
                    color: '#ffd700',
                    fontStyle: 'bold',
                    stroke: '#000000',
                    strokeThickness: 3
                }).setOrigin(0.5);

                scene.map2Group.add(label);
            }
        }
    }

    // =========================
    // SPAWN
    // =========================
    const spawnX = centerX;
    const spawnY = centerY + totalH / 2 + 220;

    scene.map2Spawn = { x: spawnX, y: spawnY };

    const spawnMark = scene.add.circle(spawnX, spawnY, 40, 0xffffff, 0.4);
    scene.map2Group.add(spawnMark);

    // =========================
    // CAMERA
    // =========================
    if (scene.cameras && scene.cameras.main) {
        scene.cameras.main.setBounds(0, 0, W, W);
        scene.cameras.main.centerOn(centerX, centerY);
    }

    console.log('MAP 2: 12 pad, cờ giữa, bỏ tường, giữ đường.');
                }
