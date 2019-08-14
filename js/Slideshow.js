class Slideshow {
  constructor(elem){
    this.element = elem;
    this.slides = this.element.querySelectorAll("slide");
    this._currentSlide = 0;
    this._animationType = this.element.getAttribute("animation") || "opacity";
    this._animationDuration = parseInt(this.element.getAttribute("duration")) || 500;
    this._animationDelay = parseInt(this.element.getAttribute("autoplay")) || 0;
    // SLIDES STYLE
    for(let slide of this.slides){
      if(this._animationDuration != 500){
        slide.style.animationDuration = `${this._animationDuration / 1000}s`;
      }
    }
    // FIRST SLIDE
    this.slides[this._currentSlide].style.display = "flex";
    if(this._animationType == "width") this.slides[this._currentSlide].style.right = "0px";
    if(this._animationDelay > 0){
      this.continue = setTimeout(()=>{
        this.nextSlide();
      }, this._animationDuration + this._animationDelay)
    }
    // CONTROLS
    if(this.element.hasAttribute("controls")){
      let next = document.createElement("next");
      let prev = document.createElement("prev");
      this.element.appendChild(next);
      this.element.appendChild(prev);
      next.addEventListener("click", ()=>{
        this.nextSlide();
      });
      prev.addEventListener("click", ()=>{
        this.prevSlide();
      })
    };
    // THUMBNAILS
    if(this.element.hasAttribute("thumbnails")){
      let thumbnails = document.createElement("thumbnails");
      for(let i = 0; i < this.slides.length; i++){
        let thumb = document.createElement("thumb");
        thumb.addEventListener("click", ()=>{
          if(this._currentSlide != i){
            this.makeTransition(this._currentSlide, i)
            this._currentSlide = i;
          }
        })
        thumbnails.appendChild(thumb);
      }
      this.element.appendChild(thumbnails);
      this.element.querySelectorAll("thumb")[this._currentSlide].setAttribute("active", "");
    };
    // DRAG ACTION
    let mouseDragAction = event => {
      let endsAt = event.clientX;
      if(Math.abs(this.dragStartsAt - endsAt) > 100){
        if(this.dragStartsAt > endsAt){
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
      this.element.removeEventListener("mouseup", mouseDragAction);
    }
    this.element.addEventListener("mousedown", event => {
      this.dragStartsAt = event.clientX;
      this.element.addEventListener("mouseup", mouseDragAction)
    })
    let touchDragAction = event => {
      let endsAt = event.changedTouches[0].screenX;
      if(Math.abs(this.dragStartsAt - endsAt) > 100){
        if(this.dragStartsAt > endsAt){
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
      this.element.removeEventListener("touchend", touchDragAction);
    }
    this.element.addEventListener("touchstart", event => {
      this.dragStartsAt = event.changedTouches[0].screenX;
      this.element.addEventListener("touchend", touchDragAction)
    })

    return true;
  }

  nextSlide(){
    this.element.style.pointerEvents = "none"; // DESACTIVA LOS EVENTOS
    let nextSlide = this._currentSlide + 1;
    if(nextSlide == this.slides.length){
      nextSlide = 0;
    }
    if(this._animationType == "width") this.slides[nextSlide].style.right = "0px";
    this.makeTransition(this._currentSlide, nextSlide);
    this._currentSlide = nextSlide;
  }
  prevSlide(){
    this.element.style.pointerEvents = "none"; // DESACTIVA LOS EVENTOS
    let prevSlide = this._currentSlide - 1;
    if(prevSlide < 0){
      prevSlide = this.slides.length - 1;
    }
    if(this._animationType == "width") this.slides[prevSlide].style.left = "0px";
    this.makeTransition(this._currentSlide, prevSlide);
    this._currentSlide = prevSlide;
  }
  makeTransition(from, to){
    clearTimeout(this.continue);
    let fromSlide = this.slides[from];
    let toSlide = this.slides[to];
    toSlide.style.zIndex = 1;
    toSlide.style.display = "flex";
    setTimeout(()=>{
      toSlide.style.zIndex = "";
      fromSlide.style.display = "";
      fromSlide.style.right = "";
      fromSlide.style.left = "";
      this.element.style.pointerEvents = "auto"; // ACTIVA LOS EVENTOS
      if(this._animationDelay > 0){
        this.continue = setTimeout(()=>{
          this.nextSlide();
        }, this._animationDelay)
      }
    }, this._animationDuration)
    if(this.element.hasAttribute("thumbnails")){
      this.element.querySelector("thumb[active]").removeAttribute("active");
      this.element.querySelectorAll("thumb")[to].setAttribute("active", "");
    }

    return true;
  }
}
var slideshowObj = {"found":0, "success":0, "errors":0, "instances":[]}
for(let slideshow of document.querySelectorAll("slideshow")){
  slideshowObj.found++;
  if(slideshowObj.instances[slideshowObj.instances.length] = new Slideshow(slideshow)){
    slideshowObj.success++;
  } else {
    slideshowObj.errors++;
  };
}
if(slideshowObj.success > 0){
  let style = document.createElement('style');
  style.setAttribute("id", "og-ve--default");
  style.innerHTML =
    `@keyframes slideshow-opacity {
      from {opacity:0;}
      to {opacity:1;}
    }
    @keyframes slideshow-width {
      from {width:0%;}
      to {width:100%;}
    }
    slideshow{
      position: relative;
      display: block;
    }
    slideshow slide, slideshow[animation="opacity"] slide{
      animation-name: slideshow-opacity;
    }
    slideshow[animation="width"] slide{
      animation-name: slideshow-width;
    }
    slideshow[animation="none"] slide{
      animation-name: none;
    }
    slide{
      position: absolute;
      display: none;
      height: 100%;
      width: 100%;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-timing-function: ease;
      z-index: 0;
    }
    prev, next{
      position: absolute;
      top: 50%;
      margin-top: -15px;
      z-index: 2;
    }
    prev{
      left: 20px;
      border-right: solid 15px lightgray;
      border-top: solid 15px rgba(0,0,0,0);
      border-bottom: solid 15px rgba(0,0,0,0);
    }
    next{
      right: 20px;
      border-left: solid 15px lightgray;
      border-top: solid 15px rgba(0,0,0,0);
      border-bottom: solid 15px rgba(0,0,0,0);
    }
    thumbnails{
      position: absolute;
      display: block;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
      z-index: 2;
    }
    thumb{
      position: relative;
      display: inline-block;
      height: 10px;
      width: 10px;
      border: solid 3px lightgray;
      border-radius: 10px;
      margin: 5px;
    }
    thumb[active]{
      background-color: lightgray;
    }`;
  document.querySelector("head").insertBefore(style, document.querySelector("head link"));
}
