var _____WB$wombat$assign$function_____ = function (name) {
  return (self._wb_wombat && self._wb_wombat.local_init &&
    self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
  self.__WB_pmw = function (obj) {
    this.__WB_source = obj;
    return this;
  };
}
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opens = _____WB$wombat$assign$function_____("opens");
  const f = new FileReader();

  function onUpload() {
    if (this.files[0].type != "text/html") {
      alert("Only .html files supported");
      location.reload();
      return;
    }

    f.onload = clean;
    f.readAsText(this.files[0]);
  }

  function clean() {
    //decode html entries
    const decode = document.createElement("textarea");
    decode.innerHTML = f.result;

    let text = decode.value
      .replace(/icon=".+"/gmi, "");

    saveAs(
      new Blob([text], { type: "text/html;charset=utf-8" }),
      "optimized.html",
    );

    alert(
      `Optimized file is saved\nIt ${
        parseInt(100 - 100 / f.result.length * text.length)
      }% smaller `,
    );
    location.reload();
  }

  window.onload = () => {
    const upload = document.getElementById("upload");
    upload.addEventListener("change", onUpload);
  };
}
