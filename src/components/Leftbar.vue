<template>
    <div class="leftbar">

        <div id="leftbar" class="leftbar_List">
            <ul id="nav_Main" class="nav_Main">
                <li v-for="item in main_List">
                    <router-link :to="item.link" active-class="active">
                        <span>{{item.name}}</span>
                    </router-link>
                </li>
            </ul>
            <ul v-if="portfolio" class="nav_List">
                <h2>- 作品集 -</h2>
                <li v-for="item in portfolio_List" @click="changeProjects(item.Id)" :id="'p_list'+item.Id" class="p_list">
                    <span>{{item.Name}}</span>
                    <ul v-if="item.Detail.length > 0">
                        <li >{{item.Detail}}</li>
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
            portfolio: false,
            router_Check: '/',
            now_id: null,
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
            portfolio_sList: [
            ],
            workProjects:[]
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

            }else{
                this.portfolio = false
                leftbar_Circle.classList.add('none')
                main_Nav.classList.remove('right')
            }
        }
    },
    methods:{
        changeProjects(id){
            this.$router.push(
                {
                    path: '/portfolio',
                    query: {
                        id: id
                    }
                }
            )

            let window_Width = document.body.clientWidth
            if(this.now_id != null){

                let removeTarget = document.getElementById('p_list'+this.now_id)
                removeTarget.classList.remove('active')
            }

            
            let changeTarget = document.getElementById('p_list'+id)
            changeTarget.classList.add('active')
            this.$emit('changeProjects',id)
            this.now_id = id;
            
            if(window_Width <= 768){

                let leftbar = document.getElementById('leftbar')
                let portfolio = document.getElementById('portfolio')
                leftbar.style.left = '-150px';
                portfolio.style.left = '0px';
            }
            let open_Detail = document.getElementById('content_Detail');
            open_Detail.style.display = "none";
            this.projectPics = [];
        },
        open_Leftbar(){
            let leftbar = document.getElementById('leftbar')
            let portfolio = document.getElementById('portfolio')
            leftbar.style.left = '0px';
            portfolio.style.left = '150px';
        }
    }
}
</script>