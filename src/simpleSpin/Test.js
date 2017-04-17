import THREE from 'three';
import React from 'react';
import ParsedModel from './parsed_model';
import createMaterial from './create_material';

  let model = new ParsedModel();
  model.load('path/to/model').then(
    function resolve(m){
      console.log('loaded:', m);
    },
    function reject(e){
      console.error('error:', e);
    }
  );