/**
 * Bootstrap Dropdown Menu
 *
 * @package  jsTools
 * @category bootstrap
 * @author   Jonathan Sahm <contact@johnstyle.fr>
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 * @link     https://github.com/johnstyle/jsTools.git
 */
(function ($) {

    $.fn.dropdownMenu = function (options) {

        options = $.extend({}, options);

        function dropdownMenu(e) {

            var e = $(e);
            var group = e.parents('.btn-group');
            var list = e.parents('ul');
            var parent = e.parent();

            list.find('li').removeClass('active');
            parent.addClass('active');

            if (e.attr('data-title')) {
                group.find('button .title').html(e.attr('data-title'));
            }

            if (e.attr('data-name')) {
                $('input[type=hidden][name="' + e.attr('data-name') + '"]').val(e.attr('data-value'));
            } else if (group.attr('data-name')) {
                $('input[type=hidden][name="' + group.attr('data-name') + '"]').val(e.attr('data-value'));
            }
        }

        return this.each(function () {

            if ($(this).parents('li').hasClass('active')) {
                dropdownMenu(this);
            }

            $(this).on('click', function (event) {

                event.preventDefault();

                var redirect = $(this).attr('href');

                dropdownMenu(this);

                if (redirect && redirect != '#') {
                    return $(location).attr('href', redirect);
                }

                return true;
            });
        });
    }
})(jQuery);

jQuery(function ($) {
    $('.btn-group > ul.dropdown-menu > li > a').dropdownMenu();
});
