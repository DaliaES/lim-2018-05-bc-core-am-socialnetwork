document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, "edge");
  });
  document.addEventListener('DOMContentLoaded', function() {
    
    //  var instance = M.Tabs.init(el, "responsiveThreshold");
    M.AutoInit();
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, "opacity");
  })
  // $(document).ready(function() {
  //   $('input#input_text').characterCounter()
  // });
 