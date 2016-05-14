/**
 * Created by admin on 16/3/13.
 */
"use strict";

var puremvc = require('puremvc').puremvc;

module.exports = puremvc.define(
    // CLASS INFO
    {
        name: 'model.proxy.ContextProxy',
        parent: puremvc.Proxy,

        constructor: function () {
            puremvc.Proxy.call(this);
        }
    },

    // INSTANCE MEMBERS
    {
        onRegister: function () {
            this.data = [];
        },

        pushContext: function (context) {
            this.data.push(context);
        },

        popContext: function () {
            this.data.pop();
        },

        getCurrentContext: function () {
            return this.data[this.data.length - 1];
        },

        cleanContext: function () {
            this.data = [];
        },

        getContextCount: function () {
            return this.data.length;
        }
    },

    // STATIC MEMBERS
    {
        NAME: 'ContextProxy'
    });