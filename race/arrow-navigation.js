const LEFT = 37;
const RIGHT = 39;

$(document).ready(function () {

  $("body").keydown(function (e) {
    let selectedIdx = $("ol.tabnavigation").find("li.selected").index();

    const listItems = $("ol.tabnavigation li");
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
