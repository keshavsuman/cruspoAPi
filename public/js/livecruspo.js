let localstream;

const mediaConstraints={
    audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      },
    video:true
};

$('.live-start-button').click(function(){
    createConnection();
});

$('.mic-button-wrapper.mic').click(function(){
    localstream.getAudioTracks()[0].enabled = !localstream.getAudioTracks()[0].enabled;
});

$('.mic-button-wrapper.video-on-off').click(function(){
    localstream.getVideoTracks()[0].enabled = !localstream.getVideoTracks()[0].enabled;
});
// $('.mic-button').click(function (){
//     console.log("Mute");
// }); 
// $('.mic-off-button').click(function(){
//     console.log("sfgfs");
//     localstream.getAudioTracks()[0].enabled = true;
// });

$('.end-session').click(function(){
    window.close();
});

$('.share-screen-button').click(async function(){
    var stream = await navigator.mediaDevices.getDisplayMedia();
    document.getElementById('myVideo2').srcObject = stream;
});

async function getUserMedia()
{
    try{
        localstream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        document.getElementById('myVideo').srcObject = localstream;
        $('.live-videos-grid').show();
    }catch(error){
        console.log(error);
    }
}

getUserMedia();