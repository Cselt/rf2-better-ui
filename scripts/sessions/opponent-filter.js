$(document).ready(function () {
  findSelectedFilters();

  waitForElm("section right-section button").then(function () {
    $("section right-section button").each(function (i) {
      $(this).click(function () {
        setTimeout(function () {
          findSelectedFilters();
        }, 250);
      });
    });
  });

  function findSelectedFilters() {
    waitForElm("section right-section div.opponent-filter ul").then(function () {
      $.get("/rest/sessions/opponents/filter", function (data, status) {
        data.forEach(function (d) {
          if (!d) return;

          // filter selected
          if (d.state === "OP_OR") {
            const selector = $(`section right-section div.opponent-filter ul li:contains(${d.stringValue})`);
            selector.css("font-style", "italic");
            selector.css("font-weight", "bold");
          }
        });

      });

      $("section right-section div.opponent-filter ul li").each(function (i) {
        $(this).click(function () {
          setTimeout(function () {
            findSelectedFilters();
          }, 250);
        });
      });
    });
  }

  function waitForElm(selector) {
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
});
