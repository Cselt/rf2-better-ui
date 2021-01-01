const LEFT = 37;
const RIGHT = 39;

$(document).ready(function () {

  $("body").keydown(function (e) {
    let selectedIdx = $("main section ").find("div.selected").index();

    const listItems = $("main section div.thumbnail");
    const listItemNum = listItems.length;

    switch (e.keyCode) {
      case LEFT:
        selectedIdx = Math.max(selectedIdx - 1, 0);
        break;

      case RIGHT:
        selectedIdx = Math.min(selectedIdx + 1, listItems.length);
        break;
    }
    listItems.eq(selectedIdx).click();
  });
});
