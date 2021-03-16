export default [
  {
    id: "1",
    isQuestion: true,
    title: "为什么Vue组件中data必须是一个函数？",
    description: `对象为引用类型，当复用组件时，由于数据对象都指向同一个data对象，当在一个组件中修改data时，其他重用的组件中的data会同时被修改；而使用返回对象的函数，由于每次返回的都是一个新对象（Object的实例），引用地址不同，则不会出现这个问题。
`,
  },
  {
    id: "2",
    isQuestion: true,
    title: "Vue中v-if和v-show有什么区别？",
    description: `1. v-if在条件切换时，会对标签进行适当的创建和销毁，而v-show则仅在初始化时加载一次，因此v-if的开销相对来说会比v-show大。
2. v-if是惰性的，只有当条件为真时才会真正渲染标签；如果初始条件不为真，则v-if不会去渲染标签。v-show则无论初始条件是否成立，都会渲染标签，它仅仅做的只是简单的CSS切换。`,
  },
  {
    id: "3",
    isQuestion: true,
    title: "请详细说下你对Vue生命周期的理解？",
    description: `总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后。
- 创建前/后： 在beforeCreate阶段，vue实例的挂载元素el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了，el为undefined，还未初始化。
- 载入前/后：在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。
- 更新前/后：当data变化时，会触发beforeUpdate和updated方法
- 销毁前/后：在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在
`,
  },
  {
    id: "4",
    isQuestion: true,
    title: "Vue里computed和watch的区别",
    description: `### 计算属性computed：
- 支持缓存，只有依赖数据发生改变，才会重新进行计算
- 不支持异步，当computed内有异步操作时无效，无法监听数据的变化
- computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值
- 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed
- 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。

### 侦听属性watch：
- 不支持缓存，数据变，直接会触发相应的操作；
- watch支持异步；
- 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
- 当一个属性发生变化时，需要执行对应的操作；一对多；
- 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数：

> immediate：组件加载立即触发回调函数执行

> deep: deep的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改obj里面任何一个属性都会触发这个监听器里的 handler
`,
  },
  {
    id: "5",
    isQuestion: true,
    title: "vue-loader是什么？使用它的用途有哪些？",
    description: `vue文件的一个加载器，跟template/js/style转换成js模块。`,
  },
  {
    id: "6",
    isQuestion: true,
    title: "$nextTick是什么？",
    description: `vue实现响应式并不是数据发生变化后dom立即变化，而是按照一定的策略来进行dom更新。

nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用nextTick，则可以在回调中获取更新后的 DOM
`,
  },
  {
    id: "7",
    isQuestion: true,
    title: "v-for key的作用",
    description: `当Vue用 v-for 正在更新已渲染过的元素列表是，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue将不是移动DOM元素来匹配数据项的改变，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。
为了给Vue一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。key属性的类型只能为 string或者number类型。
key 的特殊属性主要用在Vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes。如果不使用 key，Vue会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用key，它会基于key的变化重新排列元素顺序，并且会移除 key 不存在的元素。`,
  },
  {
    id: "8",
    isQuestion: true,
    title: "Vue的双向数据绑定原理是什么？",
    description: `vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：
    
1. 需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化

2. compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

3. Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
①在自身实例化时往属性订阅器(dep)里面添加自己
②自身必须有一个update()方法
③待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。

4. MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。`,
  },
  {
    id: "9",
    isQuestion: true,
    title: "Vue组件传值有哪几种方式？",
    description: `### 父传子
通过props传递
\`\`\`javascript
父组件： <child value='传递的数据' />
子组件: props['value']，接收数据，接受之后使用和data中定义数据使用方式一样
\`\`\`

### 子传父
在父组件中给子组件绑定一个自定义的事件，子组件通过$emit()触发该事件并传值。


### 兄弟组件传值
- 通过中央通信 let bus = new Vue()
\`\`\`javascript
A：methods :{ 函数{bus.$emit(‘自定义事件名’，数据)} 发送
B：created （）{ bus.$on(‘A发送过来的自定义事件名’，函数) } 进行数据接收
\`\`\`

- 通过vuex
`,
  },
  {
    id: "10",
    isQuestion: true,
    title: "Vue的template编译过程？",
    description: `简而言之，就是先转化成AST树，再得到的render函数返回VNode（Vue的虚拟DOM节点），详细步骤如下：

首先，通过compile编译器把template编译成AST语法树（abstract syntax tree 即 源代码的抽象语法结构的树状表现形式），compile是createCompiler的返回值，createCompiler是用以创建编译器的。另外compile还负责合并option。

然后，AST会经过generate（将AST语法树转化成render funtion字符串的过程）得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，里面有（标签名、子节点、文本等等）
`,
  },
  {
    id: "11",
    isQuestion: true,
    title: "Vue如何监听对象或者数组某个属性的变化",
    description: `当在项目中直接设置数组的某一项的值，或者直接设置对象的某个属性值，这个时候，你会发现页面并没有更新。这是因为Object.defineProperty()限制，监听不到变化。

解决方式：
\`\`\`javascript
this.$set(你要改变的数组/对象，你要改变的位置/key，你要改成什么value)
this.$set(this.arr, 0, "OBKoro1"); // 改变数组
this.$set(this.obj, "c", "OBKoro1"); // 改变对象
\`\`\`


调用以下几个数组的方法
\`\`\`javascript
splice()、 push()、pop()、shift()、unshift()、sort()、reverse()
\`\`\`

vue源码里缓存了array的原型链，然后重写了这几个方法，触发这几个方法的时候会observer数据，意思是使用这些方法不用我们再进行额外的操作，视图自动进行更新。 推荐使用splice方法会比较好自定义,因为splice可以在数组的任何位置进行删除/添加操作
`,
  },
  {
    id: "12",
    isQuestion: true,
    title: "Vue里常用的事件修饰符",
    description: `- .stop:阻止冒泡
- .prevent:阻止默认行为
- .self:仅绑定元素自身触发
- .once: 2.1.4 新增,只触发一次
- passive: 2.3.0 新增,滚动事件的默认行为 (即滚动行为) 将会立即触发,不能和.prevent 一起使用
- .sync 修饰符`,
  },
  {
    id: "13",
    isQuestion: true,
    title: "Vue如何获取dom",
    description: `先给标签设置一个ref值，再通过this.$refs.domName获取，例如：
\`\`\`javascript
<div ref="test"></div>
const dom = this.$refs.test
\`\`\``,
  },
  {
    id: "14",
    isQuestion: true,
    title: "v-on可以监听多个方法吗？",
    description: `可以
\`\`\`html
<input type="text" v-on="{ input:onInput,focus:onFocus,blur:onBlur }">
\`\`\``,
  },
  {
    id: "15",
    isQuestion: true,
    title: "Vue中的slot插槽是什么？",
    description: `很多时候，我们封装了一个子组件之后，在父组件使用的时候，想添加一些dom元素，这个时候就可以使用slot插槽了，但是这些dom是否显示以及在哪里显示，则是看子组件中slot组件的位置了。`,
  },
  {
    id: "16",
    isQuestion: true,
    title: "vuex是什么",
    description: `Vuex 是一个专为 Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。`,
  },
  {
    id: "17",
    isQuestion: true,
    title: "vuex的严格模式是什么,有什么作用,怎么开启？",
    description: `在严格模式下，无论何时发生了状态变更且不是由mutation函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。在Vuex.Store 构造器选项中开启,如下
\`\`\`javascript
const store = new Vuex.Store({
    strict:true,
})
\`\`\``,
  },
];
