
const { dialog, BrowserWindow } = require('electron')
const response = dialog.showMessageBox(null);

console.log(response);

function selectedresons()
{
   
    var checkboxes = document.querySelectorAll(".checkbox");
    var count = 0;
    for( var checkbox of checkboxes)
    {
          if(checkbox.checked == true  )
          {
              count ++;
              if(count >3)
              {
            
                alert("Maximum you can 3 selections");
                checkbox.checked= false;
                break;
              }
          }
         
    }

    
}
function feedback()
{
    selectedresons();
    window.location.href = "thankyou.html";
    
}
