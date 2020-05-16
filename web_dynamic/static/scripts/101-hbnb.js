$(function () {
  $('body').css('visibility', 'hidden');
  setTimeout(function () {
    $('body').css('visibility', 'visible');
  }, 2000);
  const amenitiesNames = [];
  const amenitiesIds = [];
  const locationsNames = [];
  const statesIds = [];
  const citiesIds = [];
  let ids = {};
  loadPlaces();

  let url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data) {
    $('DIV#api_status').toggleClass('available nok');
  });

  $('.container .filters button').on('click', function () {
    if (amenitiesIds.length > 0 || statesIds.length > 0 || citiesIds.length > 0) {
      $('.places').empty();
      ids = {'amenities': amenitiesIds, 'states': statesIds, 'cities': citiesIds};
      loadPlaces();
    } else {
      $('.places').empty();
      ids = {};
      loadPlaces();
    }
  });

  function loadPlaces() {
    console.log('ìds', ids);
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'post',
      data: JSON.stringify(ids),
      headers: {
        'Content-Type': 'application/json'
      },
      dataType: 'json'
    }).done(function (places) {
      for (const place of places) {
        url = `http://0.0.0.0:5001/api/v1/users/${place.user_id}`;
        let userName = '';
        let _promise = new Promise(function (resolved, rejected) {
          $.get(url, function (user) {
            userName = user.first_name + ' ' + user.last_name;
            resolved(userName);
          });
        });
        _promise.then(function () {
          $('.places').append(`
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guests</div>
                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
              </div>
              <div class="user">
                <b>Owner:</b> ${userName}
              </div>
              <div class="description">
                ${place.description}
              </div>
              <div class="reviews">
                <h2>Reviews</h2><span place-id=${place.id}>Show</span>
                <ul id=${place.id}></ul>
              </div>
            </article>`);
        })
      }
    }).fail(function (e) {
      console.log(e);
    });
  }
  $(document).on('click', 'span', function () {
    const id = $(this).attr('place-id');
    let url = `http://0.0.0.0:5001/api/v1/places/${id}/reviews`;
    if ($(this).text() === 'Show') {
      $(this).text('Hide');
      $.get(url, function (reviews) {
        for (review of reviews) {
          url = `http://0.0.0.0:5001/api/v1/users/${review.user_id}`;
          let userName = '';
          let _promise = new Promise(function (resolved, rejected) {
            $.get(url, function (user) {
              userName = user.first_name + ' ' + user.last_name;
              resolved(userName);
            });
          });
          _promise.then(function () {
            let date = new Date(Date.parse(review.created_at)).toDateString();
            $('#'+id).append(`
            <li>
              <h3>From ${userName} the ${date}</h3>
              <p>${review.text}</p>
            </li>`);
          });
        }
      });
    } else if ($(this).text() === 'Hide') {
      $(this).text('Show');
      $('#'+id).empty();
    }
  });

  $('.amenities ul li input').change(function () {
    if ($(this).is(':checked')) {
      amenitiesNames.push($(this).attr('data-name'));
      amenitiesIds.push($(this).attr('data-id'));
    } else {
      let pos = amenitiesNames.indexOf($(this).attr('data-name'));
      amenitiesNames.splice(pos, 1);
      pos = amenitiesIds.indexOf($(this).attr('data-id'));
      amenitiesIds.splice(pos, 1);
    }
    if (amenitiesNames.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(amenitiesNames.join(', '));
    }
  });

  $('.locations ul li input').change(function () {
    if ($(this).is(':checked')) {
      locationsNames.push($(this).attr('data-name'));
      if ($(this).hasClass('state')) {
        statesIds.push($(this).attr('data-id'));
      } else {
        citiesIds.push($(this).attr('data-id'));
      }
    } else {
      let pos = locationsNames.indexOf($(this).attr('data-name'));
      locationsNames.splice(pos, 1);
      if ($(this).hasClass('state')) {
        pos = statesIds.indexOf($(this).attr('data-id'));
        statesIds.splice(pos, 1);
      } else {
        pos = citiesIds.indexOf($(this).attr('data-id'));
        citiesIds.splice(pos, 1);
      }
    }

    if (locationsNames.length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(locationsNames.join(', '));
    }
  });
});
