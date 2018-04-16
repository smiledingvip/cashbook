//index.js
//获取应用实例
var app = getApp()
var common = require('common.js')
Page({
  data: {
    dateValue: '',
    hiddenformput: true,
    modalHidden:true,
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    totalAmount: 0,
    bill: [],
    dateBill:[],
    color: '#93DCB7',
    type1: [
      { "name": "工资", "img":"wage", "value": "工资", "color":"#93DCB8","checked":true},
      { "name": "红包", "img": "redpacket", "value": "红包", "color": "#D94956" },
      { "name": "饮食", "img": "food", "value": "饮食", "color":"#FF8887" },
      { "name": "交通", "img": "transport", "value": "交通", "color":"#6EB2DE" },
      { "name": "衣服", "img": "cloth", "value": "衣服", "color":"#F39F60" },
      { "name": "购物", "img": "shopping", "value": "购物", "color":"#D9584A" },
      { "name": "住宿", "img": "rent", "value": "住宿", "color":"#C6B29C" },
      { "name": "其他", "img": "others", "value": "其他", "color":"#FEC400" },
    ],
    type2:'',
    //9种数据分类归总
    monthExpendArr:'',
    monthIncomeArr:'',
    monthResidueArr:'',
    yearExpendArr: '',
    yearIncomeArr: '',
    yearResidueArr: '',
    totalExpendArr: '',
    totalIncomeArr: '',
    totalResidueArr: '',
    //9种数据分析归总
    monthExpendAna: '',
    monthIncomeAna: '',
    monthResidueAna: '',
    yearExpendAna: '',
    yearIncomeAna: '',
    yearResidueAna: '',
    totalExpendAna: '',
    totalIncomeAna: '',
    totalResidueAna: '',
    month:'',
    year:'',
    // 报表tab的bindtap数字
    selected0: true,
    selected1: false,
    selected2: false,
    selected3: true,
    selected4: false,
    selected5: false
  },
  //日期选择事件
  datePickerBindchange: function (e) {
    var dateChange = e.detail.value
    
    var mm = dateChange.substr(5,2)
    var yy = dateChange.substr(0,4)
    console.log(mm)
    console.log(yy)
    if(this.data.dateValue.substr(0,4)!=yy){
      var monthExpendArr = common.showExpend(this.data.bill, '月', yy + '-' + mm)
      var monthIncomeArr = common.showIncome(this.data.bill, '月', yy + '-' + mm)
      var monthResidueArr = common.showResidue(this.data.bill, '月', yy + '-' + mm)
      var yearExpendArr = common.showExpend(this.data.bill, '年', yy)
      var yearIncomeArr = common.showIncome(this.data.bill, '年', yy)
      var yearResidueArr = common.showResidue(this.data.bill, '年', yy)
    }else{
      if (this.data.dateValue.substr(5, 2)!=mm){
        var monthExpendArr = common.showExpend(this.data.bill, '月', yy + '-' + mm)
        var monthIncomeArr = common.showIncome(this.data.bill, '月', yy + '-' + mm)
        var monthResidueArr = common.showResidue(this.data.bill, '月', yy + '-' + mm)
      }
    }
    var bill = this.data.bill
    var dateBill = common.showSelDateBill(bill, dateChange)
    console.log(monthExpendArr)
    console.log(monthIncomeArr)
    console.log(monthResidueArr)
    console.log(yearExpendArr)
    console.log(yearIncomeArr)
    console.log(yearResidueArr)
    console.log(this.data.totalExpendArr)
    console.log(this.data.totalIncomeArr)
    console.log(this.data.totalResidueArr)
    this.setData({
      dateValue: dateChange,
      dateBill: dateBill,
      totalAmount: common.arrAmount(dateBill),
      month:mm,
      year:yy,
      monthExpendArr: monthExpendArr ? monthExpendArr : this.data.monthExpendArr,
      monthIncomeArr: monthIncomeArr ?monthIncomeArr:this.data.monthIncomeArr,
      monthResidueArr: monthResidueArr ? monthResidueArr:this.data.monthResidueArr,
      yearExpendArr: yearExpendArr ?yearExpendArr:this.data.yearExpendArr,
      yearIncomeArr: yearIncomeArr ?yearIncomeArr:this.data.yearIncomeArr,
      yearResidueArr: yearResidueArr ?yearResidueArr:this.data.yearResidueArr,
      totalExpendArr: this.data.totalExpendArr,
      totalIncomeArr: this.data.totalIncomeArr,
      totalResidueArr: this.data.totalResidueArr,
    })
    
  },
  //打开删除明细确定页面
  showModal:function(e){

    this.setData({
      modalHidden: false
    })
  },
  //修改明细点击事件
  modifyinput: function () {
    this.setData({
      hiddenformput: !this.data.hiddenformput,
      type2:'修改'
    })
  },
  //确定明细删除事件
  confirm:function(e){
    var that = this
    //获取需要被删除的dateBill在bill中的index
    var index = this.data.dateBill[this.data.id].index
    //储存被删项的值
    var amount = this.data.dateBill[this.data.id].amount
    //删除dateBill中被选中的哪项
    this.data.dateBill.splice(this.data.id,1)
    //修改dateBill中被删除的那项之后每一项的index都提前一位
    for(var i=this.data.id;i<this.data.dateBill;i++){
      this.data.dateBill[i].index-=1
    }
    //删除dateBill中被删除的哪项对应在bill中的那项
    this.data.bill.splice(index,1)
    //判断被删项是收入还是支出
    if(amount>0){
      //是收入
      this.data.monthIncomeArr.splice(common.findSelfIndex(this.data.monthIncomeArr,index),1)
      this.data.yearIncomeArr.splice(common.findSelfIndex(this.data.yearIncomeArr, index), 1)
      this.data.totalIncomeArr.splice(common.findSelfIndex(this.data.totalIncomeArr, index), 1)
    }else if(amount<0){
      this.data.monthExpendArr.splice(common.findSelfIndex(this.data.monthExpendArr, index), 1)
      this.data.yearExpendArr.splice(common.findSelfIndex(this.data.yearExpendArr, index), 1)
      this.data.totalExpendArr.splice(common.findSelfIndex(this.data.totalExpendArr, index), 1)
    }
    this.data.monthResidueArr.splice(common.findSelfIndex(this.data.monthResidueArr, index), 1)
    this.data.yearResidueArr.splice(common.findSelfIndex(this.data.yearResidueArr, index), 1)
    this.data.totalResidueArr.splice(index, 1)
    common.reduceIndex(this.data.monthIncomeArr,index)
    common.reduceIndex(this.data.yearIncomeArr, index)
    common.reduceIndex(this.data.totalIncomeArr, index)
    common.reduceIndex(this.data.monthExpendArr, index)
    common.reduceIndex(this.data.yearExpendArr, index)
    common.reduceIndex(this.data.totalExpendArr, index)
    common.reduceIndex(this.data.monthResidueArr, index)
    common.reduceIndex(this.data.yearResidueArr, index)
    wx.setStorageSync('bill', this.data.bill)
    console.log(this.data.monthExpendArr)
    console.log(this.data.monthIncomeArr)
    console.log(this.data.monthResidueArr)
    console.log(this.data.yearExpendArr)
    console.log(this.data.yearIncomeArr)
    console.log(this.data.yearResidueArr)
    console.log(this.data.totalExpendArr)
    console.log(this.data.totalIncomeArr)
    console.log(this.data.totalResidueArr)

    var monthExpendAna = common.combieArr(this.data.monthExpendArr, this.data.type1)
    var monthIncomeAna = common.combieArr(this.data.monthIncomeArr, this.data.type1)
    var monthResidueAna = common.settleResidue(this.data.monthResidueArr, this.data.type1)
    var yearExpendAna = common.combieArr(this.data.yearExpendArr, this.data.type1)
    var yearIncomeAna = common.combieArr(this.data.yearIncomeArr, this.data.type1)
    var yearResidueAna = common.settleResidue(this.data.yearResidueArr, this.data.type1)
    var totalExpendAna = common.combieArr(this.data.totalExpendArr, this.data.type1)
    var totalIncomeAna = common.combieArr(this.data.totalIncomeArr, this.data.type1)
    var totalResidueAna = common.settleResidue(this.data.totalResidueArr)

    that.setData({
      modalHidden: true,
      totalAmount: common.arrAmount(that.data.dateBill),
      bill:that.data.bill,
      dateBill:that.data.dateBill,
      monthExpendArr: this.data.monthExpendArr,
      monthIncomeArr: this.data.monthIncomeArr,
      monthResidueArr: this.data.monthResidueArr,
      yearExpendArr: this.data.yearExpendArr,
      yearIncomeArr: this.data.yearIncomeArr,
      yearResidueArr: this.data.yearResidueArr,
      totalExpendArr: this.data.totalExpendArr,
      totalIncomeArr: this.data.totalIncomeArr,
      totalResidueArr: this.data.totalResidueArr,

      monthExpendAna: monthExpendAna,
      monthIncomeAna: monthIncomeAna,
      monthResidueAna: monthResidueAna,
      yearExpendAna: yearExpendAna,
      yearIncomeAna: yearIncomeAna,
      yearResidueAna: yearResidueAna,
      totalExpendAna: totalExpendAna,
      totalIncomeAna: totalIncomeAna,
      totalResidueAna: totalResidueAna,
    })
  },
  //取消明细删除事件
  cancel:function(){
    this.setData({
      modalHidden:true
    })
  },
  //明细点击显示删除或者重设事件
  choseSection:function(e){
    this.setData({
      id:e.currentTarget.dataset.id
    })
  },
  //记一笔点击事件
  forminput: function () {
    
    this.setData({
      hiddenformput: !this.data.hiddenformput,
      type2:'新增'
    })
  },
  //取消按钮  
  formReset: function () {
    console.log(this.data.id)
    this.setData({
      hiddenformput: true,
      
    })
  },
  //确认上传  
  formSubmit: function (e) {
    var index = this.data.bill.length  //获取bill的最后一位index，并加一
    //要获取bill的总数量的index,这里是3
    if(this.data.type2=='新增'){
      //点记一笔，新增明细
      for (var i in this.data.type1) {
        if (this.data.type1[i].checked == true && i <2) {
          //选择的日期账单里添加一遍，总账单里再添加一遍
          this.data.dateBill.push({ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue,"index":index})
          this.data.monthIncomeArr.push({ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.yearIncomeArr.push({ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.totalIncomeArr.push({ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          
          this.data.monthResidueArr.push({ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.yearResidueArr.push({ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.totalResidueArr.push({ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue })
          this.data.bill.push({ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue})
          
        } else if (this.data.type1[i].checked == true && i >=2) {
          //选择的日期账单里添加一遍，总账单里再添加一遍
          this.data.dateBill.push({ "amount": 0 - parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue,"index":index })
          this.data.monthExpendArr.push({ "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.yearExpendArr.push({ "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.totalExpendArr.push({ "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })

          this.data.monthResidueArr.push({ "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.yearResidueArr.push({ "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.totalResidueArr.push({ "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue })
          this.data.bill.push({ "amount": 0 - parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue})
        }
      }
      // console.log(this.data.dateBill)
      // console.log(this.data.monthExpendArr)
      // console.log(this.data.monthIncomeArr)
      // console.log(this.data.monthResidueArr)
      // console.log(this.data.yearExpendArr)
      // console.log(this.data.yearIncomeArr)
      // console.log(this.data.yearResidueArr)
      // console.log(this.data.totalExpendArr)
      // console.log(this.data.totalIncomeArr)
      // console.log( this.data.totalResidueArr)
      // console.log(this.data.bill)
      wx.setStorageSync('bill',this.data.bill)
      // wx.request({
      //   url:'add_section.php',
      //   data:{
      //     user:'亮亮',
      //     type1: common.type1Selected(this.data.type1),
      //     amount: (common.amountSelected(this.data.type1)) ? parseFloat(e.detail.value.amount) : 0 - parseFloat(e.detail.value.amount)
      //   },
      //   method:'POST',
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded charset=UTF-8'
      //   },

      //   success: function (res) {
      //     wx.showToast({
      //       title: '成功',
      //       icon: 'success',
      //       duration: 2000
      //     })
      //   }
      // })
    } else{
      //明细修改
      for (var i in this.data.type1) {
        //被点击选中的单日账单在总账单当中的index
        var index = this.data.dateBill[this.data.id].index
        var beforeChange = this.data.bill[index].amount
        if (this.data.type1[i].checked == true && i < 2) {
          //修改为收入
          this.data.dateBill.splice(this.data.id, 1, { "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue,"index":index })
          this.data.bill.splice(index,1,{ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue})

          //月、年、共结余三个数组的更新
          this.data.monthResidueArr.splice(common.findSelfIndex(this.data.monthResidueArr, index), 1, { "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.yearResidueArr.splice(common.findSelfIndex(this.data.yearResidueArr, index), 1, { "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.totalResidueArr.splice(index, 1, { "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue})
          console.log(beforeChange)
          if (beforeChange < 0 ){
            console.log('支出变收入')
            this.data.monthExpendArr.splice(common.findSelfIndex(this.data.monthExpendArr,index),1)
            this.data.yearExpendArr.splice(common.findSelfIndex(this.data.yearExpendArr, index), 1)
            this.data.totalExpendArr.splice(common.findSelfIndex(this.data.totalExpendArr, index), 1)
            this.data.monthIncomeArr.push({ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
            this.data.yearIncomeArr.push({ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
            this.data.totalIncomeArr.push({ "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          } else if (beforeChange >0){
            console.log('收入变收入')
            this.data.monthIncomeArr.splice(common.findSelfIndex(this.data.monthIncomeArr, index), 1, { "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
            this.data.yearIncomeArr.splice(common.findSelfIndex(this.data.yearIncomeArr, index), 1, { "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
            this.data.totalIncomeArr.splice(common.findSelfIndex(this.data.totalIncomeArr, index), 1, { "amount": parseFloat(e.detail.value.amount), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          }
        } else if (this.data.type1[i].checked == true && i >= 2) {
          //修改为支出
          this.data.dateBill.splice(this.data.id, 1, { "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue,"index":index })
          this.data.bill.splice(index, 1, { "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue})

          //月、年、共结余三个数组的更新
          this.data.monthResidueArr.splice(common.findSelfIndex(this.data.monthResidueArr, index), 1, { "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.yearResidueArr.splice(common.findSelfIndex(this.data.yearResidueArr, index), 1, { "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          this.data.totalResidueArr.splice(index, 1, { "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue})
          if (beforeChange>0){
            //收入变支出
            console.log('收入变支出')
            this.data.monthIncomeArr.splice(common.findSelfIndex(this.data.monthIncomeArr, index), 1)
            this.data.yearIncomeArr.splice(common.findSelfIndex(this.data.yearIncomeArr, index), 1)
            this.data.totalIncomeArr.splice(common.findSelfIndex(this.data.totalIncomeArr, index), 1)
            this.data.monthExpendArr.push({ "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
            this.data.yearExpendArr.push({ "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
            this.data.totalExpendArr.push({ "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })

          } else if (beforeChange<0){
            //支出变支出
            console.log('支出变支出')
            this.data.monthExpendArr.splice(common.findSelfIndex(this.data.monthExpendArr, index), 1, { "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
            this.data.yearExpendArr.splice(common.findSelfIndex(this.data.yearExpendArr, index), 1, { "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
            this.data.totalExpendArr.splice(common.findSelfIndex(this.data.totalExpendArr, index), 1, { "amount": parseFloat(0 - parseFloat(e.detail.value.amount)), "type1": this.data.type1[i].name, "img": this.data.type1[i].img, "date": this.data.dateValue, "index": index })
          }
        }
        
      }
      // console.log(index)
      // console.log(this.data.dateBill)
      // console.log(this.data.bill)
      wx.setStorageSync('bill', this.data.bill)
    }
    // console.log(this.data.monthExpendArr)
    // console.log(this.data.monthIncomeArr)
    // console.log(this.data.monthResidueArr)
    // console.log(this.data.yearExpendArr)
    // console.log(this.data.yearIncomeArr)
    // console.log(this.data.yearResidueArr)
    // console.log(this.data.totalExpendArr)
    // console.log(this.data.totalIncomeArr)
    // console.log(this.data.totalResidueArr)

    var monthExpendAna = common.combieArr(this.data.monthExpendArr, this.data.type1)
    var monthIncomeAna = common.combieArr(this.data.monthIncomeArr, this.data.type1)
    var monthResidueAna = common.settleResidue(this.data.monthResidueArr, this.data.type1)
    var yearExpendAna = common.combieArr(this.data.yearExpendArr, this.data.type1)
    var yearIncomeAna = common.combieArr(this.data.yearIncomeArr, this.data.type1)
    var yearResidueAna = common.settleResidue(this.data.yearResidueArr, this.data.type1)
    var totalExpendAna = common.combieArr(this.data.totalExpendArr, this.data.type1)
    var totalIncomeAna = common.combieArr(this.data.totalIncomeArr, this.data.type1)
    var totalResidueAna = common.settleResidue(this.data.totalResidueArr)
    this.setData({
      totalAmount: common.arrAmount(this.data.dateBill),
      bill: this.data.bill,
      dateBill:this.data.dateBill,
      monthExpendArr: this.data.monthExpendArr,
      monthIncomeArr: this.data.monthIncomeArr,
      monthResidueArr: this.data.monthResidueArr,
      yearExpendArr: this.data.yearExpendArr,
      yearIncomeArr: this.data.yearIncomeArr,
      yearResidueArr: this.data.yearResidueArr,
      totalExpendArr: this.data.totalExpendArr,
      totalIncomeArr: this.data.totalIncomeArr,
      totalResidueArr: this.data.totalResidueArr,
      monthExpendAna: monthExpendAna,
      monthIncomeAna: monthIncomeAna,
      monthResidueAna: monthResidueAna,
      yearExpendAna: yearExpendAna,
      yearIncomeAna: yearIncomeAna,
      yearResidueAna: yearResidueAna,
      totalExpendAna: totalExpendAna,
      totalIncomeAna: totalIncomeAna,
      totalResidueAna: totalResidueAna,
      hiddenformput: true
    })
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this
    that.setData({ currentTab: e.detail.current })
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //明细项目类别点击事件
  itemChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i in this.data.bill) {
      if (checked.indexOf(this.data.bill[i].name) != -1) {
        changed['type1[' + i + '].checked'] = true
        changed['color'] = this.data.type1[i].color
      } else {
        changed['type1[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  //插入明细项目类别点击事件
  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i in this.data.type1) {
      if (checked.indexOf(this.data.type1[i].name) != -1) {
        changed['type1[' + i + '].checked'] = true
        changed['color'] = this.data.type1[i].color
      } else {
        changed['type1[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },

  //报表页面的bindtap事件，点击切换true,false
  selected0: function (e) {
    if(this.data.selected3){
      common.createPieChart('monthExpend', this.data.monthExpendAna, this.data.monthExpendArr,'总支出')
    }
    if (this.data.selected4){
      common.createPieChart('monthIncome', this.data.monthIncomeAna, this.data.monthIncomeArr,'总收入')
    }
    if (this.data.selected5) {
      common.createPieChart('monthResidue', this.data.monthResidueAna, this.data.monthResidueArr, '总结余')
    }
    
    
    this.setData({
      selected1: false,
      selected0: true,
      selected2: false,
    })
  },
  selected1: function (e) {
    if (this.data.selected3) {
      common.createPieChart('yearExpend', this.data.yearExpendAna,this.data.yearExpendArr,'总支出')
      
    }
    if (this.data.selected4) {
      common.createPieChart('yearIncome', this.data.yearIncomeAna, this.data.yearIncomeArr,'总收入')
    }
    if (this.data.selected5) {
      common.createPieChart('yearResidue', this.data.yearResidueAna, this.data.yearResidueArr,'总结余')
    }
    // console.log(this.data.monthExpendAna)
    // console.log(this.data.monthIncomeAna)
    // console.log(this.data.monthResidueAna)
    // console.log(this.data.yearExpendAna)
    // console.log(this.data.yearIncomeAna)
    // console.log(this.data.yearResidueAna)
    // console.log(this.data.totalExpendAna)
    // console.log(this.data.totalIncomeAna)
    // console.log(this.data.totalResidueAna)
    this.setData({
      selected0: false,
      selected1: true,
      selected2: false,
    })
  },
  selected2: function (e) {
    if (this.data.selected3) {
      console.log(this.data.monthExpendAna)
      console.log(this.data.monthIncomeAna)
      common.createPieChart('totalExpend', this.data.totalExpendAna, this.data.totalExpendArr,'总支出')
    }
    if (this.data.selected4) {
      common.createPieChart('totalIncome', this.data.totalIncomeAna, this.data.totalIncomeArr,'总收入')
    }
    if (this.data.selected5) {
      common.createPieChart('totalResidue', this.data.totalResidueAna, this.data.totalResidueArr,'总结余')
    }
    this.setData({
      selected0: false,
      selected1: false,
      selected2: true,
    })
  },
  selected3: function (e) {
    if (this.data.selected0) {
      console.log(this.data.monthExpendAna)
      common.createPieChart('monthExpend', this.data.monthExpendAna, this.data.monthExpendArr,'总支出')
    }
    if (this.data.selected1) {
      common.createPieChart('yearExpend', this.data.yearExpendAna, this.data.yearExpendArr,'总支出')
    }
    if (this.data.selected2) {
      common.createPieChart('totalExpend', this.data.totalExpendAna, this.data.totalExpendArr,'总支出')
      console.log(this.data.totalExpendAna)
    }
    this.setData({
      selected3: true,
      selected4: false,
      selected5: false
    })
  },
  selected4: function (e) {
    if (this.data.selected0) {
      common.createPieChart('monthIncome', this.data.monthIncomeAna, this.data.monthIncomeArr,'总收入')
    }
    if (this.data.selected1) {
      common.createPieChart('yearIncome', this.data.yearIncomeAna, this.data.yearIncomeArr,'总收入')
    }
    if (this.data.selected2) {
      common.createPieChart('totalIncome', this.data.totalIncomeAna, this.data.totalIncomeArr,'总收入')
    }
    // console.log(this.data.monthExpendAna)
    // console.log(this.data.monthIncomeAna)
    // console.log(this.data.monthResidueAna)
    // console.log(this.data.yearExpendAna)
    // console.log(this.data.yearIncomeAna)
    // console.log(this.data.yearResidueAna)
    // console.log(this.data.totalExpendAna)
    // console.log(this.data.totalIncomeAna)
    // console.log(this.data.totalResidueAna)
    this.setData({
      selected3: false,
      selected4: true,
      selected5: false
    })
  },
  selected5: function (e) {
    if (this.data.selected0) {
      common.createPieChart('monthResidue', this.data.monthResidueAna, this.data.monthResidueArr,'总结余')
    }
    if (this.data.selected1) {
      common.createPieChart('yearResidue', this.data.yearResidueAna, this.data.yearResidueArr,'总结余')
    }
    if (this.data.selected2) {
      common.createPieChart('totalResidue', this.data.totalResidueAna, this.data.totalResidueArr,'总结余')
    }
    
    this.setData({
      selected3: false,
      selected4: false,
      selected5: true
    })
  },

  onLoad: function () {
    var that = this
    //获取系统日期
    var day = new Date()
    var dd = day.getDate() < 10 ? '0' + day.getDate() : day.getDate()
    var mm = day.getMonth() + 1 < 10 ? '0' + (day.getMonth()+1) : (day.getMonth()+1)
    var yy = day.getFullYear()
    var today = yy + '-' + mm + '-' + dd
    
    var bill = wx.getStorageSync('bill')
    var dateBill = common.showSelDateBill(bill, today)
    var monthExpendArr = common.showExpend(bill,'月',yy+'-'+mm)
    var monthIncomeArr = common.showIncome(bill, '月', yy + '-' + mm)
    var monthResidueArr = common.showResidue(bill, '月', yy + '-' + mm)
    var yearExpendArr = common.showExpend(bill, '年', yy)
    var yearIncomeArr = common.showIncome(bill, '年',yy)
    var yearResidueArr = common.showResidue(bill, '年', yy)
    var totalExpendArr = common.showExpend(bill,'共')
    var totalIncomeArr = common.showIncome(bill,'共')
    var totalResidueArr = common.showResidue(bill,'共')
    var totalAmount = common.arrAmount(dateBill)
    var monthExpendAna = common.combieArr(monthExpendArr, this.data.type1)
    var monthIncomeAna = common.combieArr(monthIncomeArr, this.data.type1)
    var monthResidueAna = common.settleResidue(monthResidueArr, this.data.type1)
    var yearExpendAna = common.combieArr(yearExpendArr, this.data.type1)
    var yearIncomeAna = common.combieArr(yearIncomeArr, this.data.type1)
    var yearResidueAna = common.settleResidue(yearResidueArr, this.data.type1)
    var totalExpendAna = common.combieArr(totalExpendArr, this.data.type1)
    var totalIncomeAna = common.combieArr(totalIncomeArr, this.data.type1)
    var totalResidueAna = common.settleResidue(totalResidueArr)
    // console.log(monthExpendAna)
    // console.log(monthIncomeAna)
    // console.log(monthResidueAna)
    // console.log(yearExpendAna)
    // console.log(yearIncomeAna)
    // console.log(yearResidueAna)
    // console.log(totalExpendAna)
    // console.log(totalIncomeAna)
    // console.log(totalResidueAna)
    that.setData({
      bill:bill,
      dateBill: dateBill,
      monthExpendArr: monthExpendArr,
      monthIncomeArr: monthIncomeArr,
      monthResidueArr: monthResidueArr,
      yearExpendArr: yearExpendArr,
      yearIncomeArr: yearIncomeArr,
      yearResidueArr: yearResidueArr,
      totalExpendArr: totalExpendArr,
      totalIncomeArr: totalIncomeArr,
      totalResidueArr: totalResidueArr,

      monthExpendAna: monthExpendAna,
      monthIncomeAna: monthIncomeAna,
      monthResidueAna: monthResidueAna,
      yearExpendAna: yearExpendAna,
      yearIncomeAna: yearIncomeAna,
      yearResidueAna: yearResidueAna,
      totalExpendAna: totalExpendAna,
      totalIncomeAna: totalIncomeAna,
      totalResidueAna: totalResidueAna,
      dateValue: today, //登录时获取系统日期
      totalAmount: totalAmount,
      month:mm,
      year:yy
    })
    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })
    
    
    
  },
  onReady: function () {
    common.createPieChart('monthExpend', this.data.monthExpendAna,this.data.monthExpendArr,'总支出')
    
  },
  onShow: function () {
    // Do something when page show.
  },
  onHide: function () {
    // Do something when page hide.
  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onPageScroll: function () {
    // Do something when page scroll
  },

})
