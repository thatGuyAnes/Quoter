import textLayer from '../layers/textLayer.js';
import tr from '../text/textTransformer.js';

import stage from '../stage/index.js';
import imageLayer from '../layers/imageLayer.js';

// Download
function downloadURI(uri, name) {
  var link = document.createElement("a");
  console.log('name', name);
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  //  delete link;
  link = null;
}
document.getElementById('download-btn').addEventListener('click', function () {
  //  tr.el.enabledAnchors = false;
  //  tr.el.borderStroke = 'red';
  // TODO: create a function to toggle the transformer on and off.
  tr.el.hide();
  textLayer.el.add(tr.el)
  textLayer.el.draw();
  let dataURL = stage.el.toDataURL();
  downloadURI(dataURL)
})

// Sliders
// blur
document.querySelector('#slider-blur').oninput = () => {
  blur();

}

function blur() {
  var slider = document.querySelector('#slider-blur');
  var originalImg = stage.el.find('#my-image')[0];
  originalImg.cache();
  originalImg.filters([Konva.Filters.Blur]);
  slider.oninput = function () {
    console.log('blurring');
    originalImg.blurRadius(slider.value);
    imageLayer.el.batchDraw();
  }
}
export default {
  download: downloadURI,
  blur: blur
}
