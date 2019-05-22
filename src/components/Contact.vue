<template>
    <div id="contact" class="main_Block">
        <div class="content_Box">
            
            <form>
            <div class="title">
                <h2>聯繫方式<span><i class="far fa-envelope"></i>blinda12@ms4.hinet.net</span></h2>
                <p>如有任何合作提案，歡迎透過聯繫我們，收到訊息後會立刻回覆！</p>
            </div>
                <div class="form_Item">
                    <label for="contact_Name" class="required">姓名</label>
                    <input type="text" id="contact_Name" v-model="form_Name" required>
                </div>
                <div class="form_Item">
                    <label for="contact_Email" class="required">Email</label>
                    <input type="text" id="contact_Email" v-model="form_Email" required>
                </div>
                <div class="form_Item">
                    <label for="contact_Tel">電話</label>
                    <input type="text" id="contact_Tel" v-model="form_Tel">
                </div>
                <div class="form_Item">
                    <label for="contact_Content" class="required">聯絡事項<br>(300字以內)</label>
                    <textarea name="" id="contact_Content" v-model="form_Content" cols="30" rows="10" ></textarea>
                </div>
                <div class="btn" @click="contact_Post()">發送</div>

            </form>
        </div>
        

    </div>
</template>

<script>
export default {
    data(){
        return{
            form_Name: "",
            form_Email: "",
            form_Tel: "",
            form_Content: ""
        }
    },
    methods:{
        contact_Post(){
            var qs = require('qs');

            axios.post('/data/APITest/ContactUs',qs.stringify(
            {
                'name': this.form_Name,
                'address': this.form_Email,
                'phone': this.form_Tel,
                'content': this.form_Content
            }
            ))
            .then((resp) => {
                if(resp.data.result == '1'){
                    alert(resp.data.content);
                    location.reload();
                }else{
                    alert('留言失敗，請重新輸入內容')

                }
                console.log(resp)
            });
        }
    }
}
</script>