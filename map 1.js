// ==========================================
// MAP 1 - KHU HUẤN LUYỆN
// SÂN BÊ TÔNG + CỘT CỜ (TRÊN CÙNG)
// 6 BÃI: 3 TRÊN + 3 DƯỚI (MỖI BÃI 8x6 Ô)
// ==========================================
// Lưu ý: Biến MAP_SIZE = 3000 đã khai báo ở global

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
    // SÂN BÊ TÔNG & CỘT CỜ (Ở TRÊN CÙNG)
    // ==========================================

    const yardY = 500; 

    // Sân bê tông
    const concreteYard = scene.add.rectangle(centerX, yardY, 1200, 400, 0xeeeeee);
    scene.map1Group.add(concreteYard);

    // Bục chân cờ
    const flagBase = scene.add.rectangle(centerX, yardY + 150, 150, 40, 0x888888);
    scene.map1Group.add(flagBase);

    // Cột cờ
    const flagPole = scene.add.rectangle(centerX, yardY, 12, 300, 0xdddddd);
    scene.map1Group.add(flagPole);

    // ==========================================
    // CỜ VIỆT NAM (FIX LỖI LIỆT DI CHUYỂN)
    // ==========================================

    if (!scene.textures.exists('flag_vn')) {
        scene.load.image('flag_vn', 'https://flagcdn.com/w256/vn.png');
        scene.load.once('complete', () => {
            // KỂM TRA SCENE CÒN SỐNG KHÔNG TRƯỚC KHI VẼ CỜ
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
    // THÔNG SỐ 6 BÃI LƯỚI
    // ==========================================

    const PAD_COLS = 8;
    const PAD_ROWS = 6;
    const TILE_SIZE = 65;
    const GAP = 10;

    const PAD_WIDTH = PAD_COLS * TILE_SIZE + (PAD_COLS - 1) * GAP;
    const PAD_HEIGHT = PAD_ROWS * TILE_SIZE + (PAD_ROWS - 1) * GAP;
    const COLUMN_GAP = 180;

    // Tính toán vị trí Y cho hàng trên và hàng dưới (Bên dưới sân bê tông)
    const topRowY = 1300; 
    const bottomRowY = 2100;

    // Căn giữa 3 bãi theo trục ngang
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
    // TẠO 6 BÃI (48 Ô TỪNG BÃI)
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
    // SPAWN Ở SÂN BÊ TÔNG (CHÍNH GIỮA CỘT CỜ)
    // ==========================================

    const spawnX = centerX;
    const spawnY = yardY + 100; // Cho nhân vật đứng ngay dưới chân bục cờ

    scene.map1Spawn = {
        x: spawnX,
        y: spawnY
    };

    const spawnMark = scene.add.circle(spawnX, spawnY, 40, 0xffffff, 0.4);
    scene.map1Group.add(spawnMark);

    // ==========================================
    // CAMERA
    // ==========================================

    if (scene.cameras && scene.cameras.main) {
        scene.cameras.main.setBounds(0, 0, W, W);
        // Camera trỏ thẳng vào sân bê tông lúc mới spawn
        scene.cameras.main.centerOn(spawnX, spawnY);
    }

    console.log('MAP 1: KHU HUẤN LUYỆN - SÂN CỜ VÀ 6 BÃI ĐÃ TẢI XONG VÀ ĐÃ FIX BUG!');
        }
        
