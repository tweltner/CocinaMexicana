var app = {
    // global variables
    currentUser: new User(),
    navHandler: new NavigationHandler(),
    loginHandler: new LoginHandler(),
    userpanel: new Userpanel(),
    // Application Constructor
    initialize: function() {
        $("[data-role=header],[data-role=footer]").toolbar().enhanceWithin();
        $("[data-role=panel]").panel().enhanceWithin();
        $('#registerPopupSuccess').popup(); // init popup to get expected behavior
        $('#errorPopup').popup();

        this.initMainPageSlider();
        this.bindEvents();
        this.navHandler.refresh();
    },
    // Bind Event Listeners
    initMainPageSlider: function () {
        $('#main-page-slider').pgwSlider({
            displayControls: true,
            selectionMode: 'mouseOver',
            autoSlide: false,
            adaptiveHeight: false,
            displayControls: true
        });
    },
    bindEvents: function() {
        $('#login-submit-btn').on('click', function (event) {
            event.preventDefault();

            app.loginHandler.login();
        });

        $('#register-submit-btn').on('click', function (event) {
            event.preventDefault();
            var regHandler = new RegistrationHandler();

            regHandler.register();
        });

        $('#userpanel').on('pagebeforeshow', function () {
            app.userpanel.setUser(app.currentUser);
            app.userpanel.open();
        });

        $('#classQuiz').on('pagebeforeshow', function () {
            var quiz = new Quiz('quiz_classification.json');
            quiz.load(function(event) {
                console.log('Event: %s', event);
                quiz.show();
            });
        });

        $('#errorPopup .ui-content a').on('click', function () {
            $('#errorPopup').popup('close');
        });

        if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android|Blackberry)/)) {
            console.log('Running on mobile device');
            document.addEventListener('deviceready', this.onDeviceReady, false);
        }
        else {
            console.log('Running on desktop browser');
            app.onDeviceReady();
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();

