'use strict';

const assert = require('assert/strict');
const snakecase = require('..');

/**
 * These tests were ported from sindresorhus/camelcase.
 * MIT License
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)
 */

const snake = (input, options = {}) => {
  return snakecase(input, { ...options, punctuationRegex: false });
};

describe('snakecase (tests ported from sindresorhus/camelcase)', () => {
  it('should snakecase a string', () => {
    assert.equal(snake('foo'), 'foo');
    assert.equal(snake('foo-bar'), 'foo_bar');
    assert.equal(snake('foo-bar-baz'), 'foo_bar_baz');
    assert.equal(snake('foo--bar'), 'foo_bar');
    assert.equal(snake('--foo-bar'), 'foo_bar');
    assert.equal(snake('--foo--bar'), 'foo_bar');
    assert.equal(snake('FOO-BAR'), 'foo_bar');
    assert.equal(snake('FOÈ-BAR'), 'foè_bar');
    assert.equal(snake('-foo-bar-'), 'foo_bar');
    assert.equal(snake('--foo--bar--'), 'foo_bar');
    assert.equal(snake('foo-1'), 'foo_1');
    assert.equal(snake('foo.bar'), 'foo_bar');
    assert.equal(snake('foo..bar'), 'foo_bar');
    assert.equal(snake('..foo..bar..'), 'foo_bar');
    assert.equal(snake('foo_bar'), 'foo_bar');
    assert.equal(snake('__foo__bar__'), 'foo_bar');
    assert.equal(snake('foo bar'), 'foo_bar');
    assert.equal(snake('  foo  bar  '), 'foo_bar');
    assert.equal(snake('-'), '');
    assert.equal(snake(' - '), '');
    assert.equal(snake('fooBar'), 'foo_bar');
    assert.equal(snake('fooBar-baz'), 'foo_bar_baz');
    assert.equal(snake('foìBar-baz'), 'foì_bar_baz');
    assert.equal(snake('fooBarBaz-bazzy'), 'foo_bar_baz_bazzy');
    assert.equal(snake('FBBazzy'), 'fb_bazzy');
    assert.equal(snake('F'), 'f');
    assert.equal(snake('FooBar'), 'foo_bar');
    assert.equal(snake('Foo'), 'foo');
    assert.equal(snake('FOO'), 'foo');
    assert.equal(snake(['foo', 'bar']), 'foo_bar');
    assert.equal(snake(['foo', '-bar']), 'foo_bar');
    assert.equal(snake(['foo', '-bar', 'baz']), 'foo_bar_baz');
    assert.equal(snake(['', '']), '');
    assert.equal(snake('--'), '');
    assert.equal(snake(''), '');
    assert.equal(snake('--__--_--_'), '');
    assert.equal(snake(['---_', '--', '', '-_- ']), '');
    assert.equal(snake('..foo..bar..'), 'foo_bar');
    assert.equal(snake('foo bar?'), 'foo_bar');
    assert.equal(snake('foo bar!'), 'foo_bar');
    assert.equal(snake('foo bar$'), 'foo_bar');
    assert.equal(snake('foo-bar#'), 'foo_bar');
    assert.equal(snake('XMLHttpRequest'), 'xml_http_request');
    assert.equal(snake('AjaxXMLHttpRequest'), 'ajax_xml_http_request');
    assert.equal(snake('Ajax-XMLHttpRequest'), 'ajax_xml_http_request');
    assert.equal(snake([]), '');
    assert.equal(snake('mGridCol6@md'), 'm_grid_col6_md');
    assert.equal(snake('A::a'), 'a_a');
    assert.equal(snake('Hello1World'), 'hello1_world');
    assert.equal(snake('Hello11World'), 'hello11_world');
    assert.equal(snake('hello1world'), 'hello1world');
    assert.equal(snake('Hello1World11foo'), 'hello1_world11foo');
    assert.equal(snake('Hello1'), 'hello1');
    assert.equal(snake('hello1'), 'hello1');
    assert.equal(snake('1Hello'), '1_hello');
    assert.equal(snake('1hello'), '1hello');
    assert.equal(snake('h2w'), 'h2w');
    assert.equal(snake('розовый_пушистый-единороги'), 'розовый_пушистый_единороги');
    assert.equal(snake('розовый_пушистый-единороги'), 'розовый_пушистый_единороги');
    assert.equal(snake('РОЗОВЫЙ_ПУШИСТЫЙ-ЕДИНОРОГИ'), 'розовый_пушистый_единороги');
    assert.equal(snake('桑德在这里。'), '桑德在这里');
    assert.equal(snake('桑德在这里。'), '桑德在这里');
    assert.equal(snake('桑德_在这里。'), '桑德在这里');
  });

  it('snakecase with pascalCase option', () => {
    assert.equal(snake('foo'), 'foo');
    assert.equal(snake('foo-bar'), 'foo_bar');
    assert.equal(snake('foo-bar-baz'), 'foo_bar_baz');
    assert.equal(snake('foo--bar'), 'foo_bar');
    assert.equal(snake('--foo-bar'), 'foo_bar');
    assert.equal(snake('--foo--bar'), 'foo_bar');
    assert.equal(snake('FOO-BAR'), 'foo_bar');
    assert.equal(snake('FOÈ-BAR'), 'foè_bar');
    assert.equal(snake('-foo-bar-'), 'foo_bar');
    assert.equal(snake('--foo--bar--'), 'foo_bar');
    assert.equal(snake('foo-1'), 'foo_1');
    assert.equal(snake('foo.bar'), 'foo_bar');
    assert.equal(snake('foo..bar'), 'foo_bar');
    assert.equal(snake('..foo..bar..'), 'foo_bar');
    assert.equal(snake('foo_bar'), 'foo_bar');
    assert.equal(snake('__foo__bar__'), 'foo_bar');
    assert.equal(snake('__foo__bar__'), 'foo_bar');
    assert.equal(snake('foo bar'), 'foo_bar');
    assert.equal(snake('  foo  bar  '), 'foo_bar');
    assert.equal(snake('-'), '');
    assert.equal(snake(' - '), '');
    assert.equal(snake('fooBar'), 'foo_bar');
    assert.equal(snake('fooBar-baz'), 'foo_bar_baz');
    assert.equal(snake('foìBar-baz'), 'foì_bar_baz');
    assert.equal(snake('fooBarBaz-bazzy'), 'foo_bar_baz_bazzy');
    assert.equal(snake('FBBazzy'), 'fb_bazzy');
    assert.equal(snake('F'), 'f');
    assert.equal(snake('FooBar'), 'foo_bar');
    assert.equal(snake('Foo'), 'foo');
    assert.equal(snake('FOO'), 'foo');
    assert.equal(snake(['foo', 'bar']), 'foo_bar');
    assert.equal(snake(['foo', '-bar']), 'foo_bar');
    assert.equal(snake(['foo', '-bar', 'baz']), 'foo_bar_baz');
    assert.equal(snake(['', '']), '');
    assert.equal(snake('--'), '');
    assert.equal(snake(''), '');
    assert.equal(snake('--__--_--_'), '');
    assert.equal(snake(['---_', '--', '', '-_- ']), '');
    assert.equal(snake('foo bar?'), 'foo_bar');
    assert.equal(snake('foo bar!'), 'foo_bar');
    assert.equal(snake('foo bar$'), 'foo_bar');
    assert.equal(snake('foo-bar#'), 'foo_bar');
    assert.equal(snake('XMLHttpRequest'), 'xml_http_request');
    assert.equal(snake('AjaxXMLHttpRequest'), 'ajax_xml_http_request');
    assert.equal(snake('Ajax-XMLHttpRequest'), 'ajax_xml_http_request');
    assert.equal(snake([]), '');
    assert.equal(snake('mGridCol6@md'), 'm_grid_col6_md');
    assert.equal(snake('A::a'), 'a_a');
    assert.equal(snake('Hello1World'), 'hello1_world');
    assert.equal(snake('Hello11World'), 'hello11_world');
    assert.equal(snake('hello1world'), 'hello1world');
    assert.equal(snake('hello1World'), 'hello1_world');
    assert.equal(snake('hello1'), 'hello1');
    assert.equal(snake('Hello1'), 'hello1');
    assert.equal(snake('1hello'), '1hello');
    assert.equal(snake('1Hello'), '1_hello');
    assert.equal(snake('h1W'), 'h1_w');
    assert.equal(snake('РозовыйПушистыйЕдинороги'), 'розовый_пушистый_единороги');
    assert.equal(snake('розовый_пушистый-единороги'), 'розовый_пушистый_единороги');
    assert.equal(snake('РОЗОВЫЙ_ПУШИСТЫЙ-ЕДИНОРОГИ'), 'розовый_пушистый_единороги');
    assert.equal(snake('桑德在这里。'), '桑德在这里');
    assert.equal(snake('桑德_在这里。'), '桑德在这里');
  });

  it('snakecase with preserveConsecutiveUppercase option', () => {
    assert.equal(snake('foo-BAR', { preserveConsecutiveUppercase: true }), 'foo_bar');
    assert.equal(snake('fooBAR', { preserveConsecutiveUppercase: true }), 'foo_bar');
    assert.equal(snake('fooBaR', { preserveConsecutiveUppercase: true }), 'foo_ba_r');
    assert.equal(snake('fOÈ-BAR', { preserveConsecutiveUppercase: true }), 'f_oè_bar');
    assert.equal(snake('--foo.BAR', { preserveConsecutiveUppercase: true }), 'foo_bar');
    assert.equal(snake(['Foo', 'BAR'], { preserveConsecutiveUppercase: true }), 'foo_bar');
    assert.equal(snake(['foo', '-BAR'], { preserveConsecutiveUppercase: true }), 'foo_bar');
    assert.equal(snake(['foo', '-BAR', 'baz'], { preserveConsecutiveUppercase: true }), 'foo_bar_baz');
    assert.equal(snake(['', ''], { preserveConsecutiveUppercase: true }), '');
    assert.equal(snake('--', { preserveConsecutiveUppercase: true }), '');
    assert.equal(snake('', { preserveConsecutiveUppercase: true }), '');
    assert.equal(snake('--__--_--_', { preserveConsecutiveUppercase: true }), '');
    assert.equal(snake(['---_', '--', '', '-_- '], { preserveConsecutiveUppercase: true }), '');
    assert.equal(snake('foo BAR?', { preserveConsecutiveUppercase: true }), 'foo_bar');
    assert.equal(snake('foo BAR!', { preserveConsecutiveUppercase: true }), 'foo_bar');
    assert.equal(snake('Foo BAR$', { preserveConsecutiveUppercase: true }), 'foo_bar');
    assert.equal(snake('foo-BAR#', { preserveConsecutiveUppercase: true }), 'foo_bar');
    assert.equal(snake('xMLHttpRequest', { preserveConsecutiveUppercase: true }), 'x_mlh_ttp_request');
    assert.equal(snake('ajaxXMLHttpRequest', { preserveConsecutiveUppercase: true }), 'ajax_xmlh_ttp_request');
    assert.equal(snake('Ajax-XMLHttpRequest', { preserveConsecutiveUppercase: true }), 'ajax_xmlh_ttp_request');
    assert.equal(snake([], { preserveConsecutiveUppercase: true }), '');
    assert.equal(snake('mGridCOl6@md', { preserveConsecutiveUppercase: true }), 'm_grid_co_l6_md');
    assert.equal(snake('A::a', { preserveConsecutiveUppercase: true }), 'a_a');
    assert.equal(snake('Hello1WORLD', { preserveConsecutiveUppercase: true }), 'hello_1_world');
    assert.equal(snake('Hello11WORLD', { preserveConsecutiveUppercase: true }), 'hello_11_world');
    assert.equal(snake('pозовыйПушистыйFOOдинорогиf', { preserveConsecutiveUppercase: true }), 'pозовый_пушистый_foo_динорогиf');
    assert.equal(snake('桑德在这里。', { preserveConsecutiveUppercase: true }), '桑德在这里');
    assert.equal(snake('桑德_在这里。', { preserveConsecutiveUppercase: true }), '桑德在这里');
  });
});
