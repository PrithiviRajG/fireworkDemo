import {Particle} from './particle';
import {MyApp} from './app.component';

export class Rocket extends Particle {
    
        constructor (public firework : MyApp) {
          
            
          super({x: (firework.cw/2) , y: firework.ch}, firework);
          //console.log("rocket fired");
          let minVelX : any=-3;
          let maxVelX : any=0;
          let minVelY : any=0;
          let maxVelY : any=6;
          this.velocity.y = Math.random()*(maxVelX-minVelX) + minVelX - 4
          this.velocity.x = Math.random()*(maxVelY-minVelY) + minVelY - 3
          this.size = 3
          this.shrink = 0.999
          this.gravity = 0.01
          this.fade = 0
          
        }
    
        update (index: number) {
          super.update(index)
    
          if (this.position.y <= this.firework.ch * (1 - this.firework.explosionHeight) && Math.random() <= this.firework.explosionChance) {
            this.explode()
            this.firework.rockets.splice(index, 1)
          }
    
        }
    
        explode () {
          const count = Math.random()*10 + this.firework.numParticles
    
          for (let i = 0; i < count; i += 1) {
    
            const particle = new Particle(this.position,this.firework)
            const angle = Math.random()*this.firework.TAU;
    
            const speed = Math.cos(Math.random()*this.firework.TAU) * 15
    
            particle.velocity.x = Math.cos(angle) * speed
            particle.velocity.y = Math.sin(angle) * speed
            particle.size = 3
            particle.gravity = 0.2
            particle.resistance = 0.92
            particle.shrink = Math.random()*0.05 + 0.93
            particle.hue = this.hue
            particle.brightness = this.brightness
            this.firework.particles.push(particle)
    
          }

         
          
         
            
          if(this.firework.showShockwave){
            this.firework.ctx.save();
            this.firework.ctx.translate(Math.round(this.firework.cw), Math.round(this.firework.ch));
            this.firework.ctx.rotate((90*(Math.PI/180)));
            this.firework.ctx.beginPath();
            this.firework.ctx.arc(0, 0, 1*(this.speed/5), 0, Math.PI, true);
            //this.firework.ctx.strokeStyle = 'hsla('+this.hue+', 100%, '+this.brightness+'%, '+this.firework.random(25, 60)/100+')';
            this.firework.ctx.lineWidth = this.lineWidth;
            this.firework.ctx.stroke();
            this.firework.ctx.restore();
          }
        }
      }