/*global module */
module.exports = function (grunt) {
	"use strict";

	var config;

	/**
	 * @private defineUglifyObject()
	 *
	 * @author Cam Morrow
	 *
	 * @param {boolean} compressed
	 * @param {String} name
	 * @param {String} source_path
	 * @param {String} dest_path
	 * @param {Array} files
	 *
	 * @return {Object}
	 */
	function defineUglifyObject (compressed, name, source_path, dest_path, files) {
		var obj;

		obj = {
			options: {
				sourceMap: true
			},
			src: files.map(function (v) {
				return source_path + v + ".js";
			})
		};

		if (compressed) {
			obj.dest = dest_path + name + "-<%= pkg.version %>.min.js";
		} else {
			obj.dest = dest_path + name + "-<%= pkg.version %>.js";
			obj.options.mangle = false;
			obj.options.compress = false;
			obj.options.preserveComments = "all";
			obj.options.beautify = true;
		}

		return obj;
	}

	/**
	 * @private defineSassObject()
	 *
	 * @author Cam Morrow
	 *
	 * @param {boolean} compressed
	 * @param {String} name
	 * @param {String} source_path
	 * @param {String} dest_path
	 * @param {Array} files
	 *
	 * @return {Object}
	 */
	function defineSassObject (compressed, name, source_path, dest_path, files) {
		var obj;

		obj = {
			options: {
				precision: 10
			},
			src: files.map(function (v) {
				return source_path + v + ".scss";
			})
		};

		if (compressed) {
			obj.options.style = "compressed";
			obj.dest = dest_path + name + "-<%= pkg.version %>.min.css";
		} else {
			obj.options.style = "nested";
			obj.dest = dest_path + name + "-<%= pkg.version %>.css";
		}

		return obj;
	}

	/**
	 * @private addUglifyConfig()
	 *
	 * @author Cam Morrow
	 *
	 * @param {Object} target
	 * @param {String} name
	 * @param {String} source_path
	 * @param {String} dest_path
	 * @param {Array} files
	 */
	function addUglifyConfig (target, name, source_path, dest_path, files) {
		target[name + "-dev"] = defineUglifyObject(false, name, source_path, dest_path, files);
		target[name + "-dist"] = defineUglifyObject(true, name, source_path, dest_path, files);
	}

	/**
	 * @private addSassConfig()
	 *
	 * @author Cam Morrow
	 *
	 * @param {Object} target
	 * @param {String} name
	 * @param {String} source_path
	 * @param {String} dest_path
	 * @param {Array} files
	 */
	function addSassConfig (target, name, source_path, dest_path, files) {
		target[name + "-dev"] = defineSassObject(false, name, source_path, dest_path, files);
		target[name + "-dist"] = defineSassObject(true, name, source_path, dest_path, files);
	}

	config = {
		pkg: grunt.file.readJSON("package.json"),

		// JS Uglify
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd HH:MM\") %> */\n"
			}
		},

		// SASS
		sass: {
			options: {
				banner: "/**//*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd HH:MM\") %> */\n"
			}
		},

		// TypeScript
		typescript: {
			options: {
				//module: "amd",
				target: "es5",
				sourceMap: true,
				declaration: false // Create a d.ts file
			},
			frontend: {
				src: ["source/typescript/**/*.ts"],
				dest: "cdn/javascript/app-<%= pkg.version %>.js"
			}
		}
	};

	/*

	addUglifyConfig(config.uglify, "frontend", "source/javascript/", "cdn/javascript/", [
		"test1"
	]);



	*/

	addSassConfig(config.sass, "app", "source/scss/", "cdn/stylesheets/", [
		"app"
	]);

	// Project configuration.
	grunt.initConfig(config);

	// Load plugins
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-typescript");
};