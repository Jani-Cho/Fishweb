<template>
    <div id="guestbook" class="main_Block">
        <div class="content_Box">

            <div class="message message_Lists">
                <div class="m_Lists">

                    <div class="m_List" v-for="m in message_Lists">
                        <div class="m_Time">
                            {{m.CreateTime.substr(0,10)}}<br>
                            {{m.CreateTime.substr(11,5)}}
                        </div>
                        <div class="m_Main" style="width: 33%;">
                            <img :src="m.Picture" alt="" onerror="this.src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhISEBIVEBISFRAQEhUQDw8PDxAPFRIWFhUSFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFy0fHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKystLS0tLS0tLS0tLS0tLS0tLS0tKystLf/AABEIALcBFAMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAADBAIFAAEGB//EADoQAAIBAwIEBQIDBwQBBQAAAAECAAMEESExBRJBUQYTImFxMoGRofAHFEJScrHBI2LR4ZIzNFOCov/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACIRAQEAAgIDAAMBAQEAAAAAAAABAhEDIRIxQQQiUWEyBf/aAAwDAQACEQMRAD8A8o5MSBGIeoIOrMtplap0+aRHpMnaNgyd6vWPZlaxyZJaJm6Swxq64jtGzFogVSTMdM+qRuDhRiGtxlJlUkaoJjVveEDlbaRdZDAlXWU1VTOzuIGoA2Y/zgj5ldcUcawtrUyCIrCyuzNIdJAW2DkyVpqTN3D5Om0X0rTFKkAMwVe+VARnUwV/fcihRuZSls76x44b9jHH+nHvv5RgwL1mbcx3hXBalyQKS56E/wAI1/M+0sOO8HS0/wBMsKlQYJI+nbYCbSRppRZxB5knkqdMdf7ytHpDmm1qTTSJhoaFdsyOZFWhQAYtDQfLAMuDGuXEE4iJFWhaG8FiYDALGpW0xB0RF1aGWpgSNEjU1MY/hiReHp1NMQsA1M4GYxbHQmI1W0h7er6cRWJsDqZJM3GFUTcAhXGIGqmmYa7fWNIoanJ3oelTzYjbnmXMXdJulV0Il02qZ1hqlPtAosdtlzjMmiovS0GYxaH04jPEaGFBldRfBky+UKN3DdICnuJItkw1vT5mxH6KjXCZSV9u+ssrumVGJTjQyse4IurZdCYnxCtyYxuYzz4SUl1VLN7DSLGdnIgWLHJ1hEp+0lQpwzDH+Pear07H9m90BVNAnlFQHBzg6dBKvxSVNxVCnKhiqnuo0H61lPZXBRww3H2yOo/CWPGj5jipkesA4XZfb3jNTmlueg1mqds5UsAcDB+xBOfyj9pSVqihhzKSBy5wD7H2zid9f+H/AEoqqdlaoQNTkZCKPZQNOzRh5SZJEz1/GXHGuFGm7FfpOSAT6t8SpNMw2EAMHEKomuSFURhhXMCy4jQEDVEVICQaTM0RJDSyeZALJAQDeJitiRJmoAQtJI2IICbEWgKap7zJHEyLQHqnJjlq+BiJvuIXmxJs2m9i1E0MrpZO45JXAQgxM2a5JlhRTBzFrNessrYaScqmmeJVAUUSmrpjWO3rg4HaL3K+mRxzUBVRD8PfDRZV0MLbdDNL6BzijyqZOsc4hUziKip0hh1DkCuq55cRWkMmFuNdJOkMbfj1+JpIuC4wMdesLSol8nt+gBFeaN2rHYfOsKuI+UV3BHz/AIh6fq069IW+cPggggfOse4HaZ1IOv30z0k+SpiRtgVdSBqGGB75ntVjeLbW6eY3mV6i82Due5PXqMnoCBPGr5uViRoQTjuCDLCwvq9b0F2YtgdyQM6Z7ay99J12d8TYr1h5YyckE4AUtkkkewzgewE52+tcMUGpH1Gd1dWItaIYkNWqDlHZfYTkuIp5akbu259pMy2dx0onE2g1kmSTtaeWxLQ3Xp8oB98RdpccRo/6effX7iUrf9xb2LAnWTRRJPIK0E1orM5Zrmk4rQG6yIEKwkQsJTYFmYhAsiyw2TUyTVZkkIrUyRDVjFl0hGbMejFd/TiAhCkiRES1taeEEKKuIKjU9EEhzM6iwK6qktG+bKSvu9DMSrpiXJ0cgjtpiFtdoFZvzOWAsSuxiKsYzcVAyxIvHIcakgYMQiJmUuJCFSYtIDc/hDUxk4UZhVSGLC3aoQo6kazt0s0tbZqgGf4FJ1PfT8zKvhFiVNMdWyf+TG/G98qinQQ5CKCf6z/x/mY5XbWTpyNU87TtvB3DwitWftp7Ccpwiz8xsseVQfUT27TuqN9R5AFcBF1PTmPQf2/CXvpMjXEqvMSWAzjTqQTpj7A/3nCcVq81RuwOB9p1HE+IKq8xOp2GdR2nGsMn84sejym4Ew2AjHDU9We3/IkrK35nA/QjHDKWHK/7vyGZVzTMFxc2fMHQDPMuV/qXB/tOOdCDj3nfVa9NHCs4BBJBzthTjP5TluNhDUL09mzkdmixtOyKZhoYEw7nAgUGZoyqIELNmniYNYksxMUQnJiaXSTsrWyJnLNs0lRGYbIPEyNGhMi8jIPTxIsMSz8rmUERWvT0j2ew6b5E06wSNrGGgGUqpAxG7LYyvqQ9rUiynQT4iu0TjV7UziK5jx6ghm21gLk6wlCpywNdsnMc9gPnM1JKs3yxme4dwavcBmpIWVdzsM9vcxSvSamSjAqw3B3nq/gOmBZW4Xd2qFsdW5z/AIlL+0HgDNW81F0KjOOpXQ/fUTGcv7are8f6yxwNIZnVeFuGF3Bxr0lJTscdCfkYndeDVCkE9vwl5XpMmqtLqiLdWqs2SoIGdACegE4dbepeVfQCe5OwPczseMW9S8qeWulNdyNi0ueF8LS2pgAbanuTMPLTaRR8M8GELh6m+/KNfxhanhZFP1Mew6CJ+IvENc860UZQoJz/ADHsMbmVXA6dxWrIprbluf1L6VCc3NjAxrgfMvHyyictYezF14VqVHwjYHds6/rMcpeCWWk2PVUwcdtugl7YVsVPKZ1dhqpB+rG4+ROhtzIlu9Vd18cJ4d8I1ApeqOVmyQCNVA2B+TEqPh2sLhyRyoWIGuuJ6XeVOVczkuO8SahSLovM7aIMZ1yMtgbgZju96LcL1/D9ANzVamPnlUH8ZS8f8O01pvUokkLlhrkYAmcFpvWqubmq3J5ZYnnamVqc2AAMDcZOJnDxUIuKeeZeVwpO5GMDMqzLH6nHxy24q52g7UerWFfVRFw2DpNo58vZy5TEAkk9bm3gwYknHIi7zGqaTTtpEEUOTDqcGLU4RoUrFgHBmRQNNSdFs1wxs5EBdHUjtGUTyXIO2ND7RG6bUnuZRlyusZCZEAsatzpGdL1Emrcbw9VZCmsNlsKuIGN1FgCI4aGZombYTWIzGtpKoIGmcQu8X0O+/ZlxUDNu56+bTz/+gPyM6Lj5L1ArnAHqHTHuJ5Nb3DUiroeVlIYEd56lwPjlHiFNQ6r5i4DKfqB7r3WYcmHe3VxZ/wBUvEaAqK3Kc8umcak94Twy/qIG+gEvrjh5pCqygeWyN6cepXA0IInN+GW5axB3z+cjH1VZ+9u8sKAXb7/PWWXlgjWI2R1lisvHtFhOrw5DryA/aBqcOT/4xnviW6zRE08C8lVb8PVcHlUEbaaj7xhV1jeIIiK4SF5UHiC5pxG3TKjbI02lsy8ykSntzhiPcys4WNTa2JGqr841iFSwCcxAAyDnA3l0pzEb9gAxPQEn4GpmVnbTd08QA3+T/eLVRrGmPXvAVFm0ctvaCmSWDEIseiamnkgJowCKyxoKCoiHLMRyIqZxlmQYaZJToOpes2ObXEi9QEQRWSQS1RsQ1BpAiapxEaaDWGG0EN4iQqwRha8CgjNFlmhGWSBAjlCOJJTJ8s1iNUSqH0iCoV3psHRirLqCDggwtYekQQEZ2vRuE+Nkr0/Lr5SqV5cgZRznf20zI0E5L1gDkE8wPcEZnAWb8rqexzO8/io1h/tB+MYnNnjMb19b4ZXKO9sJZJK2x6SzQRYmKoksTQM0xmnnqJsDrVAsWIJ1ha1LIiz12XTl+8XlT1DlvtKypT5a3s0Kl26gk/lF7S6NSoWYY10k3k30PHSwNPE5zxjX8u1rHqV5B8t6f8zpqlTScN4/ufQlLqzcx+F/7P5Rb7GXp5s4gsRu4TEhb0C0224yZpzQ0j9agRvE3EcqmsyE3iaIjAgEgacnTGY41owGSJNqoUWZJFZkRI1VgsSdVpiRwojJUt5FpiaGUZ9yAvvAQbvmSDaSdCsfWDXeTVpBoyOcmkUIjitpFZMCE3JYkWWUcTcZWAAOQAMk6YG8d4datWPKoydPgfM7rw34QSkwqVD5jDbT0AzfDiuXpHJyTFz1v4dZKLVGGKgAYAj+H295e8GHm0QOu4zO6bhisuCN/acxa8Ma2qNTI9JJZOxXt9pn+XxXHGVf43LMrpf8Fq5UDqMS7QznrRShyNuol1Sq6TlxssdRqCr11QZYgDuSAJtXgrikH+oZ+dYgylcqwyGUj2YESD3NMbuv/kJUXXhmk+qqFJ10GNZUVuAcmc8491dsTTyrXj4sMr7dLUvKQ15lx8iJUrhCTyMD8EZnMV+HEjAZ2zsNAfxAzLrgPCvJGXHqO+dSB2zM7WnLw44Te19UqcqczHGBknpieP8AHuOfvNw7j6PpT+gbH76n7y//AGheJ85tqJ9qrA7D+Qf5nCUEyZeGP1w534sG1l3wLhxI1G8p7ZZ3HByCqn2hlUSKbivCdJyl3QKmek8VYDB9tZxXFaWckQxoymlIFm/LziSZMQ9jS53Ue4mlukLejwUoFbEtLy1Hkk6ZAzOha0D0fcCUvlFsjp1mO9tfFyBpTUvW4ZjpmZK8k+LkukGDCEwZWbJSzmGIHKIusIIBmJIGSVZBlwYBsCTZIMNJGpAD0TNVFi4cx2jRL4CgsTsAMkmKgssuvD/h2pdsNOWkPqfp8DuZf+G/AxbFS50G4pjr/VPQbazVFCqoVRoAAAJ28P4tveXpy8v5EnWKmo8Bp0aJSkgGMHPUkdzLfhluGUdiAY/5WkjZU/LbGMKdR/tPad3jJ6c3lb7NLQi/EeFiqumjrqp9+0tadLMOEmHJjMpqteO2XccbTQ7EYI0YHcGFQkGW/GLA/wDq0xqPqH8w7/MrFIYZE8Hm47x5aevxZzOD06kNExpC06neGOUvtVhpIKssIjTHYTVMJNTnP+LeK/u1Fip/1H9FP+o7n7DJl9f3SU1LuwVVGSWOABPJPEPGf3usWGRTTK0wdDjOrH3P/EmYlnldKGohOSdTuc7kxnh6Car7GLW9Qg6TVjt0FOkOksrKs1M46Sm4fWPMonTi1BGZlkqFL+8yD8Sharneb4iSrFTtAIuZUibd0OrRztD8I9FVS22cSx4ZZ85hOKcOKDmGuNY9/D06yjdKVxnpK6jUUFh7nE5e34mRvNXF8x2kzFe3QPcLneanOU+ZhnMyGi2oVh1TSLiMUnm7EMrrJlZFzrJZiA1JMzdSlCWWsNcJiBqx1xIRpbdqjBUBZmOAAMkmd14d8A4w93qdxTXb/wCx6/E14+LLO6jPPkmE7cv4b8M1bw+n0Uxu7DQ+w7z0/wAOeF6VtjlHmVDpzMBn7dpc29oEAVQEUbAaDEftUYarpjrsPxM9LD8fDjm/rhz5rn18CqWjJ9Slc9xMRMxmvXZvrbnxtrpILNZbrtl18EWnNBMnDfoSdPpDVxggybWkjdJWXQHTpnrGFqjrofeRpnOh+3zChM76zDJrEt5znFbLymLoPQ2+P4W7y+NMjb8JqqgcEEZB01nPy8U5MdN+PPwu3MK8g7gAmC4jTNu+D9B+k/4lBx7ixAFOmc1KmgHYd55GXHZl416OOUs2veHVvMLMDoDy/cQ92G5G5Tytg4PaC4FY+TRUHcjJzvmOsND8GetxcMmGrHn8nJfLqvD+L8Qr1HZa1RqnKxADHQYPbaL0lhuP/wDua2P5zI2285bNVvLuB3I0muGWhds9BHa9DIjPCQF9JG8i05GV7UU8MOk6GyugUGYhdW3MuBABmQY7TO9rJcY1fMXpHEbe3ZjkiLVkxNJpFna24FcANg9Z1le3VkIPUTzenVKkEdJ1Vvx0Mmp1xiTYuVzfELbyqrL03EC7wnGLnnfMRLy4S+4aVKDO+TMlLTrFRgGbh4giZgk/LkVTWWyRIk1EOtKRxAGLBcGWVG3as606YLOxwAP1tEKBnr37P/BTpTFer6XqgEZGq0+gA99JeGPle055WTov4b8NJarnHPWP1NjOPZewnS2Vi9Q6DA6kjGJfKlO3Q4GWPfUkwHNcsNFAB9sGejjyamsZqOHLDd3l3S9ahToj+dz31H4RVmepgansB/gRqjw2ox9WR3J6y9t6CUlwBr36mGfJMf8AaePFcv8AIom4cyLzNoei9TFth7zobwgqc/r2HtOeqR8WdynZZ4TG9CUDqJavQykqrcy4L+kRcnzR4K0EjQ6ERyjUz87GAugPvF0fBzKs8oN6WRMgZpamRmRZpjprKW4haLVRlcZB/H7TzStwhbCu1e6cuhYLTbGeUHbM9PqPPNv2qcUHligv1N6m9gJnnjJ+1+N+GXLKYz66izv6ddQ1Jgy7ZBhbhsIx7AzxrgPF6tswdCeUH1LurDsR3np/FOJq1k1ZDoyZHtptFx8syl/qvyPxbxWX5Xj1+3PVqN3dj+c3abyJM1btrOO3a5FqISicEHtFebEcsbZqh9plVR0FkVeTr2IZvmMcO4aKY1Osy6qBOsziwzahR0nMX1vl2HSXV9xQBSMyha8GSe80wiMg3tABF6VI6gQta75tBGuHDQy8uoWKou6RXcRQPOg4omV95R/ux7R40ZdIhpk35J7TJQ2NWAi4OsyZBKYeN8J4ZVu6q0aChqj7AsqDA3JJmTI4Vet+DP2Z07dhXvKgrshytJV/0Q3didWx8CeiBWrZ15FGmF3mTJ0TqWxj7s2JR4YitzHLH/ccxzEyZItt9tJjJ6biN1RLa51/WkyZHh7LKdKy6qkaHpK12yZkyejhOnHl7TomNeedpuZHYiIO+YNpqZFFUShUxpDVXmTJOU7PEjcVcAmeKeJr0169djsCFHwJqZOT8v8A5j1v/Mn70x4Rsv3jz6OxKc6525hpEavFqiW72x1Xm/8AEg6gfhMmTi3qR2ckl85f8UTVTCWp1mTJWunnU8zy64TchQDMmTLNpiu6vHEC9c/E5niPFy5OM4m5kWEGVVlS4LbwWMzJk0QNRSP0jjaZMiJMjm3hqNoDMmRxN9HE4OCJkyZOnwjluV/r/9k='">
                            <!-- <img :src="m.Picture" alt="" > -->
                        </div>
                        <div class="m_Main">
                            <h3>{{m.UserName}}</h3>
                            <p>{{m.Email}}</p>
                        </div>
                        <p class="m_Content">{{m.Content}}</p>
                        <p class="m_Title">{{m.Title}}</p>
                    </div>
                </div>
            </div>
            <div class="message message_Form">

                    <h2 class="title">新增留言</h2>
                    <div class="form_Item">
                        <label for="msg_Name" class="required">暱稱</label>
                        <input id="msg_Name" type="text" v-model="new_Username" required>
                    </div>
                    <div class="form_Item file">
                        <input multiple id="file_Img" type="file" @change="fileChange" ref="inputer">
                        <label name="file_Img" for="file_Img">上傳頭像</label>
                        <img :src="imgUrl" alt="">
                    </div>
                    <div class="form_Item">
                        <label for="msg_Email" class="required">信箱</label>
                        <input id="msg_Email" type="text" v-model="new_Email" required>
                    </div>
                    <div class="form_Item">
                        <label for="msg_Title" class="required">標題</label>
                        <input id="msg_Title" type="text" v-model="new_Title" required>
                    </div>
                    <div class="form_Item">
                        <label for="msg_Content" class="required">內容</label>
                        <textarea name="" id="msg_Content" cols="30" rows="10" v-model="new_Content" required></textarea>
                    </div>
                    <div class="form_Button">
                        <button class="btn grey" @click="message_Cancel()">取消</button>
                        <button class="btn" @click="message_Post()">送出</button>
                    </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                message_Lists:[
                ],
                new_Username: "",
                new_Email: "",
                new_Title: "",
                new_Content: "",
                form_Img: "",
                formData: new FormData(),
                files: '', /* 上傳圖片file */
                imgUrl: '' /* 上傳圖片url */
            }
        },
        mounted(){
            axios.post('/data/APITest/GetMessageBoard')
            .then((resp) => {
                this.message_Lists = JSON.parse(resp.data.content)
                console.log(this.message_Lists)
            });
        },
        methods:{
            imgPreview(file){

                let self = this;
                // 看支持不支持FileReader
                if (!file || !window.FileReader) return;
        
                if (/^image/.test(file.type)) {
                    // 創建一個reader
                    let reader = new FileReader();
                    // 將圖片將轉成 base64 格式
                    reader.readAsDataURL(file);
                    // 讀取成功後的回調
                    reader.onloadend = function () {
                        self.imgUrl = this.result;
                    }
                    
                }
            },
            fileChange(e) {
                // 獲取input DOM
                let inputDOM = this.$refs.inputer;
                let test = e.target.files[0];

                // console.log('$refs',this.$refs)
                // console.log('inputDOM=this.$refs.inputer',inputDOM)
                // 透過DOM取得此input
                console.log('this.formData 前',test)
                this.file    = inputDOM.files[0];
                this.formData.append('file', this.file)
                // this.errText = '';
                // console.log('file',this.file)
                console.log('this.formData', this.formData.get("file"))
        
                // 限制圖片大小
                let size = Math.floor(this.file.size  / 1024);
                if (size > 100) {
                    return false
                }
                console.log('成功')

                // 轉換成預覽圖片
                this.imgPreview(this.file);
                // 触发这个组件对象的input事件
                // this.$emit('input', this.file);
                
                // 这里就可以获取到文件的名字了
                // this.fileName = this.file.name;
                
                // 这里加个回调也是可以的
                // this.onChange && this.onChange(this.file, inputDOM.value);
                // console.log('this.onChange',this.onChange)
                // console.log('this.onChange',this.onChange(this.file, inputDOM.value))
            },
            message_Cancel(){
                this.new_Username = '',
                this.new_Email = '',
                this.new_Title = '',
                this.new_Content = ''

                alert('已取消留言')
            },
            message_Post(){
                let post_Data =  {
                        "username": this.new_Username,
                        "email": this.new_Email,
                        "title": this.new_Title,
                        "content": this.new_Content,
                        "file": this.file
                    }
                var qs = require('qs');
                axios.post('/data/APITest/AddMessageBoard',qs.stringify(post_Data)
                ).then((resp) => {
                    if(resp.data.result == '1'){
                        alert(resp.data.content);
                        // location.reload();
                        this.message_Refesh();
                    }else{
                        alert('留言失敗，請重新輸入內容')

                    }
                    console.log('Data',post_Data)
                    console.log(resp)
                });

            },
            message_Refesh(){
                axios.post('/data/APITest/GetMessageBoard')
                .then((resp) => {
                    this.message_Lists = JSON.parse(resp.data.content)
                    console.log('更新成功',this.message_Lists)
                });
            }
        }
    }
</script>