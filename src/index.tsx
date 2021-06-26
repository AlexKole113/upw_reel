import ReactDOM from 'react-dom';
import App from './components/App'

//in test
const EMBED_SRC = 'https://www.google.com/';
const CSS_URL   = '';
// TODO: Change SRC Arrow and Spinner Images !


// create root
const root = document.createElement('div');
root.setAttribute('id','upw-reel-root' );

// styles
const link = document.createElement('link');
link.setAttribute('rel','stylesheet');
link.setAttribute('href', CSS_URL  );

document.head.append( link )
document.body.append( root )

const gameID = document.querySelector(`[src^="${EMBED_SRC}"]`)
    ?.getAttribute('src')
    ?.split( EMBED_SRC )[1];


if( gameID && root ) {
    ReactDOM.render(
        <App gameID={ gameID } />,
        document.querySelector('#upw-reel-root'),
    );
}


