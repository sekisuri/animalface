// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
// the link to your model provided by Teachable Machine export panel
const URL = 'https://teachablemachine.withgoogle.com/models/wUB8NW2Ch/';
let model, webcam, labelContainer, maxPredictions;
// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    console.log('init console');
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) {
        // and class labels
        labelContainer.appendChild(document.createElement('div'));
    }
}
  
// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    // addcode
    var faceimage = document.getElementById('face-image');
    const prediction = await model.predict(faceimage, false);
    
    prediction.sort((a,b) => parseFloat(b.probability) - parseFloat(a.probability));
    console.log(prediction[0].className);
    var resultMessage;
    switch(prediction[0].className){
        case "dog":
            resultMessage = "강아지상";
            break;
        case "cat":
            resultMessage = "고양이상";
            break;
        case "rabbit":
            resultMessage = "토끼상";
            break;
        case "dinosaur":
            resultMessage = "공룡상";
            break;
        case "bear":
            resultMessage = "곰상";
            break;
        default:
            resultMessage = "알수없음";
            break;
    }
    $('.result-message').html(resultMessage);
    for (let i = 0; i < maxPredictions; i++) {
        console.log('class name : ' + prediction[i].className);
        const classPrediction =
            prediction[i].className + ': ' + prediction[i].probability.toFixed(2);

        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}