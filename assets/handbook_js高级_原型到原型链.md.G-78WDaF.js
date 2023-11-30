import{_ as s,o as n,c as a,R as p}from"./chunks/framework.4sGULByW.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"handbook/js高级/原型到原型链.md","filePath":"handbook/js高级/原型到原型链.md"}'),e={name:"handbook/js高级/原型到原型链.md"},o=p(`<h2 id="构造函数创建对象" tabindex="-1">构造函数创建对象 <a class="header-anchor" href="#构造函数创建对象" aria-label="Permalink to &quot;构造函数创建对象&quot;">​</a></h2><p>我们先使用构造函数创建一个对象：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function Person() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var person = new Person();</span></span>
<span class="line"><span>person.name = &#39;Kevin&#39;;</span></span>
<span class="line"><span>console.log(person.name) // Kevin</span></span></code></pre></div><p>在这个例子中，Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person。</p><p>很简单吧，接下来进入正题：</p><h2 id="prototype" tabindex="-1">prototype <a class="header-anchor" href="#prototype" aria-label="Permalink to &quot;prototype&quot;">​</a></h2><p>每个函数都有一个 prototype 属性，就是我们经常在各种例子中看到的那个 prototype ，比如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function Person() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 虽然写在注释里，但是你要注意：</span></span>
<span class="line"><span>// prototype是函数才会有的属性</span></span>
<span class="line"><span>Person.prototype.name = &#39;Kevin&#39;;</span></span>
<span class="line"><span>var person1 = new Person();</span></span>
<span class="line"><span>var person2 = new Person();</span></span>
<span class="line"><span>console.log(person1.name) // Kevin</span></span>
<span class="line"><span>console.log(person2.name) // Kevin</span></span></code></pre></div><p>那这个函数的 prototype 属性到底指向的是什么呢？是这个函数的原型吗？</p><p>其实，函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的<strong>实例</strong>的原型，也就是这个例子中的 person1 和 person2 的原型。</p><p>那什么是原型呢？你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型&quot;继承&quot;属性。</p><p>让我们用一张图表示构造函数和实例原型之间的关系：</p><p><img src="https://camo.githubusercontent.com/02789d6806b75d34b2017021f58efa3aa7a2ee6be8a0c05fb3293438884b9ec0/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065312e706e67" alt="构造函数和实例原型的关系图"></p><p>在这张图中我们用 Object.prototype 表示实例原型。</p><p>那么我们该怎么表示实例与实例原型，也就是 person 和 Person.prototype 之间的关系呢，这时候我们就要讲到第二个属性：</p><h2 id="proto" tabindex="-1"><strong>proto</strong> <a class="header-anchor" href="#proto" aria-label="Permalink to &quot;**proto**&quot;">​</a></h2><p>这是每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。</p><p>为了证明这一点,我们可以在火狐或者谷歌中输入：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function Person() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var person = new Person();</span></span>
<span class="line"><span>console.log(person.__proto__ === Person.prototype); // true</span></span></code></pre></div><p>于是我们更新下关系图：</p><p><img src="https://camo.githubusercontent.com/3dde335faa15d03ffe3b907f6e5c2b5f4d2183caa4c47ac7486794bc407f663c/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065322e706e67" alt="实例与实例原型的关系图"></p><p>既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？</p><h2 id="constructor" tabindex="-1">constructor <a class="header-anchor" href="#constructor" aria-label="Permalink to &quot;constructor&quot;">​</a></h2><p>指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：constructor，每个原型都有一个 constructor 属性指向关联的构造函数。</p><p>为了验证这一点，我们可以尝试：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function Person() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>console.log(Person === Person.prototype.constructor); // true</span></span></code></pre></div><p>所以再更新下关系图：</p><p><img src="https://camo.githubusercontent.com/0aaf005afda83d4e2fdd2bbe523df228b567a091317a2154181771b2706ea2ef/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065332e706e67" alt="111"></p><p>综上我们已经得出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function Person() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var person = new Person();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(person.__proto__ == Person.prototype) // true</span></span>
<span class="line"><span>console.log(Person.prototype.constructor == Person) // true</span></span>
<span class="line"><span>// 顺便学习一个ES5的方法,可以获得对象的原型</span></span>
<span class="line"><span>console.log(Object.getPrototypeOf(person) === Person.prototype) // true</span></span></code></pre></div><p>了解了构造函数、实例原型、和实例之间的关系，接下来我们讲讲实例和原型的关系：</p><h2 id="实例与原型" tabindex="-1">实例与原型 <a class="header-anchor" href="#实例与原型" aria-label="Permalink to &quot;实例与原型&quot;">​</a></h2><p>当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。</p><p>举个例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function Person() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Person.prototype.name = &#39;Kevin&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var person = new Person();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>person.name = &#39;Daisy&#39;;</span></span>
<span class="line"><span>console.log(person.name) // Daisy</span></span>
<span class="line"><span></span></span>
<span class="line"><span>delete person.name;</span></span>
<span class="line"><span>console.log(person.name) // Kevin</span></span></code></pre></div><p>在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 Daisy。</p><p>但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.<strong>proto</strong> ，也就是 Person.prototype中查找，幸运的是我们找到了 name 属性，结果为 Kevin。</p><p>但是万一还没有找到呢？原型的原型又是什么呢？</p><h2 id="原型的原型" tabindex="-1">原型的原型 <a class="header-anchor" href="#原型的原型" aria-label="Permalink to &quot;原型的原型&quot;">​</a></h2><p>在前面，我们已经讲了原型也是一个对象，既然是对象，我们就可以用最原始的方式创建它，那就是：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var obj = new Object();</span></span>
<span class="line"><span>obj.name = &#39;Kevin&#39;</span></span>
<span class="line"><span>console.log(obj.name) // Kevin</span></span></code></pre></div><p>其实原型对象就是通过 Object 构造函数生成的，结合之前所讲，实例的 <strong>proto</strong> 指向构造函数的 prototype ，所以我们再更新下关系图：</p><p><img src="https://camo.githubusercontent.com/ad0ee0e2594c1ac471bbb42321963c130f4fe1ef9ec70389c8ced54544d3fd6c/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065342e706e67" alt="原型的原型关系图"></p><h2 id="原型链" tabindex="-1">原型链 <a class="header-anchor" href="#原型链" aria-label="Permalink to &quot;原型链&quot;">​</a></h2><p>那 Object.prototype 的原型呢？</p><p>null，我们可以打印：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>console.log(Object.prototype.__proto__ === null) // true</span></span></code></pre></div><p>然而 null 究竟代表了什么呢？</p><p>引用阮一峰老师的 <a href="http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html" target="_blank" rel="noreferrer">《undefined与null的区别》</a> 就是：</p><blockquote><p>null 表示“没有对象”，即该处不应该有值。</p></blockquote><p>所以 Object.prototype.<strong>proto</strong> 的值为 null 跟 Object.prototype 没有原型，其实表达了一个意思。</p><p>所以查找属性的时候查到 Object.prototype 就可以停止查找了。</p><p>最后一张关系图也可以更新为：</p><p><img src="https://camo.githubusercontent.com/9a69b0f03116884e80cf566f8542cf014a4dd043fce6ce030d615040461f4e5a/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065352e706e67" alt="原型链示意图"></p><p>顺便还要说一下，图中由相互关联的原型组成的链状结构就是原型链，也就是蓝色的这条线。</p><h2 id="补充" tabindex="-1">补充 <a class="header-anchor" href="#补充" aria-label="Permalink to &quot;补充&quot;">​</a></h2><p>最后，补充三点大家可能不会注意的地方：</p><h3 id="constructor-1" tabindex="-1">constructor <a class="header-anchor" href="#constructor-1" aria-label="Permalink to &quot;constructor&quot;">​</a></h3><p>首先是 constructor 属性，我们看个例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function Person() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>var person = new Person();</span></span>
<span class="line"><span>console.log(person.constructor === Person); // true</span></span></code></pre></div><p>当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>person.constructor === Person.prototype.constructor</span></span></code></pre></div><h3 id="proto-1" tabindex="-1"><strong>proto</strong> <a class="header-anchor" href="#proto-1" aria-label="Permalink to &quot;**proto**&quot;">​</a></h3><p>其次是 <strong>proto</strong> ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 obj.<strong>proto</strong> 时，可以理解成返回了 Object.getPrototypeOf(obj)。</p><h3 id="真的是继承吗" tabindex="-1">真的是继承吗？ <a class="header-anchor" href="#真的是继承吗" aria-label="Permalink to &quot;真的是继承吗？&quot;">​</a></h3><p>最后是关于继承，前面我们讲到“每一个对象都会从原型‘继承’属性”，实际上，继承是一个十分具有迷惑性的说法，引用《你不知道的JavaScript》中的话，就是：</p><p>继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，相反，JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。</p>`,67),t=[o];function r(c,l,i,d,h,u){return n(),a("div",null,t)}const g=s(e,[["render",r]]);export{b as __pageData,g as default};
