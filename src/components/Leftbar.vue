<template>
    <div class="leftbar">

        <div id="leftbar" class="leftbar_List">
            <!-- 主導覽列 -->
            <ul id="nav_Main" class="nav_Main">
                <li v-for="item in main_List">
                    <router-link :to="item.link" active-class="active">
                        <span>{{item.name}}</span>
                    </router-link>
                </li>
            </ul>
            <!-- 作品集導覽列 -->
            <ul v-if="portfolio" class="nav_List">
                <h2>- 作品集 -</h2>
                <li v-for="item in portfolio_List">
                    <h3 :id="'p_list'+item.Id" @click="changeProjects(item.Id)" :class="activeId == 'active'+item.Id ? 'active':''">{{item.Name}}</h3>
                    <ul :id="item.Id" v-for="p in portfolio_sList" v-if="p.TypeId == item.Id">
                        <li class="p_list" @click="changeCodeType(p.Id, p.TypeId)" :id="'p_slist'+p.Id">  - {{p.Name}}</li>
                    </ul>
                </li>
            </ul>
            
        </div>
        <div id="leftbar_Circle" class="leftbar_Circle none" @click="open_Leftbar">
            <i class="fas fa-list-ul"></i>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            activeId: null,/* 判斷作品集參數ID */
            portfolio: false,/* 作品集導覽列 */
            now_id: null,/* 現在作品類型Id */
            now_sid: null,/* 現在作品子類型Id */
            /* 主導覽列項目 */
            main_List: [
                {id:"nav_0",name:"首頁",link:"/home"},
                {id:"nav_1",name:"作品集",link:"/portfolio"},
                {id:"nav_2",name:"留言板",link:"/guestbook"},
                {id:"nav_3",name:"聯絡我們",link:"/contact"}
            ],
            /* 作品集分類項目 */
            portfolio_List: [
            ],
            /* 作品集第二層程式分類項目 */
            portfolio_sList: [
            ],
        }
    },
    mounted(){
        /* 判斷頁面路徑，若為作品集頁面側邊選單改為作品類型、主選單移至右下角 */
        var main_Nav = document.getElementById('nav_Main');
        var leftbar_Circle = document.getElementById('leftbar_Circle');
        if (this.$route.path == '/portfolio'){
            this.portfolio = true
            main_Nav.classList.add('right')
            leftbar_Circle.classList.remove('none')
        }else{
            this.portfolio = false
            leftbar_Circle.classList.add('none')
            main_Nav.classList.remove('right')
        }

        /* 取得作品集類型 */
        axios.post('http://www.henrychang.tw/APITest/GetWorksType')
        .then((resp) => {
            this.portfolio_List = JSON.parse(resp.data.content)
        });
    
    },
    watch:{
        $route (to, from){
            var main_Nav = document.getElementById('nav_Main');
            var leftbar_Circle = document.getElementById('leftbar_Circle');

            if (this.$route.path == '/portfolio'){
                this.portfolio = true
                main_Nav.classList.add('right')
                leftbar_Circle.classList.remove('none')

                /* 從首頁點擊項目進入作品集頁面時，側邊欄要顯示active */
                if(this.$route.query.id){
                    this.activeId = 'active'+this.$route.query.id
                    
                    /* 取得第二層作品集類型 */
                    var qs = require('qs');
                    axios.post('http://www.henrychang.tw/APITest/GetCodeTypeList',qs.stringify({
                        'typeId': this.$route.query.id
                    })
                    )
                    .then((resp) => {
                        this.portfolio_sList = JSON.parse(resp.data.content)
                    });
             
                }

            }else{
                this.portfolio = false
                leftbar_Circle.classList.add('none')
                main_Nav.classList.remove('right')
                this.portfolio_sList = ""
            }

        }
    },
    methods:{
        changeProjects(id){
            /* 網址加入作品類型id */
            this.$router.push(
                {
                    path: '/portfolio',
                    query: {
                        id: id
                    }
                }
            )

            this.now_sid = null;

            if(this.now_id != null){
                let removeTarget = document.getElementById('p_list'+this.now_id)
                removeTarget.classList.remove('active')
            }

            /* 加入active狀態 */
            let changeTarget = document.getElementById('p_list'+id)
            changeTarget.classList.add('active')
            this.$emit('changeProjects',id)
            this.now_id = id; /* 現在作品類型Id */

            /* 螢幕小於768時隱藏側邊欄位，並顯示圓圈按鈕 */
            let window_Width = document.body.clientWidth
            if(window_Width <= 768){

                let leftbar = document.getElementById('leftbar')
                let portfolio = document.getElementById('portfolio')
                leftbar.style.left = '-150px';
                portfolio.style.left = '0px';
            }

            /* 關閉作品內頁彈窗，返回列表 */
            let open_Detail = document.getElementById('content_Detail');
            open_Detail.style.display = "none";
            this.projectPics = [];

            /* 取得第二層作品集類型 */
            var qs = require('qs');
            axios.post('http://www.henrychang.tw/APITest/GetCodeTypeList',qs.stringify({
                'typeId': id
            })
            )
            .then((resp) => {
                this.portfolio_sList = JSON.parse(resp.data.content)
            });

        },
        changeCodeType(id, tId){
            /* 若於程式子分類內，清楚原active狀態 */
            if(this.now_sid != null){
                let removeTarget = document.getElementById('p_slist'+this.now_sid)
                removeTarget.classList.remove('active')
            }

            /* 關閉作品內頁彈窗，返回列表 */
            let open_Detail = document.getElementById('content_Detail');
            open_Detail.style.display = "none";
            this.projectPics = [];

            /* 加入active狀態 */        
            let changeTarget = document.getElementById('p_slist'+id)
            changeTarget.classList.add('active')
            this.now_sid = id;
            this.$emit('changeProjects',tId, id)
        },
        /* 開啟左側作品集導覽（手機版） */
        open_Leftbar(){
            let leftbar = document.getElementById('leftbar')
            let portfolio = document.getElementById('portfolio')
            leftbar.style.left = '0px';
            portfolio.style.left = '150px';
        }
    }
}
</script>