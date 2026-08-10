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
    // THÔNG SỐ 12 PAD
    // 4 cột x 3 hàng
    // =========================
    const padGridCols = 4;
    const padGridRows = 3;

    const innerCols = 8;
    const innerRows = 6;

    // pad kiểu giống khu huấn luyện
    const cellSize = 20;
    const cellGap = 4;

    const padW = innerCols * cellSize + (innerCols - 1) * cellGap;
    const padH = innerRows * cellSize + (innerRows - 1) * cellGap;

    const gapX = 90;
    const gapY = 70;

    const totalW = padGridCols * padW + (padGridCols - 1) * gapX;
    const totalH = padGridRows * padH + (padGridRows - 1) * gapY;

    const startX = centerX - totalW / 2 + padW / 2;
    const startY = centerY - totalH / 2 + padH / 2;

    // =========================
    // CỜ CHÍNH GIỮA
    // =========================
    const poleX = centerX;
    const poleBaseY = centerY + 20;
    const poleH = 260;

    const poleShadow = scene.add.rectangle(poleX + 3, poleBaseY - poleH / 2, 10, poleH, 0x000000, 0.20);
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
        const flagImg = scene.add.image(0, 0, 'flag_vn').setDisplaySize(60, 40);

        // cờ nằm giữa, bấm cột để kéo lên/hạ xuống
        const flagGroup = scene.add.container(poleX + 30, centerY - 35, [flagImg]);
        scene.map2Group.add(flagGroup);

        let isFlagUp = false;

        poleBase.setInteractive({ cursor: 'pointer' });
        poleBase.on('pointerdown', () => {
            isFlagUp = !isFlagUp;

            scene.tweens.add({
                targets: flagGroup,
                y: isFlagUp ? (poleBaseY - poleH + 22) : (centerY - 35),
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
    // HÀM VẼ 1 PAD GIỐNG KHU HUẤN LUYỆN
    // KHÔNG KHUNG NGOÀI, KHÔNG VIỀN XẤU
    // =========================
    function drawTrainingPad(x, y, isCommander = false) {
        for (let row = 0; row < innerRows; row++) {
            for (let col = 0; col < innerCols; col++) {
                const cx = x - padW / 2 + cellSize / 2 + col * (cellSize + cellGap);
                const cy = y - padH / 2 + cellSize / 2 + row * (cellSize + cellGap);

                const fill = isCommander ? 0xfff0f0 : 0xffffff;
                const stroke = isCommander ? 0xd1a300 : 0xc4eef8;

                const tile = scene.add.rectangle(cx, cy, cellSize, cellSize, fill, 1);
                tile.setStrokeStyle(2, stroke, 1);
                scene.map2Group.add(tile);
            }
        }

        if (isCommander) {
            const commanderLabel = scene.add.text(x, y - padH / 2 - 14, 'CHỈ HUY', {
                fontSize: '16px',
                fontFamily: 'Orbitron, sans-serif',
                color: '#ffd700',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);

            scene.map2Group.add(commanderLabel);
        }
    }

    // =========================
    // VẼ 12 PAD
    // Pad đỏ chỉ huy ở cuối hàng 1
    // =========================
    for (let r = 0; r < padGridRows; r++) {
        for (let c = 0; c < padGridCols; c++) {
            const x = startX + c * (padW + gapX);
            const y = startY + r * (padH + gapY);

            const isCommander = (r === 0 && c === padGridCols - 1);

            // pad thường / pad đỏ chỉ huy
            drawTrainingPad(x, y, isCommander);

            if (isCommander) {
                // nền đỏ nhẹ phía sau riêng cho pad chỉ huy
                const bg = scene.add.rectangle(x, y, padW, padH, 0xda251d, 0.22);
                scene.map2Group.add(bg);
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

    console.log('MAP 2: 12 pad, cờ giữa, bỏ khung ngoài, pad giống khu huấn luyện.');
                                                  }
