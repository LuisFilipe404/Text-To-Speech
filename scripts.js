const textarea = document.querySelector('#text') //Text area element
let voiceList = document.querySelector('#voice') //Select element
let speechBtn = document.querySelector('#btn') // Button Element

let synth = speechSynthesis //Synth function
let isSpeaking = true //Controller

function voiceSpeech() {
    let voices = synth.getVoices() //get all voices

    for (let voice of voices) {
        let option = document.createElement('option')
        option.text = voice.name
        voiceList.add(option)
    } //Create an element for each voice

}

synth.addEventListener('voiceschanged', voiceSpeech) //add event for speech

function textToSpeech(text) {
    let utternace = new SpeechSynthesisUtterance(text)
    for (let voice of synth.getVoices()){
        if (voice.name === voiceList.value) {
            utternace.voice = voice
        }
    }
    speechSynthesis.speak(utternace)
} // Function for speech text


//Functio for Button Submit
speechBtn.addEventListener('click', (e) => {
    e.preventDefault()

    //If value != default option
    if (voiceList.value != 'select') {
        //If text exist:
        if (textarea.value != '') {
            if(!synth.speaking) {
                textToSpeech(textarea.value)
            }
            
            //If text > 80 character add pause/resume button 
            if (textarea.value.length > 80) {
                if(isSpeaking) {
                    synth.resume()
                    isSpeaking = false
                    speechBtn.innerHTML = 'Pause Speech'
                } else {
                    synth.pause()
                    isSpeaking = true
                    speechBtn.innerHTML = 'Resume Speech'
                }
    
                setInterval(() => {
                    if(!synth.speaking && !isSpeaking) {
                        isSpeaking = true
                        speechBtn.innerHTML = 'Convert to Speech'
                    }
                })
            } else {
                speechBtn.innerHTML = 'Convert to Speech'
            }
        }
    }

    
})