// ==========================================
// MAP 2 - BÃI HUẤN LUYỆN
// ==========================================

function createMap2(scene) {

    // Xóa map cũ
    if (scene.map2Group) {
        scene.map2Group.clear(true, true);
    }

    scene.map2Group = scene.add.group();

    // ==========================================
    // KÍCH THƯỚC MAP
    // ==========================================

    const FIELD_W = 1800;
    const FIELD_H = 1100;

    const ROAD = 130;

    // ==========================================
    // NỀN
    // ==========================================

    const ground = scene.add.rectangle(
        FIELD_W / 2,
        FIELD_H / 2,
        FIELD_W,
        FIELD_H,
        0x426b32
    );

    scene.map2Group.add(ground);

    // ==========================================
    // SÂN CỎ
    // ==========================================

    const grass = scene.add.rectangle(
        FIELD_W / 2,
        FIELD_H / 2,
        FIELD_W - ROAD * 2,
        FIELD_H - ROAD * 2,
        0x5d873c
    );

    grass.setStrokeStyle(6, 0x303f27);

    scene.map2Group.add(grass);

    // ==========================================
    // ĐƯỜNG BAO QUANH
    // ==========================================

    const roadTop = scene.add.rectangle(
        FIELD_W / 2,
        ROAD / 2,
        FIELD_W,
        ROAD,
        0x20252a
    );

    const roadBottom = scene.add.rectangle(
        FIELD_W / 2,
        FIELD_H - ROAD / 2,
        FIELD_W,
        ROAD,
        0x20252a
    );

    const roadLeft = scene.add.rectangle(
        ROAD / 2,
        FIELD_H / 2,
        ROAD,
        FIELD_H,
        0x20252a
    );

    const roadRight = scene.add.rectangle(
        FIELD_W - ROAD / 2,
        FIELD_H / 2,
        ROAD,
        FIELD_H,
        0x20252a
    );

    scene.map2Group.addMultiple([
        roadTop,
        roadBottom,
        roadLeft,
        roadRight
    ]);

    // ==========================================
    // VẠCH ĐƯỜNG
    // ==========================================

    for (let x = 80; x < FIELD_W; x += 120) {

        const lineTop = scene.add.rectangle(
            x,
            ROAD / 2,
            55,
            5,
            0xffffff
        );

        const lineBottom = scene.add.rectangle(
            x,
            FIELD_H - ROAD / 2,
            55,
            5,
            0xffffff
        );

        scene.map2Group.addMultiple([
            lineTop,
            lineBottom
        ]);
    }

    for (let y = 80; y < FIELD_H; y += 120) {

        const lineLeft = scene.add.rectangle(
            ROAD / 2,
            y,
            5,
            55,
            0xffffff
        );

        const lineRight = scene.add.rectangle(
            FIELD_W - ROAD / 2,
            y,
            5,
            55,
            0xffffff
        );

        scene.map2Group.addMultiple([
            lineLeft,
            lineRight
        ]);
    }

    // ==========================================
    // CỘT CỜ
    // ==========================================

    function createFlag(x, y) {

        // Cột
        const pole = scene.add.rectangle(
            x,
            y,
            8,
            110,
            0xd0d0d0
        );

        pole.setOrigin(0.5, 1);

        scene.map2Group.add(pole);

        // Lá cờ Việt Nam
        const flag = scene.add.image(
            x + 32,
            y - 92,
            "vietnamFlag"
        );

        flag.setDisplaySize(64, 43);

        scene.map2Group.add(flag);
    }

    // 4 cột cờ
    createFlag(180, 180);
    createFlag(FIELD_W - 180, 180);
    createFlag(180, FIELD_H - 180);
    createFlag(FIELD_W - 180, FIELD_H - 180);

    // ==========================================
    // PAD
    // ==========================================

    const PAD_W = 35;
    const PAD_H = 35;
    const PAD_GAP = 8;

    function createPadGroup(
        startX,
        startY,
        cols,
        rows
    ) {

        for (let y = 0; y < rows; y++) {

            for (let x = 0; x < cols; x++) {

                const px =
                    startX +
                    x * (PAD_W + PAD_GAP);

                const py =
                    startY +
                    y * (PAD_H + PAD_GAP);

                const pad = scene.add.rectangle(
                    px,
                    py,
                    PAD_W,
                    PAD_H,
                    0xd8d8d8
                );

                pad.setOrigin(0, 0);

                pad.setStrokeStyle(
                    2,
                    0x8c8c8c
                );

                scene.map2Group.add(pad);
            }
        }
    }

    // ==========================================
    // 9 CỤM PAD
    // ==========================================

    // Hàng 1
    createPadGroup(350, 300, 8, 6);
    createPadGroup(650, 300, 8, 6);
    createPadGroup(950, 300, 8, 6);

    // Hàng 2
    createPadGroup(350, 500, 8, 6);
    createPadGroup(650, 500, 8, 6);
    createPadGroup(950, 500, 8, 6);

    // Hàng 3
    createPadGroup(350, 700, 8, 6);
    createPadGroup(650, 700, 8, 6);
    createPadGroup(950, 700, 8, 6);

    // ==========================================
    // TIÊU ĐỀ
    // ==========================================

    const title = scene.add.text(
        FIELD_W / 2,
        170,
        "BÃI HUẤN LUYỆN",
        {
            fontSize: "42px",
            color: "#ffffff",
            fontStyle: "bold"
        }
    );

    title.setOrigin(0.5);

    scene.map2Group.add(title);

    console.log(
        "MAP 2 - BÃI HUẤN LUYỆN đã tạo"
    );
         }
