// ==========================================
// MAP 2 - DIỄU BINH
// CỘT CỜ (KÉO LÊN/HẠ ĐƯỢC, Ở TRÊN CHÍNH GIỮA)
// + 1 KHỐI PAD DUY NHẤT: 8 NGANG x 6 DỌC
// + 1 PAD ĐỎ CHO CHỈ HUY Ở CUỐI HÀNG 1
// (Đã bỏ hết tường / đường bao quanh theo yêu cầu)
// ==========================================
// Lưu ý: biến MAP_SIZE đã khai báo ở global (index.html),
// KHÔNG gán "MAP_SIZE = 3000" ở đầu file này nữa (gán lại kiểu
// không có let/const dễ gây lỗi ReferenceError nếu bật strict mode,
// và không cần thiết vì global đã có sẵn).

MAP_SIZE = 3000

function createMap2(scene) {

    // Xóa Map 2 cũ an toàn
    if (scene.map2Group) {
        scene.map2Group.clear(true, true);
    }
    scene.map2Group = scene.add.group();

    const W = MAP_SIZE;
    const centerX = W / 2;
    const centerY = W / 2;

    if (scene.physics && scene.physics.world) {
        scene.physics.world.setBounds(0, 0, W, W);
    }

    // ==========================================
    // NỀN CỎ
    // ==========================================
    const grass = scene.add.rectangle(centerX, centerY, W, W, 0x4f8738);
    scene.map2Group.add(grass);

    // ==========================================
    // THÔNG SỐ KHỐI PAD (tính trước để đặt cột cờ đúng vị trí)
    // ==========================================
    const padCols = 8, padRows = 6, cellSize = 65, cellGap = 5;
    const padWidth = padCols * cellSize + (padCols - 1) * cellGap;
    const padHeight = padRows * cellSize + (padRows - 1) * cellGap;

    const padBaseX = centerX;
    const padBaseY = centerY + 200; // Khối pad nằm phía dưới, cột cờ ở trên

    // ==========================================
    // CỘT CỜ - Ở TRÊN, CHÍNH GIỮA - BẤM ĐỂ KÉO LÊN / HẠ XUỐNG
    // ==========================================
    const flagX = centerX;
    const flagY = padBaseY - padHeight / 2 - 180;

    const flagBase = scene.add.circle(flagX, flagY, 24, 0x777777).setStrokeStyle(3, 0x333333);
    scene.map2Group.add(flagBase);
    scene.map2Group.add(scene.add.rectangle(flagX + 2, flagY - 55, 9, 110, 0x888888).setOrigin(0.5, 1)); // Bóng trụ
    scene.map2Group.add(scene.add.rectangle(flagX, flagY - 55, 9, 110, 0xf2f2f2).setOrigin(0.5, 1));     // Thân trụ
    scene.map2Group.add(scene.add.rectangle(flagX - 2, flagY - 55, 3, 110, 0xffffff).setOrigin(0.5, 1)); // Vệt sáng giả 3D
    scene.map2Group.add(scene.add.circle(flagX, flagY - 3, 4, 0xda251d));                                // Vòng đỏ chân cột
    scene.map2Group.add(scene.add.circle(flagX, flagY - 110, 7, 0xffd700).setStrokeStyle(2, 0xb8860b));  // Chóp vàng đỉnh cột

    function attachFlag() {
        const flagImg = scene.add.image(flagX + 28, flagY - 28, 'flag_vn').setDisplaySize(56, 38);

        let isFlagUp = false;
        const flagGroup = scene.add.container(0, 0, [flagImg]);
        scene.map2Group.add(flagGroup);

        flagBase.setInteractive({ cursor: 'pointer' });
        flagBase.on('pointerdown', () => {
            isFlagUp = !isFlagUp;
            scene.tweens.add({ targets: flagGroup, y: isFlagUp ? -72 : 0, duration: 1200, ease: 'Power2' });
            if (typeof showRobloxBubbleChat === 'function') {
                showRobloxBubbleChat(isFlagUp ? "Đã kéo cờ!" : "Đã hạ cờ!");
            }
        });
    }

    // FIX LỖI THOÁT RA VÀO LẠI: kiểm tra scene còn sống trước khi vẽ cờ
    if (!scene.textures.exists('flag_vn')) {
        scene.load.image('flag_vn', 'https://flagcdn.com/w256/vn.png');
        scene.load.once('complete', () => {
            if (scene && scene.sys && scene.sys.isActive() && scene.map2Group) {
                attachFlag();
            }
        });
        scene.load.start();
    } else {
        attachFlag();
    }

    // ==========================================
    // 1 KHỐI PAD DUY NHẤT: 8 NGANG x 6 DỌC (BO GÓC + ĐỔ BÓNG, KHÔNG SỐ)
    // ==========================================
    const outerW = padWidth + 16;
    const outerH = padHeight + 16;

    const shadow = scene.add.graphics();
    shadow.fillStyle(0x000000, 0.25);
    shadow.fillRoundedRect(padBaseX - outerW / 2 + 5, padBaseY - outerH / 2 + 5, outerW, outerH, 14);
    scene.map2Group.add(shadow);

    const padBg = scene.add.graphics();
    padBg.fillStyle(0xd6ddd8, 1);
    padBg.fillRoundedRect(padBaseX - outerW / 2, padBaseY - outerH / 2, outerW, outerH, 14);
    padBg.fillStyle(0xeef2ef, 0.6);
    padBg.fillRoundedRect(padBaseX - outerW / 2 + 4, padBaseY - outerH / 2 + 4, outerW - 8, outerH * 0.45, 10);
    scene.map2Group.add(padBg);

    const border = scene.add.graphics();
    border.lineStyle(4, 0xffd700, 0.9);
    border.strokeRoundedRect(padBaseX - outerW / 2, padBaseY - outerH / 2, outerW, outerH, 14);
    scene.map2Group.add(border);

    for (let row = 0; row < padRows; row++) {
        for (let col = 0; col < padCols; col++) {
            const px = padBaseX - padWidth / 2 + cellSize / 2 + col * (cellSize + cellGap);
            const py = padBaseY - padHeight / 2 + cellSize / 2 + row * (cellSize + cellGap);

            const tile = scene.add.rectangle(px, py, cellSize, cellSize, 0xffffff, 0.92);
            tile.setStrokeStyle(2, 0x00e5ff, 0.8);
            scene.map2Group.add(tile);
        }
    }

    // ==========================================
    // PAD ĐỎ CHO CHỈ HUY - NGAY SAU (CUỐI) HÀNG 1
    // ==========================================
    const commanderRow = 0; // Hàng 1 - gần cột cờ nhất
    const commanderPx = padBaseX - padWidth / 2 + cellSize / 2 + padCols * (cellSize + cellGap);
    const commanderPy = padBaseY - padHeight / 2 + cellSize / 2 + commanderRow * (cellSize + cellGap);

    const commanderPad = scene.add.rectangle(commanderPx, commanderPy, cellSize, cellSize, 0xda251d, 0.95);
    commanderPad.setStrokeStyle(3, 0xffd700, 1);
    scene.map2Group.add(commanderPad);

    const commanderLabel = scene.add.text(commanderPx, commanderPy - cellSize / 2 - 14, 'CHỈ HUY', {
        fontSize: '16px',
        fontFamily: 'Orbitron, sans-serif',
        color: '#ffd700',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 3
    }).setOrigin(0.5);
    scene.map2Group.add(commanderLabel);

    // ==========================================
    // SPAWN (phía dưới khối pad)
    // ==========================================
    const spawnX = centerX;
    const spawnY = padBaseY + padHeight / 2 + 200;

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

    console.log('MAP 2: DIỄU BINH - Đã bỏ tường, chỉ còn cột cờ + pad 8x6 + pad đỏ chỉ huy');
                             }
            l
