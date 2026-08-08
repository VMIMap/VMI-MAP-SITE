// ==========================================
// MAP 1 - KHU HUẤN LUYỆN
// 6 BÃI: 3 TRÊN + 3 DƯỚI
// MỖI BÃI: 8 NGANG × 6 DÀI
// ==========================================

const MAP_SIZE = 3000;

function createMap1(scene) {

    // Xóa map cũ
    if (scene.map1Group) {
        scene.map1Group.clear(true, true);
    }

    scene.map1Group = scene.add.group();

    // ==========================================
    // NỀN MAP
    // ==========================================

    const bg = scene.add.rectangle(
        MAP_SIZE / 2,
        MAP_SIZE / 2,
        MAP_SIZE,
        MAP_SIZE,
        0x5d8f6b
    );

    scene.map1Group.add(bg);

    // ==========================================
    // THÔNG SỐ BÃI HUẤN LUYỆN
    // ==========================================

    const PAD_COLS = 8;       // ngang
    const PAD_ROWS = 6;       // dài

    const TILE_SIZE = 65;
    const GAP = 10;

    const PAD_WIDTH =
        PAD_COLS * TILE_SIZE +
        (PAD_COLS - 1) * GAP;

    const PAD_HEIGHT =
        PAD_ROWS * TILE_SIZE +
        (PAD_ROWS - 1) * GAP;

    // Khoảng cách giữa 3 bãi
    const COLUMN_GAP = 180;

    // Khoảng cách giữa hàng trên và hàng dưới
    const ROW_GAP = 350;

    // ==========================================
    // TÂM MAP
    // ==========================================

    const centerX = MAP_SIZE / 2;
    const centerY = MAP_SIZE / 2;

    // ==========================================
    // VỊ TRÍ 6 BÃI
    // ==========================================

    const totalWidth =
        PAD_WIDTH * 3 +
        COLUMN_GAP * 2;

    const startX =
        centerX - totalWidth / 2 + PAD_WIDTH / 2;

    const topY =
        centerY - ROW_GAP / 2;

    const bottomY =
        centerY + ROW_GAP / 2;

    const padPositions = [

        // HÀNG TRÊN
        { x: startX, top: topY },
        {
            x: startX + PAD_WIDTH + COLUMN_GAP,
            top: topY
        },
        {
            x: startX + (PAD_WIDTH + COLUMN_GAP) * 2,
            top: topY
        },

        // HÀNG DƯỚI
        { x: startX, top: bottomY },
        {
            x: startX + PAD_WIDTH + COLUMN_GAP,
            top: bottomY
        },
        {
            x: startX + (PAD_WIDTH + COLUMN_GAP) * 2,
            top: bottomY
        }
    ];

    // ==========================================
    // TẠO 6 BÃI
    // ==========================================

    padPositions.forEach((pad, padIndex) => {

        const padGroup = scene.add.group();

        // --------------------------------------
        // 48 Ô / BÃI
        // --------------------------------------

        for (let row = 0; row < PAD_ROWS; row++) {

            for (let col = 0; col < PAD_COLS; col++) {

                const x =
                    pad.x -
                    PAD_WIDTH / 2 +
                    col * (TILE_SIZE + GAP);

                const y =
                    pad.top -
                    PAD_HEIGHT / 2 +
                    row * (TILE_SIZE + GAP);

                const tile = scene.add.rectangle(
                    x,
                    y,
                    TILE_SIZE,
                    TILE_SIZE,
                    0xf2f5f2
                );

                tile.setOrigin(0.5);

                padGroup.add(tile);
            }
        }

        scene.map1Group.addMultiple(
            padGroup.getChildren()
        );

    });

    // ==========================================
    // SPAWN NGƯỜI CHƠI
    // Ở GIỮA MAP
    // ==========================================

    scene.map1Spawn = {
        x: centerX,
        y: centerY
    };

    // ==========================================
    // ĐIỂM SPAWN HIỂN THỊ
    // ==========================================

    const spawnMark = scene.add.circle(
        centerX,
        centerY,
        35,
        0xffffff,
        0.15
    );

    scene.map1Group.add(spawnMark);

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
        "MAP 1: 6 bãi huấn luyện - mỗi bãi 8 × 6"
    );
}
