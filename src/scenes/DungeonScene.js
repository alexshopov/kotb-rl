import { Scene } from 'phaser';
import SpriteEntity from '../SpriteEntity';

export default class DungeonScene extends Scene {
    constructor() {
	super('DUNGEON');
    }

    preload() {
	this.load.image('player', 'assets/player.png');
	this.load.image('dungeon-tiles', 'assets/dungeon-tiles.png');
    }

    create() {
	const level = [
	    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	    [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	    [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
	    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
	    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
	    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0],
	    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	];

	const map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
	const tiles = map.addTilesetImage('dungeon-tiles');
	const dungeonLayer = map.createStaticLayer(0, tiles, 0, 0);
	dungeonLayer.setCollision(0);

	/*
	const debugGraphics = this.add.graphics().setAlpha(0.75);
	dungeonLayer.renderDebug(debugGraphics, {
	    tileColor: null,
	    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
	    faceColor: new Phaser.Display.Color(40, 39, 37, 255)
	});
	*/

	//this.player = new SpriteEntity(this, 128, 128, 'player');
	this.player = this.physics.add.sprite(128, 128, 'player');


	this.collider = this.physics.add.collider(this.player, dungeonLayer);

	this.createKeyboardHandler();
	this.createMouseHandler();
	this.createStatusText();
    }

    createKeyboardHandler() {
	this.keyboard = this.input.keyboard.addKeys('W, A, S, D');
    }

    createMouseHandler() {
	this.input.on('pointerup', (pointer) => {
	    this.status.text = `Mouse released at ${pointer.x}, ${pointer.y}`;
	});
    }

    createStatusText() {
	this.status = this.add.text(400, 550, 'Status:', { fontFamily: 'Arial', fill: 'white', fontSize: 16 }); 
	this.status.setOrigin(0.5);
    }

    update() {
	this.player.body.setVelocity(0);

	if (this.keyboard.W.isDown) {
	    this.player.setVelocityY(-150);
	} else if (this.keyboard.S.isDown) {
	    this.player.setVelocityY(150);
	} else if (this.keyboard.A.isDown) {
	    this.player.setVelocityX(-150);
	} else if (this.keyboard.D.isDown) {
	    this.player.setVelocityX(150);
	}

	this.status.text = `Player position: ${this.player.x}, ${this.player.y}`
    }
}
