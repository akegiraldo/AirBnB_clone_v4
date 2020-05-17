$(function () {
  const amenitiesNames = [];
  const amenitiesIds = [];
  let ids = {};
  loadPlaces();

  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data) {
    $('DIV#api_status').toggleClass('available nok');
  });

  $('.container .filters button').on('click', function () {
    if (amenitiesIds.length > 0) {
      $('.places').empty();
      ids = { 'amenities': amenitiesIds };
      loadPlaces();
    } else {
      $('.places').empty();
      ids = {};
      loadPlaces();
    }
  });

  function loadPlaces () {
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
              <b>Owner:</b> ${place.user_id}
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`);
      }
    }).fail(function (e) {
      console.log(e);
    });
  }

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
});
