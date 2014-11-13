// ==UserScript==
// @id             noWhiteBackgroundColor-gray
// @name           noWhiteBackgroundColor-gray
// @version        2.2
// @author         HowardSmith
// @modefied       ywzhaiqi add support autopager
// @description    Version 2: Generic version which can now be configured to any background colour you like:
// @include        *
// @run-at         document-end
// @namespace      https://greasyfork.org/users/145
// ==/UserScript==
(function() {


  function changeBackgroundColor(x) { // auto change colors too close to white
    if(x.getAttribute("mColored") == "true"){
      return;
    }
    x.setAttribute("mColored", "true");

    var elemStyle = window.getComputedStyle(x, null);
    if(!elemStyle) return;

    var backgroundColorRGB = elemStyle.backgroundColor; // get background-color
    if (backgroundColorRGB != "transparent") { // convert hex color to rgb color to compare
      var RGBValuesArray = backgroundColorRGB.match(/\d+/g); //get rgb values
      var red = RGBValuesArray[0];
      var green = RGBValuesArray[1];
      var blue = RGBValuesArray[2];

      // ============================================================================
      // Set the base colors you require:
      // use: http://www.colorpicker.com
      // to find the rgb values of the base colour you wish to suppress white backgrounds with:
      // Default gray provided:
      // ============================================================================

      var red_needed = 199;
      var green_needed = 237;
      var blue_needed = 204;

      if (red >= 199 && green >= 237 && blue >= 204) { // white range detection

        if (red >= 250 && red <= 255 && green >= 250 && green <= 255 && blue >= 250 && blue <= 255) {
          red_needed += 0;
          green_needed += 0;
        } else if (red >= 240 && red <= 255 && green >= 240 && green <= 255 && blue >= 240 && blue <= 255) {
          red_needed += 6;
          green_needed += 3;
        } else if (red >= 230 && red <= 255 && green >= 230 && green <= 255 && blue >= 230 && blue <= 255) {
          red_needed += 10;
          green_needed += 5;
        } else if (red >= 220 && red <= 255 && green >= 220 && green <= 255 && blue >= 220 && blue <= 255) {
          red_needed += 14;
          green_needed += 7;
        } else if (red >= 210 && red <= 255 && green >= 210 && green <= 255 && blue >= 210 && blue <= 255) {
          red_needed += 18;
          blue_needed += 9;
        }

        x.style.backgroundColor = "rgb( " + red_needed + ", " + green_needed + ", " + blue_needed + ")"; // the background-color you want
      }
    }
  }

  function fixAutoPage() {
    // 创建观察者对象
    var observer = new window.MutationObserver(function(mutations){
      var nodeAdded = mutations.some(function(x){ return x.addedNodes.length > 0; });
      if (nodeAdded) {
        noWhiteBackgroundColor();
      }
    });
    observer.observe(document.body, {childList: true, subtree: true});
  }

  function noWhiteBackgroundColor() {
    var allElements = document.querySelectorAll("*:not([mColored='true'])"); // get all elements on a page
    for (var i = 0; i < allElements.length; i++) {
      changeBackgroundColor(allElements[i]);
    }
  }

  noWhiteBackgroundColor();

  fixAutoPage();
})();
