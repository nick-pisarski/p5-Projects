// Create a link tag for project
function createProjectItem( project ) {
  const link = document.createElement( 'a' );
  link.innerHTML = project.title;
  link.href = `./${project.folder}/index.html`;

  const li = document.createElement( 'li' );
  li.classList.add( 'project-item' );
  li.appendChild( link );
  return li;

}

function createProjectList() {
  const list = document.getElementById( 'projects' );

  projects.forEach( value => {
    const p = createProjectItem( value );
    list.appendChild( p );
  } );
}

createProjectList();
