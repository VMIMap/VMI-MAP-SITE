// ==========================================
// MAP 1 - KHU HUẤN LUYỆN (SPAWN Ở GIỮA)
// ==========================================

function createMap1(scene) {
    if (scene.map1Group) scene.map1Group.clear(true, true);
    scene.map1Group = scene.add.group();

    const MAP_SIZE = 3000;
    const centerX = MAP_SIZE / 2;
    const centerY = MAP_SIZE / 2;

    // Mở rộng camera
    scene.cameras.main.setBounds(0, 0, MAP_SIZE, MAP_SIZE);
    scene.physics.world.setBounds(0, 0, MAP_SIZE, MAP_SIZE);
    scene.cameras.main.setBackgroundColor('#2b2b2b');

    // ==============================
    // SPAWN: SÂN BÊ TÔNG (chính giữa)
    // ==============================
    const concreteW = 500;
    const concreteH = 200;
    scene.add.rectangle(centerX, centerY, concreteW, concreteH, 0xd9d9d9)
        .setStrokeStyle(4, 0xffffff).setDepth(1);
    scene.add.rectangle(centerX, centerY, concreteW - 30, concreteH - 30)
        .setStrokeStyle(2, 0x999999).setDepth(2);
    scene.add.text(centerX, centerY + concreteH/2 + 20, 'SPAWN - SÂN BÊ TÔNG', {
        font: 'bold 18px Arial', fill: '#000', stroke: '#fff', strokeThickness: 4
    }).setOrigin(0.5).setDepth(3);

    // ==============================
    // CÁC PAD HUẤN LUYỆN (xung quanh)
    // ==============================
    const padW = 300, padH = 80;
    const gap = 60;
    const rows = 3, cols = 3; // 9 pad bố trí xung quanh spawn
    const totalPadWidth = cols * padW + (cols - 1) * gap;
    const totalPadHeight = rows * padH + (rows - 1) * gap;
    const startX = centerX - totalPadWidth / 2 + padW / 2;
    const startY = centerY - 200; // đặt các pad phía trên spawn

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let px = startX + col * (padW + gap);
            let py = startY + row * (padH + gap);
            // Điều chỉnh pad ở dưới spawn
            if (row >= 1) py = centerY + 200 + (row - 1) * (padH + gap);

            const pad = scene.add.rectangle(px, py, padW, padH, 0x3a3a3a)
                .setStrokeStyle(2, 0xffffff).setDepth(1);
            scene.add.text(px, py - padH/2 - 15, `PAD ${row*3+col+1}`, {
                font: '14px Arial', fill: '#fff', stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(3);

            // Kẻ ô lưới (tuỳ chọn)
            const cell = 30;
            for (let x = px - padW/2 + cell; x < px + padW/2; x += cell) {
                scene.add.line(0, 0, x, py - padH/2, x, py + padH/2, 0x888888).setLineWidth(1).setDepth(2);
            }
            for (let y = py - padH/2 + cell; y < py + padH/2; y += cell) {
                scene.add.line(0, 0, px - padW/2, y, px + padW/2, y, 0x888888).setLineWidth(1).setDepth(2);
            }
        }
    }
 }
