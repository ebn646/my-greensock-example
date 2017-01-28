require('./app.scss');
var throttle = require('throttle-debounce/throttle');
var debounce = require('throttle-debounce/debounce');
//import Gallery from './gallery/gallery';

class App {
    constructor() {
        var winH = $(window).height();
        var that = this;
        this.animeLen = 2;
        this.currentsection = 0;
        this.iScrollPos = 0;
        this.direction = 'down';

        $('.app-container').height(winH * 2)
        $('.item').height(winH);

        //this.gallery = new Gallery();

        this.addEventListeners()
        $(window).on('addevents', evt => this.addEventListeners());

        this.TL1 = new TimelineLite({onReverseComplete:TL1Reverse,onComplete:TL1Complete});
        this.TL1.set(".app-container", {top:0})
        .to(".app-container", 1.5, { top: -$(window).height() }) 
        this.TL1.pause();

        function TL1Complete(){
            console.log('TL1Complete')
            $(window).trigger('addevents')
        }

        function TL1Reverse(){
            console.log('TL1Reverse')
            this.currentsection = 0;
           
            $(window).trigger('addevents')
            that.gallery.slidenumber = 2;
        }

        $( window ).resize(function() {
           $('.app-container').height(winH * 2)
            $('.item').height(winH);
        });
    }

    addEventListeners(){
        var that = this;

        $(window).on('wheel', function(e) {
            if(that.gallery.slidenumber < 3){
                var delta = e.originalEvent.deltaY;
                direction = 'down'
                if (delta > 0) {
                    direction = 'down'
                    $(window).trigger('down')
                } else {
                    direction = 'up'
                    $(window).trigger('up')
                }
            }else{
                var direction;
                var delta = e.originalEvent.deltaY;
                direction = 'down'
                if (delta > 0) {
                    direction = 'down'
                    //$(window).trigger('down')
                } else {
                    direction = 'up'
                    //$(window).trigger('up')
                }
                if(direction == 'up' && $('.bottom').scrollTop() == 0 ){
                    that.reverseTimeLine();
                }else{
                    that.playTimeLine();
                }
            }
        });

        $(window).on('up', evt => this.setDirectionUp());
        $(window).on('down', evt => this.setDirectionDown());

    }

    setDirectionDown(){
      this.direction = 'down';
    }

    setDirectionUp(){
      this.direction = 'up';
    }

    playTimeLine() {
        this.TL1.play();
        $(window).off('wheel');
    }

    reverseTimeLine() {
        console.log(this.TL1.reversed())
        if(this.TL1.reversed() == false){
            this.TL1.reverse();
            $(window).off('wheel');
        }
        
    }

}

export default App;