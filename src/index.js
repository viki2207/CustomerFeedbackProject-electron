
window.addEventListener("load", () => {
    
    const smily_1 = document.querySelector("#smily_1");
   
   const smily_2 = document.querySelector("#smily_2");
   const smily_3 = document.querySelector("#smily_3");
   const smily_4 = document.querySelector("#smily_4");
   const smily_5 = document.querySelector("#smily_5");
  

// Add click event listener to each anchor
var smily_value = "";
    smily_1.addEventListener("click", smily_value = smily_1.name);
    
    smily_2.addEventListener("click", smily_value = smily_2.name  );
    smily_3.addEventListener("click", smily_value = smily_3.name);
    smily_4.addEventListener("click",smily_value = smily_4.name);
    smily_5.addEventListener("click",smily_value = smily_5.name );

   
    });

    
// function feedback(SmilyId)
//  {
//     document.querySelector(SmilyId).addEventListener("click", e => {
//             e.preventDefault();
         
//            alert(SmilyId);
//         });
    
//  }