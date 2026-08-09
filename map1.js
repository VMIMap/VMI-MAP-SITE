// ==========================================
// MAP 1 - KHU HUẤN LUYỆN
// CỘT CỜ Ở CHÍNH GIỮA + SPAWN NGAY BÊN CẠNH CỘT CỜ
// 6 BÃI: 3 TRÊN + 3 DƯỚI (MỖI BÃI 8x6 Ô) BAO QUANH CỘT CỜ
// CÓ TƯỜNG BAO QUANH TOÀN KHU (VA CHẠM - KHÔNG ĐI XUYÊN QUA ĐƯỢC)
// ==========================================
// Lưu ý: biến MAP_SIZE đã khai báo ở global (index.html),
// không gán lại "MAP_SIZE = 3000" ở đây nữa.
MAP_SIZE = 3000
function createMap1(scene) {

    // Xóa Map 1 cũ an toàn
    if (scene.map1Group) {
        scene.map1Group.clear(true, true);
    }
    scene.map1Group = scene.add.group();

    const W = MAP_SIZE;
    const centerX = W / 2;
    const centerY = W / 2;

    // ==========================================
    // GIỚI HẠN MAP (CHỐNG LỌT MAP)
    // ==========================================
    if (scene.physics && scene.physics.world) {
        scene.physics.world.setBounds(0, 0, W, W);
    }

    // ==========================================
    // NỀN MAP (XANH CỎ)
    // ==========================================
    const bg = scene.add.rectangle(centerX, centerY, W, W, 0x5d8f6b);
    scene.map1Group.add(bg);

    // ==========================================
    // THÔNG SỐ 6 BÃI LƯỚI (tính trước để biết khu huấn luyện rộng bao nhiêu)
    // ==========================================
    const PAD_COLS = 8;
    const PAD_ROWS = 6;
    const TILE_SIZE = 65;
    const GAP = 10;
    const COLUMN_GAP = 180;
    const ROW_GAP = 220; // Khoảng cách từ tâm (cột cờ) tới tâm mỗi hàng bãi

    const PAD_WIDTH = PAD_COLS * TILE_SIZE + (PAD_COLS - 1) * GAP;   // 590
    const PAD_HEIGHT = PAD_ROWS * TILE_SIZE + (PAD_ROWS - 1) * GAP;  // 440

    // Hàng trên và hàng dưới đối xứng quanh cột cờ (chính giữa)
    const topRowY = centerY - (PAD_HEIGHT / 2 + ROW_GAP + PAD_HEIGHT / 2);
    const bottomRowY = centerY + (PAD_HEIGHT / 2 + ROW_GAP + PAD_HEIGHT / 2);

    const totalWidth = PAD_WIDTH * 3 + COLUMN_GAP * 2;
    const startX = centerX - totalWidth / 2 + PAD_WIDTH / 2;

    const padPositions = [
        // HÀNG TRÊN
        { x: startX, y: topRowY },
        { x: startX + PAD_WIDTH + COLUMN_GAP, y: topRowY },
        { x: startX + (PAD_WIDTH + COLUMN_GAP) * 2, y: topRowY },

        // HÀNG DƯỚI
        { x: startX, y: bottomRowY },
        { x: startX + PAD_WIDTH + COLUMN_GAP, y: bottomRowY },
        { x: startX + (PAD_WIDTH + COLUMN_GAP) * 2, y: bottomRowY }
    ];

    // ==========================================
    // SÂN BÊ TÔNG & CỘT CỜ - Ở CHÍNH GIỮA
    // ==========================================
    const yardY = centerY;

    const concreteYard = scene.add.rectangle(centerX, yardY, 1200, 400, 0xeeeeee);
    scene.map1Group.add(concreteYard);

    const flagBase = scene.add.rectangle(centerX, yardY + 150, 150, 40, 0x888888);
    scene.map1Group.add(flagBase);

    const flagPole = scene.add.rectangle(centerX, yardY, 12, 300, 0xdddddd);
    scene.map1Group.add(flagPole);

    // ==========================================
    // CỜ VIỆT NAM (FIX LỖI THOÁT RA VÀO LẠI)
    // ==========================================
    if (!scene.textures.exists('flag_vn')) {
        scene.load.image('flag_vn', 'https://flagcdn.com/w256/vn.png');
        scene.load.once('complete', () => {
            if (scene && scene.sys && scene.sys.isActive() && scene.map1Group) {
                const flag = scene.add.image(centerX + 65, yardY - 110, 'flag_vn').setScale(0.5);
                scene.map1Group.add(flag);
            }
        });
        scene.load.start();
    } else {
        const flag = scene.add.image(centerX + 65, yardY - 110, 'flag_vn').setScale(0.5);
        scene.map1Group.add(flag);
    }

    // ==========================================
    // TẠO 6 BÃI (48 Ô TỪNG BÃI) - BAO QUANH CỘT CỜ CHÍNH GIỮA
    // ==========================================
    padPositions.forEach(pad => {
        for (let row = 0; row < PAD_ROWS; row++) {
            for (let col = 0; col < PAD_COLS; col++) {

                const x = pad.x - PAD_WIDTH / 2 + TILE_SIZE / 2 + col * (TILE_SIZE + GAP);
                const y = pad.y - PAD_HEIGHT / 2 + TILE_SIZE / 2 + row * (TILE_SIZE + GAP);

                const tile = scene.add.rectangle(x, y, TILE_SIZE, TILE_SIZE, 0xf2f5f2);
                scene.map1Group.add(tile);
            }
        }
    });

    // ==========================================
    // TƯỜNG BAO QUANH TOÀN KHU HUẤN LUYỆN (CÓ VA CHẠM)
    // Bao trọn: sân cờ + 6 bãi, cách viền ngoài 1 khoảng đệm an toàn
    // ==========================================
    const WALL_PAD = 100;   // Khoảng đệm giữa nội dung và tường
    const WALL_THICK = 40;  // Độ dày tường

    const wallLeft = centerX - totalWidth / 2 - WALL_PAD;
    const wallRight = centerX + totalWidth / 2 + WALL_PAD;
    const wallTop = topRowY - PAD_HEIGHT / 2 - WALL_PAD;
    const wallBottom = bottomRowY + PAD_HEIGHT / 2 + WALL_PAD;

    const wallWidth = wallRight - wallLeft;
    const wallHeight = wallBottom - wallTop;

    const obstacles = scene.physics.add.staticGroup();
    const wallColor = 0xb0a890, wallStroke = 0x6b5a42;

    const wTop = scene.add.rectangle(centerX, wallTop, wallWidth, WALL_THICK, wallColor).setStrokeStyle(3, wallStroke);
    const wBottom = scene.add.rectangle(centerX, wallBottom, wallWidth, WALL_THICK, wallColor).setStrokeStyle(3, wallStroke);
    const wLeft = scene.add.rectangle(wallLeft, centerY, WALL_THICK, wallHeight, wallColor).setStrokeStyle(3, wallStroke);
    const wRight = scene.add.rectangle(wallRight, centerY, WALL_THICK, wallHeight, wallColor).setStrokeStyle(3, wallStroke);

    scene.map1Group.addMultiple([wTop, wBottom, wLeft, wRight]);
    obstacles.addMultiple([wTop, wBottom, wLeft, wRight]);
    scene.map1Obstacles = obstacles; // Lưu lại để index.html gắn collider với player

    // ==========================================
    // SPAWN - NGAY BÊN CẠNH CỘT CỜ (trên sân bê tông, cùng độ cao với cờ)
    // ==========================================
    const spawnX = centerX + 140;
    const spawnY = yardY;

    scene.map1Spawn = { x: spawnX, y: spawnY };

    const spawnMark = scene.add.circle(spawnX, spawnY, 40, 0xffffff, 0.4);
    scene.map1Group.add(spawnMark);

    // ==========================================
    // CAMERA
    // ==========================================
    if (scene.cameras && scene.cameras.main) {
        scene.cameras.main.setBounds(0, 0, W, W);
        scene.cameras.main.centerOn(spawnX, spawnY);
    }

    console.log('MAP 1: KHU HUẤN LUYỆN - Cột cờ chính giữa, spawn kế bên, có tường bao quanh');
                    }
        
