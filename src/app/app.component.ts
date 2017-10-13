import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Point} from './point';
import {Options} from './option';
import {Particle} from './particle';
import {Rocket} from './rocket';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  TAU : any = Math.PI * 2;
  
  maxRockets: number;
  numParticles: number;
  explosionHeight: number;
  explosionChance: number;
  rocketSpawnInterval: number;
  initialRocketVelocity: Point;
  
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D ;
  cw: number;
  ch: number;

  mx : number;
  my : number;
  
  rockets: Rocket[];
  particles: Particle[];
  container : any;

  currentHue : number;
  partSpeed : number;
  partSpeedVariance : number;
  partWind : number;
  partFriction : number;
  partGravity : number;
  hueMin : number;
  hueMax : number;
  fworkSpeed : number;
  fworkAccel : number;
  hueVariance : number;
  flickerDensity : number;
  showShockwave : boolean;
  showTarget : boolean;
  clearAlpha : number;
  lineWidth : number;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //this.ctx= new CanvasRenderingContext2D
       this.container = document.getElementById('container')
      const options = {
        maxRockets: 2,            // max # of rockets to spawn
        rocketSpawnInterval: 150, // millisends to check if new rockets should spawn
        numParticles: 150,        // number of particles to spawn when rocket explodes (+0-10)
        explosionHeight: 0.6,     // minimum percentage of height of container at which rockets explode
        explosionChance: 0.08,     // chance in each tick the rocket will explode
        currentHue : 30,
        partSpeed : 5,
        partSpeedVariance : 10,
        partWind : 50,
        partFriction : 5,
        partGravity : 1,
        hueMin : 0,
        hueMax : 360,
        fworkSpeed : 4,
        fworkAccel : 10,
        hueVariance : 30,
        flickerDensity : 25,
        showShockwave : true,
        showTarget : false,
        clearAlpha : 25,
        lineWidth : 1
      }
      this.start(this.container, options)
    });


  }

  random (min: number, max: number): number {
    return Math.random() * (max - min+1) + min
  }

  start (container: HTMLElement, options: Options) {
    
        if (!options) {
           options = {} 
          }
        this.rocketSpawnInterval = options.rocketSpawnInterval || 150
        this.maxRockets = options.maxRockets || 3
        this.numParticles = options.numParticles || 100
        this.explosionHeight = options.explosionHeight || 0.2
        this.explosionChance = options.explosionChance || 0.08
        this.currentHue=this.random(options.hueMin,options.hueMax)
        this.partSpeed=options.partSpeed
        this.partSpeedVariance=options.partSpeedVariance
        this.partWind=options.partWind
        this.partFriction=options.partFriction
        this.partGravity = options.partGravity
        this.hueMin = options.hueMin
        this.hueMax = options.hueMax
        this.fworkSpeed = options.fworkSpeed
        this.fworkAccel = options.fworkAccel
        this.hueVariance = options.hueVariance
        this.flickerDensity = options.flickerDensity
        this.showShockwave = options.showShockwave
        this.showTarget = options.showTarget
        this.clearAlpha = options.currentHue
        this.lineWidth = options.lineWidth
    
        this.rockets = []
        this.particles = []
        this.cw = container.clientWidth
        this.ch = container.clientHeight
    
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 1;
        //console.log("ctx "+this.ctx);
        this.canvas.width = this.cw
        this.canvas.height = this.ch
        container.appendChild(this.canvas)
        //let updateFn : any = this.update(this.ctx);
        requestAnimationFrame(()=>{
          this.update();
        });
        setInterval(() => {
          if (this.rockets.length < this.maxRockets) {
            //console.log("push rocket")
            this.rockets.push(new Rocket(this))
          }
        }, this.rocketSpawnInterval)
      }
    
      update () {
        //console.log("update triggered ");
        
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0, 0, 0, '+this.clearAlpha/100+')';
        this.ctx.fillRect(0, 0, this.cw, this.ch);
        this.ctx.globalCompositeOperation = 'lighter';
    
        let x: number = null
    
        x = this.rockets.length
        //console.log("rocket length "+x);
        while (x--) {
          //console.log(x);
          this.rockets[x].render()
          this.rockets[x].update(x)
        }
    
        x = this.particles.length
        while (x--) {
          this.particles[x].render()
          this.particles[x].update(x)
        }
        requestAnimationFrame(()=>{
          this.update();
        })
      }
}

