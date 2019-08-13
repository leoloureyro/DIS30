class Loader {
  constructor(){
    this.resources = [];
    this.loaded = this.percentage = 0;
    this._onChange = ()=>false;
    this._onLoad = ()=>false;
  }

  evalPercentage(){
    this.percentage = Math.round((100 / this.resources.length) * this.loaded);
    if(this.percentage){
      // código al aumentar el porcentaje
      return this._onChange();
    }
  }
  exit(){
    // código al finalizar la carga
    return this._onLoad();
  }

  set addResources(resourcesArray){
    for(let resource of resourcesArray){
      if(!this.resources.includes(resource)) this.resources.push(resource);
    }
    return this;
  }
  set onChange(fx){
    this._onChange = fx;
    return this;
  }
  set onLoad(fx){
    this._onLoad = fx;
    return this;
  }
}


class ImgLoader extends Loader {
  constructor(autosearch = true, autoinit = 0){
    super();
    this.imgObj = new Image();
    if(autosearch === true){
      // Cargar tags IMG
      for(let img of document.getElementsByTagName("img")){
        let resource = img.getAttribute("src");
        if(!this.resources.includes(resource)) this.resources.push(resource);
      };
      // Cargar background-images
      let tagsWithBg = ["body", "header", "section", "article", "footer", "div"];
      for(let tag of tagsWithBg){
        for(let elem of document.getElementsByTagName(tag)){
          let resource = "";
          if(elem.style.backgroundImage != ""){ // Para background-images inline
            let backgroundImg = elem.style.backgroundImage;
            if(backgroundImg.startsWith("url")){
              resource = backgroundImg.substring(4, backgroundImg.length - 1);
              resource = resource.replace(/['"]+/g, '');
            }
          } else { // Para background-images por sheets
            let backgroundImg = getComputedStyle(elem).backgroundImage;
            if(backgroundImg.startsWith("url")){
              resource = backgroundImg.substring(4, backgroundImg.length - 1);
              resource = resource.replace(/['"]+/g, '');
            }
          }
          if(resource != "" && !this.resources.includes(resource)) this.resources.push(resource);
        };
      }
    }
    if(autoinit > 0){
      setTimeout(()=>{
        if(this._onLoad !== false){
          this.init();
        }
      }, autoinit);
    }
    return this;
  }

  init(){
    if(this.resources.length > 0 && this.loaded < this.resources.length){
      this.imgObj.src = this.resources[this.loaded];
      this.loaded++;
      this.evalPercentage();
      this.imgObj.onLoad = this.init();
    } else {
      this.exit();
    }
  }
}

class VideoLoader extends Loader {
  constructor(autosearch = true, autoinit = 0){
    super();
    this.element = document.createElement('video');
    if(autosearch === true){
      let videoElements = document.getElementsByTagName("video");
      for(let video of videoElements){
        if(video.getAttribute("src")){
          this.resources.push(video.getAttribute("src"));
        } else {
          let sources = video.getElementsByTagName("source");
          for(let source of sources){
            this.resources.push(source.getAttribute("src"));
          }
        }
      }
    };
    if(autoinit > 0){
      setTimeout(()=>{
        if(this._onLoad !== false){
          this.init();
        }
      }, autoinit);
    }
    return this;
  }

  init(){
    if(this.resources.length > 0 && this.loaded < this.resources.length){
      this.element.src = this.resources[this.loaded];
      this.element.autoplay = true;
      this.element.oncanplaythrough = ()=>{
        this.loaded++;
        this.evalPercentage();
        this.init();
      };
    } else {
      this.exit();
    }
  }
}

class AudioLoader extends Loader {
  constructor(autosearch = true, autoinit = 0){
    super();
    this.element = document.createElement('audio');
    if(autosearch === true){
      let audioElements = document.getElementsByTagName("audio");
      for(let audio of audioElements){
        if(audio.getAttribute("src")){
          this.resources.push(audio.getAttribute("src"));
        } else {
          let sources = audio.getElementsByTagName("source");
          for(let source of sources){
            this.resources.push(source.getAttribute("src"));
          }
        }
      }
    };
    if(autoinit > 0){
      setTimeout(()=>{
        if(this._onLoad !== false){
          this.init();
        }
      }, autoinit);
    }
    return this;
  }

  init(){
    if(this.resources.length > 0 && this.loaded < this.resources.length){
      this.element.src = this.resources[this.loaded];
      this.element.autoplay = true;
      this.element.oncanplaythrough = ()=>{
        this.loaded++;
        this.evalPercentage();
        this.init();
      };
    } else {
      this.exit();
    }
  }
}
