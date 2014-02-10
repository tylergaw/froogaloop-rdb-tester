froogaloop-rdb-tester
=====================

Made a slight change so that the Froogaloop JS on http://www.maxmedia.com/work/bridgestone-golf-chalkboard/
plays nicely with the Readability Chrome extension.

In the sample mxm.js you'll just need to make the iframe element selector more
specific so that it doesn't try to add events to the injected Readability iframe.

See:
https://github.com/tylergaw/froogaloop-rdb-tester/blob/master/index.html#L14

and
https://github.com/tylergaw/froogaloop-rdb-tester/blob/master/mxm.js#L4
