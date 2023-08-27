"use strict";
(function ($) {
    $.fn.easyTableA11y = function (options) {
        var defaultOptions = {
            label: "data-label",
            view: "786px",
            selector: null,
            css: {
                trBottomBorder: '1px solid #000',
                tdMarginRight: '10px !important',
                tdFontWeight: 'bold'
            }
        };
        var mergedOptions = $.extend({}, defaultOptions, options);
        var methods = {
            setProps: function (options) {
                mergedOptions.label = options.label || defaultOptions.label;
                mergedOptions.view = options.view || defaultOptions.view;
                mergedOptions.selector =
                    options.selector || defaultOptions.selector;
            },
        };
        function applyDataAttributes() {
            var thValues = [];
            this.find("th").each(function () {
                thValues.push($(this).text().trim());
            });
            this.find("tr").each(function (index) {
                var $tr = $(this);
                $tr.find("td").each(function (tdIndex) {
                    var thValue = thValues[tdIndex];
                    $(this).attr(mergedOptions.label, thValue);
                });
            });
        }
        function generateDynamicCSS(targetSelector, options) {
            return "\n          @media screen and (max-width: ".concat(options.view, ") {\n            ").concat(targetSelector, " th {\n              display: none;\n            }\n            ").concat(targetSelector, " tr {\n              display: flex;\n              flex-wrap: wrap;\n              border-bottom: ").concat(options.css.trBottomBorder, ";\n            }\n            ").concat(targetSelector, " td {\n              flex-basis: 100%;\n              display: flex;\n              justify-content: space-between;\n              position: relative;\n            }\n            ").concat(targetSelector, " td::before {\n              content: attr(").concat(options.label, ");\n              font-weight: ").concat(options.css.tdFontWeight, ";\n              margin-right: ").concat(options.css.tdMarginRight, ";\n            }\n          }\n        ");
        }
        function updateDynamicCSS(selector, options) {
            var targetSelector = options.selector || selector;
            var dynamicCSS = generateDynamicCSS(targetSelector, options);
            $("#easy-table-dynamic-css").remove();
            var styleElement = document.createElement("style");
            styleElement.type = "text/css";
            styleElement.id = "easy-table-dynamic-css";
            styleElement.appendChild(document.createTextNode(dynamicCSS));
            document.head.appendChild(styleElement);
        }
        var $table = this;
        applyDataAttributes.call($table);
        updateDynamicCSS(mergedOptions.selector || $table.prop("tagName").toLowerCase(), mergedOptions);
        return methods;
    };
})(jQuery);
//# sourceMappingURL=easy-table.js.map