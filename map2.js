const MAP_SIZE = 3000;

function createMap2(scene) {

    // ==========================================
    // RESET MAP 2
    // ==========================================
    if (scene.map2Group) {
        scene.map2Group.clear(true, true);
    }

    scene.map2Group = scene.add.group();

    const W = MAP_SIZE;
    const centerX = W / 2;
    const centerY = W / 2;

    if (scene.physics && scene.physics.world) {
        scene.physics.world.setBounds(0, 0, W, W);
    }

    // ==========================================
    // NỀN CỎ
    // ==========================================

    const grass = scene.add.rectangle(
        centerX,
        centerY,
        W,
        W,
        0x4f8738
    );

    scene.map2Group.add(grass);

    // ==========================================
    // THÔNG SỐ PAD
    // 12 PAD = 4 CỘT × 3 HÀNG
    // MỖI PAD = 8 NGANG × 6 DỌC
    // ==========================================

    const padGridCols = 4;
    const padGridRows = 3;

    const innerCols = 8;
    const innerRows = 6;

    const cellSize = 65;
    const cellGap = 10;

    const padW =
        innerCols * cellSize +
        (innerCols - 1) * cellGap;

    const padH =
        innerRows * cellSize +
        (innerRows - 1) * cellGap;

    const gapX = 120;
    const gapY = 120;

    const totalW =
        padGridCols * padW +
        (padGridCols - 1) * gapX;

    const totalH =
        padGridRows * padH +
        (padGridRows - 1) * gapY;

    // ==========================================
    // SÂN BÊ TÔNG
    // ==========================================

    const yardW = 1100;
    const yardH = 420;

    const yardX = centerX;
    const yardY = 430;

    const concreteYard = scene.add.rectangle(
        yardX,
        yardY,
        yardW,
        yardH,
        0xeeeeee
    );

    concreteYard.setStrokeStyle(
        4,
        0xbdbdbd
    );

    scene.map2Group.add(concreteYard);

    // ==========================================
    // ĐƯỜNG PHÍA TRÊN
    // ==========================================

    const roadY =
        yardY -
        yardH / 2 -
        90;

    const road = scene.add.rectangle(
        centerX,
        roadY,
        W,
        140,
        0x242424
    );

    scene.map2Group.add(road);

    const roadLine = scene.add.rectangle(
        centerX,
        roadY,
        W,
        6,
        0xffffff
    );

    scene.map2Group.add(roadLine);

    // ==========================================
    // CỘT CỜ
    // ==========================================

    const poleX = centerX;
    const poleBaseY = yardY + 100;
    const poleH = 300;

    const poleShadow = scene.add.rectangle(
        poleX + 4,
        poleBaseY - poleH / 2,
        14,
        poleH,
        0x000000,
        0.20
    );

    const poleBody = scene.add.rectangle(
        poleX,
        poleBaseY - poleH / 2,
        12,
        poleH,
        0xdddddd
    );

    const poleHighlight = scene.add.rectangle(
        poleX - 2,
        poleBaseY - poleH / 2,
        4,
        poleH,
        0xffffff
    );

    const poleBase = scene.add.circle(
        poleX,
        poleBaseY + 5,
        32,
        0x777777
    );

    poleBase.setStrokeStyle(
        4,
        0x333333
    );

    const poleTop = scene.add.circle(
        poleX,
        poleBaseY - poleH,
        9,
        0xffd700
    );

    poleTop.setStrokeStyle(
        3,
        0xb8860b
    );

    scene.map2Group.addMultiple([
        poleShadow,
        poleBody,
        poleHighlight,
        poleBase,
        poleTop
    ]);

    // ==========================================
    // CỜ VIỆT NAM
    // ==========================================

    function attachFlag() {

        if (
            !scene ||
            !scene.sys ||
            !scene.sys.isActive()
        ) {
            return;
        }

        if (!scene.textures.exists('flag_vn')) {
            console.log('Không có texture flag_vn');
            return;
        }

        // Nếu cờ cũ tồn tại thì xóa
        if (scene.map2Flag) {
            scene.map2Flag.destroy(true);
            scene.map2Flag = null;
        }

        const flagImg = scene.add.image(
            0,
            0,
            'flag_vn'
        );

        flagImg.setDisplaySize(
            110,
            73
        );

        flagImg.setOrigin(
            0,
            0.5
        );

        // Cờ nằm sát bên phải cột
        const flagGroup = scene.add.container(
            poleX + 7,
            poleBaseY - poleH + 42
        );

        flagGroup.add(flagImg);

        flagGroup.setDepth(500);

        scene.map2Group.add(flagGroup);

        scene.map2Flag = flagGroup;

        let isFlagUp = true;

        // ======================================
        // BẤM CHÂN CỘT ĐỂ KÉO/HẠ CỜ
        // ======================================

        poleBase.setInteractive({
            useHandCursor: true
        });

        poleBase.removeAllListeners('pointerdown');

        poleBase.on(
            'pointerdown',
            function () {

                isFlagUp = !isFlagUp;

                scene.tweens.add({
                    targets: flagGroup,

                    y: isFlagUp
                        ? poleBaseY - poleH + 42
                        : poleBaseY - 80,

                    duration: 1000,

                    ease: 'Power2'
                });

                if (
                    typeof showRobloxBubbleChat ===
                    'function'
                ) {

                    showRobloxBubbleChat(
                        isFlagUp
                            ? 'Đã kéo cờ!'
                            : 'Đã hạ cờ!'
                    );
                }
            }
        );
    }

    // ==========================================
    // LOAD CỜ
    // ==========================================

    if (scene.textures.exists('flag_vn')) {

        attachFlag();

    } else {

        scene.load.image(
            'flag_vn',
            'https://flagcdn.com/w256/vn.png'
        );

        scene.load.once(
            'complete',
            function () {
                attachFlag();
            }
        );

        scene.load.start();
    }

    // ==========================================
    // SPAWN
    // KẾ BÊN CỘT CỜ
    // ==========================================

    const spawnX = centerX + 150;
    const spawnY = yardY;

    scene.map2Spawn = {
        x: spawnX,
        y: spawnY
    };

    const spawnMark = scene.add.circle(
        spawnX,
        spawnY,
        45,
        0xffffff,
        0.35
    );

    scene.map2Group.add(
        spawnMark
    );

    // ==========================================
    // VỊ TRÍ 12 PAD
    // ==========================================

    const padsStartY =
        yardY +
        yardH / 2 +
        120 +
        padH / 2;

    const startX =
        centerX -
        totalW / 2 +
        padW / 2;

    // ==========================================
    // VẼ 1 PAD
    // ==========================================

    function drawTrainingPad(
        x,
        y,
        isCommander = false
    ) {

        for (
            let row = 0;
            row < innerRows;
            row++
        ) {

            for (
                let col = 0;
                col < innerCols;
                col++
            ) {

                const cx =
                    x -
                    padW / 2 +
                    cellSize / 2 +
                    col *
                    (cellSize + cellGap);

                const cy =
                    y -
                    padH / 2 +
                    cellSize / 2 +
                    row *
                    (cellSize + cellGap);

                const fill =
                    isCommander
                        ? 0xffeeee
                        : 0xffffff;

                const stroke =
                    isCommander
                        ? 0xd1a300
                        : 0xc4eef8;

                const tile =
                    scene.add.rectangle(
                        cx,
                        cy,
                        cellSize,
                        cellSize,
                        fill,
                        1
                    );

                tile.setStrokeStyle(
                    2,
                    stroke,
                    1
                );

                scene.map2Group.add(
                    tile
                );
            }
        }

        // ======================================
        // PAD CHỈ HUY
        // ĐÃ BỎ CHỮ TEST
        // ======================================
    }

    // ==========================================
    // VẼ 12 PAD
    // ==========================================

    for (
        let r = 0;
        r < padGridRows;
        r++
    ) {

        for (
            let c = 0;
            c < padGridCols;
            c++
        ) {

            const x =
                startX +
                c *
                (padW + gapX);

            const y =
                padsStartY +
                r *
                (padH + gapY);

            // Cuối hàng 1 = pad chỉ huy
            const isCommander =
                r === 0 &&
                c === padGridCols - 1;

            // Nền đỏ dưới pad chỉ huy
            if (isCommander) {

                const bg =
                    scene.add.rectangle(
                        x,
                        y,
                        padW + 20,
                        padH + 20,
                        0xda251d,
                        0.28
                    );

                scene.map2Group.add(bg);
            }

            drawTrainingPad(
                x,
                y,
                isCommander
            );
        }
    }

    // ==========================================
    // CAMERA
    // ==========================================

    if (
        scene.cameras &&
        scene.cameras.main
    ) {

        scene.cameras.main.setBounds(
            0,
            0,
            W,
            W
        );

        scene.cameras.main.centerOn(
            centerX,
            yardY + 500
        );
    }

    console.log(
        'MAP 2 đã tạo: sân cờ + cột cờ + cờ Việt Nam + 12 pad 8x6.'
    );
}
