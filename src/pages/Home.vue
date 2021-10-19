<template>
  <div style="margin-top:100px">
    <div v-if="view==1">
       <input type="text" class="inp" placeholder="Search.."  style="margin: 30px;" :oninput="(e)=>{findText(e)}">


        <div class="row" v-for="(item,index) in listItem" :key="index" style="margin: 30px; border: 4px solid #cbc6c6; border-radius: 15px;" @click="clickItem(item)">
            <div class="col-md-4">
              <img  :src="item.image" style="width:100%">
            </div>
            <div class="col-md-8" style="text-align: left;font-size: 35px; padding-top: 35px;">
              {{item.name}}
            </div>
            <div  class="col-md-12" style="text-align: left;font-size: 25px;">
              {{item.description}}
            </div>
          </div>
    </div>
    <div v-else>
            <div class="row" style="margin: 30px; border: 4px solid #cbc6c6; border-radius: 15px;">
              <div class="col-md-3">
                <img  :src="selectedItem.avatar" style="width:100%">
              </div>
              <div class="col-md-9" style="text-align: left;font-size: 35px; padding-top: 35px;">
                <label>{{selectedItem.name}}</label> 
                <div v-html="generateStar(selectedItem.rating)"></div>
              </div>
              <div  class="col-md-12" style="text-align: left;font-size: 25px;">
                {{selectedItem.description}}
              </div>
          </div>
          <div class="row" style="padding:40px">
            <div class="col-md-12" style="font-weight:bold; font-size:25px">Services</div>

            <div v-for="(srv,idx) in selectedItem.services" :key="idx" class="col-md-5" style="border: 1px solid black;margin: 5px;border-radius:1px">
              <div>{{srv.name}}</div>
              <div>Rp{{srv.price}}</div>
              <div>{{srv.caption}}</div>
            </div>
          </div>




    </div>

    <div class="row bottom-but" @click="gotoProfile">
      <div >Profile</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  props: {
    
  },
  components:{

  },
  data () {
    return {
        title :"Home",
        listItem:[],
        tempListItem:[],
        view:1,

        selectedItem:{}
    }
  },
  methods: {
    gotoProfile(){
          this.$router.push("Profile")

    },
     
      clickItem(item){
        this.selectedItem = item
        this.view = 2
      },
      generateStar(rat){
        let curRat = Number(rat)
        let outRat = 5 - curRat

        let result = ""

        for(let i=0; i<curRat;i++){
          result = result +"<a class='fa fa-star' style='color:yellow'></a>"
        }
         for(let j=0; j<outRat;j++){
          result = result +"<a class='fa fa-star'></a>"
        }

        return result
      },
      findText(e){
       
         var result = [];
         let dataList = this.tempListItem

        for (let item of dataList) {
          let text = item.name
            if (text.match(e.target.value)) {
                result.push(item);
            }
        }

        if(e.target.value == ""){
          this.listItem = dataList
        }else{
          this.listItem = result
        }
      },
    
  },
  created(){
      document.getElementById("title").innerHTML = this.title
      
      fetch("https://604048b4f34cf600173c7cda.mockapi.io/api/v1/list-artisan")
            .then(response => response.json())
            .then((data)=>{
              for(let dat of data){
                this.tempListItem.push(dat)

              }
              this.listItem = this.tempListItem
              console.log(this.listItem)
            }               
            );

            console.log(this.ListItem)

      // const response = await fetch("https://604048b4f34cf600173c7cda.mockapi.io/api/v1/list-artisan");
          
      // var data = await response.json();
      // console.log("data",data)
  }
}

</script>

<style>
.inp[type=text] {
  float: right;
  padding: 6px;
  margin-top: 8px;
  margin-right: 16px;
  border: none;
  font-size: 17px;
}

.inp[type=text] {
    float: none;
    display: block;
    text-align: left;
    margin: 0;
    padding: 14px;
  }
  
.inp[type=text] {
    border: 1px solid #ccc;  
  }

  .bottom-but{
    position: fixed;
    bottom: 0;
    background: white;
    width: 100%;
    border: 1px solid #bfbbbb;
    height: 40px;
    font-size: 25px;
  }

</style>