export function waitForElement<T extends Element>(selector: string, timeout: number = 30000): Promise<T> {
  return new Promise((resolve: (element: T) => void, reject: () => void) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    // after timeout give up
    const timeoutHandler = setTimeout(() => {
      observer.disconnect();
      reject();
    }, timeout);

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
        clearInterval(timeoutHandler);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

export function timeout(ms: number): Promise<void> {
  return new Promise<void>((resolve: () => void) => setTimeout(resolve, ms));
}

export function arrowNavigation(
  event: KeyboardEvent,
  listItems: NodeListOf<HTMLLIElement>,
  selector: string = 'ol.tabnavigation:not(.bottom) li.selected'
): void {
  if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) {
    return;
  }

  const selectedLi: HTMLLIElement = document.querySelector(selector);
  let selectedIndex: number = -1;
  listItems.forEach((node: HTMLLIElement, index: number) => {
    if (selectedLi === node) {
      selectedIndex = index;
    }
  });

  switch (event.key) {
    case 'ArrowRight':
      selectedIndex = Math.min(selectedIndex + 1, listItems.length - 1);
      break;

    case 'ArrowLeft':
      selectedIndex = Math.max(selectedIndex - 1, 0);
      break;
  }

  listItems.forEach((node: HTMLLIElement, index: number) => {
    if (index === selectedIndex) {
      node.click();
    }
  });
}
