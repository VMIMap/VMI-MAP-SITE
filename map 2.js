// ==========================================
// 6 PAD HUẤN LUYỆN - DÀI THEO CHIỀU NGANG
// ==========================================

const centerX = MAP_SIZE / 2;
const centerY = MAP_SIZE / 2;

const padWidth = 500;   // chiều ngang
const padHeight = 90;  // chiều dọc

const padGapX = 540;
const padGapY = 120;

const padPositions = [
    // HÀNG TRÊN
    { x: centerX - padGapX, y: centerY - 260 },
    { x: centerX,           y: centerY - 260 },
    { x: centerX + padGapX, y: centerY - 260 },

    // HÀNG DƯỚI
    { x: centerX - padGapX, y: centerY + 260 },
    { x: centerX,           y: centerY + 260 },
    { x: centerX + padGapX, y: centerY + 260 }
];

padPositions.forEach((p, index) => {

    // Nền PAD
    scene.add.rectangle(
        p.x,
        p.y,
        padWidth,
        padHeight,
        0x777777
    ).setStrokeStyle(4, 0xffffff);

    // Chia ô trên PAD
    const cellSize = 30;

    for (let x = p.x - padWidth / 2 + cellSize; 
         x < p.x + padWidth / 2; 
         x += cellSize) {

        scene.add.line(
            0, 0,
            x, p.y - padHeight / 2,
            x, p.y + padHeight / 2,
            0xffffff
        ).setLineWidth(1);
    }

    for (let y = p.y - padHeight / 2 + cellSize;
         y < p.y + padHeight / 2;
         y += cellSize) {

        scene.add.line(
            0, 0,
            p.x - padWidth / 2,
            y,
            p.x + padWidth / 2,
            y,
            0xffffff
        ).setLineWidth(1);
    }

    // Tên PAD
    scene.add.text(
        p.x,
        p.y - padHeight / 2 - 18,
        `PAD ${index + 1}`,
        {
            font: 'bold 14px Orbitron',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }
    ).setOrigin(0.5);
});

// ==========================================
// SÂN BÊ TÔNG TRUNG TÂM
// ==========================================

const concreteW = 700;
const concreteH = 300;

scene.add.rectangle(
    centerX,
    centerY,
    concreteW,
    concreteH,
    0xe5e5e5
).setStrokeStyle(5, 0xffffff);

// Viền sân
scene.add.rectangle(
    centerX,
    centerY,
    concreteW - 30,
    concreteH - 30,
    0xe5e5e5
).setStrokeStyle(2, 0xb5b5b5);


// ==========================================
// CỘT CỜ VIỆT NAM
// ==========================================

// Chân cột
scene.add.circle(
    centerX,
    centerY + 20,
    20,
    0x777777
).setStrokeStyle(3, 0x333333);

// Cột
scene.add.rectangle(
    centerX,
    centerY - 60,
    7,
    160,
    0xd0d0d0
).setStrokeStyle(2, 0x555555);

// Cờ VN
const flag = scene.add.image(
    centerX + 42,
    centerY - 125,
    'flag_vn'
);

flag.setDisplaySize(85, 57);

// Tên khu vực
scene.add.text(
    centerX,
    centerY + 70,
    'SÂN BÊ TÔNG',
    {
        font: 'bold 16px Orbitron',
        fill: '#222222',
        stroke: '#ffffff',
        strokeThickness: 4
    }
).setOrigin(0.5);
