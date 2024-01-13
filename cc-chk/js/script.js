$(function () {

    //little consol msg

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.backtotop').fadeIn('slow');
        } else {
            $('.backtotop').fadeOut('slow');
        }
    });
    $('.backtotop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1000);
        return false;
    });

    // Initiate popover
    $('[data-toggle="tooltip"]').tooltip();
    
});
