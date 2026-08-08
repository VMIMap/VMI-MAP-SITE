// ==========================================
// MAP 2 - DIỄU BINH
// ==========================================

function createMap2(scene) {

    // ======================================
    // XÓA MAP CŨ
    // ======================================

    if (scene.map2Group) {
        scene.map2Group.clear(true, true);
    }

    scene.map2Group = scene.add.group();

    // ======================================
    // CẤU HÌNH MAP
    // ======================================

    const MAP_W = 2600;
    const MAP_H = 2200;

    const centerX = MAP_W / 2;
    const centerY = MAP_H / 2;

    // ======================================
    // NỀN CỎ
    // ======================================

    const grass = scene.add.rectangle(
        centerX,
        centerY,
        MAP_W,
        MAP_H,
        0x4f7938
    );

    grass.setOrigin(0.5);
    scene.map2Group.add(grass);

    // ======================================
    // ĐƯỜNG BAO QUANH
    // ======================================

    const ROAD = 180;

    // Đường trên
    const roadTop = scene.add.rectangle(
        centerX,
        ROAD / 2,
        MAP_W,
        ROAD,
        0x252525
    );

    // Đường dưới
    const roadBottom = scene.add.rectangle(
        centerX,
        MAP_H - ROAD / 2,
        MAP_W,
        ROAD,
        0x252525
    );

    // Đường trái
    const roadLeft = scene.add.rectangle(
        ROAD / 2,
        centerY,
        ROAD,
        MAP_H,
        0x252525
    );

    // Đường phải
    const roadRight = scene.add.rectangle(
        MAP_W - ROAD / 2,
        centerY,
        ROAD,
        MAP_H,
        0x252525
    );

    scene.map2Group.addMultiple([
        roadTop,
        roadBottom,
        roadLeft,
        roadRight
    ]);

    // ======================================
    // VẠCH ĐƯỜNG
    // ======================================

    const dashColor = 0xffffff;

    // Vạch ngang trên + dưới
    for (let x = ROAD; x < MAP_W - ROAD; x += 80) {

        scene.add.rectangle(
            x,
            ROAD / 2,
            40,
            4,
            dashColor
        );

        scene.add.rectangle(
            x,
            MAP_H - ROAD / 2,
            40,
            4,
            dashColor
        );
    }

    // Vạch dọc trái + phải
    for (let y = ROAD; y < MAP_H - ROAD; y += 80) {

        scene.add.rectangle(
            ROAD / 2,
            y,
            4,
            40,
            dashColor
        );

        scene.add.rectangle(
            MAP_W - ROAD / 2,
            y,
            4,
            40,
            dashColor
        );
    }

    // ======================================
    // KHU DIỄU BINH
    // ======================================

    const FIELD_X = centerX;
    const FIELD_Y = centerY + 100;

    const FIELD_W = 1900;
    const FIELD_H = 1250;

    const field = scene.add.rectangle(
        FIELD_X,
        FIELD_Y,
        FIELD_W,
        FIELD_H,
        0x638f43
    );

    field.setStrokeStyle(
        8,
        0x3b5f2a,
        1
    );

    scene.map2Group.add(field);

    // ======================================
    // SÂN BÊ TÔNG + CỘT CỜ
    // ======================================

    const CONCRETE_W = 650;
    const CONCRETE_H = 260;

    const concreteX = centerX;
    const concreteY = ROAD + 180;

    const concrete = scene.add.rectangle(
        concreteX,
        concreteY,
        CONCRETE_W,
        CONCRETE_H,
        0xe5e5e5
    );

    concrete.setStrokeStyle(
        6,
        0xffffff,
        1
    );

    scene.map2Group.add(concrete);

    // Viền trong sân
    const concreteBorder = scene.add.rectangle(
        concreteX,
        concreteY,
        CONCRETE_W - 30,
        CONCRETE_H - 30,
        0xe5e5e5
    );

    concreteBorder.setStrokeStyle(
        2,
        0xb0b0b0,
        1
    );

    scene.map2Group.add(concreteBorder);

    // ======================================
    // CHÂN CỘT CỜ
    // ======================================

    const poleX = concreteX;
    const poleY = concreteY + 10;

    const poleBase = scene.add.circle(
        poleX,
        poleY + 55,
        25,
        0x777777
    );

    poleBase.setStrokeStyle(
        4,
        0x333333
    );

    scene.map2Group.add(poleBase);

    // ======================================
    // CỘT CỜ
    // ======================================

    const pole = scene.add.rectangle(
        poleX,
        poleY - 80,
        8,
        170,
        0xd5d5d5
    );

    pole.setStrokeStyle(
        2,
        0x555555
    );

    scene.map2Group.add(pole);

    // ======================================
    // CỜ VIỆT NAM
    // ======================================

    if (scene.textures.exists('flag_vn')) {

        const flag = scene.add.image(
            poleX + 48,
            poleY - 145,
            'flag_vn'
        );

        flag.setDisplaySize(100, 67);

        scene.map2Group.add(flag);
    }

    // ======================================
    // TÊN KHU
    // ======================================

    const title = scene.add.text(
        concreteX,
        concreteY + 95,
        'SÂN CỜ',
        {
            font: 'bold 18px Orbitron',
            color: '#222222',
            stroke: '#ffffff',
            strokeThickness: 4
        }
    ).setOrigin(0.5);

    scene.map2Group.add(title);

    // ======================================
    // CỤM PAD DIỄU BINH
    // ======================================

    const PAD_W = 85;
    const PAD_H = 55;

    const PAD_GAP_X = 12;
    const PAD_GAP_Y = 12;

    const PAD_COLS = 8;
    const PAD_ROWS = 6;

    // Bắt đầu bên dưới sân cờ
    const padStartX =
        centerX -
        ((PAD_COLS * PAD_W) +
        ((PAD_COLS - 1) * PAD_GAP_X)) / 2 +
        PAD_W / 2;

    const padStartY =
        concreteY +
        CONCRETE_H / 2 +
        130;

    for (let y = 0; y < PAD_ROWS; y++) {

        for (let x = 0; x < PAD_COLS; x++) {

            const px =
                padStartX +
                x * (PAD_W + PAD_GAP_X);

            const py =
                padStartY +
                y * (PAD_H + PAD_GAP_Y);

            const pad = scene.add.rectangle(
                px,
                py,
                PAD_W,
                PAD_H,
                0xeeeeee
            );

            pad.setStrokeStyle(
                2,
                0xffffff,
                0.9
            );

            pad.area = 2;
            pad.padX = x + 1;
            pad.padY = y + 1;

            scene.map2Group.add(pad);
        }
    }

    // ======================================
    // ĐƯỜNG GIỮA KHU PAD
    // ======================================

    const middleLineY =
        padStartY +
        (PAD_ROWS * (PAD_H + PAD_GAP_Y)) / 2;

    const middleLine = scene.add.rectangle(
        centerX,
        middleLineY,
        1500,
        5,
        0xffffff,
        0.8
    );

    scene.map2Group.add(middleLine);

    // ======================================
    // SPAWN
    // ======================================
    // Spawn ở đầu sân, trước sân cờ

    scene.spawnPoint = {
        x: centerX,
        y: concreteY + CONCRETE_H / 2 + 55
    };

    const spawnMark = scene.add.circle(
        scene.spawnPoint.x,
        scene.spawnPoint.y,
        18,
        0x00e5ff,
        0.8
    );

    spawnMark.setStrokeStyle(
        3,
        0xffffff
    );

    scene.map2Group.add(spawnMark);

    // ======================================
    // KÍCH THƯỚC MAP
    // ======================================

    if (typeof MAP_SIZE !== 'undefined') {
        // Nếu MAP_SIZE là let
        MAP_SIZE = Math.max(MAP_W, MAP_H);
    }

    window.MAP_SIZE = Math.max(
        MAP_W,
        MAP_H
    );

    // ======================================
    // CAMERA
    // ======================================

    scene.cameras.main.setBounds(
        0,
        0,
        MAP_W,
        MAP_H
    );

    scene.cameras.main.setBackgroundColor(
        '#4f7938'
    );

    console.log(
        'MAP 2 - DIỄU BINH:',
        MAP_W,
        'x',
        MAP_H
    );
        }
