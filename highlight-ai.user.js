// ==UserScript==
/** biome-ignore-all lint/complexity/noUselessThisAlias: ok */
/** biome-ignore-all lint/complexity/noCommaOperator: ok */
/** biome-ignore-all lint/suspicious/noPrototypeBuiltins: ok */
/** biome-ignore-all lint/complexity/noArguments: ok */
/** biome-ignore-all lint/suspicious/noAssignInExpressions: ok */
// @name         Highlight AI content
// @namespace    http://tampermonkey.net/
// @version      2026-06-16
// @description  Highlight AI content
// @author       You
// @match        https://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==

/*!***************************************************
 * mark.js v8.11.1 (modified)
 * https://markjs.io/
 * Copyright (c) 2014–2018, Julian Kühnel
 * Released under the MIT license https://git.io/vwTVl
 *****************************************************/

let global, factory;
(global = this),
	(factory = () => {
		const e = (e, t) => {
				if (!(e instanceof t))
					throw TypeError("Cannot call a class as a function");
			},
			t = (() => {
				const e = (e, t) => {
					for (let n = 0; n < t.length; n++) {
						const o = t[n];
						(o.enumerable = o.enumerable || !1),
							(o.configurable = !0),
							"value" in o && (o.writable = !0),
							Object.defineProperty(e, o.key, o);
					}
				};
				return (t, n, o) => (n && e(t.prototype, n), o && e(t, o), t);
			})(),
			n =
				Object.assign ||
				function (e) {
					for (let t = 1; t < arguments.length; t++) {
						const n = arguments[t];
						for (const o in n) Object.hasOwn(n, o) && (e[o] = n[o]);
					}
					return e;
				},
			o = (() => {
				function n(t) {
					const o =
							!(arguments.length > 1) ||
							void 0 === arguments[1] ||
							arguments[1],
						r =
							arguments.length > 2 && void 0 !== arguments[2]
								? arguments[2]
								: [],
						a =
							arguments.length > 3 && void 0 !== arguments[3]
								? arguments[3]
								: 5e3;
					e(this, n),
						(this.ctx = t),
						(this.iframes = o),
						(this.exclude = r),
						(this.iframesTimeout = a);
				}
				return (
					t(
						n,
						[
							{
								key: "getContexts",
								value: function e() {
									let t,
										n = [];
									return (
										(t =
											void 0 !== this.ctx && this.ctx
												? NodeList.prototype.isPrototypeOf(this.ctx)
													? Array.prototype.slice.call(this.ctx)
													: Array.isArray(this.ctx)
														? this.ctx
														: "string" === typeof this.ctx
															? Array.prototype.slice.call(
																	document.querySelectorAll(this.ctx),
																)
															: [this.ctx]
												: []).forEach((e) => {
											const t = n.filter((t) => t.contains(e)).length > 0;
											-1 !== n.indexOf(e) || t || n.push(e);
										}),
										n
									);
								},
							},
							{
								key: "getIframeContents",
								value: function e(t, n) {
									let o =
											arguments.length > 2 && void 0 !== arguments[2]
												? arguments[2]
												: () => {},
										r;
									try {
										const a = t.contentWindow;
										if (((r = a.document), !a || !r))
											throw Error("iframe inaccessible");
									} catch (_) {
										o();
									}
									r && n(r);
								},
							},
							{
								key: "isIframeBlank",
								value: function e(t) {
									const n = "about:blank",
										o = t.getAttribute("src").trim(),
										r = t.contentWindow.location.href;
									return r === n && o !== n && o;
								},
							},
							{
								key: "observeIframeLoad",
								value: function e(t, n, o) {
									let r = this,
										a = !1,
										i = null,
										s = function e() {
											if (!a) {
												(a = !0), clearTimeout(i);
												try {
													r.isIframeBlank(t) ||
														(t.removeEventListener("load", e),
														r.getIframeContents(t, n, o));
												} catch (_) {
													o();
												}
											}
										};
									t.addEventListener("load", s),
										(i = setTimeout(s, this.iframesTimeout));
								},
							},
							{
								key: "onIframeReady",
								value: function e(t, n, o) {
									try {
										"complete" === t.contentWindow.document.readyState
											? this.isIframeBlank(t)
												? this.observeIframeLoad(t, n, o)
												: this.getIframeContents(t, n, o)
											: this.observeIframeLoad(t, n, o);
									} catch (_) {
										o();
									}
								},
							},
							{
								key: "waitForIframes",
								value: function e(t, n) {
									let o = 0;
									this.forEachIframe(
										t,
										() => !0,
										(e) => {
											o++,
												this.waitForIframes(e.querySelector("html"), () => {
													--o || n();
												});
										},
										(e) => {
											e || n();
										},
									);
								},
							},
							{
								key: "forEachIframe",
								value: function e(t, o, r) {
									let a =
											arguments.length > 3 && void 0 !== arguments[3]
												? arguments[3]
												: () => {},
										i = t.querySelectorAll("iframe"),
										s = i.length,
										l = 0;
									i = Array.prototype.slice.call(i);
									const c = function e() {
										--s <= 0 && a(l);
									};
									s || c(),
										i.forEach((e) => {
											n.matches(e, this.exclude)
												? c()
												: this.onIframeReady(
														e,
														(t) => {
															o(e) && (l++, r(t)), c();
														},
														c,
													);
										});
								},
							},
							{
								key: "createIterator",
								value: function e(t, n, o) {
									return document.createNodeIterator(t, n, o, !1);
								},
							},
							{
								key: "createInstanceOnIframe",
								value: function e(t) {
									return new n(t.querySelector("html"), this.iframes);
								},
							},
							{
								key: "compareNodeIframe",
								value: function e(t, n, o) {
									const r = t.compareDocumentPosition(o),
										a = Node.DOCUMENT_POSITION_PRECEDING;
									if (r & a) {
										if (null === n) return !0;
										{
											const i = n.compareDocumentPosition(o),
												s = Node.DOCUMENT_POSITION_FOLLOWING;
											if (i & s) return !0;
										}
									}
									return !1;
								},
							},
							{
								key: "getIteratorNode",
								value: function e(t) {
									let n = t.previousNode(),
										o;
									return (
										(o =
											null === n ? t.nextNode() : t.nextNode() && t.nextNode()),
										{ prevNode: n, node: o }
									);
								},
							},
							{
								key: "checkIframeFilter",
								value: function e(t, n, o, r) {
									let a = !1,
										i = !1;
									return (r.forEach((e, t) => {
										e.val === o && ((a = t), (i = e.handled));
									}),
									this.compareNodeIframe(t, n, o))
										? (!1 !== a || i
												? !1 === a || i || (r[a].handled = !0)
												: r.push({ val: o, handled: !0 }),
											!0)
										: (!1 === a && r.push({ val: o, handled: !1 }), !1);
								},
							},
							{
								key: "handleOpenIframes",
								value: function e(t, n, o, r) {
									t.forEach((e) => {
										e.handled ||
											this.getIframeContents(e.val, (e) => {
												this.createInstanceOnIframe(e).forEachNode(n, o, r);
											});
									});
								},
							},
							{
								key: "iterateThroughNodes",
								value: function e(t, n, o, r, a) {
									let i = this,
										s = this.createIterator(n, t, r),
										l = [],
										c = [],
										h,
										u;
									for (
										;
										(function e() {
											const t = i.getIteratorNode(s);
											return (u = t.prevNode), (h = t.node);
										})();
									)
										this.iframes &&
											this.forEachIframe(
												n,
												(e) => i.checkIframeFilter(h, u, e, l),
												(e) => {
													i.createInstanceOnIframe(e).forEachNode(
														t,
														(e) => c.push(e),
														r,
													);
												},
											),
											c.push(h);
									c.forEach((e) => {
										o(e);
									}),
										this.iframes && this.handleOpenIframes(l, t, o, r),
										a();
								},
							},
							{
								key: "forEachNode",
								value: function e(t, n, o) {
									let r = this,
										a =
											arguments.length > 3 && void 0 !== arguments[3]
												? arguments[3]
												: () => {},
										i = this.getContexts(),
										s = i.length;
									s || a(),
										i.forEach((e) => {
											const i = function i() {
												r.iterateThroughNodes(t, e, n, o, () => {
													--s <= 0 && a();
												});
											};
											r.iframes ? r.waitForIframes(e, i) : i();
										});
								},
							},
						],
						[
							{
								key: "matches",
								value: function e(t, n) {
									const o =
										t.matches ||
										t.matchesSelector ||
										t.msMatchesSelector ||
										t.mozMatchesSelector ||
										t.oMatchesSelector ||
										t.webkitMatchesSelector;
									if (!o) return !1;
									{
										let r = !1;
										return (
											("string" === typeof n ? [n] : n).every(
												(e) => !o.call(t, e) || ((r = !0), !1),
											),
											r
										);
									}
								},
							},
						],
					),
					n
				);
			})(),
			r = (() => {
				function r(t) {
					e(this, r), (this.ctx = t);
				}
				return (
					t(r, [
						{
							key: "getTextNodes",
							value: function e(t) {
								let n = "",
									o = [];
								this.iterator.forEachNode(
									NodeFilter.SHOW_TEXT,
									(e) => {
										o.push({
											start: n.length,
											end: (n += e.textContent).length,
											node: e,
										});
									},
									(e) =>
										this.matchesExclude(e.parentNode)
											? NodeFilter.FILTER_REJECT
											: NodeFilter.FILTER_ACCEPT,
									() => {
										t({ value: n, nodes: o });
									},
								);
							},
						},
						{
							key: "matchesExclude",
							value: function e(t) {
								return o.matches(
									t,
									this.opt.exclude.concat([
										"script",
										"style",
										"title",
										"head",
										"html",
									]),
								);
							},
						},
						{
							key: "wrapRangeInTextNode",
							value: function e(t, n, o) {
								const r = this.opt.element ? this.opt.element : "mark",
									a = t.splitText(n),
									i = a.splitText(o - n),
									s = document.createElement(r);
								return (
									s.setAttribute("data-markjs", "true"),
									this.opt.className &&
										s.setAttribute("class", this.opt.className),
									(s.textContent = a.textContent),
									a.parentNode.replaceChild(s, a),
									i
								);
							},
						},
						{
							key: "wrapRangeInMappedTextNode",
							value: function e(t, n, o, r, a) {
								t.nodes.every((e, i) => {
									const s = t.nodes[i + 1];
									if (void 0 === s || s.start > n) {
										if (!r(e.node)) return !1;
										const l = n - e.start,
											c = (o > e.end ? e.end : o) - e.start,
											h = t.value.substr(0, e.start),
											u = t.value.substr(c + e.start);
										if (
											((e.node = this.wrapRangeInTextNode(e.node, l, c)),
											(t.value = h + u),
											t.nodes.forEach((_, n) => {
												n >= i &&
													(t.nodes[n].start > 0 &&
														n !== i &&
														(t.nodes[n].start -= c),
													(t.nodes[n].end -= c));
											}),
											(o -= c),
											a(e.node.previousSibling, e.start),
											!(o > e.end))
										)
											return !1;
										n = e.end;
									}
									return !0;
								});
							},
						},
						{
							key: "wrapMatches",
							value: function e(t, n, o, r, a) {
								const i = 0 === n ? 0 : n + 1;
								this.getTextNodes((e) => {
									e.nodes.forEach((e) => {
										e = e.node;
										let n;
										for (
											;
											null !== (n = t.exec(e.textContent)) && "" !== n[i];
										) {
											if (!o(n[i], e)) continue;
											let a = n.index;
											if (0 !== i) for (let s = 1; s < i; s++) a += n[s].length;
											r(
												(e = this.wrapRangeInTextNode(e, a, a + n[i].length))
													.previousSibling,
											),
												(t.lastIndex = 0);
										}
									}),
										a();
								});
							},
						},
						{
							key: "wrapMatchesAcrossElements",
							value: function e(t, n, o, r, a) {
								const i = 0 === n ? 0 : n + 1;
								this.getTextNodes((e) => {
									let n;
									for (; null !== (n = t.exec(e.value)) && "" !== n[i]; ) {
										let s = n.index;
										if (0 !== i) for (let l = 1; l < i; l++) s += n[l].length;
										const c = s + n[i].length;
										this.wrapRangeInMappedTextNode(
											e,
											s,
											c,
											(e) => o(n[i], e),
											(e, n) => {
												(t.lastIndex = n), r(e);
											},
										);
									}
									a();
								});
							},
						},
						{
							key: "normalizeTextNode",
							value: function e(t) {
								if (t) {
									if (3 === t.nodeType)
										for (; t.nextSibling && 3 === t.nextSibling.nodeType; )
											(t.nodeValue += t.nextSibling.nodeValue),
												t.parentNode.removeChild(t.nextSibling);
									else this.normalizeTextNode(t.firstChild);
									this.normalizeTextNode(t.nextSibling);
								}
							},
						},
						{
							key: "markRegExp",
							value: function e(t, n) {
								const o = this;
								this.opt = n;
								let r = 0,
									a = "wrapMatches",
									i = function e(t) {
										r++, o.opt.each(t);
									};
								this.opt.acrossElements && (a = "wrapMatchesAcrossElements"),
									this[a](
										t,
										this.opt.ignoreGroups,
										(e, t) => o.opt.filter(t, e, r),
										i,
										() => {
											0 === r && o.opt.noMatch(t), o.opt.done(r);
										},
									);
							},
						},
						{
							key: "opt",
							set: function e(t) {
								this._opt = n(
									{},
									{
										element: "",
										className: "",
										exclude: [],
										iframes: !1,
										iframesTimeout: 5e3,
										separateWordSearch: !0,
										diacritics: !0,
										synonyms: {},
										accuracy: "partially",
										acrossElements: !1,
										caseSensitive: !1,
										ignoreJoiners: !1,
										ignoreGroups: 0,
										ignorePunctuation: [],
										wildcards: "disabled",
										each: function e() {},
										noMatch: function e() {},
										filter: function e() {
											return !0;
										},
										done: function e() {},
										debug: !1,
										log: window.console,
									},
									t,
								);
							},
							get: function e() {
								return this._opt;
							},
						},
						{
							key: "iterator",
							get: function e() {
								return new o(
									this.ctx,
									this.opt.iframes,
									this.opt.exclude,
									this.opt.iframesTimeout,
								);
							},
						},
					]),
					r
				);
			})();
		function a(e) {
			const t = new r(e);
			return (this.markRegExp = (e, n) => (t.markRegExp(e, n), this)), this;
		}
		return a;
	}),
	(global.Mark = factory());
((_, t) => {
	this.Mark = t();
})(0, () => {
	const e = (e, t) => {
			if (!(e instanceof t))
				throw new TypeError("Cannot call a class as a function");
		},
		t = (() => {
			const e = (e, t) => {
				for (let n = 0; n < t.length; n++) {
					const o = t[n];
					(o.enumerable = o.enumerable || !1),
						(o.configurable = !0),
						"value" in o && (o.writable = !0),
						Object.defineProperty(e, o.key, o);
				}
			};
			return (t, n, o) => (n && e(t.prototype, n), o && e(t, o), t);
		})(),
		n =
			Object.assign ||
			function (e) {
				for (let t = 1; t < arguments.length; t++) {
					const n = arguments[t];
					for (const t in n) Object.hasOwn(n, t) && (e[t] = n[t]);
				}
				return e;
			},
		o = (() => {
			function n(t) {
				const o =
						!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
					r =
						arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
					a =
						arguments.length > 3 && void 0 !== arguments[3]
							? arguments[3]
							: 5e3;
				e(this, n),
					(this.ctx = t),
					(this.iframes = o),
					(this.exclude = r),
					(this.iframesTimeout = a);
			}
			return (
				t(
					n,
					[
						{
							key: "getContexts",
							value: function () {
								let e,
									t = [];
								return (
									(e =
										void 0 !== this.ctx && this.ctx
											? NodeList.prototype.isPrototypeOf(this.ctx)
												? Array.prototype.slice.call(this.ctx)
												: Array.isArray(this.ctx)
													? this.ctx
													: "string" === typeof this.ctx
														? Array.prototype.slice.call(
																document.querySelectorAll(this.ctx),
															)
														: [this.ctx]
											: []),
									e.forEach((e) => {
										const n = t.filter((t) => t.contains(e)).length > 0;
										-1 !== t.indexOf(e) || n || t.push(e);
									}),
									t
								);
							},
						},
						{
							key: "getIframeContents",
							value: function (e, t) {
								const n =
									arguments.length > 2 && void 0 !== arguments[2]
										? arguments[2]
										: () => {};
								let o;
								try {
									const t = e.contentWindow;
									if (((o = t.document), !t || !o))
										throw new Error("iframe inaccessible");
								} catch (_) {
									n();
								}
								o && t(o);
							},
						},
						{
							key: "isIframeBlank",
							value: (e) => {
								const t = "about:blank",
									n = e.getAttribute("src").trim();
								return e.contentWindow.location.href === t && n !== t && n;
							},
						},
						{
							key: "observeIframeLoad",
							value: function (e, t, n) {
								const o = this;
								let r = !1,
									a = null;
								const i = function i() {
									if (!r) {
										(r = !0), clearTimeout(a);
										try {
											o.isIframeBlank(e) ||
												(e.removeEventListener("load", i),
												o.getIframeContents(e, t, n));
										} catch (_) {
											n();
										}
									}
								};
								e.addEventListener("load", i),
									(a = setTimeout(i, this.iframesTimeout));
							},
						},
						{
							key: "onIframeReady",
							value: function (e, t, n) {
								try {
									"complete" === e.contentWindow.document.readyState
										? this.isIframeBlank(e)
											? this.observeIframeLoad(e, t, n)
											: this.getIframeContents(e, t, n)
										: this.observeIframeLoad(e, t, n);
								} catch (_) {
									n();
								}
							},
						},
						{
							key: "waitForIframes",
							value: function (e, t) {
								let n = 0;
								this.forEachIframe(
									e,
									() => !0,
									(e) => {
										n++,
											this.waitForIframes(e.querySelector("html"), () => {
												--n || t();
											});
									},
									(e) => {
										e || t();
									},
								);
							},
						},
						{
							key: "forEachIframe",
							value: function (e, t, o) {
								const r =
									arguments.length > 3 && void 0 !== arguments[3]
										? arguments[3]
										: () => {};
								let a = e.querySelectorAll("iframe"),
									i = a.length,
									s = 0;
								a = Array.prototype.slice.call(a);
								const c = () => {
									--i <= 0 && r(s);
								};
								i || c(),
									a.forEach((e) => {
										n.matches(e, this.exclude)
											? c()
											: this.onIframeReady(
													e,
													(n) => {
														t(e) && (s++, o(n)), c();
													},
													c,
												);
									});
							},
						},
						{
							key: "createIterator",
							value: (e, t, n) => document.createNodeIterator(e, t, n, !1),
						},
						{
							key: "createInstanceOnIframe",
							value: function (e) {
								return new n(e.querySelector("html"), this.iframes);
							},
						},
						{
							key: "compareNodeIframe",
							value: (e, t, n) => {
								if (
									e.compareDocumentPosition(n) &
									Node.DOCUMENT_POSITION_PRECEDING
								) {
									if (null === t) return !0;
									if (
										t.compareDocumentPosition(n) &
										Node.DOCUMENT_POSITION_FOLLOWING
									)
										return !0;
								}
								return !1;
							},
						},
						{
							key: "getIteratorNode",
							value: (e) => {
								const t = e.previousNode();
								let n;
								return (
									(n = (null === t || e.nextNode()) && e.nextNode()),
									{ prevNode: t, node: n }
								);
							},
						},
						{
							key: "checkIframeFilter",
							value: function (e, t, n, o) {
								let r = !1,
									a = !1;
								return (
									o.forEach((e, t) => {
										e.val === n && ((r = t), (a = e.handled));
									}),
									this.compareNodeIframe(e, t, n)
										? (!1 !== r || a
												? !1 === r || a || (o[r].handled = !0)
												: o.push({ val: n, handled: !0 }),
											!0)
										: (!1 === r && o.push({ val: n, handled: !1 }), !1)
								);
							},
						},
						{
							key: "handleOpenIframes",
							value: function (e, t, n, o) {
								e.forEach((e) => {
									e.handled ||
										this.getIframeContents(e.val, (e) => {
											this.createInstanceOnIframe(e).forEachNode(t, n, o);
										});
								});
							},
						},
						{
							key: "iterateThroughNodes",
							value: function (e, t, n, o, r) {
								const i = this.createIterator(t, e, o);
								let s,
									c,
									l = [],
									u = [],
									h = () => {
										const e = this.getIteratorNode(i);
										return (c = e.prevNode), (s = e.node), s;
									};
								for (; h(); )
									this.iframes &&
										this.forEachIframe(
											t,
											(e) => this.checkIframeFilter(s, c, e, l),
											(t) => {
												this.createInstanceOnIframe(t).forEachNode(
													e,
													(e) => u.push(e),
													o,
												);
											},
										),
										u.push(s);
								u.forEach((e) => {
									n(e);
								}),
									this.iframes && this.handleOpenIframes(l, e, n, o),
									r();
							},
						},
						{
							key: "forEachNode",
							value: function (e, t, n) {
								const r =
										arguments.length > 3 && void 0 !== arguments[3]
											? arguments[3]
											: () => {},
									a = this.getContexts();
								let i = a.length;
								i || r(),
									a.forEach((a) => {
										const s = () => {
											this.iterateThroughNodes(e, a, t, n, () => {
												--i <= 0 && r();
											});
										};
										this.iframes ? this.waitForIframes(a, s) : s();
									});
							},
						},
					],
					[
						{
							key: "matches",
							value: (e, t) => {
								const n = "string" === typeof t ? [t] : t,
									o =
										e.matches ||
										e.matchesSelector ||
										e.msMatchesSelector ||
										e.mozMatchesSelector ||
										e.oMatchesSelector ||
										e.webkitMatchesSelector;
								if (o) {
									let t = !1;
									return n.every((n) => !o.call(e, n) || ((t = !0), !1)), t;
								}
								return !1;
							},
						},
					],
				),
				n
			);
		})(),
		r = (() => {
			function r(t) {
				e(this, r), (this.ctx = t);
			}
			return (
				t(r, [
					{
						key: "getTextNodes",
						value: function (e) {
							let t = "",
								n = [];
							this.iterator.forEachNode(
								NodeFilter.SHOW_TEXT,
								(e) => {
									n.push({
										start: t.length,
										end: (t += e.textContent).length,
										node: e,
									});
								},
								(e) =>
									this.matchesExclude(e.parentNode)
										? NodeFilter.FILTER_REJECT
										: NodeFilter.FILTER_ACCEPT,
								() => {
									e({ value: t, nodes: n });
								},
							);
						},
					},
					{
						key: "matchesExclude",
						value: function (e) {
							return o.matches(
								e,
								this.opt.exclude.concat([
									"script",
									"style",
									"title",
									"head",
									"html",
								]),
							);
						},
					},
					{
						key: "wrapRangeInTextNode",
						value: function (e, t, n) {
							const o = this.opt.element ? this.opt.element : "mark",
								r = e.splitText(t),
								a = r.splitText(n - t),
								i = document.createElement(o);
							return (
								i.setAttribute("data-markjs", "true"),
								this.opt.className &&
									i.setAttribute("class", this.opt.className),
								(i.textContent = r.textContent),
								r.parentNode.replaceChild(i, r),
								a
							);
						},
					},
					{
						key: "wrapRangeInMappedTextNode",
						value: function (e, t, n, o, r) {
							e.nodes.every((a, i) => {
								const s = e.nodes[i + 1];
								if (void 0 === s || s.start > t) {
									if (!o(a.node)) return !1;
									const s = t - a.start,
										c = (n > a.end ? a.end : n) - a.start,
										l = e.value.substr(0, a.start),
										u = e.value.substr(c + a.start);
									if (
										((a.node = this.wrapRangeInTextNode(a.node, s, c)),
										(e.value = l + u),
										e.nodes.forEach((_, n) => {
											n >= i &&
												(e.nodes[n].start > 0 &&
													n !== i &&
													(e.nodes[n].start -= c),
												(e.nodes[n].end -= c));
										}),
										(n -= c),
										r(a.node.previousSibling, a.start),
										!(n > a.end))
									)
										return !1;
									t = a.end;
								}
								return !0;
							});
						},
					},
					{
						key: "wrapMatches",
						value: function (e, t, n, o, r) {
							const a = 0 === t ? 0 : t + 1;
							this.getTextNodes((t) => {
								t.nodes.forEach((t) => {
									let r;
									for (
										t = t.node;
										null !== (r = e.exec(t.textContent)) && "" !== r[a];
									) {
										if (!n(r[a], t)) continue;
										let i = r.index;
										if (0 !== a) for (let e = 1; e < a; e++) i += r[e].length;
										(t = this.wrapRangeInTextNode(t, i, i + r[a].length)),
											o(t.previousSibling),
											(e.lastIndex = 0);
									}
								}),
									r();
							});
						},
					},
					{
						key: "wrapMatchesAcrossElements",
						value: function (e, t, n, o, r) {
							const a = 0 === t ? 0 : t + 1;
							this.getTextNodes((t) => {
								let i;
								for (; null !== (i = e.exec(t.value)) && "" !== i[a]; ) {
									let r = i.index;
									if (0 !== a) for (let e = 1; e < a; e++) r += i[e].length;
									const s = r + i[a].length;
									this.wrapRangeInMappedTextNode(
										t,
										r,
										s,
										(e) => n(i[a], e),
										(t, n) => {
											(e.lastIndex = n), o(t);
										},
									);
								}
								r();
							});
						},
					},
					{
						key: "normalizeTextNode",
						value: function (e) {
							if (e) {
								if (3 === e.nodeType)
									for (; e.nextSibling && 3 === e.nextSibling.nodeType; )
										(e.nodeValue += e.nextSibling.nodeValue),
											e.parentNode.removeChild(e.nextSibling);
								else this.normalizeTextNode(e.firstChild);
								this.normalizeTextNode(e.nextSibling);
							}
						},
					},
					{
						key: "markRegExp",
						value: function (e, t) {
							this.opt = t;
							let o = 0,
								r = "wrapMatches";
							this.opt.acrossElements && (r = "wrapMatchesAcrossElements"),
								this[r](
									e,
									this.opt.ignoreGroups,
									(e, t) => this.opt.filter(t, e, o),
									(e) => {
										o++, this.opt.each(e);
									},
									() => {
										0 === o && this.opt.noMatch(e), this.opt.done(o);
									},
								);
						},
					},
					{
						key: "opt",
						set: function (e) {
							this._opt = n(
								{},
								{
									element: "",
									className: "",
									exclude: [],
									iframes: !1,
									iframesTimeout: 5e3,
									separateWordSearch: !0,
									diacritics: !0,
									synonyms: {},
									accuracy: "partially",
									acrossElements: !1,
									caseSensitive: !1,
									ignoreJoiners: !1,
									ignoreGroups: 0,
									ignorePunctuation: [],
									wildcards: "disabled",
									each: () => {},
									noMatch: () => {},
									filter: () => !0,
									done: () => {},
									debug: !1,
									log: window.console,
								},
								e,
							);
						},
						get: function () {
							return this._opt;
						},
					},
					{
						key: "iterator",
						get: function () {
							return new o(
								this.ctx,
								this.opt.iframes,
								this.opt.exclude,
								this.opt.iframesTimeout,
							);
						},
					},
				]),
				r
			);
		})();
	return function (e) {
		const t = new r(e);
		return (this.markRegExp = (e, n) => (t.markRegExp(e, n), this)), this;
	};
});

const patterns = {
	dashes: [/—/, /–/],
	words: [
		/\sdelve\s/,
		/\srealm\s/,
		/\spivotal\s/,
		/\scrucial\s/,
		/\senhance\s/,
		/\sleverage\s/,
		/\sembark\s/,
		/\sspearheaded\s/,
	],
	sentences: [
		// comparisons
		/that.{0,1}s not.{1,15}that.{0,1}s about.{1,10}/,
		/that.{0,1}s not.{1,15} it.{0,1}s.{1,10}/,
		/it.{0,1}s not.{1,15} it.{0,1}s about.{1,10}/,
		/it.{0,1}s not about.{1,35} it.{0,1}s about.{1,10}/,
		/but it.{0,1}s less about.{1,15}and more about.{1,10}/,

		// hedging + maneuvering
		/not knocking the approach at all/,
		/no single approach fits all/,
		/and i won.{0,1}t dwell too long on definitions/,
		/fair point. what i mean is/,
		/it.{0,1}s important to note that/,
		/that being said/,
		/on the one hand/,
		/on the other hand/,
		/you might consider/,
		/a few options include/,
		/keep in mind that/,
		/based on your question/,
		/it.{0,1}s worth mentioning that/,
		/according to available information/,
		/you can try the following/,
		/some common approaches include/,
		/it.{0,1}s difficult to say for certain/,
		/it.{0,1}s also possible that/,
		/one potential explanation is/,
		/this depends on the context/,
		/generally speaking/,
		/as mentioned earlier/,
		/as of my knowledge cutoff/,
		/while i can.{0,1}t provide personal opinions/,
		/for example you could/,
		/it.{0,1}s always a good idea to/,
		/please note that/,
		/you may want to consult/,
		/another perspective is/,
		/consider the following/,
		/if you.{0,1}re looking for/,
		/the following steps can help/,
		/the best approach depends on/,
		/as a general rule/,
		/in this context/,
		/it.{0,1}s not possible to know for sure/,
		/based on current knowledge/,
		/there are several factors to consider/,
		/you could try the following steps/,
		/from a technical standpoint/,
		/it may be helpful to/,
		/it seems likely that/,
		/one thing to keep in mind/,
		/it.{0,1}s commonly believed that/,
		/another way to think about this is/,
		/this is a complex topic/,
		/depending on your needs/,
		/the main idea is/,
		/to better understand this/,
		/it.{0,1}s common to/,
		/generally this involves/,
		/you can think of it as/,
		/in laymans terms/,
		/in technical terms/,
		/from a high.{0,1}level perspective/,
		/from a broader perspective/,
		/looking at this from a practical standpoint/,
		/it.{0,1}s also worth noting/,
		/there are pros and cons/,
		/you may encounter situations where/,
		/it.{0,1}s helpful to understand that/,
		/you might find it useful to/,
		/it.{0,1}s a nuanced issue/,
		/it.{0,1}s generally understood that/,
		/it.{0,1}s beneficial to/,
		/there.{0,1}s no one.{0,1}size.{0,1}fits.{0,1}all answer/,
		/we can approach this in multiple ways/,
		/but it.{0,1}s essential to balance this with/,

		// creepy flattery
		/(that|this) line (hit|hits) hard/,
		/you.{0,1}ve clearly.{1,15} and it shows/,
		/i appreciate you sharing your lens/,
		/what you said about.{1,15} really resonates/,
		/incredible.{1,30} (this|that) is exactly the kind of/,
		/really thoughtful breakdown/,
		/that kind of.{1,30} doesn.{0,1}t just/,
		/honestly i'm awed by the approach/,
		/enjoyed the conversation/,
		/so your instinct to.{1,40} really resonates/,
		/that.{0,1}s a really smart approach/,
		/that.{0,1}s a great question/,
		/this raises an interesting point/,
		/you.{0,1}re not alone in wondering this/,
		/you.{0,1}re correct to ask that/,

		// dramatics + hyperbole
		/i learned the hardway/,
		/i learned the hard way/,
		/and i noticed something strange/,
		/let.{0,1}s keep building and protecting/,
		/something shifted for me recently/,

		// unusual gratefulness + helpfulness
		/appreciate the question/,
		/appreciate the question/,
		/appreciate your voice here/,
		/appreciate the thoughtful breakdown/,
		/thanks for the thoughtful response/,
		/absolutely(.{0,5}|)happy it helped/,
		/glad the post resonated/,
		/i.{0,1}m happy to help/,
		/here are some ways you can/,
		/let me know if you.{0,1}d like more details/,
		/thanks for your question/,
		/hope this helps/,
		/feel free to ask if you need more help/,
		/wishing you clarity and strength on your own path/,

		// unusual summarisations + breakdowns
		/to summarize/,
		/in conclusion/,
		/let.{0,1}s break this down/,
		/in other words/,
		/the key takeaway is/,
		/let me explain/,
		/if we break this down/,
		/let.{0,1}s take a closer look/,
		/let.{0,1}s explore this further/,
		/here.{0,1}s a simple explanation/,
		/let.{0,1}s walk through an example/,
		/you might be wondering/,
		/let me break it down/,
		/to put it simply/,
		/here.{0,1}s how it works/,
		/let.{0,1}s say for example/,
		/when it comes to/,
		/this brings us to/,
		/you.{0,1}ll want to ensure that/,
		/the goal here is to/,
		/let.{0,1}s consider a scenario/,
		/to clarify further/,
		/if we consider the fundamentals/,
		/to answer your question directly/,
		/here.{0,1}s what typically happens/,
		/let.{0,1}s look at the bigger picture/,
		/here.{0,1}s a breakdown/,
		/here.{0,1}s a quick overview/,
		/let.{0,1}s walk through the logic/,
		/the underlying idea is/,
		/this topic often leads to confusion/,
		/a simple analogy might help/,
		/to address your concern/,
		/as previously discussed/,
		/let.{0,1}s approach this step by step/,
		/you.{0,1}ll notice that/,
		/with that in mind/,
		/this highlights the importance of/,
		/before diving in let.{0,1}s consider/,
		/let.{0,1}s dive into the main event/,
		/here are a few things to bear in mind/,
		/here are a few of the benefits and drawbacks of/,
		/but here.{0,1}s the thing/,
		/let.{0,1}s cut through the hype/,
	],
};

const getComposedRegex = (regexes, flags = "gi") =>
	new RegExp(`(${regexes.map((regex) => regex.source).join("|")})`, flags);

const start = () => {
	const regex = getComposedRegex([
		...patterns.dashes,
		...patterns.words,
		...patterns.sentences,
	]);

	const options = { exclude: ["mark"] };
	new Mark("div, p, span, h1, h2, h3").markRegExp(regex, options);
};

start();

let debounceTimer = null;

const observer = new MutationObserver(() => {
	if (debounceTimer) clearTimeout(debounceTimer);

	debounceTimer = setTimeout(() => {
		start();
	}, 300);
});

observer.observe(document.body, { childList: true, subtree: true });
