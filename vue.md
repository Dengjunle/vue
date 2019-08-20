# vue

## 一、基础代码 MVVM层

### 1导入vue包

```vue
<script src="./lib/vue.js"></script>
```

### 2创建一个实例 VM层和M层

```js
 <script>
     //创建一个vue实例
     //当我们导入包的时候，在浏览器的内存中就会多一个vue构造函数
     // 注意：我们的 new 出来的这个 vm 对象，就是我们的 mvvm 中的 vm 调度者
     var vm = new Vue({
         el:'#app', //表示，当前我们new的这个vue实例，要控制页面上的哪个区域,
         //这里的data就是mvvm中的m，专门用来保存每个页面的数据的
         data: {//data 属性中，存放的是el中要用到的数据
             msg: '欢迎学习vue',//通过vue提供的指令，很方便的就能把数据渲染的到页面上，程序员不再手动操作dom元素了【前端的vue之类的框架，不提倡我们去手动操作dom元素】
         }
     })
 </script>
```

### 3运用到html V层

```html
<!-- 将来new的vue实例，会控制这个元素的所有内容 -->
<!-- vue 治理所控制的这个元素区域，就是我们的v -->
<div id="app">
    <p>{{msg}}</p>
</div>
```

## 二、v-cloak、v-text、v-html的使用 

 vue代码

```vue
<script src="./lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data:{
            msg:'123',
            msg2:'<h1>火狐i阿苏的衣服嘎斯</h1>',
            mytitle:'自定义标题'
        }
    })
</script>
```

### 1.v-cloak的使用

 使用 v-cloak能够解决插值表达式闪烁问题

```css
[v-cloak]{
    display: none;
}
```

```html
 <p v-cloak>........{{msg}}......</p>
```

结果：........123......

### 2.v-text的使用

默认 v-text 是没有闪烁问题的

v-text会**覆盖元素中原本的内容**，但是 插值表达式 只会替换自己的这个占位符，不会把整个元素的内容清空 

```html
<h4 v-text="msg">...................</h4>
```

结果：123

### 3.v-html的使用

v-html可以解析“<h1>火狐i阿苏的衣服嘎斯</h1>''

```html
<div v-html="msg2"></div>
```

结果：火狐i阿苏的衣服嘎斯

### 4.v-bind的使用

 v-bind:是vue中，提供的用于绑定属性的指令 

```html
<input type="button" value="按钮"  v-bind:title="mytitle+msg" />

```

注意：v-bind:指令可以简写为”:“要绑定的属性 

v-bind中，可以写合法的js表达式 

```html
<input type="button" value="按钮"  :title="mytitle+msg" />

```

### 5.v-on的使用

v-on事件绑定机制

缩写是@

```html
<input type="button" value="按钮1" v-on:click="show">
<input type="button" value="按钮1" @click="show">

```

```vue
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            msg: '123',
            msg2: '<h1>火狐i阿苏的衣服嘎斯</h1>',
            mytitle: '自定义标题'
        },
        methods: {//这个 methods属性定义了当前vue实例所有可用的方法
            show:function(){
                alert('hello')
            }
        }
    })
</script>

```

这个 methods属性定义了当前vue实例所有可用的方法

## 三、事件修饰符的介绍

- .stop 阻止冒泡
- .prevent 阻止默认事件
- .capture 使用事件捕获模式
- .self 指当前事件在该元素本身（比如不是子元素）触发时触发回调
- .once 事件只触发一次

```vue
<script src="./lib/vue.js"></script>
<script>
    //创建 vue 实例 得到viewmodel
    var vm =new Vue({
        el:'#app',
        data:{},
        methods:{
            div1Handler() {
                console.log('这是触发了 inner div 的点击事件');
            },
            btnHandler() {
                console.log('这是触发了 btn 按钮 的点击事件');
            },
            linkClick() {
                console.log('触发了连续点击事件');
            },
            div2Handler() {
                console.log('这是触发了 outer div 的点击事件');
            }
        }
    })
</script>

```

### 01、 .stop 阻止冒泡

```html
<div class="inner" @click="div1Handler">
    <input type="button" value="戳他" @click.stop="btnHandler" />
</div>

```

### 02、.prevent 阻止默认行为

```html
<a href="http://www.baidu.com" @click.prevent="linkClick" >有问题，先去找百度</a>

```

### 03、.capture 实现捕获触发事件的机制

```html
<div class="inner" @click.capture="div1Handler">
    <input type="button" value="戳他" @click="btnHandler" />
</div>

```

### 04、.self 实现只有点击当前元素时候，才会触发事件处理函数

```html
<div class="inner" @click.self="div1Handler">
    <input type="button" value="戳他" @click="btnHandler" />
</div>

```

### 05、.once 只触发一次事件处理函数

```html
<a href="http://www.baidu.com" @click.prevent.once="linkClick" >有问题，先去找百度</a>

```

### 06、演示：.stop和.self的区别

```html
<div class="outer" @click="div2Handler">
     <div class="inner" @click="div1Handler">
         <input type="button" value="戳他" @click.stop="btnHandler" />
     </div>
</div>

```

### 07、.self只会阻止自己身上冒泡行为的触发，并不会真正阻止 冒泡的行为

```html
<div class="outer" @click="div2Handler">
     <div class="inner" @click.self="div1Handler">
         <input type="button" value="戳他" @click="btnHandler" />
     </div>
</div>

```

## 四、v-model双向数据绑定

v-bind 只能实现数据的单向绑定，从m自动绑定到v，无法实现数据的双向数据绑定

```html
<input type="text" v-bind:value="msg" style="width:100%;" />

```

 使用 v-model 指令，可以实现 表单元素和model中数据的双向数据绑定

注意：v-model 只能运用在 表单元素中

```html
<input type="text" v-model="msg" style="width:100%;" />

```

## 五、class样式

1.数组

```html
 <!-- 第一种使用方式，直接传递一个数组，注意：这里的class 需要使用 v-bind做数据绑定 -->
 <h1 :class="['thin','red']">edrfghjkswdcfghyjuk</h1>

```

2.数组中使用三元表达式

```html
<!-- 在数组中使用三元表达式 -->
<h1 :class="['thin',falg?'active':'']">edrfghjkswdcfghyjuk</h1> 

```

3.数组中嵌套对象

```html
<!-- 在数组中使用，对象来代替三元表达式，提高代码的可读性 -->
<h1 :class="['thin',{'active':falg}]">edrfghjkswdcfghyjuk</h1>

```

4.直接使用对象

```html
<!-- 在为class 使用 v-bind绑定对象的时候，对象的属性的类名，由于 对象的属性可带引号，也可不带引号，所以 这里我没写引号；属性的值 是一个标识符 -->
<h1 :class="classObj">edrfghjkswdcfghyjuk</h1>

```

vue代码

```vue
<script>
    var vm = new Vue({
        el:"#app",
        data:{
            falg:true,
            classObj:{red:true,thin:true,italic:false,active:false}
        },
        methods:{

        }
    })
</script>

```

## 六、内联样式

1.将样式对象，定义到data中，并直接引用到:style中

```html
<!-- 对象就是无序键值对的集合 -->
<h1 :style="styleObj1">这是一哥</h1>

```

2.在:style中通过数组，引用多个data上的样式对象

```html
<h1 :style="[styleObj1,styleObj2]">这是一哥</h1>

```

vue代码

```vue
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            styleObj1:{color:'red','font-weight':200},
            styleObj2:{'font-style':'italic'}
        },
        methods:{}
    })
</script>

```

## 七、v-for的四种使用方式

### 第1种，数组

```html
<div id="app">
    <h4 v-for="(item,i) in list">
        索引值:{{i}}----每一项：{{item}}
    </h4>
</div>
<script>
    var vm = new Vue({
        el:"#app",
        data:{
            list:[1,2,3,4,5,6]
        },
        methods:{

        }
    })
</script>

```

### 第2种，对象数组

```html
<div id="app">
    <p v-for="(item,i) in list" >id:{{item.id}}-----名字：{{item.name}}---索引值：{{i}}</p>
</div>
<script>
    var vm = new Vue({
        el:"#app",
        data:{
            list:[
                { id: 1, name: 'zs1' },
                { id: 2, name: 'zs2' },
                { id: 3, name: 'zs3' },
                { id: 4, name: 'zs4' },
            ]
        }
    })
</script>

```

### 第3种，对象

```html
<div id="app">
    <!-- 注意：在遍历对象身上的键值对的时候，除了 有 val key ，在第三个位置还有一个 索引 -->
    <p v-for="(val,key,i) in user">值是：{{val}}---键是：{{key}}--索引:{{i}}</p>
</div>
<script>
    var vm = new Vue({
        el:"#app",
        data:{
            user:{
                id:1,
                name:'asfasdf',
                gander:'男'
            }
        }
    })
</script>

```

### 第4种，迭代数组

```html
<div id="app">
    <!-- in后买你我们放过 普通数组、对象数组、还可以放数字 -->
    <!-- 注意：如果使用 v-for 迭代数组的话，前面的count值从1开始 -->
    <p v-for="count in 10" > 这是第{{count}}次循环 </p>
</div>
<script>
    var vm = new Vue({
        el:"#app",
        data:{

        }
    })
</script>

```

## 八、v-for中key的使用注意事项

​	为了给Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一key属性。

​	**注意**：v-for 循环的时候，key 属性只能使用 number获取string

​	**注意**：key 在使用的时候，必须使用v-bind属性绑定的形式，指定key的值

```html
 <div id="app">
     id<input type="text" v-model="id" />
     名字<input type="text" v-model="name" />
     <input type="button" @click="add" value="增加" />
     
     <!-- 注意：v-for 循环的时候，key 属性只能使用 number获取string -->
     <!-- 注意：key 在使用的时候，必须使用v-bind属性绑定的形式，指定key的值 -->
     <p v-for="item in list" :key="item.id">
         <input type="checkbox" />{{item.id}}======={{item.name}}
     </p>
</div>
<script>
    var vm = new Vue({
        el:"#app",
        data:{
            id:'',
            name:'',
            list:[
                {id:1,name:"李斯"},
                {id:2,name:"嬴政"},
                {id:3,name:"赵高"},
                {id:4,name:"韩非"}
            ]
        },
        methods:{
            add(){
                this.list.unshift({id:this.id,name:this.name})
            }
        }
    })
</script>

```

## 九、v-if和v-show的使用

- 特点

  v-if 的特点：每次都会重新删除或创建元素

  v-show 的特点：每次不会重新进行dom的删除和创建操作，知识切换了元素的display：none样式

- 性能消耗

  v-if 有较高的切换性能消耗

  v-show 有较高的初始渲染消耗

如果元素涉及到频繁的切换，最好不要使用v-if，而是推荐使用v-show

如果元素可能永远不会被显示出来被用户看到，则推荐使用v-if

```html
<div id="app">
    <input type="button" value="toggle" @click="flag=!flag">

    <h3 v-if="flag" >这是一个v-if控制的元素</h3>
    <h3 v-show="flag" >这是一个v-show控制的元素</h3>
</div>
<script>
    var vm = new Vue({
        el:"#app",
        data:{
            flag:true,
        },
        methods:{

        }
    })
</script>

```

## 十、forEach、some、filter、findIndex

1.forEach

```javascript
var newList = [];
this.list.forEach(item=>{
    if(item.name.indexOf(keywords) != -1){
    	newList.push(item);
    }
})
return newList;

```

2.some

```javascript
this.list.some((item,i)=>{
    if(item.id==id){
        this.list.splice(i,1);
        //在数组的some方法中，如果return true ，就会立即终止这个数组的后续循环
        return true;
    }
})

```

3.filter

```javascript
 return this.list.filter(item=>{
     //注意：es6中，为字符串提供了一个新方法，叫做 String.prototype.includes('要包含的字符串')
     // 如果包含，则返回true 否则返回false
     //contain
     if(item.name.includes(keywords)){
         return item;
     }
 })

```

4.findIndex

```javascript
var index = this.list.findIndex(item=>{
    if(item.id==id){
        return true;
    }
})
console.log(index)
this.list.splice(index,1);

```

 注意：forEach some filter findIndex 这些都属于数组的新方法,

 都会对数组中的每一项，进行遍历，执行相关的操作；

## 十一、过滤器

### 1.全局过滤器的定义语法

Vue.filter('过滤器的名称',function(){})

过滤器中的function，第一个参数，以及被规定死了，永远都是 过滤器 管道符前面 传递过来的数据

```html
<div id="app">
    <p>{{msg | magFormat('单纯') | test}}</p>
</div>
<script>
    //定义一个 vue全局过滤器，名字叫做 msgFormat
    Vue.filter('magFormat',function(msg,arg,arg2){
        //字符串的 replace方法，第一个参数，除了可写一个 字符串之外，还可以定义一个正则
        return msg.replace(/疯狂/g,arg+(arg2?arg2:''))
    })

    Vue.filter('test',function(msg,arg){
        return msg + '========'
    })
    var vm = new Vue({
        el:'#app',
        data:{
            msg:"疯狂的外星人，变成了疯狂的人类，进行疯狂的行动！"
        },
        methods:{

        }
    })
</script>

```

### 2.定义私有过滤器

定义私有过滤器 过滤器有两个条件【过滤器名称 和 处理函数】

过滤器调用的时候，采用的就是就近原则，如果私有过滤器和全局过滤器的名称一致时，这时候 优先调用私有过滤器

```html
<script>
    var vm = new Vue({
        el:"#app",
        data:{
            flag:true,
        },
        methods:{

        }
        filters:{
            //定义私有过滤器 过滤器有两个条件【过滤器名称 和 处理函数】
            //过滤器调用的时候，采用的就是就近原则，如果私有过滤器和全局过滤器的名称一致时，这时候 优先调用私有过滤器
            dateFormat:function(dateStr,pattern=''){
            //根据给定的时间字符串，得到特定的时间
            var dt = new Date(dateStr);
            // yyyy-mm-dd
            var y = dt.getFullYear();
            var m = dt.getMonth()+1;
            var d = dt.getDate();

            if(pattern.toLowerCase() === 'yyyy-mm-dd'){
                return `${y}-${m}-${d}`;
            }else{
                var hh = dt.getHours();
                var mm = dt.getMinutes();
                var ss = dt.getSeconds();

                return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
            }
        }
        },
    })
</script>

```

## 十二、padStart、padEnd

使用es6中的字符串新方法 String.prototype.padStart(maxLength,fillString='')或String.prototype.padEnd(maxLength,fillString='')

例如：时间的转换

```javascript
var y = dt.getFullYear();
var m = (dt.getMonth()+1).toString().padStart(2,'0');
var d = dt.getDate().toString().padStart(2,'0');

var hh = dt.getHours().toString().padStart(2,'0');
var mm = dt.getMinutes().toString().padStart(2,'0');
var ss = dt.getSeconds().toString().padStart(2,'0');

```

## 十三、自定义按键修饰符

全部按键的别名

- .enter
- .tab
- .delete
- .esc
- .space
- .up
- .down
- .left
- .right

```html
<input  @keyup.enter="add" />

```

可以通过config.keyCodes 对象 自定义全局按键修饰符

```javascript
Vue.config.keyCodes.f2 = 113;

```

使用f2按键

```html
 <input type="text" class="form-control" v-model="name" @keyup.f2="add" />

```

## 十四、定义全局的指令 v-focus

- bind
  - 每当指令绑定到元素上的时候，会立即执行这个bind函数，只执行一次
- inserted
  - inserted 表示元素 插入到dom中的时候，会执行inserted函数【触发1次】
- updated
  - 当vnode更新的时候，会执行updated，可能会触发多次

```javascript
//使用 vue.directive() 定义全局的指令 v-focus
//其中：参数1：指令的名称，注意，在定义的时候，指令的名称前面，不需要加v-前缀
//但是：在调用的时候，必须 在指令名称前面 加上v-前缀来进行调用
// 参数2：是一个对象，这个对象身上，有一些指令相关的函数，这些函数可以在特定的阶段，执行相关操作
Vue.directive('focus',{
    bind:function(el){
        //每当指令绑定到元素上的时候，会立即执行这个bind函数，只执行一次
        //注意：在每个函数中，第一个参数，永远时el，表示被绑定了指令的那个元素，这个el参数，是一个原生的js对象
        //在元素 刚绑定了指令的时候，还没有 插入到dom中去，这时候，调用 focus方法没有作用
        //因为，一个元素，只有插入dom之后，才能获取焦点
        el.focus();
    },
    inserted:function(el){
        //inserted 表示元素 插入到dom中的时候，会执行inserted函数【触发1次】
        el.focus();
    },
    updated:function(){
        //当vnode更新的时候，会执行updated，可能会触发多次
    }
})

```

```javascript
//自定义一个，设置字体颜色的指令
Vue.directive('color',{
    //样式，只要通过指令绑定给了元素，不管这个元素有没有被插入到页面中去，这个元素肯定有了一个内联的样式
    //将来元素肯定会显示到页面中，这时候，浏览器的渲染引擎必然会解析样式，应用给这个元素
    bind:function(el,binding){
        // el.style.color = 'red';
        //和样式相关操作，一般都可以在bind执行
        el.style.color = binding.value;
    }
})

```

自定义私有指令

```javascript
<script>
    var vm = new Vue({
        el:"#app",
        data:{
            flag:true,
        },
        methods:{

        }
        filters:{
          
        },
        directives:{
             //自定义私有指令
            'fontweight':{
                bind:function(el,binding){
                  el.style.fontWeight = binding.value; 
               }
            }
      	},
    })
</script>

```

## 十五、vue生命周期

### 1 beforeCreate

第一个生命周期函数，表示实例完全被创建出来之前，会执行它

注意：在beforeCreate 生命周期函数执行的时候，data 和 methods 中的 数据都还没有初始化

### 2 created

在created 中，data 和 methods 都已经初始化好了！

如果要调用methods 中的方法，或者操作data中的数据，最早，只能在created中操作

### 3 beforeMount

第三个生命周期函数，表示 模板已经存在内存中编辑完成了，但是尚未把模板渲染到 页面中

在beforeMount 执行的时候，页面中的元素，还没有被真正替换过来，只是之前写的一些模板字符串

### 4 mounted

第四个生命周期函数，表示，内存中的模板已经真是的挂载到了页面中，用户已经可以看到渲染好的页面了

注意：mounted 是 实例创建期间的最后一个生命周期函数，当执行完mounted就表示，实例已经被创建好了，此时，如果没有其他操作的话，这个实例，就静静的 躺在我们的内存中，一动不动

### 5 beforeUpdate

这时候，表示 我们的界面还没有被更新

得出结论：当执行beforeUpdate的时候，页面中的显示数据还是旧的，此时data数据是最新的，页面尚未和最新的数据保持同步

### 6 updated

updated 事件执行的时候，页面和data数据已经保持同步了，都是最新的

## 十六、vue-resource发起get、post、jsonp请求

### 1.get

```javascript
 getInfo(){
     //发起get请求
     this.$http.get('http://vue.studyit.io/api/getlunbo').then(function(result){
         console.log(result)
     })
 },

```

### 2.post

```javascript
 postInfo(){
     //手动发起的post请求，默认没有表单格式，所以，有的服务器处理不了
     //通过post第三方的第三参数，{emulateJSON：true} 设置 提交的内容类型为普通表单数据格式
     this.$http.post('http://vue.studyit.io/api/post',{},{emulateJSON:true}).then(result=>{
         console.log(result)
     })
 }

```

### 3.jsonp

```javascript
jsonpInfo(){
    this.$http.jsonp('http://vue.studyit.io/api/jsonp').then(result=>{
        console.log(result.body)
    })
}

```

## 十七、动画

### 1.过渡的类名

1. `v-enter`：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`: **2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`: **2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

![Transition Diagram](https://cn.vuejs.org/images/transition.png)

### 2.使用过渡进行动画

```html
<div id="app" >
    <input type="button" value="toggle" @click="flag = !flag" />
    <transition>
        <h3 v-if="flag" >这是一个h3</h3>
    </transition>
</div>

```

```css
 /*v-enter 【这是一个时间点】 是进入之前，元素的其实状态，此时还没开始进入
v-leave-to 【这是一个时间点】 是动画离开之后，离开的终止状态， 此时，元素 动画已经结束 
*/
.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translateX(150px)
}

/* v-enter-active 【入场动画的时间段】 */
/* v-leave-active 【离场动画的时间段】 */
.v-enter-active,
.v-leave-active {
    transition: all 0.4s ease;
}

```

### 3.修改v-前缀

如果你使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`。

```html
 <div id="app">
     <input type="button" value="toggle" @click="flag = !flag" />
     <transition>
         <h3 v-if="flag">这是一个h3</h3>
     </transition>
     <input type="button" value="toggle2" @click="flag2 = !flag2" />
     <transition name="my">
         <h6 v-if="flag2">这是一个h6</h6>
     </transition>

</div>

```

```css
/*v-enter 【这是一个时间点】 是进入之前，元素的其实状态，此时还没开始进入
v-leave-to 【这是一个时间点】 是动画离开之后，离开的终止状态， 此时，元素 动画已经结束 
*/
.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translateX(150px)
}

/* v-enter-active 【入场动画的时间段】 */
/* v-leave-active 【离场动画的时间段】 */
.v-enter-active,
.v-leave-active {
    transition: all 0.4s ease;
}

.my-enter,
.my-leave-to {
    opacity: 0;
    transform: translateY(75px)
}
.my-enter-active,
.my-leave-active {
    transition: all 0.4s ease;
}

```

### 4.使用第三方animate.css类库

```html
<link rel="stylesheet" href="./lib/animate.css">
<!-- 入场 bounceIn 离场 bounceOut -->

```

```html
<div id="app">
    <input type="button" value="toggle" @click="flag = !flag" />
    <!-- <transition enter-active-class=" animated bounceIn" leave-active-class="animated bounceOut" >
<h3 v-if="flag">这是一个h3</h3>
</transition> -->
    <!-- 使用 ：duration = "{ enter: 200, leave: 400 }" 来分别设置 入场的时长 和 商场的时长-->
    <transition 
                enter-active-class="bounceIn" 
                leave-active-class="bounceOut"
                :duration = "{ enter: 200, leave: 400 }">
        <h3 v-if="flag" class="animated">这是一个h3</h3>
    </transition>
</div>

```

### 5.钩子函数模拟小球半场动画

可以在属性中声明 JavaScript 钩子

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>

```

```javascript
// ...
methods: {
  // --------
  // 进入中
  // --------

  beforeEnter: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },

  // --------
  // 离开时
  // --------

  beforeLeave: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}

```

当只用 JavaScript 过渡的时候，**在 enter 和 leave 中必须使用 done 进行回调**。否则，它们将被同步调用，过渡会立即完成。

实例

```html
 <div id="app">
        <input type="button" value="快到碗里来" @click="flag = !flag" />
        <transition
            @before-enter = "beforeEnter"
            @enter = "enter"
            @after-enter = "afterEnter">
            <div class="ball" v-show="flag">

            </div>
        </transition>
    </div>

```

```javascript
 var vm = new Vue({
     el:"#app",
     data:{
         flag : false
     },
     methods:{
         //注意：动画钩子函数的第一个参数：el，表示 要执行动画的那个dom元素，是个原生的js dom对象
         //大家可以认为 ， el 是通过 document.getElementById('') 方式获取到的元素js dom对象
         beforeEnter(el){
             //beforeEnter 表示动画入场之前，此时，动画尚未开始，可以 在beforeEnter 中，设置元素开始动画之前的其实样式
             //设置小球开始动画之前的起始位置
             el.style.transform = "translate(0,0)"
         },
         enter(el,done){
             //这句话，没有实际的作用，但是如果不屑=写，出不来动画效果
             //可以认为 el.offserHight 会强制动画刷新
             el.offsetWidth
             //enter 表示动画 开始之后的样式，这里，可以设置小球完成动画之后的，结束状态
             el.style.transform = "translate(150px,450px)"
             el.style.transition = "all 1s ease"
             //这里的done， 起始就是afterEnter这个2函数，也就是说Ldone 是 afterEnter 函数的引用
             done()
         },
         afterEnter(el){
             //动画完成之后，会调用 alterEnter
             this.flag = false
         }

     }
 })

```

### 6.动画列表动画

- 在实现列表过度的时候，如果需要过度的元素，是通过 v-for 循环渲染出来的，不能使用transition 包裹，需要使用 transitionGroup
- 如果要为 v-for 循环创建的元素设置动画，必须为每一个元素设置 ：key 属性
- 给 transition-group 添加 appear 属性，实现页面刚展示出来的时候，入场时候的效果
- 通过 为 transition-group 元素，设置 tag 属性，指定 transition-group 渲染为指定的元素，如果不指定tag属性，默认 渲染为span标签

```html
<div id="app">
    <label>id</label>
    <input type="text" v-model="id" />
    <label>姓名</label>
    <input type="text" v-model="name" />
    <input type="button" value="添加" @click="add" />

    <ul>
        <!-- 在实现列表过度的时候，如果需要过度的元素，是通过 v-for 循环渲染出来的，不能使用transition 包裹，需要使用 transitionGroup -->
        <!-- 如果要为 v-for 循环创建的元素设置动画，必须为每一个元素设置 ：key 属性 -->
        <!-- 给 transition-group 添加 appear 属性，实现页面刚展示出来的时候，入场时候的效果 -->
        <!-- 通过 为 transition-group 元素，设置 tag 属性，指定 transition-group 渲染为指定的元素，如果不指定tag属性，默认 渲染为span标签 -->
        <transition-group appear tag="ul">
            <li class="lis" v-for="(item,i) in list" :key="item.id" @click="del(i)">
                {{item.id}}-----{{item.name}}
            </li>
        </transition-group>

    </ul>

</div>

```

```css
.lis {
    border: 1px dashed #999;
    margin: 5px;
    line-height: 35px;
    padding-left: 5px;
    font-size: 12px;
    width: 100%;
}
li:hover{
    background-color: red;
    transition: all 0.6s ease;
}

.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translateY(80px)
}

.v-enter-active,
.v-leave-active {
    transition: all 0.6s ease;
}
/* 下面的 v.move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐的漂上来的效果 */
.v-move{
    transition:all 0.6s ease;
}
.v-leave-active{
    position: absolute;
}

```

v.move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐的漂上来的效果

```javascript
var vm = new Vue({
    el: '#app',
    data: {
        id: '',
        name: '',
        list: [
            { id: 1, name: '赵高' },
            { id: 2, name: '李四' },
            { id: 3, name: '王五' },
            { id: 4, name: '小王' }
        ]
    },
    methods: {
        add() {
            this.list.push({ id: this.id, name: this.name })
            this.id = this.name = '';
        },

        del(i){
            this.list.splice(i,1);

        }
    }
})

```



## 十八、组件

### 1.组件化和模块化的区别

- 模块化：是从代码逻辑的角度进行划分的；方便代码分层开发，保证每个功能模块的职能单一；
- 组件化：是从UI姐买你的角度进行划分的；前端的组件化，方便UI组件的重用；

## 十九、webpack

### 安装

+ ```bash
  npm install webpack -D / npm install webpack -g
  ```

+ ```bash
  npm install webpack-cli -D / npm install webpack-cli -g
  ```

### 创建配置文件package.json

+ ``` bash
  npm init -y
  ```

### webpack.config.js文件配置

``` javascript
const path = require('path')

//这个配置文件，其实就是一个js文件 ，通过node中的手动指定 入口和出口

module.exports = {
    //在配置文件中，需要手动指定 入口 和 出口
    entry: path.join(__dirname, './src/main.js'),
    output: {
        //输出文件相关配置
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }
}
```

### 使用webpack-dev-server 这个工具，来实现自动打包编译的功能

#### 安装

+ ```bash
  npm i webpack-dev-server -D
  ```

#### 配置

```json
{
  "name": "webpack1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "jquery": "^3.4.1"
  },
  "devDependencies": {
    "webpack": "^4.39.1",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.8.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

#### 运行

```bash
npm run dev
```

1. 运行 npm i webpack-dev-server -D 把这个工具安装到项目的本地开发环境
2. 安装完毕后，这个 工具的用法， 和 webpack 命令的用法 完全一样
3. 由于，我们是在项目中，本地安装的 webpack-dev-server, 所以，无法把他当做 脚本命令，在powershell 中断中直接运行；(只有那些 安装到 全局 -g 的工具，才能 在中断中正常运行)
4. 注意： webpack-dev-server 这个工具，如果想要正常运行，要求，在本地项目中，必须安装webpack；
5. webpack-dev-server 帮我们打包生成的bundle.js 文件，并没有存放到实际的 物理磁盘上；儿时，直接托管到了 电脑的内存中，所以我们在项目根目录中，根本找不到 这个打包好的bundle.js;
6. 我们可以认为，webpack-dev-server 吧打包好的 文件，以一种虚拟的形式，托管到了 咱们项目的 根目录中 ，虽然我们看不到它，但是，可以认为，和dist src node_modules 平级，有一个看不见的文件，叫做 bundle.js

### 配置自动打开浏览器、启用热更新、指定托管根目录

+ 第一种方式

  在package.json配置文件上添加

  webpack-dev-server --open --port 3000 --contentBase src --hot

  ```bash
  {
    "name": "webpack1",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "dependencies": {
      "jquery": "^3.4.1"
    },
    "devDependencies": {
      "webpack": "^4.39.1",
      "webpack-cli": "^3.3.6",
      "webpack-dev-server": "^3.8.0"
    },
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
  
  ```



+ 第二种方式

  在webpack.config.js配置文件上添加

  ```json
  const path = require('path')
  const webpack = require('webpack')
  
  //这个配置文件，其实就是一个js文件 ，通过node中的手动指定 入口和出口
  
  module.exports = {
      //在配置文件中，需要手动指定 入口 和 出口
      entry: path.join(__dirname, './src/main.js'),
      output: {
          //输出文件相关配置
          path: path.join(__dirname, './dist'),
          filename: 'bundle.js'
      },
      devServer: {//这是配置 dev-server 命令参数的第二种形式，相对来说
          // --open --port 3000 --contentBase src --hot
          open:true,//自动打开浏览器
          port:3000,//设置启动时候的运行端口
          contentBase: 'src', //指定托管的根目录
          hot: true //启用热更新 的 第一步
      },
      plugins: [ //配置插件的节点
          new webpack.HotModuleReplacementPlugin() //new 一个热更新的 模块对象， 这是 启用热更新
      ]
  }
  ```

  

### html-webpack-plugin

#### 安装

```bash
npm install html-webpack-plugin -D
```

#### 使用

````javascript
const path = require('path')

//导入内存中生成 HTML 页面的 插件
// 只要是插件，都一定要 放到 plugins 节点中去
// 这个插件的两个作用：
// 1. 自动在内存中根据指定页面生成一个内存的页面
// 2. 自动，把打包好的bundle.js 追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')

//这个配置文件，其实就是一个js文件 ，通过node中的手动指定 入口和出口
module.exports = {
    //在配置文件中，需要手动指定 入口 和 出口
    entry: path.join(__dirname, './src/main.js'),
    output: {
        //输出文件相关配置
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [ //配置插件的节点
        new htmlWebpackPlugin({//创建一个 在内存中 生成HTML 页面的插件
            //指定 模板页面，将来会根据指定的页面路径。去生成内存中的页面
            template: path.join(__dirname,'./src/index.html'),
            filename: 'index.html'//指定生成的页面的名称
        })
    ]
}



````

### 第三方loader

#### 安装

css

```bash
npm install style-loader css-loader -D
```

less

```bash
npm install less-loader less -D
```

scss

``` bash
npm install sass-loader node-sass -D
```

#### 使用

main.js文件

```javascript
// npm i style-loader css-loader -D
// 使用 import 语法，导入 css 样式表
import './css/index.css'
import './css/index.less'
import './css/index.scss'
// 注意： webpack，默认只能打包处理 js 类型文件，无法处理 其他的非js类型的文件
// 如果要处理 非js类型的文件，我们需要手动安装一些 合适 第三方 loader 加载器
// 1. 如果想要打包处理css 文件，需要安装 npm i style-loader css-loader -D
// 2. 打开 webpack.config.js 这个配置文件，在里面，新增一个 配置节点，叫做 module，它是一个对象，
//在这个 module 对象身上，有个 rules 属性，这个 rules 属性是个数组；这个数组中，存放了，所有第三方文件和匹配规则；

```

webpack.config.js文件

```javascript
const path = require('path')

//这个配置文件，其实就是一个js文件 ，通过node中的手动指定 入口和出口
module.exports = {
    //在配置文件中，需要手动指定 入口 和 出口
    entry: path.join(__dirname, './src/main.js'),
    output: {
        //输出文件相关配置
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module:{ // 这个节点，用于配置 所有 第三方模块 加载器
        rules: [ // 所有第三方模块的 匹配规则
            { test: /\.css$/, use:['style-loader','css-loader'] }, //配置处理 .css 文件的第三方loader 规则
            { test: /\.less$/, use:['style-loader','css-loader','less-loader'] }, //配置处理 .less 文件的第三方loader 规则
            { test: /\.scss$/, use:['style-loader','css-loader','sass-loader'] }, //配置处理 .scss 文件的第三方loader 规则
        ]
    }
}



```

#### url-loader的使用

#### 安装

```bash
npm install url-loader file-loader -D
```

#### 使用

处理图片

注意：limit 给点=定的值，是图片的大小，单位是 byte，如果我们引用的图片，大于或等于给定的limit值，则不会被转为base64格式的字符串，如果 图片小于给定的limit值，则会被转为base64的字符串

```javascript
{ test: /\.(jpg|jpeg|png|gif|bmp)$/,use:'url-loader?limit=127648&name=[hash:8]-[name].[ext]' },//处理图片路径的loader
```

处理字体

```javascript
{ test: /\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader' }//处理字体文件的loader
```



### webpack4中babel的配置

#### 安装

```bash
npm install -D babel-loader @babel/core @babel/preset-env
```

```bash
npm install -D @babel/plugin-transform-runtime
```

```bash
npm install @babel/runtime
```

```bash
npm install @babel/plugin-proposal-class-properties -D
```

#### 使用

webpack.config.js文件

```javascript
rules:[
    {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties']
            }
        }
    }
]
```

main.js文件

```javascript
class Person{
    static info = {
        name:'小王',
        age:15
    }
}

console.log(Person.info)
```



### 在webpack导入vue

#### 安装

```bash
npm install vue -D
```

#### 使用

main.js文件

使用1

```javascript
import Vue from '../node_modules/vue/dist/vue.js'

var vm = new Vue({
    el:'#app',
    data:{
        msg:'123'
    }
})
```

使用2

```javascript
//注意： 在webpack 中，使用 import Vue from 'vue' 导入的Vue 构造函数，功能不完整，
//只提供 runtime-only 的方式，并没有提高 像网页中那样的使用方式
import Vue from 'vue'


var vm = new Vue({
    el:'#app',
    data:{
        msg:'123'
    }
})
```

webpack.config.js文件

```javascript
resolve:{
    alias:{
        'vue$': 'vue/dist/vue.js'
    }
}
```

### webpack在vue结合render函数渲染指定的组件

#### 安装

```bash
npm install vue-loader vue-template-compiler -D
```

#### 使用

login.vue文件

```vue
<template>
    <div>
        <h1>这是登录组件，使用 .vue 文件定义出来的</h1>
    </div>
</template>


<script>

</script>

<style>

</style>
```

main.js文件

```javascript
import Vue from '../node_modules/vue/dist/vue.js'

import login from './login.vue'
//默认，webpack 无法打包 .vue 文件，需要安装 相关的loader;
// npm install vue-loader vue-template-compiler -D
// 在配置文件中，新增loader的配置项 { test:/\.vue$/,use:'vue-loader' }


var vm = new Vue({
    el:'#app',
    data:{
        msg:'123'
    },
    render:c=>c(login)
})
```

webpack.config.js

```javascript
const path = require('path')

//vue-loader在15.#之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dish'),
        filename:'bundle.js'
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            { test:/\.vue$/,use:'vue-loader' },//处理 .vue 文件的loader
        ]
    },
}
```

### export default 和 export 的使用方式

test.js文件

```javascript
export default {
    name:'zs',
    age:'20'
}

//注意：export default 向外暴露的成员，可以使用任意的变量来接收
//注意：在一个模块中，export default 只允许向外暴露1次
//注意：在一个模块中，可以同时使用 export default 和 export 向外暴露成员



export var title = '小星星'

export var content = '哈哈哈'

//注意：使用 export 向外暴露成员，只能使用 {} 的形式来接收，这种形式，叫做 【按需导出】
//注意：export 可以向外暴露多个成员，同时，如果某些成员，我们在import 的时候，不需要，则可以不再 {} 中定义
//注意：使用 export 导出的成员，必须严格按照 导出时候的名称，来使用 {} 按需接收
//注意：使用 export 导出的成员，如果 就想 换个 名称来接收，可以使用 as 来起别名
```

main.js

```javascript

import test, {title as titlesss , content } from './test.js'

console.log(test)
console.log(titlesss)
console.log(content)

```



### 结合webpack使用vue-router

#### 安装

```bash
npm install vue-router -D
```

#### 使用

main.js文件

```javascript

import Vue from 'vue'


import App from './App.vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import account from './main/Account.vue'
import goodlist from './main/GoodList.vue'

var router = new VueRouter({
    routes:[
        { path:'/account',component: account },
        { path:'/goodlist',component: goodlist },
    ]
})

var vm = new Vue({
    el:'#app',
    data:{},
    methods:{},
    render:c=>c(App),
    router
})

//注意：app 这个组件 是通过 vm 实例 的render函数，渲染出来的 ，render 函数如果要渲染 组件，渲染出来的组件，只能放到el:'#app' 所指定的 元素中；
//Account 和 GoodList 组件，是通过 路由匹配监听到的，所以，这两个组件，只能展示到属于 路由的  <router-view></router-view>
```

App.vue文件

```vue
<template>
    <div>
        <h1>这是app组件</h1>

        <router-link to="/account" >account</router-link>
        <router-link to="/goodlist" >goodlist</router-link>

        <router-view></router-view>

    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    methods:{}
}
</script>

<style>

</style>
```

