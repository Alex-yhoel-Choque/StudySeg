
    document.addEventListener(&#39;contextmenu&#39;, function(e) {

        e.preventDefault();

    });






    document.addEventListener(&#39;keydown&#39;, function(e) {

        if (e.key === &quot;F12&quot;) {

            e.preventDefault();

        }

        if (e.ctrlKey &amp;&amp; e.shiftKey &amp;&amp; e.key === &quot;I&quot;) {

            e.preventDefault();

        }

        if (e.ctrlKey &amp;&amp; e.shiftKey &amp;&amp; e.key === &quot;J&quot;) {

            e.preventDefault();

        }

        if (e.ctrlKey &amp;&amp; e.key === &quot;U&quot;) {

            e.preventDefault();

        }

        if (e.ctrlKey &amp;&amp; e.shiftKey &amp;&amp; e.key === &quot;C&quot;) {

            e.preventDefault();

        }

        if (e.ctrlKey &amp;&amp; e.key === &quot;S&quot;) {

            e.preventDefault();

        }

    });
