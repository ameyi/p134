random = ""
status1 = ""
objects = []
function preload(){
    random = loadImage("livingroom.jpeg")
}
function setup(){
    canvas = createCanvas(640, 480)
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function draw(){
    image(random, 0, 0, 640, 480)
    if(status1 != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill("#00FFFF")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label+" "+percent+ "%", objects[i].x, objects[i].y)
            noFill()
            stroke("#00FFFF")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
    
}
function modelLoaded(){
    console.log("Model has been loaded")
    status1 = true;
    objectDetector.detect(random, gotResult)
}
function gotResult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        objects = results;
    }
}
function home(){
    window.location.replace("index.html")
}