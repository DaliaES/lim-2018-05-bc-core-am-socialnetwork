document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, "edge");
  });
  document.addEventListener('DOMContentLoaded', function() {
    
    //  var instance = M.Tabs.init(el, "responsiveThreshold");
    M.AutoInit();
  });
  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('.fixed-action-btn');
  //   var instances = M.FloatingActionButton.init(elems,{
  //     direction:'left',hoverEnabled:false
  //   })
  // });
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, "opacity");
  })

 