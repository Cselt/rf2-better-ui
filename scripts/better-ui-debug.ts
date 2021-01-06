function debugMain(): void {
  function addScriptTag(src: string): void {
    const script: HTMLScriptElement = document.createElement('script');
    script.src = src;
    script.defer = true;
    document.getElementsByTagName('body')[0].appendChild(script);
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
  addScriptTag('http://localhost:4200/styles.js');
  addScriptTag('http://localhost:4200/vendor.js');
  addScriptTag('http://localhost:4200/main.js');

  waitForElm('ui-view div').then(() => {
    setTimeout(() => {
      const rfBetterUi: HTMLElement = document.createElement('rf-better-ui');
      document.getElementsByTagName('body')[0].prepend(rfBetterUi);
    }, 200);
  });
}

debugMain();


