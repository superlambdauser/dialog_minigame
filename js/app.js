import { createDialogueEngine } from "./dialog.js";
console.log(createDialogueEngine);

var config = {
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
    this.load.spritesheet('button', './img/buttons.png', {frameWidth:400, frameHeight:60});
    this.load.spritesheet('emotions', './img/emotions_boxes.png', {frameWidth:96, frameHeight:96});
    this.load.spritesheet('play_button', './img/play_button.png', {frameWidth:128, frameHeight:128});

    // images
    this.load.image('dial_box', './img/dial_box_light.png');
    this.load.image('BG', './img/BG.png')

    // audio
    this.load.audio('good_answer',"./audio/good.wav");
    this.load.audio('wrong_answer', './audio/wrong.wav');
}


function create() {
    // others
    var raccoon_clic_counter = 0;


    // images 
    let BG = this.add.image(config.width/2, config.height/2, 'BG');
    BG.setDepth(7); // display order
    BG.setScale(2); // size

    let dial_box = this.add.image(520, 230, 'dial_box');
    dial_box.setDepth(1);
    dial_box.setScale(0.8);
    
    let emotions = this.add.image(140, 230, 'emotions');
    emotions.setDepth(2);
    emotions.setScale(0.8);
    

    // sprites    
    var raccoon = this.add.sprite(140, 470, 'npc'); // add sprites
    raccoon.setDepth(5);
    
    
    // text
    var npc_dial = this.add.text(525, 350, 'The sky above the port was the color of television, tuned to a dead channel.', 
        { fontFamily: 'Courier', fontSize: 18, fontStyle : "bold", color: '#473c36', wordWrap: { width: 450 }, }).setOrigin(0.5, 1);
    npc_dial.setDepth(1);

    var choice_1 = this.add.text(550, 450, 'Caca.', 
    { fontFamily: 'Courier', fontSize: 18, fontStyle : "bold", color: '#473c36', wordWrap: { width: 350 }, }).setOrigin(0.5, 0.5);
    choice_1.setDepth(4);
            
    var choice_2 = this.add.text(550, 540, 'Prout.', 
    { fontFamily: 'Courier', fontSize: 18, fontStyle : "bold", color: '#473c36', wordWrap: { width: 350 }, }).setOrigin(0.5, 0.5);
    choice_2.setDepth(4);
                
                
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
            { frame: 1, duration: 250 },
            { frame: 4, duration: 250 },
        ],
    });
            
    this.anims.create({
        key: "fallinlove",
        repeat: -1,
        defaultTextureKey: "npc",
        duration: 1, // 1 ms, close enough to 0
        frames: [
            { frame: 6, duration: 250 },
            { frame: 7, duration: 250 },
            { frame: 8, duration: 750 },
            { frame: 7, duration: 250 },
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


    // click play to launch game
    let play_button = this.add.image(config.width/2, config.height/2, 'play_button')
    play_button.setDepth(7);
    play_button.setInteractive();
    play_button.on('pointerdown', function () { //interaction on click
        play_button.setScale(0.4)
        play_button.x = 50
        play_button.y = 50
        BG.setDepth(0)
    // play_button.destroy() 
    // alert("play_buttoner")
    });


    raccoon.play('happytalk');

    raccoon.setInteractive();


    // 
    raccoon.on('pointerdown', function () {
        if (raccoon_clic_counter <= 3){
        raccoon.play('fallinlove');
        raccoon_clic_counter += 1;
        }
        else {
            raccoon.play('angrytalk');
            raccoon_clic_counter = 0;
        }
    });


    // talk buttons
    let choice_button_1 = this.add.sprite(550, 450, 'button');
    choice_button_1.setDepth(4);
    choice_button_1.setInteractive();
    choice_button_1.on('pointerdown', function () {
        raccoon.play('angrytalk')
    });
    
    var choice_2 = this.add.sprite(550, 540, 'button');
    choice_2.setDepth(4);

    var displayMessage = function(data){
        console.log(data);
    }
    var displayQuestion = function(data){
        console.log(data);
    }
    var dialogEngine = createDialogueEngine(script,displayMessage, displayQuestion )
    dialogEngine.start()

}

function update() {

}