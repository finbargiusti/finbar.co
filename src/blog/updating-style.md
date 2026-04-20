---
title: Updating this site's style.
date: 2026-04-19
---

Today, I updated the style of this site.

I tried, using just css rules and standard HTML elements, to make it appear like the site is composed of just text, like in a TUI.

The reason I did not try to fancily _actually_ form it in text is to make it more readable to bots and more accessible to those using a screen reader etc.

The trick is using the `rem` and `ch` units in css. `rem` is relative to the font-size, and `ch` relative to the width of a 0 character (and in monospace, any character).

Using these two units, we can size all HTML elements s.t. they all snap to an imaginary grid of `1ch` and `line-height * 1rem` cells.

This gives the appearance of a text-based website!
