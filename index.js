const caps = v => v[ 0 ].toUpperCase() + v.slice( 1 );

/**
 * Loads list from json
 */
function getProjectsList() {
  return PROJECT_LIST;
}

function getProjectTitle( name ) {
  return name.split( '-' ).map( caps ).join( ' ' );
}

/**
 * Creates the Project List Item Element
 * @param {string} project project name
 */
function createProjectListItem( project ) {
  // List Item
  const li = document.createElement( "li" );
  li.classList.add( 'project-list-item', 'shadow' );

  // Title
  const title = document.createElement( "div" );
  title.classList.add( 'link', 'project-title' );
  title.innerHTML = project.title;
  // title.addEventListener( "click", _ => loadProject( pro_name ) );
  title.addEventListener( "click", _ => console.log( project ) );

  li.append( title );

  // Description
  const description = document.createElement( "div" );
  description.classList.add( 'project-desc' );
  description.innerHTML = project.description;
  li.append( description );

  // Resource - TODO
  if ( project.resources ) {
    const links = project.resources.map( r => `<a class="link" target="_blank" href="${r.link}">${r.title}</a>` );
    const resources = document.createElement( "div" );
    resources.classList.add( 'project-resources' );
    resources.innerHTML = `Resources: ${links.join(', ')}`;
    li.append( resources );
  }

  //Add to List
  document.getElementById( 'project-list' ).append( li );
}

/**
 * Populates the Project List Html
 */
function createProjectList() {
  const projects = getProjectsList();
  projects.forEach( createProjectListItem );
  // loadProject( projects[ 0 ] );
}

/**
 * creates a Scrit Tag with data-project attribute
 * @param {string} src
 * @param {string} project project name
 */
function createScriptTag( src, project ) {
  const s = document.createElement( "script" );
  s.src = src;
  s.setAttribute( "data-project", project );
  return s;
}

/**
 * Removes any script tags with data-project attribute off the dom
 */
function removeLoadedProjectScripts() {
  const ps = document.querySelectorAll( "script[data-project]" );
  ps.forEach( ele => document.body.removeChild( ele ) );
}

/**
 * Adds all the project script tags to the DOM
 * @param {string} project  project name
 */
function addProjectScriptTags( project ) {

  const index_script = document.querySelector( 'script[src="index.js"]' );
  // Load Library script tags, need recursively do this, based on the file
  //   Look at File API eg window.File and window.FileReader

  // Load main script
  const main = createScriptTag( `./projects/${project}/${project}.js`, project );
  document.body.insertBefore( main, index_script );

}

/**
 * Adds all the project html onto the DOM
 * @param {string} project  project name
 */
async function addProjectHTML( project ) {
  const path = `./projects/${project}/${project}.html`
  await fetch( path )
    .then( data => data.text() )
    .then( html => document.getElementById( 'project' ).innerHTML = html );
}

function clearProjectHTML() {
  const projectContainer = document.getElementById( 'project' );
  while ( projectContainer.firstChild ) {
    projectContainer.removeChild( projectContainer.firstChild );
  }
}

function loadProject( project ) {
  if ( !document.querySelector( `script[data-project="${project}"]` ) ) {
    removeLoadedProjectScripts();
    clearProjectHTML();

    addProjectScriptTags( project );
    addProjectHTML( project )
  }
}

createProjectList();
