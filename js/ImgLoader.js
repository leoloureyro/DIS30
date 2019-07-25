class ImgLoader {
  constructor(...notTaggedResources){
    this.resources = notTaggedResources;
    this.imgObj = new Image();
    this.loaded = this.percentage = 0;
    this._onChange = ()=>false;
    this._onLoad = ()=>false;
    // Cargar tags IMG
    for(let img of document.getElementsByTagName("img")){
      let resource = img.getAttribute("src");
      if(!this.resources.includes(resource)) this.resources.push(resource);
    };
    // Cargar background-images
    let tagsWithBg = ["body", "header", "section", "article", "footer", "div"];
    for(let tag of tagsWithBg){
      for(let elem of document.getElementsByTagName(tag)){
        let backgroundImg = getComputedStyle(elem).backgroundImage;
        if(backgroundImg.startsWith("url")){
          let resource = backgroundImg.substring(4, backgroundImg.length - 1);
          resource = resource.replace(/['"]+/g, '');
          if(!this.resources.includes(resource)) this.resources.push(resource);
        }
      };
    }
    // Beta
    // setTimeout(()=>{
    //   if(this._onLoad !== false){
    //     this.init();
    //   }
    // }, 10);
    return this;
  }

  init(){
    if(this.loaded < this.resources.length){
      this.imgObj.src = this.resources[this.loaded];
      this.loaded++;
      this.evalPercentage();
      this.imgObj.onLoad = this.init();
    } else {
      this.exit();
    }
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

  set onChange(fx){
    this._onChange = fx;
    return this;
  }

  set onLoad(fx){
    this._onLoad = fx;
    return this;
  }
}
