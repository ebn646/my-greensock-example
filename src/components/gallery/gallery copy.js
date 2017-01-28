require('./gallery.scss');



class Gallery{
    constructor(){
        this.slidenumber = 0;
        this.direction = 'down';
        $(window).on('up', evt => this.reverseTimeLine());
        $(window).on('down', evt => this.playTimeLine());
        var h =  $(window).height();
        //=================TL1
        this.TL1 = new TimelineLite({onReverseComplete:TL1ReverseComplete,onComplete:TL1Complete,onStart:TL1onStart});
        //this.TL1.set(".gallery", {visibility:"visible"}).to(".gallery", 1.5, {y:-h}) 
        this.TL1.set("#gallery", {top:h,'visibility':'visible'}) 
        this.TL1.set(".slideOne", {'visibility':'visible'}) 
        this.TL1.insertMultiple([
                    new TweenMax($('.gallery'), 1, {css: {y: -h }}),
                    new TweenMax($('#gallery'), 1, {css: {top: h}}),
        ], 0);

        this.TL1.pause();

        function TL1onStart(){
            console.log('timeline start')
        }

        function TL1Complete(){
            console.log('GalTL1Complete')
            $('.cbp-bislideshow li').find('.slideOne').css('visibility','visible')
            $(window).trigger('addevents')
        }

        function TL1ReverseComplete(){
            console.log('reverse repeat')
            $('.cbp-bislideshow li').css('visibility','hidden')
            $("#gallery").css('visibility','hidden'); 
            $(window).trigger('addevents')
        }
        //=================TL1
        this.TL2 = new TimelineLite({onReverseComplete:TL2ReverseComplete,onComplete:TL2Complete});
        this.TL2.set(".gallery", {visibility:"visible"}).to(".gallery", 1.5, {y:-h * 2}) 
        this.TL2.pause();

        function TL2Complete(){
            console.log('TL2Complete')
            $(window).trigger('addevents')
        }

        function TL2ReverseComplete(){
            console.log('TL2Complete')
            $(window).trigger('addevents')
        }

        //=================TL3
        this.TL3 = new TimelineLite({onReverseComplete:TL1Complete,onComplete:TL3Complete});
        this.TL3.set(".gallery", {visibility:"visible"})
        .to(".gallery", 1.5, {y:-h * 3}) 
        this.TL3.pause();

        function TL3Complete(){
            console.log('TL3Complete')
            $(window).trigger('addevents')
        }

        $( window ).resize(function() {
          //$( ".flex" ).height( $(window).height() );
        });

        this.createGallery();
    }

    playTimeLine(){
         console.log(this.slidenumber)
        $(window).off('wheel')
        this.slidenumber++;
        console.log('galPlay',this.slidenumber)
        switch(this.slidenumber){
            case 1:
                this.TL1.play();
                break;
            case 2:
                this.TL2.play();
                break;
            case 3:
                this.TL3.play();
                break;
            case 4:
               $(window).trigger('showBottom')
                break;
        }
    }

    reverseTimeLine(){
        console.log('galRev',this.slidenumber)
        $(window).off('wheel')
        if(this.slidenumber < 0){
            return;
        }
        this.slidenumber--;
        console.log('galRever',this.slidenumber)
        switch(this.slidenumber){
            case 0:
                this.TL1.reverse();
                break;
            case 1:
                this.TL2.reverse();
                break
            case 2:
                this.TL3.reverse();
                break
        }
    }

    setDirectionDown(){
      this.direction = 'down';
    }

    setDirectionUp(){
      this.direction = 'up';
    }

    createGallery(){
        this.slideshow = $( '#cbp-bislideshow' ),
		this.items = this.slideshow.children( 'li' ),
		this.itemsCount = this.items.length,
        this.current = 0,
        this.isSlideshowActive = true;
        this.items.each( function() {
				var item = $( this );
				item.css( 'background-image', 'url(' + item.find( 'img' ).attr( 'src' ) + ')' );
		} );

        $('.close').on('click', evt => this.hideInfo());

        this.createNavigation()
    }

    createNavigation(){
        console.log('fads')
         var ul = $('<ul/>')
            .addClass('dotnav')
            .prependTo($('#gallery'));

        this.items.each( function() {
            console.log($(this).data('id'))
				var li = $('<li/>')
                .attr('id',$(this).data('id'))
                .appendTo($('.dotnav')
            );
		} );

        $("li[id='1']").addClass('active');
    }
}

export default Gallery;