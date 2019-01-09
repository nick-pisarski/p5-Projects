function makeSlider( lbl, def_value, parent ) {

  const sliderType = lbl.toLowerCase();
  const container = createDiv().addClass( 'container' );
  container.parent( parent );

  const label = makeLabel( lbl, container );
  label.parent( container );

  const slider = createSlider( 0, 2, def_value, 0.1 );
  slider.id( `${sliderType}-slider` );
  slider.changed( evt => {
    const label = select( `#${sliderType}-val` );
    label.html( `(${parseFloat(evt.target.value).toFixed(1)})` );
  } );
  slider.parent( container );

  let val;
  //Needs refactoring, maybe store these in a global array or something
  if ( sliderType === 'align' ) {
    alignSlider = slider;
    val = makeLabel( `(${alignSlider.value().toFixed(1)})`, `${sliderType}-val` );

  } else if ( sliderType === 'cohesion' ) {
    cohesionSlider = slider;
    val = makeLabel( `(${cohesionSlider.value().toFixed(1)})`, `${sliderType}-val` );

  } else {
    separationSlider = slider;
    val = makeLabel( `(${separationSlider.value().toFixed(1)})`, `${sliderType}-val` );
  }

  if ( val ) {
    val.addClass( 'val' );
    val.parent( container );
  }
}

function makeCheckbox( lbl, default_value, parent, callback ) {
  const container = createDiv().addClass( 'container' );
  //   const label = makeLabel( lbl );
  //   label.parent( container );

  const check = createCheckbox( lbl, default_value )
  check.changed( callback );
  check.parent( container );

  container.parent( parent );
}

function makeInput( lbl, parent, callback ) {
  const container = createDiv().addClass( 'container' );;

  const label = makeLabel( lbl );
  label.parent( container );

  const input = createInput( perceptionRange, 'number' );
  input.input( callback );
  input.parent( container );

  container.parent( parent );
}

function makeButton( lbl, parent, callback ) {
  const container = createDiv().addClass( 'container' );

  const btn = createButton( lbl );
  btn.mouseClicked( callback );
  btn.parent( container );

  container.parent( parent );
}

function makeControls() {
  const controls = createDiv().addClass( 'controls' );
  makeSlider( 'Align', DEF_ALIGN, controls );
  makeSlider( 'Cohesion', DEF_COHESION, controls );
  makeSlider( 'Separation', DEF_SEPARATION, controls );
  makeInput( 'Perception Range', controls, evt => perceptionRange = parseInt( evt.target.value ) );
  makeInput( '# Boids', controls, evt => flockSize = parseInt( evt.target.value ) );
  makeCheckbox( 'Show Perception', showPerception, controls, evt => showPerception = evt.target.checked );
  makeCheckbox( 'Show Center', showCenter, controls, evt => showCenter = evt.target.checked );
  makeCheckbox( 'Show Position', showPosition, controls, evt => showPosition = evt.target.checked );
  makeCheckbox( 'Show Position', showName, controls, evt => showName = evt.target.checked );
  makeCheckbox( 'Random Boids', randomBoids, controls, evt => randomBoids = evt.target.checked );
  makeButton( 'Reset Flock', controls, resetFlock );
}

function makeLabel( lbl, id ) {
  const _id = id ? id : `${lbl.toLowerCase()}-lbl`;
  const label = createSpan( lbl );
  label.id( _id );
  label.addClass( 'label' );
  return label;
}
