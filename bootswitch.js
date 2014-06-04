(function($) {
	$.fn.bootswitch=function(params) {
		this.each(function() {
			var input = $(this);

			if(input.data("bootswitch")) {
				var bootswitch = input.data("bootswitch")
				if(params == 'disable') {
					bootswitch.div.prop('disabled','true');
					bootswitch.div.find('.btn').prop('disabled','true');
				} else if(params == 'enable') {
					bootswitch.div.prop('disabled','false');
					bootswitch.div.find('.btn').prop('disabled','false');
				}
			} else {
				if (typeof ie !== 'undefined') {
					var  inputhtml = input.clone().wrap('<div>').parent().html();
					inputhtml = inputhtml.replace(/type=text/g, 'type=hidden');
					var newinput = $(inputhtml)
					input.replaceWith(newinput);
					input = newinput;
				} else {
					input.prop('type','hidden');
				}

				var defauts = {
						"labelTrue": "ON",
						"labelFalse": "OFF",
						"valueTrue" : "true",
						"valueFalse" : "false"
				};  

				//On fusionne nos deux objets ! =D
				var parametres=$.extend(defauts, params); 

				var div = $('<div class="btn-group btn-toggle"><button class="btn btn-sm btn-default btn-true" type="button">'+parametres.labelTrue+'</button><button class="btn btn-sm btn-primary active btn-false" type="button">'+parametres.labelFalse+'</button></div>');
				input.after(div);

				var val = input.val();
				if(val == parametres.valueTrue) {
					div.find('.btn-true').removeClass('btn-primary btn-default active');
					div.find('.btn-true').addClass('btn-primary active');
					div.find('.btn-false').removeClass('btn-primary btn-default active');
					div.find('.btn-false').addClass('btn-default');
				} else if(val == parametres.valueFalse ) {
					div.find('.btn-true').removeClass('btn-primary btn-default active');
					div.find('.btn-true').addClass('btn-default');
					div.find('.btn-false').removeClass('btn-primary btn-default active');
					div.find('.btn-false').addClass('btn-primary active');
				}

				div.on('click','.btn',function() {
					div.find('.btn').toggleClass('active');  

					if (div.find('.btn-primary').size()>0) {
						div.find('.btn').toggleClass('btn-primary');
					}

					div.find('.btn').toggleClass('btn-default');

					if(div.find('.btn-true').hasClass('active')) {
						input.val(parametres.valueTrue);
					} else {
						input.val(parametres.valueFalse);
					}

					input.trigger("change");
				});

				input.data("bootswitch",{
					"input" : input,
					"div" : div,
					"params" : params
				});
			}
		});
		return this;
	};
})(jQuery);