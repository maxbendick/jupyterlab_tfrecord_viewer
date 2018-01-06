# JupyterLab TFRecord Viewer

__**WORK IN PROGRESS**__

This extension lets you easily inspect TensorFlow TFRecord files. TFRecords are great at providing an tensorflow-integrated way to work with data. Unfortunately, these files can be a bit opaque because they're binary. This extension can help you to understand the data you're working with. __**This project isn't practical to use yet.**__


## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install jupyterlab_tfrecord_viewer
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

