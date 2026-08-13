MAP_SIZE = 3000;

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
    //
    // MỖI PAD:
    // 8 NGANG × 6 DỌC
    // Ô TO GIỐNG MAP 1
    // ==========================================

    const padGridCols = 4;
    const padGridRows = 3;

    const innerCols = 8;
    const innerRows = 6;

    // Ô đủ lớn cho avatar
    const cellSize = 65;
    const cellGap = 10;

    const padW =
        innerCols * cellSize +
        (innerCols - 1) * cellGap;

    const padH =
        innerRows * cellSize +
        (innerRows - 1) * cellGap;


    // Khoảng cách giữa các pad
    const gapX = 120;
    const gapY = 120;


    const totalW =
        padGridCols * padW +
        (padGridCols - 1) * gapX;

    const totalH =
        padGridRows * padH +
        (padGridRows - 1) * gapY;


    // ==========================================
    // KHU SÂN BÊ TÔNG + CỘT CỜ
    // NẰM PHÍA TRÊN, CHÍNH GIỮA
    // ==========================================

    const yardW = 1100;
    const yardH = 420;

    // sân bê tông nằm phía trên khu pad
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
    // ĐƯỜNG PHÍA TRÊN SÂN
    // ==========================================

    const roadY = yardY - yardH / 2 - 90;

    const road = scene.add.rectangle(
        centerX,
        roadY,
        W,
        140,
        0x242424
    );

    scene.map2Group.add(road);


    // vạch đường
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
    // CHÍNH GIỮA SÂN BÊ TÔNG
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

        const flagImg = scene.add.image(
            0,
            0,
            'flag_vn'
        );

        flagImg.setDisplaySize(
            110,
            73
        );


        const flagGroup = scene.add.container(
            poleX + 55,
            poleBaseY - poleH + 40,
            [flagImg]
        );


        scene.map2Group.add(flagGroup);


        let isFlagUp = true;


        // Bấm cột để kéo/hạ cờ
        poleBase.setInteractive({
            cursor: 'pointer'
        });


        poleBase.on(
            'pointerdown',
            () => {

                isFlagUp = !isFlagUp;


                scene.tweens.add({

                    targets: flagGroup,

                    y: isFlagUp
                        ? poleBaseY - poleH + 40
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

    if (!scene.textures.exists('flag_vn')) {

        scene.load.image(
            'flag_vn',
            'https://flagcdn.com/w256/vn.png'
        );


        scene.load.once(
            'complete',
            () => {

                if (
                    scene &&
                    scene.sys &&
                    scene.sys.isActive() &&
                    scene.map2Group
                ) {

                    attachFlag();

                }

            }
        );


        scene.load.start();

    } else {

        attachFlag();

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
    //
    // NẰM PHÍA DƯỚI SÂN CỜ
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
        // ======================================

        if (isCommander) {

            const commanderLabel =
                scene.add.text(
                    x,
                    y - padH / 2 - 20,
                    'TEST',
                    {
                        fontSize: '24px',
                        fontFamily:
                            'Orbitron, sans-serif',
                        color: '#ffd700',
                        fontStyle: 'bold',
                        stroke: '#000000',
                        strokeThickness: 4
                    }
                )
                .setOrigin(0.5);


            scene.map2Group.add(
                commanderLabel
            );

        }

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


            // nền đỏ dưới pad chỉ huy
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
        'MAP 2: sân bê tông + cột cờ phía trên, spawn cạnh cột cờ, 12 pad lớn 8x6 phía dưới.'
    );

}
