﻿/**
  * @constructor 
  */

var TabBase = new function()
{
  var self = this;
  var id_count = 1;
  var ids = {};

  this._ref_ids = {};

  var getId = function()
  {
    return 'tab-' + (id_count++).toString();
  }

  this.init = function(ref_id, name, has_close_button)
  {
    this.name = name;
    this.ref_id = ref_id;
    this.has_close_button = has_close_button;
    this._ref_ids[ref_id] = this;
    ids [ this.id = getId() ] = this;
  }

  this.getTabById = function(id)
  {
    return ids[id];
  }

  this.get_tab_by_ref_id = function(ref_id)
  {
    return this._ref_ids[ref_id] || null;
  };

  this._delete = function(id)
  {
    delete ids[id];
  }

}

/**
  * @constructor
  * @extends TabBase
  */

var Tab = function(ref_id, name, has_close_button)
{
  // at some point all tabs will have a close button
  this.init(ref_id, name, has_close_button)

  // These methods really belong to TopTabs, should make a TopTab class
  this._get_top_tab_element = function()
  {
    return document.querySelector("top-tabs").querySelector("[ref-id='" + this.ref_id + "']");
  };

  this.set_tab_badge = function(type, content)
  {
    var badge = this._get_top_tab_element().querySelector(".badge");
    if (badge)
    {
      badge.addClass(type || "");
      badge.textContent = content || "";
    }
  };

  this.clear_tab_badge = function()
  {
    this.set_tab_badge(this.ref_id);
  };

  this.set_tab_state = function(state)
  {
    var tab = this._get_top_tab_element();
    if (tab)
    {
      tab.setAttribute("data-state", state)
    }
  };

  this.clear_tab_state = function()
  {
    var tab = document.querySelector("top-tabs").querySelector("[ref-id='" + this.ref_id + "']");
    if (tab)
    {
      tab.remoteAttribute("data-state");
    }
  };
};

/**
  * @constructor
  * @extends Tab
  */

var JSTab = function(ref_id, name, has_close_button)
{
  // at some point all tabs will have a close button
  this.init(ref_id, name, has_close_button)

  window.messages.addListener("host-state", function(msg) {
    this.set_tab_state(msg.state);
  }.bind(this));
};

Tab.prototype = TabBase;
JSTab.prototype = new Tab();

