'use strict';

app.factory('Project', function($http) {
  var projectRoute = '/api/projects/';

  var makeTree = function makeTree(projectData) {
    var crawlDirectoryTree = function crawlDirectoryTree(folder) {
      console.log(folder);
      var nodeTree = {};
      nodeTree.label = folder.name;
      nodeTree.id = folder._id;
      nodeTree.children = []
      if(folder.folders) {
        nodeTree.children = folder.folders.map(function(subFolder) {
          return crawlDirectoryTree(subFolder);
        });
      }
      folder.documents.forEach(function(doc) {
        var node = {};
        node.label = doc.name;
        node.id = doc._id;
        return nodeTree.children.push(node);
      });
      return nodeTree;
    };
    return crawlDirectoryTree(projectData.rootFolder);
  };

  return {
    getProjectByAccessCode: function(id, accessCode) {
      // TODO: Determine proper route for getting project by access code
      return $http.get(projectRoute + 'access/' + accessCode).then(function(res) {
        return res.data; 
      }).then(function(project) {
        project.tree = makeTree(project); 
        return project;
      });
    },    
    getProjectById: function(id) {
      console.log('getting project by id');
      return $http.get(projectRoute + id).then(function(res) {
        console.log(res);
        return res.data; 
      });
    },    
    getAllProjects: function() {
      return $http.get(projectRoute).then(function(res) {
        return res.data 
      });
    },
    makeTree: makeTree
  };  
});
