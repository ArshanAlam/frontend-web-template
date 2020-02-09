# frontend-web-template
This is a simple template for quickly getting started with building frontend web applications using [React](https://reactjs.org/) and [Blueprintjs](https://blueprintjs.com/).


## How to get started?
To start development work, execute `./gradlew build` in the root of this project. This project uses [gradle-node-plugin](https://github.com/srs/gradle-node-plugin) to build the `frontend/` subproject.


### Where does my source code go?
All [TypeScript](https://www.typescriptlang.org/) goes in the `frontend/src` directory and all [SASS](https://sass-lang.com/) goes in the `frontend/style` directory. The structure of the `frontend/` subproject is explained in `frontend/README.md`.


### How do I run my application?
To run your application you could execute `./gradlew serve`. This will start a simple http file server in the `frontend/dist` directory. The `frontend/dist` directory contains the bundled output from building, as described above.


## Structure of this template
For gradle to build the `frontend/` subproject we must first configure it! To do this, we start by including it in the `settings.gradle` file and creating a `frontend/build.gradle` file.

```
// Name of the root project
rootProject.name = 'frontend-web-template'

// Include the 'frontend' subproject
include 'frontend'
```


### How to configure gradle-node-plugin
To configure the [gradle-node-plugin](https://github.com/srs/gradle-node-plugin) we start by adding the plugin in the `build.gradle` file.

```
plugins {
  id "com.moowork.node" version "${gradleNodePluginVersion}"
}
```

Since we have a subproject `frontend/`, we'd like this plugin to be available there also. To do this, we add the following in `build.gradle`. This will make the plugin available in all subprojects.

```
subprojects {
  apply plugin: "com.moowork.node"
}
```


#### Let's configure Node and Yarn within the plugin:
In the `build.gradle` file, you'll notice the following block:

```
node {
  version = "${nodeVersion}"
  yarnVersion = "${yarnVersion}"
  distBaseUrl = "${nodeDistBaseUrl}"
  download = true
  workDir = file("${project.buildDir}/software/nodejs")
  yarnWorkDir = file("${project.buildDir}/software/yarn")
}
```

The `version` and `yarnVersion` fields are self explanatory. The `distBaseUrl` specifies the location to download `Node`. The `download = true` tells the plugin to download `Node` and `Yarn` and to **not** use the systems installed version. Lastly, the `workDir` and `yarnWorkDir` fields indicate where to download `Node` and `Yarn`.

All the variables used in the config block above are in the `gradle.properties` file.
