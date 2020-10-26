function setColors(className, colorList) {
  $("." + className).each(function(ind) {
    $(this).css("background-color", colorList[ind]);
    console.log(ind + " " + colorList[ind] + "\n");
  });
}

$().ready(function(){
    console.log("test");
    var catColors = ["#390099", "#9e0059", "#ff0054", "#ff5400", "#ffbd00"];
    setColors("cat", catColors);
    setColors("proc-form .input-group-text", catColors);
});
