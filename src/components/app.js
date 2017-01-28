require('./app.scss');
var throttle = require('throttle-debounce/throttle');
var debounce = require('throttle-debounce/debounce');
import Gallery from './gallery/gallery';

class App {
    constructor() {
        var winH = $(window).height();
        var that = this;
        this.animeLen = 2;
        this.currentsection = 0;
        this.iScrollPos = 0;
        this.direction = 'down';
        this.gallery = new Gallery();

        this.addEventListeners();
        $(window).on('down', evt => this.playTimeLine());
        $(window).on('up', evt => this.reverseTimeLine());
        $(window).on('startGallery', evt => this.startGallery(evt));
        $(window).on('reverseGallery', evt => this.reverseGallery(evt));
        $(window).on('addevents', evt => this.addEventListeners());
        $(window).on('reset', evt => this.reset());
        
        this.TL = new TimelineMax({
            onReverseComplete: onReverseComplete,
            onComplete: TLComplete,
            paused:true,
            onCompleteParams:[{self}]
        });
        this.TL.set(".app", {
                top: 0
            })

        function TLComplete(){
            this.pause();
        }
        function onReverseComplete(){
            console.log('onReverseComplete')
        }

        $(window).resize(function() {
            var windH =  $(window).height();
            console.log(that.currentsection)
            switch(that.currentsection){
                case 0:
                    $('section').height(windH)
                    $('.app').css('top',0)
                    break;
                case 1:
                    $('section').height(windH)
                    $('.app').css('top',-$('section').height())
                     break;
                case 2:
                    $('section').height(windH)
                    $('.app').css('top',-$('section').height()*2)
                     break;
            }
        });
    }

    addEventListeners() {
        var that = this;
        $(window).on('wheel', function(e) {
            console.log(TweenMax.isTweening( '.app' ))
            if(TweenMax.isTweening( '.app' ) == false){
                var delta = e.originalEvent.deltaY,
                direction = 'down';
                if (delta > 0) {
                    console.log(direction)
                    direction = 'down'
                    $(window).trigger('down')
                } else {
                    console.log(direction)
                    direction = 'up'
                    that.currentsection--;
                    $(window).trigger('up')
                }
            }else{
                //console.log('tweenMax is animating')
            }
        });
    }

    reset(){
        this.currentsection = 0;
    }

    startGallery(evt){
        console.log('startGallery')
        $(window).off('wheel');
        this.gallery.addEventListeners()
    }

    reverseGallery(evt){
        console.log('reverseGallery')
        this.gallery.addEventListeners()
    }

    setDirectionDown() {
        this.direction = 'down';
    }

    setDirectionUp() {
        this.direction = 'up';
    }

    playTimeLine() {
        this.currentsection++;
        if(this.currentsection > 2 || this.currentsection < 1){
            return;
        }
        console.log(this.currentsection)
        switch(this.currentsection){
            case 1:
                TweenMax.to('.app', 1, {
                    top: -$(window).height(),
                    onStart:function(){
                        $(window).off('wheel')
                    },
                    onComplete:function(){
                        $(window).trigger('startGallery')
                    }
                });
                break;
             case 2:
                TweenMax.to('.app', 1, {top: -$(window).height()*2,
                    onComplete:function(){
                        $(window).trigger('addevents');
                    }});
                break;
        }        
    }

    reverseTimeLine() {
        if(this.currentsection < 0){
            return
        }
        if(this.currentsection > 1){
            return
        }
        console.log('reverse to section ',this.currentsection,TweenMax.isTweening( '.app' ))
        switch(this.currentsection){
            case 0:
                TweenMax.to('.app', 1, {top: 0,onComplete:function(){
                         $(window).trigger('addevents');
                     },onStart:function(){
                        $(window).trigger('reset');
                         $(window).off('wheel');
                     }});
                break;
             case 1:
                TweenMax.to('.app', 1, {top: -$(window).height(),onStart:function(){
                         $(window).off('wheel');
                     },onComplete:function(){
                        $(window).trigger('reverseGallery');
                     }});
                break;
        }        
        
    }
}

export default App;