import{_ as n,o as p,c as e,k as a,a as l,t as c,R as o}from"./chunks/framework.4sGULByW.js";const m=JSON.parse('{"title":"词法作用域和动态作用域","description":"","frontmatter":{"title":"词法作用域和动态作用域","author":"天畅","date":"2023-11-30"},"headers":[],"relativePath":"handbook/js/词法作用域和动态作用域.md","filePath":"handbook/js/词法作用域和动态作用域.md"}'),i={name:"handbook/js/词法作用域和动态作用域.md"},t={id:"frontmatter-title",tabindex:"-1"},r=a("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),h=o(`<h2 id="作用域" tabindex="-1">作用域 <a class="header-anchor" href="#作用域" aria-label="Permalink to &quot;作用域&quot;">​</a></h2><p>作用域是指程序源代码中定义变量的区域。</p><p>作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。</p><p>JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。</p><h2 id="静态作用域与动态作用域" tabindex="-1">静态作用域与动态作用域 <a class="header-anchor" href="#静态作用域与动态作用域" aria-label="Permalink to &quot;静态作用域与动态作用域&quot;">​</a></h2><p>因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。</p><p>而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。</p><p>让我们认真看个例子就能明白之间的区别：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var value = 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function foo() {</span></span>
<span class="line"><span>    console.log(value);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function bar() {</span></span>
<span class="line"><span>    var value = 2;</span></span>
<span class="line"><span>    foo();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bar();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 结果是 ???</span></span></code></pre></div><p>假设JavaScript采用静态作用域，让我们分析下执行过程：</p><p>执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。</p><p>假设JavaScript采用动态作用域，让我们分析下执行过程：</p><p>执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。</p><p>前面我们已经说了，JavaScript采用的是静态作用域，所以这个例子的结果是 1。</p><h2 id="动态作用域" tabindex="-1">动态作用域 <a class="header-anchor" href="#动态作用域" aria-label="Permalink to &quot;动态作用域&quot;">​</a></h2><p>也许你会好奇什么语言是动态作用域？</p><p>bash 就是动态作用域，不信的话，把下面的脚本存成例如 scope.bash，然后进入相应的目录，用命令行执行 <code>bash ./scope.bash</code>，看看打印的值是多少。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>value=1</span></span>
<span class="line"><span>function foo () {</span></span>
<span class="line"><span>    echo $value;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function bar () {</span></span>
<span class="line"><span>    local value=2;</span></span>
<span class="line"><span>    foo;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>bar</span></span></code></pre></div><p>这个文件也可以在 <a href="https://atomgit.com/tianchang/Blog/blob/main/js%E9%AB%98%E7%BA%A7/2.JavaScript%E6%B7%B1%E5%85%A5%E4%B9%8B%E8%AF%8D%E6%B3%95%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%92%8C%E5%8A%A8%E6%80%81%E4%BD%9C%E7%94%A8%E5%9F%9F/scope.bash" target="_blank" rel="noreferrer">AtomGit 博客仓库</a>中找到。</p><h2 id="思考题" tabindex="-1">思考题 <a class="header-anchor" href="#思考题" aria-label="Permalink to &quot;思考题&quot;">​</a></h2><p>最后，让我们看一个《JavaScript权威指南》中的例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var scope = &quot;global scope&quot;;</span></span>
<span class="line"><span>function checkscope(){</span></span>
<span class="line"><span>    var scope = &quot;local scope&quot;;</span></span>
<span class="line"><span>    function f(){</span></span>
<span class="line"><span>        return scope;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return f();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>checkscope();</span></span>
<span class="line"><span>var scope = &quot;global scope&quot;;</span></span>
<span class="line"><span>function checkscope(){</span></span>
<span class="line"><span>    var scope = &quot;local scope&quot;;</span></span>
<span class="line"><span>    function f(){</span></span>
<span class="line"><span>        return scope;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return f;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>checkscope()();</span></span></code></pre></div><p>猜猜两段代码各自的执行结果是多少？</p><p>这里直接告诉大家结果，两段代码都会打印：<code>local scope</code>。</p><p>原因也很简单，因为JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置。</p><p>而引用《JavaScript权威指南》的回答就是：</p><p>JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。</p><p>但是在这里真正想让大家思考的是：</p><p>虽然两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？## 作用域</p><p>作用域是指程序源代码中定义变量的区域。</p><p>作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。</p><p>JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。</p><h2 id="静态作用域与动态作用域-1" tabindex="-1">静态作用域与动态作用域 <a class="header-anchor" href="#静态作用域与动态作用域-1" aria-label="Permalink to &quot;静态作用域与动态作用域&quot;">​</a></h2><p>因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。</p><p>而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。</p><p>让我们认真看个例子就能明白之间的区别：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var value = 1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function foo() {</span></span>
<span class="line"><span>    console.log(value);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function bar() {</span></span>
<span class="line"><span>    var value = 2;</span></span>
<span class="line"><span>    foo();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bar();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 结果是 ???</span></span></code></pre></div><p>假设JavaScript采用静态作用域，让我们分析下执行过程：</p><p>执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。</p><p>假设JavaScript采用动态作用域，让我们分析下执行过程：</p><p>执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。</p><p>前面我们已经说了，JavaScript采用的是静态作用域，所以这个例子的结果是 1。</p><h2 id="动态作用域-1" tabindex="-1">动态作用域 <a class="header-anchor" href="#动态作用域-1" aria-label="Permalink to &quot;动态作用域&quot;">​</a></h2><p>也许你会好奇什么语言是动态作用域？</p><p>bash 就是动态作用域，不信的话，把下面的脚本存成例如 scope.bash，然后进入相应的目录，用命令行执行 <code>bash ./scope.bash</code>，看看打印的值是多少。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>value=1</span></span>
<span class="line"><span>function foo () {</span></span>
<span class="line"><span>    echo $value;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>function bar () {</span></span>
<span class="line"><span>    local value=2;</span></span>
<span class="line"><span>    foo;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>bar</span></span></code></pre></div><p>这个文件也可以在 <a href="https://atomgit.com/tianchang/Blog/blob/main/js%E9%AB%98%E7%BA%A7/2.JavaScript%E6%B7%B1%E5%85%A5%E4%B9%8B%E8%AF%8D%E6%B3%95%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%92%8C%E5%8A%A8%E6%80%81%E4%BD%9C%E7%94%A8%E5%9F%9F/scope.bash" target="_blank" rel="noreferrer">AtomGit 博客仓库</a>中找到。</p><h2 id="思考题-1" tabindex="-1">思考题 <a class="header-anchor" href="#思考题-1" aria-label="Permalink to &quot;思考题&quot;">​</a></h2><p>最后，让我们看一个《JavaScript权威指南》中的例子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var scope = &quot;global scope&quot;;</span></span>
<span class="line"><span>function checkscope(){</span></span>
<span class="line"><span>    var scope = &quot;local scope&quot;;</span></span>
<span class="line"><span>    function f(){</span></span>
<span class="line"><span>        return scope;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return f();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>checkscope();</span></span>
<span class="line"><span>var scope = &quot;global scope&quot;;</span></span>
<span class="line"><span>function checkscope(){</span></span>
<span class="line"><span>    var scope = &quot;local scope&quot;;</span></span>
<span class="line"><span>    function f(){</span></span>
<span class="line"><span>        return scope;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return f;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>checkscope()();</span></span></code></pre></div><p>猜猜两段代码各自的执行结果是多少？</p><p>这里直接告诉大家结果，两段代码都会打印：<code>local scope</code>。</p><p>原因也很简单，因为JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置。</p><p>而引用《JavaScript权威指南》的回答就是：</p><p>JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。</p><p>但是在这里真正想让大家思考的是：</p><p>虽然两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？</p>`,57);function u(s,d,v,b,f,g){return p(),e("div",null,[a("h1",t,[l(c(s.$frontmatter.title)+" ",1),r]),h])}const _=n(i,[["render",u]]);export{m as __pageData,_ as default};
