<template>
    <div id="topbar" class="topbar">
        <span>小魚的網頁空間</span>
        <i class="fas fa-bars top" v-if="!topOpen" @click="top_Open"></i>
        <i class="fas fa-times top" v-else @click="top_Open"></i>
        <div class="top_List" v-if="topOpen">
            <ul>
                <router-link :to="{ name: 'Home' }" active-class="active" v-on:click.native="top_Open">                    
                    <li>
                        <i class="fas fa-home"></i>首頁
                    </li>
                </router-link>
                <router-link :to="{ name: 'Portfolio' }" active-class="active" v-on:click.native="top_Open">                    
                    <li>
                        <i class="fas fa-code"></i>作品集
                    </li>
                </router-link>
                <router-link :to="{ name: 'Guestbook' }" active-class="active" v-on:click.native="top_Open">                    
                    <li>
                        <i class="far fa-comment"></i>留言板
                    </li>
                </router-link>
                <router-link :to="{ name: 'Contact' }" active-class="active" v-on:click.native="top_Open">                    
                    <li>
                        <i class="far fa-envelope"></i>聯絡我們
                    </li>
                </router-link>
            </ul>
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            topOpen: false,
            
        }
    },
    methods:{
        top_Open(){
            console.log('click')
            this.topOpen = !this.topOpen
            this.$emit('topbar')
        },

    }
}
</script>