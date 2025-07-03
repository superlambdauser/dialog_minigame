var config ={
    type:Phaser.AUTO,
    width:800,
    height:600,
    scene:{
        preload:preload,
        create:create,
        update:update,
    }
}

var game = new Phaser.Game(config)

function preload() {
    // spritesheets
    this.load.spritesheet('npc', './img/raccoon_anim.png', {frameWidth:264, frameHeight:264});
    this.load.spritesheet('button', './img/buttons.png', {frameWidth:192, frameHeight:51});
    this.load.spritesheet('emotions', './img/emotions_boxes.png', {frameWidth:96, frameHeight:96});
    // images
    this.load.image('dial_box', './img/dialog_box.png');
    this.load.image('BG', './img/BG.png')
    // audio
    this.load.audio('good_answer',"./audio/good.wav");
    this.load.audio('wrong_answer', './audio/wrong.wav');
}


function create() {
    // images 
    let BG = this.add.image(config.width/2, config.height/2, 'BG');
    BG.setDepth(0) // ordre d'affichage
    BG.setScale(2);// taille
    
    let dial_box =this.add.image(520, 250, 'dial_box');
    dial_box.setDepth(1)
    dial_box.setScale(0.35);

    let emotions =this.add.image(140, 250, 'emotions');
    dial_box.setDepth(2);

    // let choice1 = this.add.image(500, 400, 'button');
    // choice1.setDepth(3);
    
    // let choice2 = this.add.image(500, 400, 'button');
    // choice2.setDepth(3);

    // sprites & animations
    var button1 = this.add.sprite(430, 500, 'button');
    var button2 = this.add.sprite(650, 500, 'button');
    var raccoon = this.add.sprite(140, 470, 'npc'); // add sprites

    // create anims :
    this.anims.create({
        key: "happytalk",
        repeat: -1,
        defaultTextureKey: "npc",
        duration: 1, // 1 ms, close enough to 0
        frames: [
          { frame: 0, duration: 500 },
          { frame: 3, duration: 500 },
        ],
    });

    this.anims.create({
        key: "angrytalk",
        repeat: -1,
        defaultTextureKey: "npc",
        duration: 1, // 1 ms, close enough to 0
        frames: [
          { frame: 1, duration: 1000 },
          { frame: 4, duration: 1000 },
        ],
    });

    this.anims.create({
        key: "fallinlove",
        repeat: -1,
        defaultTextureKey: "npc",
        duration: 1, // 1 ms, close enough to 0
        frames: [
          { frame: 6, duration: 1000 },
          { frame: 7, duration: 1000 },
          { frame: 8, duration: 1000 },
        ],
    });

    this.anims.create({
        key: "lovetalk",
        repeat: -1,
        defaultTextureKey:'npc',
        duration:1,
        frames:[
            { frame: 2, duration: 1000 },
            { frame: 5, duration: 1000 },
        ],
    })

    this.anims.create({
        key: 'click',
        defaultTextureKey:'button',
        duration:1,
        frames:[
            {frame:1 , duration: 500},
        ]
    })

    raccoon.play('happytalk');

}


function update() {
    
}