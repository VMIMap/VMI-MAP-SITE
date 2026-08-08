// ================================
// MAP 1 - KHU HUẤN LUYỆN
// ================================

function createMap1(scene) {

    // Xóa map cũ nếu có
    if (scene.map1Group) {
        scene.map1Group.clear(true, true);
    }

    scene.map1Group = scene.add.group();

    // ================================
    // CẤU HÌNH PAD
    // ================================

    const PAD_W = 80;
    const PAD_H = 80;

    // Mỗi khu: 8 PAD ngang × 6 PAD dọc
    const PAD_LENGTH = 8;
    const PAD_WIDTH = 6;

    const GAP = 8;

    // ================================
    // CẤU HÌNH 9 KHU
    // ================================

    const AREA_COUNT = 9;

    // Khoảng cách giữa 3 khu
    const AREA_GAP_X = 160;
    const AREA_GAP_Y = 180;

    // Kích thước 1 khu
    const AREA_W =
        PAD_LENGTH * PAD_W +
        (PAD_LENGTH - 1) * GAP;

    const AREA_H =
        PAD_WIDTH * PAD_H +
        (PAD_WIDTH - 1) * GAP;

    // ================================
    // TOÀN BỘ MAP
    // ================================

    const MAP_W =
        AREA_W * 3 +
        AREA_GAP_X * 2;

    const MAP_H =
        AREA_H * 3 +
        AREA_GAP_Y * 2;

    // Cho map nằm giữa
    const OFFSET_X = 100;
    const OFFSET_Y = 100;

    // Cập nhật kích thước map
    window.MAP_SIZE = Math.max(
        MAP_W + OFFSET_X * 2,
        MAP_H + OFFSET_Y * 2
    );

    // ================================
    // TẠO 9 KHU
    // ================================

    for (let area = 0; area < AREA_COUNT; area++) {

        const areaRow = Math.floor(area / 3);
        const areaCol = area % 3;

        const startX =
            OFFSET_X +
            areaCol * (AREA_W + AREA_GAP_X);

        const startY =
            OFFSET_Y +
            areaRow * (AREA_H + AREA_GAP_Y);

        // ================================
        // TẠO 6 × 8 PAD
        // ================================

        for (let y = 0; y < PAD_WIDTH; y++) {

            for (let x = 0; x < PAD_LENGTH; x++) {

                const padX =
                    startX +
                    x * (PAD_W + GAP);

                const padY =
                    startY +
                    y * (PAD_H + GAP);

                const pad = scene.add.rectangle(
                    padX,
                    padY,
                    PAD_W,
                    PAD_H,
                    0x555555
                );

                pad.setOrigin(0, 0);

                pad.setStrokeStyle(
                    2,
                    0xffffff,
                    0.8
                );

                pad.area = area + 1;
                pad.padX = x + 1;
                pad.padY = y + 1;

                scene.map1Group.add(pad);
            }
        }
    }

    // ================================
    // KHU SPAWN
    // ================================
    // Spawn nằm phía trên khu PAD đầu tiên

    const spawnX =
        OFFSET_X + AREA_W / 2;

    const spawnY =
        OFFSET_Y - 70;

    scene.spawnPoint = {
        x: spawnX,
        y: spawnY
    };

    // Đánh dấu khu spawn
    const spawnText = scene.add.text(
        spawnX,
        spawnY,
        "SPAWN",
        {
            fontSize: "24px",
            color: "#ffffff",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 5
        }
    ).setOrigin(0.5);

    scene.map1Group.add(spawnText);

    // ================================
    // NỀN MAP
    // ================================

    scene.cameras.main.setBackgroundColor("#315438");

    console.log(
        "MAP 1:",
        MAP_W,
        "x",
        MAP_H,
        "MAP_SIZE:",
        window.MAP_SIZE
    );
        }
