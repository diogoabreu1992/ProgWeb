(function () {

    const FPS = 300;
    const HEIGHT = 300;
    const WIDTH = 1024;
    const PROB_NUVEM = 1;
  
    let gameLoop;
    let dianoiteLoop;
    let deserto;
    let dino;
    let pontuacao;
    let nuvens = [];
    let passaros = [];
    let vcactos = [];
    let frame = 0;
    let parado = 1;
  
    function init() {
      deserto = new Deserto();
      dino = new Dino();
      pontuacao = new Pontuacao();
    }
  
    window.addEventListener("keydown", (e) => {
      console.log(e);
      if (e.code === "Space" || e.code === "ArrowUp") {
        if(parado===1){
          gameLoop = setInterval(run, 1000 / FPS)
          dianoiteLoop = setInterval(dianoite, 10000)
          parado=0;
        }
        if (dino.status === 0) dino.status = 1;
      }
    })
  
    class Deserto {
      constructor() {
        this.element = document.createElement("div")
        this.element.className = "deserto";
        this.element.style.width = `${WIDTH}px`;
        this.element.style.height = `${HEIGHT}px`;
        document.getElementById("game").appendChild(this.element)
  
        this.chao = document.createElement("div")
        this.chao.className = "chao"
        this.chao.style.backgroundPositionX = 0;
        this.element.appendChild(this.chao)

      }
      mover() {
        this.chao.style.backgroundPositionX = `${parseInt(this.chao.style.backgroundPositionX) - 1}px`
      }
      mudar(){
        if(this.element.style.backgroundColor==="antiquewhite"){
          this.element.style.backgroundColor = "black";
        }else{
          this.element.style.backgroundColor = "antiquewhite";
        }
      }
    }
  
    class Dino {
      #status
      constructor() {
        this.backgroundPositionsX = {
          correndo1: "-1391px",
          correndo2: "-1457px",
          agachando: "-1652px",
          pulando: "-1259px"
        }
        this.#status = 0; // 0-correndo, 1-subindo, 2-descendo, 3-agachando
        this.altumaMinima = 2;
        this.altumaMaxima = 150;
        this.element = document.createElement("div")
        this.element.className = "dino";
        this.element.style.backgroundPositionX = this.backgroundPositionsX.correndo1;
        this.element.style.backgroundPositionY = "-2px";
        this.element.style.bottom = `${this.altumaMinima}px`
        deserto.element.appendChild(this.element)
      }
      /**
       * @param {number} value
       */
      set status(value) {
        if (value >= 0 && value <= 3) this.#status = value;
      }
      get status() {
        return this.#status;
      }
      correr() {
        if (this.#status === 0 && frame % 20 === 0) this.element.style.backgroundPositionX = this.element.style.backgroundPositionX === this.backgroundPositionsX.correndo1 ? this.backgroundPositionsX.correndo2 : this.backgroundPositionsX.correndo1;
        else if (this.#status === 1) {
          this.element.style.backgroundPositionX = this.backgroundPositionsX.pulando;
          this.element.style.bottom = `${parseInt(this.element.style.bottom) + 1}px`;
          if (parseInt(this.element.style.bottom) >= this.altumaMaxima) this.status = 2;
        }
        else if (this.#status === 2) {
          this.element.style.bottom = `${parseInt(this.element.style.bottom) - 1}px`;
          if (parseInt(this.element.style.bottom) <= this.altumaMinima) this.status = 0;
        }

      }

    }

    class Cacto {
      constructor() {
        this.backgroundPositionsX = {
          pequeno: "-334px",
          grande: "-563px"
        }
        this.backgroundPositionsY = {
          pequeno: "-1px",
          grande: "-1px"
        }

        this.widths = {
          pequeno: "26px",
          grande: "39px"
        }

        this.height = {
          pequeno: "54px",
          grande: "74px"
        }

        this.element = document.createElement("div")
        this.element.className = "pterossauros";

        if(parseInt(Math.random()*2)===0){
          this.element.style.right = 0;
          this.element.style.width = this.widths.pequeno;
          this.element.style.height = this.height.pequeno;
          this.element.style.backgroundPositionX = this.backgroundPositionsX.pequeno;
          this.element.style.backgroundPositionY = this.backgroundPositionsY.pequeno;
          this.element.style.bottom = "2px"
          deserto.element.appendChild(this.element)
        }else{
          this.element.style.right = 0;
          this.element.style.width = this.widths.grande;
          this.element.style.height = this.height.grande
          this.element.style.backgroundPositionX = this.backgroundPositionsX.grande;
          this.element.style.backgroundPositionY = this.backgroundPositionsY.grande;
          this.element.style.bottom = "2px"
          deserto.element.appendChild(this.element)
        }
      }
      mover() {
        this.element.style.right = `${parseInt(this.element.style.right) + 1}px`; 
      }
    }

    class Pterossauros {
      constructor() {
        this.backgroundPositionsX = {
          voando1: "-191px",
          voando2: "-264px"
        }
        this.backgroundPositionsY = {
          voando1: "-10px",
          voando2: "-1px"
        }

        this.element = document.createElement("div")
        this.element.className = "pterossauros";
        
        this.element.style.right = 0;
        this.element.style.width = "70px";
        this.element.style.height = "62px";
        this.element.style.backgroundPositionX = this.backgroundPositionsX.voando1;
        this.element.style.backgroundPositionY = this.backgroundPositionsY.voando1;
        this.element.style.bottom = `${parseInt((Math.random() * 2)*70-13)}px`
        deserto.element.appendChild(this.element)
      }
      mover() {
        if (frame % 50 === 0) {
          if(this.element.style.backgroundPositionX ===this.backgroundPositionsX.voando1){
            this.element.style.backgroundPositionX = this.backgroundPositionsX.voando2;
            this.element.style.backgroundPositionY = this.backgroundPositionsY.voando2;

          }else{
            this.element.style.backgroundPositionX = this.backgroundPositionsX.voando1;
            this.element.style.backgroundPositionY = this.backgroundPositionsY.voando1;
          }
        }
        this.element.style.right = `${parseInt(this.element.style.right) + 1}px`; 
      }

    }
  
    class Nuvem {
      constructor() {
        this.element = document.createElement("div");
        this.element.className = "nuvem";
        this.element.style.right = 0;
        this.element.style.top = `${parseInt(Math.random() * 200)}px`
        deserto.element.appendChild(this.element);
      }
      mover() {
        this.element.style.right = `${parseInt(this.element.style.right) + 1}px`;
      }
    }



    class Pontuacao {
        #pontos
        constructor() {
            this.backgroundPositionsX = {
                zero: "-969px",
                um: "-985px",
                dois: "-1000px",
                tres: "-1015px",
                quatro: "-1030px",
                cinco: "-1045px",
                seis: "-1060px",
                sete: "-1075px",
                oito: "-1090px",
                nove: "-1105px"
            }

            this.#pontos = 0;
            this.element = document.createElement("div")
            this.element.className = "pontuacao"


            this.ponto1 = document.createElement("div")
            this.ponto1.className = "ponto"
            this.ponto1.style.backgroundPositionX = this.backgroundPositionsX.zero;
            this.element.appendChild(this.ponto1)
            this.ponto2 = document.createElement("div")
            this.ponto2.className = "ponto"
            this.ponto2.style.backgroundPositionX = this.backgroundPositionsX.zero;
            this.element.appendChild(this.ponto2)
            this.ponto3 = document.createElement("div")
            this.ponto3.className = "ponto"
            this.ponto3.style.backgroundPositionX = this.backgroundPositionsX.zero;
            this.element.appendChild(this.ponto3)
            this.ponto4 = document.createElement("div")
            this.ponto4.className = "ponto"
            this.ponto4.style.backgroundPositionX = this.backgroundPositionsX.zero;
            this.element.appendChild(this.ponto4)
            this.ponto5 = document.createElement("div")
            this.ponto5.className = "ponto"
            this.ponto5.style.backgroundPositionX = this.backgroundPositionsX.zero;
            this.element.appendChild(this.ponto5)

            deserto.element.appendChild(this.element)
        }
        /**
         * @param {number} value
         */
        set pontos(value) {
          this.#pontos = value;
        }
        get pontos() {
          return this.#pontos;
        }
        pontuar() {
          if (frame % 30 === 0){
            this.#pontos = `${parseInt(this.#pontos) + 1}px`;
            let n = parseInt(this.#pontos);
            
            switch (n%10) {
              case 0:
                this.ponto1.style.backgroundPositionX = this.backgroundPositionsX.zero;
                break;
              case 1:
                this.ponto1.style.backgroundPositionX = this.backgroundPositionsX.um;
                break;
              case 2:
                this.ponto1.style.backgroundPositionX = this.backgroundPositionsX.dois;
                break;
              case 3:
                this.ponto1.style.backgroundPositionX = this.backgroundPositionsX.tres;
                break;
              case 4:
                this.ponto1.style.backgroundPositionX = this.backgroundPositionsX.quatro;
                break;
              case 5:
                this.ponto1.style.backgroundPositionX = this.backgroundPositionsX.cinco;
                break;
              case 6:
                this.ponto1.style.backgroundPositionX = this.backgroundPositionsX.seis;
                break;
              case 7:
                this.ponto1.style.backgroundPositionX = this.backgroundPositionsX.sete;
                break;
              case 8:
                this.ponto1.style.backgroundPositionX = this.backgroundPositionsX.oito;
                break;
              case 9:
                this.ponto1.style.backgroundPositionX = this.backgroundPositionsX.nove;
                break;
              default:
            }
            switch ((n%100)/10) {
              case 0:
                this.ponto2.style.backgroundPositionX = this.backgroundPositionsX.zero;
                break;
              case 1:
                this.ponto2.style.backgroundPositionX = this.backgroundPositionsX.um;
                break;
              case 2:
                this.ponto2.style.backgroundPositionX = this.backgroundPositionsX.dois;
                break;
              case 3:
                this.ponto2.style.backgroundPositionX = this.backgroundPositionsX.tres;
                break;
              case 4:
                this.ponto2.style.backgroundPositionX = this.backgroundPositionsX.quatro;
                break;
              case 5:
                this.ponto2.style.backgroundPositionX = this.backgroundPositionsX.cinco;
                break;
              case 6:
                this.ponto2.style.backgroundPositionX = this.backgroundPositionsX.seis;
                break;
              case 7:
                this.ponto2.style.backgroundPositionX = this.backgroundPositionsX.sete;
                break;
              case 8:
                this.ponto2.style.backgroundPositionX = this.backgroundPositionsX.oito;
                break;
              case 9:
                this.ponto2.style.backgroundPositionX = this.backgroundPositionsX.nove;
                break;
              default:
            }
            switch ((n%1000)/100) {
              case 0:
                this.ponto3.style.backgroundPositionX = this.backgroundPositionsX.zero;
                break;
              case 1:
                this.ponto3.style.backgroundPositionX = this.backgroundPositionsX.um;
                break;
              case 2:
                this.ponto3.style.backgroundPositionX = this.backgroundPositionsX.dois;
                break;
              case 3:
                this.ponto3.style.backgroundPositionX = this.backgroundPositionsX.tres;
                break;
              case 4:
                this.ponto3.style.backgroundPositionX = this.backgroundPositionsX.quatro;
                break;
              case 5:
                this.ponto3.style.backgroundPositionX = this.backgroundPositionsX.cinco;
                break;
              case 6:
                this.ponto3.style.backgroundPositionX = this.backgroundPositionsX.seis;
                break;
              case 7:
                this.ponto3.style.backgroundPositionX = this.backgroundPositionsX.sete;
                break;
              case 8:
                this.ponto3.style.backgroundPositionX = this.backgroundPositionsX.oito;
                break;
              case 9:
                this.ponto3.style.backgroundPositionX = this.backgroundPositionsX.nove;
                break;
              default:
            }
            switch ((n%10000)/1000) {
              case 0:
                this.ponto4.style.backgroundPositionX = this.backgroundPositionsX.zero;
                break;
              case 1:
                this.ponto4.style.backgroundPositionX = this.backgroundPositionsX.um;
                break;
              case 2:
                this.ponto4.style.backgroundPositionX = this.backgroundPositionsX.dois;
                break;
              case 3:
                this.ponto4.style.backgroundPositionX = this.backgroundPositionsX.tres;
                break;
              case 4:
                this.ponto4.style.backgroundPositionX = this.backgroundPositionsX.quatro;
                break;
              case 5:
                this.ponto4.style.backgroundPositionX = this.backgroundPositionsX.cinco;
                break;
              case 6:
                this.ponto4.style.backgroundPositionX = this.backgroundPositionsX.seis;
                break;
              case 7:
                this.ponto4.style.backgroundPositionX = this.backgroundPositionsX.sete;
                break;
              case 8:
                this.ponto4.style.backgroundPositionX = this.backgroundPositionsX.oito;
                break;
              case 9:
                this.ponto4.style.backgroundPositionX = this.backgroundPositionsX.nove;
                break;
              default:
            }
            switch ((n%100000)/10000) {
              case 0:
                this.ponto5.style.backgroundPositionX = this.backgroundPositionsX.zero;
                break;
              case 1:
                this.ponto5.style.backgroundPositionX = this.backgroundPositionsX.um;
                break;
              case 2:
                this.ponto5.style.backgroundPositionX = this.backgroundPositionsX.dois;
                break;
              case 3:
                this.ponto5.style.backgroundPositionX = this.backgroundPositionsX.tres;
                break;
              case 4:
                this.ponto5.style.backgroundPositionX = this.backgroundPositionsX.quatro;
                break;
              case 5:
                this.ponto5.style.backgroundPositionX = this.backgroundPositionsX.cinco;
                break;
              case 6:
                this.ponto5.style.backgroundPositionX = this.backgroundPositionsX.seis;
                break;
              case 7:
                this.ponto5.style.backgroundPositionX = this.backgroundPositionsX.sete;
                break;
              case 8:
                this.ponto5.style.backgroundPositionX = this.backgroundPositionsX.oito;
                break;
              case 9:
                this.ponto5.style.backgroundPositionX = this.backgroundPositionsX.nove;
                break;
              default:
            }

          } 

        }
    }

    function run() {
      frame = frame + 1
      deserto.mover()
      dino.correr()
      pontuacao.pontuar();
      if (Math.random() * 100 <= PROB_NUVEM) nuvens.push(new Nuvem());
      if (frame % 2 === 0) nuvens.forEach(nuvem => nuvem.mover());
      if (frame%350==0) passaros.push(new Pterossauros());
      passaros.forEach( pterossauros=> pterossauros.mover());
      if (frame%500==0) vcactos.push(new Cacto());
      vcactos.forEach( cacto=> cacto.mover());
    }

    function dianoite() {
      gameLoop = setInterval(run, 1000 / FPS)
      deserto.mudar()
    }
  
    init()
  
  })()
