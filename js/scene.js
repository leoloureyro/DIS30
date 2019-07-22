class Scene{
  constructor(element){
    // Escena
    this.element = document.getElementById(element); // Recibe ID del elemento escena
    this.minSceneWidth = 800; // Ancho mínimo para las animaciones del cursor

    // Controles de foco
    this.depthOnFocus = this.depthFocusDefault = () => {
      let allSceneElements = element.querySelectorAll("div");
      let maxDepthValue = 0;
      for(let elem of allSceneElements){
        let thisDepth = elem.getAttribute("depth");
        if (thisDepth > maxDepthValue){
          maxDepthValue = thisDepth;
        }
      };
      return maxDepthValue;
    };

    // Elementos en la escena
    this.allSceneElements = this.element.querySelectorAll("div");
    this.allSceneObjects = [];
    for(let elem of this.allSceneElements){
      this.allSceneObjects.push(new SceneElement(elem));
      elem.addEventListener("mouseenter", ()=>{
        this.changeSceneFocus(elem.getAttribute("depth"));
      });
      elem.addEventListener("mouseout", ()=>{
        this.changeSceneFocus(this.depthFocusDefault);
      });
    };

    // Renderizar puesta en escena
    this.changeSceneFocus(this.depthOnFocus);
    this.changeSceneAngle();

    // Inicializar events handlers
    this.sceneEventsHandler();
  }

  // Control de eventos en la escena
  sceneEventsHandler(){
    this.xMousePos = this.element.offsetWidth / 2;
    this.yMousePos = this.element.offsetHeight / 2;

    if(window.innerWidth > this.minSceneWidth){
      window.addEventListener("mousemove", (event) => {
        this.xMousePos = event.clientX;
        this.yMousePos = event.clientY;
        this.changeSceneAngle();
      });
      window.addEventListener("scroll", () => {
        this.changeSceneAngle();
      })
    }
  }

  // Control de efectos en la escena
  changeSceneFocus(depth){
    for(let obj of this.allSceneObjects){
      obj.renderBlur(depth);
    }
  };
  changeSceneAngle(){
    let x = (this.element.offsetWidth / 2) - this.xMousePos;
    let y = (this.element.offsetHeight / 2) - this.yMousePos - (window.scrollY * 2);

    for(let obj of this.allSceneObjects){
      obj.setTransform(x, y);
    }
  };
}

class SceneElement {
  constructor(element){
    this.element = element;
    this.depth = element.getAttribute("depth");
    this.angle = element.getAttribute("rotation") || 0;
    this.element.style.transform = `rotate(${this.angle}deg)`;
  }
  // Controles de efectos en el elemento
  renderBlur(depth){
    let amount = Math.abs(depth - this.depth);
    this.element.style.filter = `blur(${amount}px)`;
  }
  setTransform(x, y){
    let amount = 0.3 / this.depth; // Sensibilidad
    this.element.style.transform = `translate(${x*amount}px, ${y*amount}px) rotate(${this.angle}deg)`;
  }
}
