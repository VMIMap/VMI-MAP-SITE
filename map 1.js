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

    const PAD_W = 80;
    const PAD_H = 80;

    // 8 pad theo chiều dài
    const PAD_LENGTH = 8;

    // 6 pad theo chiều ngang
    const PAD_WIDTH = 6;

    // Khoảng cách giữa các pad
    const GAP = 8;

    // 9 khu huấn luyện
    const AREA_COUNT = 9;

    // Khoảng cách giữa các khu
    const AREA_GAP_X = 120;
    const AREA_GAP_Y = 140;

    // ================================
    // TẠO 9 KHU
    // ================================

    for (let area = 0; area < AREA_COUNT; area++) {

        // Chia thành 3 hàng x 3 cột
        const areaRow = Math.floor(area / 3);
        const areaCol = area % 3;

        const startX =
            areaCol * (
                PAD_LENGTH * (PAD_W + GAP) + AREA_GAP_X
            );

        const startY =
            areaRow * (
                PAD_WIDTH * (PAD_H + GAP) + AREA_GAP_Y
            );

        // ================================
        // TẠO PAD
        // ================================

        for (let y = 0; y < PAD_WIDTH; y++) {

            for (let x = 0; x < PAD_LENGTH; x++) {

                const padX =
                    startX + x * (PAD_W + GAP);

                const padY =
                    startY + y * (PAD_H + GAP);

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

        // ================================
        // TÊN KHU
        // ================================

        const title = scene.add.text(
            startX,
            startY - 45,
            `HUẤN LUYỆN ${area + 1}`,
            {
                fontSize: "28px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        );

        scene.map1Group.add(title);
    }

    console.log("MAP 1 - HUẤN LUYỆN đã tạo");
}
