function main(): void {
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

  function addLinkTag(href: string): Promise<void> {
    const link: HTMLLinkElement = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
    return Promise.resolve();
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

  const div: HTMLDivElement = document.createElement('div');
  div.innerHTML =
    `<span id="betterUIVersion" style="position: absolute; bottom: 0; right: 0; z-index: 1; font-size: 10px">Better-UI </span>`;

  const devMode: boolean = localStorage.getItem('betterUi.devMode') === 'true';
  div.ondblclick = () => {
    if (devMode) {
      if (confirm('Are you sure you want to switch to Prod mode?')) {
        localStorage.removeItem('betterUi.devMode');
        window.location.reload();
      }
    } else {
      if (confirm('Are you sure you want to switch to Dev mode?')) {
        localStorage.setItem('betterUi.devMode', 'true');
        window.location.reload();
      }
    }
  };

  document.getElementsByTagName('body')[0].prepend(div);

  let allPromise: Promise<any>;
  if (devMode) {
    allPromise = Promise.all([
      addScriptTag('http://localhost:4200/runtime.js'),
      addScriptTag('http://localhost:4200/polyfills.js'),
      addScriptTag('http://localhost:4200/vendor.js'),
      addScriptTag('http://localhost:4200/main.js'),
      addLinkTag('http://localhost:4200/styles.css')
    ]);
  } else {
    allPromise = Promise.all([
      addScriptTag('../framework/rf2-better-ui/runtime.<runtime>.js'),
      addScriptTag('../framework/rf2-better-ui/polyfills.<polyfills>.js'),
      addScriptTag('../framework/rf2-better-ui/main.<main>.js'),
      addLinkTag('../framework/rf2-better-ui/styles.<styles>.css')
    ]);
  }

  allPromise.then(() => {
    waitForElem('ui-view div').then(() => {
      const rfBetterUi: HTMLElement = document.createElement('rf-better-ui');
      document.getElementsByTagName('body')[0].prepend(rfBetterUi);
    });
  });

}

main();

