// ==========================================
// MAP 2 - DIỄU BINH
// 12 PAD - 4 CỘT × 3 HÀNG
// ==========================================

function createMap2(scene) {

    // Xóa Map 2 cũ nếu có
    if (scene.map2Group) {
        scene.map2Group.clear(true, true);
    }

    scene.map2Group = scene.add.group();

    // Sử dụng biến global MAP_SIZE (không khai báo lại)
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
        0x4f8738 // Màu xanh cỏ
    );

    grass.setOrigin(0.5);
    scene.map2Group.add(grass);

    // ==========================================
    // ĐƯỜNG GIAO THÔNG BAO QUANH
    // ==========================================

    const ROAD = 180; // Độ rộng của đường

    const roads = [
        // Trên
        scene.add.rectangle(centerX, 90, W, ROAD, 0x25282c),
        // Dưới
        scene.add.rectangle(centerX, W - 90, W, ROAD, 0x25282c),
        // Trái
        scene.add.rectangle(90, centerY, ROAD, W, 0x25282c),
        // Phải
        scene.add.rectangle(W - 90, centerY, ROAD, W, 0x25282c)
    ];

    roads.forEach(road => {
        road.setOrigin(0.5);
        scene.map2Group.add(road);
    });

    // ==========================================
    // VẠCH ĐƯỜNG (MÀU VÀNG)
    // ==========================================

    const DASH = 80;
    const DASH_GAP = 60;

    // Vạch ngang (trên và dưới)
    for (let x = 180; x < W - 180; x += DASH + DASH_GAP) {
        const dashTop = scene.add.rectangle(x, 90, DASH, 10, 0xf0d85a);
        const dashBottom = scene.add.rectangle(x, W - 90, DASH, 10, 0xf0d85a);
        
        scene.map2Group.add(dashTop);
        scene.map2Group.add(dashBottom);
    }

    // Vạch dọc (trái và phải)
    for (let y = 180; y < W - 180; y += DASH + DASH_GAP) {
        const dashLeft = scene.add.rectangle(90, y, 10, DASH, 0xf0d85a);
        const dashRight = scene.add.rectangle(W - 90, y, 10, DASH, 0xf0d85a);
        
        scene.map2Group.add(dashLeft);
        scene.map2Group.add(dashRight);
    }

    // ==========================================
    // 12 PAD DIỄU BINH (4 CỘT × 3 HÀNG)
    // ==========================================

    // Tinh chỉnh kích thước để vừa vặn với map 3000x3000
    const PAD_W = 500;
    const PAD_H = 400;

    const GAP_X = 150;
    const GAP_Y = 150;

    const COLS = 4;
    const ROWS = 3;

    const totalWidth = COLS * PAD_W + (COLS - 1) * GAP_X;
    const totalHeight = ROWS * PAD_H + (ROWS - 1) * GAP_Y;

    const startX = centerX - totalWidth / 2 + PAD_W / 2;
    const startY = centerY - totalHeight / 2 + PAD_H / 2;

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {

            const x = startX + col * (PAD_W + GAP_X);
            const y = startY + row * (PAD_H + GAP_Y);

            // ----------------------------------
            // 1. Nền PAD (Trắng/Xám nhạt)
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
            // 2. Viền PAD
            // ----------------------------------
            const border = scene.add.rectangle(
                x,
                y,
                PAD_W,
                PAD_H
            );
            border.setStrokeStyle(6, 0x555555, 1); // Viền xám đậm
            border.setFillStyle(0x000000, 0);      // Nền trong suốt
            scene.map2Group.add(border);

            // ----------------------------------
            // 3. Vạch chia bên trong PAD
            // ----------------------------------
            const lineCount = 5;
            for (let i = 1; i < lineCount; i++) {
                const lineX = x - PAD_W / 2 + (PAD_W / lineCount) * i;
                const line = scene.add.rectangle(
                    lineX,
                    y,
                    4,
                    PAD_H - 20,
                    0xb8bfba // Màu vạch nhạt
                );
                scene.map2Group.add(line);
            }

            // ----------------------------------
            // 4. Số thứ tự PAD
            // ----------------------------------
            const number = scene.add.text(
                x,
                y,
                String(row * COLS + col + 1),
                {
                    fontSize: '48px',
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
    // ĐIỂM SPAWN & VÒNG TRÒN SPAWN
    // ==========================================

    scene.map2Spawn = {
        x: centerX,
        y: centerY
    };

    const spawn = scene.add.circle(
        centerX,
        centerY,
        40,
        0xffffff,
        0.2
    );
    scene.map2Group.add(spawn);

    // ==========================================
    // CAMERA
    // ==========================================

    if (scene.cameras && scene.cameras.main) {
        scene.cameras.main.setBounds(0, 0, W, W);
        scene.cameras.main.centerOn(centerX, centerY);
    }

    console.log('MAP 2: DIỄU BINH - 12 PAD (4 × 3) đã được tạo.');
                 }
