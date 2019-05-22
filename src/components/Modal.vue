<template>
<!-- EditMember -->
    <div class="modal-container">
        <input id="modal-toggle" type="checkbox">
        
        <label class="modal-backdrop" for="modal-toggle"></label>
        <div class="modal-content">
            <label class="modal-close" for="modal-toggle">&#x2715;</label>
            <h2>修改成員</h2><hr />
            <form action="">
                <div class="input-container">
                    <input id="name" class="input" type="text" pattern=".+" required />
                    <label class="label" for="name">Name</label>
                </div>
                <div class="input-container">
                    <input id="content" class="input" type="text" pattern=".+" required />
                    <label class="label" for="content">Content</label>
                </div>
            </form>
            <label class="modal-content-btn" for="modal-toggle">送出</label>   
        </div>          
    </div>  
</template>
