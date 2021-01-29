const $          = require('jquery');
const Mn         = require('backbone.marionette');
const i18n       = require('../../i18n');
const Cache      = require('../../cache');
const Controller = require('../../controller');
const Tokens     = require('../../tokens');
const template   = require('./main.ejs');
const dark       = require('../../../darkmode/utils')

module.exports = Mn.View.extend({
    id:        'header',
    className: 'header',
    template:  template,

    ui: {
        link:     'a',
        details:  'a.edit-details',
        password: 'a.change-password',
        darkmode: 'input[name="darkmode"]'
    },

    events: {
        'click @ui.details': function (e) {
            e.preventDefault();
            Controller.showUserForm(Cache.User);
        },

        'click @ui.password': function (e) {
            e.preventDefault();
            Controller.showUserPasswordForm(Cache.User);
        },

        'click @ui.link': function (e) {
            e.preventDefault();
            let href = $(e.currentTarget).attr('href');

            switch (href) {
                case '/':
                    Controller.showDashboard();
                    break;
                case '/logout':
                    Controller.logout();
                    break;
            }
        },

        'change @ui.darkmode': function (e) {
            e.preventDefault();
            const enable = $(e.currentTarget).prop('checked');
            dark.setVal(enable);
            dark.change(enable);
        }
    },

    templateContext: {
        getUserField: function (field, default_val) {
            return Cache.User.get(field) || default_val;
        },

        getRole: function () {
            return i18n('roles', Cache.User.isAdmin() ? 'admin' : 'user');
        },

        getLogoutText: function () {
            if (Tokens.getTokenCount() > 1) {
                return i18n('main', 'sign-in-as', {name: Tokens.getNextTokenName()});
            }

            return i18n('str', 'sign-out');
        },

        darkmode: dark.getVal()
    },

    initialize: function () {
        this.listenTo(Cache.User, 'change', this.render);
        dark.change(dark.getVal());
    }
});
