# QuillEditor 富文本编辑器

一般后台管理系统类项目，都包含富文本，自定义富文本

引用方式：
```javascript
import QuillEditor from '@/components/QuillEditor'

export default {
  components: {
    QuillEditor
  }
}

```

## 代码演示

```html
<quill-editor v-model="我是富文本内容"></quill-editor>

```

## API
参数 | 说明 | 类型 | 默认值
------ | ------------------ | ------ | -----
prefixCls | 富文本默认演示，可传入自定义样式 | String | -
value | 富文本内容 | String | -
@blur | 失去焦点 | Function | -
@focus | 聚焦 | Function | -
@ready | 富文本加载完成 | Function | -
@change | 改变内容 | Function | 返回html文本内容

