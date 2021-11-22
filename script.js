// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://1.bp.blogspot.com/-4R7iEgGkdYY/Xrb3XIeMYvI/AAAAAAAAQs0/wprq5Wq73DAy4VhQpHIL7SIumVJO1zmUACLcBGAsYHQ/s1600/IMG-20190807-WA0008.jpg"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "La",
			img: "https://1.bp.blogspot.com/-KksNKw2EzV4/X0a1GGaoiLI/AAAAAAAAR0Y/_dp9Vfo6NBozii8NYVHKi5u_CBlhkNxuQCLcBGAsYHQ/s640/1-La.png",
			id: 1,
		},
		{
			name: "Guerra",
			img: "https://1.bp.blogspot.com/-mn2wqsRfRGM/X0a1HC9-VXI/AAAAAAAAR0o/L3OeEgEs4rA2j2LUWFA39nJWWHjR65vOgCLcBGAsYHQ/s640/2-guerra.png",
			id: 2
		},
		{
			name: "del",
			img: "https://1.bp.blogspot.com/-30YgYgX_yjI/X0a1HcRRXoI/AAAAAAAAR0s/fPJNyl9Puz0zSIYmEMiYtBYTDJCza01TACLcBGAsYHQ/s640/3-del.png",
			id: 3
		},
		{
			name: "Coltan",
			img: "https://1.bp.blogspot.com/-aOKk5Vnmqxo/X0a1IOfDfhI/AAAAAAAAR0w/3ZU27KoiaqoKSGGpP9tLTKgbnHoFhRfKwCLcBGAsYHQ/s640/4-coltan.png",
			id: 4
		}, 
		{
			name: "congoleño",
			img: "https://1.bp.blogspot.com/-v6OopJ6TxBA/X0a1InHLe_I/AAAAAAAAR00/eNVBoZw1o3Ay3bGMg8gzq6j950lpMD8oQCLcBGAsYHQ/s640/5-congole%25C3%25B1o_.png",
			id: 5
		},
		{
			name: "descubrimps",
			img: "https://1.bp.blogspot.com/-Ubu7Rmdu5Ug/X0a1I9JVlkI/AAAAAAAAR04/oItNjJayvlwKZTgw82qXwkDlzd8sgITAgCLcBGAsYHQ/s640/6-descubrimos.png",
			id: 6
		},
		{
			name: "la",
			img: "https://1.bp.blogspot.com/-sfIOtwwHxbQ/X0a1JFj8ZRI/AAAAAAAAR08/GqoMfM3pBxknw5JkX5Y-a7WIl_nuLCyFwCLcBGAsYHQ/s640/7-la.png",
			id: 7
		},
		{
			name: "responsabilidad",
			img: "https://1.bp.blogspot.com/-Frqo6bAHG98/X0a1JcH-57I/AAAAAAAAR1A/Oe31_bzFhzwWEofgAYc4lp4_TTVRpZQzgCLcBGAsYHQ/s640/8-responsabilidad.png",
			id: 8
		},
		{
			name: "de",
			img: "https://1.bp.blogspot.com/-m1lrAaaBFwg/X0a1J-8ZsdI/AAAAAAAAR1E/mxxPN_W6fEI9LDBG0Of2wzyrqotbr9vMwCLcBGAsYHQ/s640/9-de.png",
			id: 9
		},
		{
			name: "empresas",
			img: "https://1.bp.blogspot.com/-HWIpT4oyjZo/X0a1GKq_xtI/AAAAAAAAR0g/biJkdFU7ijk9Uo9HY5A_btVtt5b9DX2CACLcBGAsYHQ/s640/10-empresas.png",
			id: 10
		},
		{
			name: "y",
			img: "https://1.bp.blogspot.com/-wlAx4ZJh5OA/X0a1GNNhlgI/AAAAAAAAR0c/oxXIK7qh31s2Sxy1AQZk1gJa88zmGsxnwCLcBGAsYHQ/s640/11-y.png",
			id: 11
		},
		{
			name: "gobiernos",
			img: "https://1.bp.blogspot.com/-50EJfWdrGT4/X0a1G4w5FeI/AAAAAAAAR0k/Zoj2uZ9r8QYZkv_waRpkhntAJUGD8EdVQCLcBGAsYHQ/s640/12-gobiernos.png",
			id: 12
		},
	];
    
	Memory.init(cards);


})();