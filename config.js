System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "paths": {
    "*": "*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "affixing-header": "npm:affixing-header@0.3.1",
    "onscrolling": "npm:onscrolling@0.3.1",
    "npm:affixing-header@0.3.1": {
      "onscrolling": "npm:onscrolling@0.3.1"
    }
  }
});

