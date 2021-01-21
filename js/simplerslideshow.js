class Slideshow {
  constructor(elem){
    this.element = elem;
    this.slides = this.element.querySelectorAll("slide");
    this._currentSlide = 0;
    this._animationDelay = parseInt(this.element.getAttribute("autoplay")) || 0;
    this._state;

    this.slides[this._currentSlide].setAttribute("active", "");

    if(this._animationDelay > 0){
      this._state = setTimeout(() => {
        this.next();
      }, this._animationDelay);
    }

    if(this.element.querySelector("button[type='prev']")){
      this.assign("prev", this.element.querySelector("button[type='prev']"));
    }
    if(this.element.querySelector("button[type='next']")){
      this.assign("next", this.element.querySelector("button[type='next']"));
    }
  }

  assign(action, elem){
    elem.addEventListener("click", () =>{
      this[action]();
    })
  }

  prev(){
    if (--this._currentSlide < 0) this._currentSlide = this.slides.length - 1;
    this.changeSlide();
  }

  next(){
    if (++this._currentSlide >= this.slides.length) this._currentSlide = 0;
    this.changeSlide();
  }

  changeSlide(){
    this.element.querySelector("slide[active]").removeAttribute("active");
    this.slides[this._currentSlide].setAttribute("active", "");

    if(this._animationDelay > 0){
      clearTimeout(this._state);
      this._state = setTimeout(() => {
        this.next();
      }, this._animationDelay);
    }
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
