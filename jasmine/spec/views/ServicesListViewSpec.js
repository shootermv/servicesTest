describe('View :: Json View', function () {


    var mockData = {
        "method": "shlomo",
        "path": '/sss',
        "action": "GET",
        "params": []
    };


    beforeEach(function () {
        var flag = false,
            that = this;
        require([
            'models/Service',
            'views/JsonView',
            'collections/ParamList',
            'models/Param'
        ],
        function (Service, JsonView, ParamList, Param) {
                mockData.params = new ParamList([{ name: 'first', defaultValue: '1111'}]);
                that.service = new Service(mockData);
                that.view = new JsonView({ model: that.service });

                //mocking ajax
                that.server = sinon.fakeServer.create();
                that.server.respondWith([200, { "Content-Type": "text/html", "Content-Length": 2 }, '{"say":"hi"}']);
               // that.server.autoRespond = true;

                $('#sandbox1').html(that.view.render().el);
                flag = true;
            });
        waitsFor(function () {
            return flag;
        });
    });

    afterEach(function () {
        this.view.remove();
        this.server.restore();

    });



    describe('Loading animation', function () {

        it('hidden before request, visible after and hidden after response', function () {
            expect($('.ui-loader').is(':visible')).toEqual(false);
            this.view.invokeService();
            expect($('.ui-loader').is(':visible')).toEqual(true);
            this.server.respond();            
            expect($('.ui-loader').is(':visible')).toEqual(false);
        });

    });


})