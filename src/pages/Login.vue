<template>
 <div class="wrapper fadeInDown">
  <div id="formContent" style="margin-top:50px">
    <!-- Tabs Titles -->

    <!-- Icon -->
    <div class="fadeIn first">
      <img src="@/images/logo.png" id="icon" alt="User Icon" style="width: 130px; margin: 15px;"/>
    </div>

    <!-- Login Form -->
    <form>
      <input type="text" id="login" class="fadeIn second" name="login" placeholder="login">
      <input type="text" id="password" class="fadeIn third" name="login" placeholder="password">
      <input type="submit" class="fadeIn fourth" value="Log In" @click="_login">
    </form>

    <!-- Remind Passowrd -->
    <div id="formFooter">
       <div style="justify-content:center; display:flex;">
          <div id="gSignIn" class="g-signin2" style="margin-bottom:3rem"></div>
      </div>

        <button class="loginBtn loginBtn--facebook" href="/auth/facebook" @click="_facebookLogin">
            Login with Facebook
        </button>
       
    </div>

  </div>
</div>

</template>

<script>
import router from "@/router"; 

export default {
  name: 'Login',
  props: {
    
  },
  components:{

  },
  data () {
    return {
        title :"Login",
        facebookId:""
    }
  },
  methods: {
      _login(){
         router.push("Home")
      },
      _facebookLogin(){
          this.checkFacebookLoginStatus()
      },
      getFacebookData(){
            window.FB.api('/me?fields=name,email,birthday,picture',function(response) {
                console.log(response);
            }, { scope: 'email' }); 
      },
      checkFacebookLoginStatus(){
          this.facebookId = ""

          window.FB.getLoginStatus(function(response) {
                console.log("FBloginstatus",response)

                if(response.status == "connected"){
                  localStorage.removeItem("google")

                  this.facebookId = response.authResponse.userID
                  let localFbId = localStorage.getItem('facebookId')

                  if(localFbId == undefined || localFbId != this.facebookId){
                      localStorage.setItem('facebookId', this.facebookId);
                  }else{
                      router.push("Home")
                  }
                }else{
                  localStorage.removeItem('facebookId');

                  window.FB.login(function(response){
                    localStorage.setItem('facebookId', response.userId);
                      router.push("Home")
                  });
                  
                }
            });
      },
       appendGoogleApi(){ 
        let script = document.createElement('script')
        script.onload = () => {
              this.renderGoogleButton()

        }
        script.async = true
        script.defer = true
        script.src = 'https://apis.google.com/js/platform.js'
        document.head.appendChild(script)
      },
      onSignIn(googleUser) {
        console.log("googleUser",googleUser)

          let googleDat = localStorage.getItem('google')
            localStorage.removeItem("facebookId")

          if(googleDat == undefined){
              localStorage.setItem('google', JSON.stringify(googleUser));
              router.push("Home")

          }else{
              router.push("Home")
          }
      },
      onSignOut() { 
          var auth2 = window.gapi.auth2.getAuthInstance();
          if(auth2 != null){
            auth2.signOut().then(function() {
              console.log('User signed out.');
            });
          }
      },
      renderGoogleButton() { 
          if(!window.gapi)return
          
          window.gapi.signin2.render('gSignIn', {
              'scope': 'profile email',
              'width': 200,
              'height': 30,
              'longtitle': true,
              'theme': 'dark',
              onsuccess: (e)=>{this.onSignIn(e)} ,
              onerror: (err)=> { console.log('Google signIn2.render button err: ' + err) }
          })
      },
    
  },
  created(){
      document.getElementById("title").innerHTML = this.title
  },
  mounted(){
      this.appendGoogleApi()

  },
}

</script>

<style>


</style>