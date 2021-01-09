function debugMain(): void {
  console.log("Better-UI running in debug mode");
  function addScriptTag(src: string): void {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = src;
    script.defer = true;
    document.getElementsByTagName('body')[0].appendChild(script);
  }

  function addLinkTag(href: string): void {
    const link: HTMLLinkElement = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  function waitForElm(selector): Promise<any> {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  addScriptTag('http://localhost:4200/runtime.js');
  addScriptTag('http://localhost:4200/polyfills.js');
  addScriptTag('http://localhost:4200/vendor.js');
  addScriptTag('http://localhost:4200/main.js');
  addLinkTag('http://localhost:4200/styles.css');

  waitForElm('ui-view div').then(() => {
    setTimeout(() => {
      const rfBetterUi: HTMLElement = document.createElement('rf-better-ui');
      document.getElementsByTagName('body')[0].prepend(rfBetterUi);
    }, 200);
  });
}

debugMain();


