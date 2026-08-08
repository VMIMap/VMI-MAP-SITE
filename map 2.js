// ==========================================
// PAD DÀI NGANG
// ==========================================

const padX = MAP_SIZE / 2;
const padY = MAP_SIZE / 2 + 180;

const padWidth = 1400;
const padHeight = 180;

scene.add.rectangle(
    padX,
    padY,
    padWidth,
    padHeight,
    0x777777
).setStrokeStyle(4, 0xffffff);

// Chia ô
const cellSize = 30;

for (let x = padX - padWidth / 2 + cellSize;
     x < padX + padWidth / 2;
     x += cellSize) {

    scene.add.line(
        0, 0,
        x, padY - padHeight / 2,
        x, padY + padHeight / 2,
        0xffffff
    ).setLineWidth(1);
}

for (let y = padY - padHeight / 2 + cellSize;
     y < padY + padHeight / 2;
     y += cellSize) {

    scene.add.line(
        0, 0,
        padX - padWidth / 2,
        y,
        padX + padWidth / 2,
        y,
        0xffffff
    ).setLineWidth(1);
}
// ==========================================
// SÂN BÊ TÔNG + CỘT CỜ Ở GIỮA
// ==========================================

const concreteX = MAP_SIZE / 2;
const concreteY = padY - 230;

scene.add.rectangle(
    concreteX,
    concreteY,
    500,
    260,
    0xe5e5e5
).setStrokeStyle(5, 0xb5b5b5);

// Cột cờ
scene.add.rectangle(
    concreteX,
    concreteY,
    7,
    180,
    0xd0d0d0
).setStrokeStyle(2, 0x555555);

// Cờ VN
const flag = scene.add.image(
    concreteX + 42,
    concreteY - 65,
    'flag_vn'
);

flag.setDisplaySize(85, 57);
