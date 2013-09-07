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


    describe('Json View', function () {

        it('View elemnts created successfully', function () {
            expect($("#jsonheader").length).toEqual(1);
        });
         
        it('request sended with correct url', function () {
            sinon.spy(jQuery, "ajax");
            this.view.invokeService();
            expect(jQuery.ajax.getCall(0).args[0].url).toEqual("/sss");
            jQuery.ajax.restore();
        });
        

        it('Once invoke button clicked the json is displayed', function () {
            this.view.invokeService();
            this.server.respond();
            expect(this.view.$el.find('pre').text()).toContain("hi");
        }); 
    });




})