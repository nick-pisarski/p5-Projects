function projectHtmlTemplate( project ) {
  let template = '';
  template += `<a class="link project-title" href="./${project.folder}/index.html">${project.title}</a>`;
  template += `<div class="project-desc">${project.description}</div>`;

  if ( project.resources ) {
    const links = project.resources.map( r => `<a class="link" target="_blank" href="${r.link}">${r.title}</a>` );
    template += `<div class="project-resources">Resources: ${links.join(', ')}</div>`;
  }

  return template;

}

function createProjectList() {
  const list = document.getElementById( 'projects' );

  projects.forEach( project => {
    const li = document.createElement( 'li' );
    li.classList.add( 'project-item', 'shadow' );
    li.innerHTML = projectHtmlTemplate( project );
    list.appendChild( li );
  } );
}

createProjectList();
