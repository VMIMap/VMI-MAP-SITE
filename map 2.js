// ==========================================
// MAP 2 - DIỄU BINH
// 12 PAD - 4 CỘT × 3 HÀNG
// ==========================================

function createMap2(scene) {

    // Xóa Map 2 cũ
    if (scene.map2Group) {
        scene.map2Group.clear(true, true);
    }

    scene.map2Group = scene.add.group();

    // MAP_SIZE lấy từ biến global
    const W = MAP_SIZE;
    const centerX = W / 2;
    const centerY = W / 2;

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

    grass.setOrigin(0.5);
    scene.map2Group.add(grass);

    // ==========================================
    // ĐƯỜNG BAO QUANH
    // ==========================================

    const ROAD = 180;

    const roads = [

        // Trên
        scene.add.rectangle(
            centerX,
            100,
            W,
            ROAD,
            0x25282c
        ),

        // Dưới
        scene.add.rectangle(
            centerX,
            W - 100,
            W,
            ROAD,
            0x25282c
        ),

        // Trái
        scene.add.rectangle(
            100,
            centerY,
            ROAD,
            W,
            0x25282c
        ),

        // Phải
        scene.add.rectangle(
            W - 100,
            centerY,
            ROAD,
            W,
            0x25282c
        )
    ];

    roads.forEach(road => {
        road.setOrigin(0.5);
        scene.map2Group.add(road);
    });

    // ==========================================
    // VẠCH ĐƯỜNG
    // ==========================================

    const DASH = 80;
    const DASH_GAP = 60;

    // Đường ngang trên + dưới
    for (let x = 180; x < W - 180; x += DASH + DASH_GAP) {

        const dashTop = scene.add.rectangle(
            x,
            100,
            DASH,
            10,
            0xf0d85a
        );

        const dashBottom = scene.add.rectangle(
            x,
            W - 100,
            DASH,
            10,
            0xf0d85a
        );

        scene.map2Group.add(dashTop);
        scene.map2Group.add(dashBottom);
    }

    // Đường dọc trái + phải
    for (let y = 180; y < W - 180; y += DASH + DASH_GAP) {

        const dashLeft = scene.add.rectangle(
            100,
            y,
            10,
            DASH,
            0xf0d85a
        );

        const dashRight = scene.add.rectangle(
            W - 100,
            y,
            10,
            DASH,
            0xf0d85a
        );

        scene.map2Group.add(dashLeft);
        scene.map2Group.add(dashRight);
    }

    // ==========================================
    // 12 PAD DIỄU BINH
    // 4 CỘT × 3 HÀNG
    // ==========================================

    const PAD_W = 430;
    const PAD_H = 250;

    const GAP_X = 110;
    const GAP_Y = 140;

    const COLS = 4;
    const ROWS = 3;

    const totalWidth =
        COLS * PAD_W +
        (COLS - 1) * GAP_X;

    const totalHeight =
        ROWS * PAD_H +
        (ROWS - 1) * GAP_Y;

    const startX =
        centerX - totalWidth / 2 + PAD_W / 2;

    const startY =
        centerY - totalHeight / 2 + PAD_H / 2;

    for (let row = 0; row < ROWS; row++) {

        for (let col = 0; col < COLS; col++) {

            const x =
                startX +
                col * (PAD_W + GAP_X);

            const y =
                startY +
                row * (PAD_H + GAP_Y);

            // ----------------------------------
            // Nền PAD
            // ----------------------------------

            const pad = scene.add.rectangle(
                x,
                y,
                PAD_W,
                PAD_H,
                0xdfe4e0
            );

            pad.setOrigin(0.5);

            scene.map2Group.add(pad);

            // ----------------------------------
            // Viền PAD
            // ----------------------------------

            const border = scene.add.rectangle(
                x,
                y,
                PAD_W,
                PAD_H
            );

            border.setStrokeStyle(
                6,
                0x555555,
                1
            );

            border.setFillStyle(
                0x000000,
                0
            );

            scene.map2Group.add(border);

            // ----------------------------------
            // Vạch bên trong PAD
            // ----------------------------------

            const lineCount = 5;

            for (let i = 1; i < lineCount; i++) {

                const lineX =
                    x -
                    PAD_W / 2 +
                    (PAD_W / lineCount) * i;

                const line = scene.add.rectangle(
                    lineX,
                    y,
                    4,
                    PAD_H - 20,
                    0xb8bfba
                );

                scene.map2Group.add(line);
            }

            // ----------------------------------
            // Số PAD
            // ----------------------------------

            const number = scene.add.text(
                x,
                y,
                String(row * COLS + col + 1),
                {
                    fontSize: '28px',
                    fontFamily: 'Arial',
                    color: '#555555',
                    fontStyle: 'bold'
                }
            );

            number.setOrigin(0.5);

            scene.map2Group.add(number);
        }
    }

    // ==========================================
    // SPAWN NGƯỜI CHƠI
    // ==========================================

    scene.map2Spawn = {
        x: centerX,
        y: centerY
    };

    // ==========================================
    // ĐIỂM SPAWN
    // ==========================================

    const spawn = scene.add.circle(
        centerX,
        centerY,
        35,
        0xffffff,
        0.18
    );

    scene.map2Group.add(spawn);

    // ==========================================
    // CAMERA
    // ==========================================

    if (scene.cameras && scene.cameras.main) {

        scene.cameras.main.setBounds(
            0,
            0,
            MAP_SIZE,
            MAP_SIZE
        );

        scene.cameras.main.centerOn(
            centerX,
            centerY
        );
    }

    console.log(
        'MAP 2: DIỄU BINH - 12 PAD (4 × 3)'
    );
        }
