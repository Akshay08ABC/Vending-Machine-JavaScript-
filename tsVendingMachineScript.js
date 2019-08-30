//Global Variable Declaration.
var GHomeContent, GDispenseContent, GRefillContent, GReportContent,
    GTitleOfPage, GRefillItemsList, GShowMessage,GRefillMessage,
    GStock, GProducts, GLeakageInfo;

window.onload = function()
{
  /*
   Description: Onload of the webpage EventListener added to the 
     nav links, dispense button and Refill button 
  */
  GHomeContent = document.getElementById("HomeContentId");
  GDispenseContent = document.getElementById("DispenseContentId");
  GRefillContent = document.getElementById("RefillContentId");
  GReportContent = document.getElementById("ReportContentId");
  GTitleOfPage = document.getElementById("PageTitleId");
  GShowMessage = document.getElementById("DisplayMessage");
  GRefillMessage = document.getElementById("ShowRefillMessage");
  //Declare Object GStock Which contains Raw Materials Details
  GStock = {
    teaLeaves : {capacity:500,cutOff: 50,cost:1, consume: 0},
    coffee : {capacity:500, cutOff:50,cost:2, consume: 0},
    sugar : {capacity:600,cutOff:50,cost:1.5, consume: 0},
    milk: {capacity:8000, cutOff:4000, cost:0.15, consume: 0},
    water: {capacity:15000, cutOff:600, cost:0.02, consume: 0}
  };
  //Declare GProducts which contains no of cups and prices of Item.
  GProducts = {
    strongCoffee : {noofcups : 0, costprice: 0,sellingprice: 0},
    lightCoffee : {noofcups : 0,costprice: 0,sellingprice: 0},
    strongTea : {noofcups : 0,costprice: 0,sellingprice: 0},
    lightTea : {noofcups : 0,costprice: 0,sellingprice: 0}
  };
  //Declare GLeakageInfo Object which contains Leakage Information.
  GLeakageInfo = {
    milk : 0,
    water : 0
  };
  var LHomeNavClick = document.getElementById("HomeClick"),
      LDispenseNavClick = document.getElementById("DispenseClick"),
      LRefillNavClick = document.getElementById("RefillClick"),
      LReportNavClick = document.getElementById("ReportClick"),
      LDispenseItemBtn = document.getElementById("Dispense"),
      LRefillItemsBtn = document.getElementById("refill");
  LHomeNavClick.addEventListener("click", HandleOnHomeNavClick);
  LDispenseNavClick.addEventListener("click", HandleOnDispenseNavClick);
  LRefillNavClick.addEventListener("click", HandleOnRefillNavClick);
  LReportNavClick.addEventListener("click", HandleOnReportNavClick);
  LDispenseItemBtn.addEventListener("click", HandleOnDispenseClick);
  LRefillItemsBtn.addEventListener("click", HandleOnRefillItemsClick);

  GRefillItemsList = document.getElementsByClassName("RefillItems");
  for (item of GRefillItemsList) {
    item.addEventListener("keyup", function(){
      if(this.checkValidity())
      {
        this.style.border = "1px solid black";
      }
      else
      {
        this.style.border = "2px solid red";
        this.focus();
      }
    });
  }
}

function HandleOnHomeNavClick()
{
  /*
   Description: This Listener executes upon Home Nav Click which 
     displays only homepage content.
  */
  GHomeContent.style.display = "block";
  GDispenseContent.style.display = "none";
  GRefillContent.style.display = "none";
  GReportContent.style.display = "none"; 
}
function HandleOnDispenseNavClick()
{
  /*
   Description: This Listener executes upon Dispense Nav Click which 
     displays only Dispense content.
  */
  GTitleOfPage.innerHTML = "Dispense Tea/Coffee";
  GHomeContent.style.display = "none";
  GDispenseContent.style.display = "block";
  GRefillContent.style.display = "none";
  GReportContent.style.display = "none"; 

  if(GShowMessage.innerHTML !== "")
  {
    GShowMessage.innerHTML = "";
  }
}

function HandleOnRefillNavClick()
{
  /*
   Description: This Listener executes upon Refill Nav Click which 
     displays only Refill content.
  */
  GTitleOfPage.innerHTML = "Stock Refill";
  GHomeContent.style.display = "none";
  GDispenseContent.style.display = "none";
  GRefillContent.style.display = "block";
  GReportContent.style.display = "none"; 

  if(GRefillMessage.innerHTML !== "")
  {
    GRefillMessage.innerHTML = "";
  }
  //Set Max Capacity to refill
  GRefillItemsList[0].setAttribute("max", (500 - GStock.teaLeaves.capacity));
  GRefillItemsList[1].setAttribute("max", (500 - GStock.coffee.capacity));
  GRefillItemsList[2].setAttribute("max", (600 - GStock.sugar.capacity));
  GRefillItemsList[3].setAttribute("max", (8000 - GStock.milk.capacity));
  GRefillItemsList[4].setAttribute("max", (15000 - GStock.water.capacity));

  //Show Stock Report
  var LRefillItemReportHeader = document.getElementById("RefillItemReport"),
      LRefillItemReportToUser = LRefillItemReportHeader.children;
  LRefillItemReportToUser[0].innerHTML = "Tea Leaves : " + GStock.teaLeaves.capacity;
  LRefillItemReportToUser[1].innerHTML = "Coffee Powder : " + GStock.coffee.capacity;
  LRefillItemReportToUser[2].innerHTML = "Sugar : " + GStock.sugar.capacity;
  LRefillItemReportToUser[3].innerHTML = "Milk : " + GStock.milk.capacity;
  LRefillItemReportToUser[4].innerHTML = "Water : " + GStock.water.capacity;

}
function HandleOnReportNavClick()
{
  /*
   Description: This Listener executes upon Report Nav Click which 
     displays only Report content and its data also shows Profit or loss.
  */

  var LTotalCostPrice = GProducts.strongCoffee.costprice + GProducts.lightCoffee.costprice +
                        GProducts.strongTea.costprice + GProducts.lightTea.costprice;
      LTotalSellingPrice = GProducts.strongCoffee.sellingprice + GProducts.lightCoffee.sellingprice +
                           GProducts.strongTea.sellingprice + GProducts.lightTea.sellingprice;
  
  GTitleOfPage.innerHTML = "Stock Report";
  GHomeContent.style.display = "none";
  GDispenseContent.style.display = "none";
  GRefillContent.style.display = "none";
  GReportContent.style.display = "block"; 

  //Display Report
  //Stock consumed
  var LConsumedChild = document.getElementById("stockconsumed").children;
  LConsumedChild[1].innerHTML = "Tea Leaves: " + (GStock.teaLeaves.consume).toString();
  LConsumedChild[2].innerHTML = "Coffee Powder: " + (GStock.coffee.consume).toString();
  LConsumedChild[3].innerHTML = "Sugar: " + (GStock.sugar.consume).toString();
  LConsumedChild[4].innerHTML = "Milk: " + (GStock.milk.consume).toString();
  LConsumedChild[5].innerHTML = "Water: " + (GStock.water.consume).toString();

  //stock Remaining
  var LStockRemainingChild = document.getElementById("stockremaining").children;
  LStockRemainingChild[1].innerHTML = "Tea Leaves: " + (GStock.teaLeaves.capacity).toString();
  LStockRemainingChild[2].innerHTML = "Coffee Powder: " + (GStock.coffee.capacity).toString();
  LStockRemainingChild[3].innerHTML = "Sugar: " + (GStock.sugar.capacity).toString();
  LStockRemainingChild[4].innerHTML = "Milk: " + (GStock.milk.capacity).toString();
  LStockRemainingChild[5].innerHTML = "Water: " + (GStock.water.capacity).toString();

  //Leakage Info
  var LLeakageInfoChild = document.getElementById("leakageinfo").children;
  LLeakageInfoChild[1].innerHTML = "Milk: " + GLeakageInfo.milk;
  LLeakageInfoChild[2].innerHTML = "Water: " + GLeakageInfo.water;

  //beverages detail
  var LBevereageDetailsChild = document.getElementById("beveragedetails").children;
  LBevereageDetailsChild[1].innerHTML = "No Of Strong Coffee Cups Dispensed: " + 
                                        (GProducts.strongCoffee.noofcups).toString();
  LBevereageDetailsChild[2].innerHTML = "No Of Light Coffee Cups Dispensed: " + 
                                        (GProducts.lightCoffee.noofcups).toString();
  LBevereageDetailsChild[3].innerHTML = "No Of Strong Tea Cups Dispensed: " + 
                                        (GProducts.strongTea.noofcups).toString();
  LBevereageDetailsChild[4].innerHTML = "No Of Light Tea Cups Dispensed: " + 
                                        (GProducts.lightTea.noofcups).toString();

  if((LTotalCostPrice - LTotalSellingPrice) > 0)
  {
    LBevereageDetailsChild[5].innerHTML = "Loss : " + 
                              (LTotalCostPrice - LTotalSellingPrice).toPrecision(2);
  }
  else
  {
    LBevereageDetailsChild[5].innerHTML = "Profit : " + 
                              (LTotalSellingPrice - LTotalCostPrice).toPrecision(2);
  }
}

function HandleOnDispenseClick()
{
  /*
   Description: this listener executes upon Dispense button click
     and dispenses the item and deduce raw materials required to it.
  */
  var LQuantity, LIsSugarSelected, LItem;
  LItem = document.getElementById("SelectItem").value;
  LQuantityItem = document.getElementById("quantity");
  
  if(LQuantityItem.value === "" || LQuantityItem.value <= 0)
  {
    LQuantityItem.style.border = "2px solid red";
    LQuantityItem.value = "";
    LQuantityItem.focus();
    return;
  }
  LQuantity = parseInt(LQuantityItem.value);
  LIsSugarSelected = document.getElementById("WithSugar");
  
  switch(LItem)
  {
    case "StrongCoffee":
      pvtDispenseStrongCoffee(LQuantity, LIsSugarSelected.checked);
      break;
    case "LightCoffee":
      pvtDispenseLightCoffee(LQuantity, LIsSugarSelected.checked);
      break;
    case "StrongTea":
      pvtDispenseStrongTea(LQuantity, LIsSugarSelected.checked);
      break;
    case "LightTea":
      pvtDispenseLightTea(LQuantity, LIsSugarSelected.checked);
      break;
  }
  LQuantityItem.value = "";
  LIsSugarSelected.checked = false;
}

function pvtDispenseStrongCoffee(p_intNoOfCups, p_boolSugarOrNot)
{
  /*
   Description: This function Dispenses StrongCoffee and deduce the 
     raw materials required to it.
   
   Parameters: 1. p_intNoOfCups (Type: Number)- get the no of cups to dispense.
               2. p_boolSugarOrNot (Type: Boolean) - With Sugar Selected or not.
  */
  var LQuantityItem = document.getElementById("quantity");
      LTotalSugarReq = p_intNoOfCups * 2,
      LTotalMilkReq = p_intNoOfCups * 50,
      LTotalCoffeePowReq = p_intNoOfCups * 4,
      LTotalWaterReq = p_intNoOfCups * 100,
      LMilkLeakage = LTotalMilkReq * 0.05,
      LWaterLeakage = LTotalWaterReq * 0.05,
      LTotalSellingPrice = p_intNoOfCups * 17.5,
      LSugarCost = 0, LCoffeePowCost = 0, LMilkCost = 0, LWaterCost =0;
  LTotalMilkReq += LMilkLeakage;
  LTotalWaterReq += LWaterLeakage;

  if(LTotalSugarReq <= GStock.sugar.capacity && LTotalMilkReq <= GStock.milk.capacity &&
    LTotalCoffeePowReq <= GStock.coffee.capacity && 
    LTotalWaterReq <= GStock.water.capacity)
  {
    pvtCheckCutOff();
    if(p_boolSugarOrNot)
    {
      GStock.sugar.capacity -= LTotalSugarReq;
      LSugarCost = LTotalSugarReq * 1.5;
    }  
    LCoffeePowCost = LTotalCoffeePowReq * 2;
    LMilkCost = LTotalMilkReq * 0.15;
    LWaterCost = LTotalWaterReq *0.02;
    //Capacity
    GStock.milk.capacity -= LTotalMilkReq;
    GStock.coffee.capacity -= LTotalCoffeePowReq;
    GStock.water.capacity -= LTotalWaterReq;
    //Prices and No of cups
    GProducts.strongCoffee.sellingprice += LTotalSellingPrice;
    GProducts.strongCoffee.costprice += (LCoffeePowCost + LSugarCost +
                                         LWaterCost + LMilkCost);
    GProducts.strongCoffee.noofcups += p_intNoOfCups; 
    //Leakage
    GLeakageInfo.milk += LMilkLeakage;
    GLeakageInfo.water += LWaterLeakage;
    //consume 
    pvtStoreConsumedDetails(LTotalCoffeePowReq, 0, LTotalMilkReq, LTotalSugarReq,LTotalWaterReq);
    GShowMessage.innerHTML = "Enjoy Your Strong Coffee"; 
    LQuantityItem.style.border = "1px solid black";                           
  }
  else
  {
    alert("Stock is less to disoense. Please Refill it.");
    GShowMessage.innerHTML = "";
  }
}
function pvtDispenseLightCoffee(p_intNoOfCups, p_boolSugarOrNot)
{
  /*
   Description: This function Dispenses LightCoffee and deduce the 
     raw materials required to it.
   
   Parameters: 1. p_intNoOfCups (Type: Number)- get the no of cups to dispense.
               2. p_boolSugarOrNot (Type: Boolean) - With Sugar Selected or not.
  */

 if((typeof(p_intNoOfCups) === "undefined") || (typeof(p_boolSugarOrNot) === "undefined"))
 {
   return;
 }

 var LQuantityItem = document.getElementById("quantity");
     LTotalSugarReq = p_intNoOfCups * 1.5,
     LTotalMilkReq = p_intNoOfCups * 60,
     LTotalCoffeePowReq = p_intNoOfCups * 2,
     LTotalWaterReq = p_intNoOfCups * 100,
     LMilkLeakage = LTotalMilkReq * 0.05,
     LWaterLeakage = LTotalWaterReq * 0.05,
     LTotalSellingPrice = p_intNoOfCups * 16.5,
     LSugarCost = 0, LCoffeePowCost = 0, LMilkCost = 0, LWaterCost =0;
 LTotalMilkReq += LMilkLeakage;
 LTotalWaterReq += LWaterLeakage;

if(LTotalSugarReq <= GStock.sugar.capacity && LTotalMilkReq <= GStock.milk.capacity &&
  LTotalCoffeePowReq <= GStock.coffee.capacity && LTotalWaterReq <= GStock.water.capacity)
{
  pvtCheckCutOff();
  if(p_boolSugarOrNot)
  {
    GStock.sugar.capacity -= LTotalSugarReq;
    LSugarCost = LTotalSugarReq * 1.5;
  }  
  LCoffeePowCost = LTotalCoffeePowReq * 2;
  LMilkCost = LTotalMilkReq * 0.15;
  LWaterCost = LTotalWaterReq *0.02;
  //capacity
  GStock.milk.capacity -= LTotalMilkReq;
  GStock.coffee.capacity -= LTotalCoffeePowReq;
  GStock.water.capacity -= LTotalWaterReq;
  //prices and no of cups
  GProducts.lightCoffee.sellingprice += LTotalSellingPrice;
  GProducts.lightCoffee.costprice += (LCoffeePowCost + LSugarCost +
                                    LWaterCost + LMilkCost); 
  GProducts.lightCoffee.noofcups += p_intNoOfCups;  
  //Leakage
  GLeakageInfo.milk += LMilkLeakage;
  GLeakageInfo.water += LWaterLeakage;   
  //consumed
  pvtStoreConsumedDetails(LTotalCoffeePowReq, 0, LTotalMilkReq, LTotalSugarReq,LTotalWaterReq);
  GShowMessage.innerHTML = "Enjoy Your Light Coffee";                                                               
  LQuantityItem.style.border = "1px solid black";
}
else
{
  alert("Stock is less to dispense. Please Refill it.");
  GShowMessage.innerHTML = "";
}
}

function pvtDispenseStrongTea(p_intNoOfCups, p_boolSugarOrNot)
{
  /*
   Description: This function Dispenses StrongTea and deduce the 
     raw materials required to it.
   
   Parameters: 1. p_intNoOfCups (Type: Number)- get the no of cups to dispense.
               2. p_boolSugarOrNot (Type: Boolean) - With Sugar Selected or not.
  */
 if((typeof(p_intNoOfCups) === "undefined") || (typeof(p_boolSugarOrNot) === "undefined"))
 {
   return;
 }

 var LQuantityItem = document.getElementById("quantity");
     LTotalSugarReq = p_intNoOfCups * 2,
     LTotalMilkReq = p_intNoOfCups * 30,
     LTotalTeaLeavesReq = p_intNoOfCups * 4,
     LTotalWaterReq = p_intNoOfCups * 150,
     LMilkLeakage = LTotalMilkReq * 0.05,
     LWaterLeakage = LTotalWaterReq * 0.05,
     LTotalSellingPrice = p_intNoOfCups * 15.50,
     LSugarCost = 0, LTeaLeavesCost = 0, LMilkCost = 0, LWaterCost =0;
 LTotalMilkReq += LMilkLeakage;
 LTotalWaterReq += LWaterLeakage;

if(LTotalSugarReq <= GStock.sugar.capacity && LTotalMilkReq <= GStock.milk.capacity &&
  LTotalTeaLeavesReq <= GStock.teaLeaves.capacity && LTotalWaterReq <= GStock.water.capacity)
{
  pvtCheckCutOff();
  if(p_boolSugarOrNot)
  {
    GStock.sugar.capacity -= LTotalSugarReq;
    LSugarCost = LTotalSugarReq * 1.5;
  }  
  LTeaLeavesCost = LTotalTeaLeavesReq * 1;
  LMilkCost = LTotalMilkReq * 0.15;
  LWaterCost = LTotalWaterReq *0.02;
  GStock.milk.capacity -= LTotalMilkReq;
  GStock.teaLeaves.capacity -= LTotalTeaLeavesReq;
  GStock.water.capacity -= LTotalWaterReq;
  GProducts.strongTea.sellingprice += LTotalSellingPrice;
  GProducts.strongTea.costprice += (LTeaLeavesCost + LSugarCost +
                                    LWaterCost + LMilkCost); 
  GProducts.strongTea.noofcups += p_intNoOfCups;    
  //Leakage
  GLeakageInfo.milk += LMilkLeakage;
  GLeakageInfo.water += LWaterLeakage;
  //consumed
  pvtStoreConsumedDetails(0, LTotalTeaLeavesReq, LTotalMilkReq, LTotalSugarReq,LTotalWaterReq); 
  GShowMessage.innerHTML = "Enjoy Your Strong Tea";  
  LQuantityItem.style.border = "1px solid black";                             
}
else
{
  alert("Stock is less to dispense. Please Refill it.");
  GShowMessage.innerHTML = "";
}
}

function pvtDispenseLightTea(p_intNoOfCups, p_boolSugarOrNot)
{
  /*
   Description: This function Dispenses LightTea and deduce the 
     raw materials required to it.
   
   Parameters: 1. p_intNoOfCups (Type: Number)- get the no of cups to dispense.
               2. p_boolSugarOrNot (Type: Boolean) - With Sugar Selected or not.
  */
 if((typeof(p_intNoOfCups) === "undefined") || (typeof(p_boolSugarOrNot) === "undefined"))
 {
   return;
 }
 var LQuantityItem = document.getElementById("quantity");
     LTotalSugarReq = p_intNoOfCups * 1.5,
     LTotalMilkReq = p_intNoOfCups * 40,
     LTotalTeaLeavesReq = p_intNoOfCups * 3,
     LTotalWaterReq = p_intNoOfCups * 150,
     LMilkLeakage = LTotalMilkReq * 0.05,
     LWaterLeakage = LTotalWaterReq * 0.05,
     LTotalSellingPrice = p_intNoOfCups * 15,
     LSugarCost = 0, LTeaLeavesCost = 0, LMilkCost = 0, LWaterCost =0;
 LTotalMilkReq += LMilkLeakage;
 LTotalWaterReq += LWaterLeakage;

if(LTotalSugarReq <= GStock.sugar.capacity && LTotalMilkReq <= GStock.milk.capacity &&
  LTotalTeaLeavesReq <= GStock.teaLeaves.capacity && LTotalWaterReq <= GStock.water.capacity)
{
  pvtCheckCutOff();  
  if(p_boolSugarOrNot)
  {
    GStock.sugar.capacity -= LTotalSugarReq;
    LSugarCost = LTotalSugarReq * 1.5;
  }  
  LTeaLeavesCost = LTotalTeaLeavesReq * 1;
  LMilkCost = LTotalMilkReq * 0.15;
  LWaterCost = LTotalWaterReq *0.02;
  //Deduce Stock Materials quantity
  GStock.milk.capacity -= LTotalMilkReq;
  GStock.teaLeaves.capacity -= LTotalTeaLeavesReq;
  GStock.water.capacity -= LTotalWaterReq;
  GProducts.lightTea.sellingprice += LTotalSellingPrice;
  GProducts.lightTea.costprice += (LTeaLeavesCost + LSugarCost +
                                    LWaterCost + LMilkCost); 
  GProducts.lightTea.noofcups += p_intNoOfCups;      
  //Leakage
  GLeakageInfo.milk += LMilkLeakage;
  GLeakageInfo.water += LWaterLeakage;
  GShowMessage.innerHTML = "Enjoy Your Light Tea";
  //consumed
  pvtStoreConsumedDetails(0, LTotalTeaLeavesReq, LTotalMilkReq, LTotalSugarReq,LTotalWaterReq);                                
  LQuantityItem.style.border = "1px solid black";                             
}
else
{
  alert("Stock is less to dispense. Please Refill it.");
  GShowMessage.innerHTML = "";
}
}

function pvtStoreConsumedDetails(p_intCoffeConsumed, p_intTeaLeavesConsumed, p_intMilkConsumed,
                                 p_intSugarConsumed, p_intWaterConsumed)
{
  /*
   Description: This Function stores the how much raw materials 
     consumed in global object GStock and also displays the details to user.

   Parameters: 1. p_intCoffeConsumed (Type: Int) - To get value of how much coffee consumed.
               2. p_intTeaLeavesConsumed (Type: Int) - To get value of how much tealeaves consumed.
               3. p_intMilkConsumed (Type: Int) - To get value of how much Milk consumed.
               4. p_intSugarConsumed (Type: Int) - To get value of how much Sugar consumed.
               5. p_intWaterConsumed (Type: Int) - To get value of how much Water consumed.
  */
  if((typeof(p_intCoffeConsumed) === "undefined") || (typeof(p_intTeaLeavesConsumed) === "undefined") || 
    (typeof(p_intMilkConsumed) === "undefined") || (typeof(p_intSugarConsumed) === "undefined") || 
    (typeof(p_intWaterConsumed) === "undefined"))
  {
    return;
  }

  GStock.coffee.consume += p_intCoffeConsumed;
  GStock.teaLeaves.consume += p_intTeaLeavesConsumed;
  GStock.milk.consume += p_intMilkConsumed;
  GStock.sugar.consume += p_intSugarConsumed;
  GStock.water.consume += p_intWaterConsumed;

  //Show Details To User About Item Dispensed.
  var LDispenseItemReportHeader = document.getElementById("DispenseItemReport"),
      LDispenseItemReportToUser = LDispenseItemReportHeader.children;
  LDispenseItemReportToUser[0].innerHTML = "Tea Leaves : " + GStock.teaLeaves.capacity;
  LDispenseItemReportToUser[1].innerHTML = "Coffee Powder : " + GStock.coffee.capacity;
  LDispenseItemReportToUser[2].innerHTML = "Sugar : " + GStock.sugar.capacity;
  LDispenseItemReportToUser[3].innerHTML = "Milk : " + GStock.milk.capacity;
  LDispenseItemReportToUser[4].innerHTML = "Water : " + GStock.water.capacity;
}

function HandleOnRefillItemsClick()
{
  /*
   Description: This Function Validates the Refill Form if it successful then Refill the
     stock with user entered quantities.
  */
  var LRefillform = document.getElementById("RefillForm");
  
  for(item of GRefillItemsList)
  {
    if(item.value === "")
    {
      item.value = 0;
    }
  }
  if(GRefillItemsList[0].value === "0" && GRefillItemsList[1].value === "0" &&
    GRefillItemsList[2].value === "0" && GRefillItemsList[3].value === "0" &&
    GRefillItemsList[4].value === "0")
  {
    GRefillMessage.innerHTML = "Please Enter Proper Values";
    return;     
  }
  if(LRefillform.checkValidity())
  {
    GStock.teaLeaves.capacity += parseInt(GRefillItemsList[0].value);
    GStock.coffee.capacity += parseInt(GRefillItemsList[1].value);
    GStock.sugar.capacity += parseInt(GRefillItemsList[2].value);
    GStock.milk.capacity += parseInt(GRefillItemsList[3].value);
    GStock.water.capacity += parseInt(GRefillItemsList[4].value);
    GRefillMessage.innerHTML = "Stock Refilled SuccessFully";
  }
  for(item of GRefillItemsList)
  {
    item.value = 0;
  }
}
function HandleOnQuantityInputKeyUp()
{
  /*
   Description: This Function validates the no of cups value for less than 
     0 or blank
  */
  var LQuantityItem = document.getElementById("quantity");
  if(LQuantityItem.value === "" || LQuantityItem.value < 0)
  {
    LQuantityItem.style.border = "2px solid red";
    LQuantityItem.focus();
  }
  else
  {
    LQuantityItem.style.border = "1px solid black";
  }
}
function pvtCheckCutOff()
{
  /*
   Description : This Function checks the CutOFf Value of Products 
    and displays warning to refill.
  */
  if(GStock.sugar.capacity <= GStock.sugar.cutOff ||
    GStock.milk.capacity <= GStock.milk.cutOff ||
    GStock.coffee.capacity <= GStock.coffee.cutOff ||
    GStock.water.capacity <= GStock.water.cutOff ||
    GStock.teaLeaves.capacity <= GStock.teaLeaves.cutOff)
  {
    alert("Please Refill the Stock");
    GShowMessage.innerHTML = "";
  }
}