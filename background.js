const sbs = () => {
  const images = document.querySelectorAll(".img-fluid"); // Replace '.manga-page' with the actual selector for the manga pages
  const gallery = document.querySelector(".ImageGallery");
  const collector = [];
  const imgArr = [];

  const createDiv = () => {
    const div = document.createElement("div");
    div.style.cssText =
      "display:flex; height:100vh; justify-content:center; align-items:center";
    return div;
  };

  const handlePages = (arr) => {
    const div = createDiv();
    arr.forEach((img) => {
      img.style.cssText = `max-width: 95vw;
             max-height: 90%;
             object-fit: contain;
             margin: 1rem;`;
      div.prepend(img);
    });

    collector.push(div);
    imgArr.length = 0;
  };

  const handleSingle = (img) => {
    imgArr.length < 2 && imgArr.push(img);
    imgArr.length == 2 && handlePages(imgArr);
    return;
  };

  images.forEach((img) => {
    if (img.naturalWidth < 100) return;
    if (img.naturalWidth < img.naturalHeight) handleSingle(img);
    if (img.naturalWidth > img.naturalHeight) handlePages([img]);
  });

  gallery.innerHTML = "";
  const container = document.createElement("div");
  container.style.cssText = `display:flex;
      flex-direction:column;
      background-color:white;
      overflow-y:scroll;`;
  collector.forEach((p) => container.appendChild(p));
  gallery.append(container);
};

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("mangasee123.com/read-online/")) {
    console.log("includes success");
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: sbs,
    });
  }
});
