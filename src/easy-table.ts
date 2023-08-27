(function ($) {
  $.fn.easyTableA11y = function (options?: EasyTableA11yOptions) {
    // Default options
    const defaultOptions: EasyTableA11yOptions = {
      label: "data-label",
      view: "786px",
      selector: null,
      css: {
        trBottomBorder: '1px solid #000',
        tdMarginRight: '10px !important',
        tdFontWeight: 'bold'
      }
    };

    // Merge the default options with the provided options
    const mergedOptions: EasyTableA11yOptions = $.extend(
      {},
      defaultOptions,
      options
    );

    // Plugin methods
    const methods: EasyTableA11y = {
      setProps: function (options: EasyTableA11yOptions) {
        // Update the plugin options
        mergedOptions.label = options.label || defaultOptions.label;
        mergedOptions.view = options.view || defaultOptions.view;
        mergedOptions.selector =
          options.selector || defaultOptions.selector;
      },
    };

    // Add data attributes
    function applyDataAttributes(this: JQuery<HTMLElement>) {
      const thValues: string[] = [];

      // Get the content of each 'th' element and store in 'thValues' array
      this.find("th").each(function () {
        thValues.push($(this).text().trim());
      });

      // Set 'data-label' attribute for each 'td' element with the corresponding 'th' value
      this.find("tr").each(function (index) {
        const $tr = $(this);
        $tr.find("td").each(function (tdIndex) {
          const thValue = thValues[tdIndex];
          $(this).attr(mergedOptions.label, thValue);
        });
      });
    }

    function generateDynamicCSS(
      targetSelector: string,
      options: EasyTableA11yOptions
    ): string {
      return `
          @media screen and (max-width: ${options.view}) {
            ${targetSelector} th {
              display: none;
            }
            ${targetSelector} tr {
              display: flex;
              flex-wrap: wrap;
              border-bottom: ${options.css.trBottomBorder};
            }
            ${targetSelector} td {
              flex-basis: 100%;
              display: flex;
              justify-content: space-between;
              position: relative;
            }
            ${targetSelector} td::before {
              content: attr(${options.label});
              font-weight: ${options.css.tdFontWeight};
              margin-right: ${options.css.tdMarginRight};
            }
          }
        `;
    }

    // Create a dynamic CSS class
    function updateDynamicCSS(selector: string, options: EasyTableA11yOptions) {
      const targetSelector = options.selector || selector;

      const dynamicCSS = generateDynamicCSS(targetSelector, options);

      // Remove any previously added style element
      $("#easy-table-dynamic-css").remove();

      // Create a new style element and append the dynamic CSS to it
      const styleElement = document.createElement("style");
      styleElement.type = "text/css";
      styleElement.id = "easy-table-dynamic-css";
      styleElement.appendChild(document.createTextNode(dynamicCSS));

      // Append the style element to the head of the document
      document.head.appendChild(styleElement);
    }

    // Initialize the plugin on each table element
    const $table = this;
    applyDataAttributes.call($table);
    updateDynamicCSS(mergedOptions.selector || $table.prop("tagName").toLowerCase(), mergedOptions);


    // Return the plugin methods
    return methods;
  };
})(jQuery);
