<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;">
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
import { geturl } from '../../public/js/status'
export default {
  name: "Ue",
  data() {
    return {
      editor: null,
      editorContent: '',
      url:''
    };
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ['content'], // 接收父组件的方法
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.$emit('catchData',this.editorContent)
    };
    this.url=geturl()+'/tools/uploadToolPic'
    // 上传图片到服务器，base64形式
    // this.editor.customConfig.uploadImgShowBase64 = true
    // 隐藏网络图片
    this.editor.customConfig.showLinkImg = false
    this.editor.customConfig.uploadFileName = 'file'; //设置文件上传的参数名称
		this.editor.customConfig.uploadImgServer = this.url; //设置上传文件的服务器路径
		this.editor.customConfig.uploadImgMaxSize = 20 * 1024 * 1024; // 将图片大小限制为 3M
		//自定义上传图片事件
		this.editor.customConfig.uploadImgHooks = {
			before: function(xhr, editor, files) {
        // console.log(files)
			},
			success: function(xhr, editor, result) {
				// console.log("上传成功");
			},
			fail: function(xhr, editor, result) {
				// console.log("上传失败,原因是" + result);
			},
			error: function(xhr, editor) {
				// console.log("上传出错");
			},
			timeout: function(xhr, editor) {
				// console.log("上传超时");
      },
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        // console.log(result)
        var url = result.data[0];
        insertImg(url)
        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
		}
    this.editor.customConfig.menus = [
      // 菜单配置
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      'video',  // 插入视频
      'code',  // 插入代码
      'undo',  // 撤销
      'redo'  // 重复
    ];
    this.editor.create(); // 创建富文本实例
    this.editor.txt.html(this.content)
  },
  watch: {
    //  watch 表示监听  当父组件的内容变化时需要更新编辑器的内容
    content() {
      this.editor.txt.html(this.content)
    }
},
}
</script>
<style >
  #wangeditor{
    z-index: 1999 !important;
    
  }
  .w-e-text-container{
    resize: vertical;
    overflow:auto;
  }
</style>