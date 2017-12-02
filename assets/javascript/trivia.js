$(document).ready(function(){
   
$.fn.trivia = function() {
    var _t = this;
    _t.userPick = null;
    _t.answers = {
        correct: 0,
        incorrect: 0
    };
    _t.images = null;
    _t.count = 30;
    _t.current = 0;
    // DEFINE QUESTIONS, ANSWERS AND CORRECT ANSWER
    _t.questions = [{
        question: "What is the name of the capital city of Switzerland?",
        choices: ["Bern", "Zurich", "Lucerne", "Zematt"],
        images: ["assets/images/switzerland-bern.jpg"],
        correct: 0
    }, {
        question: "What is the name of the capital city of Holland?",
        choices: ["Amsterdam", "Rotterdam", "Hague", "Groningen"],
        images: ["assets/images/holland-amsterdam.jpg"],
        correct: 0

    }, {
        question: "What is the name of the capital city of Germany?",
        choices: ["Leipzig", "Frankfurt", "Berlin", "Stuttgart"],
        images: ["assets/images/germany-berlin.jpg"],
        correct: 2

    }, {
        question: "What is the name of the capital city of Poland?",
        choices: ["Warsaw", "Lubin", "Bydgoszcz", "Poznan"],
        images: ["assets/images/poland-warsaw.jpg"],
        correct: 0

    }, {
        question: "What is the name of the capital city of Austria?",
        choices: ["Salzburg", "Vienna", "Graz", "Linz"],
        images: ["assets/images/austria-vienna.jpg"],
        correct: 1

    }];

    // DEFINE ANSWER BUTTONS TO BE DISPLAYED
    _t.ask = function() {
        if (_t.questions[_t.current]) {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
            $("#question_div").html(_t.questions[_t.current].question);
            var choicesArr = _t.questions[_t.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(_t.timer, 1000);  //DISPLAY INTERVAL OF 1 SECOND ON TIMER
        } else {
            $('#mainBody').append($('<div />', {                                               
                text: 'Unanswered: ' + (
                    _t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('div.container').show();   
        }
    };

    // COUNT DOWN TIMER
    _t.timer = function() {
        _t.count--;
        if (_t.count <= 0) {
            setTimeout(function() {
                $('#timer').text("Time remaining: 00:0 secs");
                $('div#outOfTime').html("<p>Out of Time!</p>");
                _t.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
        }
    };
    _t.nextQ = function() {
        _t.current++;
        clearInterval(window.triviaCounter);
        _t.count = 30;
        setTimeout(function() {
            _t.cleanUp();
            _t.ask();
        }, 5000)  //5 SECOND DELAY AFTER ANSWERING QUESTION
    };

    // CORRECT OR WRONG ANSWER TEXT DISPLAY
    _t.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html(''); 
        });
        $('.correct').html('Correct answers: ' + _t.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
    };
    _t.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        _t.answers[string]++;
        $('.' + string).html(string + ' answers: ' + _t.answers[string]);
    };
    return _t;
};
var Trivia;

// START BUTTON HIDE WHEN CLICKED
$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    Trivia = new $(window).trivia();
    Trivia.ask();
});

// START THE GAME OR RESTART GAME WHEN BUTTON CLICKED
$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        _t = Trivia || $(window).trivia(),
        index = _t.questions[_t.current].correct,
        correct = _t.questions[_t.current].choices[index];

    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        _t.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        _t.answer(true);
        $("#img").html('<img src="' + _t.questions[_t.current].images + '" class="img-thumbnail">');

    }
    _t.nextQ();
});

});
