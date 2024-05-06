


 const {createFeedback} =  require("D:\CustomerFeedback-ElectronApp\CustomerFeedbackProject-electron\src\main.js");

  window.addEventListener("load", () => {
   
        //const Next = document.querySelector('#Next');
        const smily_1 = document.querySelector("#smily_1");
        const smily_2 = document.querySelector("#smily_2");
         const smily_3 = document.querySelector("#smily_3");
         const smily_4 = document.querySelector("#smily_4");
        const smily_5 = document.querySelector("#smily_5");
       
    
    // Add click event listener to each anchor
    var smily_value = "";
    smily_1.addEventListener ("click", async(e)=>{
        console.log("Sd");
        smily_value = smily_1.name;
        const feedback  = {
            feedbackname:smily_value
        }
        const savefeedback = await createFeedback(feedback)
        alert(smily_value);
        
    })
    
        //smily_1.addEventListener("click", smily_value = smily_1.name);
        
        smily_2.addEventListener("click", smily_value = smily_2.name  );
        smily_3.addEventListener("click", smily_value = smily_3.name);
        smily_4.addEventListener("click",smily_value = smily_4.name);
        smily_5.addEventListener("click",smily_value = smily_5.name );
    
       
        });
async function init()
{

}
init()
        // const feedbackform = document.querySelector('#feedbackform')

// feedbackform.addEventListener('submit', async (e)=>{
//   alert("sd");
// })

    
