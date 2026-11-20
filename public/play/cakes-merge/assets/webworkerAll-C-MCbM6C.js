var q=Object.defineProperty;var m=(F,e)=>q(F,"name",{value:e,configurable:!0});import{M as z,y as W,e as L,aH as j,ai as V,D as b,G as N,b as $,a7 as H,a3 as J,aj as _,T as v,az as K,V as Q,w as Z,W as Y}from"./index-DAdt-VRj.js";import{F as D}from"./Filter-DSlZcpzh.js";const M=new z;function X(F,e){e.clear();const t=e.matrix;for(let r=0;r<F.length;r++){const i=F[r];if(i.globalDisplayStatus<7)continue;const s=i.renderGroup??i.parentRenderGroup;s?.isCachedAsTexture?e.matrix=M.copyFrom(s.textureOffsetInverseTransform).append(i.worldTransform):s?._parentCacheAsTextureRenderGroup?e.matrix=M.copyFrom(s._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(i.groupTransform):e.matrix=i.worldTransform,e.addBounds(i.bounds)}return e.matrix=t,e}m(X,"getGlobalRenderableBounds");function U(F){return typeof F.getCanvasFilterString=="function"}m(U,"isCanvasFilterCapable");const R=class R{constructor(){this.skip=!1,this.useClip=!1,this.filters=null,this.container=null,this.bounds=new V,this.cssFilterString=""}};m(R,"CanvasFilterFrame");let k=R;const I=class I{constructor(e){this._filterStack=[],this._filterStackIndex=0,this._savedStates=[],this._alphaMultiplier=1,this._warnedFilterTypes=new Set,this.renderer=e}push(e){const t=this._pushFilterFrame(),r=e.filterEffect.filters;if(t.skip=!1,t.useClip=!1,t.filters=r,t.container=e.container,t.cssFilterString="",r.every(a=>!a.enabled)){t.skip=!0;return}const i=[],s=1;for(const a of r){if(!a.enabled)continue;if(!U(a)){this._warnUnsupportedFilter(a);continue}const l=a.getCanvasFilterString();if(l===null){this._warnUnsupportedFilter(a);continue}l&&i.push(l)}if(i.length===0&&s===1){t.skip=!0;return}t.cssFilterString=i.join(" "),this._calculateFilterArea(e,t.bounds),t.useClip=!!e.filterEffect.filterArea;const n=this.renderer.canvasContext.activeContext,o=n.filter||"none";if(this._savedStates.push({filter:o,alphaMultiplier:this._alphaMultiplier}),t.useClip&&Number.isFinite(t.bounds.width)&&Number.isFinite(t.bounds.height)&&t.bounds.width>0&&t.bounds.height>0){const a=this.renderer.canvasContext.activeResolution||1;n.save(),n.setTransform(1,0,0,1,0,0),n.beginPath(),n.rect(t.bounds.x*a,t.bounds.y*a,t.bounds.width*a,t.bounds.height*a),n.clip()}else t.useClip=!1;t.cssFilterString&&(n.filter=o!=="none"?`${o} ${t.cssFilterString}`:t.cssFilterString)}pop(){const e=this._popFilterFrame();if(e.skip)return;const t=this._savedStates.pop();if(!t)return;const r=this.renderer.canvasContext.activeContext;e.useClip?r.restore():r.filter=t.filter,this._alphaMultiplier=t.alphaMultiplier}generateFilteredTexture({texture:e,filters:t}){if(!t?.length||t.every(d=>!d.enabled))return e;const r=[],i=1;for(const d of t){if(!d.enabled)continue;if(!U(d)){this._warnUnsupportedFilter(d);continue}const h=d.getCanvasFilterString();if(h===null){this._warnUnsupportedFilter(d);continue}h&&r.push(h)}if(r.length===0&&i===1)return e;const s=W.getCanvasSource(e);if(!s)return e;const n=e.frame,o=e.source._resolution??e.source.resolution??1,a=n.width,l=n.height,f=L.getOptimalCanvasAndContext(a,l,o),{canvas:c,context:u}=f;u.setTransform(1,0,0,1,0,0),u.clearRect(0,0,c.width,c.height),r.length&&(u.filter=r.join(" "));const p=n.x*o,x=n.y*o,g=a*o,T=l*o;return u.drawImage(s,p,x,g,T,0,0,g,T),u.filter="none",u.globalAlpha=1,j(c,a,l,o)}_calculateFilterArea(e,t){if(e.renderables?X(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const i=(e.container.renderGroup||e.container.parentRenderGroup)?.cacheToLocalTransform;i&&t.applyMatrix(i)}}_warnUnsupportedFilter(e){const t=e?.constructor?.name||"Filter";this._warnedFilterTypes.has(t)||(this._warnedFilterTypes.add(t),console.warn(`CanvasRenderer: filter "${t}" is not supported in Canvas2D and will be skipped.`))}get alphaMultiplier(){return this._alphaMultiplier}_pushFilterFrame(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new k),this._filterStackIndex++,e}_popFilterFrame(){return this._filterStackIndex<=0?this._filterStack[0]:(this._filterStackIndex--,this._filterStack[this._filterStackIndex])}destroy(){this._filterStack=null,this._savedStates=null,this._warnedFilterTypes=null,this._alphaMultiplier=1}};m(I,"CanvasFilterSystem");let y=I;y.extension={type:[b.CanvasSystem],name:"filter"};var ee=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,te=`in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
void main() {
    finalColor = texture(uTexture, vTextureCoord);
}
`,E=`struct GlobalFilterUniforms {
  uInputSize: vec4<f32>,
  uInputPixel: vec4<f32>,
  uInputClamp: vec4<f32>,
  uOutputFrame: vec4<f32>,
  uGlobalFrame: vec4<f32>,
  uOutputTexture: vec4<f32>,
};

@group(0) @binding(0) var <uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;

struct VSOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>
};

fn filterVertexPosition(aPosition: vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord(aPosition: vec2<f32>) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition: vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {
    return textureSample(uTexture, uSampler, uv);
}
`;const C=class C extends D{constructor(){const e=N.from({vertex:{source:E,entryPoint:"mainVertex"},fragment:{source:E,entryPoint:"mainFragment"},name:"passthrough-filter"}),t=$.from({vertex:ee,fragment:te,name:"passthrough-filter"});super({gpuProgram:e,glProgram:t})}};m(C,"PassthroughFilter");let G=C;const B=class B{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}};m(B,"FilterPipe");let w=B;w.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"filter"};const re=new K({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])}),O=class O{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new V,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0},this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}};m(O,"FilterData");let P=O;const A=class A{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new H({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new J({}),this.renderer=e}get activeBackTexture(){return this._activeFilterData?.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,i=this._pushFilterData();i.skip=!1,i.filters=r,i.container=e.container,i.outputRenderSurface=t.renderTarget.renderSurface;const s=t.renderTarget.renderTarget.colorTexture.source,n=s.resolution,o=s.antialias;if(r.every(p=>!p.enabled)){i.skip=!0;return}const a=i.bounds;if(this._calculateFilterArea(e,a),this._calculateFilterBounds(i,t.renderTarget.rootViewPort,o,n,1),i.skip)return;const l=this._getPreviousFilterData(),f=this._findFilterResolution(n);let c=0,u=0;l&&(c=l.bounds.minX,u=l.bounds.minY),this._calculateGlobalFrame(i,c,u,f,s.width,s.height),this._setupFilterTextures(i,a,t,l)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const i=e.source,s=i.resolution,n=i.antialias;if(t.every(p=>!p.enabled))return r.skip=!0,e;const o=r.bounds;if(o.addRect(e.frame),this._calculateFilterBounds(r,o.rectangle,n,s,0),r.skip)return e;const a=s;this._calculateGlobalFrame(r,0,0,a,i.width,i.height),r.outputRenderSurface=_.getOptimalTexture(o.width,o.height,r.resolution,r.antialias),r.backTexture=v.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const u=r.outputRenderSurface;return u.source.alphaMode="premultiplied-alpha",u}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&_.returnTexture(t.backTexture),_.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const i=e.colorTexture.source._resolution,s=_.getOptimalTexture(t.width,t.height,i,!1);let n=t.minX,o=t.minY;r&&(n-=r.minX,o-=r.minY),n=Math.floor(n*i),o=Math.floor(o*i);const a=Math.ceil(t.width*i),l=Math.ceil(t.height*i);return this.renderer.renderTarget.copyToTexture(e,s,{x:n,y:o},{width:a,height:l},{x:0,y:0}),s}applyFilter(e,t,r,i){const s=this.renderer,n=this._activeFilterData,a=n.outputRenderSurface===r,l=s.renderTarget.rootRenderTarget.colorTexture.source._resolution,f=this._findFilterResolution(l);let c=0,u=0;if(a){const x=this._findPreviousFilterOffset();c=x.x,u=x.y}this._updateFilterUniforms(t,r,n,c,u,f,a,i);const p=e.enabled?e:this._getPassthroughFilter();this._setupBindGroupsAndRender(p,t,s)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,i=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),s=t.worldTransform.copyTo(z.shared),n=t.renderGroup||t.parentRenderGroup;return n&&n.cacheToLocalTransform&&s.prepend(n.cacheToLocalTransform),s.invert(),i.prepend(s),i.scale(1/t.texture.orig.width,1/t.texture.orig.height),i.translate(t.anchor.x,t.anchor.y),i}destroy(){this._passthroughFilter?.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){return this._passthroughFilter??(this._passthroughFilter=new G),this._passthroughFilter}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const i=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(i,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:re,shader:e,state:e._state,topology:"triangle-list"}),r.type===Q.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,i){if(e.backTexture=v.EMPTY,e.inputTexture=_.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),e.blendRequired){r.renderTarget.finishRenderPass();const s=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(s,t,i?.bounds)}r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,i,s,n){const o=e.globalFrame;o.x=t*i,o.y=r*i,o.width=s*i,o.height=n*i}_updateFilterUniforms(e,t,r,i,s,n,o,a){const l=this._filterGlobalUniforms.uniforms,f=l.uOutputFrame,c=l.uInputSize,u=l.uInputPixel,p=l.uInputClamp,x=l.uGlobalFrame,g=l.uOutputTexture;o?(f[0]=r.bounds.minX-i,f[1]=r.bounds.minY-s):(f[0]=0,f[1]=0),f[2]=e.frame.width,f[3]=e.frame.height,c[0]=e.source.width,c[1]=e.source.height,c[2]=1/c[0],c[3]=1/c[1],u[0]=e.source.pixelWidth,u[1]=e.source.pixelHeight,u[2]=1/u[0],u[3]=1/u[1],p[0]=.5*u[2],p[1]=.5*u[3],p[2]=e.frame.width*c[2]-.5*u[2],p[3]=e.frame.height*c[3]-.5*u[3];const T=this.renderer.renderTarget.rootRenderTarget.colorTexture;x[0]=i*n,x[1]=s*n,x[2]=T.source.width*n,x[3]=T.source.height*n,t instanceof v&&(t.source.resource=null);const d=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!a),t instanceof v?(g[0]=t.frame.width,g[1]=t.frame.height):(g[0]=d.width,g[1]=d.height),g[2]=d.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const i=this._filterStack[r];if(!i.skip){e=i.bounds.minX,t=i.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?X(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const i=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;i&&t.applyMatrix(i)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,i=e.bounds,s=e.filters,n=e.firstEnabledIndex,o=e.lastEnabledIndex;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),n===o)s[n].apply(this,r,e.outputRenderSurface,t);else{let a=e.inputTexture;const l=_.getOptimalTexture(i.width,i.height,a.source._resolution,!1);let f=l;for(let c=n;c<o;c++){const u=s[c];if(!u.enabled)continue;u.apply(this,a,f,!0);const p=a;a=f,f=p}s[o].apply(this,a,e.outputRenderSurface,t),_.returnTexture(l)}}_calculateFilterBounds(e,t,r,i,s){const n=this.renderer,o=e.bounds,a=e.filters;let l=1/0,f=0,c=!0,u=!1,p=!1,x=!0,g=-1,T=-1;for(let d=0;d<a.length;d++){const h=a[d];if(!h.enabled)continue;if(g===-1&&(g=d),T=d,l=Math.min(l,h.resolution==="inherit"?i:h.resolution),f+=h.padding,h.antialias==="off"?c=!1:h.antialias==="inherit"&&c&&(c=r),h.clipToViewport||(x=!1),!!!(h.compatibleRenderers&n.type)){p=!1;break}if(h.blendRequired&&!(n.backBuffer?.useBackBuffer??!0)){Z("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),p=!1;break}p=!0,u||(u=h.blendRequired)}if(!p){e.skip=!0;return}if(x&&o.fitBounds(0,t.width/i,0,t.height/i),o.scale(l).ceil().scale(1/l).pad((f|0)*s),!o.isPositive){e.skip=!0;return}e.antialias=c,e.resolution=l,e.blendRequired=u,e.firstEnabledIndex=g,e.lastEnabledIndex=T}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new P),this._filterStackIndex++,e}};m(A,"FilterSystem");let S=A;S.extension={type:[b.WebGLSystem,b.WebGPUSystem],name:"filter"};Y.add(S,y);Y.add(w);
