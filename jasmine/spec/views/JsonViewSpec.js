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
         /*
        it('request sended with correct url', function () {
            sinon.spy(jQuery, "ajax");
            this.view.invokeService();
            expect(jQuery.ajax.getCall(0).args[0].url).toEqual("/sss");
            jQuery.ajax.restore();
        });
        */

        it('Once invoke button clicked the json is displayed', function () {
            this.view.invokeService();
            this.server.respond();
            expect(this.view.$el.find('pre').text()).toContain("hi");
        }); 
    });

  /*
    

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
            mockData1.params = new ParamList([{name:'first',defaultValue: '1111'},
            {name:'second',defaultValue: '2222','placein':'before'},
            {name:'third',defaultValue: '3333','placein':'after'}]);
            that.service1 = new Service(mockData1);
            that.view1 = new JsonView({ model: that.service1 });

            //mocking ajax
            that.server = sinon.fakeServer.create();
            that.server.respondWith([200, { "Content-Type": "text/html", "Content-Length": 2 }, '{"say":"hi"}']);
            that.server.autoRespond = true;

            $('#sandbox').html(that.view1.render().el);
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
    describe('Before After & Regular Params', function () {
       
        it('request sended with correct "data" params', function () {
            sinon.spy(jQuery, "ajax");
            this.view1.invokeService();
            expect(jQuery.ajax.getCall(0).args[0].data.first).toEqual("1111");
            jQuery.ajax.restore();
        });

         it('request sended with correct "before" params', function () {
            sinon.spy(jQuery, "ajax");
            this.view1.invokeService();
            console.log('url:'+jQuery.ajax.getCall(0).args[0].url)
            expect(jQuery.ajax.getCall(0).args[0].url.split('?')[0]).toEqual("/sss/2222");
            jQuery.ajax.restore();
         }); 

         it('request sended with correct "after" params', function () {
            sinon.spy(jQuery, "ajax");
            this.view1.invokeService();
            expect(jQuery.ajax.getCall(0).args[0].url.split('?')[1]).toEqual("third=3333");
            jQuery.ajax.restore();
         });                
    });
      
    */


})