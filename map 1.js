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
    // CẤU HÌNH
    // ================================

    const PAD_W = 40;          // giảm kích thước pad để vừa màn hình
    const PAD_H = 40;
    const PAD_LENGTH = 8;      // số pad theo chiều dài
    const PAD_WIDTH = 6;       // số pad theo chiều ngang
    const GAP = 4;             // khoảng cách giữa các pad
    const AREA_COUNT = 9;      // 9 khu
    const AREA_GAP_X = 60;     // khoảng cách giữa các khu (ngang)
    const AREA_GAP_Y = 80;     // khoảng cách giữa các khu (dọc)

    // Tính kích thước một khu
    const areaWidth = PAD_LENGTH * (PAD_W + GAP) - GAP;
    const areaHeight = PAD_WIDTH * (PAD_H + GAP) - GAP;

    // ================================
    // TẠO 9 KHU (3x3)
    // ================================

    for (let area = 0; area < AREA_COUNT; area++) {
        const areaRow = Math.floor(area / 3);
        const areaCol = area % 3;

        const startX = areaCol * (areaWidth + AREA_GAP_X);
        const startY = areaRow * (areaHeight + AREA_GAP_Y);

        // Tạo pad trong khu
        for (let y = 0; y < PAD_WIDTH; y++) {
            for (let x = 0; x < PAD_LENGTH; x++) {
                const padX = startX + x * (PAD_W + GAP);
                const padY = startY + y * (PAD_H + GAP);

                const pad = scene.add.rectangle(padX, padY, PAD_W, PAD_H, 0x555555);
                pad.setOrigin(0, 0);
                pad.setStrokeStyle(2, 0xffffff, 0.8);
                pad.area = area + 1;
                pad.padX = x + 1;
                pad.padY = y + 1;

                scene.map1Group.add(pad);
            }
        }
    }

    // ================================
    // PAD SPAWN (chính giữa bản đồ)
    // ================================
    // Vị trí trung tâm của toàn bộ cụm 9 khu
    const totalWidth = 3 * areaWidth + 2 * AREA_GAP_X;
    const totalHeight = 3 * areaHeight + 2 * AREA_GAP_Y;
    const centerX = totalWidth / 2;
    const centerY = totalHeight / 2;

    // Pad spawn màu xanh lá, viền trắng
    const spawnPad = scene.add.rectangle(centerX, centerY, PAD_W, PAD_H, 0x00aa00);
    spawnPad.setOrigin(0.5, 0.5);  // đặt tâm để dễ căn giữa
    spawnPad.setStrokeStyle(2, 0xffffff, 1);
    spawnPad.isSpawn = true;       // đánh dấu đây là pad spawn

    scene.map1Group.add(spawnPad);

    // Text "SPAWN" bên trong pad (nếu cần)
    const spawnText = scene.add.text(centerX, centerY, "SPAWN", {
        fontSize: "14px",
        color: "#ffffff",
        fontStyle: "bold"
    }).setOrigin(0.5, 0.5);

    scene.map1Group.add(spawnText);

    console.log("MAP 1 - HUẤN LUYỆN đã tạo (có pad spawn)");
}
