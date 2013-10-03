/**
 * jQuery Hash Tag
 *
 * @package  jsTools
 * @category jquery
 * @author   Jonathan Sahm <contact@johnstyle.fr>
 * @license  http://www.gnu.org/copyleft/gpl.html GNU General Public License
 * @link     https://github.com/johnstyle/jsTools.git
 */
(function($) {
    var hashTag = {
        ids : {},
        path : {},
        defaults : {},            
        init : function(el, config){
            this.el         = el;
            this.$el        = $(el);
            this.settings   = $.extend({}, this.defaults, config);
        },
        autoload : function(){
            var windowHash = window.location.hash;
            if(windowHash) {
                this._setPath(windowHash);
                var hash = '#';
                $.each(this.ids, function(i, id) {
                    hash += (hash != '#' ? '/' : '') + id;
                    if(hash != '#') {
                        $('a[href="' + hash + '"]').click();
                    }
                });
            }
        },
        load : function($this){
            if($($this).data('href')) {
                var href = $($this).data('href');
            } else  {
                var href = $($this).attr('href');
            }
            this._setPath(href);
            $($this).attr('href', '#' + this._getId());
            $($this).data('href', '#' + this.path);
            window.location.hash = this.path;
            return '#' + this._getId();
        },
        _setPath : function(hash){
            this.path = hash.replace(/^\#!?/, '');
            this.ids  = this.path.split('/');
        },
        _getId : function(){
            return this.ids[this.ids.length-1];
        }
    };
    $.fn.hashTag = function(config) {
        var instance = Object.create(hashTag);
        var items = this.each(function() {
            if($(this).attr('href') != '#') {
                instance.init(this, config);
                $(this).on('click', function(event) {
                    event.preventDefault();
                    instance.load(this);
                });
            }
        });
        setTimeout(function() {
            instance.autoload();
        }, 200);
        return items;
    }
})(jQuery);
