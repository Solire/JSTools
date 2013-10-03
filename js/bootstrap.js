(function($) {
    $.fn.bsDropdownMenu = function(options) {
        options = $.extend({}, options);
        function dropdownMenu(e) {
            $('li', $(e).parents('ul')).removeClass('active');
            $(e).parent().addClass('active');
            if ($(e).attr('data-title')) {
                $('button .title', $(e).parents('.btn-group')).html($(e).attr('data-title'));
            }
            if ($(e).attr('data-name')) {
                $('input[type=hidden][name="' + $(e).attr('data-name') + '"]').val($(e).attr('data-value'));
            }
        }
        return this.each(function() {
            if ($(this).parent().hasClass('active')) {
                dropdownMenu(this);
            }
            $(this).on('click', function() {
                dropdownMenu(this);
            });
        });
    }
})(jQuery);

$(function() {
    $('.btn-group > ul.dropdown-menu > li > a').bsDropdownMenu();
});
