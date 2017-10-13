import {Point} from './point';
import {MyApp} from './app.component';

export class Particle {
    
        positions: Point[]
        position: Point
        velocity: Point
        resistance: number
        gravity: number
        fade: number
        shrink: number
        size: number
        alpha: number
        hue: number
        brightness: number
        decay : any
        wind : any
        lineWidth : any

        shockwaveAngle: any; 
        acceleration: any;
        

        speed : any;

        coordLast : any;
    
        constructor (position: Point, public firework : MyApp) {

            //console.log("particle "+JSON.stringify(position))
    
          this.position = {
              x: position ? position.x : 0,
              y: position ? position.y : 0
          }

          this.coordLast=[
            {x: position ? position.x : 0, y: position ? position.y : 0},
            {x: position ? position.x : 0, y: position ? position.y : 0},
            {x: position ? position.x : 0, y: position ? position.y : 0}
        ]
    
          this.velocity = {
              x: 0,
              y: 0
          }
    
          this.shrink = 0.75;
          this.size = 2;
          this.resistance = 1;
          //this.gravity = 0;
          //this.resistance=1-this.firework.partFriction/100;
          this.gravity=this.firework.partGravity/2;
          this.speed=this.firework.random(((this.firework.partSpeed - this.firework.partSpeedVariance) <= 0) ? 1 : this.firework.partSpeed - this.firework.partSpeedVariance, (this.firework.partSpeed + this.firework.partSpeedVariance)),

          //this.alpha = 1;
          this.alpha=this.firework.random(40,100)/100;
          this.decay=this.firework.random(10, 50)/1000;
          this.wind= (this.firework.random(0, this.firework.partWind) - (this.firework.partWind/2))/25;
          this.lineWidth= this.firework.lineWidth;
          this.fade = 0;

          

          
          //this.hue = Math.random()* (360 - 0) + 0;
          this.hue=this.firework.random(this.firework.currentHue-this.firework.hueVariance,this.firework.currentHue+this.firework.hueVariance)
          this.brightness = Math.random()* (60 - 50) + 50;
          this.shockwaveAngle=(90*(Math.PI/180));
          this.acceleration=this.firework.fworkAccel/100;
    
          this.positions = []
          let positionCount = 3
          while (positionCount--) {
            this.positions.push(position)
          }
        }
    
        update (index: number) {
          this.positions.pop()
          this.positions.unshift({x: this.position.x, y: this.position.y})
          this.velocity.x *= this.resistance
          this.velocity.y *= this.resistance
          this.velocity.y += this.gravity
          this.position.x += this.velocity.x
          this.position.y += this.velocity.y
          this.size *= this.shrink
          this.alpha -= this.fade
          if (!this.exists()) {
            this.firework.particles.splice(index, 1)
          }
        }
    
        render () {
          const lastPosition = this.positions[this.positions.length - 1]
          this.firework.ctx.beginPath()
          this.firework.ctx.moveTo(lastPosition.x, lastPosition.y)
          this.firework.ctx.lineTo(this.position.x, this.position.y)
          this.firework.ctx.lineWidth = this.size
          this.firework.ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`
          this.firework.ctx.stroke()

          if(this.firework.flickerDensity > 0){
            var inverseDensity = 50 - this.firework.flickerDensity;					
            if(this.firework.random(0, inverseDensity) === inverseDensity){
                this.firework.ctx.beginPath();
                this.firework.ctx.arc(Math.round(this.position.x), Math.round(this.position.y), this.firework.random(this.firework.lineWidth,this.firework.lineWidth+3)/2, 0, Math.PI*2, false)
                this.firework.ctx.closePath();
                var randAlpha = this.firework.random(50,100)/100;
                this.firework.ctx.fillStyle = 'hsla('+this.hue+', 100%, '+this.brightness+'%, '+randAlpha+')';
                this.firework.ctx.fill();
            }	
        }
        }
    
        exists () {
          if (this.alpha <= 0.1 || this.size <= 1) {
            return false
          }
    
          if (this.position.x > this.firework.cw || this.position.x < 0) {
            return false
          }
    
          if (this.position.y > this.firework.ch || this.position.y < 0) {
            return false
          }
    
          return true
        }
    
      }
    