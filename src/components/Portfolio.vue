<template>
    <div id="portfolio" class="main_Block">
        <!-- 單一作品 -->
        <div id="content_Detail" class="content_Detail" >
            <div class="back" @click="back_Content"><i class="fas fa-arrow-left"></i>回作品列表</div>
            <div class="image">

                <img v-if="projectData.Picture" :src="'http://www.henrychang.tw/images/work/'+ projectData.Picture" alt="">
            </div>
            <div class="data">

            <span class="chip">{{projectData.Title}}</span>
                <h2>{{projectData.Title}}</h2>
            </div>
            <div class="images">
                <img class="p_Image" :id="'p_Img_'+pic.Id"  @click="one_Click" @dblclick="project_Modal(projectData.Id, key)" :src="'http://www.henrychang.tw/images/work/'+ pic.Picture" v-for="(pic, key) in projectPics">
            </div>
        </div>
        <!-- 作品列表     -->
        <div id="content_Box" class="content_Box">
            <h2 v-if="workProjects.length !== 0">{{workProjects[0].Code}}</h2>
            <div class="p_Box none" v-if="workProjects.length == 0">
                <div class="p_Content">
                    <h3>暫無相關作品</h3>
                </div>
            </div>
            <div class="p_Box" v-for="w in workProjects">
                
                <div class="p_Img"  @click="getProjectPics(w)">
                    <img :src="'http://www.henrychang.tw/images/work/' + w.Picture" alt="">
                </div> 
                <div class="p_Content">
                        
                    <span class="chip">{{w.Type}}</span>
                    <h3>{{w.Title}}
                    <a class="p_pLink" :href="w.Url" target="_blank"><i class="fas fa-link"></i></a>
                    <a class="p_pLink" :href="w.Url" target="_blank"><i class="fas fa-arrow-circle-down"></i></a>
                    </h3>
                    <div class="p_Link" v-if="w.UrlType == 1">
                        <h4>網站連結：<a :href="w.Url" target="_blank">{{w.Url}}</a></h4>
                        <h4>連結次數：{{w.ClickCount}}</h4>
                        <h4>下載連結：無</h4>
                        <h4>下載次數：無</h4>
                    </div>
                    <div class="p_Link" v-if="w.UrlType == 2">
                        <h4>網站連結：無</h4>
                        <h4>連結次數：無</h4>
                        <h4>下載連結：<a :href="w.Url" target="_blank">按此下載</a></h4>
                        <h4>下載次數：{{w.ClickCount}}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                projectPics:[],
                projectData: [],
                projectModal: true
            }
        },
        props:['workProjects'],
        mounted(){
            if(this.$route.fullPath !== '/portfolio'){
                this.$emit('changeProjects',this.$route.query.id)
            }else if(this.$route.fullPath == '/portfolio'){
                this.$emit('changeProjects')
            }
        },
        methods:{
            getProjectPics(data){
                this.projectData = data;

                let open_Detail = document.getElementById('content_Detail')
                open_Detail.style.display = "block"

                document.getElementById('content_Box').style.overflow = "hidden"
                
                var qs = require('qs');
                axios.post('http://www.henrychang.tw/APITest/GetWorksDetailList',qs.stringify({
                    "ProjectId": data.Id
                })
                )
                .then((resp) => {
                    if(resp.data.result == '1'){
                        this.projectPics = JSON.parse(resp.data.content)

                    }else{
                        return
                    }

                })
            },
            back_Content(){
                let open_Detail = document.getElementById('content_Detail');
                open_Detail.style.display = "none";
                document.getElementById('content_Box').style.overflow = "scroll"
                this.projectPics = [];
            },
            one_Click(id){

                var p_Imgs = document.getElementsByClassName('p_Image');//数组
                var p_Imgs_L = p_Imgs.length;
                for(var i = 0;i < p_Imgs_L;i++){
                    p_Imgs[i].classList.remove('hover')
                }

                let img_Click = document.getElementById(id.target.id)
                img_Click.classList.add('hover')
                if( img_Click !==  id.target){
                    img_Click.classList.remove('hover')
                }
                
            },
            project_Modal(id, key){
                let project_Data = {
                    project_Id: id,
                    project_Key: key
                }
                
                this.$emit('topbar', 1, project_Data)
            }
        }
    }
</script>