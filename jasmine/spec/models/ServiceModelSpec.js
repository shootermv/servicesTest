describe('Model :: ServiceModel', function () {

    describe('Jsomething', function () {

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
                'collections/ParamList'
            ],
            function (Service, ParamList) {
                    
                    mockData.params = new ParamList([{name:'dataparam',defaultValue: '1111'},
                            {name:'beforeparam',defaultValue: '2222','placein':'before'},
                            {name:'afterparam',defaultValue: '3333','placein':'after'}]);
                    
                    that.service = new Service(mockData);
                    

                    //mocking ajax
                    that.server = sinon.fakeServer.create();
                    that.server.respondWith([200, { "Content-Type": "text/html", "Content-Length": 2 }, '{"say":"hi"}']);

                    flag = true;
                });
            waitsFor(function () {
                return flag;
            });
         });

         afterEach(function () {
           
            this.server.restore();

         });

         it('request sended with correct "data" params', function () {
            sinon.spy(jQuery, "ajax");
            this.service.invoke();
            expect(jQuery.ajax.getCall(0).args[0].data.dataparam).toEqual("1111");
            jQuery.ajax.restore();
         });
         it('request sended with correct "before" params', function () {
            sinon.spy(jQuery, "ajax");
            this.service.invoke();
            console.log('url:'+jQuery.ajax.getCall(0).args[0].url)
            expect(jQuery.ajax.getCall(0).args[0].url.split('?')[0]).toEqual("/sss/2222");
            jQuery.ajax.restore();
         });
         it('request sended with correct "after" params', function () {
            sinon.spy(jQuery, "ajax");
            this.service.invoke();
            expect(jQuery.ajax.getCall(0).args[0].url.split('?')[1]).toEqual("afterparam=3333");
            jQuery.ajax.restore();
         });                  
    });

})