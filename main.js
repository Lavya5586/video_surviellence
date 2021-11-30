status = "";
objects = [];

function setup()
{
    canvas = createCanvas(280, 150);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    bustart = document.getElementById("input").nodeValue;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error,results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 280, 150);

    if (status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("status_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

            fill("#ff0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, object[i].height);
        }
    }
    if(objects[i].label == object_name)
    {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("status_of_object").innerHTML = object_name + "Found";
        utterThis = new SpeechSynthesisUtterance( object_name+ "Found");
        speak(utterThis);
    }
    else
    {
        document.getElementById("status_of_object").innerHTML = object_name + "Not Found";
        utterThis = new SpeechSynthesisUtterance(object_name + "Not Found");
        speak(utterThis);
    }
}