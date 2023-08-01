"use strict";
(function ($) {
    $.fn.easyTableA11y = function (options) {
        var defaultOptions = {
            label: 'data-label',
            view: '786px'
        };
        var mergedOptions = $.extend({}, defaultOptions, options);
        var methods = {
            setProps: function (options) {
                mergedOptions.label = options.label || defaultOptions.label;
                mergedOptions.view = options.view || defaultOptions.view;
            }
        };
        function applyCustomCSS() {
            var $table = this;
            var thValues = [];
            this.find('th').each(function () {
                thValues.push($(this).text().trim());
            });
            this.find('tr').each(function (index) {
                var $tr = $(this);
                $tr.find('td').each(function (tdIndex) {
                    var thValue = thValues[tdIndex];
                    $(this).attr(mergedOptions.label, thValue);
                });
            });
        }
        function updateDynamicCSS(selector, options) {
            var dynamicCSS = "\n        @media screen and (max-width: ".concat(options.view, ") {\n          ").concat(selector, " th {\n            display: none;\n          }\n          ").concat(selector, " tr {\n            display: flex;\n            flex-wrap: wrap;\n            border-bottom: 1px solid #e34f4f;\n          }\n          ").concat(selector, " td {\n            flex-basis: 100%;\n            display: flex;\n            justify-content: space-between;\n            position: relative;\n          }\n          ").concat(selector, " td::before {\n            content: attr(").concat(options.label, ");\n            font-weight: bold;\n            margin-right: 10px !important;\n          }\n        }\n      ");
            $('#dynamic-css').remove();
            var styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'dynamic-css';
            styleElement.appendChild(document.createTextNode(dynamicCSS));
            document.head.appendChild(styleElement);
        }
        this.each(function () {
            var $table = $(this);
            applyCustomCSS.call($table);
            updateDynamicCSS($table.prop("tagName").toLowerCase(), mergedOptions);
        });
        return methods;
    };
})(jQuery);
//# sourceMappingURL=easy-table.js.map