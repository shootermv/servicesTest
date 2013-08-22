var SearchView = Backbone.View.extend({
	template: _.template($('#search-view').html()),
    initialize: function () {
        _.bindAll(this, 'render');
       console.log('search view initialized now')
    },
    events: {
        'keyup': 'search'
    },
    search: function () {
        console.log('searching!!!');
        return false;
    },
    render: function () {
        var _this = this;
        _this.$el.html(this.template());
        return _this;
    }
});