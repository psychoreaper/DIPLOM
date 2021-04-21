!function (t) {
    var e = {};

    function n(o) {
        if (e[o]) return e[o].exports;
        var i = e[o] = {i: o, l: !1, exports: {}};
        return t[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }

    n.m = t, n.c = e, n.d = function (t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: o})
    }, n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) for (var i in t) n.d(o, i, function (e) {
            return t[e]
        }.bind(null, i));
        return o
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 0)
}([function (t, e, n) {
    n(1), n(3), n(4), t.exports = n(5)
}, function (t, e, n) {
    (function (t) {
        (void 0 !== t ? t : window || this.window || this.global).iziToast = function (t) {
            "use strict";
            var e = {}, n = (document.querySelector("body"), !!/Mobi/.test(navigator.userAgent)),
                o = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
                i = "undefined" != typeof InstallTrigger, r = "ontouchstart" in document.documentElement,
                a = ["bottomRight", "bottomLeft", "bottomCenter", "topRight", "topLeft", "topCenter", "center"], s = {};
            e.childrens = {};
            var l = {
                id: null,
                class: "",
                title: "",
                titleColor: "",
                titleSize: "",
                titleLineHeight: "",
                message: "",
                messageColor: "",
                messageSize: "",
                messageLineHeight: "",
                backgroundColor: "",
                theme: "light",
                color: "",
                icon: "",
                iconText: "",
                iconColor: "",
                image: "",
                imageWidth: 50,
                maxWidth: null,
                zindex: null,
                layout: 1,
                balloon: !1,
                close: !0,
                closeOnEscape: !1,
                closeOnClick: !1,
                rtl: !1,
                position: "bottomRight",
                target: "",
                targetFirst: !0,
                toastOnce: !1,
                timeout: 5e3,
                animateInside: !0,
                drag: !0,
                pauseOnHover: !0,
                resetOnHover: !1,
                progressBar: !0,
                progressBarColor: "",
                progressBarEasing: "linear",
                overlay: !1,
                overlayClose: !1,
                overlayColor: "rgba(0, 0, 0, 0.6)",
                transitionIn: "fadeInUp",
                transitionOut: "fadeOut",
                transitionInMobile: "fadeInUp",
                transitionOutMobile: "fadeOutDown",
                buttons: {},
                inputs: {},
                onOpening: function () {
                },
                onOpened: function () {
                },
                onClosing: function () {
                },
                onClosed: function () {
                }
            };
            if ("remove" in Element.prototype || (Element.prototype.remove = function () {
                this.parentNode && this.parentNode.removeChild(this)
            }), "function" != typeof window.CustomEvent) {
                var c = function (t, e) {
                    e = e || {bubbles: !1, cancelable: !1, detail: void 0};
                    var n = document.createEvent("CustomEvent");
                    return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n
                };
                c.prototype = window.Event.prototype, window.CustomEvent = c
            }
            var u = function (t, e, n) {
                if ("[object Object]" === Object.prototype.toString.call(t)) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && e.call(n, t[o], o, t); else if (t) for (var i = 0, r = t.length; i < r; i++) e.call(n, t[i], i, t)
            }, d = function (t, e) {
                var n = {};
                return u(t, (function (e, o) {
                    n[o] = t[o]
                })), u(e, (function (t, o) {
                    n[o] = e[o]
                })), n
            }, h = function (t) {
                var e = document.createDocumentFragment(), n = document.createElement("div");
                for (n.innerHTML = t; n.firstChild;) e.appendChild(n.firstChild);
                return e
            }, p = {
                move: function (t, e, n, r) {
                    var a;
                    0 !== r && (t.classList.add("iziToast-dragged"), t.style.transform = "translateX(" + r + "px)", r > 0 ? (a = (180 - r) / 180) < .3 && e.hide(d(n, {
                        transitionOut: "fadeOutRight",
                        transitionOutMobile: "fadeOutRight"
                    }), t, "drag") : (a = (180 + r) / 180) < .3 && e.hide(d(n, {
                        transitionOut: "fadeOutLeft",
                        transitionOutMobile: "fadeOutLeft"
                    }), t, "drag"), t.style.opacity = a, a < .3 && ((o || i) && (t.style.left = r + "px"), t.parentNode.style.opacity = .3, this.stopMoving(t, null)))
                }, startMoving: function (t, e, n, o) {
                    o = o || window.event;
                    var i = r ? o.touches[0].clientX : o.clientX, a = t.style.transform.replace("px)", ""),
                        s = i - (a = a.replace("translateX(", ""));
                    t.classList.remove(n.transitionIn), t.classList.remove(n.transitionInMobile), t.style.transition = "", r ? document.ontouchmove = function (o) {
                        o.preventDefault();
                        var i = (o = o || window.event).touches[0].clientX - s;
                        p.move(t, e, n, i)
                    } : document.onmousemove = function (o) {
                        o.preventDefault();
                        var i = (o = o || window.event).clientX - s;
                        p.move(t, e, n, i)
                    }
                }, stopMoving: function (t, e) {
                    r ? document.ontouchmove = function () {
                    } : document.onmousemove = function () {
                    }, t.style.opacity = "", t.style.transform = "", t.classList.contains("iziToast-dragged") && (t.classList.remove("iziToast-dragged"), t.style.transition = "transform 0.4s ease, opacity 0.4s ease", setTimeout((function () {
                        t.style.transition = ""
                    }), 400))
                }
            };
            return e.setSetting = function (t, n, o) {
                e.childrens[t][n] = o
            }, e.getSetting = function (t, n) {
                return e.childrens[t][n]
            }, e.destroy = function () {
                u(document.querySelectorAll(".iziToast-wrapper"), (function (t, e) {
                    t.remove()
                })), u(document.querySelectorAll(".iziToast"), (function (t, e) {
                    t.remove()
                })), document.removeEventListener("iziToast-opened", {}, !1), document.removeEventListener("iziToast-opening", {}, !1), document.removeEventListener("iziToast-closing", {}, !1), document.removeEventListener("iziToast-closed", {}, !1), document.removeEventListener("keyup", {}, !1), s = {}
            }, e.settings = function (t) {
                e.destroy(), s = t, l = d(l, t || {})
            }, u({
                info: {color: "blue", icon: "ico-info"},
                success: {color: "green", icon: "ico-success"},
                warning: {color: "orange", icon: "ico-warning"},
                error: {color: "red", icon: "ico-error"},
                question: {color: "yellow", icon: "ico-question"}
            }, (function (t, n) {
                e[n] = function (e) {
                    var n = d(s, e || {});
                    n = d(t, n || {}), this.show(n)
                }
            })), e.progress = function (t, e, n) {
                var o = this, i = e.getAttribute("data-iziToast-ref"), r = d(this.childrens[i], t || {}),
                    a = e.querySelector(".iziToast-progressbar div");
                return {
                    start: function () {
                        void 0 === r.time.REMAINING && (e.classList.remove("iziToast-reseted"), null !== a && (a.style.transition = "width " + r.timeout + "ms " + r.progressBarEasing, a.style.width = "0%"), r.time.START = (new Date).getTime(), r.time.END = r.time.START + r.timeout, r.time.TIMER = setTimeout((function () {
                            clearTimeout(r.time.TIMER), e.classList.contains("iziToast-closing") || (o.hide(r, e, "timeout"), "function" == typeof n && n.apply(o))
                        }), r.timeout), o.setSetting(i, "time", r.time))
                    }, pause: function () {
                        if (void 0 !== r.time.START && !e.classList.contains("iziToast-paused") && !e.classList.contains("iziToast-reseted")) {
                            if (e.classList.add("iziToast-paused"), r.time.REMAINING = r.time.END - (new Date).getTime(), clearTimeout(r.time.TIMER), o.setSetting(i, "time", r.time), null !== a) {
                                var t = window.getComputedStyle(a).getPropertyValue("width");
                                a.style.transition = "none", a.style.width = t
                            }
                            "function" == typeof n && setTimeout((function () {
                                n.apply(o)
                            }), 10)
                        }
                    }, resume: function () {
                        void 0 !== r.time.REMAINING ? (e.classList.remove("iziToast-paused"), null !== a && (a.style.transition = "width " + r.time.REMAINING + "ms " + r.progressBarEasing, a.style.width = "0%"), r.time.END = (new Date).getTime() + r.time.REMAINING, r.time.TIMER = setTimeout((function () {
                            clearTimeout(r.time.TIMER), e.classList.contains("iziToast-closing") || (o.hide(r, e, "timeout"), "function" == typeof n && n.apply(o))
                        }), r.time.REMAINING), o.setSetting(i, "time", r.time)) : this.start()
                    }, reset: function () {
                        clearTimeout(r.time.TIMER), delete r.time.REMAINING, o.setSetting(i, "time", r.time), e.classList.add("iziToast-reseted"), e.classList.remove("iziToast-paused"), null !== a && (a.style.transition = "none", a.style.width = "100%"), "function" == typeof n && setTimeout((function () {
                            n.apply(o)
                        }), 10)
                    }
                }
            }, e.hide = function (t, e, o) {
                var i = this, r = d(this.childrens[e.getAttribute("data-iziToast-ref")], t || {});
                r.closedBy = o || null, delete r.time.REMAINING, "object" != typeof e && (e = document.querySelector(e)), e.classList.add("iziToast-closing"), function () {
                    var t = document.querySelector(".iziToast-overlay");
                    if (null !== t) {
                        var e = t.getAttribute("data-iziToast-ref"), n = (e = e.split(",")).indexOf(String(r.ref));
                        -1 !== n && e.splice(n, 1), t.setAttribute("data-iziToast-ref", e.join()), 0 === e.length && (t.classList.remove("fadeIn"), t.classList.add("fadeOut"), setTimeout((function () {
                            t.remove()
                        }), 700))
                    }
                }(), (r.transitionIn || r.transitionInMobile) && (e.classList.remove(r.transitionIn), e.classList.remove(r.transitionInMobile)), n || window.innerWidth <= 568 ? r.transitionOutMobile && e.classList.add(r.transitionOutMobile) : r.transitionOut && e.classList.add(r.transitionOut);
                var a = e.parentNode.offsetHeight;
                e.parentNode.style.height = a + "px", e.style.pointerEvents = "none", (!n || window.innerWidth > 568) && (e.parentNode.style.transitionDelay = "0.2s");
                try {
                    var s = new CustomEvent("iziToast-closing", {detail: r, bubbles: !0, cancelable: !0});
                    document.dispatchEvent(s)
                } catch (t) {
                    console.warn(t)
                }
                setTimeout((function () {
                    e.parentNode.style.height = "0px", e.parentNode.style.overflow = "", setTimeout((function () {
                        delete i.childrens[r.ref], e.parentNode.remove();
                        try {
                            var t = new CustomEvent("iziToast-closed", {detail: r, bubbles: !0, cancelable: !0});
                            document.dispatchEvent(t)
                        } catch (t) {
                            console.warn(t)
                        }
                        void 0 !== r.onClosed && r.onClosed.apply(null, [r, e, o])
                    }), 1e3)
                }), 200), void 0 !== r.onClosing && r.onClosing.apply(null, [r, e, o])
            }, e.show = function (t) {
                var o = this, i = d(s, t || {});
                if ((i = d(l, i)).time = {}, i.toastOnce && i.id && document.querySelectorAll(".iziToast#" + i.id).length > 0) return !1;
                i.ref = (new Date).getTime() + Math.floor(1e7 * Math.random() + 1), e.childrens[i.ref] = i;
                var c, g = {
                    body: document.querySelector("body"),
                    overlay: document.createElement("div"),
                    toast: document.createElement("div"),
                    toastBody: document.createElement("div"),
                    toastTexts: document.createElement("div"),
                    toastCapsule: document.createElement("div"),
                    icon: document.createElement("i"),
                    cover: document.createElement("div"),
                    buttons: document.createElement("div"),
                    inputs: document.createElement("div"),
                    wrapper: null
                };
                g.toast.setAttribute("data-iziToast-ref", i.ref), g.toast.appendChild(g.toastBody), g.toastCapsule.appendChild(g.toast), function () {
                    if (g.toast.classList.add("iziToast"), g.toast.classList.add("iziToast-opening"), g.toastCapsule.classList.add("iziToast-capsule"), g.toastBody.classList.add("iziToast-body"), g.toastTexts.classList.add("iziToast-texts"), n || window.innerWidth <= 568 ? i.transitionInMobile && g.toast.classList.add(i.transitionInMobile) : i.transitionIn && g.toast.classList.add(i.transitionIn), i.class) {
                        var t = i.class.split(" ");
                        u(t, (function (t, e) {
                            g.toast.classList.add(t)
                        }))
                    }
                    var e;
                    i.id && (g.toast.id = i.id), i.rtl && (g.toast.classList.add("iziToast-rtl"), g.toast.setAttribute("dir", "rtl")), i.layout > 1 && g.toast.classList.add("iziToast-layout" + i.layout), i.balloon && g.toast.classList.add("iziToast-balloon"), i.maxWidth && (isNaN(i.maxWidth) ? g.toast.style.maxWidth = i.maxWidth : g.toast.style.maxWidth = i.maxWidth + "px"), "" === i.theme && "light" === i.theme || g.toast.classList.add("iziToast-theme-" + i.theme), i.color && ("#" == (e = i.color).substring(0, 1) || "rgb" == e.substring(0, 3) || "hsl" == e.substring(0, 3) ? g.toast.style.background = i.color : g.toast.classList.add("iziToast-color-" + i.color)), i.backgroundColor && (g.toast.style.background = i.backgroundColor, i.balloon && (g.toast.style.borderColor = i.backgroundColor))
                }(), i.image && (g.cover.classList.add("iziToast-cover"), g.cover.style.width = i.imageWidth + "px", function (t) {
                    try {
                        return btoa(atob(t)) == t
                    } catch (t) {
                        return !1
                    }
                }(i.image.replace(/ /g, "")) ? g.cover.style.backgroundImage = "url(data:image/png;base64," + i.image.replace(/ /g, "") + ")" : g.cover.style.backgroundImage = "url(" + i.image + ")", i.rtl ? g.toastBody.style.marginRight = i.imageWidth + 10 + "px" : g.toastBody.style.marginLeft = i.imageWidth + 10 + "px", g.toast.appendChild(g.cover)), i.close ? (g.buttonClose = document.createElement("button"), g.buttonClose.classList.add("iziToast-close"), g.buttonClose.addEventListener("click", (function (t) {
                    t.target, o.hide(i, g.toast, "button")
                })), g.toast.appendChild(g.buttonClose)) : i.rtl ? g.toast.style.paddingLeft = "18px" : g.toast.style.paddingRight = "18px", i.progressBar && (g.progressBar = document.createElement("div"), g.progressBarDiv = document.createElement("div"), g.progressBar.classList.add("iziToast-progressbar"), g.progressBarDiv.style.background = i.progressBarColor, g.progressBar.appendChild(g.progressBarDiv), g.toast.appendChild(g.progressBar)), i.timeout && (i.pauseOnHover && !i.resetOnHover && (g.toast.addEventListener("mouseenter", (function (t) {
                    o.progress(i, g.toast).pause()
                })), g.toast.addEventListener("mouseleave", (function (t) {
                    o.progress(i, g.toast).resume()
                }))), i.resetOnHover && (g.toast.addEventListener("mouseenter", (function (t) {
                    o.progress(i, g.toast).reset()
                })), g.toast.addEventListener("mouseleave", (function (t) {
                    o.progress(i, g.toast).start()
                })))), i.icon && (g.icon.setAttribute("class", "iziToast-icon " + i.icon), i.iconText && g.icon.appendChild(document.createTextNode(i.iconText)), i.rtl ? g.toastBody.style.paddingRight = "33px" : g.toastBody.style.paddingLeft = "33px", i.iconColor && (g.icon.style.color = i.iconColor), g.toastBody.appendChild(g.icon)), i.title.length > 0 && (g.strong = document.createElement("strong"), g.strong.classList.add("iziToast-title"), g.strong.appendChild(h(i.title)), g.toastTexts.appendChild(g.strong), i.titleColor && (g.strong.style.color = i.titleColor), i.titleSize && (isNaN(i.titleSize) ? g.strong.style.fontSize = i.titleSize : g.strong.style.fontSize = i.titleSize + "px"), i.titleLineHeight && (isNaN(i.titleSize) ? g.strong.style.lineHeight = i.titleLineHeight : g.strong.style.lineHeight = i.titleLineHeight + "px")), i.message.length > 0 && (g.p = document.createElement("p"), g.p.classList.add("iziToast-message"), g.p.appendChild(h(i.message)), g.toastTexts.appendChild(g.p), i.messageColor && (g.p.style.color = i.messageColor), i.messageSize && (isNaN(i.titleSize) ? g.p.style.fontSize = i.messageSize : g.p.style.fontSize = i.messageSize + "px"), i.messageLineHeight && (isNaN(i.titleSize) ? g.p.style.lineHeight = i.messageLineHeight : g.p.style.lineHeight = i.messageLineHeight + "px")), i.title.length > 0 && i.message.length > 0 && (i.rtl ? g.strong.style.marginLeft = "10px" : 2 === i.layout || i.rtl || (g.strong.style.marginRight = "10px")), g.toastBody.appendChild(g.toastTexts), i.inputs.length > 0 && (g.inputs.classList.add("iziToast-inputs"), u(i.inputs, (function (t, e) {
                    g.inputs.appendChild(h(t[0])), (c = g.inputs.childNodes)[e].classList.add("iziToast-inputs-child"), t[3] && setTimeout((function () {
                        c[e].focus()
                    }), 300), c[e].addEventListener(t[1], (function (e) {
                        return (0, t[2])(o, g.toast, this, e)
                    }))
                })), g.toastBody.appendChild(g.inputs)), i.buttons.length > 0 && (g.buttons.classList.add("iziToast-buttons"), u(i.buttons, (function (t, e) {
                    g.buttons.appendChild(h(t[0]));
                    var n = g.buttons.childNodes;
                    n[e].classList.add("iziToast-buttons-child"), t[2] && setTimeout((function () {
                        n[e].focus()
                    }), 300), n[e].addEventListener("click", (function (e) {
                        return e.preventDefault(), (0, t[1])(o, g.toast, this, e, c)
                    }))
                }))), g.toastBody.appendChild(g.buttons), i.message.length > 0 && (i.inputs.length > 0 || i.buttons.length > 0) && (g.p.style.marginBottom = "0"), (i.inputs.length > 0 || i.buttons.length > 0) && (i.rtl ? g.toastTexts.style.marginLeft = "10px" : g.toastTexts.style.marginRight = "10px", i.inputs.length > 0 && i.buttons.length > 0 && (i.rtl ? g.inputs.style.marginLeft = "8px" : g.inputs.style.marginRight = "8px")), g.toastCapsule.style.visibility = "hidden", setTimeout((function () {
                    var t = g.toast.offsetHeight, e = g.toast.currentStyle || window.getComputedStyle(g.toast),
                        n = e.marginTop;
                    n = n.split("px"), n = parseInt(n[0]);
                    var r = e.marginBottom;
                    r = r.split("px"), r = parseInt(r[0]), g.toastCapsule.style.visibility = "", g.toastCapsule.style.height = t + r + n + "px", setTimeout((function () {
                        g.toastCapsule.style.height = "auto", i.target && (g.toastCapsule.style.overflow = "visible")
                    }), 500), i.timeout && o.progress(i, g.toast).start()
                }), 100), function () {
                    var t = i.position;
                    if (i.target) g.wrapper = document.querySelector(i.target), g.wrapper.classList.add("iziToast-target"), i.targetFirst ? g.wrapper.insertBefore(g.toastCapsule, g.wrapper.firstChild) : g.wrapper.appendChild(g.toastCapsule); else {
                        if (-1 == a.indexOf(i.position)) return void console.warn("[iziToast] Incorrect position.\nIt can be › " + a);
                        t = n || window.innerWidth <= 568 ? "bottomLeft" == i.position || "bottomRight" == i.position || "bottomCenter" == i.position ? "iziToast-wrapper-bottomCenter" : "topLeft" == i.position || "topRight" == i.position || "topCenter" == i.position ? "iziToast-wrapper-topCenter" : "iziToast-wrapper-center" : "iziToast-wrapper-" + t, g.wrapper = document.querySelector(".iziToast-wrapper." + t), g.wrapper || (g.wrapper = document.createElement("div"), g.wrapper.classList.add("iziToast-wrapper"), g.wrapper.classList.add(t), document.body.appendChild(g.wrapper)), "topLeft" == i.position || "topCenter" == i.position || "topRight" == i.position ? g.wrapper.insertBefore(g.toastCapsule, g.wrapper.firstChild) : g.wrapper.appendChild(g.toastCapsule)
                    }
                    isNaN(i.zindex) ? console.warn("[iziToast] Invalid zIndex.") : g.wrapper.style.zIndex = i.zindex
                }(), i.overlay && (null !== document.querySelector(".iziToast-overlay.fadeIn") ? (g.overlay = document.querySelector(".iziToast-overlay"), g.overlay.setAttribute("data-iziToast-ref", g.overlay.getAttribute("data-iziToast-ref") + "," + i.ref), isNaN(i.zindex) || null === i.zindex || (g.overlay.style.zIndex = i.zindex - 1)) : (g.overlay.classList.add("iziToast-overlay"), g.overlay.classList.add("fadeIn"), g.overlay.style.background = i.overlayColor, g.overlay.setAttribute("data-iziToast-ref", i.ref), isNaN(i.zindex) || null === i.zindex || (g.overlay.style.zIndex = i.zindex - 1), document.querySelector("body").appendChild(g.overlay)), i.overlayClose ? (g.overlay.removeEventListener("click", {}), g.overlay.addEventListener("click", (function (t) {
                    o.hide(i, g.toast, "overlay")
                }))) : g.overlay.removeEventListener("click", {})), function () {
                    if (i.animateInside) {
                        g.toast.classList.add("iziToast-animateInside");
                        var t = [200, 100, 300];
                        "bounceInLeft" != i.transitionIn && "bounceInRight" != i.transitionIn || (t = [400, 200, 400]), i.title.length > 0 && setTimeout((function () {
                            g.strong.classList.add("slideIn")
                        }), t[0]), i.message.length > 0 && setTimeout((function () {
                            g.p.classList.add("slideIn")
                        }), t[1]), i.icon && setTimeout((function () {
                            g.icon.classList.add("revealIn")
                        }), t[2]);
                        var e = 150;
                        i.buttons.length > 0 && g.buttons && setTimeout((function () {
                            u(g.buttons.childNodes, (function (t, n) {
                                setTimeout((function () {
                                    t.classList.add("revealIn")
                                }), e), e += 150
                            }))
                        }), i.inputs.length > 0 ? 150 : 0), i.inputs.length > 0 && g.inputs && (e = 150, u(g.inputs.childNodes, (function (t, n) {
                            setTimeout((function () {
                                t.classList.add("revealIn")
                            }), e), e += 150
                        })))
                    }
                }(), i.onOpening.apply(null, [i, g.toast]);
                try {
                    var f = new CustomEvent("iziToast-opening", {detail: i, bubbles: !0, cancelable: !0});
                    document.dispatchEvent(f)
                } catch (t) {
                    console.warn(t)
                }
                setTimeout((function () {
                    g.toast.classList.remove("iziToast-opening"), g.toast.classList.add("iziToast-opened");
                    try {
                        var t = new CustomEvent("iziToast-opened", {detail: i, bubbles: !0, cancelable: !0});
                        document.dispatchEvent(t)
                    } catch (t) {
                        console.warn(t)
                    }
                    i.onOpened.apply(null, [i, g.toast])
                }), 1e3), i.drag && (r ? (g.toast.addEventListener("touchstart", (function (t) {
                    p.startMoving(this, o, i, t)
                }), !1), g.toast.addEventListener("touchend", (function (t) {
                    p.stopMoving(this, t)
                }), !1)) : (g.toast.addEventListener("mousedown", (function (t) {
                    t.preventDefault(), p.startMoving(this, o, i, t)
                }), !1), g.toast.addEventListener("mouseup", (function (t) {
                    t.preventDefault(), p.stopMoving(this, t)
                }), !1))), i.closeOnEscape && document.addEventListener("keyup", (function (t) {
                    27 == (t = t || window.event).keyCode && o.hide(i, g.toast, "esc")
                })), i.closeOnClick && g.toast.addEventListener("click", (function (t) {
                    o.hide(i, g.toast, "toast")
                })), o.toast = g.toast
            }, e
        }()
    }).call(this, n(2))
}, function (t, e) {
    var n;
    n = function () {
        return this
    }();
    try {
        n = n || new Function("return this")()
    } catch (t) {
        "object" == typeof window && (n = window)
    }
    t.exports = n
}, function (module, exports) {
    window.Unidata = window.Unidata || {}, Unidata.Microloader = function () {
        var Microloader = {
            isFunction: function (t) {
                return Boolean(t) && "function" == typeof t
            }, Array: {
                indexOf: function (t, e, n) {
                    return Array.prototype.indexOf.call(t, e, n)
                }, unique: function (t) {
                    for (var e, n = [], o = 0, i = t.length; o < i; o++) e = t[o], -1 === Microloader.Array.indexOf(n, e) && n.push(e);
                    return n
                }, each: function (t, e, n, o) {
                    var i, r = t.length;
                    if (!0 !== o) {
                        for (i = 0; i < r; i++) if (!1 === e.call(n || t[i], t[i], i, t)) return i
                    } else for (i = r - 1; i > -1; i--) if (!1 === e.call(n || t[i], t[i], i, t)) return i;
                    return !0
                }
            }, Object: {
                isEmpty: function (t) {
                    var e;
                    for (e in t) if (t.hasOwnProperty(e)) return !1;
                    return !0
                }
            }, String: {
                trim: function (t) {
                    var e;
                    return e = /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g, t && (t = t.replace(e, "")), t || ""
                }
            }, chain: function () {
                function t(t, e) {
                    return function (n, o, i) {
                        t(n, (function (t) {
                            return e(t, o, i)
                        }), i)
                    }
                }

                return function () {
                    for (var e = Array.prototype.slice.call(arguments), n = e.shift(); e.length > 0;) n = t(n, e.shift());
                    return n
                }
            }(), loadJson: function (t, e, n) {
                aja().url(t).cache(!1).type("html").on("success", (function (t) {
                    e(t)
                })).on("error", (function () {
                    n()
                })).on("40x", (function () {
                    n()
                })).on("50x", (function () {
                    n()
                })).go()
            }, loadScript: function (t, e, n) {
                aja().url(t).cache(!1).type("script").on("success", (function (t) {
                    e(t)
                })).on("error", (function () {
                    n()
                })).on("40x", (function () {
                    n()
                })).on("50x", (function () {
                    n()
                })).go()
            }, runMicroloader: function () {
                Unidata.Microloader.chain(Unidata.Microloader.loadInternationalizationLib, Unidata.Microloader.initUnidataInternationalizationClass, Unidata.Microloader.loadInternationalizationJson, Unidata.Microloader.fetchPlatformConfig, Unidata.Microloader.fetchUnidataReactApp, Unidata.Microloader.bootstrapExtJsApplication)()
            }, loadCustomerJson: function (data, nextCallback) {
                var url;
                Microloader.Object.isEmpty(window.customerConfig) ? (url = Unidata.Microloader.buildCustomerUrl("customer.json"), Microloader.loadJson(url, (function (jsonData) {
                    try {
                        window.customerConfig = eval("(" + jsonData + ")")
                    } catch (t) {
                        return void console.log("Unidata microloader: can not parse customer.json")
                    }
                    window.customerConfig.LOCALE = window.customerConfig.LOCALE ? window.customerConfig.LOCALE : "ru", Microloader.isFunction(nextCallback) && nextCallback()
                }), (function () {
                    console.log("Error: customer.json load failure"), alert("customer.json load failure")
                }))) : Microloader.isFunction(nextCallback) && nextCallback()
            }, initUnidataCustomerCustomization: function (t, e) {
                var n = window.location.search.match(/(\?|&)action\=([^&]*)/),
                    o = window.customerConfig.serverUrl + "internal/authentication/logout",
                    i = localStorage.getItem("ud-token");
                n && "logout" === n[2] ? aja().url(o).method("POST").header("Authorization", i).header("Content-Type", "application/json").cache(!1).on("success", (function () {
                    document.write("Произошел выход из системы")
                })).on("error", (function () {
                    document.write("Выход из системы не произведен из-за ошибки")
                })).go() : Microloader.isFunction(e) && e()
            }, loadInternationalizationLib: function (t, e) {
                Microloader.loadScript("vendors/i18next.min.js", (function () {
                    console.log("Unidata microloader: i18next loaded"), i18next.init({
                        fallbackLng: "ru",
                        ns: ["common", "default", "glossary", "validation"],
                        defaultNS: "default",
                        initImmediate: !0,
                        debug: !0,
                        lng: window.customerConfig.LOCALE,
                        keySeparator: ">",
                        interpolation: {
                            format: function (t, e) {
                                return "uppercase" === e ? t.toUpperCase() : "lowercase" === e ? t.toLowerCase() : t
                            }
                        }
                    }, (function (t) {
                        t && console.log("Unidata microloader: i18next something went wrong", t)
                    })), Microloader.isFunction(e) && e()
                }), (function () {
                }))
            }, initUnidataInternationalizationClass: function (t, e) {
                Unidata.i18n = window.i18next, Microloader.isFunction(e) && e()
            }, loadInternationalizationJson: function (t, e) {
                var n, o, i, r = 0, a = 0, s = [];
                o = ["common", "default", "glossary", "validation", "wiki"], i = window.customerConfig.LOCALE, s.push("ru"), s.push(i), s = Microloader.Array.unique(s), o = Microloader.Array.unique(o), n = s.length * o.length, Microloader.Array.each(s, (function (t) {
                    Microloader.Array.each(o, (function (o) {
                        Microloader.loadJson("resources/locale/" + t + "/" + t + "-" + o + ".json", (function (i) {
                            r += 1, console.log("Unidata microloader: i18next json loaded", t, o);
                            try {
                                i = JSON.parse(i), i = Unidata.Micrologin.transformResourceBundle(t, o, i), i18next.addResourceBundle(t, o, i)
                            } catch (e) {
                                console.log("Unidata microloader: can not parse i18next json", t, o)
                            }
                            if (r === n) Microloader.isFunction(e) && e(); else if (r + a === n) return void console.log("Unidata microloader: can not load i18n json")
                        }), (function () {
                            a += 1
                        }))
                    }))
                }))
            }, fetchPlatformConfig: function (t, e) {
                var n = Unidata.Microloader.buildServerUrl("internal/configuration/unidata.properties.group.validity"),
                    o = localStorage.getItem("ud-token");
                Unidata.Micrologin && Unidata.Micrologin.authenticateData && Unidata.Micrologin.authenticateData.forceLicenseChange ? Microloader.isFunction(e) && e() : $.ajax({
                    url: n,
                    method: "GET",
                    data: {_dc: Number(new Date)},
                    headers: {Authorization: o},
                    success: function (t, n, o) {
                        var i, r, a = t;
                        o && 200 === o.status && a && (Microloader.Array.each(a, (function (t) {
                            if ("unidata.validity.period.start" === t.name) return i = t.value, !1
                        })), Microloader.Array.each(a, (function (t) {
                            if ("unidata.validity.period.end" === t.name) return r = t.value, !1
                        })), window.platformConfig = {VALIDITY_DATES: {}}, window.platformConfig.VALIDITY_DATES.START = i, window.platformConfig.VALIDITY_DATES.END = r), Microloader.isFunction(e) && e()
                    },
                    failure: function (t) {
                        t && console.log("Unidata microloader: error while trying to fetch platform config", t)
                    }
                })
            }, fetchUnidataReactApp: function (t, e) {
                var n = window.customerConfig, o = !1;
                return n && "dev" === n.APP_MODE && n.serverUrlReact && n.serverUrlReact.length && (o = !0), o ? Microloader.fetchUnidataReactAppDev(t, e) : Microloader.fetchUnidataReactAppProd(t, e)
            }, fetchUnidataReactAppProd: function (t, e) {
                $.ajax({
                    url: "script_inject.html", data: {_dc: Number(new Date)}, success: function (t) {
                        $("head").append(t), window.addEventListener("unidata-react-initialized", (function () {
                            Microloader.isFunction(e) && e()
                        }))
                    }, error: function (t) {
                        t && console.log("Unidata microloader: error while trying to fetch react-app resources", t), e()
                    }, complete: function () {
                    }
                })
            }, fetchUnidataReactAppDev: function (t, e) {
                var n = window.customerConfig.serverUrlReact;
                n = n.replace(/\/+$/, "").replace(/\\+$/, ""), $.ajax({
                    url: n + "/script_inject_dev.html",
                    data: {_dc: Number(new Date)},
                    success: function (t) {
                        var e = t.replace(/\n/g, "").replace(/\r/g, "").match(/^.+WebpackInjectCfg(.+)WebpackInjectCfg.+$/),
                            o = "";
                        e[1] && (JSON.parse(e[1]).files.js.forEach((function (t) {
                            o += '<script type="text/javascript" src="' + n + t + '"><\/script>'
                        })), $("head").append(o))
                    },
                    failure: function (t) {
                        t && console.log("Unidata microloader: error while trying to fetch react-app-dev resources", t)
                    },
                    complete: function () {
                        Microloader.isFunction(e) && e()
                    }
                })
            }, bootstrapExtJsApplication: function () {
                var t = document.createElement("script"), e = document.querySelectorAll("body")[0],
                    n = window.customerConfig.LOCALE;
                window.Ext = window.Ext || {}, n && "@BUILD_DATE@" !== window.unidataBuildDate && (window.Ext.manifest = "app-" + n + ".json"), t.type = "text/javascript", t.src = "bootstrap.js?_dc=" + Number(new Date), e.appendChild ? e.appendChild(t) : e.append(t)
            }, buildServerUrl: function (t) {
                var e = window.customerConfig, n = "";
                return e && (n = e.serverUrl), n + t
            }, buildCustomerUrl: function (t) {
                var e = Unidata.Microloader.String.trim(String(window.customerUrl));
                return (e = e.replace(/\/+$/, "").replace(/\\+$/, "")).length && (e += "/"), e + t
            }
        };
        return Microloader
    }()
}, function (t, e) {
    window.Unidata = window.Unidata || {}, Unidata.Micrologin = {
        dom: null,
        panelHeader: null,
        loginTab: null,
        warningTab: null,
        restoreTab: null,
        nameInput: null,
        passwordInput: null,
        nameInputWrap: null,
        passwordInputWrap: null,
        loginButton: null,
        localeSwitch: null,
        localeMenu: null,
        logoContainer: null,
        wrongAuthorizationText: null,
        warningTabTitle: null,
        warningTabText: null,
        warningTabBackButton: null,
        restorePasswordTitle: null,
        restorePasswordDescription: null,
        restoreTabInput: null,
        restoreTabInputLabel: null,
        restoreTabEmailInput: null,
        or: null,
        restoreButton: null,
        wrongRestoreText: null,
        passwordWasSent: null,
        forgotPasswordLink: null,
        restoreTabGoBackLink: null,
        focusCls: "focused",
        bodyCls: "un-login-body",
        authenticateData: null,
        locale: "ru",
        warningErrorCode: null,
        platformFaviconUrl: "resources/favicon.ico?v=6",
        platformTitle: "Unidata",
        translates: {
            ru: {
                signInButton: "Войти",
                namePlaceholder: "Имя пользователя",
                passwordPlaceholder: "Пароль",
                warningTabTitle: "ВНИМАНИЕ!",
                warningTabText: "Срок действия лицензии истек",
                licenseeHardwareSecurityText: "UUID установленной лицензии не совпадает с UUID сервера Юнидата",
                warningTabBackButton: "Назад",
                wrongAuthorizationText: "Неправильный логин или пароль.<br>Повторите еще раз.",
                unknownError: "Ошибка связи с сервером. Обратитесь к администратору системы.",
                disallowAdminAppModeText: "Недостаточно прав для входа в раздел администрирования",
                restorePasswordTitle: "Выслать временный пароль",
                restorePasswordDescription: "На ваш почтовый адрес придет новый пароль и инструкция по восстановлению доступа.",
                restoreButton: "Выслать пароль",
                labelLogin: "Введите логин:",
                emailPlaceholder: "Почтовый адрес",
                wrongLoginOrEmail: "Неправильный логин / почтовый адрес",
                forgotPassword: "Забыли пароль?",
                passwordWasSent: "Временный пароль выслан на ваш email. Повторная отправка будет доступна через: ",
                cancel: "Отмена",
                or: "или"
            },
            en: {
                signInButton: "Log in",
                namePlaceholder: "Username",
                passwordPlaceholder: "Password",
                warningTabTitle: "ATTENTION!",
                warningTabText: "The license has expired",
                licenseeHardwareSecurityText: "UUID of the installed license does not match the UUID of the server",
                warningTabBackButton: "Back",
                wrongAuthorizationText: "Incorrect login or password. <br> Please try again.",
                unknownError: "Error communicating with the server. Contact your system administrator.",
                disallowAdminAppModeText: "You have insufficient login rights to administration panel",
                restorePasswordTitle: "Send temp password",
                restorePasswordDescription: "New password and instructions will be sent to your email.",
                restoreButton: "Send password",
                labelLogin: "Enter login:",
                emailPlaceholder: "Email",
                wrongLoginOrEmail: "Login / email is wrong",
                forgotPassword: "Forgot your password?",
                passwordWasSent: "New password was sent to email.",
                cancel: "Cancel",
                or: "or"
            }
        },
        initComponent: function () {
            var t, e = document.querySelector("#logintpl"), n = this.getUrlParams(),
                o = this.readFromLocalStorage("restorePasswordDelay");
            e && ((t = $(e.innerHTML)).appendTo($("body")), $("body").addClass(this.bodyCls), t.addClass(this.getPlatformBackgroundCls()), t.addClass(this.getBackgroundCls()), this.dom = t.get(0), this.initComponentReference(), this.initComponentEvent(), this.initCustomization(), this.showTab(this.loginTab), $(this.wrongAuthorizationText).hide(), $(this.logoContainer).append(Unidata.Micrologin.getLogoTpl()), this.disableLoginButton(), window.customerConfig && window.customerConfig.LOCALE && this.setLocale(window.customerConfig.LOCALE), this.updatePlatformFavicon(), this.updatePlatformTitle(), n.activationCode && (this.activateTempRestorePassword(n.activationCode), window.history.pushState(null, null, window.location.href.substring(0, window.location.href.indexOf("?activationCode"))), window.history.pushState(null, null, window.location.href.substring(0, window.location.href.indexOf("&activationCode")))), o && (this.restorePasswordDelay = o, setTimeout(this.setRestorePasswordTimer.bind(this), 1e3)))
        },
        destroyComponent: function () {
            $("body").removeClass(this.bodyCls), $(this.dom).remove()
        },
        initComponentReference: function () {
            var t = $(this.dom);
            t && (this.panelHeader = t.find(".panel-heading").get(0), this.loginTab = t.find(".un-login-tab").get(0), this.warningTab = t.find(".un-warning-tab").get(0), this.restoreTab = t.find(".un-restore-tab").get(0), this.nameInput = t.find("input[type=text]").get(0), this.passwordInput = t.find("input[type=password]").get(0), this.nameInputWrap = t.find(".form-group:has(input[type=text])").get(0), this.passwordInputWrap = t.find(".form-group:has(input[type=password])").get(0), this.localeSwitch = t.find(".un-local-switch").get(0), this.localeMenu = $(this.localeSwitch).find(".menu").get(0), this.logoContainer = t.find(".logo-container").get(0), this.wrongAuthorizationText = $(this.loginTab).find("[role=wrong-authorization-text]").get(0), this.loginButton = $(this.loginTab).find(".btn").get(0), this.warningTabTitle = $(this.warningTab).find("[role=warning-title]").get(0), this.warningTabText = $(this.warningTab).find("[role=warning-text]").get(0), this.warningTabBackButton = $(this.warningTab).find("[role=warningtab-back-btn]").get(0), this.forgotPasswordLink = t.find("[role=forgot-password]").get(0), this.restorePasswordTitle = $(this.restoreTab).find("[role=restore-password-title]").get(0), this.restorePasswordDescription = $(this.restoreTab).find("[role=restore-password-description]").get(0), this.restoreTabInput = $(this.restoreTab).find("input[type=text]").get(0), this.restoreTabInputLabel = $(this.restoreTab).find("[role=login]").get(0), this.restoreTabEmailInput = $(this.restoreTab).find("input[type=text]").get(1), this.or = $(this.restoreTab).find("[role=or]").get(0), this.restoreButton = $(this.restoreTab).find(".btn").get(0), this.wrongRestoreText = $(this.restoreTab).find("[role=wrong-restore-text]").get(0), this.passwordWasSent = $(this.restoreTab).find("[role=password-was-sent]").get(0), this.restoreTabGoBackLink = $(this.restoreTab).find("[role=go-back]").get(0))
        },
        initComponentEvent: function () {
            $("body").bind("click", this.onBodyClick.bind(this)), $(this.nameInput).bind("focus", this.onNameInputFocus.bind(this)), $(this.nameInput).bind("blur", this.onNameInputBlur.bind(this)), $(this.passwordInput).bind("focus", this.onPasswordInputFocus.bind(this)), $(this.passwordInput).bind("blur", this.onPasswordInputBlur.bind(this)), $(this.nameInput).bind("keydown", this.onNameInputKeyDown.bind(this)), $(this.passwordInput).bind("keydown", this.onPasswordInputKeyDown.bind(this)), $(this.nameInput).bind("change paste keydown", this.onNameInputChange.bind(this)), $(this.passwordInput).bind("change paste keydown", this.onPasswordInputChange.bind(this)), $(this.loginButton).bind("click", this.onLoginButtonClick.bind(this)), $(this.warningTabBackButton).bind("click", this.onWarningTabBackButtonClick.bind(this)), $(this.localeSwitch).find(".menu-wrap a").bind("click", this.onLocaleSwitchItemClick.bind(this)), $(this.localeSwitch).bind("click", this.onLocaleSwitchClick.bind(this)), $(this.forgotPasswordLink).bind("click", this.onForgetPasswordLinkClick.bind(this)), $(this.restoreTabInput).bind("keyup", this.onRestoreTabLoginInputChange.bind(this)), $(this.restoreTabEmailInput).bind("keyup", this.onRestoreTabEmailInputChange.bind(this)), $(this.restoreButton).bind("click", this.onRestoreButtonClick.bind(this)), $(this.restoreButton).bind("click", this.onRestoreButtonClick.bind(this)), $(this.restoreTabGoBackLink).bind("click", this.onWarningTabBackButtonClick.bind(this))
        },
        runMicrologin: function () {
            var t = Unidata.Micrologin.getQueryParam("sso");
            "true" === t || "on" === t ? Unidata.Micrologin.doSsoAuthorization() : Unidata.Micrologin.getToken() ? Unidata.Micrologin.doTokenAuthorization() : Unidata.Micrologin.initComponent()
        },
        runMicroloader: function () {
            Unidata.Microloader.runMicroloader()
        },
        authorizationGuard: function (t) {
            return t = t || {}, !("admin" === window.customerConfig.APP_MODE && !this.allowAdminAppMode(t)) || "DISALLOW_ADMIN_APP_MODE"
        },
        allowAdminAppMode: function (t) {
            var e, n, o = !1;
            return !!(t && t.userInfo && t.userInfo.admin) || (n = ["ADMIN_CLASSIFIER_MANAGEMENT", "ADMIN_DATA_MANAGEMENT", "ADMIN_MATCHING_MANAGEMENT", "ADMIN_SYSTEM_MANAGEMENT", "USER_MANAGEMENT", "ROLE_MANAGEMENT", "SECURITY_LABELS_MANAGEMENT", "DATA_OPERATIONS_MANAGEMENT", "PLATFORM_PARAMETERS_MANAGEMENT", "EXECUTE_DATA_OPERATIONS", "AUDIT_ACCESS"], jQuery.each(t.rights || [], (function (t, i) {
                e = "", i && i.securedResource && (e = i.securedResource.name), -1 !== n.indexOf(e) && (i.create || i.read || i.update || i.delete) && (o = !0)
            })), o)
        },
        initCustomization: function () {
        },
        getLogoTpl: function () {
            var t = this.locale;
            return '<object class="un-login-logo" data="resources/logoplatform-' + t + '.svg" type="image/svg+xml" style="width: 200px;"><img src="resources/logoplatform-' + t + '.png" alt="Platform logo" /></object>'
        },
        getPlatformBackgroundCls: function () {
            var t = "un-application-usermode";
            switch (window.customerConfig.APP_MODE) {
                case"user":
                    t = "un-application-usermode";
                    break;
                case"admin":
                    t = "un-application-adminmode";
                    break;
                case"dev":
                    t = "un-application-devmode"
            }
            return t
        },
        getBackgroundCls: function () {
            return ""
        },
        updatePlatformFavicon: function () {
            var t = document.head || document.getElementsByTagName("head")[0],
                e = document.querySelectorAll('link[rel="icon"]')[0], n = this.platformFaviconUrl;
            e && t.removeChild(e), (e = document.createElement("link")).href = n, e.rel = "icon", e.type = "image/x-icon", t.appendChild(e)
        },
        transformResourceBundle: function (t, e, n) {
            return n
        },
        updatePlatformTitle: function () {
            var t = document.querySelectorAll("title")[0];
            t && (t.innerHTML = this.platformTitle)
        },
        onBodyClick: function () {
            $(this.localeMenu).hide()
        },
        onLocaleSwitchClick: function (t) {
            $(this.localeMenu).toggle(), t.stopPropagation()
        },
        onNameInputFocus: function () {
            $(this.nameInputWrap).addClass(this.focusCls)
        },
        onNameInputBlur: function () {
            $(this.nameInputWrap).removeClass(this.focusCls)
        },
        onPasswordInputFocus: function () {
            $(this.passwordInputWrap).addClass(this.focusCls)
        },
        onPasswordInputBlur: function () {
            $(this.passwordInputWrap).removeClass(this.focusCls)
        },
        onLoginButtonClick: function () {
            this.doLogin()
        },
        onWarningTabBackButtonClick: function () {
            this.showTab(this.loginTab)
        },
        onNameInputChange: function (t) {
            this.updateLoginButtonDisable(), 13 !== t.keyCode && this.animateWrongAuthorizationText()
        },
        onPasswordInputChange: function (t) {
            this.updateLoginButtonDisable(), 13 !== t.keyCode && this.animateWrongAuthorizationText()
        },
        onNameInputKeyDown: function (t) {
            switch (9 !== t.keyCode && 13 !== t.keyCode || (t.stopPropagation(), t.preventDefault()), t.keyCode) {
                case 9:
                    $(this.passwordInput).focus(), $(this.passwordInput).select();
                    break;
                case 13:
                    this.doLogin()
            }
        },
        onPasswordInputKeyDown: function (t) {
            switch (9 !== t.keyCode && 13 !== t.keyCode || (t.stopPropagation(), t.preventDefault()), t.keyCode) {
                case 9:
                    $(this.nameInput).focus(), $(this.nameInput).select();
                    break;
                case 13:
                    this.doLogin()
            }
        },
        onRestoreTabLoginInputChange: function (t) {
            $(this.restoreTabEmailInput).attr("disabled", 0 !== $(this.restoreTabInput).val().length), $(this.wrongRestoreText).html("")
        },
        onRestoreTabEmailInputChange: function (t) {
            $(this.restoreTabInput).attr("disabled", 0 !== $(this.restoreTabEmailInput).val().length), $(this.wrongRestoreText).html("")
        },
        onLocaleSwitchItemClick: function (t) {
            var e = t.target.getAttribute("locale");
            e && (this.setLocale(e), $(this.nameInput).focus())
        },
        onForgetPasswordLinkClick: function () {
            this.showTab(this.restoreTab)
        },
        onRestoreButtonClick: function () {
            this.doRestorePassword()
        },
        animateWrongAuthorizationText: function () {
            $(this.wrongAuthorizationText).is(":visible") && $(this.wrongAuthorizationText).stop().animate({opacity: "0.3"}, 500)
        },
        setLocale: function (t) {
            var e = this.getTranslate(t);
            e && ($(this.loginButton).html(e.signInButton), $(this.nameInput).attr("placeholder", e.namePlaceholder), $(this.passwordInput).attr("placeholder", e.passwordPlaceholder), $(this.warningTabTitle).text(e.warningTabTitle), $(this.wrongAuthorizationText).html(e.wrongAuthorizationText), $(this.warningTabBackButton).html(e.warningTabBackButton), $(this.restorePasswordTitle).html(e.restorePasswordTitle), $(this.restorePasswordDescription).html(e.restorePasswordDescription), $(this.restoreTabInput).attr("placeholder", e.namePlaceholder), $(this.restoreTabEmailInput).attr("placeholder", e.emailPlaceholder), $(this.or).html(e.or), $(this.restoreButton).html(e.restoreButton), $(this.forgotPasswordLink).html(e.forgotPassword), $(this.restoreTabGoBackLink).html(e.cancel), $(this.passwordWasSent).html(e.passwordWasSent), this.locale = t, $(this.warningTabText).html(this.buildWarningTabText()), $(this.localeMenu).find("a").removeClass("selected"), $(this.localeMenu).find("a[locale=" + t + "]").addClass("selected"), $(this.logoContainer).empty(), $(this.logoContainer).append(Unidata.Micrologin.getLogoTpl()))
        },
        formatDate: function (t, e) {
            var n, o = t.getFullYear(), i = String(t.getMonth() + 1).padStart(2, "0"),
                r = String(t.getDate()).padStart(2, "0"), a = String(t.getHours()).padStart(2, "0"),
                s = String(t.getMinutes()).padStart(2, "0");
            return "ru" === e ? n = o + "-" + i + "-" + r + " " + a + ":" + s : "en" === e && (n = i + "/" + r + "/" + o + " " + a + ":" + s), n
        },
        getToken: function () {
            var t = localStorage.getItem("ud-token");
            return "null" === t && (t = null), t
        },
        setToken: function (t) {
            t ? localStorage.setItem("ud-token", t) : localStorage.removeItem("ud-token")
        },
        getTranslate: function (t) {
            return t || (t = this.locale), this.translates[t]
        },
        getQueryParam: function (t) {
            var e = null;
            return window.location.search.substr(1).split("&").forEach((function (n) {
                t == n.split("=")[0] && (e = n.split("=")[1])
            })), e
        },
        getAuthorizationInputData: function () {
            return {login: $(this.nameInput).val(), password: $(this.passwordInput).val()}
        },
        updateLoginButtonDisable: function () {
            var t = this.getAuthorizationInputData();
            t.login.length && t.password.length ? this.enableLoginButton() : this.disableLoginButton()
        },
        disableLoginButton: function () {
            $(this.loginButton).attr("disabled", !0)
        },
        enableLoginButton: function () {
            $(this.loginButton).attr("disabled", !1)
        },
        showTab: function (t) {
            $(this.loginTab).hide(), $(this.warningTab).hide(), $(this.restoreTab).hide(), t === this.restoreTab ? ($(this.panelHeader).hide(), $(this.passwordWasSent).hide()) : $(this.panelHeader).show(), $(t).show()
        },
        doLogin: function () {
            var t = this, e = this.getAuthorizationInputData();
            String(e.login).length && String(e.password).length && this.login(e.login, e.password, this.locale).done(function (t) {
                this.authenticateData = t, this.setToken(t.token), window.customerConfig.LOCALE = t.userInfo.locale, $(this.wrongAuthorizationText).hide(), this.destroyComponent(), this.runMicroloader()
            }.bind(this)).fail(function (e) {
                var n = !1;
                this.authenticateData = null, this.setToken(null), "DISALLOW_ADMIN_APP_MODE" === e ? (t.warningErrorCode = "DISALLOW_ADMIN_APP_MODE", $(this.warningTabText).html(this.buildWarningTabText()), this.showTab(this.warningTab), n = !0) : e && e.errors && e.errors.forEach(function (e) {
                    "EX_SECURITY_LICENSE_INVALID" === e.errorCode || "EX_SECURITY_HW_FOR_LICENSE_INVALID" === e.errorCode ? (t.warningErrorCode = e.errorCode, "EX_SECURITY_LICENSE_INVALID" === e.errorCode && (this.licenseeExpireDate = Date.parse(e.userMessageDetails, this.dateTimeFormat), this.licenseeExpireDate && (this.licenseeExpireDate = new Date(this.licenseeExpireDate))), $(this.warningTabText).html(this.buildWarningTabText()), this.showTab(this.warningTab), n = !0) : "EX_SECURITY_CANNOT_LOGIN" === e.errorCode && ($(this.wrongAuthorizationText).show(), $(this.wrongAuthorizationText).stop().css({opacity: "1"}), n = !0)
                }.bind(this)), n || this.handleXhrErrors(e)
            }.bind(this))
        },
        buildWarningTabText: function () {
            var t, e = this.getTranslate(), n = e.warningTabText, o = this.licenseeExpireDate;
            switch (this.warningErrorCode) {
                case"EX_SECURITY_LICENSE_INVALID":
                    t = n, o && (t = n + "<br/>" + this.formatDate(o, this.locale));
                    break;
                case"EX_SECURITY_HW_FOR_LICENSE_INVALID":
                    t = e.licenseeHardwareSecurityText;
                    break;
                case"DISALLOW_ADMIN_APP_MODE":
                    t = e.disallowAdminAppModeText
            }
            return t
        },
        doTokenAuthorization: function () {
            var t = this, e = this.getToken();
            this.authenticate(e).done(function (t) {
                this.authenticateData = t, this.setToken(t.token), this.setLocale(t.userInfo.locale), window.customerConfig.LOCALE = t.userInfo.locale, this.runMicroloader()
            }.bind(this)).fail(function (e) {
                this.authenticateData = null, this.setToken(null), this.initComponent(), "DISALLOW_ADMIN_APP_MODE" === e ? (t.warningErrorCode = "DISALLOW_ADMIN_APP_MODE", $(this.warningTabText).html(this.buildWarningTabText()), this.showTab(this.warningTab)) : 401 !== e.status && this.handleXhrErrors(e.responseJSON)
            }.bind(this))
        },
        doSsoAuthorization: function () {
            this.login("", "", this.locale).done(function (t) {
                this.authenticateData = t, this.setToken(t.token), this.runMicroloader()
            }.bind(this)).fail(function () {
                this.authenticateData = null, this.setToken(null), this.initComponent()
            }.bind(this))
        },
        doRestorePassword: function () {
            var t = this.getTranslate(), e = $(this.restoreTabInput).val(), n = $(this.restoreTabEmailInput).val(),
                o = {};
            if (!this.isSending) {
                if (this.isSending = !0, this.restorePasswordDelay = 60, $(this.wrongRestoreText).html(""), e && e.length > 1 && (o.login = e), n && n.indexOf("@") > -1 && (o.email = n), 0 === Object.keys(o).map((function (t) {
                    return o[t]
                })).length) return $(this.wrongRestoreText).html(t.wrongLoginOrEmail), void (this.isSending = !1);
                this.restorePassword(o).done(function () {
                    setTimeout(this.setRestorePasswordTimer.bind(this), 1e3)
                }.bind(this)).fail(function () {
                    setTimeout(this.setRestorePasswordTimer.bind(this), 1e3)
                }.bind(this))
            }
        },
        setRestorePasswordTimer: function () {
            var t = this.getTranslate();
            this.restorePasswordDelay -= 1, this.writeToLocalStorage("restorePasswordDelay", this.restorePasswordDelay), this.restorePasswordDelay > 0 ? ($(this.restoreButton).attr("disabled", !0), $(this.passwordWasSent).show(), $(this.passwordWasSent).html(t.passwordWasSent + this.restorePasswordDelay), this.timer = setTimeout(this.setRestorePasswordTimer.bind(this), 1e3)) : (this.isSending = !1, $(this.passwordWasSent).hide(), $(this.restoreButton).attr("disabled", !1), this.removeFromLocalStorage("restorePasswordDelay"))
        },
        login: function (t, e, n) {
            var o, i = this, r = $.Deferred();
            return o = {password: e || "", userName: t || "", locale: n || ""}, $.ajax({
                type: "POST",
                url: Unidata.Microloader.buildServerUrl("internal/authentication/login"),
                data: JSON.stringify(o),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (t, e, n) {
                    var o;
                    n && 200 === n.status && t && t.success ? (!0 !== (o = i.authorizationGuard(t.content)) && r.reject(o), r.resolve(t.content)) : r.reject(n.responseJSON)
                },
                error: function (t) {
                    r.reject(t.responseJSON)
                }
            }), r.promise()
        },
        authenticate: function (t) {
            var e = this, n = $.Deferred();
            return $.ajax({
                type: "GET",
                url: Unidata.Microloader.buildServerUrl("internal/authentication/get-current-user"),
                data: {_dc: Number(new Date)},
                headers: {Authorization: t},
                success: function (t, o, i) {
                    var r;
                    i && 200 === i.status && t && t.token ? (!0 !== (r = e.authorizationGuard(t)) && n.reject(r), n.resolve(t)) : n.reject(i)
                },
                error: function (t) {
                    n.reject(t)
                }
            }), n.promise()
        },
        restorePassword: function (t) {
            var e = this, n = $.Deferred();
            return $.ajax({
                type: "POST",
                url: Unidata.Microloader.buildServerUrl("internal/security/user/forgot-password"),
                data: JSON.stringify(t),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (t, o, i) {
                    var r;
                    i && 200 === i.status && t && t.success ? (!0 !== (r = e.authorizationGuard(t.content)) && n.reject(r), n.resolve(t.content)) : n.reject(i.responseJSON)
                },
                error: function (t) {
                    n.reject(t.responseJSON)
                }
            }), n.promise()
        },
        activateTempRestorePassword: function (t) {
            var e = $.Deferred();
            return $.ajax({
                type: "GET",
                url: Unidata.Microloader.buildServerUrl("internal/authentication/activate-password"),
                data: {activationCode: t}
            }), e.promise()
        },
        loadMicrologinCustomization: function (t, e) {
            var n = Unidata.Microloader.buildCustomerUrl("CUX/Micrologin.js");
            Unidata.Microloader.loadScript(n, (function () {
                Unidata.Microloader.isFunction(e) && e()
            }), (function () {
                Unidata.Microloader.isFunction(e) && e()
            }))
        },
        handleXhrErrors: function (t) {
            var e = [], n = this.getTranslate().unknownError;
            t && t.errors && t.errors.forEach(function (t) {
                t.userMessage && e.push(t.userMessage)
            }.bind(this)), e.length && (n = e.join("<br>")), iziToast.show({
                message: n,
                timeout: null,
                progressBar: !1,
                icon: "icon-notification-circle",
                class: "un-error",
                transitionIn: null,
                transitionOut: null,
                transitionInMobile: null,
                transitionOutMobile: null
            })
        },
        getUrlParams: function () {
            var t = {};
            return window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (function (e, n, o) {
                t[n] = o
            })), t
        },
        writeToLocalStorage: function (t, e) {
            var n = window.localStorage;
            n && n.setItem(t, e)
        },
        readFromLocalStorage: function (t) {
            var e = window.localStorage;
            if (e) return e.getItem(t)
        },
        removeFromLocalStorage: function (t) {
            var e = window.localStorage;
            e && e.removeItem(t)
        }
    }
}, function (t, e, n) {
    var o;
    window.Unidata = window.Unidata || {}, function () {
        "use strict";
        var n = ["html", "json", "jsonp", "script"],
            i = ["connect", "delete", "get", "head", "options", "patch", "post", "put", "trace"], r = function t() {
                var e = {}, n = {}, o = {
                    url: function (t) {
                        return r.call(this, "url", t, a.string)
                    }, sync: function (t) {
                        return r.call(this, "sync", t, a.bool)
                    }, cache: function (t) {
                        return r.call(this, "cache", t, a.bool)
                    }, type: function (t) {
                        return r.call(this, "type", t, a.type)
                    }, header: function (t, n) {
                        return e.headers = e.headers || {}, a.string(t), void 0 !== n ? (a.string(n), e.headers[t] = n, this) : e.headers[t]
                    }, auth: function (t, n) {
                        return a.string(t), a.string(n), e.auth = {user: t, passwd: n}, this
                    }, timeout: function (t) {
                        return r.call(this, "timeout", t, a.positiveInteger)
                    }, method: function (t) {
                        return r.call(this, "method", t, a.method)
                    }, queryString: function (t) {
                        return r.call(this, "queryString", t, a.queryString)
                    }, data: function (t) {
                        return r.call(this, "data", t, a.plainObject)
                    }, body: function (t) {
                        return r.call(this, "body", t, null, (function (t) {
                            if ("object" == typeof t) {
                                if (!(t instanceof FormData)) {
                                    try {
                                        t = JSON.stringify(t)
                                    } catch (t) {
                                        throw new TypeError("Unable to stringify body's content : " + t.name)
                                    }
                                    this.header("Content-Type", "application/json")
                                }
                            } else t += "";
                            return t
                        }))
                    }, into: function (t) {
                        return r.call(this, "into", t, a.selector, (function (t) {
                            return "string" == typeof t ? document.querySelectorAll(t) : t instanceof HTMLElement ? [t] : void 0
                        }))
                    }, jsonPaddingName: function (t) {
                        return r.call(this, "jsonPaddingName", t, a.string)
                    }, jsonPadding: function (t) {
                        return r.call(this, "jsonPadding", t, a.func)
                    }, on: function (t, e) {
                        return "function" == typeof e && (n[t] = n[t] || [], n[t].push(e)), this
                    }, off: function (t) {
                        return n[t] = [], this
                    }, trigger: function (t, e) {
                        var o = this, i = function (t, e) {
                            n[t] instanceof Array && n[t].forEach((function (t) {
                                t.call(o, e)
                            }))
                        };
                        if (void 0 !== t) {
                            var r = /^([0-9])([0-9x])([0-9x])$/i, a = (t += "").match(r);
                            a && a.length > 3 ? Object.keys(n).forEach((function (t) {
                                var n = t.match(r);
                                !(n && n.length > 3 && a[1] === n[1]) || "x" !== n[2] && a[2] !== n[2] || "x" !== n[3] && a[3] !== n[3] || i(t, e)
                            })) : n[t] && i(t, e)
                        }
                        return this
                    }, go: function () {
                        var t = e.type || (e.into ? "html" : "json"), n = c();
                        return "function" == typeof i[t] ? i[t].call(this, n) : void 0
                    }
                }, i = {
                    json: function (t) {
                        var e = this;
                        i._xhr.call(this, t, (function (t) {
                            if (t) try {
                                t = JSON.parse(t)
                            } catch (t) {
                                return e.trigger("error", t), null
                            }
                            return t
                        }))
                    }, html: function (t) {
                        i._xhr.call(this, t, (function (t) {
                            return e.into && e.into.length && [].forEach.call(e.into, (function (e) {
                                e.innerHTML = t
                            })), t
                        }))
                    }, _xhr: function (t, n) {
                        var o, i, r, a, s, c = this, u = e.method || "get", d = !0 !== e.sync, h = new XMLHttpRequest,
                            p = e.data, g = e.body, f = (e.headers, this.header("Content-Type")), m = e.timeout;
                        if (!f && p && l() && (this.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8"), f = this.header("Content-Type")), p && l()) if ("string" != typeof g && (g = ""), f.indexOf("json") > -1) try {
                            g = JSON.stringify(p)
                        } catch (t) {
                            throw new TypeError("Unable to stringify body's content : " + t.name)
                        } else for (o in a = f && f.indexOf("x-www-form-urlencoded") > 1, p) g += a ? encodeURIComponent(o) + "=" + encodeURIComponent(p[o]) + "&" : o + "=" + p[o] + "\n\r";
                        for (i in s = [u, t, d], e.auth && (s.push(e.auth.user), s.push(e.auth.passwd)), h.open.apply(h, s), e.headers) h.setRequestHeader(i, e.headers[i]);
                        h.onprogress = function (t) {
                            t.lengthComputable && c.trigger("progress", t.loaded / t.total)
                        }, h.onload = function () {
                            var t = h.responseText;
                            r && clearTimeout(r), this.status >= 200 && this.status < 300 && ("function" == typeof n && (t = n(t)), c.trigger("success", t)), c.trigger(this.status, t), c.trigger("end", t)
                        }, h.onerror = function (t) {
                            r && clearTimeout(r), c.trigger("error", t, arguments)
                        }, m && (r = setTimeout((function () {
                            c.trigger("timeout", {type: "timeout", expiredAfter: m}, h, arguments), h.abort()
                        }), m)), h.send(g)
                    }, jsonp: function (n) {
                        var o, i = this, r = document.querySelector("head"), a = !0 !== e.sync,
                            l = e.jsonPaddingName || "callback",
                            c = e.jsonPadding || "_padd" + (new Date).getTime() + Math.floor(1e4 * Math.random()), u = {};
                        if (t[c]) throw new Error("Padding " + c + " already exists. It must be unique.");
                        /^ajajsonp_/.test(c) || (c = "ajajsonp_" + c), window[c] = function (t) {
                            i.trigger("success", t), r.removeChild(o), window[c] = void 0
                        }, u[l] = c, n = s(n, u), (o = document.createElement("script")).async = a, o.src = n, o.onerror = function () {
                            i.trigger("error", arguments), r.removeChild(o), window[c] = void 0
                        }, r.appendChild(o)
                    }, script: function (t) {
                        var n, o = this, i = document.querySelector("head") || document.querySelector("body"),
                            r = !0 !== e.sync;
                        if (!i) throw new Error("Ok, wait a second, you want to load a script, but you don't have at least a head or body tag...");
                        (n = document.createElement("script")).async = r, n.src = t, n.onerror = function () {
                            o.trigger("error", arguments), i.removeChild(n)
                        }, n.onload = function () {
                            o.trigger("success", arguments)
                        }, i.appendChild(n)
                    }
                }, r = function (t, n, o, i) {
                    if (void 0 !== n) {
                        if ("function" == typeof o) try {
                            n = o.call(a, n)
                        } catch (e) {
                            throw new TypeError("Failed to set " + t + " : " + e.message)
                        }
                        return e[t] = "function" == typeof i ? i.call(this, n) : n, this
                    }
                    return "undefined" === e[t] ? null : e[t]
                }, l = function () {
                    return ["delete", "patch", "post", "put"].indexOf(e.method) > -1
                }, c = function () {
                    var t = e.url, n = void 0 === e.cache || !!e.cache, o = e.queryString || "", i = e.data;
                    return !1 === n && (o += "&ajabuster=" + (new Date).getTime()), t = s(t, o), i && !l() && (t = s(t, i)), t
                };
                return o
            }, a = {
                bool: function (t) {
                    return !!t
                }, string: function (t) {
                    if ("string" != typeof t) throw new TypeError("a string is expected, but " + t + " [" + typeof t + "] given");
                    return t
                }, positiveInteger: function (t) {
                    if (parseInt(t) !== t || 0 >= t) throw new TypeError("an integer is expected, but " + t + " [" + typeof t + "] given");
                    return t
                }, plainObject: function (t) {
                    if ("object" != typeof t || t.constructor !== Object) throw new TypeError("an object is expected, but " + t + " [" + typeof t + "] given");
                    return t
                }, type: function (t) {
                    if (t = this.string(t), n.indexOf(t.toLowerCase()) < 0) throw new TypeError("a type in [" + n.join(", ") + "] is expected, but " + t + " given");
                    return t.toLowerCase()
                }, method: function (t) {
                    if (t = this.string(t), i.indexOf(t.toLowerCase()) < 0) throw new TypeError("a method in [" + i.join(", ") + "] is expected, but " + t + " given");
                    return t.toLowerCase()
                }, queryString: function (t) {
                    var e = {};
                    return "string" == typeof t ? t.replace("?", "").split("&").forEach((function (t) {
                        var n = t.split("=");
                        2 === n.length && (e[decodeURIComponent(n[0])] = decodeURIComponent(n[1]))
                    })) : e = t, this.plainObject(e)
                }, selector: function (t) {
                    if ("string" != typeof t && !(t instanceof HTMLElement)) throw new TypeError("a selector or an HTMLElement is expected, " + t + " [" + typeof t + "] given");
                    return t
                }, func: function (t) {
                    if (t = this.string(t), !/^([a-zA-Z_])([a-zA-Z0-9_\-])+$/.test(t)) throw new TypeError("a valid function name is expected, " + t + " [" + typeof t + "] given");
                    return t
                }
            }, s = function (t, e) {
                var n;
                if (t = t || "", e) if (-1 === t.indexOf("?") && (t += "?"), "string" == typeof e) t += e; else if ("object" == typeof e) for (n in e) t += "&" + encodeURIComponent(n) + "=" + encodeURIComponent(e[n]);
                return t
            };
        void 0 === (o = function () {
            return r
        }.apply(e, [])) || (t.exports = o), window && (window.aja = r)
    }(), Unidata.Microloader.chain(Unidata.Microloader.loadCustomerJson, Unidata.Microloader.initUnidataCustomerCustomization, Unidata.Micrologin.loadMicrologinCustomization, Unidata.Micrologin.runMicrologin)()
}]);
