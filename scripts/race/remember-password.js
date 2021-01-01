$(document).ready(function () {
  var elem;
  var enableLogging = false;

  if (enableLogging) {
    elem = document.createElement('div');
    elem.style.cssText = 'font-size: 0.5rem';
    elem.innerHTML = "SCRIPT LOG:";
    document.body.appendChild(elem);
  }

  // Find favorites
  const interval = setInterval(function () {
    console.log("Looking for favorites...");
    if ($("section#multiplayer ul li").length > 0) {
      addLog("Favorites found");
      clearInterval(interval);
      process();
    }

    const noFavoritePElement = $("section#multiplayer p")[1];
    if (noFavoritePElement && noFavoritePElement.textContent === "No favorite servers found.") {
      addLog("No favorite servers found.");
      clearInterval(interval);
    }
  }, 500);

  function process() {
    $("section#multiplayer ul li").each(function (i) {
      $(this).click(function () {
        const selected = $(this).find("span")[0].textContent;

        addLog("Selected " + selected);

        setTimeout(function () {
          const inputElement = $('#server-password');
          const savedPass = localStorage.getItem(selected);
          if (!!savedPass) {
            addLog("Restoring saved password " + savedPass);
            inputElement.val(savedPass).trigger('change');
          }

          inputElement.change(function () {
            addLog("Saving password " + inputElement.val() + " for " + selected);
            localStorage.setItem(selected, inputElement.val());
          });
        }, 0);

      });
    });
  }

  function addLog(msg) {
    if (!!elem && enableLogging) elem.innerHTML += "<br>" + msg;
    console.log(msg);
  }
});
