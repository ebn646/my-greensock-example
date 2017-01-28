require('./gallery.scss');

class Gallery {
    constructor() {
        this.slidenumber = 1;
        this.direction = 'down';

        //$(window).on('up', evt => this.reverseTimeLine());
        //$(window).on('down', evt => this.showNextSlide());
        var h = $(window).height();
        //=================TL1
        this.TL1 = new TimelineLite({
            onReverseComplete: TL1ReverseComplete,
            onComplete: TL1Complete,
            onStart: TL1onStart
        });
        this.TL1.insertMultiple([
            new TweenMax($('.gallery'), 1, {
                css: {
                    y: -h
                }
            }),
            new TweenMax($('#gallery'), 1, {
                css: {
                    top: h
                }
            }),
        ], 0);

        this.TL1.pause();

        function TL1onStart() {
            console.log('timeline start')
        }

        function TL1Complete() {
            console.log('GalTL1Complete')
            $('.cbp-bislideshow li').find('.slideOne').css('visibility', 'visible')
            $(window).trigger('addevents')
        }

        function TL1ReverseComplete() {
            console.log('reverse repeat')
            $('.cbp-bislideshow li').css('visibility', 'hidden')
            $("#gallery").css('visibility', 'hidden');
            $(window).trigger('addevents')
        }
        //=================TL1
        this.TL2 = new TimelineLite({
            onReverseComplete: TL2ReverseComplete,
            onComplete: TL2Complete
        });
        //this.TL2.set(".gallery", {visibility:"visible"}).to(".gallery", 1.5, {y:-h * 2}) 
        this.TL2.pause();

        function TL2Complete() {
            console.log('TL2Complete')
            $(window).trigger('addevents')
        }

        function TL2ReverseComplete() {
            console.log('TL2Complete')
            $(window).trigger('addevents')
        }

        //=================TL3
        this.TL3 = new TimelineLite({
            onReverseComplete: TL1Complete,
            onComplete: TL3Complete
        });

        this.TL3.set(".gallery", {
                visibility: "visible"
            })
            .to(".gallery", 1.5, {
                y: -h * 3
            })

        this.TL3.pause();

        function TL3Complete() {
            console.log('TL3Complete')
            $(window).trigger('addevents')
        }

        //=================TL4
        this.TL4 = new TimelineLite({
            onReverseComplete: TL1Complete,
            onComplete: TL3Complete
        });
        this.TL4.set(".gallery", {
                visibility: "visible"
            })
            .to(".gallery", 1.5, {
                y: -h * 3
            })
        this.TL4.pause();

        function TL4Complete() {
            console.log('TL3Complete')
            $(window).trigger('addevents')
        }


        $(window).resize(function() {
            //$( ".flex" ).height( $(window).height() );
        });

        //this.createGallery();

        //=====events
        $(window).on('galleryanimedone', evt => this.addEventListeners());
        $(window).on('nextslide', evt => this.showNextSlide());
        $(window).on('prevslide', evt => this.showPrevSlide());
    }

    addEventListeners() {
        var that = this;
        $(window).on('wheel', function(e) {
            console.log(TweenMax.isTweening('.introduced'))
            if (TweenMax.isTweening('.introduced') == false &&
                TweenMax.isTweening('.inspired') == false &&
                TweenMax.isTweening('.informed') == false &&
                TweenMax.isTweening('.positive') == false &&
                TweenMax.isTweening('.app') == false) {
                var delta = e.originalEvent.deltaY,
                    direction = 'down';
                if (delta > 0) {
                    direction = 'down'
                    if (that.slidenumber <= 5) {
                        that.slidenumber++;
                        $(window).trigger('nextslide');
                    } else {
                        $(window).trigger('addevents');
                    }

                    $(window).off('wheel');

                } else {
                    direction = 'up';
                    if (that.slidenumber > 5) {
                        that.slidenumber = 5;
                    }

                    if (that.slidenumber < 0) {
                        //$(window).off('wheel');
                        return;
                    } else {
                        that.slidenumber--;

                        $(window).trigger('prevslide');
                        $(window).off('wheel');

                        console.log('direction = ', direction, 'to ', that.slidenumber);
                    }
                }
            } else {
                //console.log('tweenMax is animating')
            }
        });
    }

    showNextSlide() {
        if (this.slidenumber == 5) {
            console.log(this.slidenumber, ' = 5')
            //$(window).trigger('addevents');
            return;
        }else if(this.slidenumber > 5){
            return;
        }

        switch (this.slidenumber) {
            case 1:
                console.log('showNextSlide', this.slidenumber)

                TweenMax.to('.app', 1, {
                    top: -$(window).height(),
                    onStart: function() {
                        //$(window).off('wheel')
                    },
                    onComplete: function() {
                        $(window).trigger('galleryanimedone');
                    }
                });
                break;
            case 2:
                console.log('showNextSlide', this.slidenumber)

                TweenMax.to('.informed', 1, {
                    autoAlpha: 1,
                    onComplete: function() {
                        console.log('2 done')
                        $(window).trigger('galleryanimedone');
                    }
                });
                break;
            case 3:
                console.log('showNextSlide', this.slidenumber)
                TweenMax.to('.positive', 1, {
                    autoAlpha: 1,
                    onComplete: function() {
                        console.log('3 done')
                        $(window).trigger('galleryanimedone');
                    }
                });
                break;
            case 4:
                console.log('showNextSlide', this.slidenumber)

                TweenMax.to('.introduced', 1, {
                    autoAlpha: 1,
                    onComplete: function() {
                        console.log('4 done')
                        $(window).trigger('addevents');
                    }
                });
                break;
        }
    }

    showPrevSlide(num) {
        if (this.slidenumber < 0 || this.slidenumber > 4) {
            return;
        }

        switch (this.slidenumber) {
            case 0:
            console.log('showPrevSlide', this.slidenumber)
            TweenMax.to('.app', 1, {
                    top: 0,
                    onComplete: function() {
                       $(window).trigger('galleryanimedone');
                    },
                    onStart: function() {
                        console.log('onstart tween to top')
                    }
                });
            break;

            case 1:
                console.log('showPrevSlide', this.slidenumber)
                
                TweenMax.to('.informed', 1, {
                    autoAlpha: 0,
                    onComplete: function() {
                        $(window).trigger('galleryanimedone');
                    }
                })
                break;
            case 2:
                console.log('showPrevSlide', this.slidenumber)
                TweenMax.to('.positive', 1, {
                    autoAlpha: 0,
                    onComplete: function() {
                        $(window).trigger('galleryanimedone');
                    }
                })
                break;
            case 3:
                console.log('showPrevSlide', this.slidenumber)
                TweenMax.to('.introduced', 1, {
                    autoAlpha: 0,
                    onComplete: function() {
                        $(window).trigger('galleryanimedone');
                    }
                })
                break;
            case 4:
                TweenMax.to('.introduced', 1, {
                    autoAlpha: 1,
                    onComplete: function() {
                        $(window).on('wheel');
                        $(window).trigger('galleryanimedone');
                    },
                    onStart: function() {
                        $(window).off('wheel');
                    }
                })
                break;
        }
    }

    setDirectionDown() {
        this.direction = 'down';
    }

    setDirectionUp() {
        this.direction = 'up';
    }

    createGallery() {
        this.slideshow = $('#cbp-bislideshow'),
            this.items = this.slideshow.children('li'),
            this.itemsCount = this.items.length,
            this.current = 0,

            $('.close').on('click', evt => this.hideInfo());

        this.createNavigation()
    }

    createNavigation() {
        var ul = $('<ul/>')
            .addClass('dotnav')
            .prependTo($('#gallery'));

        this.items.each(function() {
            console.log($(this).data('id'))
            var li = $('<li/>')
                .attr('id', $(this).data('id'))
                .appendTo($('.dotnav'));
        });

        $("li[id='1']").addClass('active');
    }
}

export default Gallery;