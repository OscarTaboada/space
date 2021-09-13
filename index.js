// variables
var canvas = document.getElementById("canvas")
var contexto = canvas.getContext("2d") 
var fondo = "sprite/Fondo.png" 
var nave = "sprite/nave.png"
var Meteoro = "sprite/Meteoro.png"
var fps = 0
var cajaMeteoros = []
// clases 
class Escenario{
    constructor (){
        this.width = canvas.width
        this.height = canvas.height
        
        this.x = 0
        this.y = 0
        
        this.imagen = new Image()
        this.imagen.src = fondo
        this.imagen.onload = this.draw

    }
    draw =()=>{
        contexto.drawImage(this.imagen,this.x,this.y,this.width,this.height)
    }
}

class Player{
   constructor(){
       this.height = 60
       this.width = 35

       this.x = 0
       this.y = canvas.height - this.height-5

       this.imagen = new Image()
       this.imagen.src = nave
       this.imagen.onload = this.draw
        
    }
    draw =()=> {
        if(this.x < 10)
          this.x = 10 
        if(this.x >755)
          this. x = 755
        contexto.drawImage(this.imagen,this.x,this.y,this.width,this.height)
    }
    moverse = (direccion)=>{
       switch(direccion){
           case 1:this.x = this.x + 20;break;
           case 2:this.x = this.x - 20;break;
           default:
           this.x = this.x; 
       }
    } 
    morir=(Meteoro)=>{
        return(this.x-5< Meteoro.x + Meteoro.width)&&
        (this.x + this.width-5>Meteoro.x)&&
        (this.y+5< Meteoro.y + Meteoro.height)&&
        (this.y+this.height+5>Meteoro.y);
    }
} 
class Meteors extends Player{
    constructor(coordex){
        super()
        this.x = coordex ;
        this.y =0;
        this.imagen.src = Meteoro
        this.imagen.onload = this.draw
    }
    draw =()=> {
        this.y = this.y +4
        contexto.drawImage(this.imagen,this.x,this.y,this.width,this.height)
    }
}

//instancias
var Fondo = new Escenario()
var Nave = new Player()

//funiones
function update(){
    contexto.clearRect(0,0,canvas.width,canvas.height)
    fps++
    Fondo.draw()
    Nave.draw()
    generadorMeteoros()
    drawMeteoros()
    checkCollition()
}
function mensaje(){
    var opcion = confirm("Reiniciar Juego")
    if(opcion == true){
        location.reload(true)
    } else{
        contexto.font = "40px Comic Sans MS,arial,verdana"
        contexto.fillStyle = 'rgb(0, 0, 0)'
        contexto.fillText("GAME OVER",300,100)
        clearInterval(cronometro)
        boton = '<input type="button" class="btn" onclick="reiniciar()" value="REINICIAR JUEGO">'
        document.getElementById("iniciar").innerHTML=boton;
    }
}
function generadorMeteoros(){
    if(fps%10 ===0){
        var coordx = Math.floor(Math.random()*(0-765))+765;
        cajaMeteoros.push(new Meteors(coordx))
    }
}
function drawMeteoros(){
    cajaMeteoros.forEach(function(Meteoro){
        Meteoro.draw()
    })
}
function checkCollition(){
    cajaMeteoros.forEach(
        Meteors=>{
            if(Nave.morir(Meteors)){
                alert("Chocaste con un meteoro")
                clearInterval(interval)
                mensaje()
            }
        }  
    )
}
// CRONONOMETRO
function carga()
           {
             contador_s = 0;
             contador_m = 0;
             s = document.getElementById("segundos");
             m = document.getElementById("minutos");

             cronometro = setInterval(
               function(){
                if(contador_s==60){
                  contador_s=0;
                  contador_m++;
                  m.innerHTML = contador_m;
                  if(contador_m==0){
                    contador_m=0
                  }
                }
                s.innerHTML = contador_s;
                contador_s++;
               },1000
             )
           }
//Iniciar Juego
function start(){
    carga();
    interval = setInterval(update,1000/60)
}

// Reiniciar Juego
function reiniciar(){
    location.reload();
}

//eventos de teclado p movimiento
addEventListener("keydown",function(e){
    if(e.keyCode === 37 || e.keyCode === 65){//izquierda
        Nave.moverse(2);
        console.log("x:"+Nave.x);
    }
    if(e.keyCode === 39 || e.keyCode === 68){//derecha
        Nave.moverse(1);
        console.log("x:"+Nave.x);
    }
})
// go 
// start()