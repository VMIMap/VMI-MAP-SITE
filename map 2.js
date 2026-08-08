// ==========================================
// MAP 2 - DIỄU BINH
// 12 PAD - 4 CỘT × 3 HÀNG
// ==========================================

function createMap2(scene) {

    if (scene.map2Group) {
        scene.map2Group.clear(true, true);
    }

    scene.map2Group = scene.add.group();

    const W = MAP_SIZE;
    const centerX = W / 2;
    const centerY = W / 2;

    // ==========================================
    // NỀN CỎ
    // ==========================================

    scene.add.rectangle(
        centerX,
        centerY,
        W,
        W,
        0x4f8738
    ).setOrigin(0.5);

    // ==========================================
    // ĐƯỜNG BAO QUANH
    // ==========================================

    const ROAD = 180;

    scene.add.rectangle(
        centerX,
        100,
        W,
        ROAD,
        0x25282c
    );

    scene.add.rectangle(
        centerX,
        W - 100,
        W,
        ROAD,
        0x25282c
    );

    scene.add.rectangle(
        100,
        centerY,
        ROAD,
        W,
        0x25282c
    );

    scene.add.rectangle(
        W - 100,
        centerY,
        ROAD,
        W,
        0x25282c
    );

    // ==========================================
    // VẠCH ĐƯỜNG
    // ==========================================

    for (let x = 40; x < W; x += 100) {

        scene.add.rectangle(
            x,
            100,
            50,
            5,
            0xffffff,
            0.8
        );

        scene.add.rectangle(
            x,
            W - 100,
            50,
            5,
            0xffffff,
            0.8
        );
    }

    for (let y = 40; y < W; y += 100) {

        scene.add.rectangle(
            100,
            y,
            5,
            50,
            0xffffff,
            0.8
        );

        scene.add.rectangle(
            W - 100,
            y,
            5,
            50,
            0xffffff,
            0.8
        );
    }

    // ==========================================
    // SÂN DIỄU BINH
    // ==========================================

    const FIELD_W = W - 420;
    const FIELD_H = W - 420;

    scene.add.rectangle(
        centerX,
        centerY,
        FIELD_W,
        FIELD_H,
        0x5c913f
    ).setStrokeStyle(
        5,
        0x3e6d2b
    );

    // ==========================================
    // 12 PAD
    // 4 CỘT × 3 HÀNG
    // ==========================================

    const PAD_W = 90;
    const PAD_H = 90;

    const PAD_GAP_X = 18;
    const PAD_GAP_Y = 25;

    const PAD_COLS = 4;
    const PAD_ROWS = 3;

    const totalPadW =
        PAD_COLS * PAD_W +
        (PAD_COLS - 1) * PAD_GAP_X;

    const totalPadH =
        PAD_ROWS * PAD_H +
        (PAD_ROWS - 1) * PAD_GAP_Y;

    const padStartX =
        centerX - totalPadW / 2 + PAD_W / 2;

    const padStartY =
        centerY - totalPadH / 2 + PAD_H / 2 + 80;

    for (let row = 0; row < PAD_ROWS; row++) {

        for (let col = 0; col < PAD_COLS; col++) {

            const padX =
                padStartX +
                col * (PAD_W + PAD_GAP_X);

            const padY =
                padStartY +
                row * (PAD_H + PAD_GAP_Y);

            const pad = scene.add.rectangle(
                padX,
                padY,
                PAD_W,
                PAD_H,
                0xe8e8e8
            );

            pad.setStrokeStyle(
                3,
                0xffffff,
                1
            );

            pad.area = row + 1;
            pad.pad = col + 1;

            scene.map2Group.add(pad);
        }
    }

    // ==========================================
    // VẠCH GIỮA SÂN
    // ==========================================

    scene.add.rectangle(
        centerX,
        centerY + 300,
        700,
        4,
        0xffffff,
        0.9
    );

    // ==========================================
    // SÂN BÊ TÔNG + CỘT CỜ
    // ==========================================

    const concreteX = centerX;
    const concreteY = centerY - 500;

    scene.add.rectangle(
        concreteX,
        concreteY,
        420,
        220,
        0xe5e5e5
    ).setStrokeStyle(
        5,
        0xffffff
    );

    // Chân cột cờ
    scene.add.circle(
        concreteX,
        concreteY + 55,
        20,
        0x777777
    ).setStrokeStyle(
        3,
        0x333333
    );

    // Cột cờ
    scene.add.rectangle(
        concreteX,
        concreteY - 35,
        7,
        170,
        0xd0d0d0
    ).setStrokeStyle(
        2,
        0x555555
    );

    // ==========================================
    // CỜ VIỆT NAM
    // ==========================================

    if (scene.textures.exists('flag_vn')) {

        const flag = scene.add.image(
            concreteX + 48,
            concreteY - 100,
            'flag_vn'
        );

        flag.setDisplaySize(
            90,
            60
        );
    }

    scene.add.text(
        concreteX,
        concreteY + 88,
        'CỘT CỜ - SÂN BÊ TÔNG',
        {
            font: 'bold 18px Orbitron',
            fill: '#222222',
            stroke: '#ffffff',
            strokeThickness: 4
        }
    ).setOrigin(0.5);

    // ==========================================
    // SPAWN
    // ==========================================

    scene.spawnX = centerX;
    scene.spawnY = centerY + 430;

    createPlayerMap2(scene);

    console.log('MAP 2 - DIỄU BINH: 12 PAD');
}


// ==========================================
// PLAYER MAP 2
// AVATAR + TÊN
// ==========================================

function createPlayerMap2(scene) {

    if (scene.playerContainer) {
        scene.playerContainer.destroy();
    }

    const player = scene.add.container(
        scene.spawnX,
        scene.spawnY
    );

    scene.playerContainer = player;

    // ==========================================
    // AVATAR
    // ==========================================

    let avatar;

    if (scene.textures.exists('p_avatar')) {

        avatar = scene.add.image(
            0,
            0,
            'p_avatar'
        );

        avatar.setDisplaySize(
            42,
            42
        );

    } else {

        avatar = scene.add.circle(
            0,
            0,
            21,
            0x00e5ff
        );
    }

    // Viền avatar
    const ring = scene.add.circle(
        0,
        0,
        24,
        0xffffff,
        0
    );

    ring.setStrokeStyle(
        3,
        0x00e5ff
    );

    // ==========================================
    // TÊN
    // ==========================================

    const playerName =
        currentUser
            ? (
                currentUser.global_name ||
                currentUser.username ||
                'Player'
            )
            : 'Player';

    const nameText = scene.add.text(
        0,
        -38,
        playerName,
        {
            font: 'bold 14px Rajdhani',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }
    ).setOrigin(0.5);

    player.add([
        ring,
        avatar,
        nameText
    ]);

    // ==========================================
    // PHYSICS
    // ==========================================

    scene.physics.world.enable(player);

    player.body.setCircle(22);

    player.body.setCollideWorldBounds(true);

    player.body.setDrag(
        600,
        600
    );

    scene.controlledObject = player;

    // ==========================================
    // CAMERA
    // ==========================================

    const cam = scene.cameras.main;

    cam.startFollow(
        player,
        true,
        0.12,
        0.12
    );

    cam.setBounds(
        0,
        0,
        MAP_SIZE,
        MAP_SIZE
    );

    cam.setZoom(
        parseFloat(
            document.getElementById('setZoom').value
        ) || 0.8
    );

    // ==========================================
    // KEYBOARD
    // ==========================================

    scene.keys = scene.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,

        UP: Phaser.Input.Keyboard.KeyCodes.UP,
        DOWN: Phaser.Input.Keyboard.KeyCodes.DOWN,
        LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
        RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT
    });
}


// ==========================================
// DI CHUYỂN PLAYER
// ==========================================

function updatePlayerMap2(scene) {

    if (!scene.playerContainer) return;

    const body =
        scene.playerContainer.body;

    if (!body) return;

    let x = 0;
    let y = 0;

    // ==========================================
    // WASD / PHÍM MŨI TÊN
    // ==========================================

    if (scene.keys) {

        if (
            scene.keys.W.isDown ||
            scene.keys.UP.isDown
        ) {
            y = -1;
        }

        if (
            scene.keys.S.isDown ||
            scene.keys.DOWN.isDown
        ) {
            y = 1;
        }

        if (
            scene.keys.A.isDown ||
            scene.keys.LEFT.isDown
        ) {
            x = -1;
        }

        if (
            scene.keys.D.isDown ||
            scene.keys.RIGHT.isDown
        ) {
            x = 1;
        }
    }

    // ==========================================
    // JOYSTICK
    // ==========================================

    if (
        typeof moveVector !== 'undefined' &&
        moveVector &&
        !isEditHUD
    ) {

        if (
            moveVector.x !== 0 ||
            moveVector.y !== 0
        ) {

            x = moveVector.x;
            y = moveVector.y;
        }
    }

    // ==========================================
    // CHUẨN HÓA
    // ==========================================

    const length =
        Math.sqrt(
            x * x + y * y
        );

    if (length > 0) {

        x /= length;
        y /= length;
    }

    // ==========================================
    // TỐC ĐỘ
    // ==========================================

    const SPEED = 220;

    body.setVelocity(
        x * SPEED,
        y * SPEED
    );
                }
