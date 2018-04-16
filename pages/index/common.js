//求数组和
function arrAmount(arr){
  var amount = 0;
  for(var i=0;i<arr.length;i++){
    amount+=arr[i].amount;
    // console.log(arr[i].amount);
    // console.log(arr[i].inc);
    // console.log(arr[i].type1);
  }
  return amount;
  
}

//判断被选中的类型
function type1Selected(arr){
  for(var i=0;i<arr.length;i++){
    if(arr[i].checked==true){
      return arr[i].name;
    }
  }
  return false;
}

//判断是否是收入
function amountSelected(arr){
  for(var i=0;i<arr.length;i++){
    if (arr[i].checked == true && i < 2) {
      return true;
    } else if (arr[i].checked == true && i >= 2){
      return false;
    }
  }
}

//返回用户选择日期的账单
function showSelDateBill(arr,date){
  var dateBill = []
  var arrCopy = []
  for(var i=0;i<arr.length;i++){
    if(arr[i].date==date){
     
      arrCopy = JSON.parse(JSON.stringify(arr[i])); //对象深拷贝
      arrCopy.index = i
      
      dateBill.push(arrCopy)
      
    }
  }
  // console.log(dateBill)
  return dateBill
}

//初始化支出清单
function showExpend(arr,type,num){
  var expendArr = []
  var arrCopy = []
  if(type=='月'){
    for(var i =0;i<arr.length;i++){
      if(arr[i].amount<0&&arr[i].date.substr(0,7)==num){
        arrCopy = JSON.parse(JSON.stringify(arr[i])); //对象深拷贝
        arrCopy.index = i
        expendArr.push(arrCopy)
      }
    }
  }else if(type=='年'){
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].amount < 0 && arr[i].date.substr(0, 4) == num) {
        arrCopy = JSON.parse(JSON.stringify(arr[i])); //对象深拷贝
        arrCopy.index = i
        expendArr.push(arrCopy)
      }
    }
  }else{
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].amount < 0) {
        arrCopy = JSON.parse(JSON.stringify(arr[i])); //对象深拷贝
        arrCopy.index = i
        expendArr.push(arrCopy)
      }
    }
  }
  return expendArr
}

//初始化收入清单
function showIncome(arr, type, num) {
  var IncomeArr = []
  var arrCopy = []
  if (type == '月') {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].amount > 0 && arr[i].date.substr(0, 7) == num) {
        arrCopy = JSON.parse(JSON.stringify(arr[i])); //对象深拷贝
        arrCopy.index = i
        IncomeArr.push(arrCopy)
      }
    }
  } else if (type == '年') {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].amount > 0 && arr[i].date.substr(0, 4) == num) {
        arrCopy = JSON.parse(JSON.stringify(arr[i])); //对象深拷贝
        arrCopy.index = i
        IncomeArr.push(arrCopy)
      }
    }
  } else {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].amount > 0) {
        arrCopy = JSON.parse(JSON.stringify(arr[i])); //对象深拷贝
        arrCopy.index = i
        IncomeArr.push(arrCopy)
      }
    }
  }
  return IncomeArr
}

//初始化结余清单
function showResidue(arr, type, num) {
  var ResidueArr = []
  var arrCopy = []
  if (type == '月') {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].date.substr(0, 7) == num) {
        arrCopy = JSON.parse(JSON.stringify(arr[i])); //对象深拷贝
        arrCopy.index = i
        ResidueArr.push(arrCopy)
      }
    }
  } else if (type == '年') {
    for (var i = 0; i < arr.length; i++) {
      if ( arr[i].date.substr(0, 4) == num) {
        arrCopy = JSON.parse(JSON.stringify(arr[i])); //对象深拷贝
        arrCopy.index = i
        ResidueArr.push(arrCopy)
      }
    }
  } else {
    ResidueArr = JSON.parse(JSON.stringify(arr))

  }
  return ResidueArr
}

//查找index为某个值的实际在整个数组中的序号
function findSelfIndex(arr,num){
  for(var i in arr){
    if(arr[i].index==num){
      return i
    }
  }
  return false
}

//在某个序号之后的每个元素的index都减少1
function resetIndex(arr,num){
  for(var i=num;i<arr.length;i++){
    arr[i].index=arr[i].index-1
  }
}

//index大于某个值的每个元素的index都减1
function reduceIndex(arr,num){
  for(var i in arr){
    if(arr[i].index>num){
      arr[i].index = arr[i].index - 1
    }
  }
}
//画圆饼图（包括标注）
function createPieChart(canvas_id,arr1,arr2,str){
  var context = wx.createContext()
  // console.log(total)
  //    定义圆心坐标  
  var point = { x: 220, y: 125 }
  //    定义半径大小  
  var radius = 60
  /*    循环遍历所有的pie */
  for (var i = 0; i < arr1.length; i++) {
    context.beginPath()
    context.arc(point.x, point.y, radius, this.totalFrom(arr1, i)* 2 * Math.PI, totalFrom(arr1, i + 1) * 2 * Math.PI, false)
    context.setLineWidth(30)
    //      4.填充样式  
    context.setStrokeStyle(arr1[i].color)
    //      5.填充动作  
    context.stroke()
    context.closePath()
  }
  for (var i in arr1) {
    context.fillStyle = arr1[i].color
    context.fillRect(25, 30 + 25 * i, 30, 15)
    context.font = "12px Arial"
    context.fillText(arr1[i].type1 + ':' + arr1[i].proportion * 100 + '%', 60, 42 + 25 * i)
  }
  var sum=0
  for(var i in arr2){
    sum+=arr2[i].amount
  }
  context.fillStyle = 'black'
  context.font = "16px Arial";
  context.fillText(Math.abs(sum), 202, 117);
  context.fillStyle = '#999'
  context.font = "14px Arial";
  context.fillText(str, 202, 137);
  
  
  wx.drawCanvas({
    //指定canvasId,canvas 组件的唯一标识符  
    canvasId: canvas_id,
    actions: context.getActions()
  })  
}



//数组指定某个序号，从序号开始，前面的百分比之和（为了做圆）
function totalFrom(arr, index) {
  var num = 0
  for (var i in arr) {
    if (i < index) {
      num += Math.abs(arr[i].proportion)
    }
  }
  return num
}

//整理结余并添加颜色的函数
function settleResidue(arr){
  var income = 0
  var expend = 0
  for(var i in arr){
    if(arr[i].amount<0){
      expend += Math.abs(arr[i].amount)
    } else if (arr[i].amount>0){
      income += arr[i].amount
    }
  }
  return [{ "amount": income, "type1": "收入", "color": '#D73B3B', "proportion": (income / (income + expend)).toFixed(2) }, { "amount": expend, "type1": "支出", "color": '#3BD75F', "proportion": (expend / (income + expend)).toFixed(2) }]
}

//合并同类型的项，整合json数组,并添加颜色
function combieArr(arr,color){
  var sum = Math.abs(this.arrAmount(arr))
  var sum_1 = 0
  // console.log(arr)
  var completeArr = [{ "amount": Math.abs(arr[0].amount), "type1": arr[0].type1, "img": arr[0].img, "proportion": Math.abs(arr[0].amount) / sum}] //先插入一个arr[0]
  
  for(var i=1;i<arr.length;i++){
    var exist = false
    for(var j in completeArr){
      if(arr[i].type1==completeArr[j].type1){
        completeArr[j].amount += Math.abs(arr[i].amount)
        completeArr[j].proportion += Math.abs(arr[i].amount) / sum
        exist = true
      }
    }
    if(!exist){
      completeArr.push({ "amount": Math.abs(arr[i].amount), "type1": arr[i].type1, "img": arr[i].img, "proportion": Math.abs(arr[i].amount)/sum})
    }
  }
  for(var i=0; i<completeArr.length-1;i++){
    completeArr[i].proportion = parseFloat(completeArr[i].proportion.toFixed(2))
    sum_1 += completeArr[i].proportion
  }
  completeArr[completeArr.length - 1].proportion = parseFloat((1-sum_1).toFixed(2))
  for(var i in completeArr){
    for(var j in color){
      if(completeArr[i].type1==color[j].name){
        completeArr[i]['color']=color[j].color
      }
    }
  }
  console.log(completeArr)
  return completeArr
}
module.exports.arrAmount =arrAmount
module.exports.type1Selected = type1Selected
module.exports.amountSelected = amountSelected
module.exports.showSelDateBill = showSelDateBill
module.exports.showExpend = showExpend
module.exports.showIncome = showIncome
module.exports.showResidue = showResidue
module.exports.findSelfIndex = findSelfIndex
module.exports.resetIndex = resetIndex
module.exports.reduceIndex = reduceIndex
module.exports.createPieChart = createPieChart
module.exports.combieArr = combieArr
module.exports.totalFrom = totalFrom
module.exports.settleResidue = settleResidue