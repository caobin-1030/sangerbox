<template>
  <div>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer1 from '../components/Footer1'
export default {
  data() {
    return {
      code:''
    }
  },
  created(){
    var qs=require('qs')
    this.code=window.location.search
    var a=this.code.slice(1,this.code.length).split("&")[0].split("=")[1]
    this.axios.get(`/user/bindWechat`, {
      params:{code:a},paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
    }).then(result=>{
    })
  },
  mounted() {
  },
}
</script>
