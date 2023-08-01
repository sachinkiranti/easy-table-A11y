(function ($) {
    $.fn.easyTableA11y = function (options?: EasyTableA11yOptions) {
      // Default options
      const defaultOptions: EasyTableA11yOptions = {
        label: 'data-label',
        view: '786px'
      };
  
      // Merge the default options with the provided options
      const mergedOptions: EasyTableA11yOptions = $.extend({}, defaultOptions, options);
  
      // Plugin methods
      const methods: EasyTableA11y = {
        setProps: function (options: EasyTableA11yOptions) {
          // Update the plugin options
          mergedOptions.label = options.label || defaultOptions.label;
          mergedOptions.view = options.view || defaultOptions.view;
        }
      };
  
      // Add custom CSS to the table
      function applyCustomCSS(this: JQuery<HTMLElement>) {
        const $table = this;
        const thValues: string[] = [];

        // Get the content of each 'th' element and store in 'thValues' array
        this.find('th').each(function () {
          thValues.push($(this).text().trim());
        });

        // Set 'data-label' attribute for each 'td' element with the corresponding 'th' value
        this.find('tr').each(function (index) {
          const $tr = $(this);
          $tr.find('td').each(function (tdIndex) {
            const thValue = thValues[tdIndex];
            $(this).attr(mergedOptions.label, thValue);
          });
        });
      }

      // Create a dynamic CSS class
    function updateDynamicCSS(selector: string, options: EasyTableA11yOptions) {
      const dynamicCSS = `
        @media screen and (max-width: ${options.view}) {
          ${selector} th {
            display: none;
          }
          ${selector} tr {
            display: flex;
            flex-wrap: wrap;
            border-bottom: 1px solid #e34f4f;
          }
          ${selector} td {
            flex-basis: 100%;
            display: flex;
            justify-content: space-between;
            position: relative;
          }
          ${selector} td::before {
            content: attr(${options.label});
            font-weight: bold;
            margin-right: 10px !important;
          }
        }
      `;

      // Remove any previously added style element
      $('#dynamic-css').remove();

      // Create a new style element and append the dynamic CSS to it
      const styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      styleElement.id = 'dynamic-css';
      styleElement.appendChild(document.createTextNode(dynamicCSS));

      // Append the style element to the head of the document
      document.head.appendChild(styleElement);
    }
  
      // Initialize the plugin on each table element
      this.each(function () {
        const $table = $(this);

        applyCustomCSS.call($table);
        updateDynamicCSS($table.prop("tagName").toLowerCase(), mergedOptions)
      });
  
      // Return the plugin methods
      return methods;
    };
  })(jQuery);