<template>
  <div style="margin-top:100px">
         <div class="row" style="margin: 30px; border: 4px solid #cbc6c6; border-radius: 15px;">
              <div class="col-md-3">
                <img  :src="profile.image" style="width:100%">
              </div>
              <div class="col-md-9" style="text-align: left;font-size: 35px; padding-top: 35px;">
                <label>{{profile.name}}</label> <br>
                <label>{{profile.email}}</label> 
              </div>
          </div>
  </div>
</template>

<script>

export default {
  name: 'Profile',
  props: {
    
  },
  components:{

  },
  data () {
    return {
        title :"Profile",
        profile:{
            image:"",
            name:""
        }
    }
  },
  methods: {
    gotoProfile(){
          this.$router.push("Profile")

    },
    checkData(){
        let localFbId = localStorage.getItem('facebookId')

        if(localFbId == undefined){
            let google = JSON.parse(localStorage.getItem('google'))

            this.profile = {
                image:google.dt.PJ,
                name:google.dt.uU,
                email:google.dt.Ot
            }
            

        }else{
            window.FB.api('/'+localFbId+'?fields=name,email,birthday,picture',function(response) {
                
                console.log(response);
            }, { scope: 'email' }); 
        }
    },
  },
  created(){
      document.getElementById("title").innerHTML = this.title

      this.checkData()
    
  }
}

</script>

<style>

</style>