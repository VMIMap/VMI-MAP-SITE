// ==========================================
// MAP 1 - KHU HUẤN LUYỆN & SÂN BÊ TÔNG
// ==========================================

const MAP_SIZE = 3000; // Kích thước bản đồ

const centerX = MAP_SIZE / 2;
const centerY = MAP_SIZE / 2;

// Cấu hình Pad
const padWidth = 480;
const padHeight = 100;
const padGapX = 560;
const padGapY = 140;   // tăng khoảng cách dọc để không chạm sân bê tông

// Vị trí 6 pad (3 hàng trên, 3 hàng dưới)
const padPositions = [
    // Hàng trên
    { x: centerX - padGapX, y: centerY - 180 },
    { x: centerX,           y: centerY - 180 },
    { x: centerX + padGapX, y: centerY - 180 },
    // Hàng dưới
    { x: centerX - padGapX, y: centerY + 180 },
    { x: centerX,           y: centerY + 180 },
    { x: centerX + padGapX, y: centerY + 180 }
];

// Vẽ các pad
padPositions.forEach((p, index) => {
    // Nền PAD
    const pad = scene.add.rectangle(p.x, p.y, padWidth, padHeight, 0x3a3a3a);
    pad.setStrokeStyle(3, 0xffffff);
    pad.setDepth(1);

    // Kẻ ô lưới trên pad
    const cellSize = 40;
    const left = p.x - padWidth / 2;
    const top = p.y - padHeight / 2;
    const right = p.x + padWidth / 2;
    const bottom = p.y + padHeight / 2;

    // Đường dọc
    for (let x = left + cellSize; x < right; x += cellSize) {
        scene.add.line(0, 0, x, top, x, bottom, 0x888888)
            .setLineWidth(1).setDepth(2);
    }
    // Đường ngang
    for (let y = top + cellSize; y < bottom; y += cellSize) {
        scene.add.line(0, 0, left, y, right, y, 0x888888)
            .setLineWidth(1).setDepth(2);
    }

    // Tên PAD
    scene.add.text(p.x, p.y - padHeight / 2 - 20, `PAD ${index + 1}`, {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 3,
        fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(3);
});

// ==========================================
// SÂN BÊ TÔNG TRUNG TÂM
// ==========================================

const concreteW = 700;
const concreteH = 260;

// Nền sân
const concrete = scene.add.rectangle(centerX, centerY, concreteW, concreteH, 0xd9d9d9);
concrete.setStrokeStyle(4, 0xffffff);
concrete.setDepth(1);

// Viền trong
scene.add.rectangle(centerX, centerY, concreteW - 30, concreteH - 30)
    .setStrokeStyle(2, 0x999999)
    .setDepth(2);

// Chữ "SÂN BÊ TÔNG"
scene.add.text(centerX, centerY + concreteH / 2 + 25, 'SÂN BÊ TÔNG', {
    fontFamily: 'Arial',
    fontSize: '18px',
    color: '#222222',
    stroke: '#ffffff',
    strokeThickness: 4,
    fontStyle: 'bold'
}).setOrigin(0.5).setDepth(3);

// ==========================================
// CỘT CỜ VIỆT NAM
// ==========================================

// Đế cột (hình tròn)
scene.add.circle(centerX, centerY + 25, 22, 0x666666)
    .setStrokeStyle(3, 0x333333)
    .setDepth(3);

// Thân cột
const poleHeight = 180;
const poleBottom = centerY + 5;
const poleTop = poleBottom - poleHeight;
scene.add.rectangle(centerX, poleBottom - poleHeight / 2, 8, poleHeight, 0xcccccc)
    .setStrokeStyle(2, 0x555555)
    .setDepth(3);

// Đỉnh cột (chóp vàng)
scene.add.circle(centerX, poleTop, 6, 0xffcc00)
    .setStrokeStyle(1, 0x000000)
    .setDepth(4);

// Cờ Việt Nam
if (scene.textures.exists('flag_vn')) {
    const flag = scene.add.image(centerX + 45, poleTop + 15, 'flag_vn');
    flag.setDisplaySize(80, 53);
    flag.setDepth(4);
} else {
    // Fallback: lá cờ đỏ sao vàng đơn giản
    const flagRect = scene.add.rectangle(centerX + 45, poleTop + 15, 80, 53, 0xff0000);
    flagRect.setStrokeStyle(1, 0xffff00);
    flagRect.setDepth(4);
    scene.add.star(centerX + 45, poleTop + 15, 5, 10, 20, 0xffff00).setDepth(5);
}

// Chữ "CỘT CỜ"
scene.add.text(centerX, centerY + 55, 'CỘT CỜ', {
    fontFamily: 'Arial',
    fontSize: '16px',
    color: '#ffffff',
    stroke: '#000000',
    strokeThickness: 3,
    fontStyle: 'bold'
}).setOrigin(0.5).setDepth(3);
