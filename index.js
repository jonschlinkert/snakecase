'use strict';

/*!
 * snakecase <https://github.com/jonschlinkert/snakecase>
 * Copyright (c) Jon Schlinkert
 * Released under the MIT License.
 */

const PUNCTUATION = /[^\p{L}\p{N}]+/ug;
const REGEX = /([\p{Lu}]+[\p{Ll}\p{N}]*|[\p{Ll}\p{N}]+)/gu;
const LAZY_UPPERCASE_REGEX = /([\p{Lu}]{2,}(?![\p{Ll}\p{N}])|[\p{Lu}]+[\p{Ll}\p{N}]*|[\p{Ll}\p{N}]+)/gu;
const PRESERVE_UPPERCASE_REGEX = /([\p{Lu}]{2,}|[\p{Lu}][\p{Ll}]*|[\p{Ll}\p{N}]+)/gu;

const toString = input => {
  if (input == null) return '';
  if (Array.isArray(input)) return input.map(s => toString(s)).filter(s => s.length).join(' ');
  if (typeof input === 'function') return input.name || '';
  if (typeof input.toString !== 'function') return '';
  return input.toString().trim();
};

const splitString = (value, options = {}) => {
  const regex = options.preserveConsecutiveUppercase
    ? PRESERVE_UPPERCASE_REGEX
    : (options.lazyUppercase !== false ? LAZY_UPPERCASE_REGEX : REGEX);

  const input = toString(value);
  const words = value ? (input.match(regex) || []).filter(Boolean) : [];
  const output = words.filter(Boolean);

  if (output.length === 0 && value.length > 0) {
    return [value.replace(PUNCTUATION, '')];
  }

  return output;
};

const transformWords = (input, options, joinChar = '', transformFn = s => s) => {
  return input ? splitString(toString(input), options).map(transformFn).join(joinChar) : '';
};

const lowercase = (input = '', options) => input.toLocaleLowerCase(options?.locale);
const snakecase = (input = '', options) => lowercase(transformWords(input, options, '_'), options);

module.exports = snakecase;
module.exports.snakecase = snakecase;
