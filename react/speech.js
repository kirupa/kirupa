var recognizer;
var btnDictate;
var dictatedText = "";

function speechTest() {

    if (typeof Windows !== "undefined") {
        var defaultLang = Windows.Media.SpeechRecognition.SpeechRecognizer.systemSpeechLanguage;

        recognizer = Windows.Media.SpeechRecognition.SpeechRecognizer(defaultLang);
        recognizer.continuousRecognitionSession.addEventListener('resultgenerated', result, false);

        var dictationConstraint = new Windows.Media.SpeechRecognition.SpeechRecognitionTopicConstraint(Windows.Media.SpeechRecognition.SpeechRecognitionScenario.dictation, "dictation");
        recognizer.constraints.append(dictationConstraint);

        recognizer.compileConstraintsAsync();
    }
}
speechTest();

function submitResults() {
    document.querySelector(".textInput").value = dictatedText;

    var event = new Event('input', { bubbles: true });
    document.querySelector(".textInput").dispatchEvent(event);
}

function result(eventArgs) {
    if (eventArgs.result.confidence == Windows.Media.SpeechRecognition.SpeechRecognitionConfidence.high ||
        eventArgs.result.confidence == Windows.Media.SpeechRecognition.SpeechRecognitionConfidence.medium) {
        dictatedText = dictatedText + eventArgs.result.text + " ";
    }
    submitResults();

    dictatedText = "";
}

function dictateFn() {

    if (recognizer.state != Windows.Media.SpeechRecognition.SpeechRecognizerState.idle) {
        btnDictate.innerText = "Stopping dictation...";

        recognizer.continuousRecognitionSession.stopAsync();
        return;
    }

    try {
        recognizer.continuousRecognitionSession.startAsync().then(function completed() {
            //
        });
    }
    catch (e) { }
}