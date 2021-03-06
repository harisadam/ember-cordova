var cordovaPath     = require('../../../lib/utils/cordova-path');
var editXml         = require('../../../lib/utils/edit-xml');
var expect          = require('../../helpers/expect');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var parseXml        = require('../../../lib/utils/parse-xml');
var path            = require('path');

describe('Edit XML Util', function() {
  var host = 'http://localhost:8080';

  beforeEach(function() {
    editXml.addNavigation(mockProject.project, host);
  });

  describe('addNavigation function', function() {
    it('add node to the xml file in addition to client nodes', function() {
      var cdvPath = cordovaPath(mockProject.project);
      var configPath = path.join(cdvPath, 'config.xml');
      var xml = parseXml(configPath);
      var nodes = xml._result.widget['allow-navigation'].length;

      expect(nodes).to.equal(3);
    });
  });

  describe('removeNavigation function', function() {
    beforeEach(function() {
      editXml.removeNavigation(mockProject.project);
    });

    describe('if nodes placed by util exist', function() {
      it('removes util placed nodes and keep client nodes', function() {
        var cdvPath = cordovaPath(mockProject.project);
        var configPath = path.join(cdvPath, 'config.xml');
        var xml = parseXml(configPath);
        var nodes = xml._result.widget['allow-navigation'].length;

        expect(nodes).to.equal(2);
      });
    });
  });
});
