// Preloader for website
var percent = document.querySelector('.percent');
var progress = document.querySelector('.progress');
var load = document.querySelector('.loading');
// Computer Loader
var computerLoading = document.querySelector('.pc-loading');
var computerProgress = document.querySelector('.loading-progress');
var computerPercent = document.querySelector('.loading-text');
// Computer related elements
var computer = document.getElementById('computer');
var pcImg = document.getElementById('pc-graphic');
var headingOne = document.getElementById("heading-1");
var monitorBtn = document.getElementById("monitor-btn");
var monitorLight = document.getElementById("monitor-light");
var overlay = document.getElementById("dim-screen");
var screenLight = document.getElementById("screen-on");
// Preloader globals
var count = 4;
var per = 16;
var loading = setInterval(Animate, 10);


monitorBtn.addEventListener('click', CheckLight);

monitorBtn.addEventListener('click', function(){
    sleep(2500).then(() => {
        if (monitorLight.style.visibility == "hidden"){
            count = 4; per = 16;
            setInterval(AnimatePC, 40);
        }
    })
});
    
window.addEventListener('load', function(){
    load.style.display = 'none';
    LoadDom('flex');
    gsap.from(computer, {duration: 2, x:-1000});
    gsap.from('#instructions',{duration: 3, y: 400, scale: 1.2});
    gsap.from(headingOne, {duration: 2, x: 900, rotation: 10});
});


function Animate(){
    if (count == 100){
        clearInterval(loading);

    }
    else {
        per = per+ 4;
        count = count + 1;
        progress.style.width = per + 'px';
        percent.textContent = count + '%';
    }
}

function AnimatePC(){
    SetVisibility(computerLoading, "visible");
    if (count == 100){
        clearInterval(computerLoading);
        computerLoading.style.visibility = "hidden";
    }
    else {
        per = per+ 4;
        count = count + 2;
        computerProgress.style.width = per + 'px';
    }
}
// Set sleeper timer

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

function FadeOutHeadingOne(duration){
    const to = { opacity: 0, ease: Linear.ease };
    const from = { opacity: 1 };
    TweenLite.fromTo(headingOne, duration, from, to);
}

function LoadDom(displayType){
    computer.style.display = displayType;
    headingOne.style.display = displayType;
}

function CheckLight(){
    (monitorLight.style.visibility == "hidden") ? SetVisibility(monitorLight, "visible") : SetVisibility(monitorLight, "hidden");
    (overlay.style.visibility == "visible") ? LightOverlayOff() : LightOverlayOn();
    (screenLight.style.visibility == "visible") ? ScreenOff() : ScreenOn();
}

function SetVisibility(element, flag){
    element.style.visibility = flag;
}

// to do: move to css and manipulate classes
function LightOverlayOn() {
    overlay.style.visibility = "visible";
    overlay.style.transition = "background 2s linear 0s";
    overlay.style.background = "rgba(0, 0, 0, 0.9)";
    DimOn(pcImg, 10);
    DimOn(monitorBtn, 10);
    FadeOutHeadingOne(2);
}

function LightOverlayOff() {
    overlay.style.background = "rgba(0, 0, 0, 0)";
    overlay.style.visibility = 'hidden';
    headingOne.style.opacity = 1;
    DimOff(pcImg);
    DimOff(monitorBtn);
}

function ScreenOn(){
    screenLight.style.visibility = "visible";
    var duration = 3;
    const to = { opacity: 1,  ease: Linear  };
    const from = { opacity: 0 };
    TweenLite.fromTo(screenLight, duration, from, to);
}

function ScreenOff(){
    screenLight.style.visibility = "hidden";
}

function DimOn(div, brightlevel){
    var duration = 2;
    const to = { filter:`brightness(${brightlevel}%)`, ease: Linear  };
    const from = { filter:"brightness(100%)" };
    TweenLite.fromTo(div, duration, from, to);
}

function DimOff(div){
    div.style.filter = "brightness(100%)";
}


