import{_ as a,o as p,c as e,k as s,a as l,t,R as c}from"./chunks/framework.4sGULByW.js";const C=JSON.parse('{"title":"执行上下文栈","description":"","frontmatter":{"title":"执行上下文栈","author":"天畅","date":"2023-11-30"},"headers":[],"relativePath":"handbook/js/执行上下文栈.md","filePath":"handbook/js/执行上下文栈.md"}'),i={name:"handbook/js/执行上下文栈.md"},o={id:"frontmatter-title",tabindex:"-1"},u=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),h=c(`<h2 id="顺序执行" tabindex="-1">顺序执行？ <a class="header-anchor" href="#顺序执行" aria-label="Permalink to &quot;顺序执行？&quot;">​</a></h2><p>如果要问到 JavaScript 代码执行顺序的话，想必写过 JavaScript 的开发者都会有个直观的印象，那就是顺序执行，毕竟：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var foo = function () {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    console.log(&#39;foo1&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>foo();  // foo1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var foo = function () {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    console.log(&#39;foo2&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>foo(); // foo2</span></span></code></pre></div><p>然而去看这段代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function foo() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    console.log(&#39;foo1&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>foo();  // foo2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function foo() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    console.log(&#39;foo2&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>foo(); // foo2</span></span></code></pre></div><p>打印的结果却是两个 <code>foo2</code>。</p><p>刷过面试题的都知道这是因为 JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。当执行一段代码的时候，会进行一个“准备工作”，比如第一个例子中的变量提升，和第二个例子中的函数提升。</p><p>但是本文真正想让大家思考的是：这个“一段一段”中的“段”究竟是怎么划分的呢？</p><p>到底JavaScript引擎遇到一段怎样的代码时才会做“准备工作”呢？</p><h2 id="可执行代码" tabindex="-1">可执行代码 <a class="header-anchor" href="#可执行代码" aria-label="Permalink to &quot;可执行代码&quot;">​</a></h2><p>这就要说到 JavaScript 的可执行代码(executable code)的类型有哪些了？</p><p>其实很简单，就三种，全局代码、函数代码、eval代码。</p><p>举个例子，当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做&quot;执行上下文(execution context)&quot;。</p><h2 id="执行上下文栈" tabindex="-1">执行上下文栈 <a class="header-anchor" href="#执行上下文栈" aria-label="Permalink to &quot;执行上下文栈&quot;">​</a></h2><p>接下来问题来了，我们写的函数多了去了，如何管理创建的那么多执行上下文呢？</p><p>所以 JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文</p><p>为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ECStack = [];</span></span></code></pre></div><p>试想当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 globalContext 表示它，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以程序结束之前， ECStack 最底部永远有个 globalContext：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ECStack = [</span></span>
<span class="line"><span>    globalContext</span></span>
<span class="line"><span>];</span></span></code></pre></div><p>现在 JavaScript 遇到下面的这段代码了：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>function fun3() {</span></span>
<span class="line"><span>    console.log(&#39;fun3&#39;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function fun2() {</span></span>
<span class="line"><span>    fun3();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function fun1() {</span></span>
<span class="line"><span>    fun2();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fun1();</span></span></code></pre></div><p>当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。知道了这样的工作原理，让我们来看看如何处理上面这段代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 伪代码</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// fun1()</span></span>
<span class="line"><span>ECStack.push(&lt;fun1&gt; functionContext);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// fun1中竟然调用了fun2，还要创建fun2的执行上下文</span></span>
<span class="line"><span>ECStack.push(&lt;fun2&gt; functionContext);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 擦，fun2还调用了fun3！</span></span>
<span class="line"><span>ECStack.push(&lt;fun3&gt; functionContext);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// fun3执行完毕</span></span>
<span class="line"><span>ECStack.pop();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// fun2执行完毕</span></span>
<span class="line"><span>ECStack.pop();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// fun1执行完毕</span></span>
<span class="line"><span>ECStack.pop();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext</span></span></code></pre></div><h2 id="解答思考题" tabindex="-1">解答思考题 <a class="header-anchor" href="#解答思考题" aria-label="Permalink to &quot;解答思考题&quot;">​</a></h2><p>好啦，现在我们已经了解了执行上下文栈是如何处理执行上下文的，所以让我们看看上篇文章<a href="https://atomgit.com/tianchang/Blog/issues/3" target="_blank" rel="noreferrer">《JavaScript深入之词法作用域和动态作用域》</a>最后的问题：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var scope = &quot;global scope&quot;;</span></span>
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
<span class="line"><span>checkscope()();</span></span></code></pre></div><p>两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？</p><p>答案就是执行上下文栈的变化不一样。</p><p>让我们模拟第一段代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ECStack.push(&lt;checkscope&gt; functionContext);</span></span>
<span class="line"><span>ECStack.push(&lt;f&gt; functionContext);</span></span>
<span class="line"><span>ECStack.pop();</span></span>
<span class="line"><span>ECStack.pop();</span></span></code></pre></div><p>让我们模拟第二段代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ECStack.push(&lt;checkscope&gt; functionContext);</span></span>
<span class="line"><span>ECStack.pop();</span></span>
<span class="line"><span>ECStack.push(&lt;f&gt; functionContext);</span></span>
<span class="line"><span>ECStack.pop();</span></span></code></pre></div>`,33);function r(n,d,f,g,k,v){return p(),e("div",null,[s("h1",o,[l(t(n.$frontmatter.title)+" ",1),u]),h])}const m=a(i,[["render",r]]);export{C as __pageData,m as default};
