'use strict';

const snakecase = require('..');

console.log(snakecase('a')); //=> 'a'
console.log(snakecase('foo bar baz')); //=> 'foo_bar_baz'
console.log(snakecase('  foo bar baz  ')); //=> 'foo_bar_baz'
console.log(snakecase('foo_bar-baz')); //=> 'foo_bar_baz'
console.log(snakecase('foo.bar.baz')); //=> 'foo_bar_baz'
console.log(snakecase('foo/bar/baz')); //=> 'foo_bar_baz'
console.log(snakecase('foo[bar)baz')); //=> 'foo_bar_baz'
console.log(snakecase('#foo+bar*baz')); //=> 'foo_bar_baz'
console.log(snakecase('$foo~bar`baz')); //=> 'foo_bar_baz'
console.log(snakecase('_foo_bar-baz-')); //=> 'foo_bar_baz'
console.log(snakecase('foo 2 bar 5 baz')); //=> 'foo_2_bar_5_baz'
console.log(snakecase('foo2bar5baz')); //=> 'foo2bar5baz'
console.log('---');

console.log(snakecase('JSONStringify')); //=> 'jsons_tringify
console.log(snakecase('JSONStringify', { preserveConsecutiveUppercase: true })); //=> the_irsi_s_mean

console.log(snakecase('TheIRSIsMean')); //=> 'the_irs_is_mean
console.log(snakecase('TheIRSIsMean', { preserveConsecutiveUppercase: true })); //=> the_irsi_s_mean
