var perfect=function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=0)}([function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),function(a){function c(a,b,c,d){var f=d.setup,g=d.before,h=d.test,j=d.after,k=d.cleanup;if(!h)throw new Error('Um, you need a test.');var l,m,n,o={},p=0;c&&console.log('     -- TEST CASE: "'+a+'" -- '),f&&f.call(o,o);for(var q=0;q<b;q+=1){g&&g.call(o,o);var i=function(){return m=e.now()},r=function(){return n=e.now()},s=e.now();h.call(o,i,r,o),n=n||e.now(),m=m||s,p+=n-m,j&&j.call(o,o)}return k&&k.call(o,o),l=p/b,c&&(console.log('       - total time: '+p),console.log('       - average time: '+l)),{name:a,totalTime:p,averageTime:l}}b.performanceTest=function(a){var b=a.description,d=a.testCases,e=a.iterations,f=a.logResults;e=e||5e5;var g=[];for(var h in f&&(console.log(' --- PERFORMANCE TEST: "'+b+'"'),console.log('   -- RUNNING... ')),d)g.push(c(h,e,f,d[h]));for(var j,k=g[0],l=g[0],m=0,i=g;m<i.length;m+=1)j=i[m],j.averageTime>k.averageTime&&(k=j),j.averageTime<l.averageTime&&(l=j);return f&&(console.log('   -- DONE! Results: '),console.log('     -- SLOWEST: "'+k.name+'"'),console.log('       - total time: '+k.totalTime),console.log('       - average time: '+k.averageTime),console.log('     -- FASTEST: "'+l.name+'"'),console.log('       - total time: '+l.totalTime),console.log('       - average time: '+l.averageTime)),{slowest:k,fastest:l}};var d;try{d=(42,eval)('this')}catch(b){d='object'==typeof window?window:a||{}}var e='undefined'!=typeof d.performance&&d.performance.now?d.performance:{now:Date.now.bind(Date)}}.call(b,c(1))},function(a){var b=function(){return this}();try{b=b||Function('return this')()||(1,eval)('this')}catch(a){'object'==typeof window&&(b=window)}a.exports=b}]);