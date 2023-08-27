interface EasyTableA11yOptions {
  label: string;
  view: string;
  selector: string | null;
  css: EasyTableA11yCSS;
}

interface EasyTableA11yCSS {
  trBottomBorder: string;
  tdMarginRight: string;
  tdFontWeight: string;
}

interface EasyTableA11y {
  setProps(options: EasyTableA11yOptions): void;
}

interface JQuery<TElement = HTMLElement> {
  easyTableA11y(options?: EasyTableA11yOptions): EasyTableA11y;
}
