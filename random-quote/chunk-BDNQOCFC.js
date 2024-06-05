import {
  API,
  ChangeDetectorRef,
  CommonModule,
  HttpClient,
  SvgQuoteComponent,
  WebStorageService,
  map,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵqueryRefresh,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-2IE7US3Z.js";

// src/app/shared/component/loading/loading.component.ts
var _LoadingComponent = class _LoadingComponent {
};
_LoadingComponent.\u0275fac = function LoadingComponent_Factory(t) {
  return new (t || _LoadingComponent)();
};
_LoadingComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoadingComponent, selectors: [["app-loading"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 0, consts: [["id", "loading", 1, "flex", "justify-center", "items-start"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-10", "w-10", "text-blue-500"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 0116 0H4z", 1, "opacity-75"]], template: function LoadingComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 1);
    \u0275\u0275element(2, "circle", 2)(3, "path", 3);
    \u0275\u0275elementEnd()();
  }
} });
var LoadingComponent = _LoadingComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoadingComponent, { className: "LoadingComponent", filePath: "src\\app\\shared\\component\\loading\\loading.component.ts", lineNumber: 10 });
})();

// src/app/shared/services/quotes.service.ts
var _QuotesService = class _QuotesService {
  constructor(http, baseUrl, webStorageService) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.webStorageService = webStorageService;
    this.quotesArr = [];
  }
  getBranchesSelected() {
    return this.webStorageService.getBranches();
  }
  //to-do refractor get quotes
  getQuote(numQuotes) {
    return this.http.post(`${this.baseUrl}/quote`, {
      branchesSelected: this.getBranchesSelected(),
      numQuotes
    }).pipe(map((quote) => {
      return quote;
    }));
  }
};
_QuotesService.\u0275fac = function QuotesService_Factory(t) {
  return new (t || _QuotesService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(API), \u0275\u0275inject(WebStorageService));
};
_QuotesService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _QuotesService, factory: _QuotesService.\u0275fac, providedIn: "root" });
var QuotesService = _QuotesService;

// src/app/features/quotes-container/quotes-container.component.ts
var _c0 = ["swiper"];
function QuotesContainerComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function QuotesContainerComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
var _QuotesContainerComponent = class _QuotesContainerComponent {
  constructor(quotesService, cd) {
    this.quotesService = quotesService;
    this.cd = cd;
    this.isLoading = true;
    this.isAddLoading = false;
    this.showAddLoading = false;
    this.INIT_QUOTE_NUM = 4;
    this.ADD_QUOTE_NUM = 2;
    this.MAX_QUOTE_NUM = 20;
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.swiperRef.nativeElement.swiper.on("slideChange", (swiper) => {
      if (swiper.activeIndex === swiper.slides.length - 1) {
        this.additionalQuote();
      }
      if (swiper.activeIndex === swiper.slides.length - 2) {
        this.showAddLoading = true;
      }
    });
    this.initQuote();
  }
  initQuote() {
    this.getQuote(this.INIT_QUOTE_NUM);
  }
  additionalQuote() {
    this.isAddLoading = true;
    this.getQuote(this.ADD_QUOTE_NUM);
  }
  handleCapSlide() {
    if (this.swiperRef.nativeElement.swiper.slides.length >= this.MAX_QUOTE_NUM) {
      this.swiperRef.nativeElement.swiper.removeSlide([0, 1]);
    }
  }
  //handle error
  getQuote(numQuotes, isTryingAgain = false) {
    this.quotesService.getQuote(numQuotes).subscribe((quotes) => {
      quotes.forEach((quote) => {
        try {
          let quoteContent = JSON.parse(quote.content);
          this.swiperRef.nativeElement.swiper.appendSlide(`<swiper-slide>
            <div id="quote-content" class="card mx-2 text-white">
              <div class="card-body">
              <blockquote
              class="max-w-4xl mx-auto p-6 text-center italic rounded-lg cursor-pointer "
            >

              <p class="text-lg sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl  ">
              ${quoteContent.quote} 
              </p>
                    <cite class="not-italic font-normal text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl"
                >~ ${quoteContent.exponent || quoteContent.character} ${quoteContent.opera?.length > 0 ? ` from ${quoteContent.opera}` : ``} ~</cite>
              
            </blockquote>
            
              </div>
            </div>
          </swiper-slide>`);
        } catch (error) {
          console.error(error);
          if (!isTryingAgain) {
            this.getQuote(1, true);
          }
        }
      });
      this.handleCapSlide();
      this.isLoading = false;
      this.isAddLoading = false;
      this.showAddLoading = false;
    });
  }
};
_QuotesContainerComponent.\u0275fac = function QuotesContainerComponent_Factory(t) {
  return new (t || _QuotesContainerComponent)(\u0275\u0275directiveInject(QuotesService), \u0275\u0275directiveInject(ChangeDetectorRef));
};
_QuotesContainerComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _QuotesContainerComponent, selectors: [["app-quotes-container"]], viewQuery: function QuotesContainerComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c0, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.swiperRef = _t.first);
  }
}, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 9, vars: 2, consts: [["swiper", ""], [1, "pt-[15vh]"], [1, ""], [1, "text-center", "text-white", "mb-4"], ["id", "why-us-swiper", 1, "px-2", "px-md-5"], ["pagination", "true", "autoplay", "false", 1, "swiper"]], template: function QuotesContainerComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
    \u0275\u0275element(3, "app-svg-quote");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4);
    \u0275\u0275template(5, QuotesContainerComponent_Conditional_5_Template, 1, 0, "app-loading");
    \u0275\u0275element(6, "swiper-container", 5, 0);
    \u0275\u0275template(8, QuotesContainerComponent_Conditional_8_Template, 1, 0, "app-loading");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275conditional(5, ctx.isLoading ? 5 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(8, ctx.isAddLoading && ctx.showAddLoading ? 8 : -1);
  }
}, dependencies: [CommonModule, LoadingComponent, SvgQuoteComponent], styles: ["\n\n.spinner-border[_ngcontent-%COMP%] {\n  border-color: transparent;\n  border-top-color: #3490dc;\n}\nswiper-container[_ngcontent-%COMP%]::part(container) {\n  padding-bottom: 35px;\n}\nswiper-container[_ngcontent-%COMP%]::part(pagination) {\n  display: none;\n}\n/*# sourceMappingURL=quotes-container.component.css.map */"] });
var QuotesContainerComponent = _QuotesContainerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(QuotesContainerComponent, { className: "QuotesContainerComponent", filePath: "src\\app\\features\\quotes-container\\quotes-container.component.ts", lineNumber: 26 });
})();
export {
  QuotesContainerComponent
};
//# sourceMappingURL=chunk-BDNQOCFC.js.map
