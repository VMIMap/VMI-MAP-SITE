// ==========================================
// MAP 2 - DIỄU BINH
// SÂN BÊ TÔNG + CỘT CỜ VN + 12 PAD (4x3)
// ==========================================

function createMap2(scene) {

    // Xóa Map 2 cũ nếu có
    if (scene.map2Group) {
        scene.map2Group.clear(true, true);
    }

    scene.map2Group = scene.add.group();

    // Sử dụng biến global MAP_SIZE = 3000
    const W = MAP_SIZE;
    const centerX = W / 2;
    const centerY = W / 2;

    // ==========================================
    // GIỚI HẠN VẬT LÝ (CHO PHÉP NV DI CHUYỂN KHÔNG LỌT MAP)
    // ==========================================
    if (scene.physics && scene.physics.world) {
        scene.physics.world.setBounds(0, 0, W, W);
    }

    // ==========================================
    // NỀN CỎ
    // ==========================================
    const grass = scene.add.rectangle(centerX, centerY, W, W, 0x4f8738); // Xanh cỏ
    grass.setOrigin(0.5);
    scene.map2Group.add(grass);

    // ==========================================
    // ĐƯỜNG GIAO THÔNG BAO QUANH
    // ==========================================
    const ROAD = 180;
    const roads = [
        scene.add.rectangle(centerX, 90, W, ROAD, 0x25282c),      // Trên
        scene.add.rectangle(centerX, W - 90, W, ROAD, 0x25282c),  // Dưới
        scene.add.rectangle(90, centerY, ROAD, W, 0x25282c),      // Trái
        scene.add.rectangle(W - 90, centerY, ROAD, W, 0x25282c)   // Phải
    ];
    roads.forEach(road => scene.map2Group.add(road));

    // Vạch kẻ đường vàng
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
    // SÂN BÊ TÔNG & CỘT CỜ VIỆT NAM (Phía trên)
    // ==========================================
    const yardY = 450; 
    
    // Nền sân bê tông
    const concreteYard = scene.add.rectangle(centerX, yardY, 1200, 400, 0xeeeeee);
    scene.map2Group.add(concreteYard);

    // Bục chân cờ
    const flagBase = scene.add.rectangle(centerX, yardY + 150, 150, 40, 0x888888);
    scene.map2Group.add(flagBase);

    // Cột cờ
    const flagPole = scene.add.rectangle(centerX, yardY, 12, 300, 0xdddddd);
    scene.map2Group.add(flagPole);

    // Load Cờ VN từ web (Tự động nạp vào game)
    if (!scene.textures.exists('flag_vn')) {
        scene.load.image('flag_vn', 'https://flagcdn.com/w256/vn.png');
        scene.load.once('complete', () => {
            // Hiển thị cờ sau khi load xong (Treo lên đỉnh cột cờ)
            const flag = scene.add.image(centerX + 65, yardY - 110, 'flag_vn').setScale(0.5);
            scene.map2Group.add(flag);
        });
        scene.load.start();
    } else {
        const flag = scene.add.image(centerX + 65, yardY - 110, 'flag_vn').setScale(0.5);
        scene.map2Group.add(flag);
    }

    // ==========================================
    // 12 PAD DIỄU BINH (4 CỘT × 3 HÀNG)
    // ==========================================
    const PAD_W = 450;
    const PAD_H = 380;
    const GAP_X = 120;
    const GAP_Y = 150;
    const COLS = 4;
    const ROWS = 3;

    const totalWidth = COLS * PAD_W + (COLS - 1) * GAP_X;
    const totalHeight = ROWS * PAD_H + (ROWS - 1) * GAP_Y;

    // Căn giữa 12 pad vào khoảng trống giữa sân bê tông và đường dưới
    const startX = centerX - totalWidth / 2 + PAD_W / 2;
    const padAreaCenterY = yardY + 200 + ( (W - 180) - (yardY + 200) ) / 2; 
    const startY = padAreaCenterY - totalHeight / 2 + PAD_H / 2;

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const x = startX + col * (PAD_W + GAP_X);
            const y = startY + row * (PAD_H + GAP_Y);

            // Nền PAD
            const pad = scene.add.rectangle(x, y, PAD_W, PAD_H, 0xdfe4e0);
            scene.map2Group.add(pad);

            // Viền PAD (viền xám đậm để dễ nhìn)
            const border = scene.add.rectangle(x, y, PAD_W, PAD_H);
            border.setStrokeStyle(6, 0x555555, 1);
            border.setFillStyle(0x000000, 0);
            scene.map2Group.add(border);

            // Vạch chia bên trong PAD
            const lineCount = 5;
            for (let i = 1; i < lineCount; i++) {
                const lineX = x - PAD_W / 2 + (PAD_W / lineCount) * i;
                const line = scene.add.rectangle(lineX, y, 4, PAD_H - 20, 0xb8bfba);
                scene.map2Group.add(line);
            }

            // Số thứ tự PAD
            const number = scene.add.text(x, y, String(row * COLS + col + 1), {
                fontSize: '48px', fontFamily: 'Arial', color: '#555555', fontStyle: 'bold'
            }).setOrigin(0.5);
            scene.map2Group.add(number);
        }
    }

    // ==========================================
    // ĐIỂM SPAWN NGAY CHỖ ĐƯỜNG (GẦN PAD DƯỚI)
    // ==========================================
    
    // Spawn ngay giữa trục X, nằm trên đường bê tông bên dưới (Y = 2820)
    const spawnX = centerX;
    const spawnY = W - 180; 

    scene.map2Spawn = { x: spawnX, y: spawnY };

    // Vòng tròn đánh dấu điểm spawn
    const spawnMark = scene.add.circle(spawnX, spawnY, 40, 0xffffff, 0.4);
    scene.map2Group.add(spawnMark);

    // ==========================================
    // CAMERA
    // ==========================================
    if (scene.cameras && scene.cameras.main) {
        scene.cameras.main.setBounds(0, 0, W, W);
        // Focus camera ngay vào nhân vật lúc spawn
        scene.cameras.main.centerOn(spawnX, spawnY);
    }

    console.log('MAP 2: DIỄU BINH - Sân cờ và 12 PAD đã tải xong!');
        }
                                       
