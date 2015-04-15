function init(){function e(e,t,i){return new THREE.Vector3(e,t,i)}function t(){var e=document.createElement("canvas");e.width=128,e.height=128;var t=e.getContext("2d");t.beginPath(),t.arc(64,64,60,0,2*Math.PI,!1),t.lineWidth=.5,t.stroke(),t.restore();var i=t.createRadialGradient(e.width/2,e.height/2,0,e.width/2,e.height/2,e.width/2);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.2,"rgba(255,255,255,1)"),i.addColorStop(.4,"rgba(200,200,200,1)"),i.addColorStop(1,"rgba(0,0,0,1)"),t.fillStyle=i,t.fill(),e}container=document.createElement("div"),document.body.appendChild(container),camera=new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,2e3),camera.position.set(0,150,400),scene=new THREE.Scene;var i=new THREE.DirectionalLight(16777215,.5);i.position.set(0,-1,1),i.position.normalize(),scene.add(i),pointLight=new THREE.PointLight(16777215,2,300),pointLight.position.set(0,0,0),scene.add(pointLight),group=new THREE.Group,scene.add(group);var n=7e4,r=new THREE.Geometry,o={__pools:[],get:function(){return this.__pools.length>0?this.__pools.pop():(console.log("pool ran out!"),null)},add:function(e){this.__pools.push(e)}};for(p=0;n>p;p++)r.vertices.push(e(200*Math.random()-100,100*Math.random()+150,50*Math.random())),o.add(p);attributes={size:{type:"f",value:[]},pcolor:{type:"c",value:[]}};var a=t();texture=new THREE.Texture(a),texture.needsUpdate=!0,uniforms={texture:{type:"t",value:texture}};var s=new THREE.ShaderMaterial({uniforms:uniforms,attributes:attributes,vertexShader:document.getElementById("vertexshader").textContent,fragmentShader:document.getElementById("fragmentshader").textContent,blending:THREE.AdditiveBlending,depthWrite:!1,transparent:!0});particleCloud=new THREE.PointCloud(r,s);for(var l=particleCloud.geometry.vertices,c=attributes.size.value,u=attributes.pcolor.value,h=0;h<l.length;h++)c[h]=50,u[h]=new THREE.Color(0),r.vertices[h].set(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY);group.add(particleCloud),particleCloud.y=800;var d=0,f=0,v=40;circleShape=new THREE.Shape;for(var p=0;16>p;p++){var m=(p+1)/16,E=m*Math.PI*2,d=v*Math.cos(E)+20,f=v*Math.sin(E)+50;console.log(d),console.log(f),0==p?circleShape.moveTo(d,f):circleShape.lineTo(d,f)}var S=0,g=0,R=function(){var e=o.get();return c[e]=200*Math.random()+100,e},T=function(e){var t=e.position;e.target.position=t;var i=e.target;if(i){S+=3e-4*delta,S>.1&&(S-=.1),g+=3e-4*delta,g>.05&&(g-=.05),timeOnShapePath+=35e-5*delta,timeOnShapePath>1&&(timeOnShapePath-=1);var n=circleShape.getPointAt(timeOnShapePath);emitterpos||(emitterpos=new THREE.Vector3(0,0,0)),emitterpos.x=5*n.x-100,emitterpos.y=5*-n.y+400,pointLight.position.x=emitterpos.x,pointLight.position.y=emitterpos.y,pointLight.position.z=100,r.vertices[i]=e.position,u[i].setHSL(S,.6,g),pointLight.color.setHSL(S,.6,g)}},y=function(e){var t=e.target;t&&(u[t].setRGB(0,0,0),r.vertices[t].set(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),o.add(e.target))};sparksEmitter=new SPARKS.Emitter(new SPARKS.SteadyCounter(800)),emitterpos=new THREE.Vector3(0,0,0),sparksEmitter.addInitializer(new SPARKS.Position(new SPARKS.PointZone(emitterpos))),sparksEmitter.addInitializer(new SPARKS.Lifetime(1,15)),sparksEmitter.addInitializer(new SPARKS.Target(null,R)),sparksEmitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0,-5,1)))),sparksEmitter.addAction(new SPARKS.Age),sparksEmitter.addAction(new SPARKS.Accelerate(0,0,-50)),sparksEmitter.addAction(new SPARKS.Move),sparksEmitter.addAction(new SPARKS.RandomDrift(20,100,2e3)),sparksEmitter.addCallback("created",T),sparksEmitter.addCallback("dead",y),sparksEmitter.start(),renderer=new THREE.WebGLRenderer,renderer.setPixelRatio(window.devicePixelRatio),renderer.setSize(window.innerWidth,window.innerHeight),container.appendChild(renderer.domElement);var P=new THREE.ShaderPass(THREE.FocusShader),w=new THREE.ShaderPass(THREE.CopyShader);effectFilm=new THREE.FilmPass(.5,.25,2048,!1);var x=THREE.TriangleBlurShader;effectBlurX=new THREE.ShaderPass(x,"texture"),effectBlurY=new THREE.ShaderPass(x,"texture");var H=15,M=H/window.innerWidth,A=H/window.innerHeight;hblur=new THREE.ShaderPass(THREE.HorizontalBlurShader),vblur=new THREE.ShaderPass(THREE.VerticalBlurShader),hblur.uniforms.h.value=1/window.innerWidth,vblur.uniforms.v.value=1/window.innerHeight,effectBlurX.uniforms.delta.value=new THREE.Vector2(M,0),effectBlurY.uniforms.delta.value=new THREE.Vector2(0,A),P.uniforms.sampleDistance.value=.99,P.uniforms.waveFactor.value=.003;var D=new THREE.RenderPass(scene,camera);composer=new THREE.EffectComposer(renderer),composer.addPass(D),composer.addPass(hblur),composer.addPass(vblur),vblur.renderToScreen=!0,effectBlurY.renderToScreen=!0,P.renderToScreen=!0,w.renderToScreen=!0,effectFilm.renderToScreen=!0,document.addEventListener("touchstart",onDocumentTouchStart,!1),document.addEventListener("touchmove",onDocumentTouchMove,!1),document.addEventListener("mousemove",onDocumentMouseMove,!1),window.addEventListener("resize",onWindowResize,!1)}function onWindowResize(){windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight),hblur.uniforms.h.value=1/window.innerWidth,vblur.uniforms.v.value=1/window.innerHeight;var e=15,t=e/window.innerWidth,i=e/window.innerHeight;effectBlurX.uniforms.delta.value=new THREE.Vector2(t,0),effectBlurY.uniforms.delta.value=new THREE.Vector2(0,i),composer.reset()}function onDocumentMouseDown(e){e.preventDefault(),mouseXOnMouseDown=e.clientX-windowHalfX,targetRotationOnMouseDown=targetRotation,sparksEmitter.isRunning()?sparksEmitter.stop():sparksEmitter.start()}function onDocumentMouseMove(e){mouseX=e.clientX-windowHalfX,targetRotation=targetRotationOnMouseDown+.02*(mouseX-mouseXOnMouseDown)}function onDocumentTouchStart(e){1===e.touches.length&&(e.preventDefault(),mouseXOnMouseDown=e.touches[0].pageX-windowHalfX,targetRotationOnMouseDown=targetRotation)}function onDocumentTouchMove(e){1===e.touches.length&&(e.preventDefault(),mouseX=e.touches[0].pageX-windowHalfX,targetRotation=targetRotationOnMouseDown+.05*(mouseX-mouseXOnMouseDown))}function animate(){requestAnimationFrame(animate),render()}function render(){delta=speed*clock.getDelta(),particleCloud.geometry.verticesNeedUpdate=!0,attributes.size.needsUpdate=!0,attributes.pcolor.needsUpdate=!0,group.rotation.y+=.05*(targetRotation-group.rotation.y),renderer.clear(),composer.render(.1)}var Stats=function(){var e=Date.now(),t=e,i=0,n=1/0,r=0,o=0,a=1/0,s=0,l=0,c=0,u=document.createElement("div");u.id="stats",u.addEventListener("mousedown",function(e){e.preventDefault(),S(++c%2)},!1),u.style.cssText="width:80px;opacity:0.9;cursor:pointer";var h=document.createElement("div");h.id="fps",h.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002",u.appendChild(h);var d=document.createElement("div");d.id="fpsText",d.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",d.innerHTML="FPS",h.appendChild(d);var f=document.createElement("div");for(f.id="fpsGraph",f.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff",h.appendChild(f);74>f.children.length;){var v=document.createElement("span");v.style.cssText="width:1px;height:30px;float:left;background-color:#113",f.appendChild(v)}var p=document.createElement("div");p.id="ms",p.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none",u.appendChild(p);var m=document.createElement("div");m.id="msText",m.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px",m.innerHTML="MS",p.appendChild(m);var E=document.createElement("div");for(E.id="msGraph",E.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0",p.appendChild(E);74>E.children.length;)v=document.createElement("span"),v.style.cssText="width:1px;height:30px;float:left;background-color:#131",E.appendChild(v);var S=function(e){switch(c=e){case 0:h.style.display="block",p.style.display="none";break;case 1:h.style.display="none",p.style.display="block"}};return{REVISION:11,domElement:u,setMode:S,begin:function(){e=Date.now()},end:function(){var c=Date.now();i=c-e,n=Math.min(n,i),r=Math.max(r,i),m.textContent=i+" MS ("+n+"-"+r+")";var u=Math.min(30,30-30*(i/200));return E.appendChild(E.firstChild).style.height=u+"px",l++,c>t+1e3&&(o=Math.round(1e3*l/(c-t)),a=Math.min(a,o),s=Math.max(s,o),d.textContent=o+" FPS ("+a+"-"+s+")",u=Math.min(30,30-30*(o/100)),f.appendChild(f.firstChild).style.height=u+"px",t=c,l=0),c},update:function(){e=this.end()}}},TWEEN=TWEEN||function(){var e=[];return{REVISION:"7",getAll:function(){return e},removeAll:function(){e=[]},add:function(t){e.push(t)},remove:function(t){t=e.indexOf(t),-1!==t&&e.splice(t,1)},update:function(t){if(0===e.length)return!1;for(var i=0,n=e.length,t=void 0!==t?t:Date.now();n>i;)e[i].update(t)?i++:(e.splice(i,1),n--);return!0}}}();TWEEN.Tween=function(e){var t={},i={},n=1e3,r=0,o=null,a=TWEEN.Easing.Linear.None,s=TWEEN.Interpolation.Linear,l=[],c=null,u=!1,h=null,d=null;this.to=function(e,t){return null!==t&&(n=t),i=e,this},this.start=function(n){TWEEN.add(this),u=!1,o=void 0!==n?n:Date.now(),o+=r;for(var a in i)if(null!==e[a]){if(i[a]instanceof Array){if(0===i[a].length)continue;i[a]=[e[a]].concat(i[a])}t[a]=e[a]}return this},this.stop=function(){return TWEEN.remove(this),this},this.delay=function(e){return r=e,this},this.easing=function(e){return a=e,this},this.interpolation=function(e){return s=e,this},this.chain=function(){return l=arguments,this},this.onStart=function(e){return c=e,this},this.onUpdate=function(e){return h=e,this},this.onComplete=function(e){return d=e,this},this.update=function(r){if(o>r)return!0;!1===u&&(null!==c&&c.call(e),u=!0);var f,v=(r-o)/n,v=v>1?1:v,p=a(v);for(f in t){var m=t[f],E=i[f];e[f]=E instanceof Array?s(E,p):m+(E-m)*p}if(null!==h&&h.call(e,p),1==v){for(null!==d&&d.call(e),v=0,p=l.length;p>v;v++)l[v].start(r);return!1}return!0}},TWEEN.Easing={Linear:{None:function(e){return e}},Quadratic:{In:function(e){return e*e},Out:function(e){return e*(2-e)},InOut:function(e){return 1>(e*=2)?.5*e*e:-.5*(--e*(e-2)-1)}},Cubic:{In:function(e){return e*e*e},Out:function(e){return--e*e*e+1},InOut:function(e){return 1>(e*=2)?.5*e*e*e:.5*((e-=2)*e*e+2)}},Quartic:{In:function(e){return e*e*e*e},Out:function(e){return 1- --e*e*e*e},InOut:function(e){return 1>(e*=2)?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2)}},Quintic:{In:function(e){return e*e*e*e*e},Out:function(e){return--e*e*e*e*e+1},InOut:function(e){return 1>(e*=2)?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2)}},Sinusoidal:{In:function(e){return 1-Math.cos(e*Math.PI/2)},Out:function(e){return Math.sin(e*Math.PI/2)},InOut:function(e){return.5*(1-Math.cos(Math.PI*e))}},Exponential:{In:function(e){return 0===e?0:Math.pow(1024,e-1)},Out:function(e){return 1===e?1:1-Math.pow(2,-10*e)},InOut:function(e){return 0===e?0:1===e?1:1>(e*=2)?.5*Math.pow(1024,e-1):.5*(-Math.pow(2,-10*(e-1))+2)}},Circular:{In:function(e){return 1-Math.sqrt(1-e*e)},Out:function(e){return Math.sqrt(1- --e*e)},InOut:function(e){return 1>(e*=2)?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1)}},Elastic:{In:function(e){var t,i=.1;return 0===e?0:1===e?1:(!i||1>i?(i=1,t=.1):t=.4*Math.asin(1/i)/(2*Math.PI),-(i*Math.pow(2,10*(e-=1))*Math.sin(2*(e-t)*Math.PI/.4)))},Out:function(e){var t,i=.1;return 0===e?0:1===e?1:(!i||1>i?(i=1,t=.1):t=.4*Math.asin(1/i)/(2*Math.PI),i*Math.pow(2,-10*e)*Math.sin(2*(e-t)*Math.PI/.4)+1)},InOut:function(e){var t,i=.1;return 0===e?0:1===e?1:(!i||1>i?(i=1,t=.1):t=.4*Math.asin(1/i)/(2*Math.PI),1>(e*=2)?-.5*i*Math.pow(2,10*(e-=1))*Math.sin(2*(e-t)*Math.PI/.4):.5*i*Math.pow(2,-10*(e-=1))*Math.sin(2*(e-t)*Math.PI/.4)+1)}},Back:{In:function(e){return e*e*(2.70158*e-1.70158)},Out:function(e){return--e*e*(2.70158*e+1.70158)+1},InOut:function(e){return 1>(e*=2)?.5*e*e*(3.5949095*e-2.5949095):.5*((e-=2)*e*(3.5949095*e+2.5949095)+2)}},Bounce:{In:function(e){return 1-TWEEN.Easing.Bounce.Out(1-e)},Out:function(e){return 1/2.75>e?7.5625*e*e:2/2.75>e?7.5625*(e-=1.5/2.75)*e+.75:2.5/2.75>e?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},InOut:function(e){return.5>e?.5*TWEEN.Easing.Bounce.In(2*e):.5*TWEEN.Easing.Bounce.Out(2*e-1)+.5}}},TWEEN.Interpolation={Linear:function(e,t){var i=e.length-1,n=i*t,r=Math.floor(n),o=TWEEN.Interpolation.Utils.Linear;return 0>t?o(e[0],e[1],n):t>1?o(e[i],e[i-1],i-n):o(e[r],e[r+1>i?i:r+1],n-r)},Bezier:function(e,t){var i,n=0,r=e.length-1,o=Math.pow,a=TWEEN.Interpolation.Utils.Bernstein;for(i=0;r>=i;i++)n+=o(1-t,r-i)*o(t,i)*e[i]*a(r,i);return n},CatmullRom:function(e,t){var i=e.length-1,n=i*t,r=Math.floor(n),o=TWEEN.Interpolation.Utils.CatmullRom;return e[0]===e[i]?(0>t&&(r=Math.floor(n=i*(1+t))),o(e[(r-1+i)%i],e[r],e[(r+1)%i],e[(r+2)%i],n-r)):0>t?e[0]-(o(e[0],e[0],e[1],e[1],-n)-e[0]):t>1?e[i]-(o(e[i],e[i],e[i-1],e[i-1],n-i)-e[i]):o(e[r?r-1:0],e[r],e[r+1>i?i:r+1],e[r+2>i?i:r+2],n-r)},Utils:{Linear:function(e,t,i){return(t-e)*i+e},Bernstein:function(e,t){var i=TWEEN.Interpolation.Utils.Factorial;return i(e)/i(t)/i(e-t)},Factorial:function(){var e=[1];return function(t){var i,n=1;if(e[t])return e[t];for(i=t;i>1;i--)n*=i;return e[t]=n}}(),CatmullRom:function(e,t,i,n,r){var e=.5*(i-e),n=.5*(n-t),o=r*r;return(2*t-2*i+e+n)*r*o+(-3*t+3*i-2*e-n)*o+e*r+t}}};var SPARKS={};SPARKS.Emitter=function(e){this._counter=e?e:new SPARKS.SteadyCounter(10),this._particles=[],this._initializers=[],this._actions=[],this._activities=[],this._handlers=[],this.callbacks={}},SPARKS.Emitter.prototype={_TIMESTEP:15,_timer:null,_lastTime:null,_timerStep:10,_velocityVerlet:!0,start:function(){this._lastTime=Date.now(),this._timer=setTimeout(this.step,this._timerStep,this),this._isRunning=!0},stop:function(){this._isRunning=!1,clearTimeout(this._timer)},isRunning:function(){return this._isRunning&!0},step:function(e){var t=Date.now(),i=t-e._lastTime;if(this._velocityVerlet)e.update(i/1e3),e._lastTime=t;else{var n=20*e._TIMESTEP;for(i>=n&&(i=n);i>=e._TIMESTEP;)e.update(e._TIMESTEP/1e3),i-=e._TIMESTEP;e._lastTime=t-i}e._isRunning&&setTimeout(e.step,e._timerStep,e)},update:function(e){var t,i,n=this._counter.updateEmitter(this,e);for(t=0;n>t;t++)this.createParticle();for(n=this._activities.length,t=0;n>t;t++)this._activities[t].update(this,e);n=this._actions.length;var r,o,a=this._particles.length;for(i=0;n>i;i++)for(o=this._actions[i],t=0;a>t;++t)r=this._particles[t],o.update(this,r,e);for(t=a;t--;)r=this._particles[t],r.isDead?(this._particles.splice(t,1),this.dispatchEvent("dead",r),SPARKS.VectorPool.release(r.position),SPARKS.VectorPool.release(r.velocity)):this.dispatchEvent("updated",r);this.dispatchEvent("loopUpdated")},createParticle:function(){var e,t=new SPARKS.Particle,i=this._initializers.length;for(e=0;i>e;e++)this._initializers[e].initialize(this,t);return this._particles.push(t),this.dispatchEvent("created",t),t},addInitializer:function(e){this._initializers.push(e)},addAction:function(e){this._actions.push(e)},removeInitializer:function(e){var t=this._initializers.indexOf(e);t>-1&&this._initializers.splice(t,1)},removeAction:function(e){var t=this._actions.indexOf(e);t>-1&&this._actions.splice(t,1)},addCallback:function(e,t){this.callbacks[e]=t},dispatchEvent:function(e,t){var i=this.callbacks[e];i&&i(t)}},SPARKS.EVENT_PARTICLE_CREATED="created",SPARKS.EVENT_PARTICLE_UPDATED="updated",SPARKS.EVENT_PARTICLE_DEAD="dead",SPARKS.EVENT_LOOP_UPDATED="loopUpdated",SPARKS.SteadyCounter=function(e){this.rate=e,this.leftover=0},SPARKS.SteadyCounter.prototype.updateEmitter=function(e,t){var i=t*this.rate+this.leftover,n=Math.floor(i);return this.leftover=i-n,n},SPARKS.ShotCounter=function(e){this.particles=e,this.used=!1},SPARKS.ShotCounter.prototype.updateEmitter=function(e,t){return this.used?0:(this.used=!0,this.particles)},SPARKS.Particle=function(){this.lifetime=0,this.age=0,this.energy=1,this.isDead=!1,this.target=null,this.position=SPARKS.VectorPool.get().set(0,0,0),this.velocity=SPARKS.VectorPool.get().set(0,0,0),this._oldvelocity=SPARKS.VectorPool.get().set(0,0,0)},SPARKS.Action=function(){this._priority=0},SPARKS.Age=function(e){this._easing=null==e?TWEEN.Easing.Linear.None:e},SPARKS.Age.prototype.update=function(e,t,i){if(t.age+=i,t.age>=t.lifetime)t.energy=0,t.isDead=!0;else{var n=this._easing(t.age/t.lifetime);t.energy=-1*n+1}},SPARKS.Move=function(){},SPARKS.Move.prototype.update=function(e,t,i){var n=t.position,r=t.velocity,o=t._oldvelocity;this._velocityVerlet?(n.x+=.5*(r.x+o.x)*i,n.y+=.5*(r.y+o.y)*i,n.z+=.5*(r.z+o.z)*i):(n.x+=r.x*i,n.y+=r.y*i,n.z+=r.z*i)},SPARKS.DeathZone=function(e){this.zone=e},SPARKS.DeathZone.prototype.update=function(e,t,i){this.zone.contains(t.position)&&(t.isDead=!0)},SPARKS.ActionZone=function(e,t){this.action=e,this.zone=t},SPARKS.ActionZone.prototype.update=function(e,t,i){this.zone.contains(t.position)&&this.action.update(e,t,i)},SPARKS.Accelerate=function(e,t,i){return e instanceof THREE.Vector3?void(this.acceleration=e):void(this.acceleration=new THREE.Vector3(e,t,i))},SPARKS.Accelerate.prototype.update=function(e,t,i){var n=this.acceleration,r=t.velocity;t._oldvelocity.set(r.x,r.y,r.z),r.x+=n.x*i,r.y+=n.y*i,r.z+=n.z*i},SPARKS.AccelerateFactor=function(e){this.factor=e},SPARKS.AccelerateFactor.prototype.update=function(e,t,i){var n,r=this.factor,o=t.velocity,a=o.length();a>0&&(n=r*i/a,n+=1,o.multiplyScalar(n))},SPARKS.AccelerateVelocity=function(e){this.factor=e},SPARKS.AccelerateVelocity.prototype.update=function(e,t,i){var n=this.factor,r=t.velocity;r.z+=-r.x*n,r.y+=r.z*n,r.x+=r.y*n},SPARKS.RandomDrift=function(e,t,i){return e instanceof THREE.Vector3?void(this.drift=e):void(this.drift=new THREE.Vector3(e,t,i))},SPARKS.RandomDrift.prototype.update=function(e,t,i){var n=this.drift,r=t.velocity;r.x+=(Math.random()-.5)*n.x*i,r.y+=(Math.random()-.5)*n.y*i,r.z+=(Math.random()-.5)*n.z*i},SPARKS.Zone=function(){},SPARKS.PointZone=function(e){this.pos=e},SPARKS.PointZone.prototype.getLocation=function(){return this.pos},SPARKS.PointZone=function(e){this.pos=e},SPARKS.PointZone.prototype.getLocation=function(){return this.pos},SPARKS.LineZone=function(e,t){this.start=e,this.end=t,this._length=t.clone().sub(e)},SPARKS.LineZone.prototype.getLocation=function(){var e=this._length.clone();return e.multiplyScalar(Math.random()),e.add(this.start)},SPARKS.ParallelogramZone=function(e,t,i){this.corner=e,this.side1=t,this.side2=i},SPARKS.ParallelogramZone.prototype.getLocation=function(){var e=this.side1.clone().multiplyScalar(Math.random()),t=this.side2.clone().multiplyScalar(Math.random());return e.add(t),e.add(this.corner)},SPARKS.CubeZone=function(e,t,i,n){this.position=e,this.x=t,this.y=i,this.z=n},SPARKS.CubeZone.prototype.getLocation=function(){var e=this.position.clone();return e.x+=Math.random()*this.x,e.y+=Math.random()*this.y,e.z+=Math.random()*this.z,e},SPARKS.CubeZone.prototype.contains=function(e){var t=this.position.x,i=this.position.y,n=this.position.z,r=this.x,o=this.y,a=this.z;0>r&&(t+=r,r=Math.abs(r)),0>o&&(i+=o,o=Math.abs(o)),0>a&&(n+=a,a=Math.abs(a));var s=e.x-t,l=e.y-i,c=e.z-n;return s>0&&r>s&&l>0&&o>l&&c>0&&a>c?!0:!1},SPARKS.SphereCapZone=function(e,t,i,n,r,o){this.x=e,this.y=t,this.z=i,this.minr=n,this.maxr=r,this.angle=o},SPARKS.SphereCapZone.prototype.getLocation=function(){var e=2*Math.PI*SPARKS.Utils.random(),t=SPARKS.Utils.random(),i=SPARKS.VectorPool.get().set(t*Math.cos(e),-1/Math.tan(this.angle*SPARKS.Utils.DEGREE_TO_RADIAN),t*Math.sin(e)),n=this.minr-(this.minr-this.maxr)*Math.random();return i.multiplyScalar(n),i.__markedForReleased=!0,i},SPARKS.Lifetime=function(e,t){this._min=e,this._max=t?t:e},SPARKS.Lifetime.prototype.initialize=function(e,t){t.lifetime=this._min+SPARKS.Utils.random()*(this._max-this._min)},SPARKS.Position=function(e){this.zone=e},SPARKS.Position.prototype.initialize=function(e,t){var i=this.zone.getLocation();t.position.set(i.x,i.y,i.z)},SPARKS.Velocity=function(e){this.zone=e},SPARKS.Velocity.prototype.initialize=function(e,t){var i=this.zone.getLocation();t.velocity.set(i.x,i.y,i.z),i.__markedForReleased&&(SPARKS.VectorPool.release(i),i.__markedForReleased=!1)},SPARKS.Target=function(e,t){this.target=e,this.callback=t},SPARKS.Target.prototype.initialize=function(e,t){t.target=this.callback?this.callback():this.target},SPARKS.VectorPool={__pools:[],get:function(){return this.__pools.length>0?this.__pools.pop():this._addToPool()},release:function(e){this.__pools.push(e)},_addToPool:function(){for(var e=0,t=100;t>e;e++)this.__pools.push(new THREE.Vector3);return new THREE.Vector3}},SPARKS.Utils={random:function(){return Math.random()},DEGREE_TO_RADIAN:Math.PI/180,TWOPI:2*Math.PI,getPerpendiculars:function(e){var t=this.getPerpendicular(e),i=e.cross(t);return i.normalize(),[t,i]},getPerpendicular:function(e){if(0==e.x)return new THREE.Vector3D(1,0,0);var t=new THREE.Vector3(e.y,-e.x,0);return t.normalize()}},THREE.CopyShader={uniforms:{tDiffuse:{type:"t",value:null},opacity:{type:"f",value:1}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform float opacity;","uniform sampler2D tDiffuse;","varying vec2 vUv;","void main() {","vec4 texel = texture2D( tDiffuse, vUv );","gl_FragColor = opacity * texel;","}"].join("\n")},THREE.FilmShader={uniforms:{tDiffuse:{type:"t",value:null},time:{type:"f",value:0},nIntensity:{type:"f",value:.5},sIntensity:{type:"f",value:.05},sCount:{type:"f",value:4096},grayscale:{type:"i",value:1}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform float time;","uniform bool grayscale;","uniform float nIntensity;","uniform float sIntensity;","uniform float sCount;","uniform sampler2D tDiffuse;","varying vec2 vUv;","void main() {","vec4 cTextureScreen = texture2D( tDiffuse, vUv );","float x = vUv.x * vUv.y * time *  1000.0;","x = mod( x, 13.0 ) * mod( x, 123.0 );","float dx = mod( x, 0.01 );","vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );","vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );","cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;","cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );","if( grayscale ) {","cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );","}","gl_FragColor =  vec4( cResult, cTextureScreen.a );","}"].join("\n")},THREE.FocusShader={uniforms:{tDiffuse:{type:"t",value:null},screenWidth:{type:"f",value:1024},screenHeight:{type:"f",value:1024},sampleDistance:{type:"f",value:.94},waveFactor:{type:"f",value:.00125}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform float screenWidth;","uniform float screenHeight;","uniform float sampleDistance;","uniform float waveFactor;","uniform sampler2D tDiffuse;","varying vec2 vUv;","void main() {","vec4 color, org, tmp, add;","float sample_dist, f;","vec2 vin;","vec2 uv = vUv;","add = color = org = texture2D( tDiffuse, uv );","vin = ( uv - vec2( 0.5 ) ) * vec2( 1.4 );","sample_dist = dot( vin, vin ) * 2.0;","f = ( waveFactor * 100.0 + sample_dist ) * sampleDistance * 4.0;","vec2 sampleSize = vec2(  1.0 / screenWidth, 1.0 / screenHeight ) * vec2( f );","add += tmp = texture2D( tDiffuse, uv + vec2( 0.111964, 0.993712 ) * sampleSize );","if( tmp.b < color.b ) color = tmp;","add += tmp = texture2D( tDiffuse, uv + vec2( 0.846724, 0.532032 ) * sampleSize );","if( tmp.b < color.b ) color = tmp;","add += tmp = texture2D( tDiffuse, uv + vec2( 0.943883, -0.330279 ) * sampleSize );","if( tmp.b < color.b ) color = tmp;","add += tmp = texture2D( tDiffuse, uv + vec2( 0.330279, -0.943883 ) * sampleSize );","if( tmp.b < color.b ) color = tmp;","add += tmp = texture2D( tDiffuse, uv + vec2( -0.532032, -0.846724 ) * sampleSize );","if( tmp.b < color.b ) color = tmp;","add += tmp = texture2D( tDiffuse, uv + vec2( -0.993712, -0.111964 ) * sampleSize );","if( tmp.b < color.b ) color = tmp;","add += tmp = texture2D( tDiffuse, uv + vec2( -0.707107, 0.707107 ) * sampleSize );","if( tmp.b < color.b ) color = tmp;","color = color * vec4( 2.0 ) - ( add / vec4( 8.0 ) );","color = color + ( add / vec4( 8.0 ) - color ) * ( vec4( 1.0 ) - vec4( sample_dist * 0.5 ) );","gl_FragColor = vec4( color.rgb * color.rgb * vec3( 0.95 ) + color.rgb, 1.0 );","}"].join("\n")},THREE.HorizontalBlurShader={uniforms:{tDiffuse:{type:"t",value:null},h:{type:"f",value:1/512}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D tDiffuse;","uniform float h;","varying vec2 vUv;","void main() {","vec4 sum = vec4( 0.0 );","sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;","sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;","sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;","sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;","sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;","sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;","sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;","sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;","sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;","gl_FragColor = sum;","}"].join("\n")},THREE.TriangleBlurShader={uniforms:{texture:{type:"t",value:null},delta:{type:"v2",value:new THREE.Vector2(1,1)}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["#define ITERATIONS 10.0","uniform sampler2D texture;","uniform vec2 delta;","varying vec2 vUv;","float random( vec3 scale, float seed ) {","return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed );","}","void main() {","vec4 color = vec4( 0.0 );","float total = 0.0;","float offset = random( vec3( 12.9898, 78.233, 151.7182 ), 0.0 );","for ( float t = -ITERATIONS; t <= ITERATIONS; t ++ ) {","float percent = ( t + offset - 0.5 ) / ITERATIONS;","float weight = 1.0 - abs( percent );","color += texture2D( texture, vUv + delta * percent ) * weight;","total += weight;","}","gl_FragColor = color / total;","}"].join("\n")},THREE.VerticalBlurShader={uniforms:{tDiffuse:{type:"t",value:null},v:{type:"f",value:1/512}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D tDiffuse;","uniform float v;","varying vec2 vUv;","void main() {","vec4 sum = vec4( 0.0 );","sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;","sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;","sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;","sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;","sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;","sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;","sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;","sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;","sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;","gl_FragColor = sum;","}"].join("\n")},THREE.EffectComposer=function(e,t){if(this.renderer=e,void 0===t){var i=e.getPixelRatio(),n=Math.floor(e.context.canvas.width/i)||1,r=Math.floor(e.context.canvas.height/i)||1,o={minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBFormat,stencilBuffer:!1};t=new THREE.WebGLRenderTarget(n,r,o)}this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.passes=[],void 0===THREE.CopyShader&&console.error("THREE.EffectComposer relies on THREE.CopyShader"),this.copyPass=new THREE.ShaderPass(THREE.CopyShader)},THREE.EffectComposer.prototype={swapBuffers:function(){var e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e},addPass:function(e){this.passes.push(e)},insertPass:function(e,t){this.passes.splice(t,0,e)},render:function(e){this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2;var t,i,n=!1,r=this.passes.length;for(i=0;r>i;i++)if(t=this.passes[i],t.enabled){if(t.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),t.needsSwap){if(n){var o=this.renderer.context;o.stencilFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),o.stencilFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}t instanceof THREE.MaskPass?n=!0:t instanceof THREE.ClearMaskPass&&(n=!1)}},reset:function(e){if(void 0===e){e=this.renderTarget1.clone();var t=this.renderer.getPixelRatio();e.width=Math.floor(this.renderer.context.canvas.width/t),e.height=Math.floor(this.renderer.context.canvas.height/t)}this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2},setSize:function(e,t){var i=this.renderTarget1.clone();i.width=e,i.height=t,this.reset(i)}},THREE.RenderPass=function(e,t,i,n,r){this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=void 0!==r?r:1,this.oldClearColor=new THREE.Color,this.oldClearAlpha=1,this.enabled=!0,this.clear=!0,this.needsSwap=!1},THREE.RenderPass.prototype={render:function(e,t,i,n){this.scene.overrideMaterial=this.overrideMaterial,this.clearColor&&(this.oldClearColor.copy(e.getClearColor()),this.oldClearAlpha=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),e.render(this.scene,this.camera,i,this.clear),this.clearColor&&e.setClearColor(this.oldClearColor,this.oldClearAlpha),this.scene.overrideMaterial=null}},THREE.ShaderPass=function(e,t){this.textureID=void 0!==t?t:"tDiffuse",this.uniforms=THREE.UniformsUtils.clone(e.uniforms),this.material=new THREE.ShaderMaterial({defines:e.defines||{},uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.renderToScreen=!1,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),this.scene=new THREE.Scene,this.quad=new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),this.scene.add(this.quad)},THREE.ShaderPass.prototype={render:function(e,t,i,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i),this.quad.material=this.material,this.renderToScreen?e.render(this.scene,this.camera):e.render(this.scene,this.camera,t,this.clear)}},THREE.MaskPass=function(e,t){this.scene=e,this.camera=t,this.enabled=!0,this.clear=!0,this.needsSwap=!1,this.inverse=!1},THREE.MaskPass.prototype={render:function(e,t,i,n){var r=e.context;r.colorMask(!1,!1,!1,!1),r.depthMask(!1);var o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.enable(r.STENCIL_TEST),r.stencilOp(r.REPLACE,r.REPLACE,r.REPLACE),r.stencilFunc(r.ALWAYS,o,4294967295),r.clearStencil(a),e.render(this.scene,this.camera,i,this.clear),e.render(this.scene,this.camera,t,this.clear),r.colorMask(!0,!0,!0,!0),r.depthMask(!0),r.stencilFunc(r.EQUAL,1,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP)}},THREE.ClearMaskPass=function(){this.enabled=!0},THREE.ClearMaskPass.prototype={render:function(e,t,i,n){var r=e.context;r.disable(r.STENCIL_TEST)}},THREE.BloomPass=function(e,t,i,n){e=void 0!==e?e:1,t=void 0!==t?t:25,i=void 0!==i?i:4,n=void 0!==n?n:256;var r={minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBFormat};this.renderTargetX=new THREE.WebGLRenderTarget(n,n,r),this.renderTargetY=new THREE.WebGLRenderTarget(n,n,r),
void 0===THREE.CopyShader&&console.error("THREE.BloomPass relies on THREE.CopyShader");var o=THREE.CopyShader;this.copyUniforms=THREE.UniformsUtils.clone(o.uniforms),this.copyUniforms.opacity.value=e,this.materialCopy=new THREE.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader,blending:THREE.AdditiveBlending,transparent:!0}),void 0===THREE.ConvolutionShader&&console.error("THREE.BloomPass relies on THREE.ConvolutionShader");var a=THREE.ConvolutionShader;this.convolutionUniforms=THREE.UniformsUtils.clone(a.uniforms),this.convolutionUniforms.uImageIncrement.value=THREE.BloomPass.blurX,this.convolutionUniforms.cKernel.value=THREE.ConvolutionShader.buildKernel(i),this.materialConvolution=new THREE.ShaderMaterial({uniforms:this.convolutionUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,defines:{KERNEL_SIZE_FLOAT:t.toFixed(1),KERNEL_SIZE_INT:t.toFixed(0)}}),this.enabled=!0,this.needsSwap=!1,this.clear=!1,this.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),this.scene=new THREE.Scene,this.quad=new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),this.scene.add(this.quad)},THREE.BloomPass.prototype={render:function(e,t,i,n,r){r&&e.context.disable(e.context.STENCIL_TEST),this.quad.material=this.materialConvolution,this.convolutionUniforms.tDiffuse.value=i,this.convolutionUniforms.uImageIncrement.value=THREE.BloomPass.blurX,e.render(this.scene,this.camera,this.renderTargetX,!0),this.convolutionUniforms.tDiffuse.value=this.renderTargetX,this.convolutionUniforms.uImageIncrement.value=THREE.BloomPass.blurY,e.render(this.scene,this.camera,this.renderTargetY,!0),this.quad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetY,r&&e.context.enable(e.context.STENCIL_TEST),e.render(this.scene,this.camera,i,this.clear)}},THREE.BloomPass.blurX=new THREE.Vector2(.001953125,0),THREE.BloomPass.blurY=new THREE.Vector2(0,.001953125),THREE.FilmPass=function(e,t,i,n){void 0===THREE.FilmShader&&console.error("THREE.FilmPass relies on THREE.FilmShader");var r=THREE.FilmShader;this.uniforms=THREE.UniformsUtils.clone(r.uniforms),this.material=new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),void 0!==n&&(this.uniforms.grayscale.value=n),void 0!==e&&(this.uniforms.nIntensity.value=e),void 0!==t&&(this.uniforms.sIntensity.value=t),void 0!==i&&(this.uniforms.sCount.value=i),this.enabled=!0,this.renderToScreen=!1,this.needsSwap=!0,this.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),this.scene=new THREE.Scene,this.quad=new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),this.scene.add(this.quad)},THREE.FilmPass.prototype={render:function(e,t,i,n){this.uniforms.tDiffuse.value=i,this.uniforms.time.value+=n,this.quad.material=this.material,this.renderToScreen?e.render(this.scene,this.camera):e.render(this.scene,this.camera,t,!1)}};var container,camera,scene,renderer,group,text,plane,speed=50,pointLight,targetRotation=0,targetRotationOnMouseDown=0,mouseX=0,mouseXOnMouseDown=0,windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,delta=1,clock=new THREE.Clock,circleShape,particleCloud,sparksEmitter,emitterPos,_rotation=0,timeOnShapePath=0,composer,effectBlurX,effectBlurY,hblur,vblur;init(),animate();