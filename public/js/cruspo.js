

document.getElementsByClassName('end-call-button')[0].addEventListener('click',()=>{
    window.location = '/admin';
});
document.getElementsByClassName('share-screen')[0].addEventListener('click',()=>{
navigator.mediaDevices.getDisplayMedia({
    video: {
          cursor: "always"
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      }).then((stream)=>{
        document.getElementById('myVideo2').srcObject = stream;
      });
});