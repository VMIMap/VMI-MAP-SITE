// ==========================================
// MAP 1 - KHU HUẤN LUYỆN
// 6 BÃI: 3 TRÊN + 3 DƯỚI
// MỖI BÃI: 8 NGANG × 6 DÀI
// ==========================================

// Lưu ý: Biến global MAP_SIZE = 3000 phải được khai báo ở phạm vi ngoài cùng

function createMap1(scene) {

    // Xóa map cũ nếu có
    if (scene.map1Group) {
        scene.map1Group.clear(true, true);
    }

    scene.map1Group = scene.add.group();

    // ==========================================
    // GIỚI HẠN VẬT LÝ CHO MAP (CHỐNG LỌT MAP)
    // ==========================================
    if (scene.physics && scene.physics.world) {
        scene.physics.world.setBounds(0, 0, MAP_SIZE, MAP_SIZE);
    }

    // ==========================================
    // NỀN MAP
    // ==========================================

    const bg = scene.add.rectangle(
        MAP_SIZE / 2,
        MAP_SIZE / 2,
        MAP_SIZE,
        MAP_SIZE,
        0x5d8f6b // Màu xanh cỏ
    );

    bg.setOrigin(0.5);
    scene.map1Group.add(bg);

    // ==========================================
    // THÔNG SỐ BÃI HUẤN LUYỆN
    // ==========================================

    const PAD_COLS = 8;       // Số ô ngang
    const PAD_ROWS = 6;       // Số ô dọc

    const TILE_SIZE = 65;     // Kích thước mỗi ô vuông
    const GAP = 10;           // Khoảng cách giữa các ô

    // Kích thước thực tế của 1 bãi (Ngang: 590px, Dọc: 440px)
    const PAD_WIDTH = PAD_COLS * TILE_SIZE + (PAD_COLS - 1) * GAP;
    const PAD_HEIGHT = PAD_ROWS * TILE_SIZE + (PAD_ROWS - 1) * GAP;

    // Khoảng cách giữa 3 bãi theo chiều ngang
    const COLUMN_GAP = 180;

    // Khoảng cách giữa hàng trên và hàng dưới
    // ĐÃ FIX: Tăng từ 350 lên 800 để 2 hàng không đè lên nhau và có không gian ở giữa để Spawn
    const ROW_GAP = 800;

    // ==========================================
    // TÂM MAP
    // ==========================================

    const centerX = MAP_SIZE / 2;
    const centerY = MAP_SIZE / 2;

    // ==========================================
    // VỊ TRÍ 6 BÃI
    // ==========================================

    const totalWidth = PAD_WIDTH * 3 + COLUMN_GAP * 2;
    const startX = centerX - totalWidth / 2 + PAD_WIDTH / 2;

    const topY = centerY - ROW_GAP / 2;
    const bottomY = centerY + ROW_GAP / 2;

    const padPositions = [
        // HÀNG TRÊN
        { x: startX, y: topY },
        { x: startX + PAD_WIDTH + COLUMN_GAP, y: topY },
        { x: startX + (PAD_WIDTH + COLUMN_GAP) * 2, y: topY },

        // HÀNG DƯỚI
        { x: startX, y: bottomY },
        { x: startX + PAD_WIDTH + COLUMN_GAP, y: bottomY },
        { x: startX + (PAD_WIDTH + COLUMN_GAP) * 2, y: bottomY }
    ];

    // ==========================================
    // TẠO 6 BÃI (48 Ô / BÃI)
    // ==========================================

    padPositions.forEach(pad => {
        for (let row = 0; row < PAD_ROWS; row++) {
            for (let col = 0; col < PAD_COLS; col++) {
                const x = pad.x - PAD_WIDTH / 2 + TILE_SIZE / 2 + col * (TILE_SIZE + GAP);
                const y = pad.y - PAD_HEIGHT / 2 + TILE_SIZE / 2 + row * (TILE_SIZE + GAP);

                // Tạo ô vuông màu trắng/xám rất nhạt
                const tile = scene.add.rectangle(x, y, TILE_SIZE, TILE_SIZE, 0xf2f5f2);
                tile.setOrigin(0.5);
                scene.map1Group.add(tile);
            }
        }
    });

    // ==========================================
    // SPAWN NGƯỜI CHƠI TRỞ LẠI VỊ TRÍ ĐÚNG
    // ==========================================

    scene.map1Spawn = {
        x: centerX,
        y: centerY
    };

    // ==========================================
    // ĐIỂM SPAWN HIỂN THỊ
    // ==========================================

    const spawnMark = scene.add.circle(centerX, centerY, 35, 0xffffff, 0.15);
    scene.map1Group.add(spawnMark);

    // ==========================================
    // CAMERA
    // ==========================================

    if (scene.cameras && scene.cameras.main) {
        scene.cameras.main.setBounds(0, 0, MAP_SIZE, MAP_SIZE);
        scene.cameras.main.centerOn(centerX, centerY);
    }

    console.log("MAP 1: KHU HUẤN LUYỆN - Đã khởi tạo hoàn tất");
}
