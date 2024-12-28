/**
 * Regular expression to validate email addresses.
 *
 * This regex checks for the following:
 * - The email must not contain any spaces.
 * - The email must have one "@" symbol.
 * - The email must have at least one character before the "@" symbol.
 * - The email must have at least one character after the "@" symbol and before the "." symbol.
 * - The email must have at least one character after the "." symbol.
 *
 * @constant {RegExp} emailRegex
 */
/*
 */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export { emailRegex };
