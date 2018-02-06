<template>
  <div class="container">
    <yd-navbar title="我的名片" height='30px' fontsize='15px'>
        <router-link to="" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
    <!-- <input type="datetime" id="myDatetime"  autocomplete> -->
    <div class="avatarContainer">
      <img class="head"  :src="picshow" alt="">
      <input class="avatar"  type="file" name="image" accept="image/*" @change="selectFile($event)" ref="fileInput">
    </div>
   
    <div id="phonebox">
      <div class="namer">
        <span >姓名:</span>
        <input  v-model="user.namer"   placeholder="请输入您的姓名"></input>
      </div>

      <div  class="phone" v-for="(item,i) in user.Mobilelist"> 
          <div class="makebd"></div>           
          <span ><i @click='removeMobile(i)'  class="iconfont  icon-jianhao"></i>手机号:</span>
          <input  v-model="item['Mobilephone'+i]"   placeholder="请输入手机号码"></input>     
      </div>
      
      <div class="addphone" @click="addphone">
          <div></div>
          <i class="iconfont  icon-jiahao"></i> 
            添加电话
      </div> 
      <div  class="phone" v-for="(item,i) in user.landlist"> 
          <div class="makebd"></div>           
          <span ><i @click='removeland(i)'  class="iconfont  icon-jianhao"></i>座机号:</span>
          <input  v-model="item['landphone'+i]"   placeholder="请输入手机号码"></input>     
      </div>
      
      <div style="border:none;" class="addphone " @click="addland">
          <div></div>
          <i class="iconfont  icon-jiahao"></i> 
          添加座机
      </div> 
    </div>

    <div class="company">
      <div v-for="(item,i) in user.companylist">       
        <div class="companyitem">
            <i  @click="removecompany(i)" class="iconfont  icon-jianhao"></i> 
            <div>公司名称:<input v-model="item.nameof"></input></div>
            <div>公司地址:<input v-model="item.address"></input></div>
            <div>部门:<input v-model="item.department"></input></div>
            <div>职位:<input v-model="item.position"></input></div>
        </div>
      </div>
    </div>
    <i class="iconfont  icon-jiahao" @click="addcompany()">公司</i> 
    <button @click="save">保存</button>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
    i:0, 
    i1:0,
    ci:0,
    picshow:'',//展示的图片
    filesend:'',//上传的图片文件
    user:{
      namer:'',
      Mobilelist:[
        {Mobilephone0:''},
       ],
      landlist:[
        {landphone0:''},
      ],
      companylist:
        {
          company0:{nameof:'',address:'',department:'',position:''}
        },
      }
    }
  },
  mounted () {
   this.axios.get('http://172.31.0.127:3000/user', {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


  },
  updated () {
      // console.log(this.user.companylist)
  },
  computed: {
   
  },
  watch: {
      
  },
  components: {

  },
  methods: {
    addphone(){
      console.log(this.i++)
      console.log(this.i)
      var obj={};
      obj['Mobilephone'+this.i]=''
      this.user.Mobilelist.push(obj)
      console.log(this.user,'52行')
    },
    addland(){
      console.log(this.i1++)
      console.log(this.i1)
      var obj={};
      obj['landphone'+this.i1]=''
      this.user.landlist.push(obj)
      console.log(this.user,'52行')
    },
    addcompany(){//增加公司
    let ci= this.ci++;   
     //!属性有时候不响应
      console.log(this.ci)  
     this.$set(this.user.companylist,'company'+this.ci++,{nameof:'',address:'',department:'',position:''})
     console.log(this.user.companylist)
    },
    removeMobile(i){
      console.log(i,'删除的下标')
      this.user.Mobilelist.splice(i,1)
      //组装一个新数组
      var newlist=[];
      
      for (let key in this.user.Mobilelist)
      {
        var obj={}
        obj['Mobilephone'+key]=""
        newlist.push(obj);
      }
      console.log(newlist,'新的电话数组')
      this.user.Mobilelist=newlist;
    },
    removeland(i){
      console.log(i,'删除的下标')
      this.user.landlist.splice(i,1)
      //组装一个新数组
      var newlist=[];   
      for (let key in this.user.landlist)
      {
        var obj={}
        obj['landphone'+key]=""
        newlist.push(obj);
      }
      console.log(newlist,'新的座机数组')
      this.user.landlist=newlist;
    },
    removecompany(i){
     this.$delete(this.user.companylist,i)  
     this.ci=0;
     var Object={}//拼接新的公司对象
     for(var key in this.user.companylist){
        this.ci++;
       var newkey=['company'+this.ci] 
        Object[newkey]=this.user.companylist[key];
     }
     this.user.companylist=Object;
    },
    selectFile($event){//选择图片事件
      let files = $event.target.files || $event.dataTransfer.files;
        if(files.length){
            let allImgExt = '.jpg|.jpeg|.gif|.bmp|.png|';
            //图片路径
            let filePath = this.$refs.fileInput.value;
            console.log(filePath)
            //截取文件格式字符串转换成小写
            let extName = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();

            if(allImgExt.indexOf(extName+'|') == -1){
                //该文件类型不是img
                // Toast('請選擇正確的文件類型！');
                return;
            }
            let arr=filePath.split('\\');
            let fileName=arr[arr.length-1];
            console.log(fileName)
            let file = this.$refs.fileInput.files[0];
            console.log(file,'---图片的所有属性')
            let reader = new FileReader();
            reader.readAsDataURL(file);   
            reader.onloadend = () => {
              //预览
              this.picshow=reader.result;
              //上传
              this.filesend=file;
            }

            }
            this.$refs.fileInput.value = '';
    },
    save(){//保存按钮的事件
          console.log(this.user)
           let config = {
             //如经测试应该是如果用了fromdata对象这个配置默认的，如果没有用fromdata对象这个配置可以覆盖http.js文件中的配置
            headers:{'Content-Type':'multipart/form-data'}
          };  
          // let params = qs.stringify( this.user);						
          // console.log(params)
          let formData = new FormData();
          formData.append('param',qs.stringify({a:123,b:234}));    
          formData.append('pic',this.filesend);        
          this.axios.post('http://172.31.0.127:3000/ak',formData,config).then(res => {
              console.log(res);
          }).catch(error=>{
              console.log(error);
          })
                       
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@import '../assets/color.less';

#phonebox{
  background: #fff;
}
.avatarContainer{
  position: relative;
  .head{
  display: block;
  width: 70px;
  height: 70px;
  background: blue;
  margin: 0 auto;
}
  .avatar{
    opacity: 0 ;
    position: absolute;
    left:50%;
    top:0;
    transform: translateX(-50%);
    width: 70px;
    height: 70px;
    background: blue;
    margin: 0 auto;
  }
}

.namer{
  padding-left:50px;
  height: 30px;
  line-height: 30px;
  position: relative;
  border-bottom: 1px solid #d9d9d9; 
  &::before{
    content:'';
    position: absolute;
    width: 15px;
    height: 1px;
    left:0px;
    bottom: -1px;
    background:#fff;
  }
}
.addphone{
  border-bottom:1px solid #d9d9d9; 
  position: relative;
   div{
    position: absolute;
    width: 15px;
    height: 1px;
    left:0px;
    bottom: -1px;
    background:#fff;
   }
}
.phone{
  position: relative;
  padding-left:50px;
  height: 40px;
  line-height: 40px;
  border-bottom:1px solid #d9d9d9; 
  .icon-jianhao{
  color:@jian-color;
  font-size: 25px;
  position: absolute;
  left:20px;
  top:0px;
  }
 .makebd{
    position: absolute;
    width: 15px;
    height: 1px;
    left:0px;
    bottom: -1px;
    background:#fff;
  }
}
.addphone{
  position: relative;
  height: 40px;
  padding-left:50px;
  line-height: 40px;
  font-size: 15px;
  .icon-jiahao{
  color:@jia-color;
  font-size: 25px;
  position: absolute;
  left:20px;
  top:0px;  
 }
}
.company {
    .companyitem{
      position: relative;
      // padding-left:50px;
    .icon-jianhao{
      position: absolute;
      left:0px;
      top:0px; 
      font-size: 25px;
      color:@jian-color; 
      }
    div{
       height: 40px;
       padding-left:50px;
       line-height: 40px;
    }  
    }
} 
button{
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  background: #fff;
  color: #0697e7;
  display: block;
  width: 100%;
  margin-top: 10px;
}
</style>
