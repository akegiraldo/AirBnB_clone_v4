$(function () {
  let amenities_names = [];
  let amenities_dict = {}
  $('.amenities ul li input').change(function () {
    if ($(this).is(':checked')) {
      amenities_names.push(this.attr('data-name'));
      amenities_dict[this.attr('data-id')] = this.attr('data-name');
    } else {
      let pos = amenities_names.indexOf(this.attr('data-name'));
      amenities_names.splice(pos, 1);
      amenities_dict.remove(this.attr('data-id'));
    }
    $('.amenities h4').text(amenities_names.join());
  })
});
