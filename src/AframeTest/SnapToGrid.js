/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Cubemap component for A-Frame.
 */
AFRAME.registerComponent('snap-to-grid', {
  schema: {
    folder: {
      type: 'string'
    },
    edgeLength: {
      type: 'int',
      default: 1000
    }
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    // entity data
    var el = this.el;
    var data = this.data;

    // Path to the folder containing the 6 cubemap images
    var srcPath = data.folder;

    // Cubemap image files must follow this naming scheme
    // from: http://threejs.org/docs/index.html#Reference/Textures/CubeTexture
    var urls = [
      'posx.png', 'negx.png',
      'posy.png', 'negy.png',
      'posz.png', 'negz.png'
    ];

    console.log("El: ", el);
    console.log("data", data);
    console.log("this", this);
    console.log("oldData", oldData);
    var thisItemEl = document.querySelector("sphere");
    console.log("thisItemEl", thisItemEl)
    console.log("document", document)


    // var object3D = this.el.object3D;
    // console.log("this.el.object3d.position before", object3D.position);
    // object3D.position.set(object3D.position.x + 100, object3D.position.y + 100, object3D.position.z - 300 )
    // console.log("this.el.object3d.position ater", object3D.position);

    // Set entity's object3D
    // el.setObject3D('cubemap2', skyMesh);
  },

  tick: function(){
    // var object3D = this.el.object3D;
    // console.log("this.el.object3d.position before", object3D.position);
    // object3D.position.set(object3D.position.x + 10, 10, object3D.position.z - 10 )
    // console.log("this.el.object3d.position ater", object3D.position);

  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () {
    this.el.removeObject3D('snap-to-grid');
  }
});
