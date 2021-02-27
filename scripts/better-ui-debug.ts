function debugMain(): void {
  function addScriptTag(src: string): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (err: any) => void) => {
      const script: HTMLScriptElement = document.createElement('script');
      script.onload = () => resolve();
      script.onerror = (err: any) => reject(err);
      script.src = src;
      script.defer = true;

      document.getElementsByTagName('body')[0].appendChild(script);
    });
  }

  function addLinkTag(href: string): void {
    const link: HTMLLinkElement = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  function waitForElem(selector): Promise<any> {
    return new Promise((resolve: any) => {
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

  console.log('Better-UI running in debug mode');

  Promise.all([
    addScriptTag('http://localhost:4200/runtime.js'),
    addScriptTag('http://localhost:4200/polyfills.js'),
    addScriptTag('http://localhost:4200/vendor.js'),
    addScriptTag('http://localhost:4200/main.js'),
    addLinkTag('http://localhost:4200/styles.css')
  ]).then(() => {
    waitForElem('ui-view div').then(() => {
      const rfBetterUi: HTMLElement = document.createElement('rf-better-ui');
      document.getElementsByTagName('body')[0].prepend(rfBetterUi);
    });
  });
}

debugMain();
