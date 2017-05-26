$().ready(function(){
    function IndexViewModel() {
        self = this;
        this.username = ko.observable("");
        this.email = ko.observable("");
        this.password = ko.observable("");
        this.location = ko.observable("");

        this.isSignin=ko.observable(false);
        this.isSignup=ko.observable(true);

        this.signupErrorMsg=ko.observable();
        this.signinErrorMsg=ko.observable();

        this.submitSignup = function(){
            $.ajax({
                type: "POST",
                data: JSON.stringify({
                    username: this.username(),
                    email: this.email(),
                    password: this.password(),
                    location: this.location()
                }),
                url: "/signup",
                contentType:'application/json',
                success: function(result) {
                    if('error' in result){
                        self.signupErrorMsg(result.error);
                    }
                    else{
                        window.location.href = "/";
                    }
                },
                error: function(result) {
                    self.signupErrorMsg("connection error");
                }
            });
        };
        this.submitSignin = function(){
            $.ajax({
                type: "POST",
                data: JSON.stringify({
                    email: this.email(),
                    password: this.password()
                }),
                url: "/signin",
                contentType:'application/json',
                success: function(result) {
                    if('error' in result){
                        self.signinErrorMsg(result.error);
                    }
                    else{
                        window.location.href = "/";
                    }
                },
                error: function(result) {
                    self.signupErrorMsg("connection error");
                }
            });
        };
        this.switchSign = function(){
            self.isSignin(!self.isSignin());
            self.isSignup(!self.isSignup());
        };
    }


    $.get('/user', function(data){
        console.log(data)
    });

    // ko.cleanNode($element[0]);
    ko.applyBindings(new IndexViewModel());
});

