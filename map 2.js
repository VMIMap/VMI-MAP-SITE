// ==========================================
// MAP 2 - DIỄU BINH
// SÂN BÊ TÔNG + CỘT CỜ VN + 12 PAD (ĐÃ CHIA Ô, ĐÃ FIX ĐẸP - BỎ SỐ)
// ==========================================

function createMap2(scene) {

    // Xóa Map 2 cũ an toàn
    if (scene.map2Group) {
        scene.map2Group.clear(true, true);
    }
    scene.map2Group = scene.add.group();

    const W = MAP_SIZE; // Yêu cầu biến MAP_SIZE = 3000 ở global
    const centerX = W / 2;
    const centerY = W / 2;

    // ==========================================
    // GIỚI HẠN VẬT LÝ
    // ==========================================
    if (scene.physics && scene.physics.world) {
        scene.physics.world.setBounds(0, 0, W, W);
    }

    // ==========================================
    // NỀN CỎ & ĐƯỜNG BAO QUANH
    // ==========================================
    const grass = scene.add.rectangle(centerX, centerY, W, W, 0x4f8738);
    scene.map2Group.add(grass);

    const ROAD = 180;
    const roads = [
        scene.add.rectangle(centerX, 90, W, ROAD, 0x25282c),
        scene.add.rectangle(centerX, W - 90, W, ROAD, 0x25282c),
        scene.add.rectangle(90, centerY, ROAD, W, 0x25282c),
        scene.add.rectangle(W - 90, centerY, ROAD, W, 0x25282c)
    ];
    roads.forEach(road => scene.map2Group.add(road));

    // Vạch kẻ đường
    const DASH = 80;
    const DASH_GAP = 60;
    for (let x = 180; x < W - 180; x += DASH + DASH_GAP) {
        scene.map2Group.add(scene.add.rectangle(x, 90, DASH, 10, 0xf0d85a));
        scene.map2Group.add(scene.add.rectangle(x, W - 90, DASH, 10, 0xf0d85a));
    }
    for (let y = 180; y < W - 180; y += DASH + DASH_GAP) {
        scene.map2Group.add(scene.add.rectangle(90, y, 10, DASH, 0xf0d85a));
        scene.map2Group.add(scene.add.rectangle(W - 90, y, 10, DASH, 0xf0d85a));
    }

    // ==========================================
    // SÂN BÊ TÔNG + CỘT CỜ (ĐÃ CĂN GIỮA)
    // ==========================================
    const yardY = 450;

    const concreteYard = scene.add.rectangle(centerX, yardY, 1200, 400, 0xeeeeee);
    scene.map2Group.add(concreteYard);

    const flagBase = scene.add.rectangle(centerX, yardY + 150, 150, 40, 0x888888);
    scene.map2Group.add(flagBase);

    const flagPole = scene.add.rectangle(centerX, yardY, 12, 300, 0xdddddd);
    scene.map2Group.add(flagPole);

    // FIX LỖI THOÁT RA VÀO LẠI (Kiểm tra scene còn hoạt động không)
    if (!scene.textures.exists('flag_vn')) {
        scene.load.image('flag_vn', 'https://flagcdn.com/w256/vn.png');
        scene.load.once('complete', () => {
            if (scene && scene.sys && scene.sys.isActive() && scene.map2Group) {
                const flag = scene.add.image(centerX + 65, yardY - 110, 'flag_vn').setScale(0.5);
                scene.map2Group.add(flag);
            }
        });
        scene.load.start();
    } else {
        const flag = scene.add.image(centerX + 65, yardY - 110, 'flag_vn').setScale(0.5);
        scene.map2Group.add(flag);
    }

    // ==========================================
    // 12 PAD DIỄU BINH - CHIA THÀNH TỪNG Ô LƯỚI (ĐÃ LÀM ĐẸP, BỎ SỐ)
    // ==========================================
    const TILE_SIZE = 45;   // Kích thước mỗi ô
    const TILE_GAP = 5;     // Khoảng cách giữa các ô
    const PAD_COLS = 8;     // 8 ô ngang
    const PAD_ROWS = 6;     // 6 ô dọc

    // Tính toán lại kích thước tổng của 1 PAD dựa trên số ô
    const PAD_W = PAD_COLS * TILE_SIZE + (PAD_COLS - 1) * TILE_GAP;
    const PAD_H = PAD_ROWS * TILE_SIZE + (PAD_ROWS - 1) * TILE_GAP;

    const GAP_X = 120;
    const GAP_Y = 150;
    const COLS = 4;
    const ROWS = 3;

    const totalWidth = COLS * PAD_W + (COLS - 1) * GAP_X;
    const totalHeight = ROWS * PAD_H + (ROWS - 1) * GAP_Y;

    const startX = centerX - totalWidth / 2 + PAD_W / 2;
    const padAreaCenterY = yardY + 200 + ((W - 180) - (yardY + 200)) / 2;
    const startY = padAreaCenterY - totalHeight / 2 + PAD_H / 2;

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {

            const padCenterX = startX + col * (PAD_W + GAP_X);
            const padCenterY = startY + row * (PAD_H + GAP_Y);
            const outerW = PAD_W + 16;
            const outerH = PAD_H + 16;

            // 1. Bóng đổ nhẹ (giả 3D) - lệch xuống-phải 5px
            const shadow = scene.add.graphics();
            shadow.fillStyle(0x000000, 0.25);
            shadow.fillRoundedRect(
                padCenterX - outerW / 2 + 5,
                padCenterY - outerH / 2 + 5,
                outerW, outerH, 14
            );
            scene.map2Group.add(shadow);

            // 2. Nền PAD bo góc (gradient giả bằng 2 lớp màu)
            const padBg = scene.add.graphics();
            padBg.fillStyle(0xd6ddd8, 1);
            padBg.fillRoundedRect(
                padCenterX - outerW / 2,
                padCenterY - outerH / 2,
                outerW, outerH, 14
            );
            padBg.fillStyle(0xeef2ef, 0.6);
            padBg.fillRoundedRect(
                padCenterX - outerW / 2 + 4,
                padCenterY - outerH / 2 + 4,
                outerW - 8, outerH * 0.45, 10
            );
            scene.map2Group.add(padBg);

            // 3. Viền vàng bo góc (nổi bật, kiểu khu quân sự)
            const border = scene.add.graphics();
            border.lineStyle(4, 0xffd700, 0.9);
            border.strokeRoundedRect(
                padCenterX - outerW / 2,
                padCenterY - outerH / 2,
                outerW, outerH, 14
            );
            scene.map2Group.add(border);

            // 4. Lưới ô vuông trong PAD - viền cyan cho đồng bộ phong cách (KHÔNG CÒN SỐ)
            for (let tr = 0; tr < PAD_ROWS; tr++) {
                for (let tc = 0; tc < PAD_COLS; tc++) {
                    const tileX = padCenterX - PAD_W / 2 + TILE_SIZE / 2 + tc * (TILE_SIZE + TILE_GAP);
                    const tileY = padCenterY - PAD_H / 2 + TILE_SIZE / 2 + tr * (TILE_SIZE + TILE_GAP);

                    const tile = scene.add.rectangle(tileX, tileY, TILE_SIZE, TILE_SIZE, 0xffffff, 0.92);
                    tile.setStrokeStyle(2, 0x00e5ff, 0.8);
                    scene.map2Group.add(tile);
                }
            }
        }
    }

    // ==========================================
    // SPAWN
    // ==========================================
    // Chỉnh Y = W - 90 để spawn đúng giữa lòng đường dưới
    const spawnX = centerX;
    const spawnY = W - 90;

    scene.map2Spawn = { x: spawnX, y: spawnY };

    const spawnMark = scene.add.circle(spawnX, spawnY, 40, 0xffffff, 0.4);
    scene.map2Group.add(spawnMark);

    // ==========================================
    // CAMERA
    // ==========================================
    if (scene.cameras && scene.cameras.main) {
        scene.cameras.main.setBounds(0, 0, W, W);
        scene.cameras.main.centerOn(spawnX, spawnY);
    }

    console.log('MAP 2: PAD ĐÃ LÀM ĐẸP (BO GÓC + ĐỔ BÓNG + VIỀN VÀNG), ĐÃ BỎ SỐ');
                }
                        
