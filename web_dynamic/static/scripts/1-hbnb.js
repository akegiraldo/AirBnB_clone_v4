$(function () {
  const amenitiesNames = [];
  const amenitiesDict = {};
  $('.amenities ul li input').change(function () {
    if ($(this).is(':checked')) {
      console.log(this.attr('data-name'));
      // amenitiesNames.push(this.attr('data-name'));
      // amenitiesDict[this.attr('data-id')] = this.attr('data-name');
    } /* else {
      const pos = amenitiesNames.indexOf(this.attr('data-name'));
      amenitiesNames.splice(pos, 1);
      amenitiesDict.remove(this.attr('data-id'));
    }
    $('.amenities h4').text(amenitiesNames.join()); */
  });
});
