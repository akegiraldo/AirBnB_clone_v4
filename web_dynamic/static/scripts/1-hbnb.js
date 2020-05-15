$(function () {
  const amenitiesNames = [];
  const amenitiesDict = {};
  $('.amenities ul li input').change(function () {
    if ($(this).is(':checked')) {
      amenitiesNames.push($(this).attr('data-name'));
      amenitiesDict[$(this).attr('data-id')] = $(this).attr('data-name');
      console.log(amenitiesNames);
      console.log(amenitiesDict);
    } else {
      const pos = amenitiesNames.indexOf($(this).attr('data-name'));
      amenitiesNames.splice(pos, 1);
      console.log()
      delete amenitiesDict.$(this).attr('data-id');
    } 
    $('.amenities h4').text(amenitiesNames.join(', '));
  });
});
