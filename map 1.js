// ==========================================
// MAP 1 - KHU HUẤN LUYỆN
// 12 PAD + SPAWN Ở GIỮA
// ==========================================

function createMap1(scene) {

    // Xóa map cũ
    if (scene.map1Group) {
        scene.map1Group.clear(true, true);
    }

    scene.map1Group = scene.add.group();

    // ==========================================
    // CẤU HÌNH MAP
    // ==========================================

    const MAP_SIZE = 4000;

    const centerX = MAP_SIZE / 2;
    const centerY = MAP_SIZE / 2;

    scene.cameras.main.setBounds(
        0, 0,
        MAP_SIZE,
        MAP_SIZE
    );

    scene.physics.world.setBounds(
        0, 0,
        MAP_SIZE,
        MAP_SIZE
    );

    // Nền xanh lá
    scene.cameras.main.setBackgroundColor('#4f8f3a');

    // ==========================================
    // SPAWN - SÂN BÊ TÔNG GIỮA MAP
    // ==========================================

    const spawnW = 520;
    const spawnH = 260;

    const spawn = scene.add.rectangle(
        centerX,
        centerY,
        spawnW,
        spawnH,
        0xe5e5e5
    )
    .setStrokeStyle(5, 0xffffff)
    .setDepth(1);

    scene.map1Group.add(spawn);

    // Viền sân
    const spawnBorder = scene.add.rectangle(
        centerX,
        centerY,
        spawnW - 30,
        spawnH - 30
    )
    .setStrokeStyle(2, 0x999999)
    .setDepth(2);

    scene.map1Group.add(spawnBorder);

    // ==========================================
    // CỘT CỜ VIỆT NAM
    // ==========================================

    const pole = scene.add.rectangle(
        centerX,
        centerY - 45,
        7,
        130,
        0xd0d0d0
    )
    .setStrokeStyle(2, 0x555555)
    .setDepth(4);

    scene.map1Group.add(pole);

    // Cờ Việt Nam
    if (scene.textures.exists('flag_vn')) {

        const flag = scene.add.image(
            centerX + 42,
            centerY - 100,
            'flag_vn'
        )
        .setDisplaySize(85, 57)
        .setDepth(5);

        scene.map1Group.add(flag);
    }

    // Chân cột
    const poleBase = scene.add.circle(
        centerX,
        centerY + 20,
        20,
        0x777777
    )
    .setStrokeStyle(3, 0x333333)
    .setDepth(4);

    scene.map1Group.add(poleBase);

    // ==========================================
    // 12 PAD
    //
    //       PAD PAD PAD PAD
    //       PAD PAD PAD PAD
    //       PAD PAD PAD PAD
    //
    //       SÂN CỜ / SPAWN
    // ==========================================

    const PAD_W = 420;
    const PAD_H = 90;

    const PAD_GAP_X = 70;
    const PAD_GAP_Y = 65;

    const COLS = 4;
    const ROWS = 3;

    const totalW =
        COLS * PAD_W +
        (COLS - 1) * PAD_GAP_X;

    const totalH =
        ROWS * PAD_H +
        (ROWS - 1) * PAD_GAP_Y;

    // Đặt cụm PAD phía trên spawn
    const padsStartX =
        centerX - totalW / 2 + PAD_W / 2;

    const padsStartY =
        centerY - spawnH / 2 - 180 - totalH / 2;

    for (let row = 0; row < ROWS; row++) {

        for (let col = 0; col < COLS; col++) {

            const px =
                padsStartX +
                col * (PAD_W + PAD_GAP_X);

            const py =
                padsStartY +
                row * (PAD_H + PAD_GAP_Y);

            // PAD
            const pad = scene.add.rectangle(
                px,
                py,
                PAD_W,
                PAD_H,
                0x666666
            )
            .setStrokeStyle(
                3,
                0xffffff,
                0.9
            )
            .setDepth(2);

            pad.area = row * COLS + col + 1;

            scene.map1Group.add(pad);

            // ==================================
            // CHIA Ô PAD
            // ==================================

            const CELL = 30;

            for (
                let x = px - PAD_W / 2 + CELL;
                x < px + PAD_W / 2;
                x += CELL
            ) {

                const line = scene.add.line(
                    0,
                    0,
                    x,
                    py - PAD_H / 2,
                    x,
                    py + PAD_H / 2,
                    0xffffff
                )
                .setLineWidth(1)
                .setAlpha(0.35)
                .setDepth(3);

                scene.map1Group.add(line);
            }

            // ==================================
            // ĐƯỜNG VÀO PAD
            // ==================================

            const road = scene.add.rectangle(
                px,
                py + PAD_H / 2 + 25,
                PAD_W,
                35,
                0x777777
            )
            .setDepth(1);

            scene.map1Group.add(road);
        }
    }

    // ==========================================
    // ĐƯỜNG CHÍNH TỪ PAD -> SPAWN
    // ==========================================

    const mainRoad = scene.add.rectangle(
        centerX,
        centerY - spawnH / 2 - 80,
        totalW + 120,
        45,
        0x777777
    )
    .setDepth(1);

    scene.map1Group.add(mainRoad);

    // ==========================================
    // SPAWN PLAYER
    // ==========================================

    const spawnX = centerX;
    const spawnY = centerY + 70;

    // Nếu player cũ tồn tại thì xóa
    if (playerContainer) {
        playerContainer.destroy();
        playerContainer = null;
    }

    // Avatar
    const playerAvatar = scene.add.image(
        0,
        0,
        'p_avatar'
    )
    .setDisplaySize(40, 40);

    // Vòng player
    const playerRing = scene.add.circle(
        0,
        0,
        22,
        0xffffff,
        0
    )
    .setStrokeStyle(
        3,
        0xffffff
    );

    // Tên
    const playerName = currentUser
        ? (
            currentUser.global_name ||
            currentUser.username
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
    )
    .setOrigin(0.5);

    // Container player
    playerContainer = scene.add.container(
        spawnX,
        spawnY,
        [
            playerAvatar,
            playerRing,
            nameText
        ]
    );

    controlledObject = playerContainer;

    // Physics
    scene.physics.world.enable(
        playerContainer
    );

    playerContainer.body.setCollideWorldBounds(true);

    playerContainer.body.setSize(
        36,
        36
    );

    // ==========================================
    // CAMERA
    // ==========================================

    const cam = scene.cameras.main;

    cam.startFollow(
        playerContainer,
        true,
        0.1,
        0.1
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
        )
    );

    // ==========================================
    // JOYSTICK
    // ==========================================

    if (typeof initJoystick === 'function') {
        initJoystick();
    }

    console.log(
        'MAP 1: 12 PAD + SPAWN + PLAYER đã tạo'
    );
                }
