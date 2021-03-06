define([
  'jquery',
  'underscore',
  'views/base/view',
  'text!templates/daos/edit.html',
  'datepicker' // no result, just load the file
], function($, _, View, template) {
  'use strict';

  return View.extend({
    template:   template,
    className:  'daos edit',
    autoRender: true,
    container:  '.modal',

    events: {
      'keydown .modal-body form input': function(e) {
        if (event.keyCode === 13) {
          this.submitForm(e)
        }
      },
      'submit .modal-body form': 'submitForm',
      'click .modal-footer .btn-primary': 'submitForm'
    },

    submitForm: function(e) {
      e.preventDefault()

      var params = this.$el.find('form').serializeObject()

      require([ 'controllers/daos_controller' ], function(DaosController) {
        new DaosController().update(params)
      }.bind(this))
    },

    render: function() {
      if ($('.modal').length === 0) {
        $('<div>')
          .addClass('modal')
          .attr('tabindex', '-1')
          .attr('role', 'dialog')
          .attr('aria-labelledby', "dao_factory_edit_label")
          .appendTo($('body'))
      }

      this.$el
        .html(_.template(template)(this.options))
        .modal({ keyboard: true })
        .on('shown', function() {
          $('.date').datepicker()

          setTimeout(function() {
            this.$el.find('input')[0].focus()
          }.bind(this), 100)
        }.bind(this))
        .on('hidden', function() { $('.modal').remove() })
        .trigger('shown') // dunno why this isn't trigger automatically
    }
  })
})
