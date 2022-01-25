
$(document).ready(function () {

    $('.cview--date').click(function () {
        var date = $(this).attr("data-date");
        var date1 = convertDate(date);


  

        $.ajax({
            type: 'POST',
            url: '/get_event',
            data: { 'date': date1 },
            success: function (response) {

                var response = JSON.parse(response);

                if (response != "") {

                    $('#ul_id_div').css('display', 'block');
                    var html = '';
                    $(response).each(function (index, item) {
                        html += '<li class="event-dates"><div class="event-dates"><span class="start-time" id="start-time">' + item.start_time + '</span><small>through</small> <span class="end-time" id="end-time">' + item.end_time + '</span><span class="event-name" id="event-name">' + item.event_name + '</span><span class="event-delete" data-idx="' + item.id + '">delete</span></div></li>';
                    });

                    $('#ul_id_div').html(html);
                }
                else {
                    $('#ul_id_div').css('display', 'none');
                    $('#ul_id_div').html('');
                }

            }
        });
    });
});


function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getFullYear()), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
}

