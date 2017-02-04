#!/usr/bin/env node

var typedoc = require('typedoc');
var handlebars = require('handlebars');
var fs = require('fs');
var nav = require("../node_modules/typedoc/dist/lib/output/models/NavigationItem.js");

console.log("~awaydoc~ running typedoc API...");

// Initialize typedoc API.
var options = {
    "out": "docs",
    "json": "",
    "theme": "docsTheme",
    "mode": "file",
    "logger": "console",
    "moduleResolution": "node",
    "includeDeclarations": true,
    "ignoreCompilerErrors": true,
    "excludePrivate": true,
    "excludeNotExported": true,
    "excludeExternals": false,
    "includes": "docsInclude",
    "tsconfig": "tsconfig.json"
};
var app = new typedoc.Application(options);

// Register handlebars helpers.
handlebars.registerHelper('newLine', function () { return '\n'; });

// Tweak typedoc for custom output.
(function modifyTypedoc() {
    "use strict";

    // Modify Renderer.prepareTheme()
    // The theme will be modified. Intercepting this method
    // will make sure we do that when the theme is available.
    var origPrepareTheme = app.renderer.prepareTheme;
    app.renderer.prepareTheme = function modPrepareTheme() {
        console.log("~awaydoc~ modifying prepareTheme()");

        var success = origPrepareTheme.call(this);

        // Always keep the nav at the project root.
        app.renderer.removeComponent('toc');
        this.listenTo(app.renderer, 'beginPage', function onRendererBeginPage(page){
            var model = page.project;
            page.toc = new nav.NavigationItem();
            var children = model.children || [];
            children.forEach((child) => {
                nav.NavigationItem.create(child, page.toc, true);
            });
        });

        // Keep camelcase in URLs.
        var origGetUrls = app.renderer.theme.getUrls;
        app.renderer.theme.getUrls = function modGetURls(project) {
            console.log("~awaydoc~   modifying theme.getUrls()");

            // Reflection.getAlias() uses toLowerCase(),
            // here, we state that we want the original class names as aliases.
            if (project.children) {
                project.children.forEach((child) => {
                    child._alias = child.name;
                });
            }

            return origGetUrls.call(this, project);
        }

        return success;
    };
})();

// Trigger doc generation.
var files = app.expandInputFiles(["lib"]);
app.generateDocs(files, options.out);
if(options.json && options.json !== "") {
    app.generateJson(files, options.json);
}