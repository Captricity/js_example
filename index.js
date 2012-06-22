var onepage = onepage || {};
onepage.views = onepage.views || {};

onepage.Router = Backbone.Router.extend({
	routes: {
		"":"home",
		"about":"about",
	},
	home: function(){
		onepage.activateNav('#');
		$('.routeView').hide();
		$('#homeView').show();
	},

	about: function() {
		onepage.activateNav('#about');
		$('.routeView').hide();
		$('#aboutView').show();
	},
});
window.router = new onepage.Router();

onepage.activateNav = function(hash){
	$('.nav li').attr('class', 'inactive');
	$('a[href=' + hash + ']').parent().attr('class', 'active');
}

onepage.views.PageView = Backbone.View.extend({
	id: 'pageView',

	initialize: function(){
		this.aboutView = new onepage.views.AboutView();
		this.$el.append(this.aboutView.render().el);
		this.homeView = new onepage.views.HomeView();
		this.$el.append(this.homeView.render().el);
	},

	render: function(){
		return this;
	},
});

onepage.views.HomeView = Backbone.View.extend({
	className: 'routeView',
	id: 'homeView',
	initialize: function(){
		_.bindAll(this, 'render');
	},
	render: function(){
		this.$el.append('<h1>Home:</h1>');
		return this;
	},
});

onepage.views.AboutView = Backbone.View.extend({
	className: 'routeView',
	id: 'aboutView',
	initialize: function(){
		_.bindAll(this, 'render');
		this.template = $("#aboutTemplate").html();
	},
	render: function(){
		this.$el.html(_.template(this.template, {}));
		return this;
	},
});

$(document).ready(function(){
	window.pageView = new onepage.views.PageView({el:"#pageView"});
	window.pageView.render();
	Backbone.history.start();
});
