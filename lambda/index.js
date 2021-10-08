
const Alexa = require('ask-sdk-core');
var flagHasPlayed;//set after any tone has played
var pitch;
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, would you like a beginner pitch, a skilled pitch or a full band pitch?';
        const repromptOutput = `I didn't quite get that. Which tuning pitch do you want to tune to?`;
           return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard('Skilled Pitch, Beginner Pitch, or Full Band Pitch','Skilled Pitch = B♭ \r\nBeginner Pitch = F \r\nFull Band Pitch=A')
            .reprompt(repromptOutput)
            .getResponse();
    }
};


const InstrumentRecievedHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InstrumentRecieved';
    },
    handle(handlerInput) {
        pitch = handlerInput.requestEnvelope.request.intent.slots.pitch.value;
        var alexaOutputSpeech;
        var note;
        if(pitch==='beginner pitch'){
         alexaOutputSpeech = '<speak><amazon:emotion name="excited" intensity="medium">Here is a concert F.</amazon:emotion><audio src="https://tones247.s3.amazonaws.com/F%3Dfosure.mp3"/>Would you like to hear it again?</speak>';
            /* var cardImageObj = {
            smallImageURL: 'http://renomath.org/video/linux/aspect/720x480.jpg',
            largeImageURL: 'https://mcdn.wallpapersafari.com/medium/10/43/UJ0tqH.jpg'}
            TODO:Add notes*/
            note = 'F'
        }
        else if (pitch==='skilled pitch'){
         alexaOutputSpeech = '<speak><amazon:emotion name="excited" intensity="medium">Here is a concert B Flat.</amazon:emotion><audio src="https://tones247.s3.amazonaws.com/B-Flat.mp3"/>Would you like to hear it again?</speak>'
        
            note = 'B Flat'
        }
        else {
         alexaOutputSpeech = '<speak><amazon:emotion name="excited" intensity="medium">Here is a concert A.</amazon:emotion><audio src="https://tones247.s3.amazonaws.com/A(full+band+pitch).mp3"/>Would you like to hear it again?</speak>'
        
            note = 'A'
        }
        flagHasPlayed = 1
        return handlerInput.responseBuilder
        .speak(alexaOutputSpeech)
        .withSimpleCard(`Now playing ${note}`," ")
            .reprompt()
            .getResponse();
    }
};
const ResponseHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesOrNoIntent';
    },
    handle(handlerInput) {
        const response = handlerInput.requestEnvelope.request.intent.slots.response.value;
        if (response==='yes'){
           var speakOutput;
        if(pitch==='beginner pitch'){
         speakOutput = '<speak><amazon:emotion name="excited" intensity="medium">Here is a concert F.</amazon:emotion><audio src="https://tones247.s3.amazonaws.com/F%3Dfosure.mp3"/>Would you like to hear it again?</speak>'}
        else if (pitch==='skilled pitch'){
         speakOutput = '<speak><amazon:emotion name="excited" intensity="medium">Here is a concert B Flat.</amazon:emotion><audio src="https://tones247.s3.amazonaws.com/B-Flat.mp3"/>Would you like to hear it again?</speak>'
        }
        else  {
         speakOutput = '<speak><amazon:emotion name="excited" intensity="medium">Here is a concert A.</amazon:emotion><audio src="https://tones247.s3.amazonaws.com/A(full+band+pitch).mp3"/>Would you like to hear it again?</speak>'
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
        }
}
}
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = `Try asking for different pitches. To leave, just say Alexa, exit`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent' ||  (Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesOrNoIntent' && handlerInput.requestEnvelope.request.intent.slots.response.value === 'no'));
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        InstrumentRecievedHandler,
        ResponseHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
