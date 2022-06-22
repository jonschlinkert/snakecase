'use strict';

const assert = require('assert/strict');
const snakecase = require('..');

describe('snakecase', () => {
  it('should return empty string when value null or undefined', () => {
    assert.equal(snakecase(null), '');
    assert.equal(snakecase(), '');
  });

  it('should uppercase a single character string', () => {
    assert.equal(snakecase('a'), 'a');
    assert.equal(snakecase('Z'), 'z');
  });

  it('should transform multiple single characters', () => {
    assert.equal(snakecase('a b c d'), 'a_b_c_d');
    assert.equal(snakecase('a bb c ddd'), 'a_bb_c_ddd');
    assert.equal(snakecase('Z'), 'z');
  });

  it('should work with spaces', () => {
    assert.equal(snakecase('foo bar baz'), 'foo_bar_baz');
    assert.equal(snakecase('foo     baz'), 'foo_baz');
    assert.equal(snakecase('  foo  bar   baz  '), 'foo_bar_baz');
  });

  it('should work with numbers', () => {
    assert.equal(snakecase(3), '3');
    assert.equal(snakecase('foo2bar5baz'), 'foo2bar5baz');
    assert.equal(snakecase('foo 2 bar 5 baz'), 'foo_2_bar_5_baz');
  });

  it('should work with upper case characters', () => {
    assert.equal(snakecase('theIRSSucks'), 'the_irs_sucks');
    assert.equal(snakecase('fooBARbaz', { preserveConsecutiveUppercase: true }), 'foo_bar_baz');
    assert.equal(snakecase('FOO_BAR_BAZ'), 'foo_bar_baz');
    assert.equal(snakecase('FOO_BAR_BAZ', { preserveConsecutiveUppercase: true }), 'foo_bar_baz');
    assert.equal(snakecase('The IRS Is Mean'), 'the_irs_is_mean');
    assert.equal(snakecase('The IRS Is Mean', { preserveConsecutiveUppercase: true }), 'the_irs_is_mean');
    assert.equal(snakecase('We saw a UFO'), 'we_saw_a_ufo');
    assert.equal(snakecase('We saw a UFO', { preserveConsecutiveUppercase: true }), 'we_saw_a_ufo');
  });

  it('should not lowercase existing camelcasing', () => {
    assert.equal(snakecase('fooBarBaz'), 'foo_bar_baz');
    assert.equal(snakecase('FooBarBaz'), 'foo_bar_baz');
    assert.equal(snakecase(' FooBarBaz'), 'foo_bar_baz');
    assert.equal(snakecase(' fooBarBaz'), 'foo_bar_baz');
  });

  it('should remove non-word-characters', () => {
    assert.equal(snakecase('foo_bar-baz'), 'foo_bar_baz');
    assert.equal(snakecase('foo.bar.baz'), 'foo_bar_baz');
    assert.equal(snakecase('foo/bar/baz'), 'foo_bar_baz');
    assert.equal(snakecase('foo[bar]baz'), 'foo_bar_baz');
    assert.equal(snakecase('foo(bar)baz'), 'foo_bar_baz');
    assert.equal(snakecase('#foo+bar*baz'), 'foo_bar_baz');
    assert.equal(snakecase('$foo~bar`baz'), 'foo_bar_baz');
    assert.equal(snakecase('_foo_bar-baz-'), 'foo_bar_baz');
    assert.equal(snakecase('_A_B_c-'), 'a_b_c');
  });

  it('should call .toString() when value is not a primitive', () => {
    assert.equal(snakecase([]), '');
    assert.equal(snakecase(['one', 'two', 'three']), 'one_two_three');
    assert.equal(snakecase(function foo_bar() {}), 'foo_bar');
    assert.equal(snakecase(function foo_bar(a, b) { return a + b; }), 'foo_bar');
    assert.equal(snakecase({}), 'object_object');
    assert.equal(snakecase(/foo/), 'foo');
  });
});
