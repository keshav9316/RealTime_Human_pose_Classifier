let video;
let poseNet;
let pose; 
let skeleton;

function setup(){
    createP('HUMAN POSE CLASSIFIER ( Try to get full body in the frame)');
    createCanvas(720,600);
    video = createCapture(VIDEO);
    video.hide(); 
    background(240);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}
 
function gotPoses(poses){
    console.log(poses);
    if(poses.length>0){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded(){
    console.log('ready');
}

function draw(){ 
    // translate(width,0);
    // scale(-1,1);
    image(video,0,0,width,height);
    if(pose){

        let righteye=pose.rightEye;
        let lefteye=pose.leftEye;
        let distance = dist(righteye.x,righteye.y,lefteye.x,lefteye.y);


    fill(255,0,0);
    ellipse(pose.nose.x, pose.nose.y,distance);
    fill(255,255,0);
    ellipse(pose.rightWrist.x, pose.rightWrist.y,distance);
    fill(255,0,255);
    ellipse(pose.leftWrist.x, pose.leftWrist.y,distance);

    for(let i=0; i<pose.keypoints.length; i++){
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        fill(0,255,0);
        ellipse(x,y,16,16);
        // display body part name
        //let bodypart = pose.keypoints[i].part;
      //  textSize(20);
        //text(bodypart, x, y);
        // display accuracy
        // let score = pose.keypoint[i].score;
        // text(score, x, y);

    }

      for(let i=0; i<skeleton.length ; i++){
          let x0 = skeleton[i][0].position.x;
          let y0 = skeleton[i][0].position.y;
          let x1 = skeleton[i][1].position.x;
          let y1 = skeleton[i][1].position.y;

        // line property
        strokeWeight(2);
        stroke(255);

        // draw line
          line(x0,y0,x1,y1);

      }
}
}
