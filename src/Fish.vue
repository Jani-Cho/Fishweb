<template>
    <div id="main">
        <leftbar v-on:changeProjects="change_Projects"></leftbar>
        <topbar v-on:topbar="topbarOpen" ></topbar>
        <router-view :workProjects="workProjects" v-on:topbar="topbarOpen" v-on:changeProjects="change_Projects"></router-view>

        <!-- 彈窗遮罩 -->
        <div class="modal-mask" v-if="topbar"></div>

        <!-- 作品集圖片彈窗 -->
        <div class="content_Modal" v-if="modal">
            <div @click="close_Modal">
              <i class="fas fa-times cancel"></i>
            </div>
            <div @click="last_Pic">
              <i class="fas fa-chevron-circle-left last"></i>
            </div>
            <div @click="next_Pic">
              <i class="fas fa-chevron-circle-right next"></i>
            </div>
            <div class="project_Modal">
              
              <img :src="'http://www.henrychang.tw/images/work/'+picData.Picture" alt="">
              <div class="project_Data">

                <h3>圖片標題<span>{{picData.Title}}</span></h3>
                <h3>圖片說明<span>{{picData.Content}}</span></h3>
              </div>
            </div>
        </div>
        <div id="footer">
        </div>
        <p class="footer"> © 2019 小魚的網頁空間</p>　
    </div>
</template>
<script>
import Leftbar from '@/components/Leftbar'
import Topbar from '@/components/topbar'


export default {
  name: 'Main',
  data(){
    return{
      topbar: false,
      modal: false,
      workProjects: [],
      picDatas: [],
      picData: [],
      picNum: null,
      picKey: null
    }
  },
  mounted(){

      let routepath= this.$route
      
      /* 取得作品集 */

      axios.post('http://www.henrychang.tw/APITest/GetWorksProjectList',{
      })
      .then((resp) => {
          this.workProjects = JSON.parse(resp.data.content)
      });
  },
  components: {
    'leftbar': Leftbar,
    'topbar': Topbar,

  },
  methods:{
    topbarOpen(type, data){
      // console.log('project data',data)
      if(type == 1){
        this.modal = true
        var qs = require('qs');
        axios.post('http://www.henrychang.tw/APITest/GetWorksDetailList',qs.stringify({
          'ProjectId': data.project_Id
        })
        )
        .then((resp) => {
          this.picDatas = JSON.parse(resp.data.content)
          this.picData = this.picDatas[data.project_Key]
          this.picKey = data.project_Key
          this.picNum = this.picDatas.length


        });
        
      }
      this.topbar = !this.topbar
    },
    change_Projects(id){
      var qs = require('qs');
      axios.post('http://www.henrychang.tw/APITest/GetWorksProjectList',qs.stringify({
        'typeId': id
      })
      )
      .then((resp) => {
          this.workProjects = JSON.parse(resp.data.content)
      });
    },
    close_Modal(){
      this.topbar = false
      this.modal = false
    },
    last_Pic(){
      if( this.picKey == 0){
        this.picKey = this.picNum - 1
        this.picData = this.picDatas[this.picKey]
      }else{
        this.picKey = this.picKey - 1
        this.picData = this.picDatas[this.picKey]
      }
    },
    next_Pic(){
      let count = this.picKey + 1
      if( count == this.picNum ){
        this.picKey = 0
        this.picData = this.picDatas[this.picKey]
      }else{
        this.picKey = this.picKey + 1
        this.picData = this.picDatas[this.picKey]
      }
    }
  }

}
</script>
<style>
@import '../src/assets/css/reset.css';
@import '../src/assets/css/main.css';

</style>