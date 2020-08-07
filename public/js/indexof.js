import {
  Message,
  MessageBox,
  Radio,
  RadioGroup,
  RadioButton,
} from 'element-ui'
import axios from 'axios'

var functiontofindIndexByKeyValue =function (arraytosearch, key, valuetosearch) {
  for (var i = 0; i < arraytosearch.length; i++) {
    // console.log(arraytosearch[i][key][valuetosearch])
    if (arraytosearch[i][key][valuetosearch] != undefined) {
      return i;
    }
  }
  return null;
}


//解压
import pako from 'pako'
function pako_ungzip(str){
  try{
      var restored = pako.ungzip( str, { to: 'string' } );
  }catch(err){
      // console.log("异常:"+err);
  }
  return restored;
}

//formCreat
function formCreats(args,files111){
  var rule=[]
  for(var a of args){
    switch (a.argsType) {
      case 'textarea':
        var b={}
        b.type='input'
        b.field=a.id.toString()
        b.value=a.defaultValue
        b.title=a.argsLabel
        b.col={}
        b.col.span=24
        b.props={}
        b.props.rows=6
        b.props.resize='none'
        b.props.type='textarea'
        b.props.placeholder=a.argsDesc
        if(a.missValue==0){
          b.validate=[]
          b.validate[0]={}
          b.validate[0].required=true
          b.validate[0].message="不能为空"
          b.validate[0].trigger=blur
        }
        rule.push(b);
        break;
      case 'fileTextArea':
        var bb={}
        bb.type='radio'
        bb.title='输入或选择文件'
        var r=a.id.toString()
        bb.value='shuru'+r
        bb.col={}
        bb.col.span=24
        bb.field=a.id.toString()+'1'
        bb.id=a.id.toString()
        bb.className="radio11"
        bb.props={}
        bb.props.type="button"
        bb.event={}
        bb.emitPrefix= 'xaboy'
        bb.emit=['change']
        bb.validate=[]
        bb.validate[0]={}
        bb.validate[0].required=true
        bb.validate[0].message="不能为空"
        bb.validate[0].trigger=blur
        var cc=[]
        cc[0]={}
        cc[1]={}
        cc[0].label=`输入`+r
        cc[1].label=`文件`+r
        cc[0].value='shuru'+r
        cc[1].value='wenjian'+r
        bb.options=cc
        rule.push(bb)
        var bbb={}
        bbb.type='input'
        bbb.value=''
        bbb.title=a.argsLabel
        bbb.field=a.id.toString()
        bbb.className=`${a.id.toString()}+1 input1`
        bbb.col={}
        bbb.col.span=24
        bbb.props={}
        bbb.props.rows=6
        bbb.props.resize='none'
        bbb.props.type='textarea'
        bbb.props.placeholder=a.argsDesc
        bbb.validate=[]
        bbb.validate[0]={}
        if(a.missValue==0){
          bbb.validate[0].required=true
          bbb.validate[0].message="不能为空"
          bbb.validate[0].trigger=blur
        }
        rule.push(bbb)
        var f={}
        f.type='input'
        f.title=a.argsLabel
        f.field=a.id.toString()
        f.className=`${a.id.toString()} select`
        f.col={}
        f.col.span=24
        f.emitPrefix= 'xaboy11'
        f.emit=['focus']
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
        }
        f.props={}
        f.props.rows=6
        f.props.resize='none'
        f.props.placeholder=a.argsDesc
        f.name='text'
        rule.push(f);
        var b={}
        b.type='input'
        b.title=''
        b.col={}
        b.col.span=0
        b.className=`${a.id.toString()} upload1`
        // b.value[0]=a.defaultValue
        rule.push(b)
        break;
      case 'mutiSelect':
        var b={}
        b.type='select'
        b.title=a.argsLabel
        b.value=[]
        b.value[0]=a.defaultValue
        b.col={}
        b.col.span=24
        b.field=a.id.toString()
        var temp = a.argsValueListvalue.split(/[\n,]/g)
        var c=[]
        for(var e of temp){
          var d={}
          d.value=e
          d.label=e
          c.push(d)
        }
        b.options=c
        b.props={}
        b.props.multiple=true
        b.props.placeholder=a.argsDesc
        if(a.missValue==0){
          b.validate=[]
          b.validate[0]={}
          b.validate[0].required=true
          b.validate[0].message="不能为空"
          b.validate[0].trigger=blur
        }
        rule.push(b);
        break;
      case 'checkbox':
        var b={}
        b.type='checkbox'
        b.title=a.argsLabel
        b.value=[]
        b.value[0]=a.defaultValue
        b.col={}
        b.col.span=24
        b.field=a.id.toString()
        var temp = a.argsValueListvalue.split(/[\n,]/g)
        var c=[]
        for(var e of temp){
          var d={}
          d.value=e
          d.label=e
          c.push(d)
        }
        b.options=c
        if(a.missValue==0){
          b.validate=[]
          b.validate[0]={}
          b.validate[0].required=true
          b.validate[0].message="不能为空"
          b.validate[0].trigger=blur
        }
        rule.push(b);
        break;
      case 'radio':
        var b={}
        b.type='radio'
        b.title=a.argsLabel
        b.col={}
        b.col.span=24
        b.value=a.defaultValue
        b.field=a.id.toString()
        var temp = a.argsValueListvalue.split(/[\n,]/g)
        var c=[]
        for(var e of temp){
          var d={}
          d.value=e
          d.label=e
          c.push(d)
        }
        b.options=c
        if(a.missValue==0){
          b.validate=[]
          b.validate[0]={}
          b.validate[0].required=true
          b.validate[0].message="不能为空"
          b.validate[0].trigger=blur
        } 
        rule.push(b)
        break;
      case 'select':
        var b={}
        b.type='select'
        b.title=a.argsLabel
        b.col={}
        b.col.span=24
        b.value=a.defaultValue
        b.field=a.id.toString()
        var temp = a.argsValueListvalue.split(/[\n,]/g)
        var c=[]
        for(var e of temp){
          var d={}
          d.value=e
          d.label=e
          c.push(d)
        }
        b.options=c
        b.props={}
        b.props.placeholder=a.argsDesc
        if(a.missValue==0){
          b.validate=[]
          b.validate[0]={}
          b.validate[0].required=true
          b.validate[0].message="不能为空"
          b.validate[0].trigger=blur
        }
        rule.push(b)
        break;
      case 'number':
        var b={}
        b.type='InputNumber'
        b.title=a.argsLabel
        b.field=a.id.toString()
        b.props={}
        b.value=a.defaultValue
        b.col={}
        b.col.span=24
        b.props.precision=2
        b.props.placeholder=a.argsDesc
        if(a.missValue==0){
          b.validate=[]
          b.validate[0]={}
          b.validate[0].required=true
          b.validate[0].message="不能为空"
          b.validate[0].trigger=blur
        }
        rule.push(b)
        break;
      case 'color':
        var b={}
        b.type='ColorPicker'
        b.title=a.argsLabel
        b.field=a.id.toString()
        b.props={}
        b.col={}
        b.col.span=24
        b.value=`#${a.defaultValue}`
        if(a.missValue==0){
          b.validate=[]
          b.validate[0]={}
          b.validate[0].required=true
          b.validate[0].message="不能为空"
          b.validate[0].trigger=blur
        }
        rule.push(b)
        break;
      case 'time':
        var b={}
        b.type='DatePicker'
        b.title=a.argsLabel
        b.field=a.id.toString()
        b.props={}
        b.props.type='datetimerange'
        b.props.format='yyyy-MM-dd HH:mm:ss'
        b.col={}
        b.col.span=24
        b.props.defaultValue=a.defaultValue
        b.props.placeholder=a.argsDesc
        if(a.missValue==0){
          b.validate=[]
          b.validate[0]={}
          b.validate[0].required=true
          b.validate[0].message="不能为空"
          b.validate[0].trigger=blur
        }
        rule.push(b);
        break;
      case 'input':
        var b={}
        b.type='input'
        b.title=a.argsLabel
        b.value=a.defaultValue
        b.field=a.id.toString()
        b.col={}
        b.col.span=24
        b.props={}
        b.props.type='text'
        b.props.placeholder=a.argsDesc
        if(a.missValue==0){
          b.validate=[]
          b.validate[0]={}
          b.validate[0].required=true
          b.validate[0].message="不能为空"
          b.validate[0].trigger=blur
        }
        rule.push(b);
        break;
      case 'file':
        var f={}
        f.type='input'
        f.title=a.argsLabel
        f.field=a.id.toString()
        f.className=`${a.id.toString()} select`
        f.col={}
        f.col.span=24
        f.emitPrefix= 'xaboy11'
        f.emit=['focus']
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
        }
        f.props={}
        f.props.rows=6
        f.props.resize='none'
        f.props.placeholder=a.argsDesc
        f.name='text'
        rule.push(f)
        break;
      case 'file_text-R':
        var f={}
        f.type='input'
        f.title=a.argsLabel
        f.field=a.id.toString()
        f.className=`${a.id.toString()} select`
        f.col={}
        f.col.span=24
        f.emitPrefix= 'xaboy11'
        f.emit=['focus']
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
        }
        f.props={}
        f.props.rows=6
        f.props.resize='none'
        f.props.placeholder=a.argsDesc
        rule.push(f)
        break;
      case 'file_text-RW':
        var f={}
        f.type='input'
        f.title=a.argsLabel
        f.field=a.id.toString()
        f.className=`${a.id.toString()} select`
        f.col={}
        f.col.span=24
        f.emitPrefix= 'xaboy11'
        f.emit=['focus']
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
        }
        f.props={}
        f.props.rows=6
        f.props.resize='none'
        f.props.placeholder=a.argsDesc
        rule.push(f)
        break;
      case 'file_text-W':
        var f={}
        f.type='input'
        f.title=a.argsLabel
        f.field=a.id.toString()
        f.className=`${a.id.toString()} select`
        f.col={}
        f.col.span=24
        f.emitPrefix= 'xaboy11'
        f.emit=['focus']
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
        }
        f.props={}
        f.props.rows=6
        f.props.resize='none'
        f.props.placeholder=a.argsDesc
        rule.push(f)
        break;
      case 'file_binary-R':
        var f={}
        f.type='input'
        f.title=a.argsLabel
        f.field=a.id.toString()
        f.className=`${a.id.toString()} select`
        f.col={}
        f.col.span=24
        f.emitPrefix= 'xaboy11'
        f.emit=['focus']
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
        }
        f.props={}
        f.props.rows=6
        f.props.resize='none'
        f.props.placeholder=a.argsDesc
        rule.push(f)
        break;
      case 'file_binary-RW':
        var f={}
        f.type='input'
        f.title=a.argsLabel
        f.field=a.id.toString()
        f.className=`${a.id.toString()} select`
        f.col={}
        f.col.span=24
        f.emitPrefix= 'xaboy11'
        f.emit=['focus']
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
        }
        f.props={}
        f.props.rows=6
        f.props.resize='none'
        f.props.placeholder=a.argsDesc
        rule.push(f)
        break;
      case 'file_binary-W':
        var f={}
        f.type='input'
        f.title=a.argsLabel
        f.field=a.id.toString()
        f.className=`${a.id.toString()} select`
        f.col={}
        f.col.span=24
        f.emitPrefix= 'xaboy11'
        f.emit=['focus']
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
        }
        f.props={}
        f.props.rows=6
        f.props.resize='none'
        f.props.placeholder=a.argsDesc
        rule.push(f)
        break;
      case 'file_folder-RW':
        var f={}
        f.type='select'
        f.title=a.argsLabel
        f.value=a.defaultValue
        f.name='folder1'
        f.col={}
        f.col.span=24
        f.field=a.id.toString()
        f.options=[]
        f.props={}
        f.props.placeholder=a.argsDesc
        f.props.filterable=true
        f.props.allowCreate=true
        f.props.filterMethod=function(query = "") {
          console.log(f)
          if(f.ppp.length>0){
            var arr = f.ppp.filter(item => {
              return item.label.includes(query) || item.value.includes(query);
            });
            if (arr.length > 40) {
              f.options = arr.slice(0, 40);
            } else {
              f.options = arr;
            }
          }
        }
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
          f.validate[1]={}
          f.validate[1].required=true
          f.validate[1].message="输入字符、数字、斜杠、点和下划线"
          f.validate[1].pattern="^[A-Za-z0-9_/.-]+$"
          f.validate[1].trigger=blur
        }
        rule.push(f)
        break;
      case 'file_folder-W':
        var f={}
        f.type='select'
        f.title=a.argsLabel
        f.value=a.defaultValue
        f.col={}
        f.col.span=24
        f.field=a.id.toString()
        f.props={}
        f.props.filterable=true
        f.props.allowCreate=true
        f.props.placeholder=a.argsDesc
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
          f.validate[1]={}
          f.validate[1].required=true
          f.validate[1].message="输入字符、数字、斜杠、点和下划线"
          f.validate[1].pattern="^[A-Za-z0-9_/.-]+$"
          f.validate[1].trigger=blur
        }
        rule.push(f)
        break
      case 'file_folder-R':
        var f={}
        f.type='select'
        f.title=a.argsLabel
        f.value=a.defaultValue
        f.name='folder'
        f.col={}
        f.col.span=24
        f.field=a.id.toString()
        f.options=[]
        f.props={}
        f.props.placeholder=a.argsDesc
        f.props.filterable=true
        f.props.filterMethod=function(query = "") {
          if(f.ppp.length>0){
            var arr = f.ppp.filter(item => {
              return item.label.includes(query) || item.value.includes(query);
            });
            if (arr.length > 40) {
              f.options = arr.slice(0, 40);
            } else {
              f.options = arr;
            }
          }
        }
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
          f.validate[1]={}
          f.validate[1].required=true
          f.validate[1].message="输入字符、数字、斜杠、点和下划线"
          f.validate[1].pattern="^[A-Za-z0-9_/.]+$"
          f.validate[1].trigger=blur
        }
        rule.push(f);
        break;
      case 'file_Multiple-text':
        var f={}
        f.type='input'
        f.title=a.argsLabel
        f.field=a.id.toString()
        f.className=`${a.id.toString()} select`
        f.col={}
        f.col.span=24
        f.emitPrefix= 'xaboy111'
        f.emit=['focus']
        f.validate=[]
        f.validate[0]={}
        if(a.missValue==0){
          f.validate[0].required=true
          f.validate[0].message="不能为空"
          f.validate[0].trigger=blur
        }
        f.props={}
        f.props.rows=6
        f.props.resize='none'
        f.props.placeholder=a.argsDesc
        f.name='text'
        rule.push(f)
        break;
      case 'file_Multiple-binary':
          var f={}
          f.type='input'
          f.title=a.argsLabel
          f.field=a.id.toString()
          f.className=`${a.id.toString()} select`
          f.col={}
          f.col.span=24
          f.emitPrefix= 'xaboy111'
          f.emit=['focus']
          f.validate=[]
          f.validate[0]={}
          if(a.missValue==0){
            f.validate[0].required=true
            f.validate[0].message="不能为空"
            f.validate[0].trigger=blur
          }
          f.props={}
          f.props.rows=6
          f.props.resize='none'
          f.props.placeholder=a.argsDesc
          f.name='text'
          rule.push(f)
    }
  }
  return rule
}

export {
  functiontofindIndexByKeyValue,pako_ungzip,formCreats
}