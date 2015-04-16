var mainJs = function() {
  if ( !Detector.webgl ) {
    container = document.createElement( 'div' );
    container =
      $('<div class="addGetWebGLMessage">' +
      'あなたのブラウザは最新ではありませんので、インターネット上にあるイケてる技術をみることはできません。<br>' +
      'Your browser does not seem to support WebGL. Take a step to the future.' +
      '<div>')
    $('body').append(container);
    return;
  }

  var container;

  var camera, scene, renderer;

  var group, text, plane;

  var speed = 50;

  var pointLight;

  var targetRotation = 0;
  var targetRotationOnMouseDown = 0;

  var mouseX = 0;
  var mouseXOnMouseDown = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  var delta = 1, clock = new THREE.Clock();

  var circleShape, particleCloud, sparksEmitter, emitterPos;
  var _rotation = 0;
  var timeOnShapePath = 0;

  var composer;
  var effectBlurX, effectBlurY, hblur, vblur;

  init();
  animate();

  function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // CAMERA

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 0, 150, 400 );

    // SCENE

    scene = new THREE.Scene();

    // LIGHTS

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set( 0, -1, 1 );
    directionalLight.position.normalize();
    scene.add( directionalLight );

    pointLight = new THREE.PointLight( 0xffffff, 2, 300 );
    pointLight.position.set( 0, 0, 0 );
    scene.add( pointLight );

    group = new THREE.Group();
    scene.add( group );

    // Create particle objects for Three.js

    var particlesLength = 70000;

    var particles = new THREE.Geometry();

    function newpos( x, y, z ) {

      return new THREE.Vector3( x, y, z );

    }


    var Pool = {

      __pools: [],

      // Get a new Vector

      get: function() {

        if ( this.__pools.length > 0 ) {

          return this.__pools.pop();

        }

        console.log( "pool ran out!" )
        return location.reload();

      },

      // Release a vector back into the pool

      add: function( v ) {

        this.__pools.push( v );

      }

    };


    for ( i = 0; i < particlesLength; i ++ ) {

      particles.vertices.push( newpos( Math.random() * 200 - 100, Math.random() * 100 + 150, Math.random() * 50 ) );
      Pool.add( i );

    }


    // Create pools of vectors

    attributes = {

      size:  { type: 'f', value: [] },
      pcolor: { type: 'c', value: [] }

    };

    var sprite = generateSprite() ;

    texture = new THREE.Texture( sprite );
    texture.needsUpdate = true;

    uniforms = {

      texture:   { type: "t", value: texture }

    };

    // PARAMETERS

    // Steadycounter
    // Life
    // Opacity
    // Hue Speed
    // Movement Speed

    function generateSprite() {

      var canvas = document.createElement( 'canvas' );
      canvas.width = 128;
      canvas.height = 128;

      var context = canvas.getContext( '2d' );


      // Just a square, doesnt work too bad with blur pp.
      // context.fillStyle = "white";
      // context.strokeStyle = "white";
      // context.fillRect(0, 0, 63, 63) ;

      // Heart Shapes are not too pretty here
      // var x = 4, y = 0;
      // context.save();
      // context.scale(8, 8); // Scale so canvas render can redraw within bounds
      // context.beginPath();
      // context.bezierCurveTo( x + 2.5, y + 2.5, x + 2.0, y, x, y );
      // context.bezierCurveTo( x - 3.0, y, x - 3.0, y + 3.5,x - 3.0,y + 3.5 );
      // context.bezierCurveTo( x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5 );
      // context.bezierCurveTo( x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5 );
      // context.bezierCurveTo( x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y );
      // context.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );

      context.beginPath();
      context.arc( 64, 64, 60, 0, Math.PI * 2, false) ;

      context.lineWidth = 0.5; //0.05
      context.stroke();
      context.restore();

      var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );

      gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
      gradient.addColorStop( 0.2, 'rgba(255,255,255,1)' );
      gradient.addColorStop( 0.4, 'rgba(200,200,200,1)' );
      gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

      context.fillStyle = gradient;

      context.fill();

      return canvas;

    }

    var shaderMaterial = new THREE.ShaderMaterial( {

      uniforms: uniforms,
      attributes: attributes,

      vertexShader: document.getElementById( 'vertexshader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true

    });

    particleCloud = new THREE.PointCloud( particles, shaderMaterial );

    var vertices = particleCloud.geometry.vertices;
    var values_size = attributes.size.value;
    var values_color = attributes.pcolor.value;

    for( var v = 0; v < vertices.length; v ++ ) {

      values_size[ v ] = 50;

      values_color[ v ] = new THREE.Color( 0x000000 );

      particles.vertices[ v ].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );

    }

    group.add( particleCloud );
    particleCloud.y = 800;

    // Create Particle Systems

    // EMITTER STUFF

    // circleShape

    var x = 0, y = 0;
    var circleRadius = 40;

    circleShape = new THREE.Shape();

    for (var i = 0; i < 16; i++) {
      var pct = (i + 1) / 16;
      var theta = pct * Math.PI * 2.0;
      var x = circleRadius * Math.cos(theta) + 20;
      var y = circleRadius * Math.sin(theta) + 50;
      if (i == 0) {
        circleShape.moveTo(x, y);
      } else {
        circleShape.lineTo(x, y);
      }
    }

    var hue = 0;
    var lightness = 0;

    var setTargetParticle = function() {

      var target = Pool.get();
      values_size[ target ] = Math.random() * 200 + 100;

      return target;

    };

    var onParticleCreated = function( p ) {

      var position = p.position;
      p.target.position = position;

      var target = p.target;

      if ( target ) {

        hue += 0.0003 * delta;
        if ( hue > 0.1 ) hue -= 0.1;

        lightness += 0.0003 * delta;
        if ( lightness > 0.05 ) lightness -= 0.05;

        // TODO Create a PointOnShape Action/Zone in the particle engine

        timeOnShapePath += 0.00035 * delta;
        if ( timeOnShapePath > 1 ) timeOnShapePath -= 1;

        var pointOnShape = circleShape.getPointAt( timeOnShapePath );
        if (!emitterpos) emitterpos = new THREE.Vector3( 0, 0, 0 );
        if (!pointOnShape) pointOnShape = circleShape.getPointAt( 0.00035 * delta );
        emitterpos.x = pointOnShape.x * 5 - 100;
        emitterpos.y = -pointOnShape.y * 5 + 400;

        pointLight.position.x = emitterpos.x;
        pointLight.position.y = emitterpos.y;
        pointLight.position.z = 100;

        particles.vertices[ target ] = p.position;

        values_color[ target ].setHSL( hue, 0.6, lightness );
        pointLight.color.setHSL( hue, 0.6, lightness );

      };

    };

    var onParticleDead = function( particle ) {

      var target = particle.target;

      if ( target ) {

        // Hide the particle

        values_color[ target ].setRGB( 0, 0, 0 );
        particles.vertices[ target ].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );

        // Mark particle system as available by returning to pool

        Pool.add( particle.target );

      }

    };

    var engineLoopUpdate = function() {

    };


    sparksEmitter = new SPARKS.Emitter( new SPARKS.SteadyCounter( 800 ) );

    emitterpos = new THREE.Vector3( 0, 0, 0 );

    sparksEmitter.addInitializer( new SPARKS.Position( new SPARKS.PointZone( emitterpos ) ) );
    sparksEmitter.addInitializer( new SPARKS.Lifetime( 1, 15 ));
    sparksEmitter.addInitializer( new SPARKS.Target( null, setTargetParticle ) );
    sparksEmitter.addInitializer( new SPARKS.Velocity( new SPARKS.PointZone( new THREE.Vector3( 0, -5, 1 ) ) ) );

    sparksEmitter.addAction( new SPARKS.Age() );
    sparksEmitter.addAction( new SPARKS.Accelerate( 0, 0, -50 ) );
    sparksEmitter.addAction( new SPARKS.Move() );
    sparksEmitter.addAction( new SPARKS.RandomDrift( 20, 100, 2000 ) );


    sparksEmitter.addCallback( "created", onParticleCreated );
    sparksEmitter.addCallback( "dead", onParticleDead );
    sparksEmitter.start();

    // End Particles

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // POST PROCESSING

    var effectFocus = new THREE.ShaderPass( THREE.FocusShader );

    var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
    effectFilm = new THREE.FilmPass( 0.5, 0.25, 2048, false );

    var shaderBlur = THREE.TriangleBlurShader;
    effectBlurX = new THREE.ShaderPass( shaderBlur, 'texture' );
    effectBlurY = new THREE.ShaderPass( shaderBlur, 'texture' );

    var radius = 15;
    var blurAmountX = radius / window.innerWidth;
    var blurAmountY = radius / window.innerHeight;

    hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
    vblur = new THREE.ShaderPass( THREE.VerticalBlurShader);

    hblur.uniforms[ 'h' ].value =  1 / window.innerWidth;
    vblur.uniforms[ 'v' ].value =  1 / window.innerHeight;

    effectBlurX.uniforms[ 'delta' ].value = new THREE.Vector2( blurAmountX, 0 );
    effectBlurY.uniforms[ 'delta' ].value = new THREE.Vector2( 0, blurAmountY );

    effectFocus.uniforms[ 'sampleDistance' ].value = 0.99; //0.94
    effectFocus.uniforms[ 'waveFactor' ].value = 0.003;  //0.00125

    var renderScene = new THREE.RenderPass( scene, camera );

    composer = new THREE.EffectComposer( renderer );
    composer.addPass( renderScene );
    composer.addPass( hblur );
    composer.addPass( vblur );

    vblur.renderToScreen = true;
    effectBlurY.renderToScreen = true;
    effectFocus.renderToScreen = true;
    effectCopy.renderToScreen = true;
    effectFilm.renderToScreen = true;

    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    //

    window.addEventListener( 'resize', onWindowResize, false );

  }

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    //

    hblur.uniforms[ 'h' ].value =  1 / window.innerWidth;
    vblur.uniforms[ 'v' ].value =  1 / window.innerHeight;

    var radius = 15;
    var blurAmountX = radius / window.innerWidth;
    var blurAmountY = radius / window.innerHeight;

    effectBlurX.uniforms[ 'delta' ].value = new THREE.Vector2( blurAmountX, 0 );
    effectBlurY.uniforms[ 'delta' ].value = new THREE.Vector2( 0, blurAmountY );

    composer.reset();

  }


  function onDocumentMouseDown( event ) {

    event.preventDefault();

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;

    if ( sparksEmitter.isRunning() ) {

      sparksEmitter.stop();

    } else {

      sparksEmitter.start();

    }

  }

  function onDocumentMouseMove( event ) {

    mouseX = event.clientX - windowHalfX;

    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

  }

  function onDocumentTouchStart( event ) {

    if ( event.touches.length === 1 ) {

      event.preventDefault();

      mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
      targetRotationOnMouseDown = targetRotation;

    }

  }

  function onDocumentTouchMove( event ) {

    if ( event.touches.length === 1 ) {

      event.preventDefault();

      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

    }

  }

  //

  function animate() {

    requestAnimationFrame( animate );

    render();

  }



  function render() {

    delta = speed * clock.getDelta();

    particleCloud.geometry.verticesNeedUpdate = true;

    attributes.size.needsUpdate = true;
    attributes.pcolor.needsUpdate = true;

    // Pretty cool effect if you enable this
    // particleCloud.rotation.y += 0.05;

    group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;

    renderer.clear();
    // renderer.render( scene, camera );

    composer.render( 0.1 );

  }
}

try {
  mainJs();
} catch(e) {
  location.reload();
}
