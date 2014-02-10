(function($) {

  function readyVideo() {
    // Enable the API on each Vimeo video
    // This was the issue. Since Readability injects an iframe into the DOM,
    // Froogaloop was trying to add events to it. Instead of the general
    // "iframe[id]" selector, try making it specific so you only get iframes
    // that you know will be vimeo videos. See below.
    // $('iframe[id]').each(function(){
    //     Froogaloop(this).addEvent('ready', ready);
    // });

    // A more specific, safer selector
    $('.vimeo-video iframe[id]').each(function(){
        Froogaloop(this).addEvent('ready', ready);
    });

    // I don't think you need this function here, because it's in Froogaloop
    // function addEvent(element, eventName, callback) {
    //     if (element.addEventListener) {
    //       element.addEventListener(eventName, callback, false);
    //     }
    //     else {
    //       element.attachEvent(eventName, callback, false);
    //     }
    // }

    function ready(playerID){
      // Add event listerns
      // http://vimeo.com/api/docs/player-js#events
      Froogaloop(playerID).addEvent('play');
      Froogaloop(playerID).addEvent('pause');

      $('button.play').on('click', function(){
        var $this = $(this),
            thisID = $this.data('vimeo-id').toString();

        // Fire an API method
        // http://vimeo.com/api/docs/player-js#reference
        $this.next().css(
          {
            position: 'relative',
            left : '0',
            top : '0'
          }
        );
        $this.remove();

        Froogaloop(playerID).api('pause');
        Froogaloop(thisID).api('play');
      });
    }
  }


  function getVideo(id, elem){
    var thisDiv = $('div[data-vimeo-id="' + id + '"]'),
        divHeight = thisDiv.parent().children('button').height(),
        divWidth = thisDiv.parent().children('button').width();

    var request = $.ajax({
      url: "http://vimeo.com/api/v2/video/" + id + ".json",
      beforeSend:function(){
        // this is where we append a loading image

      },
      success: function(data) {
        $iframe = $('<iframe>').appendTo(thisDiv);
        $iframe
          .attr('src', '//player.vimeo.com/video/' + id + '?api=1&player_id=' + id)
          .attr('id', id)
          .attr('width', divWidth)
          .attr('height', divHeight)
          .attr('frameborder', 0)
          .attr('webkitAllowFullScreen', '')
          .attr('mozallowfullscreen', '')
          .attr('allowFullScreen', '');
      },
      error: function() {
        console.log("this video didn't load");
      },
      complete: function () {
        readyVideo();
      }
    });
  }

  function displayVideos() {
    var video = $('div[data-vimeo-id]');

    $.each(video, function(i, el){
      var videoId = video[i]['dataset']['vimeoId'];
      getVideo(videoId, el);
    });

  }

  $(window).load( function(){
    displayVideos();
  });


})(jQuery);

