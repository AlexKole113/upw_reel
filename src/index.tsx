import ReactDOM from 'react-dom';
import App from './components/App'



declare const window: any;
window.EMBED_REEL_PATH = 'https://condescending-curran-bf301a.netlify.app';


const EMBED_SRC =  window.EMBED_REEL_PATH + `/dist/assets/js/main.js?gameID=`;
const CSS_URL   =  window.EMBED_REEL_PATH + `/dist/assets/css/main.css`;
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


// const testGAMEID = '4sahEPkMajd4Q6ueiFar';
// console.log(gameID);
if( gameID && root ) {
    ReactDOM.render(
        <App gameID={ gameID } />,
        document.querySelector('#upw-reel-root'),
    );
}



