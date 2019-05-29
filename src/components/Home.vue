<template>
    <div id="home" class="main_Block">
        <div class="content_Box">
            <div clss="home_Page">
                <!-- 成員介紹 -->

                <div class="home_Member">
                    <div class="h_Main m-img" style="flex:3">
                        <div class="before"><img src="../assets/dots.png" alt=""></div>
                        <div class="img"></div>
                        <div class="after"><img src="../assets/dots2.png" alt=""></div>
                    </div>
                    <div class="h_Main m-content" style="flex:5">
                        <h2>{{members.Name}}</h2>
                        <p>
                            <!-- <span class="marks before">“</span> -->
                            {{members.Content}}
                            <!-- <span class="marks after">”</span> -->
                        </p>
                    </div>
                </div>
                <!-- 作品類型 -->
                <div class="home_Works">
                    <div class="before"><img src="../assets/dots3.png" alt=""></div>
                    <div class="work_Ball" :class="{ active: w.Name }"v-for="w in works_List" @click="work_List(w.Id)">
                        {{w.Name}}
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
                members:'',
                works_List:'',

            }
        },
        mounted(){
            /* 成員列表 */
            axios.post('http://www.henrychang.tw/APITest/GetMember')
            .then((resp) => {
                this.members = JSON.parse(resp.data.content)
            });
            /* 作品類型 */
            axios.post('http://www.henrychang.tw/APITest/GetWorksType')
            .then((resp) => {
                this.works_List = JSON.parse(resp.data.content)
                if(this.works_List.length = 9){
                    this.works_List.push(
                        {'id': 10},
                        {'id': 11},
                        {'id': 12})
                }else if(this.works_List.length = 10){
                        this.works_List.push(
                            {'id': 11},
                            {'id': 12})

                }else if(this.works_List.length = 11){
                            this.works_List.push(
                                {'id': 12})

                }
            });
        },
        methods:{
            /* 跳轉至portfolio */
            work_List(id){
                if(id){
                    this.$router.push(
                        {
                            path: '/portfolio',
                            query: {
                                id: id
                            }
                        }
                    )
                }

            }
        }
    }
</script>