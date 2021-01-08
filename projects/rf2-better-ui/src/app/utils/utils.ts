export function waitForElement(selector: string): Promise<Element> {
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

export function arrowNavigation(event: KeyboardEvent,
                                listItems: NodeListOf<HTMLLIElement>,
                                selector: string = 'ol.tabnavigation:not(.bottom) li.selected'): void {
  if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) {
    return;
  }

  const selectedLi: HTMLLIElement = document.querySelector(selector);
  console.log("selected LI ", selectedLi);
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
