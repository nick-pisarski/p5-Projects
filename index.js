createProjectList();

function loadProject( project ) {
  //Set the Title for project
  document.getElementById( 'project-title' ).innerHTML = project.title;

  addProjectHTML( project );
  loadScripts( project );
}

function loadScripts( project ) {
  const projectScripts = document.querySelectorAll( `script[data-project="${project.folder}"]` );
  projectScripts.forEach( el => el.remove() );

  // need some way to load appropriate sketch files and appropriate order
  createScriptTag( project, `src/projects/${project.folder}/sketch.js` );
}

function createScriptTag( project, src ) {
  const s = document.createElement( "script" );
  s.src = src

  //add data attribute so can remove
  s.setAttribute( 'data-project', project.folder );
  s.setAttribute( 'defer', 'defer' );

  const main = document.getElementById( "main" );
  main.insertAdjacentElement( "afterend", s );
}

async function addProjectHTML( project ) {
  const path = `src/projects/${project.folder}/index.html`
  await fetch( path )
    .then( data => data.text() )
    .then( html => document.getElementById( 'project-canvas' ).innerHTML = html );
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
  title.addEventListener( "click", _ => loadProject( project ) );
  li.append( title );

  // Description
  const description = document.createElement( "div" );
  description.classList.add( 'project-desc' );
  description.innerHTML = project.description;
  li.append( description );

  // Resource
  if ( project.resources ) {
    const links = project.resources.map( r => `<a class="link" target="_blank" href="${r.url}">${r.title}</a>` );
    const resources = document.createElement( "div" );
    resources.classList.add( 'project-resources' );
    resources.innerHTML = `Resources: ${links.join(', ')}`;
    li.append( resources );
  }

  //Add to List
  document.getElementById( 'project-list' ).append( li );
}

function createProjectList() {
  const projects = getProjectsList();
  projects.forEach( createProjectListItem );
  loadProject( projects[ 0 ] );
}

function clearProjectHTML() {
  const projectContainer = document.getElementById( 'project' );
  while ( projectContainer.firstChild ) {
    projectContainer.removeChild( projectContainer.firstChild );
  }
}

function getProjectsList() {
  return PROJECT_LIST;
}
