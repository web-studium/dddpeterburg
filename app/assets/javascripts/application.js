function var_dump(obj)
{
    var s = '<h1>' + obj + '</h1>';
    s += '<ol>';

    for (p in obj)
            s += '<li><b>' + p + '</b> : ' + obj[p] + '</li>';

    s += '</ol>';
    window.document.body.innerHTML = s;
}

// Вспомогательная ф-ия, аналог in_array PHP
function in_array(array, p_val)
{
    for(var i = 0, l = array.length; i < l; i++)
    {
        if(array[i] == p_val)
        {
            return true;
        }
    }

    return false;
}

// События календаря
var clnEvents = [3,14,16,21,24,26,29];

function calendar(_year, _month, _day)
{
    var today = new Date();
    var day = _year && _month ? new Date(_year, _month, _day) : today;
    
    var monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    var dayWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var year = day.getFullYear();
    var html = '';
    
    if (year < 2000)
        year = year + 1900;
    
    // Определние високосного года
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
        monthDays[1] = 29;
    
    // Определение следующего и предыдущего месяца, года
    if((day.getMonth() - 1) < 0)
    {
        var prev_month = 11;
        var prev_year = year - 1;
    }
    else
    {
        prev_month = day.getMonth() - 1;
        prev_year = year;
    }
        
    
    if((day.getMonth() + 1) > 11)
    {
        var next_month = 0;
        var next_year = year + 1;
    }
    else
    {
        next_month = day.getMonth() + 1;
        next_year = year;
    }
        
    
    // Количество дней в месяце
    var nDays = monthDays[day.getMonth()];
    
    // Определение дня недели, т.е. сколько дней недели внчале месяца пустые
    var tDate = day.getDate();
    var firstDay = day;
    firstDay.setDate(1);
    var testMe = firstDay.getDate();
    
    if (testMe == 2)
        firstDay.setDate(0);
    
    if(firstDay.getDay() == 0)
        var startDay = 7;
    else
        startDay = firstDay.getDay();
    
    firstDay.setDate(tDate);
    
    html += '<table class="tbl-calendar">';
    html += '<tr><th colspan="7" class="cln-month">';
    html += monthNames[day.getMonth()];
    html += ' ' + year;
    html += '</th></tr>';
    
    html += '<tr>';
    for(i = 0; i < dayWeek.length; i++)
    {
        html += '<th class="cln-dayweek">'+dayWeek[i]+'</th>';
    }
    html += '</tr>';
    
    html += '<tr>';
    var column = 0;
    
    // Прорисовываем сначала пустые дни
    for (i = 1; i < startDay; i++)
    {
        html += '<td class="cln-empty">&nbsp;</td>';
        column++;
    }
    
    for (var i = 1; i <= nDays; i++)
    {
        column++;
        
        // Если сегодня
        if (day.toDateString() == today.toDateString() && day.getDate() == i)
        {
            
            html += '<td class="cln-day today">';
            html += i;
            html += '</td>';
            
            if (column == 7)
            {
                column = 0;
                html += '<tr>';
            }
        }
        else
        {
            // Эмуляция событий календаря
            if(in_array(clnEvents, i))
                html += '<td class="cln-day cln-event" id="'+ i +'">';
            else
                html += '<td class="cln-day">';
            
            html += i;
            html += '</td>';

            if (column == 7)
            {
                column = 0;
                html += '<tr>';
            }
            
        }
    }
    
    // Дополняем таблицу пустыми ячейками
    if(column < 7)
        for(i = column + 1; i <= 7; i++)
        {
            html += '<td class="cln-empty">&nbsp;</td>';
        }
        
    html += '<tr><th colspan="3" class="cln-prev-month">\n\
            <button id="prev_month" value="'+ prev_year +'.'+ prev_month+'.'+day.getDate() +'">&laquo; ' + monthNames[prev_month].substring(0,3) + '</button></th>';
    html += '<th colspan="4" class="cln-next-month">\n\
            <button id="next_month" value="'+ next_year +'.'+ next_month+'.'+day.getDate() +'">' + monthNames[next_month].substring(0,3) + ' &raquo;</button></th></tr>';
    
    html += "</table>";
    
    return html;
}

var timeout    = 1000;
var closetimer = 0;
var event = 0;

function event_open(el) {
    event_canceltimer();
    event_close();
    event = $('#event_' + el.attr('id'));
    
    //event.bind('mouseover', event_canceltimer);
    //event.bind('mouseout', event_timer);
    
    var position = el.offset();
    event.toggle();
    event.offset({top: position.top + 40, left: position.left - (parseInt(event.css('width'))/2) });
    //$('#events').toggle();
    //alert(event.attr('id'));
}

function event_close() {
    if (event) event.hide();
}

function event_timer() {
    closetimer = window.setTimeout(event_close, timeout);
}

function event_canceltimer() {
    if (closetimer) {
        window.clearTimeout(closetimer);
        closetimer = null;
    }
}
    
document.onclick = event_close;

function resize(width){
    
    var right_tours = $('#right_tours');
    
    if(width > 1550)
    {
        $('.tours').css({width: '49%', margin: '0 0 20px 0'});
        $('.tours table td').css('font-size', '75%');
        $('#searching').css('width', '64%');
        $('#content_top').append(right_tours);
        right_tours.css({width: '30%', margin: 0});
        $('#tour_in_piter').css('margin-right', '2%');
        //console.log($(this).width());
    }
    else
    {
        $('.tours').css({width: '100%', height: 'auto'});
        $('.tours table td').css('font-size', $('.tours table td').css('font-size'));
        $('#searching').css('width', '100%');
        right_tours.css({margin: '0 0 20px 0', height: 'auto'});
        right_tours.insertAfter('#manager');
        $('#tour_in_piter').css('margin-right', 0);
        //console.log($(this).width());
    }
}

window.onload = function(){
    resize(window.innerWidth);
}

$(document).ready(function(){
    
    $(window).resize(function(){
        resize($(this).width());
    });
    
    $('#calendar').bind('mouseover', function(e){
        var el = $(e.target);
        
        if(el.hasClass('cln-event'))
        {
            //alert(el.attr('id'));
            event_open(el);
            //el.bind('mouseout', event_timer);
        }
            
    });
    
//    $('#calendar').bind('click', function(e){
//        var el = $(e.target);
//        
//        if(el.hasClass('cln-event'))
//        {
//            var position = el.position();
//            var event = $('#event_' + el.attr('id'));
//            
//            event.css({top: position.top + 40, left: position.left - (parseInt(event.css('width'))/2) });
//            event.toggle();
//            $('#events').toggle();
//        }
//    });
    
    $('#search_tabs a').click(function(){
        $('#search_tabs a').removeClass('active');
        $(this).addClass('active');
        $('.search-content').hide();
        $('#content_' + $(this).attr('id')).show();
    });
    
    $('#tour_coming, #tour_leaving').datepicker({
        showOn: 'button',
        buttonImage: "assets/btn-calendar.png",
        buttonImageOnly: true
    });
    
    $('#tour_way').bind('focusin', function(){
        var position = $(this).position();
        $('#select_way').css({top: position.top + 30, left: position.left}).toggle();
    });
    
    $('#tour_way').bind('focusout', function(){
        $(this).css('color', '#000');
        $('#select_way').toggle();
    });
    
    $('.way-option').mouseenter(function(){
        $('#tour_way').val($(this).text()).css('color', '#666');
    });
    
    $('#calendar').html(calendar());
    $('#calendar').click(function(e){
        var btn = $(e.target);
        if(btn.attr('id') == 'next_month' || btn.attr('id') == 'prev_month')
        {
            var btn_val = btn.val();
            var p = btn_val.split('.'); // p[0] - year, p[1] - month, p[2] - day
            $(this).empty();
            $(this).html(calendar(p[0], p[1], p[2]));
        }
    });
    
});