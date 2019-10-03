createProjectList();

function loadProject( project ) {

  //Set the Title for project
  document.getElementById( 'project-title' ).innerHTML = project.title;
  console.log( project );
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

function getProjectsList() {
  return PROJECT_LIST;
}
