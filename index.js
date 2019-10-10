const LOAD_FIRST = 0;

class App {
  constructor() {
    this.sketch = null;
    this.currentProject = null;
    this.projectList = PROJECT_LIST;
  }

  loadProject( project ) {
    document.getElementById( 'project-title' ).innerHTML = project.title;
    this.loadScripts( project );
  }

  loadScripts = ( project ) => {
    //remove project scripts and old canvas
    const projectScripts = document.querySelectorAll( 'script[data-project]' );
    projectScripts.forEach( el => el.remove() );

    this.clearProjectHTML();

    //load sketch file
    this.createScriptTag( project, `src/projects/${project.folder}/sketch.js` );
  }

  createScriptTag( project, src ) {
    const s = document.createElement( "script" );
    s.src = src

    s.setAttribute( 'data-project', project.folder );
    s.onload = e => {
      console.log( `Loaded: ${project.title}` );
      this.currentProject = new p5( this.sketch, 'sketch' );

      // NOT YET IMPLEMENTED
      // this.addProjectHTML( project );
    };

    const main = document.getElementById( "main" );
    main.insertAdjacentElement( "afterend", s );
  }

  async addProjectHTML( project ) {
    const path = `src/projects/${project.folder}/index.html`
    // if html exists - TODO
    await fetch( path )
      .then( data => data.text() )
      .then( html => document.getElementById( 'project-canvas' ).innerHTML += html )
      .catch( err => console.log( 'HTML file not found', err ) );
  }

  createProjectListItem = ( project ) => {
    // List Item
    const li = document.createElement( "li" );
    li.classList.add( 'project-list-item', 'shadow' );

    // Title
    const title = document.createElement( "div" );
    title.classList.add( 'link', 'project-title' );
    title.innerHTML = project.title;

    title.addEventListener( "click", _ => this.loadProject( project ) );
    li.append( title );

    // Description
    const description = document.createElement( "div" );
    description.classList.add( 'project-desc' );
    description.innerHTML = project.description;
    li.append( description );

    // Resource
    if ( project.resources ) {
      const links = project.resources.map( r =>
        `<a class="link" target="_blank" href="${r.url}">${r.title}</a>` );
      const resources = document.createElement( "div" );
      resources.classList.add( 'project-resources' );
      resources.innerHTML = `Resources: ${links.join(', ')}`;
      li.append( resources );
    }

    //Add to List
    document.getElementById( 'project-list' ).append( li );
  }

  createProjectList() {
    // const sortedList = this.projectList.sort( ( a, b ) => ( a.title > b.title ) ? 1 : -1 );
    // sortedList.forEach( this.createProjectListItem );
    this.projectList.forEach( this.createProjectListItem );
    this.loadProject( this.projectList[ LOAD_FIRST ] );
  }

  clearProjectHTML() {
    const projectContainer = document.getElementById( 'sketch' );
    while ( projectContainer.firstChild ) {
      projectContainer.removeChild( projectContainer.firstChild );
    }
  }

  start() {
    this.createProjectList();
  }
}

const app = new App();
app.start();
